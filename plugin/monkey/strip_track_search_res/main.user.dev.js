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
// if (/yandex./.test(document.domain)){
// var as = document.getElementsByTagName('a');
// for(var i=0; i< as.length; i++){
//     if(as[i].classList.contains('b-link')){
//     as[i].setAttribute('onmousedown','');
//     }
//    }
// }//only for google domains
if(/google/.test(document.domain) || /yandex./.test(document.domain)){
doIt(); // make sure we run at least once, regardless of search results page version
doRTR(); // strip tracking from inital batch of real-time search results
}
document.addEventListener('DOMAttrModified', function (event) {
if (/google./.test(document.domain)){
  if (event.target.id == 'gsr' || event.target.id == 'foot') {
    doIt();
  }
}//google search
else if (/yandex./.test(document.domain)){
  if (event.target.classList.contains('link')) {
    doIt();
  }
}//yandex search
}, false);
// Yandex
document.addEventListener('DOMNodeInserted',function(e){
  if (e.target && e.target.classList && e.target.classList.contains('content')) doIt();
})
document.addEventListener('DOMNodeInserted', function (event) {
if (/google./.test(document.domain)){
  if (event.target.parentNode.id == 'rtr') {
    doRTR(event.target);
    console.log('doRTR(event.target)');
  }
}//google search
else if (/yandex./.test(document.domain)){
  if (event.target.classList && event.target.classList.contains('main-portion')) {
    doIt();
    // doRTR(event.target);
    // console.log('doRTR(event.target)');
  }
}//yandex search
}, false);

function doIt() {
  var resultLinks = $x("//a[@onmousedown]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  resultLinks.forEach(function(link) {  // loop over links
    if (link.getAttribute('onmousedown')) {
      link.removeAttribute('onmousedown');
    }
  });
  resultLinks = $x("//a");
  resultLinks.forEach(function(link) {  // loop over links
    var oldLink = link.href;
    if (/^https?:\/\/.*.google\./.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches !== null) {
        link.href = unescape(matches[2]);
      }
    }
  });
}

function doRTR() {
  var resultLinks = [];
  if (arguments[0] === undefined) {
    // get all real-time result links
    resultLinks = $x("//div[@id='rtr']//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  } else {
    // get all links from the current real-time result
    resultLinks = $x(arguments[0], "//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  }
  resultLinks.forEach(function(link) {  // loop over every link
    var oldLink = link.href; console.log(link.href);
    if (/^https?:\/\/.*.google\./.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches !== null) {
        link.href = unescape(matches[2]);
      }
    }
  });
}

// XPath helper, from
// http://wiki.greasespot.net/Code_snippets
function $x() {
  var x='',          // default values
      node=document,
      type=0,
      fix=true,
      i=0,
      toAr=function(xp){      // XPathResult to array
  var final=[], next;
  while(next=xp.iterateNext())
    final.push(next);
  return final
      },
      cur;
  while (cur=arguments[i++])      // argument handler
    switch(typeof cur) {
      case "string":x+=(x=='') ? cur : " | " + cur;continue;
      case "number":type=cur;continue;
      case "object":node=cur;continue;
      case "boolean":fix=cur;continue;
    }
  if (fix) {      // array conversion logic
    if (type==6) type=4;
    if (type==7) type=5;
  }
  if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                              // automatically return special type
      case 1:return temp.numberValue;
      case 2:return temp.stringValue;
      case 3:return temp.booleanValue;
      case 8:return temp.singleNodeValue;
      case 9:return temp.singleNodeValue;
    }
  return fix ? toAr(temp) : temp;
}
/* onmousedown="rc(this,'http://yandex.ru/clck/jsredir?from=yandex.ru%3Bsearch%2F%3Bweb%3B%3B&text=&etext=1166.16wGdTrc0evp9PDd9VEnb6zDkfSzrWZDu7tYmnyUyTw.ab0ccb6fe08e187e0b6982f399a1ce49ce68710f&uuid=&state=H4h8uvWmGgxI9Lvu7ERRTATFCcDThSa1pIJt0M-QyT2XQDBriNpXDebaPSNgzG0XT4uyJgP1Za1Opw3PF4rr-24tzqAvwNoC339EX23Y_8xz_qronzL8zjYOLdn6xVm5cMLvyo65D4s&data=UlNrNmk5WktYejY4cHFySjRXSWhXUEttdzUzRzR6R1RTTkFUbkNWUlA2VW9waGpEWm90TDlaSFplZmVEcW84RjRkN1NGVVVfUmpZOEx5U3NiRGpXckpuN1BjbUhRb01HazRnUEF5cDcwVUk&b64e=2&sign=8ad2791f829d37f849c06166ddd35cc9&keyno=8&cst=AiuY0DBWFJ5fN_r-AEszk6bypr0B2aCGQAijd1kgrR7VZjMaoXrO5B0ja7n3d6pDOpE6ncxR2XXUUg8oU4w9DNhCDNRQjpJhHTK-CP__NcDWA6BHsIKQcOLr2P6HSLydTbKv8BV4cDuDb3JxdhS0gofB-eK6cAIdyHSf-Q0X0LnXQoIueKWgxBc4flhP-Tnk&ref=orjY4mGPRjk5boDnW0uvlrrd71vZw9kp5fHOIQIKvOXWg7qHTGpqNzcq2aWz7pRvzt4j9nHcL4OiMxCPQ4E_v8Jpez923sEI&l10n=ru')"
*/