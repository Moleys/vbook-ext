
// ==UserScript==
// @name         STV Translate
// @namespace    https://github.com/Moleys
// @version      1
// @description  Dịch tiếng Trung với API STV
// @author       Moleys
// @match        *://*/*
// @icon         https://i.imgur.com/89Gaurs.png
// @require      https://bafybeienll27v7sxwaoiksspve6unufhzng2ciywbbgkmmfhtuc7nnaqzm.ipfs.infura-ipfs.io/?filename=stv-translate.min.js
// @resource     IMPORTED_CSS https://bafybeied7rm3y3iyoidmnr2oi6rpnmoancaqotrqs7chdcs6i36qammd74.ipfs.infura-ipfs.io/?filename=button.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
    var button = document.createElement("button");
    button.innerHTML = '<img src="https://i.imgur.com/epynPm6.png" width="100%">';
    button.className = "cv-btn";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);



    button.addEventListener ("click", function() {
        startScript();
    });
})();