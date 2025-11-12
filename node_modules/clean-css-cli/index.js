var fs = require('fs');
var path = require('path');

var CleanCSS = require('clean-css');
var program = require('commander');
var glob = require('glob');

var COMPATIBILITY_PATTERN = /([\w\.]+)=(\w+)/g;
var lineBreak = require('os').EOL;

function cli(process, beforeMinifyCallback) {
  var packageConfig = fs.readFileSync(path.join(__dirname, 'package.json'));
  var buildVersion = JSON.parse(packageConfig).version;
  var fromStdin;
  var inputOptions;
  var options;
  var stdin;
  var data;

  beforeMinifyCallback = beforeMinifyCallback || Function.prototype;

  // Specify commander options to parse command line params correctly
  program
    .usage('[options] <source-file ...>')
    .option('-b, --batch', 'If enabled, optimizes input files one by one instead of joining them together')
    .option('-c, --compatibility [ie7|ie8]', 'Force compatibility mode (see Readme for advanced examples)')
    .option('-d, --debug', 'Shows debug information (minification time & compression efficiency)')
    .option('-f, --format <options>', 'Controls output formatting, see examples below')
    .option('-h, --help', 'display this help')
    .option('-o, --output [output-file]', 'Use [output-file] as output instead of STDOUT')
    .option('-O <n> [optimizations]', 'Turn on level <n> optimizations; optionally accepts a list of fine-grained options, defaults to `1`, see examples below, IMPORTANT: the prefix is O (a capital o letter), NOT a 0 (zero, a number)', function (val) { return Math.abs(parseInt(val)); })
    .version(buildVersion, '-v, --version')
    .option('--batch-suffix <suffix>', 'A suffix (without extension) appended to input file name when processing in batch mode (`-min` is the default)', '-min')
    .option('--inline [rules]', 'Enables inlining for listed sources (defaults to `local`)')
    .option('--inline-timeout [seconds]', 'Per connection timeout when fetching remote stylesheets (defaults to 5 seconds)', parseFloat)
    .option('--input-source-map [file]', 'Specifies the path of the input source map file')
    .option('--remove-inlined-files', 'Remove files inlined in <source-file ...> or via `@import` statements')
    .option('--source-map', 'Enables building input\'s source map')
    .option('--source-map-inline-sources', 'Enables inlining sources inside source maps')
    .option('--with-rebase', 'Enable URLs rebasing')
    .option('--watch', 'Runs CLI in watch mode');

  program.on('--help', function () {
    console.log('');
    console.log('Examples:\n');
    console.log('  %> cleancss one.css');
    console.log('  %> cleancss -o one-min.css one.css');
    console.log('  %> cleancss -o merged-and-minified.css one.css two.css three.css');
    console.log('  %> cleancss one.css two.css three.css | gzip -9 -c > merged-minified-and-gzipped.css.gz');
    console.log('');
    console.log('Formatting options:');
    console.log('  %> cleancss --format beautify one.css');
    console.log('  %> cleancss --format keep-breaks one.css');
    console.log('  %> cleancss --format \'indentBy:1;indentWith:tab\' one.css');
    console.log('  %> cleancss --format \'breaks:afterBlockBegins=on;spaces:aroundSelectorRelation=on\' one.css');
    console.log('  %> cleancss --format \'breaks:afterBlockBegins=2;spaces:aroundSelectorRelation=on\' one.css');
    console.log('');
    console.log('Level 0 optimizations:');
    console.log('  %> cleancss -O0 one.css');
    console.log('');
    console.log('Level 1 optimizations:');
    console.log('  %> cleancss -O1 one.css');
    console.log('  %> cleancss -O1 removeQuotes:off;roundingPrecision:4;specialComments:1 one.css');
    console.log('  %> cleancss -O1 all:off;specialComments:1 one.css');
    console.log('');
    console.log('Level 2 optimizations:');
    console.log('  %> cleancss -O2 one.css');
    console.log('  %> cleancss -O2 mergeMedia:off;restructureRules:off;mergeSemantically:on;mergeIntoShorthands:off one.css');
    console.log('  %> cleancss -O2 all:off;removeDuplicateRules:on one.css');

    process.exit();
  });

  program.parse(process.argv);
  inputOptions = program.opts();

  // If no sensible data passed in just print help and exit
  if (program.args.length === 0) {
    fromStdin = !process.env.__DIRECT__ && !process.stdin.isTTY;
    if (!fromStdin) {
      program.outputHelp();
      return 0;
    }
  }

  // Now coerce arguments into CleanCSS configuration...
  options = {
    batch: inputOptions.batch,
    compatibility: inputOptions.compatibility,
    format: inputOptions.format,
    inline: typeof inputOptions.inline == 'string' ? inputOptions.inline : 'local',
    inlineTimeout: inputOptions.inlineTimeout * 1000,
    level: { 1: true },
    output: inputOptions.output,
    rebase: inputOptions.withRebase ? true : false,
    rebaseTo: undefined,
    sourceMap: inputOptions.sourceMap,
    sourceMapInlineSources: inputOptions.sourceMapInlineSources
  };

  if (program.rawArgs.indexOf('-O0') > -1) {
    options.level[0] = true;
  }

  if (program.rawArgs.indexOf('-O1') > -1) {
    options.level[1] = findArgumentTo('-O1', program.rawArgs, program.args);
  }

  if (program.rawArgs.indexOf('-O2') > -1) {
    options.level[2] = findArgumentTo('-O2', program.rawArgs, program.args);
  }

  if (inputOptions.inputSourceMap && !options.sourceMap) {
    options.sourceMap = true;
  }

  if (options.sourceMap && !options.output && !options.batch) {
    outputFeedback(['Source maps will not be built because you have not specified an output file.'], true);
    options.sourceMap = false;
  }

  if (options.output && options.batch) {
    fs.mkdirSync(options.output, {recursive: true});
  }

  if (inputOptions.withRebase && ('output' in inputOptions) && inputOptions.output.length > 0) {
    if (isDirectory(path.resolve(inputOptions.output))) {
      options.rebaseTo = path.resolve(inputOptions.output);
    } else {
      options.rebaseTo = path.dirname(path.resolve(inputOptions.output));
    }
  } else {
    if (inputOptions.withRebase) {
      options.rebaseTo = process.cwd();
    }
  }

  var configurations = {
    batchSuffix: inputOptions.batchSuffix,
    beforeMinifyCallback: beforeMinifyCallback,
    debugMode: inputOptions.debug,
    removeInlinedFiles: inputOptions.removeInlinedFiles,
    inputSourceMap: inputOptions.inputSourceMap
  };

  // ... and do the magic!
  if (program.args.length > 0) {
    var expandedGlobs = expandGlobs(program.args);
    if (inputOptions.watch) {
      var inputPaths = expandedGlobs.map(function (path) { return path.expanded; });

      minify(process, options, configurations, expandedGlobs);
      require('chokidar').watch(inputPaths).on('change', function (pathToChangedFile) {
        console.log(`File '${pathToChangedFile}' has changed. Rerunning all optimizations...`);
        minify(process, options, configurations, expandedGlobs);
      });
    } else {
      minify(process, options, configurations, expandedGlobs);
    }
  } else {
    stdin = process.openStdin();
    stdin.setEncoding('utf-8');
    data = '';
    stdin.on('data', function (chunk) {
      data += chunk;
    });
    stdin.on('end', function () {
      minify(process, options, configurations, data);
    });
  }
}

