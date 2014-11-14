"use strict";
/*
Copyright 2014 Gubnota Tech (Shenzhen) Ltd, Art Well Enterprise (HK) Ltd.
All rights reserved. Licensed under the Apache License,
Version 2.0 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
Written by: Vladislav Muravyev
Inspired by: Google inc. AdWords
Link: http://fenki.net/

To Load adds, call it like:

<script>(function(f,e,n,k,i){if(!e.getElementById('adds_script')){var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','adds_script');n.async=1;n.src=k;y.appendChild(n);if(typeof(Adds) == 'undefined'){n.onload = function() {Adds.init(
{
tag_container: 'ins',//tag container (possible values: ins, div, span, etc.)
tag_class: 'adds_container',// elements class selector for inserting content
font_size: '13px',// font size
header_size: '14px',// header size
bg: '#fef9f5',// background color
color: '#000',// link color
ajax: 1,// page load by ajax (1 - true/ 0 - none)
display: 'block',// display as block (possible as inline-block or inline-list)
provider_bg: '#669',// fenki.net adds link background color
provider_color: '#fff',// fenki.net adds link color
link_color: '#070',// link color
border_position: '-left',// border shadow position
font_family: '"Arial Narrow",Arial',// font-style
update_interval: 40// refresh adds every 40 sec
}
);}}}})(window,document,'script','http://fenki.net/adds/adds.min.js','head');</script> 

To insert adds:
 <ins class="adds_container"></ins>

</script>
*/

var Adds = (function(){
var dde = document.documentElement,w=window,m=Math,g="getElementsByTagName";
var i = 0;
var options = {
check_interval:1000,
tag_container:'ins',
tag_class:'adds_container',
font_size:'13px',
header_size:'14px',
bg:'#fef9f5',
provider_bg:'#669',
color:'#000',
provider_color:'#fff',
link_color:'#070',
border_position:'-left',
font_family:'"Arial Narrow",Arial',
update_interval:40,
url:'http://fenki.net/adds/?',
url_go: 'http://fenki.net/adds/go.php?',
url_track: 'http://fenki.net/adds/track.php?',
css: ['.%t% {display:%ds%;color: %cl% !important;}',
'.%t% .serp-block%s% h2,.%t%,.%t% .serp-block%s%,.%t% .serp-block%s% *{font-size: %fs%;color: %cl% !important;font-family:%ff%;text-decoration:none;}',
'.%t% .serp-block%s% h2{font-size: %hs%}',
'.%t% .serp-block%s%{overflow:hidden;}',
'.%t% .serp-block%s% .serp-item%s% h2{font-size: %hs%;}',
'.%t% .serp-block%s%{border%bp%: 1px solid rgba(0,0,0,.06);border-right: 1px solid rgba(0,0,0,.06);padding: 0 5px; padding-bottom:0;background-color: %bg%;}',
'.%t% .serp-block%s% * {transition: all 0.2s ease-in 0s; text-align: left;}',
'.%t% .serp-block%s% a {color: %cl% !important;text-decoration: none;}',
'.%t% .serp-block%s% h2 a:hover,.%t% .serp-block%s% .url_link:hover {color:#000; background-color: #ff0;box-shadow: 0 0 10px rgba(0,0,0,.06);cursor: hand;}',
'.%t% .serp-block%s% .head{font-size: %hs%;font-family:%ff%;top: 0;display: block;-webkit-box-shadow: none !important;box-shadow: none !important;}',
'.%t% .serp-block%s% .head-wrap%s%{line-height: 1.154;padding: 0 14px 0 12px;background: 0 0;position: relative;z-index: 1;}',
'.%t% .head%s% a{color: %pcl% !important;text-decoration: none;}',
'.%t% .head%s%{display: inline-block;float:right;padding:0 5px;background-color: %pbg%;font-size: %fs%;font-family:%ff%;border-right: 6px solid rgba(0,0,0,.06);}',
'.%t% .serp-block%s% .serp-item%s%{line-height:16px;position:relative;margin: 0;padding: 0;}',
'.%t% .serp-block%s% .item-wrap%s%{padding:0.2em;display: block;}',
'.%t% .serp-block%s% .serp-item%s% h2{font-weight: 400; line-height: 18px; margin: -12px 25px 0 0; padding-top: 10px; overflow: hidden; padding-bottom: 1px;}',
'.%t% .serp-block%s% .url_link%s%,.%t% .serp-block%s% .url_link%s% a:link,.%t% .serp-block%s% .url_link%s%:visited a,.%t% .serp-block%s% .url_link%s% a{font-size: %fs%;font-family:%ff%;text-decoration: none;color: %lcl% !important;}',
'.%t% .serp-item%s% h2 + div>a{margin: 2px 0;padding-bottom: 0;}',
'.%t% .serp-item%s% span{font-size:110%;line-height: 1em;word-wrap: break-word;}',
'.%t% .serp-block%s% .url_link%s%{float:left;}',

],
suffix:"_"+(+(new Date())),
ajax:1,
display:'block',
};
var vars = {};
function getOffsetSum(elem) {
    var top=0, left=0;
    while(elem) {
        top = top + parseFloat(elem.offsetTop);
        left = left + parseFloat(elem.offsetLeft);
        elem = elem.offsetParent ;       
    }
    
    return {top: m.round(top), left: m.round(left)};
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = dde;
    var scrollTop = w.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = w.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: m.round(top), left: m.round(left) };
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        
        return getOffsetRect(elem);
    } else {
        
        return getOffsetSum(elem);
    }
}

