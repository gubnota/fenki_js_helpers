(function(that){

init

Button

table = (function(that){
_setElementText
_dismissLinkClick
_createDismissLink
_createDialogElement
_showShutterPlacesWindowHelperScript
Dialog
_close
_buttonIdClick
resolve_place
draw_table
load_info
Button
return {Dialog:Dialog,Button:Button,draw_table:draw_table,load_info:load_info,resolve_place:resolve_place};
})();

button = (function(that){
init
click
hide
show
build
return {init:init,build:build,click:click,hide:hide,show:show};
})();

cal = (function(that){
build
updateStartDate
updateEndDate
clear
init
return {
build:build,init:init,startDate:startDate,endDate:endDate,startPicker:startPicker,endPicker:endPicker,updateStartDate:updateStartDate,updateEndDate:updateEndDate,clear:clear};
})();

user = (function(that){
get
return {get:get};
})();

backup = (function(that){
get
set
return {get:get,set:set};
})();

map = (function(that){
sid
select_all
hide
show
keyup
init
select_by_name
draw
contextmenu
return {build:build,init:init,redraw:redraw,draw:draw,markers:markers,clear_markers:clear_markers,contextmenu:contextmenu,current_markers:current_markers,select_by_name:select_by_name,select_all:select_all,hide:hide,show:show,keyup:keyup};
})();

http = (function(that){
fetch
get
build_http_query
post
return {get:get,post:post,fetch:fetch,build_http_query:build_http_query};
})();

ls = (function(that){
sort
search
get
get_bounds
add
prepare
return {sort:sort,add:add,prepare:prepare,get:get,search:search,get_bounds:get_bounds};
})();

ui = (function(that){
get_user_lang
set_user_lang
return {get_user_lang:get_user_lang,set_user_lang:set_user_lang};
})();

_ChangeMapOnClick
_ChangeMapOnClickHandler

exports = {
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
id: id,
lang:lang,
dic:dic
};
exports.settings = {
'ShutterPlacesWindowHelperScriptId': ShutterPlacesWindowHelperScriptId,
'ShutterPlacesIframeId': ShutterPlacesIframeId,
param: param
};
return exports;
})();