function isDirectory(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    if (e.code == 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
}

function findArgumentTo(option, rawArgs, args) {
  var value = true;
  var optionAt = rawArgs.indexOf(option);
  var nextOption = rawArgs[optionAt + 1];
  var looksLikePath;
  var asArgumentAt;

  if (!nextOption) {
    return value;
  }

  looksLikePath = nextOption.indexOf('.css') > -1 ||
    /\//.test(nextOption) ||
    /\\[^\-]/.test(nextOption) ||
    /^https?:\/\//.test(nextOption);
  asArgumentAt = args.indexOf(nextOption);

  if (!looksLikePath) {
    value = nextOption;
  }

  if (!looksLikePath && asArgumentAt > -1) {
    args.splice(asArgumentAt, 1);
  }

  return value;
}

function expandGlobs(paths) {
  var globPatterns = paths.filter(function (path) { return path[0] != '!'; });
  var ignoredGlobPatterns = paths
    .filter(function (path) { return path[0] == '!'; })
    .map(function (path) { return path.substring(1); });

  return globPatterns.reduce(function (accumulator, path) {
    var expandedWithSource =
      glob.sync(path, { ignore: ignoredGlobPatterns, nodir: true, nonull: true })
      .map(function (expandedPath) { return { expanded: expandedPath, source: path }; });

    return accumulator.concat(expandedWithSource);
  }, []);
}

function minify(process, options, configurations, data) {
  var cleanCss = new CleanCSS(options);
  var input = typeof(data) == 'string' ?
    data :
    data.map(function (o) { return o.expanded; });

  applyNonBooleanCompatibilityFlags(cleanCss, options.compatibility);
  configurations.beforeMinifyCallback(cleanCss);
  cleanCss.minify(input, getSourceMapContent(configurations.inputSourceMap), function (errors, minified) {
    var inputPath;
    var outputPath;

    if (options.batch && !('styles' in minified)) {
      for (inputPath in minified) {
        outputPath = options.batch && options.output ?
          toBatchOutputPath(inputPath, configurations.batchSuffix, options.output, data) :
          toSimpleOutputPath(inputPath, configurations.batchSuffix);

        processMinified(process, configurations, minified[inputPath], inputPath, outputPath);
      }
    } else {
      processMinified(process, configurations, minified, null, options.output);
    }
  });
}

function toSimpleOutputPath(inputPath, batchSuffix) {
  var extensionName = path.extname(inputPath);

  return inputPath.replace(new RegExp(extensionName + '$'), batchSuffix + extensionName);
}

function toBatchOutputPath(inputPath, batchSuffix, output, expandedWithSource) {
  var extensionName = path.extname(inputPath);
  var inputSource = expandedWithSource.find(function (ic) { return ic.expanded == inputPath; }).source;
  var inputSourceRoot = inputSource.indexOf('*') > -1 ?
    inputSource.substring(0, inputSource.indexOf('*')) :
    path.dirname(inputSource);

  return path.join(output, inputPath.replace(inputSourceRoot, '').replace(new RegExp(extensionName + '$'), batchSuffix + extensionName));
}

function processMinified(process, configurations, minified, inputPath, outputPath) {
  var mapOutputPath;

  if (configurations.debugMode) {
    if (inputPath) {
      console.error('File: %s', inputPath);
    }

    console.error('Original: %d bytes', minified.stats.originalSize);
    console.error('Minified: %d bytes', minified.stats.minifiedSize);
    console.error('Efficiency: %d%', ~~(minified.stats.efficiency * 10000) / 100.0);
    console.error('Time spent: %dms', minified.stats.timeSpent);

    if (minified.inlinedStylesheets.length > 0) {
      console.error('Inlined stylesheets:');
      minified.inlinedStylesheets.forEach(function (uri) {
        console.error('- %s', uri);
      });
    }

    console.error('');
  }

  outputFeedback(minified.errors, true);
  outputFeedback(minified.warnings);

  if (minified.errors.length > 0) {
    process.exit(1);
  }

  if (configurations.removeInlinedFiles) {
    minified.inlinedStylesheets.forEach(fs.unlinkSync);
  }

  if (minified.sourceMap) {
    mapOutputPath = outputPath + '.map';
    output(process, outputPath, minified.styles + lineBreak + '/*# sourceMappingURL=' + path.basename(mapOutputPath) + ' */');
    outputMap(mapOutputPath, minified.sourceMap);
  } else {
    output(process, outputPath, minified.styles);
  }
}

function applyNonBooleanCompatibilityFlags(cleanCss, compatibility) {
  var match;
  var scope;
  var parts;
  var i, l;

  if (!compatibility) {
    return;
  }

  patternLoop:
  while ((match = COMPATIBILITY_PATTERN.exec(compatibility)) !== null) {
    scope = cleanCss.options.compatibility;
    parts = match[1].split('.');

    for (i = 0, l = parts.length - 1; i < l; i++) {
      scope = scope[parts[i]];

      if (!scope) {
        continue patternLoop;
      }
    }

    scope[parts.pop()] = match[2];
  }
}

function outputFeedback(messages, isError) {
  var prefix = isError ? '\x1B[31mERROR\x1B[39m:' : 'WARNING:';

  messages.forEach(function (message) {
    console.error('%s %s', prefix, message);
  });
}

function getSourceMapContent(sourceMapPath) {
  if (!sourceMapPath || !fs.existsSync(sourceMapPath)) {
    return null;
  }
  var content = null;

  try {
    content = fs.readFileSync(sourceMapPath).toString();
  } catch (e) {
    console.error('Failed to read the input source map file.');
  }

  return content;
}

function output(process, outputPath, minified) {
  if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), {recursive: true});
    fs.writeFileSync(outputPath, minified, 'utf8');
  } else {
    process.stdout.write(minified);
  }
}

function outputMap(mapOutputPath, sourceMap) {
  fs.writeFileSync(mapOutputPath, sourceMap.toString(), 'utf-8');
}

module.exports = cli;