var getPageScroll = (w.pageXOffset !== undefined) ?
  function () {
    return {
      left: pageXOffset,
      top: pageYOffset
    };
  } :
  function () {
    var html = dde;
    var body = document.body;
    var top = html.scrollTop || body && body.scrollTop || 0;
    top -= html.clientTop;
    var left = html.scrollLeft || body && body.scrollLeft || 0;
    left -= html.clientLeft;
    return { top: top, left: left };
  };

function getWindowSize(){
var  winW,  winH;
    if (document.compatMode=='CSS1Compat' &&
    dde &&
    dde.offsetWidth ) {
 winW = dde.offsetWidth;
 winH = dde.offsetHeight;
}
if (w.innerWidth && w.innerHeight) {
 winW = w.innerWidth;
 winH = w.innerHeight;
}
return { height: m.round(winH), width: m.round(winW) };
}


var isVisible = function(elem){
var XY = getOffset(elem);
var STL = getPageScroll();
var WH = getWindowSize();
if (STL.left + WH.width >= XY.left && XY.left >= STL.left && STL.top + WH.height >= XY.top && XY.top >= STL.top){return true;}
else {return null;}
};

function getAdds(){
if (options.ajax) {
var adds = document.getElementsByClassName(options.tag_class);
vars.adds = [];
    for (var i = adds.length - 1; i >= 0; i--) {
        if (options.tag_container.toUpperCase() == adds[i].tagName.toUpperCase())
        {
            vars.adds.push(adds[i]);
        }
    }
}
    var out_adds = [];
    for (var obj_add in vars.adds){
    if (vars.adds[obj_add].nodeType != 1) continue;
    if (isVisible(vars.adds[obj_add])) {
        var last_timestamp = attr(vars.adds[obj_add],'data-time');
        var timestamp = (new Date().getMinutes())*60 + new Date().getSeconds();
    if (last_timestamp === undefined || +last_timestamp + options.update_interval < timestamp || timestamp < +last_timestamp)
    {
        out_adds.push(vars.adds[obj_add]);
    }
    }
    }
    if  (out_adds.length>0)  updateAdds(out_adds);
}


var attr = function(elem,attrib,val){
for (var attribute in elem.attributes){
    if (elem.attributes[attribute].nodeName == attrib) {
    if (val !== undefined) elem.attributes[attribute].nodeValue = val;
        return elem.attributes[attribute].nodeValue;
    }
}
    if (elem.attributes !== undefined && val !== undefined){
        elem.setAttribute(attrib,val);
    }
    return val;
};

