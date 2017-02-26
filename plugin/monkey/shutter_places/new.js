(function(window) {
    if (window !== top) return;
    if ( !! window.ShutterPlacesWindowHelperScript) {
        return window.ShutterPlacesWindowHelperScript;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var ShutterPlacesWindowHelperScript = (function() {
        var id = Math.ceil(Math.random() * 1000); //уникальный id объекта
        var ShutterPlacesWindowHelperScriptId = 'ShutterPlacesInfo' + id;
        var ShutterPlacesIframeId = 'ShutterPlacesInfoIframe' + id;
        var dismissLinkId = 'ShutterPlacesDismiss' + id;
        var buttonId = 'ShutterPlacesButtonOpen' + id;
        var lang = 'en';
        var https=(window.location.protocol.length==6 ? 'https' : 'http');
        var url = https+"://submit.shutterstock.com/api/user/downloads/map"; //"http://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/response.json";
        var tile=https+'://gubnota.github.io/worldpan_osm_map/osm/{z}/{x}/{y}@2x.';
        var ext = (navigator.userAgent.search('WebKit')>-1)?'webp':'png';
        var minZoom=2;
        var maxZoom=8;
        var base='';//https+"://gubnota.github.io/fenki_js_helpers/plugin/monkey/shutter_places/";
        var keys = ['buttonText','closeText','thumbText','similarText','utilizesText','timeText','placeText'];
        var dic = 
        {'en':{Places:'Places',Collapse:'Collapse',Thumbnail:'Thumbnail',Similar:'Similar on Site',Who:'Google Images',Time:'Time',Place:'Place',Undefined:'Undefined',Show:"Show all",Map:"Sales map",Selected:'Selected'},
        'ru':{Places:'Места',Collapse:'Свернуть',Thumbnail:'Миниатюра',Similar:'Похожие на сайте',Who:'Кто использует работу',Time:'Время покупки',Place:'Место покупки',Undefined:'Не определено',Show:"Показать всё",Map:"Карта продаж",Selected:"Выбрано продаж"},
        'zh':{Places:'地方',Collapse:'关闭',Thumbnail:'缩略图',Similar:'类似的图片',Who:'谁使用此图片',Time:'购物时间',Place:'购物场所',Undefined:'未定义',Show:"显示所有",Map:"销售地图",Selected:"已选择"},
        'fr':{Places:'Lieux',Collapse:'Fermer',Thumbnail:'Miniature',Similar:'Similaires dans le site',Who:'Qui utilise l\'image',Time:'Temps',Place:'Lieu',Undefined:'Indéterminé',Show:"Montre tout",Map:"Carte de vente",Selected:"Choisi"},
        'pl':{Places:'Miejsca',Collapse:'Zwiń okno',Thumbnail:'Miniatura',Similar:'Podobne w witrynie',Who:'Kto korzysta z obrazu',Time:'Pora',Place:'Miejsce',Undefined:'Nieokreślone',Show:"Pokaż wszystko",Map:"Mapa sprzedaży",Selected:"Wybrany"},
         'es':{Places:'Lugares',Collapse:'Cerrar',Thumbnail:'Miniatura',Similar:'Similar en el sitio',Who:'¿Quién utiliza la imagen',Time:'Tiempo',Place:'Lugar',Undefined:'Indefinido',Show:"Mostrar todo",Map:"Mapa de ventas",Selected:"Seleccionado"},
        'tr':{Places:'Yerler',Collapse:'Yakın',Thumbnail:'Küçük resim',Similar:'Sitedeki benzer',Who:'Kim resmi kullanır',Time:'Zaman',Place:'Yer',Undefined:'Tanımsız',Show:"Tümünü göster",Map:"Satış haritası",Selected:"Seçilmiş"},
        'pt':{Places:'Locais',Collapse:'Fechar',Thumbnail:'Thumbnail',Similar:'Similar no Site',Who:'Quem utiliza imagem',Time:'Tempo',Place:'Lugar',Undefined:'Indefinido',Show:"Mostre tudo",Map:"Mapa de vendas",Selected:"Selecionado"},
        'de':{Places:'Places',Collapse:'Fenster',Thumbnail:'Daumennagel',Similar:'Ähnliche vor Ort',Who:'Wer nutzt Bild',Time:'Zeit',Place:'Platz',Undefined:'Undefiniert',Show:"Zeige alles",Map:"Verkaufskarte",Selected:"Ausgewählt"},
        'id':{Places:'Tempat',Collapse:'Tutup',Thumbnail:'Miniatur',Similar:'Serupa di Situs',Who:'Siapa yang menggunakan gambar',Time:'Waktu',Place:'Tempat',Undefined:'Terdefinisi',Show:"Tunjukkan semua",Map:"Peta penjualan",Selected:"Terpilih"},
        'jp':{Places:'場所',Collapse:'隠す',Thumbnail:'サムネイル',Similar:'サイト上内サイト',Who:'誰が絵を利用',Time:'時間',Place:'場所',Undefined:'未定義',Show:"すべて表示する",Map:"セールスマップ",Selected:"選択された"}
        };
        var param = {url:url,base:base,tile:tile,ext:ext,minZoom:minZoom,maxZoom:maxZoom};
        var init = function(that){
        sp.map.build(that);
        sp.ui.set_user_lang();
        _ChangeMapOnClick();
        sp.button.build();
        };
        var Button = function(params){init(params,this);};
        var table = (function(that){
        function _setElementText(element, text) {
            element.innerHTML = text;
        };
        function _dismissLinkClick() {
            _close();
            return false;
        }
        this._createDismissLink = function(dismissText) {
            var dismissLink = document.createElement('a');
            _setElementText(dismissLink, dismissText || param.closeText);
            dismissLink.id = dismissLinkId;
            dismissLink.href = '#';
            dismissLink.style.cssText = 'color:#fff;margin:4px 10px 10px;text-decoration:none;font:normal 15px/17px \'PT Sans\',Arial;';
            return dismissLink;
        }
        this._createDialogElement = function(dismissText, linkHref) {
            var glassStyle = 'position:fixed;width:100%;height:100%;z-index:9999;' +
                'top:0;left:0;opacity:0.3;filter:alpha(opacity=30);' +
                'background-color:#000;';
            var dialogStyle = 'z-index:10000;position:fixed;top:0';
            var contentStyle = 'position:fixed;height:100%;width:100%;' +
                'background-color:#fff6e9;padding:10px 0;box-shadow:4px 4px 25px #888;font: 15px/17px "PT Sans",Arial;z-index: 10000;';
            var ShutterPlacesWindowHelperScriptElement = document.createElement('div');
            ShutterPlacesWindowHelperScriptElement.id = ShutterPlacesWindowHelperScriptId;

            var glassPanel = document.createElement('div');
            glassPanel.style.cssText = glassStyle;

            var content = document.createElement('div');
            content.style.cssText = contentStyle;

            var css = document.createElement('style');
            css.innerHTML = '#' + ShutterPlacesIframeId + ' table{' + ['background:#fff6e9',
                'width:100%',
                'margin-bottom:50px',
                'border-bottom:2px solid #bdb6ad',
                'margin:10px 0'
            ].join(';') + '}' + '#' + ShutterPlacesIframeId + ' th{' + ['display:table-cell',
                'padding:2px 10px',
                'border:solid #ece4d8',
                'border-width:0 2px 2px 0',
                'color:#cd596b',
                'font-family:"Open Sans",Myriad,Calibri,sans-serif',
                'font-weight:bold',
                'font-size:.85em',
            ].join(';') + '}' + '#' + ShutterPlacesIframeId + ' td{' + ['border-width:0 2px 0 0', 'border:solid #ece4d8', 'vertical-align:middle', 'text-align:center'].join(';') + '}' + '#' + ShutterPlacesIframeId + ' table:after{' + ['content:" "', 'display:block', 'width:100%', 'height:100px'].join(';') + '}' + '#' + ShutterPlacesIframeId + ' td.thumb img{' + ['min-width:50px', 'min-height:50px', 'max-width:100px'].join(';') + '}';
            var dialog = document.createElement('div');
            dialog.style.cssText = dialogStyle;
            dialog.id = ShutterPlacesWindowHelperScriptId+'dialog';
            var dismissLink = _createDismissLink(dismissText || param.closeText);
            dismissLink.style.cssText = dismissLink.style.cssText + ';display:block;background-color:#193441;' +
                'text-align:center;padding:4px;font:normal 15px/17px \'PT Sans\',Arial';

            content.appendChild(dismissLink);
            var frame = document.createElement('div');
            frame.id = ShutterPlacesIframeId;
            frame.style.cssText = "width:100%;height:100%;overflow-y:scroll;";
            content.appendChild(frame);
            dialog.appendChild(content);
            ShutterPlacesWindowHelperScriptElement.appendChild(glassPanel);
            ShutterPlacesWindowHelperScriptElement.appendChild(dialog);
            ShutterPlacesWindowHelperScriptElement.appendChild(css);
            return ShutterPlacesWindowHelperScriptElement;
        };
        this._showShutterPlacesWindowHelperScript = function(dismissText, linkHref) {
      var ShutterPlacesElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
      if (ShutterPlacesElement != null) {
        ShutterPlacesElement.style.display = 'block';
      }
      else{


                var consentElement =
                    _createDialogElement(dismissText || param.closeText, linkHref || '/');
                var fragment = document.createDocumentFragment();
                fragment.appendChild(consentElement);
                document.body.appendChild(fragment.cloneNode(true));
                document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
          }
        };
        this.Dialog = function (_url,lang) {
            Button(_url || url);
            _showShutterPlacesWindowHelperScript(_url || url);
            sp.table.draw_table();
            sp.ls.get();
            // sp.table.load_info(param.url);
        };

        this._close = function () {
            var ShutterPlacesElement = document.getElementById(ShutterPlacesWindowHelperScriptId);
            if (ShutterPlacesElement !== null) {
                ShutterPlacesElement.style.display = 'none';
            }
        }
        this._buttonIdClick = function() {
            Dialog(param.buttonText, param.closeText, url);
        };
        this.resolve_place = function(placespot, lon, lat, zoom){
        if (zoom === undefined) zoom = '11';
        jQuery.get(https+"://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon, function(data) {
            if (typeof data.results[0] !== 'undefined' && typeof data.results[0].formatted_address !== 'undefined') {
                var o = data.results[0].formatted_address;
            } else if (typeof lat !== 'undefined') {
                var o = '@' + lat + "," + lon;
            }
            if (typeof o !== 'undefined') placespot.html(o); // add place name to place cell
            }, "json");
        }

        this.draw_table = function (url) {
            var t = jQuery('#' + ShutterPlacesIframeId + ' table');
            if (typeof t.html() == 'undefined') {
                // console.log(document.getElementById(ShutterPlacesIframeId));
                // var t = document.createElement('table');
                // t.width = "100%";
                // t.height = "100%";
                // document.getElementById(ShutterPlacesIframeId).appendChild(t);
                jQuery('#' + ShutterPlacesIframeId).html('<table></table>');
                jQuery('#' + ShutterPlacesIframeId + ' table').append('<tr>' + '<th>'+param.thumbText+'</th>' + '<th>'+param.similarText+'</th>' + '<th>'+param.utilizesText+'</th>' + '<th>'+param.timeText+'</th>' + '<th>'+param.placeText+'</th>' + '</tr>');
            }
            // jQuery('#'+ShutterPlacesIframeId+' table').append('<tr>'+'<td>thumb</td>'+'<td>Stock</td>'+'<td>Google</td>'+'<td>time</td>'+'<td>place</td>'+'</tr>');
        };

        this.load_info = function (url) {
            var t = jQuery('#' + ShutterPlacesIframeId + ' table tr td');
            if (t.length < 1) {
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    success: function(data) {
                        _localStorage(data);
                        for (var i = 0; data.length > i; i++) {//data.length - 1
                            if (jQuery('#' + ShutterPlacesIframeId + ' table .' + data[i].media_id) === null) continue; // если уже есть такой id
                            var place = dic[lang][7];//vm20150528
                            var time = new Date(data[i].time*1000);
                            var coordinates = ''; var badge = 'Google maps';
                            if (data[i].coordinates[0] && data[i].coordinates[1]) {
                                // https://www.google.com/maps/dir//-20.4810998,-54.635534/@-21.3840774,-58.2390497,3z
                                //place = 'https://www.google.com/maps/@' + data[i].latitude + ',' + data[i].longitude + ',11z';
                                place = data[i].coordinates[0] + ',' + data[i].coordinates[1];
                                coordinates = place;
                            }
                            if (data[i].country) {place = data[i].country; if(data[i].city) {place += ', ' + data[i].city;} badge = place;}
                            if (data[i].coordinates[0] && data[i].coordinates[1]) {
                                place = 'https://www.google.com/maps/dir//' + place + '/@' + coordinates + ',3z';
                                place = '<a href="' + place + '" target="_blank">'+badge+'</a>';
                            }
                            else {var place = dic[lang][7]}
                            data[i].thumb_url = 'https://thumb1.shutterstock.com/display_pic_with_logo/0/0/'+data[i].media_id+'.jpg';
                            jQuery('#' + ShutterPlacesIframeId + ' table').append('<tr id="ph' + data[i].media_id + '_' + i + '" style="max-height:40px;">' + '<td class="thumb" style="width:105px"><a href="http://www.shutterstock.com/pic-' + data[i].media_id + '/index.html" target="_blank"><img src="' + data[i].thumb_url + '"></a></td>' + '<td class="similar"><a href="http://www.shutterstock.com/similar-' + data[i].media_id + '/index.html" target="_blank">Shutterstock</a></td>' + '<td class="google"><a href="https://www.google.com/searchbyimage?&amp;image_url=' + window.encodeURI('http://thumb1.shutterstock.com/display_pic_with_logo/0/0/' + data[i].media_id + '.jpg') + '" target="_blank">Google images</a></td>' + '<td class="time" style="max-width:80px">' + time + '</td>' + '<td class="place" style="max-width:100px;">' + place + '</td>' + '</tr>');
                            if(!data[i].country && !data[i].city && data[i].coordinates[0] !== undefined && data[i].coordinates[1] !== undefined)
                            ShutterPlacesWindowHelperScript.resolve_place(jQuery('#' + ShutterPlacesIframeId + ' table #ph' + data[i].media_id + '_' + i + ' .place a'), data[i].coordinates[1], data[i].coordinates[0], 11);
                        };
                    },
                    cache: false,
                    crossDomain: true,
                    dataType: "json"
                });
            }
        };
        this.Button = function (_param) {
          _ChangeMapOnClick();
          if (typeof _param === 'string') url = _param;
          for (var i in _param) { param[i] = _param[i]; }
            var ButtonElem = document.getElementById(buttonId);
            if (ButtonElem !== null) {
                return;
            } // уже существует кнопка
          //   if (_closeText !== undefined)
          //       closeText = _closeText;
          //   if (_buttonText !== undefined)
          //       buttonText = _buttonText;
          var lang = _get_user_lang();
            if (_param !== undefined) {
                url = _param.url||url;
            }
                for (var i in keys) {
                  if (dic[lang][i] !== undefined && _param === undefined || _param[keys[i]] === undefined){
                    param[keys[i]] = dic[lang][i];
                  }
                };
//            }
            var el = document.createElement('div');

            var css = document.createElement('style');
            css.innerHTML = ['#' + buttonId + '{position:fixed',
                'padding:11px 11px 22px',
                'background:#c33',
                'color:#fff',
                'font-size:14px',
                'font-weight:800',
                'margin:0',
                'border-radius:3px',
                'right:-22px',
                'max-width:200px',
                'cursor: pointer',
                'font-family:PT Sans,Helvetica Neue,Helvetica,Arial,sans-serif',
                'top:25px',
                'z-index:9999',
                'line-height:11px',
                'height:15px',
                'transform:rotate(-90deg)',
                'text-transform:uppercase',
                'overflow:hidden',
                'text-align:center'
            ].join(';') + '}';
            css.innerHTML += '#' + buttonId + ':hover{' + ['right:-21px','background:#df3b3b','box-shadow:0 2px 4px 0 rgba(71,0,0,.31)'].join(';') + '}';
            el.id = buttonId;
            el.innerHTML = param.buttonText;
            document.body.appendChild(css.cloneNode(true));
            // document.body.insertBefore(el.cloneNode(true),document.body.firstChild);
            document.body.appendChild(el.cloneNode(true));
            document.getElementById(buttonId).onclick = _buttonIdClick;
        };
        return {Dialog:Dialog,Button:Button,draw_table:draw_table,load_info:load_info,resolve_place:resolve_place};
        })();
        var button = (function(that){
        var buttonId = 'ShutterPlacesButtonOpen'+id;
        this.init = function(that){//js goes here
        };
        this.click = function(that){//js goes here
            var a = document.getElementById(buttonId);
            if(!a.className) {a.className='open';sp.map.show();}
            else {a.className='';sp.map.hide();}
        };
        var hide =function(that){
        document.getElementById(buttonId).className='open';
        };
        var show =function(that){
        document.getElementById(buttonId).className='';
        };
        this.build = function(that){
            var ButtonElem = document.getElementById(buttonId);
            if (ButtonElem !== null) {
                return;
            } // a button already exists
            var el = document.createElement('div');
            var css = document.createElement('style');
            css.innerHTML = ['#' + buttonId + '{position:fixed',
                'padding:11px 11px 22px',
                'background:#D91E18',
                'color:#fff',
                'font-size:14px',
                'font-weight:800',
                'margin:0',
                'border-radius:3px',
                'right:-22px',
                'max-width:200px',
                'cursor: pointer',
                'font-family:"PT Sans"',
                'top:65px',
                'z-index:9999',
                'line-height:11px',
                'height:15px',
                'transform:rotate(-90deg)',
                'text-transform:uppercase',
                'overflow:hidden',
                'text-align:center',
                'outline-style:none'
            ].join(';') + '}';
            css.innerHTML += '#' + buttonId + ':hover{' + ['right:-21px','background:#df3b3b','box-shadow:0 2px 4px 0 rgba(71,0,0,.31)'].join(';') + '}'+'#' + buttonId + '.open{display:none}';
            el.id = buttonId;
            el.innerHTML = sp.dic[sp.lang].Places;
            document.body.appendChild(css.cloneNode(true));
            document.body.appendChild(el.cloneNode(true));
            document.getElementById(buttonId).onclick = sp.button.click;
            };
        return {init:init,build:build,click:click,hide:hide,show:show};
        })();
        var cal = (function(that){//Calendar data picker
        this.startDate='',this._startDate='',this.endDate='',this._endDate='';
        this.startPicker = undefined;
        this.endPicker = undefined;
        this.build= function(){
        var css = document.getElementById('calendar_data_picker_css');
        if (!css){
            var css = document.createElement('style');
            css.id='calendar_data_picker';
            css.innerHTML=['#datepickerholder'+id+'{z-index: 1;margin:0 auto;text-align:center;padding-left:50px;position: relative;display: inline-block}',
'.datepickerholder {display: inline-block;border: 2px solid rgba(0, 0, 0, 0.2);border-radius: 4px;margin-top: 10px;}',
'.datepickerholder label{cursor:pointer;width: 120px;font-family: PT Sans;font-weight:bold;background: #fff;display: block;padding: 0;margin: 0;border-radius: 4px 4px 0 0;}',
'.datepickerholder:hover *{background:#f4f4f4}',
'input[type=text]#startDate,input[type=text]#endDate{cursor:pointer;outline-style: none;padding: 0;width: 120px;height:20px;margin: 0;border:none;text-align: center;font-size: 13px;border-radius: 0 0 4px 4px;}'].join('');
var m = document.getElementById('mapp'+id);
if (m) m.insertAdjacentElement('beforeBegin',css);
var css = document.createElement('link');
css.rel="stylesheet";
css.href=base+"libs/pikaday.css";
document.body.insertAdjacentElement('beforeEnd',css);
var script = document.createElement('script');
script.async="true";
script.src=base+"libs/pikaday.min.js";
document.body.insertAdjacentElement('beforeEnd',script);
script.onload=function(e){sp.cal.init();};
        }
        }//build: insert essential libs, elements into body and wait until it loads
this.updateStartDate = function(that) {
var that = sp.cal;
         that.startPicker.setStartRange(startDate);
         that.endPicker.setStartRange(startDate);
         that.endPicker.setMinDate(startDate);
     };
this.updateEndDate = function(that) {
var that = sp.cal;
         that.startPicker.setEndRange(endDate);
         that.startPicker.setMaxDate(endDate);
         that.endPicker.setEndRange(endDate);
     };
var clear = function(){
    sp.cal.startPicker.setDate('');
    sp.cal.endPicker.setDate('');
};
var init = function(){
var that = sp.cal;
var d = document.getElementById('datepickerholder'+id);
if(!d){
var m = document.getElementById('mapp'+id);
if (m) m.insertAdjacentHTML('afterBegin',['<div id=datepickerholder'+id+'>','<div class="datepickerholder">','<label for="startDate">Start:</label>','<input type="text" id="startDate">','</div>','','<div class="datepickerholder">','<label for="endDate">End:</label>','<input type="text" id="endDate">','</div>','</div>'].join(''));
}
     that.startPicker = new Pikaday({
         field: document.getElementById('startDate'),
     minDate: new Date(sp.ls.get_bounds().start),
     maxDate: new Date(sp.ls.get_bounds().end),
         onSelect: function() {
             startDate = this.getDate();
             updateStartDate();
             sp.map.clear_markers();
             sp.map.markers(sp.ls.get(sp.cal.startPicker.getDate(),sp.cal.endPicker.getDate()));
         }
     });
     that.endPicker = new Pikaday({
         field: document.getElementById('endDate'),
     minDate: new Date(sp.ls.get_bounds().start),
     maxDate: new Date(sp.ls.get_bounds().end),
         onSelect: function() {
             endDate = this.getDate();
             updateEndDate();
             sp.map.clear_markers();
             sp.map.markers(sp.ls.get(sp.cal.startPicker.getDate(),sp.cal.endPicker.getDate()));
         }
     });

     that._startDate = that.startPicker.getDate(),
     that._endDate = that.endPicker.getDate();

     if (that._startDate) {
         that.startDate = that._startDate;
         that.updateStartDate();
     }

     if (that._endDate) {
         that.endDate = that._endDate;
         that.updateEndDate();
     }

 };
        return {
        build:build,
        init:init,
        startDate:startDate,
        endDate:endDate,
        startPicker:startPicker,
        endPicker:endPicker,
        updateStartDate:updateStartDate,
        updateEndDate:updateEndDate,
        clear:clear
        };
        })();

var user = (function(){
    this.get = function(){
        var a = document.querySelectorAll('.contributor-avatar')[0];
        if (a) {
            var id = a.src.match(/[0-9]+/)[0],old_id = window.localStorage.getItem('shutter_places_user');
            if (id && !old_id){
                        window.localStorage.setItem('shutter_places_user',id);
                        return {id:id,reload:false};
            }
            else if (old_id && id != old_id){
                window.localStorage.setItem('shutter_places_user',id);
                return {id:id,reload:true};
                // sp.backup.get();
            }
            else if (id && id == old_id){
                return {id:id,reload:false};
            }

        }
    }
return {get:get};
})();
var backup = (function(){
    this.get = function(){
        var url = window.localStorage.getItem('shutter_places_backup_server');
            if(url) {//  && parseInt(Math.random()*3%3)==2
                //window.localStorage.setItem('shutter_places_backup_server','http://localhost/backup_shutter_places.php');
                sp.http.get(url);
            }

    };
    this.set = function(){

    };
return {get:get,set:set};
})();

var map = (function(){
    var sid = 'shutter_places_map_container'+id;
    var select_all = function(){
     sp.cal.clear();
     sp.map.clear_markers();
     sp.map.markers(sp.ls.get(0,-1));
    };
    var hide = function(){
        var a = document.getElementById(sid); if (a) a.className='hidden';
    };
    var show = function(){
        sp.map.init();
        var a = document.getElementById(sid); if (a) a.className='';
    };
    var keyup = function()
    {
     if (event.keyCode == 27) { // escape key maps to keycode `27`
            sp.map.hide();
            sp.button.show();
        }
    };
    var init = function(that){
        var d = document.getElementById(sid);
        if(!d){
        document.body.insertAdjacentHTML('afterBegin',['<div id="'+sid+'">','<div id=side'+id+'></div>','<button class="close-sign" type="button">✕</button>','<div id=mapp'+id+'>','<div id=mesta'+id+'></div>','</div>','</div>'].join(''));
        sp.map.draw();
        sp.map.markers(sp.ls.get(0,10));
        sp.cal.build();
        document.querySelector('.close-sign').onclick=function(){
            sp.map.hide();
            sp.button.show();
        }
        }
        document.body.onkeyup=keyup;
    };
    var select_by_name = function(name){
        var data = sp.ls.search(name);
        if (data && data.length>0)
        {
            sp.cal.clear();
            sp.map.clear_markers();
            sp.map.markers(data);
            var a = document.querySelector('#side'+sp.id+' h2 span');
            if (typeof name == 'number') a.innerText=data[0].media_id||0;
            if (typeof name == 'string') a.innerText=data[0].country||'';
        }
    };

    var draw = function(){
var map = L.map('mesta'+id,{maxZoom:maxZoom,
minZoom:minZoom,
zoom:3,
maxBounds:[[88,220], [-88,-220]],
layers: []}).setView([0, 0], 2);
map.addControl(new L.Control.Scale().setPosition('bottomleft'));map.attributionControl.remove();
L.tileLayer(tile+ext).addTo(map);
this.map = map;
    };
var build = function(){
        var css = document.getElementById('shuttermaps_map_css');
        if (!css){
            var css = document.createElement('style');
            css.id='shuttermaps_map_css';
            css.innerHTML=['#shutter_places_map_container%id%.hidden{display:none;}',
'#mesta%id%,#side%id%,#mesta%id% *,#side%id% *{font-family:sans-serif,Arial,Verdana;}',
'#side%id% .button{border:2px solid rgba(0, 0, 0, 0.6);padding:6px;margin:5px 0;cursor:pointer;color:#0078A8; text-align:center;display:block}',
'#side%id%{display:none;background: #fff;width:0px;height: 100% !important;position: absolute;right: 0px;z-index: 3;box-sizing: border-box;padding: 10px;}',
'#side%id%.open{display:block;width:300px;box-shadow:0 0 30px rgba(0,0,0,0.5);right: 0;}',
'#side%id% p, #side%id% div, #side%id% h2 {text-align: center;}',
'#side%id% h2 {color:#0078A8;text-align:center;font-weight: normal;}',
'#side%id% p img{border-radius:5px;margin:0 auto;width:auto;min-height:150px;max-height:250px;}',
'#side%id% p::after,#side%id% h2::after{color:#ddd;content:"¶";}',
'#side%id% a {color: #298aae;text-decoration: none;}',
'#mesta%id%{position: absolute;top:0;left:0;width: 100% !important;height: 100% !important;padding: 0 !important;margin: 0 !important;}',
'#mesta%id% .marker-icon {border: 2px solid #0078A8;width: 4px;height: 4px;border-radius: 50%;background-color: #fff;transition: opacity 1s ease-in-out;}',
'#mesta%id% .marker-icon img {width: 100%;max-height: 100%;vertical-align: middle;transition: opacity 1s ease-in-out;}',
'#mesta%id% .holder {width: 100px;height: 67px;overflow: hidden;border: 2px solid #0078A8;background-color: #fff;border-radius: 5px;background-size: cover;cursor: pointer;}',
'#mesta%id% .holder.mini{height: 50px;width: 50px;}',
'#mesta%id% .holder.left{margin-left: -100px;}',
'#mesta%id% .holder.left.mini{margin-left: -50px;}',
'#mesta%id% .holder.top{margin-top: -67px;}',
'#mesta%id% .holder.top.mini{margin-top: -50px;}',
'#mesta%id% .holder.top.left{margin-left: -67px;margin-top: -100px;width: 67px;height: 100px;}',
'#mesta%id% .holder.top.left.mini{margin-left: -50px;margin-top: -50px;width: 50px;height: 50px;}',
'#mesta%id% .marker-icon:hover, #mesta%id% .holder:hover{border-color: #999;}',
'#mesta%id% .marker-icon:hover{z-index: 1000;}',
'#mesta%id% .leaflet-container #mesta%id% .leaflet-control-scale{font-size: 12px;font-weight: bold;}',
'#mesta%id% .leaflet-control-scale-line{box-shadow: 1px 0 0 #fff, -1px 0 0 #fff;color: #000;text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff;background: transparent !important;border: 1px solid #000;border-top:none;}',
'#mesta%id% .leaflet-control-scale-line:not(:first-child){margin-top: -1px;border: 1px solid #000;border-bottom: none;}',
'.close-sign {outline-style: none;position: absolute;top: 5px;right: 5px;height: 36px;width: 36px;color: rgba(0, 0, 0, 0.2);font-size: 38px;float: right;cursor: pointer;line-height: 0.7;vertical-align: middle;font-style: normal;font-weight: bold;background-color: transparent;border: none;padding: 0;margin: 0;z-index: 2;}'].join('').replace(/%id%/g,id);
document.body.insertAdjacentElement('beforeEnd',css);
if (typeof L == 'undefined')
{
var script = document.createElement('script');
script.async="true";
script.src=base+"leaflet/leaflet.js";
document.body.insertAdjacentElement('beforeEnd',script);
script.onload=function(e){/*sp.map.init();*/};
var css = document.createElement('link');
css.rel="stylesheet";
css.href=base+"leaflet/leaflet.css";
document.body.insertAdjacentElement('beforeEnd',css);
}
else{
var elem = document.getElementById(sid);
if (!elem) sp.map.init();
}
                };
                };//build: insert essential libs, elements into body and wait until it loads
var redraw = function(){document.getElementById('mesta'+id).innerHTML='';sp.map.draw();};
var clear_markers=function(){
var a = document.querySelectorAll('.marker-icon');
for (var i = 0; i< a.length; i++){a[i].remove();}
};
var current_markers=[];
var markers = function(a){
sp.map.current_markers = a;
var b = document.getElementById('selected_markers'); if(b) b.innerText=a.length;
var classes = new Array(a.length).fill('');
for (var i = 0; i< a.length; i++){
    var class_direct = ['',' left',' left top', ' top'];//[parseInt(Math.random()*4)];
    var count_same_place=[], transition=[];
    for (var j = 0; j < i; j++) {
        if (Math.abs(a[i].coordinates[0]-a[j].coordinates[0])+Math.abs(a[i].coordinates[1]-a[j].coordinates[1])<0.21){
            if(count_same_place.length==0) count_same_place[0]=i;
            count_same_place[count_same_place.length]=j;
        }
    }
    for (var k = 0; k < count_same_place.length; k++) {
        classes[count_same_place[k]] = class_direct[k%4];
        transition[count_same_place[k]]='';
        if (k>3) {
            transition[count_same_place[k]]='transform:translate3d('+(k%2==0 ? -k%3*2+2 : k%3*2+2)+'px,'+(k%2==0 ? (8-k%5*3-3)*2 : (k%5*2-3)*2)+'px,0) rotate('+(k%2==0 ? (-k%8*1-1)*1 : (k%8*1-1)*1)+'deg) skew('+(k%2==0 ? (k%7*1-1)*1 : (k%7*1-1)*1)+'deg)';
        }
    }   
}
// console.log(transition,count_same_place,classes);
for (var i = 0; i< a.length; i++){
var img=https+'://image.shutterstock.com/mosaic_250/0/0/'+a[i].media_id+'.jpg';
var myIcon = L.divIcon({className: 'marker-icon',iconSize:4,html:'<div class="holder mini'+classes[i]+'" style="background-image:url('+img+');'+(transition[i]||'')+'" data-city="'+(a[i].city||'')+'" data-country="'+(a[i].country||'')+'" data-coordinates="'+(a[i].coordinates[0]||'-70')+','+(a[i].coordinates[1]||parseInt(Math.random()*180))+'" data-time="'+(a[i].time||0)+'" data-id="'+(a[i].media_id||0)+'" data-type="'+(a[i].media_type||'photo')+'" data-marker="'+i+'"></div>'});//<img src="'+img+'">
// you can set .my-div-icon styles in CSS
L.marker([a[i].coordinates[0], a[i].coordinates[1]], {icon: myIcon}).addTo(this.map);//bindPopup('Time: <strong>'+new Date(a[i].time*1000)+'</strong>');
}
var m = document.querySelectorAll('.holder');
for (var i = m.length - 1; i >= 0; i--) {
    m[i].onclick=function(event){
        var a = document.getElementById('side'+id),b=event.target;
        a.classList.add('open');
        if (window.innerWidth>1000 && window.innerWidth-b.getBoundingClientRect().right<300){
            a.style.right='400px';
        }
        else {a.style.right='';}
        var title = '';
        if (b.getAttribute('data-city').length>0) title += b.getAttribute('data-city')+', ';
        if (b.getAttribute('data-country').length>0) title += b.getAttribute('data-country');
        if (title == '') {title = 'Undefined';}
        else {title = '<span onclick="sp.map.select_by_name(\''+b.getAttribute('data-country')+'\')">'+title+'</span>';}
        a.innerHTML = '<h2>'+title+'</h2>';
        a.innerHTML += '<p onclick="sp.map.select_by_name('+b.getAttribute('data-id')+')"><img src="'+https+'://image.shutterstock.com/mosaic_250/0/0/'+b.getAttribute('data-id')+'.jpg"></p>';
        a.innerHTML +='<a href="'+https+'://www.shutterstock.com/similar-'+b.getAttribute('data-id')+'/index.html'+'" target=_blank class="button">'+sp.dic[sp.lang].Similar+'</a>';
        a.innerHTML +='<a href="https://www.google.com/searchbyimage?&amp;image_url='+window.encodeURI(https+'://image.shutterstock.com/mosaic_250/0/0/'+b.getAttribute('data-id')+'.jpg')+'" target=_blank class="button google_images">'+sp.dic[sp.lang].Who+'</a>';
        a.innerHTML += '<br>'+sp.dic[sp.lang].Time+': <strong>'+(new Date(b.getAttribute('data-time')*1000).toLocaleString(navigator.language))+'</strong>';
        a.innerHTML += '<br>'+sp.dic[sp.lang].Selected+': <strong id="selected_markers">'+document.querySelectorAll('.marker-icon').length+'</strong>';
        a.innerHTML += '<br>id: <strong id="media_id" onclick="sp.map.select_by_name('+b.getAttribute('data-id')+')" style="cursor:pointer">'+b.getAttribute('data-id')+'</strong>';
        a.innerHTML +='<br><div onclick="sp.map.select_all()" class="button">'+sp.dic[sp.lang].Show+'</div>';
        // if (event.target.className.search('left top')>0) {event.target.className = 'holder mini';}
        // else if (event.target.className.search('left')>0) {event.target.className = 'holder mini top';}
        // else if (event.target.className.search('top')>0) {event.target.className = 'holder mini left top';}
        // else {event.target.className = 'holder mini left';}
    }
    m[i].onmouseenter=function(event){
        var maxZ = 0;
        var m = document.querySelectorAll('.marker-icon');
        for (var i = m.length - 1; i >= 0; i--) {
        maxZ = Math.max(m[i].style.zIndex,maxZ);
        if (m[i].style.zIndex>1000) m[i].style.zIndex -=2;
        }
    event.target.parentElement.style.zIndex=maxZ+1;
    }
}
document.querySelector('#mesta'+id).onclick=function(e){
    if (!e.target.classList.contains('holder')){
        document.getElementById('side'+id).classList.remove('open');
    }
}
};
var contextmenu = function(){
this.map.on('contextmenu',function(e){url='https://maps.google.com/maps/api/geocode/json?address='+e.latlng.lat+','+e.latlng.lng+'&language='+sp.lang;var xhr=new XMLHttpRequest();xhr.open('GET', url, true);xhr.onload=function(e1) {if (xhr.status == 200) {var r=JSON.parse(xhr.responseText);var OUT=r.status; if(OUT=='OK') {OUT = '<b onclick="(function(){var v=document.getElementsByName(\'searchboxinput\')[0];if(!v)return;v.focus();v.value=\''+e.latlng.lat.toFixed(4)+','+e.latlng.lng.toFixed(4)+'\'})()">@'+e.latlng.lat.toFixed(4)+','+e.latlng.lng.toFixed(4)+'</b><br>'+r.results[0].formatted_address;} else{OUT='<b>@'+e.latlng.lat.toFixed(4)+','+e.latlng.lng.toFixed(4)+'</b>';} L.popup().setLatLng([e.latlng.lat,e.latlng.lng]).setContent(OUT).openOn(map);}};xhr.send();});
};
        return {build:build,init:init,redraw:redraw,draw:draw,markers:markers,clear_markers:clear_markers,contextmenu:contextmenu,current_markers:current_markers,select_by_name:select_by_name,select_all:select_all,hide:hide,show:show,keyup:keyup};
        })();
        var http = (function(that){
        this.fetch = function(func,url,type,data){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                func(xhr.responseText);
            }
        }
    if (!data) data = null;
    xhr.open(type, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
        };
        this.get = function(func,url,data){
        if (data) url = url + "?" + build_http_query(data);
        return fetch(func,url,'GET',data);
        };
        this.build_http_query = function(data){
          var qs = "";
          for(var key in data) {
            var value = data[key];
            if (typeof value == 'object') value = build_http_query(value);
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
          }
          if (qs.length > 0){
            qs = qs.substring(0, qs.length-1); //chop off last "&"
          }
          return qs;
        };
        this.post = function(func,url,data){
        if (typeof data == 'object') data = build_http_query(data);
        return fetch(func,url,'POST',data);
        };
        return {get:get,post:post,fetch:fetch,build_http_query:build_http_query};
        })();
        var ls = (function(that){//localStorage
        this.sort = function (a,b){return b.time-a.time;};
        this.search = function(strnum){// search by media_id number, location (city or country or longlat)
            var out = [];
            if (typeof strnum !== "undefined") {
            var stock = JSON.parse(window.localStorage.getItem('shutter_places'));
            for (var i = stock.length - 1; i >= 0; i--) {
                if (typeof strnum === 'number' && stock[i].media_id===strnum) {out.push(stock[i]);}
                else if (typeof strnum === 'string' && (/*stock[i].city && stock[i].city.search(strnum)>-1 ||*/ stock[i].country && stock[i].country.search(strnum)>-1))
                {out.push(stock[i]);}
                else if(typeof strnum === 'object' && strnum instanceof Array && strnum.length == 2 && stock[i].coordinates[0]==strnum[0] && stock[i].coordinates[1]==strnum[1])
                {
                    out.push(stock[i]);
                }
                }
            }
            return out;
        };
        this.get = function(from,count){
            var stock = [];
            if (window.localStorage !== undefined) {
                if ((window.localStorage.getItem('shutter_places')+"").substr(0,2)=='[{')
                {
                stock = JSON.parse(window.localStorage.getItem('shutter_places'));
                }
            }
            else if (window.shutter_places !== undefined)
            {
                stock = JSON.parse(window.shutter_places);
            }
            if (typeof stock == 'object' && stock.length>0)
            {
                    if (!from && typeof from != 'number') {from = 0;}
                    if (count!=-1 && !count && typeof count != 'number') {var count = 10;}
                    if (typeof from == 'number' && typeof count == 'number')
                    {
                    if(count==-1) return stock.splice(from);
                    return stock.splice(from,count);
                    }//first - newest
                    else if ((from instanceof Date && count instanceof Date) || (typeof from == 'string' && typeof count == 'string'))
                    {
                    if (typeof from == 'string') {from = new Date(from); count = new Date(count);}
                    from = parseInt(from.getTime()/1000);
                    count = parseInt(count.getTime()/1000)+86400;
                    if (isNaN(from)||isNaN(count)) return;
                    var out = [];
                    for (var i = stock.length - 1; i >= 0; i--) {
                        if (stock[i].time>=from && stock[i].time<=count) out.push(stock[i]);
                    }
                    return out;
                    }
            }
        };
        this.get_bounds = function(timestamp_format){//get time limits (Array of new Date() [start, end]) for stack of images
        var out = {start:0,end:0};
                    var stock = JSON.parse(window.localStorage.getItem('shutter_places'));
                    if (typeof stock != 'undefined' && stock.length>0)
                    {
                        out = {start:stock[0].time,end:stock[stock.length-1].time};
                    }
        if (!timestamp_format) {out.start = new Date(out.start*1000); out.end = new Date(out.end*1000);}
        return out;
        };
        this.add = function(data){
        if (typeof data == 'string' && (data+"").substr(0,2)=='[{') data = JSON.parse(data);
        if (typeof data == 'object') data = sp.ls.prepare(data);
            if (data !== undefined && data.length && window.localStorage !== undefined)
            {
                if ((window.localStorage.getItem('shutter_places')+"").substr(0,2)=='[{')
                {
                    stock = JSON.parse(window.localStorage.getItem('shutter_places'));
                        if (data !== undefined && data.length){
                        data = this.prepare(data);
                        for (var j = data.length - 1; j >= 0; j--)
                        {
                        var found = false;
                            for (var i = 0; i<stock.length; i++)
                            {
                                if (stock[i].media_id && stock[i].time === data[j].time && stock[i].media_id === data[j].media_id)
                                {
                                    found = true;
                                    stock[i]=data[j];
                                    break;
                                }
                            }
                        if (!found) stock.push(data[j]);
                        }
                        stock = stock.sort(sp.ls.sort);
                        var string = JSON.stringify(stock);
                        while(string.length>5000000){
                        stock.splice(0,1);
                        string = JSON.stringify(stock);
                        }
                        window.localStorage.setItem('shutter_places', JSON.stringify(stock));
                        }
                }
            else{
                    window.localStorage.setItem('shutter_places', JSON.stringify(data));
                }
            }
        };
        this.prepare = function(data){
            if (data.length > 0 && data[0].media_id !== undefined){}
            else if (data.media_id !== undefined && typeof data == 'object'){data = [data];}
            else {return;}
        for (var i = data.length - 1; i >= 0; i--) {
                if (typeof data[i].time != 'number') data[i].time = parseInt(new Date(data[i].time).getTime()/1000);
                if (data[i].media_type == 'image') delete data[i].media_type;
                if (data[i].aspect !== undefined) delete data[i].aspect;
                if (data[i].region !== undefined) delete data[i].region;
        }
        return data;
        };
        return {sort:sort,add:add,prepare:prepare,get:get,search:search,get_bounds:get_bounds};
        })();
        var ui = (function(that){
            this.get_user_lang = function () {
            var match = document.cookie.match(new RegExp('lang=([^;]+)')); ///ru/g.test(window.navigator.language)
            if (match && match[1] !== undefined) return match[1].toString();
            if (typeof window.navigator.languages[0] !== 'undefined')
              return window.navigator.languages[0].substring(0,2).toLowerCase();
            return lang;
        };
        this.set_user_lang = function () {
            var a = sp.ui.get_user_lang();
            if (typeof sp.dic[a] == 'object') sp.lang=a;
        };
        return {get_user_lang:get_user_lang,set_user_lang:set_user_lang};
        })();

        function _ChangeMapOnClick() {
      var m = document.getElementById('download-map');
      if (m != null)  {
        m.onclick=function(e){_ChangeMapOnClickHandler(m,true);}
        m.ontouchend=function(e){_ChangeMapOnClickHandler(m,true);}
        var t = window.localStorage.getItem('m');
        if (t == null || t == "null" || t=='a') _ChangeMapOnClickHandler(m,false);
        }
        }

        function _ChangeMapOnClickHandler(m,l) {
        var t = window.localStorage.getItem('m');
    var a = document.querySelectorAll('.leaflet-zoom-animated g path');
    for (var i = 0; i< a.length; i++){
        var color = '#dddddd';
        if (t == null || t == "null") {
            color = 'rgb('+(Math.random()*255^1)+','+(Math.random()*255^1)+','+(Math.random()*255^1)+')';
        }
        else if (t=='a')
        {
            color= 120+Math.random()*87^1;
            color = 'rgb('+color+','+color+','+color+')';
        }
        a[i].setAttribute('fill',color);
        }
        if (t==null || t=="null") res='a';
        if (t=='a') res='b';
        if (t=='b') res=null;
        if (l) window.localStorage.setItem('m',res);
        };

        var exports = {
            Button: Button,
            button: button,
            table:table,
            init:init,
            ls:ls,
            cal:cal,
            map:map,
            ui:ui,
            http:http,
            https:https,
            user:user,
            backup:backup,
            localStorage:ls,
            // Dialog: Dialog,
            // 'draw_table': _draw_table,
            // 'load_info': _load_info,
            // 'resolve_place': _resolve_place
            id: id,
            lang:lang,
            dic:dic
        };
        exports.settings = {
            'ShutterPlacesWindowHelperScriptId': ShutterPlacesWindowHelperScriptId,
            'ShutterPlacesIframeId':ShutterPlacesIframeId,
            // 'dismissLinkId': dismissLinkId,
            // 'buttonId': buttonId,
            // 'lang': lang,
            // 'url': url,
            // 'dic': dic,
            // 'keys': keys,
            param: param
        };
        return exports;
    })();

    window.ShutterPlacesWindowHelperScript = ShutterPlacesWindowHelperScript;
    if (!window.sp) window.sp = ShutterPlacesWindowHelperScript;
    return ShutterPlacesWindowHelperScript;
})(this);