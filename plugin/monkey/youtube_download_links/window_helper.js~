replaceAll = function(input, stringToFind, stringToReplaceWith) {
    myRegExp = new RegExp(stringToFind, 'g');
    return input.replace(myRegExp, stringToReplaceWith);
};
setDiv = function(videos) {
    var title = 'saved video';
    var titleH1 = document.getElementById('watch-headline-title');
    if (titleH1 !== null) {
        title = titleH1.children[0].innerText;
    }
    var html = '<div id="download-youtube-chrome-extension" style="-moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 3px; border: 1px solid #CCC; margin-bottom: 10px; background-color: #fff;">';
    // html = html + '<div style="font-weight: bold; padding: 5px; border-bottom: 1px solid #CCC;">Click on the format to save the video as:</div>';
    html = html + '<div style="padding: 5px; font-weight: bold;">';
    var counter = 0;
    for (var i in videos) {
        var video = videos[i];
        if (video.url !== '' && video.url.indexOf('http') === 0) {
            if (counter !== 0) html = html + ' | ';
            if (typeof video.formatObject == 'undefined') {
                html = html + '<span><a href="' + video.url + '&title=' + replaceAll(title, '"', '%22') + '" onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + replaceAll(replaceAll(title, '"', '&quot;'), '\'', '\\\'') + '\', \'Unknown Format\']);">Unknown Format</a></span>';
            } else {
                html = html + '<span><a href="' + video.url + '&title=' + replaceAll(title, '"', '%22') + ' [' + video.formatObject.resolution + 'p]" onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + replaceAll(replaceAll(title, '"', '&quot;'), '\'', '\\\'') + '\', \'' + video.formatObject.format + ' ' + video.formatObject.resolution + 'p\']);">' + video.formatObject.resolution + 'p ' + video.formatObject.format + '</a></span>';
            }
            counter++;
        }
    }
    html = html + '</div>';
    html = html + '</div>';
    var wpDiv = document.getElementById('watch7-content');
    if (wpDiv !== null) {
        wpDiv.innerHTML = html + wpDiv.innerHTML;
        var sideAdDiv = document.getElementById('watch7-sidebar-contents');
        if (sideAdDiv !== null) {
        }
    }
    // _gaq.push(['_trackPageview']);
};
getVideos = function() {
    try {
        var formats = {
            1: {
                itag: 1,
                resolution: 240,
                format: "MP4"
            },
            2: {
                itag: 2,
                resolution: 360,
                format: "MP4"
            },
            3: {
                itag: 3,
                resolution: 480,
                format: "MP4"
            },
            4: {
                itag: 4,
                resolution: 720,
                format: "MP4"
            },
            5: {
                itag: 5,
                resolution: 1080,
                format: "MP4"
            },
            6: {
                itag: 6,
                resolution: 2304,
                format: "MP4"
            },
            7: {
                itag: 7,
                resolution: 240,
                format: "WebM"
            },
            8: {
                itag: 8,
                resolution: 360,
                format: "WebM"
            },
            9: {
                itag: 9,
                resolution: 480,
                format: "WebM"
            },
            10: {
                itag: 10,
                resolution: 720,
                format: "WebM"
            },
            11: {
                itag: 11,
                resolution: 1080,
                format: "WebM"
            },
            12: {
                itag: 12,
                resolution: 2304,
                format: "WebM"
            },
            13: {
                itag: 13,
                resolution: 520,
                format: "MP4"
            }
        };
        var videos = new Array();
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
                    url: url + '&signature=' + sig
                };
                videos.push(video);
            }
        }
        return videos;
    } catch (err) {
        var videos = new Array();
        console.log(err);
        return videos;
    }
}

listener = function() {
    var ext = document.getElementById('download-youtube-chrome-extension');
    if (typeof ytplayer !== 'undefined' &&
        typeof ytplayer.config !== 'undefined' &&
        ytplayer.config !== null &&
        typeof ytplayer.config.args !== 'undefined' &&
        typeof ytplayer.config.args.url_encoded_fmt_stream_map !== 'undefined' &&
        ext == null) {
        setDiv(getVideos());
    }
}
if (window.history && history.pushState) {
    setInterval("listener()", 300);
} else {
    setDiv(getVideos());
}
