// ==UserScript==
// @name        chatGPT MarkDown optimizer
// @description add backticks
// @match       https://chat.openai.com/chat/*
// // @run-at document-end
// ==/UserScript==

window.prepareMarkdown = () => {
	var tick = document.createElement('b')
	tick.classList.add('tick')
	document.querySelectorAll('code').forEach(function (el) {
		if (el.innerHTML.search('class="tick"') != -1) return
		switch (el.classList.length) {
			case 0:
				var simple = tick.outerHTML.replace('><', '>`<')
				el.innerHTML = simple + el.innerHTML + simple
				break
			default:
				var from = tick.outerHTML.replace('><', '>```swift<br/><')
				var to = tick.outerHTML.replace('><', '><br/>```<')
				if (el.innerHTML.length > 0) el.innerHTML = from + el.innerHTML + to
				break
		}
	})
	document.querySelectorAll('img.rounded-sm').forEach(function (el) {
		if (el.getAttribute('alt') != '') el.setAttribute('alt', '')
	})
	document.querySelectorAll('.whitespace-pre-wrap').forEach(function (el, i) {
		if (i % 2 == 0 && el.innerText.search('#') === -1) {
			// only odd items with questions and doesn't preceded with #
			el.innerHTML = '# ' + el.innerHTML
		}
	})
}
// var el = document.createElement('div')
// el.style.position = 'fixed'
// el.style.top = '20px'
// el.style.right = '20px'
// el.style.borderRadius = '6px'
// el.style.height = '60px'
// el.style.width = '60px'
// el.style.background = '#f60'
// el.style.cursor = 'pointer'
// document.body.appendChild(el)
// el.onclick = () => {
// 	console.log('prepareMarkdown')
// 	window.prepareMarkdown()
// }
setInterval(() => {
	window.prepareMarkdown()
}, 5000)
var style = document.createElement('style')
style.innerHTML = [
	'.prose :where(code):not(:where([class~=not-prose] *)):before,.prose :where(code):not(:where([class~=not-prose] *)):after{content:"" !important}',
	'b.tick{opacity:1}',
	'code.hljs > b.tick {font-size:0px}',
	'img.rounded-sm{user-select: none;}',
	'button.flex.ml-auto.gap-2{display:none}',
].join('\n')
document.body.appendChild(style)
