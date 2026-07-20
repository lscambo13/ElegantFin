/**
 * ElegantFin add-on: Item detail local-trailer backdrop
 * ----------------------------------------------------
 * When a movie/series detail page has local trailers, crossfade the static
 * .itemBackdrop into a muted <video> layer (bottom edge = transparency mask) (NOT Jellyfin's main/theme player).
 *
 * Random start: OFF by default (always from beginning). Enable via
 *   window.ElegantFinItemTrailer = { randomStart: true, minPercent: 10, maxPercent: 75 }
 *   or localStorage elegantfin-item-trailer-random-start=1
 *
 * Install: load this script via JavaScript Injector (or equivalent) after the
 * ElegantFin CSS import. Pair with item-detail-trailer-backdrop.css.
 *
 * Closes design discussion in ElegantFin #303. Avoids #247/#246 by never
 * styling .videoPlayerContainer for background trailers.
 */
(function (window, document) {
    'use strict';

    var CFG = {
        fadeDelayMs: 700,
        fadeClass: 'is-visible',
        pageClass: 'elegantfin-trailer-playing',
        videoId: 'elegantfin-item-trailer-bg',
        hostClass: 'elegantfin-item-trailer-host',
        minWidthEm: 42,
        // How long to wait for detail DOM after hash change
        domWaitMs: 4000,
        domPollMs: 100,
        // Random start — OFF by default on item detail (start from beginning).
        // Media Bar uses its own setting (ON by default there).
        // Override: window.ElegantFinItemTrailer = { randomStart: true, minPercent: 10, maxPercent: 75 }
        randomStart: false,
        randomStartMinPercent: 10,
        randomStartMaxPercent: 75
    };

    function readUserTrailerConfig() {
        try {
            var u = window.ElegantFinItemTrailer;
            if (!u || typeof u !== 'object') return;
            if (typeof u.randomStart === 'boolean') CFG.randomStart = u.randomStart;
            if (typeof u.minPercent === 'number') CFG.randomStartMinPercent = u.minPercent;
            if (typeof u.maxPercent === 'number') CFG.randomStartMaxPercent = u.maxPercent;
            if (typeof u.randomStartMinPercent === 'number') CFG.randomStartMinPercent = u.randomStartMinPercent;
            if (typeof u.randomStartMaxPercent === 'number') CFG.randomStartMaxPercent = u.randomStartMaxPercent;
        } catch (e) { /* ignore */ }
        // localStorage override: elegantfin-item-trailer-random-start = "1" | "0"
        try {
            var ls = window.localStorage && localStorage.getItem('elegantfin-item-trailer-random-start');
            if (ls === '1' || ls === 'true') CFG.randomStart = true;
            if (ls === '0' || ls === 'false') CFG.randomStart = false;
            var mn = localStorage.getItem('elegantfin-item-trailer-random-min');
            var mx = localStorage.getItem('elegantfin-item-trailer-random-max');
            if (mn != null && mn !== '') CFG.randomStartMinPercent = parseInt(mn, 10) || CFG.randomStartMinPercent;
            if (mx != null && mx !== '') CFG.randomStartMaxPercent = parseInt(mx, 10) || CFG.randomStartMaxPercent;
        } catch (e2) { /* ignore */ }
    }

    function clampPercent(n, fallback) {
        n = parseInt(n, 10);
        if (isNaN(n)) return fallback;
        return Math.max(0, Math.min(100, n));
    }

    /** Pick start seconds within duration when randomStart is enabled; else 0. */
    function pickDetailTrailerStartSeconds(duration) {
        if (!CFG.randomStart) return 0;
        if (!duration || duration < 3 || !isFinite(duration)) return 0;
        var minP = clampPercent(CFG.randomStartMinPercent, 10) / 100;
        var maxP = clampPercent(CFG.randomStartMaxPercent, 75) / 100;
        if (maxP < minP) {
            var tmp = minP;
            minP = maxP;
            maxP = tmp;
        }
        // leave ~2s tail so there is always motion
        var usable = Math.max(0, duration - 2);
        var lo = usable * minP;
        var hi = usable * maxP;
        if (hi <= lo) return Math.max(0, lo);
        return lo + Math.random() * (hi - lo);
    }

    function applyDetailTrailerStart(video) {
        if (!video) return;
        var apply = function () {
            try {
                var d = video.duration;
                var t = pickDetailTrailerStartSeconds(d);
                if (t > 0 && isFinite(t)) {
                    video.currentTime = t;
                    log('detail trailer start at', Math.round(t * 10) / 10, 's /', Math.round(d), 's', CFG.randomStart ? '(random)' : '(start)');
                }
            } catch (e) { /* ignore seek errors */ }
        };
        if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
            apply();
        } else {
            video.addEventListener('loadedmetadata', apply, { once: true });
        }
    }

    var TRANSPARENCY_MASK = (
        'linear-gradient(to bottom,' +
        '#000 0%,' +
        '#000 calc(100% - 250px),' +
        'rgba(0,0,0,0.65) calc(100% - 160px),' +
        'rgba(0,0,0,0.25) calc(100% - 80px),' +
        'transparent 100%)'
    );

    function applyTransparencyMask(el) {
        if (!el || !el.style) return;
        el.style.webkitMaskImage = TRANSPARENCY_MASK;
        el.style.maskImage = TRANSPARENCY_MASK;
        el.style.webkitMaskSize = '100% 100%';
        el.style.maskSize = '100% 100%';
        el.style.webkitMaskRepeat = 'no-repeat';
        el.style.maskRepeat = 'no-repeat';
        el.style.transform = 'translateZ(0)';
    }

    function clearTransparencyMask(el) {
        if (!el || !el.style) return;
        el.style.webkitMaskImage = '';
        el.style.maskImage = '';
        el.style.webkitMaskSize = '';
        el.style.maskSize = '';
        el.style.transform = '';
    }


    var MBAR_UNMASK_CSS = [
        '.slides .backdrop,.slides .backdrop-container,.slides .backdrop-overlay,.slides .gradient-overlay,.slides .video-backdrop,',
        '.backdrop-container,.backdrop-container.full-width-video,.backdrop-container .backdrop,.backdrop-container .backdrop-overlay,',
        '.backdrop-container .video-backdrop,.backdrop-container video,.backdrop,.backdrop-overlay,.gradient-overlay,.gradient-overlay.full-width-video,',
        '.video-backdrop,.video-backdrop-default,#slides-container .backdrop,#slides-container .backdrop-container,#slides-container .gradient-overlay,',
        '#slides-container video,body.media-bar-mobile-16-9 .backdrop-container,body.media-bar-mobile-16-9 .gradient-overlay,body.media-bar-mobile-16-9 .backdrop,',
        'body.media-bar-mobile-4-3 .backdrop-container,body.media-bar-mobile-4-3 .gradient-overlay,body.media-bar-mobile-4-3 .backdrop{',
        '-webkit-mask-image:none!important;mask-image:none!important;-webkit-mask:none!important;mask:none!important;',
        '-webkit-mask-size:auto!important;mask-size:auto!important;}',
        /* do NOT unmask our detail trailer nodes */
        '#itemDetailPage:not(.hide) .elegantfin-item-trailer-host,',
        '#itemDetailPage:not(.hide) .elegantfin-item-trailer-bg{',
        '/* masks re-applied inline by applyTransparencyMask */ }'
    ].join('');

    function forceUnmaskMediaBar() {
        var id = 'elegantfin-mbar-unmask-style';
        var el = document.getElementById(id);
        if (!el) {
            el = document.createElement('style');
            el.id = id;
            el.textContent = MBAR_UNMASK_CSS;
            // Append last so it beats plugin-injected MBE CSS
            (document.body || document.documentElement).appendChild(el);
        } else if (el.parentNode) {
            el.parentNode.appendChild(el); // move to end
        }
        // Inline !important on live Media Bar nodes (beats almost everything)
        try {
            document.querySelectorAll(
                '#slides-container .backdrop, #slides-container .backdrop-container, #slides-container .backdrop-overlay, ' +
                '#slides-container .gradient-overlay, #slides-container .video-backdrop, #slides-container video, ' +
                '.slides .backdrop, .slides .backdrop-container, .slides .video-backdrop, .slides video, ' +
                '.backdrop-container, .backdrop-container .video-backdrop, .gradient-overlay'
            ).forEach(function (node) {
                // never touch our detail trailer
                if (node.closest && node.closest('#itemDetailPage')) return;
                if (node.classList && (node.classList.contains('elegantfin-item-trailer-bg') || node.classList.contains('elegantfin-item-trailer-host'))) return;
                try {
                    node.style.setProperty('mask-image', 'none', 'important');
                    node.style.setProperty('-webkit-mask-image', 'none', 'important');
                    node.style.setProperty('mask', 'none', 'important');
                    node.style.setProperty('-webkit-mask', 'none', 'important');
                } catch (e1) {}
            });
        } catch (e) {}
    }


    /** Remove every trailer node/class in the whole document (home / media bar safe). */
    function purgeAllTrailers() {
        try {
            document.querySelectorAll('.elegantfin-item-trailer-host, .elegantfin-item-trailer-bg, .elegantfin-item-trailer-fade').forEach(function (node) {
                try {
                    if (node.tagName === 'VIDEO') {
                        node.pause();
                        node.removeAttribute('src');
                        node.load();
                    }
                } catch (e1) {}
                clearTransparencyMask(node);
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            document.querySelectorAll('.elegantfin-has-trailer-video, .elegantfin-trailer-playing').forEach(function (node) {
                node.classList.remove('elegantfin-has-trailer-video', 'elegantfin-trailer-playing');
            });
        } catch (e) { /* ignore */ }
    }

    var state = {
        itemId: null,
        timer: null,
        video: null,
        host: null,
        destroyed: false
    };

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (e) {
            return false;
        }
    }

    function isNarrowTouch() {
        try {
            return (
                window.matchMedia &&
                window.matchMedia('(max-width: 42em) and (hover: none)').matches
            );
        } catch (e) {
            return false;
        }
    }

    function getApiClient() {
        if (window.ApiClient) {
            return window.ApiClient;
        }
        try {
            if (window.connectionManager && typeof window.connectionManager.currentApiClient === 'function') {
                return window.connectionManager.currentApiClient();
            }
        } catch (e) { /* ignore */ }
        return null;
    }

    function parseItemId() {
        var hash = window.location.hash || '';
        var search = window.location.search || '';
        var m = (hash + '&' + search).match(/[?&#]id=([0-9a-fA-F]{32}|[0-9a-fA-F-]{36})/i);
        if (m) {
            return m[1];
        }
        m = hash.match(/\/(?:details|item|movies|tv)[^/]*\/([0-9a-fA-F]{32}|[0-9a-fA-F-]{36})/i);
        if (m) {
            return m[1];
        }
        // data attribute on page when hash parsers fail
        var page = document.getElementById('itemDetailPage');
        if (page) {
            var el = page.querySelector('[data-id]');
            if (el && el.getAttribute('data-id')) {
                return el.getAttribute('data-id');
            }
        }
        return null;
    }

    function isDetailContext() {
        var hash = (window.location.hash || '').toLowerCase();
        // Strict: only movie/TV item detail routes — never home / media bar
        var onDetails =
            hash.indexOf('details') !== -1 ||
            /[#/]item[?#/]/.test(hash) ||
            hash.indexOf('/item?') !== -1;
        if (!onDetails) {
            return false;
        }
        var page = document.getElementById('itemDetailPage');
        if (!page) {
            return false;
        }
        if (page.classList && page.classList.contains('hide')) {
            return false;
        }
        // Must actually have the detail backdrop node
        return !!(page.querySelector('#itemBackdrop') || page.querySelector('.itemBackdrop'));
    }

        function findBackdropEl() {
        var page = document.getElementById('itemDetailPage');
        if (!page || (page.classList && page.classList.contains('hide'))) {
            return null;
        }
        // ONLY the detail-page banner — never Media Bar / slides / home
        var el = page.querySelector('#itemBackdrop.itemBackdrop') || page.querySelector('#itemBackdrop');
        if (!el) {
            return null;
        }
        if (el.closest && (el.closest('.slides') || el.closest('.backdrop-container') || el.closest('#homeTab'))) {
            return null;
        }
        if (el.id === 'backgroundContainer' || (el.classList && el.classList.contains('backgroundContainer'))) {
            return null;
        }
        return el;
    }

    function teardown() {
        state.destroyed = true;
        purgeAllTrailers();
        if (state.timer) {
            clearTimeout(state.timer);
            state.timer = null;
        }
        var page = document.getElementById('itemDetailPage');
        if (page) {
            page.classList.remove(CFG.pageClass);
        }
        if (state.video) {
            try {
                state.video.pause();
                state.video.removeAttribute('src');
                state.video.load();
            } catch (e) { /* ignore */ }
            if (state.video.parentNode) {
                state.video.parentNode.removeChild(state.video);
            }
            state.video = null;
        }
        if (state.host) {
            var bp = state.host.parentElement;
            if (bp && bp.classList) {
                bp.classList.remove('elegantfin-has-trailer-video');
            }
            if (state.host.parentNode) {
                state.host.parentNode.removeChild(state.host);
            }
            state.host = null;
        }
        state.itemId = null;
        state.destroyed = false;
    }

    function streamUrlForTrailer(api, trailer) {
        if (!trailer || !trailer.Id) {
            return null;
        }
        // Match Media Bar Enhanced: progressive stream.mp4 URL.
        // Do NOT force static=true — Trailarr/local trailers are often MKV;
        // Jellyfin will remux to a browser-playable MP4 progressive stream.
        try {
            var params = {
                mediaSourceId: trailer.Id
            };
            try {
                if (api.accessToken) {
                    params.api_key = api.accessToken();
                }
            } catch (e1) { /* ignore */ }
            return api.getUrl('Videos/' + trailer.Id + '/stream.mp4', params);
        } catch (e) {
            try {
                return api.getUrl('Videos/' + trailer.Id + '/stream', {
                    mediaSourceId: trailer.Id
                });
            } catch (e2) {
                return null;
            }
        }
    }

    function log() {
        if (window.console && console.log) {
            var args = ['[ElegantFin item-trailer]'].concat(Array.prototype.slice.call(arguments));
            console.log.apply(console, args);
        }
    }

    function ensureHost(backdropEl) {
        // CRITICAL: host must live INSIDE .itemBackdrop so the video is
        // clipped to the title backdrop banner — not the full page background.
        try {
            var cs = window.getComputedStyle(backdropEl);
            if (cs.position === 'static') {
                backdropEl.style.position = 'relative';
            }
            // never clip siblings / page width — host clips the video itself
            backdropEl.style.overflow = 'visible';
        } catch (e) { /* ignore */ }

        var host = backdropEl.querySelector(':scope > .' + CFG.hostClass);
        if (!host) {
            host = document.createElement('div');
            host.className = CFG.hostClass + ' elegantfin-trailer-active';
            backdropEl.appendChild(host);
        }
        backdropEl.classList.add('elegantfin-has-trailer-video');
        var pageEarly = document.getElementById('itemDetailPage');
        if (pageEarly) { pageEarly.classList.add('elegantfin-trailer-playing'); }

        state.host = host;

        // Remove any hosts that escaped onto the page shell (older builds)
        try {
            document.querySelectorAll('.' + CFG.hostClass).forEach(function (node) {
                if (node !== host && (!backdropEl.contains(node))) {
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                }
            });
            document.querySelectorAll('#' + CFG.videoId).forEach(function (node) {
                if (!host.contains(node)) {
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                }
            });
        } catch (eClean) { /* ignore */ }

        return host;
    }

    function playTrailer(api, itemId, trailer) {
        var backdropEl = findBackdropEl();
        if (!backdropEl) {
            return;
        }
        var url = streamUrlForTrailer(api, trailer);
        if (!url) {
            return;
        }

        var host = ensureHost(backdropEl);
        var video = document.createElement('video');
        video.id = CFG.videoId;
        video.className = 'elegantfin-item-trailer-bg';
        video.muted = true;
        video.defaultMuted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.preload = 'metadata';
        video.src = url;
        video.setAttribute('aria-hidden', 'true');

        // Clear previous
        while (host.firstChild) {
            host.removeChild(host.firstChild);
        }
        host.appendChild(video);
        state.video = video;
        applyTransparencyMask(host);
        applyTransparencyMask(video);
        applyDetailTrailerStart(video);

        log(
            'mounted inside',
            backdropEl.id || '(no id)',
            backdropEl.className,
            'size',
            backdropEl.clientWidth + 'x' + backdropEl.clientHeight
        );

        var page = document.getElementById('itemDetailPage');
        var shown = false;

        function show() {
            if (shown || state.itemId !== itemId) {
                return;
            }
            shown = true;
            video.classList.add(CFG.fadeClass);
            if (page) {
                page.classList.add(CFG.pageClass);
            }
            if (backdropEl && backdropEl.classList) {
                backdropEl.classList.add('elegantfin-has-trailer-video');
            }
            log('transparency mask active on trailer host');
        }

        video.addEventListener('loadeddata', function () {
            state.timer = setTimeout(function () {
                var p = video.play();
                if (p && typeof p.then === 'function') {
                    p.then(show).catch(function () {
                        /* autoplay blocked — leave static backdrop */
                    });
                } else {
                    show();
                }
            }, CFG.fadeDelayMs);
        });

        video.addEventListener('error', function () {
            log('video error', video.error && video.error.code, url);
            teardown();
        });
        log('loading trailer stream', url);
    }

    function tryStart() {
        // Always purge when not on a visible movie/TV detail page (protects Media Bar / home)
        if (!isDetailContext()) {
            teardown();
            return;
        }
        if (prefersReducedMotion() || isNarrowTouch()) {
            log('skip: reduced-motion or narrow touch');
            teardown();
            return;
        }

        var itemId = parseItemId();
        if (!itemId) {
            log('skip: no item id in', window.location.hash);
            return;
        }
        log('detail item', itemId);
        if (state.itemId === itemId && state.video) {
            return;
        }

        teardown();
        state.itemId = itemId;

        var api = getApiClient();
        if (!api || typeof api.getLocalTrailers !== 'function') {
            return;
        }

        var userId = null;
        try {
            userId = api.getCurrentUserId && api.getCurrentUserId();
        } catch (e) { /* ignore */ }
        if (!userId) {
            return;
        }

        // Wait for detail DOM
        var started = Date.now();
        (function waitDom() {
            if (state.itemId !== itemId) {
                return;
            }
            var backdrop = findBackdropEl();
            if (!backdrop) {
                if (Date.now() - started < CFG.domWaitMs) {
                    setTimeout(waitDom, CFG.domPollMs);
                }
                return;
            }

            api.getLocalTrailers(userId, itemId)
                .then(function (trailers) {
                    if (state.itemId !== itemId) {
                        return;
                    }
                    if (!trailers || !trailers.length) {
                        log('no LocalTrailers for', itemId);
                        return;
                    }
                    log('LocalTrailers', trailers.length, trailers[0].Name || trailers[0].Id);
                    // Prefer first playable trailer item
                    playTrailer(api, itemId, trailers[0]);
                })
                .catch(function (err) {
                    log('getLocalTrailers failed', err);
                });
        })();
    }

    function onRoute() {
        forceUnmaskMediaBar();
        var hash = (window.location.hash || '').toLowerCase();
        var onHome = (
            hash === '' ||
            hash === '#' ||
            hash.indexOf('home') !== -1 ||
            hash.indexOf('/list') !== -1 ||
            hash.indexOf('livetv') !== -1
        ) && hash.indexOf('details') === -1 && hash.indexOf('/item') === -1;
        if (onHome || !isDetailContext()) {
            teardown();
        }
        // Defer so Jellyfin can mount #itemDetailPage
        setTimeout(tryStart, 50);
        setTimeout(tryStart, 300);
        setTimeout(tryStart, 900);
    }

    function bind() {
        readUserTrailerConfig();
        window.addEventListener('hashchange', onRoute);
        window.addEventListener('popstate', onRoute);
        document.addEventListener('viewshow', onRoute, true);
        document.addEventListener('pagehide', function () {
            teardown();
        }, true);

        // Pause background trailer when real playback likely starts
        document.addEventListener(
            'click',
            function (ev) {
                var t = ev.target;
                if (!t || !state.video) {
                    return;
                }
                var el = t.closest && t.closest('.detailButton-play, .btnPlay, [data-action="play"], .playstatebutton');
                if (el) {
                    try {
                        state.video.pause();
                    } catch (e) { /* ignore */ }
                    var page = document.getElementById('itemDetailPage');
                    if (page) {
                        page.classList.remove(CFG.pageClass);
                    }
                    state.video.classList.remove(CFG.fadeClass);
                }
            },
            true
        );

        onRoute();
        // MBE injects CSS/DOM late — keep unmasking on home
        setInterval(function () {
            try {
                var hash = (window.location.hash || '').toLowerCase();
                if (hash.indexOf('details') === -1) {
                    forceUnmaskMediaBar();
                }
            } catch (e) {}
        }, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})(window, document);