var updateAdds = function(elems){
    try {
    var XHR = w.XDomainRequest || w.XMLHttpRequest;
    var xhr = new XHR();

    xhr.open('GET', options.url+"title="+encodeURIComponent(document.title)+"&count="+encodeURIComponent(elems.length)+
    '&domain='+encodeURIComponent(document.domain)+'&url='+encodeURIComponent(document.location.pathname), true);

    
    xhr.onload = function() {
        w.callOtherDomainResponseText = xhr.responseXML;
        var a = w.callOtherDomainResponseText;
        var add = a[g]('add');
        var p = a[g]('provider')[0];
        var new_timestamp = (new Date().getMinutes())*60 + new Date().getSeconds();
		for (var i in add){
			if( add[i].nodeName === undefined) continue;
		    attr(elems[i],'data-time',new_timestamp);
		    attr(elems[i],'data-id',+add[i][g]('id')[0].textContent);
		    elems[i].onmouseenter=function(event){
		    	
			    var xhr2 = new XHR();
			    xhr2.open('GET', options.url_track+"id="+attr(event.target,'data-id'), true);
			        xhr2.onload = function() {
			        }
		            xhr2.send();

		};
		    var o = '<div class="serp-block%s%">'.replace(/%s%/g,options.suffix);
			o += '<div class="serp-item%s%"><div class="item-wrap%s%">'.replace(/%s%/g,options.suffix);
		    o += '<h2><a target="_blank" rel="nofollow" href="'+options.url_go+'id='+add[i][g]('id')[0].textContent+'&amp;rand='+(+(new Date()))+'" data-id="'+add[i][g]('id')[0].textContent+'">'+(""+add[i][g]('title')[0].textContent).replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'>')+'</a></h2>';
		    o += '<div class="content%s%">'.replace(/%s%/g,options.suffix)+add[i][g]('text')[0].textContent.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'>')+'</div>';
		   	o += '<div class="head%s%"><a href="'.replace(/%s%/g,options.suffix)+p[g]('url')[0].textContent+'" target="_blank" rel="nofollow">'+p[g]('domain')[0].textContent+'</a></div>';
		    o += '<div class="url_link%s%"><a target="_blank" rel="nofollow" href="'.replace(/%s%/g,options.suffix)+options.url_go+'id='+add[i][g]('id')[0].textContent+'&amp;rand='+(+(new Date()))+'" data-id="'+add[i][g]('id')[0].textContent+'">'+add[i][g]('domain')[0].textContent.replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'>')+'</a></div>';
		    o += '</div>';
		    o += '</div></div>';
		    elems[i].innerHTML=o;
		}
    };

    xhr.onerror = function() {
    };

    xhr.send();
    return w.callOtherDomainResponseText;
    } catch (e) {
    }
};

var init = function(){
w.onload = function(){
if (w.adds_interval === undefined){
w.adds_interval = setInterval(getAdds,options.check_interval);
}
};

w.onfocus = function(){
if (w.adds_interval === undefined){
w.adds_interval = setInterval(getAdds,options.check_interval);
}
};

w.onblur = function(){
if (w.adds_interval !== undefined){
clearInterval(w.adds_interval);
w.adds_interval = undefined;
}
};

if (arguments[0] !== undefined){
		for(var i in options){
		if (typeof arguments[0][i] !== 'undefined') {options[i]=arguments[0][i];}
		}
	}
var adds = document.getElementsByClassName(options.tag_class);
vars.adds = [];
for (var i = adds.length - 1; i >= 0; i--) {
	if (options.tag_container.toUpperCase() == adds[i].tagName.toUpperCase())
	{
		vars.adds.push(adds[i]);
	}
}
if (document.getElementById(options.tag_class+'_style') === null){
var st = document.createElement('style');
st.setAttribute('id',options.tag_class+'_style');
var css = '';
css += options.css.join("\n").replace(/%t%/g,options.tag_class).replace(/%fs%/g,options.font_size).
replace(/%hs%/g,options.header_size).
replace(/%bg%/g,options.bg).
replace(/%bp%/g,options.border_position).
replace(/%ff%/g,options.font_family).
replace(/%s%/g,options.suffix).
replace(/%pbg%/g,options.provider_bg).
replace(/%pcl%/g,options.provider_color).
replace(/%lcl%/g,options.link_color).
replace(/%cl%/g,options.color).
replace(/%ds%/g,options.display);
st.innerHTML = css;
var parent = document.head;
parent.appendChild(st);
}

};

return {init:init};
})();
