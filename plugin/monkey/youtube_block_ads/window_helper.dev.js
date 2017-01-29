(function(window) {
    if (window !== top) return;
    if ( !! window.BlockYoutubeAddsWindowHelperScript) {
        return window.BlockYoutubeAddsWindowHelperScript;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var BlockYoutubeAddsWindowHelperScript = (function() {
    var config = {_LOG:true};

config.youtube = {
  set annotations (val) {app.storage.write("annotations", val + '')},
  set nativeBlock (val) {app.storage.write("native-block", val + '')},
  get annotations () {return true;},//((app.storage.read("annotations") === "true") ? true : false)
  get nativeBlock () {return true;},//((app.storage.read("native-block") === "true") ? true : false)
  "requestBlock": {
    "blockAnnotationsRegexp": new RegExp(["\\/annotations_invideo\\?"].join("|"), "i"),
    "matchRegexp": /https?:\/\/(\w*.)?youtube./i,
    "blockAdsRegexp": new RegExp([
      "\\%22ad",
      "\\&adfmt\\=",
      "\\.atdmt\\.",
      "watch7ad\\_",
      "\\.innovid\\.",
      "\\/adsales\\/",
      "\\/adserver\\/",
      "\\.fwmrm\\.net",
      "\\/stats\\/ads",
      "ad\\d-\\w*\\.swf$",
      "\\.doubleclick\\.",
      "\\/www\\-advertise\\.",
      "google\\-analytics\\.",
      "\\.googleadservices\\.",
      "\\.googletagservices\\.",
      "\\.googlesyndication\\.",
      "\\.serving\\-sys\\.com\\/",
      "youtube\\.com\\/ptracking\\?",
      ":\\/\\/.*\\.google\\.com\\/uds\\/afs",
      "\\/csi\\?v\\=\\d+\\&s\\=youtube\\&action\\=",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ads[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adunit[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adhost[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adview[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\d]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]googleads[\\=\\&\\_\\-\\.\\/\\?\\s]"
    ].join("|"), "i")
  }
};

      config.get = function (name) {return name.split(".").reduce(function (p, c) {return p[c]}, config)};

      config.set = function (name, value) {
        function set(name, value, scope) {
          name = name.split(".");
          if (name.length > 1) {
            set.call((scope || this)[name.shift()], name.join("."), value);
          } else this[name[0]] = value;
        }
        set(name, value, config);
      };

      function _init(){
      chrome.onBeforeRequest=function (top, current) {
        if (config._LOG) console.log(">> Url: ", top);
        var isYoutubeURL = config.youtube.requestBlock.matchRegexp.test(top);
        if (isYoutubeURL) {
          if (current.indexOf(".googlevideo.") !== -1) return;
          var isAdRequest = config.youtube.requestBlock.blockAdsRegexp.test(current);
          if (isAdRequest) {
            if (config._LOG) console.error(">> Blocking Ads: ", current);
            return {"cancel": true}
          }
          /*  */
          if (config.youtube.annotations === true) {
            var isAnnotationsRequest = config.youtube.requestBlock.blockAnnotationsRegexp.test(current);
            if (isAnnotationsRequest) {
              if (config._LOG) console.error(">> Blocking Annotation: ", current);
              return {"cancel": true}
            }
          }
        }
      };
      }//_init()
            var exports = {
            config: config,
            init: _init
        };

        return exports;
    })();

    window.BlockYoutubeAddsWindowHelperScript = BlockYoutubeAddsWindowHelperScript;
    return BlockYoutubeAddsWindowHelperScript;
})(this);