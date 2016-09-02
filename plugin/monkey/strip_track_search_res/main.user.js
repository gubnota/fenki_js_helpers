// Yandex/Google Strip Track Redirects
// version 0.0.2
// First release Date: 2014-02-28
// Last release Date: 2016-09-02
// ==UserScript==
// @name           Yandex/Google Strip Track Redirects
// @namespace      http://gubnota.github.io/fenki_js_helpers/plugin/monkey/strip_track_search_res/
// @version        0.1.1
// @copyright  2014+, Vladislav Muravyev
// @author Vladislav Muravyev
// @description    Strips click tracking redirects from Yandex/Google search results
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/strip_track_search_res/main.user.js
// @include        http://*.google.*
// @include        https://*.google.*
// @include        http://yandex.*
// @include        https://yandex.*
// @run-at document-end
// @grant          none
// ==/UserScript==

if(/google/.test(document.domain)||/yandex./.test(document.domain)){doIt();doRTR()}document.addEventListener("DOMAttrModified",function(event){if(/google./.test(document.domain)){if(event.target.id=="gsr"||event.target.id=="foot"){doIt()}}else if(/yandex./.test(document.domain)){if(event.target.classList.contains("link")){doIt()}}},false);document.addEventListener("DOMNodeInserted",function(e){if(e.target&&e.target.classList&&e.target.classList.contains("content"))doIt()});document.addEventListener("DOMNodeInserted",function(event){if(/google./.test(document.domain)){if(event.target.parentNode.id=="rtr"){doRTR(event.target);console.log("doRTR(event.target)")}}else if(/yandex./.test(document.domain)){if(event.target.classList&&event.target.classList.contains("main-portion")){doIt()}}},false);function doIt(){var resultLinks=$x("//a[@onmousedown]",XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);resultLinks.forEach(function(link){if(link.getAttribute("onmousedown")){link.removeAttribute("onmousedown")}});resultLinks=$x("//a");resultLinks.forEach(function(link){var oldLink=link.href;if(/^https?:\/\/.*.google\./.test(oldLink)){var matches=/url\?(url|q)=(.+?)&/.exec(oldLink);if(matches!==null){link.href=unescape(matches[2])}}})}function doRTR(){var resultLinks=[];if(arguments[0]===undefined){resultLinks=$x("//div[@id='rtr']//a",XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)}else{resultLinks=$x(arguments[0],"//a",XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)}resultLinks.forEach(function(link){var oldLink=link.href;console.log(link.href);if(/^https?:\/\/.*.google\./.test(oldLink)){var matches=/url\?(url|q)=(.+?)&/.exec(oldLink);if(matches!==null){link.href=unescape(matches[2])}}})}function $x(){var x="",node=document,type=0,fix=true,i=0,toAr=function(xp){var final=[],next;while(next=xp.iterateNext())final.push(next);return final},cur;while(cur=arguments[i++])switch(typeof cur){case"string":x+=x==""?cur:" | "+cur;continue;case"number":type=cur;continue;case"object":node=cur;continue;case"boolean":fix=cur;continue}if(fix){if(type==6)type=4;if(type==7)type=5}if(!/^\//.test(x))x="//"+x;if(node!=document&&!/^\./.test(x))x="."+x;var temp=document.evaluate(x,node,null,type,null);if(fix)switch(type){case 1:return temp.numberValue;case 2:return temp.stringValue;case 3:return temp.booleanValue;case 8:return temp.singleNodeValue;case 9:return temp.singleNodeValue}return fix?toAr(temp):temp}
