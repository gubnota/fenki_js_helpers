// ==UserScript==
// @name         console.save as a file
// @namespace    fenki_js_helpers
// @downloadURL http://gubnota.github.io/fenki_js_helpers/plugin/monkey/console.save/main.user.js
// @version      0.1
// @description  saves json objects to file when one calls console.save(data)
// @author       You
// @match        http://localhost:*/*
// @match        http://127.0.0.1:*/*
// @match        http://192.168.*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant none
// ==/UserScript==
// Usage: console.save('content', 'filename')
(function(){
  window.console.save = (data, filename)=>{
  
      if(!data) {
          console.error('Console.save: No data')
          return;
      }
      if(!filename) filename = 'console.json'
  
      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }
  
      const blob = new Blob([data], {type: 'text/json'});
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');
  
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
      setTimeout(()=>{window.URL.revokeObjectURL(a.href); delete a},1000);
   }
  })()