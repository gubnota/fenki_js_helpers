(function(window) {
    if (window !== top) return;
    if ( !! window.YoutubeVideosWindowHelperScript) {
        return window.YoutubeVideosWindowHelperScript;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var YoutubeVideosWindowHelperScript = (function() {

var replaceAll = function(input, stringToFind, stringToReplaceWith) {
    myRegExp = new RegExp(stringToFind, 'g');
    return input.replace(myRegExp, stringToReplaceWith);
};
var setDiv = function(videos) {
    var css = document.createElement('style');
    css.innerHTML=[
'ul.youtubevideodownloader_select {',
'font-family:  Helvetica, Arial;',
'font-size: 14px;',
'line-height: 14px;',
'height: 14px;',
'list-style-type: none;',
'padding: 0;',
'white-space: nowrap;',
'display: inline-block;',
'border-radius: 2px;',
'width: 110px}',
'ul.youtubevideodownloader_select .dropdown a {',
'text-decoration: none}',
'ul.youtubevideodownloader_select .dropdown [data-toggle="dropdown"] {',
'position: relative;',
'display: block;',
'color: #999;',
'background: #f0f0f0;',
'border: 1px solid #ddd;',
'box-shadow: 0 1px 0 rgba(0,0,0,0.05);',
'padding: 10px 25px 10px 10px}',
'ul.youtubevideodownloader_select .dropdown [data-toggle="dropdown"]:hover {}',
'ul.youtubevideodownloader_select .dropdown .icon-arrow {',
'position: absolute;',
'display: block;',
'font-size: 20px;',
'color: #999;',
'top: 10px;',
'right: 6px;',
'font-style: normal;',
'transform:rotate(90deg)}',
'ul.youtubevideodownloader_select .dropdown:hover .icon-arrow{color: #666}',
'ul.youtubevideodownloader_select .dropdown .icon-arrow.open {',
'transform:rotate(180deg);',
'transition: transform 0.6s}',
'ul.youtubevideodownloader_select .dropdown .icon-arrow.close {',
'transform:rotate(90deg);',
'transition: transform 0.6s}',
'ul.youtubevideodownloader_select .dropdown .icon-arrow:before {',
'content: "\\23CF"}',
'ul.youtubevideodownloader_select .dropdown .dropdown-menu {',
'max-height: 0;',
'overflow: hidden;',
'list-style: none;',
'padding: 0;',
'margin: 0}',
'ul.youtubevideodownloader_select .dropdown .dropdown-menu li {',
'padding: 0}',
'ul.youtubevideodownloader_select .dropdown .dropdown-menu li a {',
'display: block;',
'color: #6f6f6f;',
'background: #fff;',
'box-shadow: 0 1px 0 white inset, 0 -1px 0 #d5d5d5 inset;',
'text-shadow: -1px -1px 0 rgba(255, 255, 255, 1);',
'padding: 10px 10px}',
'ul.youtubevideodownloader_select .dropdown .show, ul.youtubevideodownloader_select .dropdown .hide {',
'transform-origin: 50% 0%;',
'border:1px solid #d3d3d3;',
'width: 108px;',
'border-radius: 2px;',
'box-shadow:5px 5px 10px rgba(0,0,0,0.2)}',
'ul.youtubevideodownloader_select .dropdown .show {',
'display: block;',
'max-height: 9999px;',
'transform:scaleY(1);',
'animation: youtubevideodownloader_select_showAnimation 0.5s ease-in-out;',
'transition: max-height 1s ease-in-out}',
'ul.youtubevideodownloader_select .dropdown .hide {',
'max-height: 0;',
'transform:scaleY(0);',
'animation: youtubevideodownloader_select_hideAnimation 0.4s ease-out;',
'transition: max-height 0.6s ease-out}',
'@keyframes youtubevideodownloader_select_showAnimation {',
'0% {',
'transform:scaleY(0.1)}',
'40% {',
'transform:scaleY(1.04)}',
'60% {',
'transform:scaleY(0.98)}',
'80% {',
'transform:scaleY(1.04)}',
'100% {',
'transform:scaleY(0.98)}',
'80% {',
'transform:scaleY(1.02)}',
'100% {',
'transform:scaleY(1);',
'}}',
'@keyframes youtubevideodownloader_select_hideAnimation {',
'0% {',
'transform:scaleY(1)}',
'60% {',
'transform:scaleY(0.98)}',
'80% {',
'transform:scaleY(1.02)}',
'100% {',
'transform:scaleY(0)}',
'}'].join('');
    document.head.insertAdjacentElement('beforeEnd',css);
    var title = 'saved video';
    var titleH1 = document.getElementById('watch-headline-title');
    if (titleH1 !== null) {
        title = titleH1.children[0].innerText;
    }
;
;
    var html = ['<ul class="youtubevideodownloader_select" id="download-youtube-chrome-extension">',
'<li class="dropdown">',
'<a href="#" data-toggle="dropdown">Videos <i class="icon-arrow"></i> <i class="icon-circle"></i></a>',
'<ul class="dropdown-menu">'].join('');
    var counter = 0;
    for (var i in videos) {
        var video = videos[i];
        if (video.url !== '' && video.url.indexOf('http') === 0) {
            if (typeof video.formatObject == 'undefined') {
                html = html + '<li><a href="' + video.url + '" target="_blank">Unknown Format</a></li>';
            } else {
                html = html + '<li><a href="' + video.url + '" download="' + encodeURI(title) +'.'+ video.formatObject.format.toLocaleLowerCase()+'" target="_blank">' + video.formatObject.resolution + 'p ' + video.formatObject.format + '</a></li>';
            }
            counter++;
        }
    }
    html = html + ['</ul>',
    '</li>',
    '</ul>'].join('');
    var wpDiv = document.getElementById('watch-headline-title');
    if (wpDiv !== null) {
        wpDiv.insertAdjacentHTML('beforeend', html);
    button_click_event_handler_activator();
    }
    subtitles();
};
var subtitles = function(){
var origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
this.addEventListener('load', function() {
if (this.responseURL.search('timedtext')!=-1)
{var d0 = document.getElementById('download-youtube-chrome-extension-subtitles');
if (!d0){
var d1=document.querySelector('#download-youtube-chrome-extension ul');
d1.insertAdjacentHTML('beforeend', '<li id="download-youtube-chrome-extension-subtitles"><a href="'+this.responseURL+'" download>Subtitles</a></li>');
}else {d0.href=this.responseURL;}}
});origOpen.apply(this, arguments);};
};
var button_click_event_handler_activator = function(){
    var TouchEvent = false;
    if ('ontouchstart' in window) {
        //iOS & android
        TouchEvent = true;
    } else if(window.navigator.msPointerEnabled) {
        //Win8
        TouchEvent = true;
    }
    var dropdown = document.querySelectorAll('ul.youtubevideodownloader_select .dropdown');
    var links = document.querySelectorAll('ul.youtubevideodownloader_select ul.dropdown-menu li a');
    var dropdownArray = Array.prototype.slice.call(dropdown, 0);
    dropdownArray.forEach(function (el) {
        var button = el.querySelector('a[data-toggle="dropdown"]'), menu = el.querySelector('.dropdown-menu'), arrow = button.querySelector('i.icon-arrow');
        var clickEventHandler = function (event) {
            if (!menu.hasClass('show')) {
                menu.classList.add('show');
                menu.classList.remove('hide');
                arrow.classList.add('open');
                arrow.classList.remove('close');
                event.preventDefault();
            } else {
                menu.classList.remove('show');
                menu.classList.add('hide');
                arrow.classList.remove('open');
                arrow.classList.add('close');
                event.preventDefault();
            }
        };
        button.onclick = clickEventHandler;
        if(TouchEvent) button.ontouchstart = clickEventHandler;
    });
    Element.prototype.hasClass = function (className) {
        return this.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(this.className);
    };
};
var getVideos = function() {
        var videos = [];
    try {
        var formats = {
            5: {
                itag: 5,
                resolution: 224,
                format: "FLV"
            },
            6: {
                itag: 6,
                resolution: 270,
                format: "FLV"
            },
            13: {
                itag: 13,
                resolution: 144,
                format: "3GP"
            },
            17: {
                itag: 17,
                resolution: 144,
                format: "3GP"
            },
            18: {
                itag: 18,
                resolution: 360,
                format: "MP4"
            },
            22: {
                itag: 22,
                resolution: 720,
                format: "MP4"
            },
            34: {
                itag: 34,
                resolution: 360,
                format: "FLV"
            },
            35: {
                itag: 35,
                resolution: 480,
                format: "FLV"
            },
            36: {
                itag: 36,
                resolution: 240,
                format: "3GP"
            },
            37: {
                itag: 37,
                resolution: 1080,
                format: "MP4"
            },
            38: {
                itag: 38,
                resolution: 2304,
                format: "MP4"
            },
            43: {
                itag: 43,
                resolution: 360,
                format: "WebM"
            },
            44: {
                itag: 44,
                resolution: 480,
                format: "WebM"
            },
            45: {
                itag: 45,
                resolution: 720,
                format: "WebM"
            },
            46: {
                itag: 46,
                resolution: 1080,
                format: "WebM"
            },
            82: {
                itag: 82,
                resolution: 360,
                format: "MP4"
            },
            83: {
                itag: 83,
                resolution: 240,
                format: "MP4"
            },
            84: {
                itag: 84,
                resolution: 720,
                format: "MP4"
            },
            85: {
                itag: 85,
                resolution: 520,
                format: "MP4"
            },
            100: {
                itag: 100,
                resolution: 360,
                format: "WebM"
            },
            101: {
                itag: 101,
                resolution: 480,
                format: "WebM"
            },
            102: {
                itag: 102,
                resolution: 720,
                format: "WebM"
            }
        };
        var flashVarsString = ytplayer.config.args.url_encoded_fmt_stream_map;
        var streamFiles = flashVarsString.split(',');
        for (var i in streamFiles) {
            streamData = streamFiles[i].split('&');
            var url = '';
            var sig = '';
            var itag = 0;
            for (var y in streamData) {
                if (streamData[y].indexOf('itag=') === 0) {
                    itagData = streamData[y].split('=');
                    itag = itagData[1];
                }
                if (streamData[y].indexOf('url=') === 0) {
                    urlData = streamData[y].split('=');
                    url = unescape(urlData[1]);
                }
                if (streamData[y].indexOf('sig=') === 0) {
                    sigData = streamData[y].split('=');
                    sig = unescape(sigData[1]);
                }

            }
            if (url !== '' && itag !== 0) {
                var video = {
                    formatObject: formats[itag],
                    url: url + '&title='+encodeURI(title)// + '&signature=' + sig
                };
                videos.push(video);
            }
        }
        return videos;
    } catch (err) {
        console.log(err);
        return videos;
    }
};

var listener = function() {
    var ext = document.getElementById('download-youtube-chrome-extension');
    if (typeof ytplayer !== 'undefined' &&
        typeof ytplayer.config !== 'undefined' &&
        ytplayer.config !== null &&
        typeof ytplayer.config.args !== 'undefined' &&
        typeof ytplayer.config.args.url_encoded_fmt_stream_map !== 'undefined' &&
        ext === null) {
        setDiv(getVideos());
    }
};
var _init = function(){

    if (window.history && history.pushState) {
        setInterval(listener, 300);
    } else {
        setDiv(getVideos());
    }
};
        var exports = {
            init: _init
        };
        return exports;
    })();

    window.YoutubeVideosWindowHelperScript = YoutubeVideosWindowHelperScript;
    return YoutubeVideosWindowHelperScript;
})(this);