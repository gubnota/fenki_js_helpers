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
    html = html + '<div style="font-weight: bold; padding: 5px; border-bottom: 1px solid #CCC;">Click on the format to save the video as:</div>';
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
    html = html + '<div style="padding: 5px; font-weight: bold">&gt;&gt; <a onclick="_gaq.push([\'_trackEvent\', \'Ringtone\', \'Click\', \'' + replaceAll(title, '"', '&quot;') + '\']);" href="//www.ringtonematcher.com/go/?sid=DYTVros&search=' + replaceAll(title.replace(/[-]/ig, ''), '"', '&quot;') + '" target="_blank">Download &quot;' + replaceAll(title, '"', '&quot;') + '&quot; ringtone to your phone</a> &lt;&lt;</div>';
    html = html + '<div style="padding: 5px;">';
    html = html + '<div id="download-youtube-chrome-ad-620-60"><IFRAME SRC="https://ib.adnxs.com/tt?id=3990674&referrer=[REFERRER_URL]" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" WIDTH="468" HEIGHT="60"></IFRAME></div>';
    html = html + '</div>';
    html = html + '<div style="padding: 5px;">';
    html = html + '</div>';
    html = html + '</div>';
    var wpDiv = document.getElementById('watch7-content');
    if (wpDiv !== null) {
        wpDiv.innerHTML = html + wpDiv.innerHTML;
        var sideAdDiv = document.getElementById('watch7-sidebar-contents');
        if (sideAdDiv !== null) {
        }
    }
    _gaq.push(['_trackPageview']);
};
getVideos = function() {
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
