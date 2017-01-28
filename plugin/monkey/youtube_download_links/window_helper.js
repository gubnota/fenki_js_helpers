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
                html = html + '<span><a href="' + video.url + '&title=' + replaceAll(title, '"', '%22') + '" onclick="_gaq.push([\'_trackEvent\', \'Download\', \'' + replaceAll(replaceAll(title, '"', '&quot;'), '\'', '\\\'') + '\', \'' + video.formatObject + '\']);">' + video.formatObject + '</a></span>';
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
        var videos = new Array();
        var flashVarsString = ytplayer.config.args.url_encoded_fmt_stream_map;
        var streamFiles = flashVarsString.split(',');
/*
var streamFiles = ["itag=43&url=https%3A%2F%2Fr4---sn-npoe7n7s.googlevideo.com%2Fvideoplayback%3Fms%3Dau%26mv%3Dm%26source%3Dyoutube%26lmt%3D1366332914793823%26ip%3D188.166.188.135%26key%3Dyt6%26id%3Do-AESwpKQuKv2xrrGk1OmmH7euo-B47aS2X2TPJISLqUlu%26dur%3D0.000%26mn%3Dsn-npoe7n7s%26mm%3D31%26nh%3DIgpwcjAyLnNpbjExKg03NC4xMjUuNTEuMTcz%26mt%3D1484908540%26requiressl%3Dyes%26ipbits%3D0%26sparams%3Dclen%252Cdur%252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cnh%252Cpl%252Cratebypass%252Crequiressl%252Csource%252Cupn%252Cexpire%26ratebypass%3Dyes%26initcwndbps%3D5757500%26mime%3Dvideo%252Fwebm%26upn%3DYXOSAcJ13cY%26signature%3D2DCBCA0179C4959D3B96502A449715CD7CB57D7A.BE5F38DE24A50F2B32680D2717F8433BBE857E6A%26gir%3Dyes%26itag%3D43%26clen%3D4261367%26expire%3D1484930355%26ei%3D0-iBWNqwBdWh4ALV66aQAQ%26pl%3D20&type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22&quality=medium",
"itag=18&url=https%3A%2F%2Fr4---sn-npoe7n7s.googlevideo.com%2Fvideoplayback%3Fms%3Dau%26mv%3Dm%26source%3Dyoutube%26lmt%3D1458200718970429%26ip%3D188.166.188.135%26key%3Dyt6%26id%3Do-AESwpKQuKv2xrrGk1OmmH7euo-B47aS2X2TPJISLqUlu%26dur%3D143.127%26mn%3Dsn-npoe7n7s%26mm%3D31%26nh%3DIgpwcjAyLnNpbjExKg03NC4xMjUuNTEuMTcz%26mt%3D1484908540%26requiressl%3Dyes%26ipbits%3D0%26sparams%3Dclen%252Cdur%252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cnh%252Cpl%252Cratebypass%252Crequiressl%252Csource%252Cupn%252Cexpire%26ratebypass%3Dyes%26initcwndbps%3D5757500%26mime%3Dvideo%252Fmp4%26upn%3DYXOSAcJ13cY%26signature%3D5D11B3D7F98A3C97C5E18F56C06A45FEF358E587.5C7F8E8138C3F96DBF54F6B6F896D73BF9C98412%26gir%3Dyes%26itag%3D18%26clen%3D4798032%26expire%3D1484930355%26ei%3D0-iBWNqwBdWh4ALV66aQAQ%26pl%3D20&type=video%2Fmp4%3B+codecs%3D%22avc1.42001E%2C+mp4a.40.2%22&quality=medium",
"itag=36&url=https%3A%2F%2Fr4---sn-npoe7n7s.googlevideo.com%2Fvideoplayback%3Fms%3Dau%26mv%3Dm%26source%3Dyoutube%26lmt%3D1427915787414862%26ip%3D188.166.188.135%26key%3Dyt6%26id%3Do-AESwpKQuKv2xrrGk1OmmH7euo-B47aS2X2TPJISLqUlu%26dur%3D143.267%26mn%3Dsn-npoe7n7s%26mm%3D31%26nh%3DIgpwcjAyLnNpbjExKg03NC4xMjUuNTEuMTcz%26mt%3D1484908540%26requiressl%3Dyes%26ipbits%3D0%26sparams%3Dclen%252Cdur%252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cnh%252Cpl%252Crequiressl%252Csource%252Cupn%252Cexpire%26initcwndbps%3D5757500%26mime%3Dvideo%252F3gpp%26upn%3DYXOSAcJ13cY%26signature%3D7DFCFF06BF3ADE61867463BD20AE42F3F4AC875D.22641C40FC7D11FF3F97233D9EF868840958C7D8%26gir%3Dyes%26itag%3D36%26clen%3D3780406%26expire%3D1484930355%26ei%3D0-iBWNqwBdWh4ALV66aQAQ%26pl%3D20&type=video%2F3gpp%3B+codecs%3D%22mp4v.20.3%2C+mp4a.40.2%22&quality=small",
"itag=17&url=https%3A%2F%2Fr4---sn-npoe7n7s.googlevideo.com%2Fvideoplayback%3Fms%3Dau%26mv%3Dm%26source%3Dyoutube%26lmt%3D1389170033587033%26ip%3D188.166.188.135%26key%3Dyt6%26id%3Do-AESwpKQuKv2xrrGk1OmmH7euo-B47aS2X2TPJISLqUlu%26dur%3D143.499%26mn%3Dsn-npoe7n7s%26mm%3D31%26nh%3DIgpwcjAyLnNpbjExKg03NC4xMjUuNTEuMTcz%26mt%3D1484908540%26requiressl%3Dyes%26ipbits%3D0%26sparams%3Dclen%252Cdur%252Cei%252Cgir%252Cid%252Cinitcwndbps%252Cip%252Cipbits%252Citag%252Clmt%252Cmime%252Cmm%252Cmn%252Cms%252Cmv%252Cnh%252Cpl%252Crequiressl%252Csource%252Cupn%252Cexpire%26initcwndbps%3D5757500%26mime%3Dvideo%252F3gpp%26upn%3DYXOSAcJ13cY%26signature%3D3583F2152E2FD476E8239280C7C5474CA8C83159.316487F09E5B24691BB6035D8AB93FAAA6381F4A%26gir%3Dyes%26itag%3D17%26clen%3D1314344%26expire%3D1484930355%26ei%3D0-iBWNqwBdWh4ALV66aQAQ%26pl%3D20&type=video%2F3gpp%3B+codecs%3D%22mp4v.20.3%2C+mp4a.40.2%22&quality=small"]
*/
        for (var i in streamFiles) {
            streamData = streamFiles[i].split('&');
            var url = '';
            var type = '';
            var quality = '';
            var sig = '';
            var itag = 0;
//type: video/mp4, video/webm, url, itag, fallback_host, quality: medium, small, hd720
            for (var y in streamData) {
                if (streamData[y].indexOf('url=') === 0) {
                    urlData = streamData[y].split('=');
                    url = unescape(urlData[1]);
                }
                if (streamData[y].indexOf('type=') === 0) {
typeData = streamData[y].split('=');var v = unescape(typeData[1]);
/*if (v.indexOf('video/x-flv') !== -1) {type = "flv";}
else if (v.indexOf('video/3gpp') !== -1) {type = "3gp";}*/
if (v.indexOf('video/mp4') === 0) {type = "mp4";}
if (v.indexOf('video/webm') === 0) {type = "webm";}
                }
                if (streamData[y].indexOf('quality=') === 0) {
                    qualityData = streamData[y].split('=');
                    quality = unescape(qualityData[1]);
                }
                if (streamData[y].indexOf('itag=') === 0) {
                    itagData = streamData[y].split('=');
                    itag = itagData[1];
                }
                if (streamData[y].indexOf('signature=') === 0) {
                    sigData = streamData[y].split('=');
                    sig = unescape(sigData[1]);
                }

            }
            if (url !== '' && type !== '' && itag !== 0) {
                var video = {
                    formatObject: type+' '+quality,
                    url: url/* + '&signature=' + sig*/
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
