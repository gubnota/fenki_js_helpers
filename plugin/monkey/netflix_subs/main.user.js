// ==UserScript==
// @name        Netflix - subtitle downloader
// @description Allows you to download subtitles from Netflix
// @version    3.4.5
// @author     Larry Moore
// @icon       https://gubnota.github.io/fenki_js_helpers/plugin/monkey/netflix_subs/icon.jpg
// @match      https://www.netflix.com/*
// @require    https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js
// @downloadURL https://gubnota.github.io/fenki_js_helpers/plugin/monkey/netflix_subs/main.user.js
// ==/UserScript==


(t=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=t,document.head.append(e)})(" #netfsubs{display:block;float:right;padding-top:calc(50vh - 4rem);padding-right:3rem}.logo[data-v-2eadbd64]{height:4rem;will-change:filter} ");

(function (vue) {
  'use strict';

  const downloadLogo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMy41IDNIMTJIN0M1Ljg5NTQzIDMgNSAzLjg5NTQzIDUgNVYxOUM1IDIwLjEwNDYgNS44OTU0MyAyMSA3IDIxSDcuNU0xMy41IDNMMTkgOC42MjVNMTMuNSAzVjcuNjI1QzEzLjUgOC4xNzcyOCAxMy45NDc3IDguNjI1IDE0LjUgOC42MjVIMTlNMTkgOC42MjVWOS43NVYxMlYxOUMxOSAyMC4xMDQ2IDE4LjEwNDYgMjEgMTcgMjFIMTYuNSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPHBhdGggZD0iTTEyIDEyVjIwTTEyIDIwTDkuNSAxNy41TTEyIDIwTDE0LjUgMTcuNSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPC9zdmc+";
  const doppleganger = {
    get: async (url) => {
      console.log(url);
      var response = await fetch(url);
      if (response.status == 200) {
        return response.text();
      }
    },
    hash: (url) => {
      var hash = 0, i, chr;
      if (url.length === 0)
        return hash;
      for (i = 0; i < url.length; i++) {
        chr = url.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return hash;
    },
    save: (data, filename) => {
      if (!data) {
        console.error("Console.save: No data");
        return;
      }
      if (!filename)
        filename = "console.json";
      if (typeof data === "object") {
        data = JSON.stringify(data, void 0, 4);
      }
      var blob = new Blob([data], { type: "text/json" }), e = document.createEvent("MouseEvents"), a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent("click", true, false);
      e.initMouseEvent("click", true, true);
      a.dispatchEvent(e);
    }
  };
  const _hoisted_1 = ["src"];
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      var originalOpen = XMLHttpRequest.prototype.open;
      window.doppleganger = doppleganger;
      window.found = [];
      XMLHttpRequest.prototype.open = async function(method, url) {
        if (url.indexOf("/?o=1&v=") > -1) {
          if (window.found.find((el) => el == url) == void 0) {
            window.found.push(url);
            console.log("Intercepted HTTP request: " + method + " " + url);
          }
        }
        originalOpen.apply(this, arguments);
      };
      var downloadHndlr = async () => {
        for (let i = 0; i < window.found.length; i++) {
          const url = window.found[i];
          var contents = await doppleganger.get(url);
          await doppleganger.save(contents, doppleganger.hash(url) + ".ttml");
        }
        window.found = [];
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createElementVNode("img", {
            src: vue.unref(downloadLogo),
            class: "logo",
            alt: "download subs",
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => vue.unref(downloadHndlr) && vue.unref(downloadHndlr)(...args))
          }, null, 8, _hoisted_1)
        ]);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2eadbd64"]]);
  vue.createApp(App).mount(
    (() => {
      const app = document.createElement("div");
      app.id = "netfsubs";
      document.querySelector("#appMountPoint").appendChild(app);
      return app;
    })()
  );

})(Vue);
