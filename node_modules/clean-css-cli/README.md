<h1 align="center">
  <br/>
  <img src="https://cdn.rawgit.com/jakubpawlowicz/clean-css/master/logo.v2.svg" alt="clean-css logo" width="525px"/>
  <br/>
  <br/>
</h1>

[![NPM version](https://img.shields.io/npm/v/clean-css-cli.svg?style=flat)](https://www.npmjs.com/package/clean-css-cli)
![x86 Linux build](https://github.com/clean-css/clean-css-cli/workflows/x86%20Linux%20build/badge.svg)
[![Dependency Status](https://img.shields.io/david/clean-css/clean-css-cli.svg?style=flat)](https://david-dm.org/clean-css/clean-css-cli)
[![NPM Downloads](https://img.shields.io/npm/dm/clean-css-cli.svg)](https://www.npmjs.com/package/clean-css-cli)

clean-css-cli is a command-line interface to [clean-css](https://github.com/jakubpawlowicz/clean-css) - fast and efficient CSS optimizer for [Node.js](http://nodejs.org/).

Previously a part of clean-css it's a separate package since clean-css 4.0.

**Table of Contents**

- [Node.js version support](#nodejs-version-support)
- [Install](#install)
- [Use](#use)
  * [What's new in version 5.5](#whats-new-in-version-55)
  * [What's new in version 5.1](#whats-new-in-version-51)
  * [What's new in version 5.0](#whats-new-in-version-50)
  * [What's new in version 4.3](#whats-new-in-version-43)
  * [What's new in version 4.2](#whats-new-in-version-42)
  * [What's new in version 4.1](#whats-new-in-version-41)
  * [What's new in version 4.0](#whats-new-in-version-40)
  * [CLI options](#cli-options)
  * [Compatibility modes](#compatibility-modes)
  * [Formatting options](#formatting-options)
  * [Inlining options](#inlining-options)
  * [Optimization levels](#optimization-levels)
    + [Level 0 optimizations](#level-0-optimizations)
    + [Level 1 optimizations](#level-1-optimizations)
    + [Level 2 optimizations](#level-2-optimizations)
  * [As a module](#as-a-module)
- [FAQ](#faq)
  * [How to optimize multiple files?](#how-to-optimize-multiple-files)
  * [How to process multiple files without concatenating them into one output file?](#how-to-process-multiple-files-without-concatenating-them-into-one-output-file)
  * [How to specify a custom rounding precision?](#how-to-specify-a-custom-rounding-precision)
  * [How to rebase relative image URLs?](#how-to-rebase-relative-image-urls)
  * [How to apply level 1 & 2 optimizations at the same time?](#how-to-apply-level-1--2-optimizations-at-the-same-time)
- [Contributing](#contributing)
  * [How to get started?](#how-to-get-started)
- [License](#license)

# Node.js version support

clean-css-cli requires Node.js 10.0+ (tested on Linux)

# Install

```shell
npm install clean-css-cli -g
```
Note: Global install via -g option is recommended unless you want to execute the binary via a relative path, i.e. ./node_modules/.bin/cleancss

# Use

```shell
cleancss -o one.min.css one.css
```

## What's new in version 5.5

clean-css-cli 5.5 introduces the following changes / features:

* adds a new `--watch` switch, which makes `cleancss` re-run optimizations when watched file(s) change.

## What's new in version 5.1

clean-css-cli 5.1 introduces the following changes / features:

* accept `!path/to/file` as a way of telling `cleancss` to ignore such file, also accepts any available glob patterns.

## What's new in version 5.0

clean-css-cli 5.0 introduces the following changes / features:

* adds `--batch` option (off by default) which processes input files one by one without joining them together;
* adds `--batch-suffix` option to specify what gets appended to output filename in batch mode;
* automatically creates missing output directories;
* clean-css 5.0 with loads of bugfixes;
* drops official support for Node.js 4, 6, and 8;
* `--skip-rebase` option has been removed as rebasing URLs is disabled by default now
* `--with-rebase` option is added if you really want URLs rebasing

## What's new in version 4.3

clean-css-cli 4.3 introduces the following changes / features:

* `--input-source-map` option which accepts a path to input source map file.

## What's new in version 4.2

clean-css-cli 4.2 introduces the following changes / features:

* [clean-css 4.2](https://github.com/jakubpawlowicz/clean-css#whats-new-in-version-42) as a dependency;

## What's new in version 4.1

clean-css-cli 4.1 introduces the following changes / features:

* [clean-css 4.1](https://github.com/jakubpawlowicz/clean-css#whats-new-in-version-41) as a dependency;
* `--remove-inlined-files` option for removing files inlined in <source-file ...> or via `@import` statements;
* adds glob pattern matching to source paths, see [example](#how-to-optimize-multiple-files);
* allows non-boolean compatibility options, e.g. `--compatibility selectors.mergeLimit=512`;
* extracts CLI into an importable module, so it can be reused and enhanced if needed;
* adds `beforeMinify` callback as a second argument to CLI module, see [example use case](#as-a-module).

## What's new in version 4.0

clean-css-cli 4.0 introduces some breaking changes:

* API and CLI interfaces are split, so CLI has been moved to this repository while API stays at [clean-css](https://github.com/jakubpawlowicz/clean-css);
* `--root` and `--relativeTo` options are replaced by a single option taken from `--output` path - this means that rebasing URLs and import inlining is much simpler but may not be (YMMV) as powerful as in 3.x;
* `--rounding-precision` is disabled by default;
* `--rounding-precision` applies to **all** units now, not only `px` as in 3.x;
* `--skip-import` and `--skip-import-from` are merged into `--inline` option which defaults to `local`. Remote `@import` rules are **NOT** inlined by default anymore;
* renames `--timeout` option to `--inline-timeout`;
* remote resources without a protocol, e.g. `//fonts.googleapis.com/css?family=Domine:700`, are not inlined anymore;
* changes default Internet Explorer compatibility from 9+ to 10+, to revert the old default use `--compatibility ie9` option;
* moves `--rounding-precision`, `--s0`, and `--s1` options to level 1 optimization options, see examples;
* moves `--skip-media-merging`, `--skip-restructuring`, `--semantic-merging`, and `--skip-shorthand-compacting` to level 2 optimizations options, see examples below;
* level 1 optimizations are the new default, up to 3.x it was level 2;
* `--keep-breaks` option is replaced with `--format keep-breaks` to ease transition;
* `--skip-aggressive-merging` option is removed as aggressive merging is replaced by smarter override merging.

## CLI options

```shell
-b, --batch                    If enabled, optimizes input files one by one instead of joining them together
-c, --compatibility [ie7|ie8]  Force compatibility mode (see Readme for advanced examples)
-d, --debug                    Shows debug information (minification time & compression efficiency)
-f, --format <options>         Controls output formatting, see examples below
-h, --help                     output usage information
-o, --output [output-file]     Use [output-file] as output instead of STDOUT
-O <n> [optimizations]         Turn on level <n> optimizations; optionally accepts a list of fine-grained options, defaults to `1`, IMPORTANT: the prefix is O (a capital o letter), NOT a 0 (zero, a number)
-v, --version                  output the version number
--inline [rules]               Enables inlining for listed sources (defaults to `local`)
--inline-timeout [seconds]     Per connection timeout when fetching remote stylesheets (defaults to 5 seconds)
--input-source-map [file]      Specifies the path of the input source map file
--remove-inlined-files         Remove files inlined in <source-file ...> or via `@import` statements
--source-map                   Enables building input's source map
--source-map-inline-sources    Enables inlining sources inside source maps
--with-rebase                  Enables URLs rebasing
```

## Compatibility modes

There is a certain number of compatibility mode shortcuts, namely:

* `--compatibility '*'` (default) - Internet Explorer 10+ compatibility mode
* `--compatibility ie9` - Internet Explorer 9+ compatibility mode
* `--compatibility ie8` - Internet Explorer 8+ compatibility mode
* `--compatibility ie7` - Internet Explorer 7+ compatibility mode

Each of these modes is an alias to a [fine grained configuration](https://github.com/jakubpawlowicz/clean-css/blob/master/lib/options/compatibility.js), with the following options available:

```shell
cleancss --compatibility '*,-properties.urlQuotes'
cleancss --compatibility '*,+properties.ieBangHack,+properties.ieFilters'
# [+-]colors.opacity controls `rgba()` / `hsla()` color support; defaults to `on` (+)
# [+-]properties.backgroundClipMerging controls background-clip merging into shorthand; defaults to `on` (+)
# [+-]properties.backgroundOriginMerging controls background-origin merging into shorthand; defaults to `on` (+)
# [+-]properties.backgroundSizeMerging controls background-size merging into shorthand; defaults to `on` (+)
# [+-]properties.colors controls color optimizations; defaults to `on` (+)
# [+-]properties.ieBangHack controls keeping IE bang hack; defaults to `off` (-)
# [+-]properties.ieFilters controls keeping IE `filter` / `-ms-filter`; defaults to `off` (-)
# [+-]properties.iePrefixHack controls keeping IE prefix hack; defaults to `off` (-)
# [+-]properties.ieSuffixHack controls keeping IE suffix hack; defaults to `off` (-)
# [+-]properties.merging controls property merging based on understandability; defaults to `on` (+)
# [+-]properties.shorterLengthUnits controls shortening pixel units into `pc`, `pt`, or `in` units; defaults to `off` (-)
# [+-]properties.spaceAfterClosingBrace controls keeping space after closing brace - `url() no-repeat` cleancss --compatibility '*,into `url('roperties.no-repeat`; defaults to `on` (+)
# [+-]properties.urlQuotes controls keeping quoting inside `url()`; defaults to `off` (-)
# [+-]properties.zeroUnitsf units `0` value; defaults to `on` (+)
# [+-]selectors.adjacentSpace controls extra space before `nav` element; defaults to `off` (-)
# [+-]selectors.ie7Hack controls removal of IE7 selector hacks, e.g. `*+html...`; defaults to `on` (+)
# [+-]units.ch controls treating `ch` as a supported unit; defaults to `on` (+)
# [+-]units.in controls treating `in` as a supported unit; defaults to `on` (+)
# [+-]units.pc controls treating `pc` as a supported unit; defaults to `on` (+)
# [+-]units.pt controls treating `pt` as a supported unit; defaults to `on` (+)
# [+-]units.rem controls treating `rem` as a supported unit; defaults to `on` (+)
# [+-]units.vh controls treating `vh` as a supported unit; defaults to `on` (+)
# [+-]units.vm controls treating `vm` as a supported unit; defaults to `on` (+)
# [+-]units.vmax controls treating `vmax` as a supported unit; defaults to `on` (+)
# [+-]units.vmin controls treating `vmin` as a supported unit; defaults to `on` (+)
```

You can also chain more rules after a shortcut when setting a compatibility:

```shell
cleancss --compatibility 'ie9,-colors.opacity,-units.rem' one.css
```

## Formatting options

The `--format` option accept the following options:

```shell
cleancss --format beautify one.css
cleancss --format keep-breaks one.css
cleancss --format 'indentBy:1;indentWith:tab' one.css
cleancss --format 'breaks:afterBlockBegins=on;spaces:aroundSelectorRelation=on' one.css
# `breaks` controls where to insert breaks
#   `afterAtRule` controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `off` (alias to `false`)
#   `afterBlockBegins` controls if a line break comes after a block begins; e.g. `@media`; defaults to `off`
#   `afterBlockEnds` controls if a line break comes after a block ends, defaults to `off`
#   `afterComment` controls if a line break comes after a comment; defaults to `off`
#   `afterProperty` controls if a line break comes after a property; defaults to `off`
#   `afterRuleBegins` controls if a line break comes after a rule begins; defaults to `off`
#   `afterRuleEnds` controls if a line break comes after a rule ends; defaults to `off`
#   `beforeBlockEnds` controls if a line break comes before a block ends; defaults to `off`
#   `betweenSelectors` controls if a line break comes between selectors; defaults to `off`
# `breakWith` controls the new line character, can be `windows` or `unix` (aliased via `crlf` and `lf`); defaults to system one, so former on Windows and latter on Unix
# `indentBy` controls number of characters to indent with; defaults to `0`
# `indentWith` controls a character to indent with, can be `space` or `tab`; defaults to `space`
# `spaces` controls where to insert spaces
#   `aroundSelectorRelation` controls if spaces come around selector relations; e.g. `div > a`; defaults to `off`
#   `beforeBlockBegins` controls if a space comes before a block begins; e.g. `.block {`; defaults to `off`
#   `beforeValue` controls if a space comes before a value; e.g. `width: 1rem`; defaults to `off`
# `wrapAt` controls maximum line length; defaults to `off`
```

## Inlining options

`--inline` option whitelists which `@import` rules will be processed, e.g.

```shell
cleancss --inline local one.css # default
```

```shell
cleancss --inline all # same as local,remote
```

```shell
cleancss --inline local,mydomain.example.com one.css
```

```shell
cleancss --inline 'local,remote,!fonts.googleapis.com' one.css
```

## Optimization levels

The `-O` option can be either `0`, `1` (default), or `2`, e.g.

```shell
cleancss -O2 one.css
```

or a fine-grained configuration given via a string.

Please note that level 1 optimization options are generally safe while level 2 optimizations should be safe for most users.

Important: The `-O` option is using the capital letter O (as in "Oscar"), not the number zero.

### Level 0 optimizations

Level 0 optimizations simply means "no optimizations". Use it when you'd like to inline imports and / or rebase URLs but skip everything else, e.g.

```shell
cleancss -O0 one.css
```

### Level 1 optimizations

Level 1 optimizations (default) operate on single properties only, e.g. can remove units when not required, turn rgb colors to a shorter hex representation, remove comments, etc

Here is a full list of available options:

```shell
cleancss -O1 one.css
cleancss -O1 removeQuotes:off;roundingPrecision:4;specialComments:1 one.css
# `cleanupCharsets` controls `@charset` moving to the front of a stylesheet; defaults to `on`
# `normalizeUrls` controls URL normalzation; default to `on`
# `optimizeBackground` controls `background` property optimizatons; defaults to `on`
# `optimizeBorderRadius` controls `border-radius` property optimizatons; defaults to `on`
# `optimizeFilter` controls `filter` property optimizatons; defaults to `on`
# `optimizeFontWeight` controls `font-weight` property optimizatons; defaults to `on`
# `optimizeOutline` controls `outline` property optimizatons; defaults to `on`
# `removeEmpty` controls removing empty rules and nested blocks; defaults to `on` (since 4.1.0)
# `removeNegativePaddings` controls removing negative paddings; defaults to `on`
# `removeQuotes` controls removing quotes when unnecessary; defaults to `on`
# `removeWhitespace` controls removing unused whitespace; defaults to `on`
# `replaceMultipleZeros` contols removing redundant zeros; defaults to `on`
# `replaceTimeUnits` controls replacing time units with shorter values; defaults to `on
# `replaceZeroUnits` controls replacing zero values with units; defaults to `on`
# `roundingPrecision` rounds pixel values to `N` decimal places; `off` disables rounding; defaults to `off`
# `selectorsSortingMethod` denotes selector sorting method; can be `natural` or `standard`; defaults to `standard`
# `specialComments` denotes a number of /*! ... */ comments preserved; defaults to `all`
# `tidyAtRules` controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `on`
# `tidyBlockScopes` controls block scopes (e.g. `@media`) optimizing; defaults to `on`
# `tidySelectors` controls selectors optimizing; defaults to `on`
```

There is an `all` shortcut for toggling all options at the same time, e.g.

```shell
cleancss -O1 'all:off;tidySelectors:on' one.css
```

### Level 2 optimizations

Level 2 optimizations operate at rules or multiple properties level, e.g. can remove duplicate rules, remove properties redefined further down a stylesheet, or restructure rules by moving them around.

Please note that if level 2 optimizations are turned on then, unless explicitely disabled, level 1 optimizations are applied as well.

Here is a full list of available options:

```shell
cleancss -O2 one.css
cleancss -O2 mergeMedia:off;restructureRules:off;mergeSemantically:on;mergeIntoShorthands:off one.css
# `mergeAdjacentRules` controls adjacent rules merging; defaults to `on`
# `mergeIntoShorthands` controls merging properties into shorthands; defaults to `on`
# `mergeMedia` controls `@media` merging; defaults to `on`
# `mergeNonAdjacentRules` controls non-adjacent rule merging; defaults to `on`
# `mergeSemantically` controls semantic merging; defaults to `off`
# `overrideProperties` controls property overriding based on understandability; defaults to `on`
# `reduceNonAdjacentRules` controls non-adjacent rule reducing; defaults to `on`
# `removeDuplicateFontRules` controls duplicate `@font-face` removing; defaults to `on`
# `removeDuplicateMediaBlocks` controls duplicate `@media` removing; defaults to `on`
# `removeDuplicateRules` controls duplicate rules removing; defaults to `on`
# `removeEmpty` controls removing empty rules and nested blocks; defaults to `on` (since 4.1.0)
# `removeUnusedAtRules` controls unused at rule removing; defaults to `off` (since 4.1.0)
# `restructureRules` controls rule restructuring; defaults to `off`
# `skipProperties` controls which properties won\'t be optimized, defaults to empty list which means all will be optimized (since 4.1.0)
```

There is an `all` shortcut for toggling all options at the same time, e.g.

```shell
cleancss -O2 'all:off;removeDuplicateRules:on' one.css
```

# As a module

clean-css-cli can also be used as a module in a way of enhancing its functionality in a programmatic way, e.g.

```js
#!/usr/bin/env node

var cleanCssCli = require('clean-css-cli');

var customPlugin = {
  level1: {
    value: function (propertyName, propertyValue, options) {
      if (propertyName == 'background-image' && propertyValue.indexOf('../valid/path/to') == -1) {
        return propertyValue.replace('url(', 'url(../valid/path/to/');
      } else {
        return propertyValue;
      }
    }
  }
}

return cleanCssCli(process, function (cleanCss) {
  cleanCss.options.plugins.level1Value.push(customPlugin.level1.value);
});
```

# FAQ

More answers can be found in [clean-css FAQ section](https://github.com/jakubpawlowicz/clean-css#faq).

## How to optimize multiple files?

It can be done by passing in paths to multiple files, e.g.

```shell
cleancss -o merged.min.css one.css two.css three.css
```

Since version 4.1.0 it can also be done using glob pattern matching, e.g.

```shell
cleancss -o merged.min.css *.css
```

## How to process multiple files without concatenating them into one output file?

Since clean-css-cli 5.0 you can optimize files one by one, without joining them into one output file, e.g.

```shell
cleancss --batch styles/*.css
```

By default it will pick up every single file from `styles` directory, optimize it, add a `-min` suffix to filename (before extension), and write it to disk.

You can use `--batch-suffix` option to customize the `-min` suffix, e.g.

```shell
cleancss --batch --batch-suffix '.min' styles/*.css # output will have `.min` suffix before `.css`, e.g. styles.min.css
```

or

```shell
cleancss --batch --batch-suffix '' styles/*.css # output files will OVERRIDE input files
```

Remember you can use [glob matching](https://www.npmjs.com/package/glob#glob-primer) to match exactly the files you want.

Since clean-css-cli 5.1 you can also use a negated pattern to exclude some files from being matched, e.g.

```shell
cleancss --batch styles/*.css !styles/*.min.css
```

## How to specify a custom rounding precision?

The level 1 `roundingPrecision` optimization option accept a string with per-unit rounding precision settings, e.g.

```shell
cleancss -O1 roundingPrecision:all=3,px=5
```

which sets all units rounding precision to 3 digits except `px` unit precision of 5 digits.

## How to rebase relative image URLs?

clean-css-cli will rebase paths it automatically for you when full paths to input files are passed, and `--with-rebase` & `--output` options are used, e.g

```css
/*! one.css */
a {
  background:url(image.png)
}
```

```shell
cleancss --with-rebase -o build/one.min.css one.css
```

```css
/*! build/one.min.css */
a{background:url(../image.png)}
```

## How to apply level 1 & 2 optimizations at the same time?

Using `-O` option twice and specifying optimization options in each, e.g.

```shell
cleancss -O1 all:on,normalizeUrls:off -O2 restructureRules:on one.css
```

will apply level 1 optimizations, except url normalization, and default level 2 optimizations with rule restructuring.

# Contributing

See [CONTRIBUTING.md](https://github.com/clean-css/clean-css-cli/blob/master/CONTRIBUTING.md).

## How to get started?

First clone the sources:

```shell
git clone git@github.com:clean-css/clean-css-cli.git
```

then install dependencies:

```shell
cd clean-css-cli
npm install
```

then use any of the following commands to verify your copy:

```shell
npm run check # to lint JS sources with [JSHint](https://github.com/jshint/jshint/)
npm test # to run all tests
```

# License

clean-css-cli is released under the [MIT License](https://github.com/clean-css/clean-css-cli/blob/master/LICENSE).
