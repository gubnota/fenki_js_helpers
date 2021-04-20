//javascript:(function()%7B(function(window%2C%20undefined)%7Bvar%20w%20%3D%20window%3Bif%20(w.self%20!%3D%20w.top)%20%7Breturn%3B%7Dif%20(%2F%3A%5C%2F%5C%2F.*domain%5C.com%5C%2F%2F.test(w.location.href))%20%7Bvar%20el%20%3D%20document.getElementById('bookmarklet_helper_script')%3Bif%20(el%20%3D%3D%3D%20null)%20%7B(function(f%2Ce%2Cn%2Ck%2Ci)%7Bvar%20m%3De.createElement(n)%3Bm.setAttribute('id'%2C'bookmarklet_helper_script')%3Bm.async%3Dtrue%3Bm.src%3Dk%3Bif(typeof(IFrameWindowHelper)%20%3D%3D%20'undefined')%7Bm.onload%20%3D%20function()%7BBookmarkletWindowHelperScript.init()%3B%7D%3B%7D(e%5Bi%5D('head')%5B0%5D%20%7C%7C%20e%5Bi%5D('body')%5B0%5D).appendChild(m)%3B%7D)(window%2Cdocument%2C'script'%2C(6%20%3D%3D%20document.location.protocol.length%20%3F%20'https%3A'%20%3A%20'http%3A')%20%2B%20'%2F%2Fgubnota.github.io%2Ffenki_js_helpers%2Fplugin%2Fbookmarklet%2Fwindow_helper.js'%2C'getElementsByTagName')%3B%7D%7D%7D)(window)%7D)()
//javascript:(function()%7B(function(f%2Ce%2Cn%2Ck%2Ci)%7Bvar%20m%3De.createElement(n)%3Bm.src%3Dk%3B(e%5Bi%5D('head')%5B0%5D%20%7C%7C%20e%5Bi%5D('body')%5B0%5D).appendChild(m)%3B%7D)(window%2Cdocument%2C'script'%2C(6%20%3D%3D%20document.location.protocol.length%20%3F%20'https%3A'%20%3A%20'http%3A')%20%2B%20'%2F%2Fgubnota.github.io%2Fbookmarklet.js'%2C'getElementsByTagName')%7D)()
//(function () { var a = document.getElementsByClassName('html5-main-video')[0]; var b = document.getElementsByTagName('h2')[1]; b.setAttribute('onclick', 's(this)'); var c = document.createElement('script'); c.innerHTML = 'var s = function(){var d=document,w=window,g="getSelection",s="toString",r="createRange",b="setStartBefore",a="setEndAfter",l="removeAllRanges",n="addRange",rng = d[r]();rng[b](arguments[0]);rng[a](arguments[0]);sel = w[g]();sel[l]();sel[n]( rng );return rng[s]();}'; document.body.appendChild(c); window.open(a.src, '_blank') })()

(function (window, undefined) {
    var w = window;
    if (w.self != w.top) {
        return;
    }
    if (/:\/\/.*domain\.com\//.test(w.location.href)) {
        var el = document.getElementById('bookmarklet_helper_script');
        if (el === null) {
            (function (f, e, n, k, i) {
                var m = e.createElement(n);
                m.setAttribute('id', 'bookmarklet_helper_script');
                m.async = true;
                m.src = k;
                if (typeof (IFrameWindowHelper) == 'undefined') {
                    m.onload = function () { BookmarkletWindowHelperScript.init(); };
                }
                (e[i]('head')[0] || e[i]('body')[0]).appendChild(m);
            })(window, document, 'script', (6 == document.location.protocol.length ? 'https:' : 'http:') + '//gubnota.github.io/fenki_js_helpers/plugin/bookmarklet/window_helper.js', 'getElementsByTagName');
        }
    }
})(window);
