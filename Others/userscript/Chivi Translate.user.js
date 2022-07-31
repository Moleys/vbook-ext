
// ==UserScript==
// @name         Chivi Translate
// @namespace    https://github.com/Moleys
// @version      1
// @description  Dịch tiếng Trung với API Chivi
// @author       Moleys
// @match        *://*/*
// @icon         https://i.imgur.com/yIvta1M.png
// @resource     IMPORTED_CSS https://bafybeied7rm3y3iyoidmnr2oi6rpnmoancaqotrqs7chdcs6i36qammd74.ipfs.infura-ipfs.io/?filename=button.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const whilelist = ['UL', 'OL', 'LI', 'DIV', 'P']
    const blacklist = ['svg', 'SCRIPT', 'STYLE']

    function scan_nodes(document, target = document.body) {
        let nodes = []
        let texts = []

        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null)

        var node
        while ((node = walker.nextNode())) {
            if (blacklist.includes(node.parentNode.nodeName)) continue

            const text = node.textContent.trim()
            if (!text.match(/\p{Script=Han}/u)) continue

            texts.push(text.replaceAll('\n', ' \t·\t'))
            nodes.push(node)
        }

        return { nodes, texts }
    }

    async function translate() {
        const { nodes, texts } = scan_nodes(document)


        const params = { input: texts.join('\n'), mode: 'plain', dname: 'combine', trad: true }

        const res = await fetch('https://chivi.app/api/qtran', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        })

        if (!res.ok) {
            alert('Có lỗi, mời liên hệ người phát triển!')
            return
        }

        const data = await res.text()
        const lines = data.split('\n')

        lines.forEach((line, idx) => {
            const node = nodes[idx]
            if (!node) return

            node.textContent = line.replaceAll('·\t', '\n')
            const parent = node.parentNode

            if (whilelist.includes(parent.nodeName)) {
                parent.style.fontFamily = 'Roboto, san-serif'
                parent.style.lineHeight = '1.5em'
            }
        })
    }

    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
    var button = document.createElement("button");
    button.className = "cv-btn";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);



    button.addEventListener ("click", function() {
        translate();
    });
})();