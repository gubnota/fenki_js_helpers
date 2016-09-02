setInterval(function(e) {
// <div class="videoAdUiPreSkipContainer" style="opacity: 0.9; visibility: hidden;"><div class="videoAdUiPreSkipButton"><div class="videoAdUiPreSkipText">Рекламу можно будет пропустить через  1</div><div class="videoAdUiPreSkipThumbnail" aria-hidden="true"><img src="//i1.ytimg.com/vi/1QtPh8ekvVk/mqdefault.jpg" class="videoAdUiPreSkipThumbnailImage"></div></div></div>
// document.getElementsByClassName('videoAdUiPreSkipContainer')[0].style.visibility="hidden";
// document.getElementsByClassName('videoAdUiSkipContainer')[0].style.display="block";
// var a = document.getElementsByClassName('videoAdUiSkipButton')[0];
// if (a !== undefined) {var clickEvent = new Event( 'click' ); a.dispatchEvent( clickEvent );}
// <div class="videoAdUiSkipContainer html5-stop-propagation" style="opacity: 1;"><button class="videoAdUiSkipButton videoAdUiAction">Пропустить рекламу<div class="videoAdUiSkipIcon"></div></button></div>
var a = document.getElementsByClassName('videoAdUiPreSkipContainer')[0];
if (a===undefined) return;
a.style.visibility="hidden";
document.getElementsByClassName('videoAdUiSkipContainer')[0].style.display="block";
a = document.getElementsByClassName('videoAdUiSkipButton')[0];
if (a !== undefined) 
    {
      var ev = new Event('click');
      a.dispatchEvent (ev);
      console.log('gotcha!');
    }
}, 300);
