!function(o){if(o===top){if(o.YoutubeVideosWindowHelperScript)return o.YoutubeVideosWindowHelperScript
var e=o.document,t=function(){var t=function(o){var t=e.createElement("style")
t.innerHTML=["ul.youtubevideodownloader_select {","font-family:  Helvetica, Arial;","font-size: 14px;","line-height: 14px;","height: 14px;","list-style-type: none;","padding: 0;","white-space: nowrap;","display: inline-block;","border-radius: 2px;","width: 110px}","ul.youtubevideodownloader_select .dropdown a {","text-decoration: none}",'ul.youtubevideodownloader_select .dropdown [data-toggle="dropdown"] {',"position: relative;","display: block;","color: #999;","background: #f0f0f0;","border: 1px solid #ddd;","box-shadow: 0 1px 0 rgba(0,0,0,0.05);","padding: 10px 25px 10px 10px}",'ul.youtubevideodownloader_select .dropdown [data-toggle="dropdown"]:hover {}',"ul.youtubevideodownloader_select .dropdown .icon-arrow {","position: absolute;","display: block;","font-size: 20px;","color: #999;","top: 10px;","right: 6px;","font-style: normal;","transform:rotate(90deg)}","ul.youtubevideodownloader_select .dropdown:hover .icon-arrow{color: #666}","ul.youtubevideodownloader_select .dropdown .icon-arrow.open {","transform:rotate(180deg);","transition: transform 0.6s}","ul.youtubevideodownloader_select .dropdown .icon-arrow.close {","transform:rotate(90deg);","transition: transform 0.6s}","ul.youtubevideodownloader_select .dropdown .icon-arrow:before {",'content: "\\23CF"}',"ul.youtubevideodownloader_select .dropdown .dropdown-menu {","max-height: 0;","overflow: hidden;","list-style: none;","padding: 0;","margin: 0}","ul.youtubevideodownloader_select .dropdown .dropdown-menu li {","padding: 0}","ul.youtubevideodownloader_select .dropdown .dropdown-menu li a {","display: block;","color: #6f6f6f;","background: #fff;","box-shadow: 0 1px 0 white inset, 0 -1px 0 #d5d5d5 inset;","text-shadow: -1px -1px 0 rgba(255, 255, 255, 1);","padding: 10px 10px}","ul.youtubevideodownloader_select .dropdown .show, ul.youtubevideodownloader_select .dropdown .hide {","transform-origin: 50% 0%;","border:1px solid #d3d3d3;","width: 108px;","border-radius: 2px;","box-shadow:5px 5px 10px rgba(0,0,0,0.2)}","ul.youtubevideodownloader_select .dropdown .show {","display: block;","max-height: 9999px;","transform:scaleY(1);","animation: youtubevideodownloader_select_showAnimation 0.5s ease-in-out;","transition: max-height 1s ease-in-out}","ul.youtubevideodownloader_select .dropdown .hide {","max-height: 0;","transform:scaleY(0);","animation: youtubevideodownloader_select_hideAnimation 0.4s ease-out;","transition: max-height 0.6s ease-out}","@keyframes youtubevideodownloader_select_showAnimation {","0% {","transform:scaleY(0.1)}","40% {","transform:scaleY(1.04)}","60% {","transform:scaleY(0.98)}","80% {","transform:scaleY(1.04)}","100% {","transform:scaleY(0.98)}","80% {","transform:scaleY(1.02)}","100% {","transform:scaleY(1);","}}","@keyframes youtubevideodownloader_select_hideAnimation {","0% {","transform:scaleY(1)}","60% {","transform:scaleY(0.98)}","80% {","transform:scaleY(1.02)}","100% {","transform:scaleY(0)}","}"].join(""),e.head.insertAdjacentElement("beforeEnd",t)
var n="saved video",i=e.querySelector("h1.title")
null!==i&&(n=i.innerHTML)
var s=['<ul class="youtubevideodownloader_select" id="download-youtube-chrome-extension">','<li class="dropdown">','<a href="#" data-toggle="dropdown">Videos <i class="icon-arrow"></i> <i class="icon-circle"></i></a>','<ul class="dropdown-menu">'].join(""),l=0
for(var d in o){var u=o[d]
""!==u.url&&0===u.url.indexOf("http")&&(s=void 0===u.formatObject?s+'<li><a href="'+u.url+'" target="_blank">Unknown Format</a></li>':s+'<li><a href="'+u.url+'" download="'+n.replace('"',"%22")+"."+u.formatObject.format.toLocaleLowerCase()+'" target="_blank">'+u.formatObject.resolution+"p "+u.formatObject.format+"</a></li>",l++)}s+=["</ul>","</li>","</ul>"].join("")
var c=e.getElementById("container")
null!==c&&(c.insertAdjacentHTML("beforeend",s),r()),a()},a=function(){var o=XMLHttpRequest.prototype.open
XMLHttpRequest.prototype.open=function(){this.addEventListener("load",function(){if(-1!=this.responseURL.search("timedtext")){var o=e.getElementById("download-youtube-chrome-extension-subtitles")
if(o)o.href=this.responseURL
else{var t=e.querySelector("#download-youtube-chrome-extension ul"),a="saved video",r=e.querySelector("h1.title")
null!==r&&(a=r.innerHTML),t.insertAdjacentHTML("beforeend",'<li id="download-youtube-chrome-extension-subtitles"><a href="'+this.responseURL+'" title="'+a.replace('"',"%22")+'" download="'+a.replace('"',"%22")+'.asr3">Subtitles</a></li>')}}}),o.apply(this,arguments)}},r=function(){var t=!1
"ontouchstart"in o?t=!0:o.navigator.msPointerEnabled&&(t=!0)
var a=e.querySelectorAll("ul.youtubevideodownloader_select .dropdown")
Array.prototype.slice.call(a,0).forEach(function(o){var e=o.querySelector('a[data-toggle="dropdown"]'),a=o.querySelector(".dropdown-menu"),r=e.querySelector("i.icon-arrow"),n=function(o){a.hasClass("show")?(a.classList.remove("show"),a.classList.add("hide"),r.classList.remove("open"),r.classList.add("close"),o.preventDefault()):(a.classList.add("show"),a.classList.remove("hide"),r.classList.add("open"),r.classList.remove("close"),o.preventDefault())}
e.onclick=n,t&&(e.ontouchstart=n)}),Element.prototype.hasClass=function(o){return this.className&&new RegExp("(^|\\s)"+o+"(\\s|$)").test(this.className)}},n=function(){var o=[]
try{var e={5:{itag:5,resolution:224,format:"FLV"},6:{itag:6,resolution:270,format:"FLV"},13:{itag:13,resolution:144,format:"3GP"},17:{itag:17,resolution:144,format:"3GP"},18:{itag:18,resolution:360,format:"MP4"},22:{itag:22,resolution:720,format:"MP4"},34:{itag:34,resolution:360,format:"FLV"},35:{itag:35,resolution:480,format:"FLV"},36:{itag:36,resolution:240,format:"3GP"},37:{itag:37,resolution:1080,format:"MP4"},38:{itag:38,resolution:2304,format:"MP4"},43:{itag:43,resolution:360,format:"WebM"},44:{itag:44,resolution:480,format:"WebM"},45:{itag:45,resolution:720,format:"WebM"},46:{itag:46,resolution:1080,format:"WebM"},82:{itag:82,resolution:360,format:"MP4"},83:{itag:83,resolution:240,format:"MP4"},84:{itag:84,resolution:720,format:"MP4"},85:{itag:85,resolution:520,format:"MP4"},100:{itag:100,resolution:360,format:"WebM"},101:{itag:101,resolution:480,format:"WebM"},102:{itag:102,resolution:720,format:"WebM"}},t=ytplayer.config.args.url_encoded_fmt_stream_map,a=t.split(",")
for(var r in a){streamData=a[r].split("&")
var n="",i=0
for(var s in streamData)0===streamData[s].indexOf("itag=")&&(itagData=streamData[s].split("="),i=itagData[1]),0===streamData[s].indexOf("url=")&&(urlData=streamData[s].split("="),n=unescape(urlData[1])),0===streamData[s].indexOf("sig=")&&(sigData=streamData[s].split("="),unescape(sigData[1]))
if(""!==n&&0!==i){var l={formatObject:e[i],url:n}
o.push(l)}}return o}catch(e){return console.log(e),o}},i=function(){var o=e.getElementById("download-youtube-chrome-extension")
"undefined"!=typeof ytplayer&&void 0!==ytplayer.config&&null!==ytplayer.config&&void 0!==ytplayer.config.args&&void 0!==ytplayer.config.args.url_encoded_fmt_stream_map&&null===o&&t(n())}
return{init:function(){o.history&&history.pushState?setInterval(i,300):t(n())}}}()
o.YoutubeVideosWindowHelperScript=t}}(this)
