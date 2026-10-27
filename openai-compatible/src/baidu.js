var BAIDU_TRANSLATE_URL = "https://fanyi.baidu.com/ait/text/translate";
var BAIDU_HOME_URL = "https://fanyi.baidu.com/";
var BAIDU_TOKEN_KEY = "baidu_acs_token";
var BAIDU_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Baidu Fanyi language codes; ids missing here are sent unchanged.
var BAIDU_LANGUAGE_MAP = {
    "zh": "zh", "zh-CN": "zh", "zh-TW": "cht", "en": "en", "vi": "vie", "ja": "jp", "ko": "kor",
    "fr": "fra", "es": "spa", "th": "th", "ar": "ara", "ru": "ru", "pt": "pt", "de": "de", "it": "it",
    "el": "el", "nl": "nl", "pl": "pl", "bg": "bul", "et": "est", "da": "dan", "fi": "fin", "cs": "cs",
    "ro": "rom", "sl": "slo", "sv": "swe", "hu": "hu", "hi": "hi", "bn": "ben", "pa": "pan",
    "jv": "jav", "te": "tel", "tr": "tr", "fa": "per", "ms": "may", "sw": "swa", "fil": "fil",
    "tl": "fil", "id": "id", "af": "afr", "sq": "alb", "hy": "arm", "az": "aze", "eu": "baq",
    "be": "bel", "bs": "bos", "hr": "hrv", "gl": "glg", "ka": "geo", "gu": "guj", "he": "heb",
    "is": "ice", "ga": "gle", "kn": "kan", "kk": "kaz", "lv": "lav", "lt": "lit", "mk": "mac",
    "ml": "mal", "mr": "mar", "mn": "mon", "ne": "nep", "no": "nor", "sr": "srp", "sk": "sk",
    "ta": "tam", "uk": "ukr", "ur": "urd", "uz": "uzb", "cy": "wel"
};

function baiduTranslateText(text, from, to) {
    var sourceLanguage = from && from !== "auto" ? baiduLanguageCode(from) : baiduDetectLanguage(text);
    var targetLanguage = baiduLanguageCode(to);
    if (!sourceLanguage) sourceLanguage = "auto";
    if (!targetLanguage) return { text: "", error: "Baidu không hỗ trợ ngôn ngữ đích: " + to };
    return baiduRequestTranslation(text, sourceLanguage, targetLanguage, 0);
}

function baiduLanguageCode(language) {
    var value = String(language || "");
    return BAIDU_LANGUAGE_MAP[value] || value;
}

function baiduRequestTranslation(text, from, to, retryCount) {
    if (retryCount > 2) return { text: "", error: "Baidu không thể dịch sau 3 lần thử" };

    var token = baiduGetAcsToken(retryCount > 0);
    if (!token) return { text: "", error: "Không lấy được Baidu Acs-Token" };

    var response = fetch(BAIDU_TRANSLATE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream",
            "Acs-Token": token,
            "Cookie": String(localCookie.getCookie() || ""),
            "Referer": BAIDU_HOME_URL,
            "Origin": "https://fanyi.baidu.com",
            "User-Agent": BAIDU_USER_AGENT
        },
        body: JSON.stringify({
            needNewlineCombine: false,
            disableCache: false,
            isAi: false,
            sseStartTime: Date.now() - 1,
            query: text,
            from: from,
            to: to,
            corpusIds: [],
            needPhonetic: true,
            domain: "common"
        }),
        timeout: 60000
    });

    if (!response.ok) {
        localStorage.removeItem(BAIDU_TOKEN_KEY);
        return baiduRequestTranslation(text, from, to, retryCount + 1);
    }

    var lines = response.text().split("\n");
    var translated = "";
    var rejected = false;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.indexOf("data") !== 0) continue;
        var braceAt = line.indexOf("{");
        if (braceAt < 0) continue;

        var eventData;
        try {
            eventData = JSON.parse(line.substring(braceAt));
        } catch (e) {
            continue;
        }

        if (!eventData.data) {
            if (eventData.errno) rejected = true;
            continue;
        }
        if (eventData.data.event === "Translating" && eventData.data.list) {
            for (var j = 0; j < eventData.data.list.length; j++) {
                translated += String(eventData.data.list[j].dst || "") + "\n";
            }
        }
    }

    translated = translated.trim();
    if (translated) return { text: translated, error: "" };
    if (rejected) {
        localStorage.removeItem(BAIDU_TOKEN_KEY);
        return baiduRequestTranslation(text, from, to, retryCount + 1);
    }
    return { text: "", error: "Baidu không trả về bản dịch" };
}

function baiduGetAcsToken(forceRefresh) {
    if (!forceRefresh) {
        var cached = localStorage.getItem(BAIDU_TOKEN_KEY);
        if (cached) return String(cached);
    }

    var browser = Engine.newBrowser();
    var token = "";
    try {
        browser.launch(BAIDU_HOME_URL, 15000);
        browser.callJs("(function(){window.__vbookAcs=[];" +
            "var originalSetHeader=XMLHttpRequest.prototype.setRequestHeader;" +
            "XMLHttpRequest.prototype.setRequestHeader=function(k,v){try{if(/acs/i.test(k))window.__vbookAcs.push(v);}catch(e){}return originalSetHeader.apply(this,arguments);};" +
            "var originalFetch=window.fetch;window.fetch=function(u,opt){try{if(opt&&opt.headers){var h=opt.headers;" +
            "if(h.forEach){h.forEach(function(v,k){if(/acs/i.test(k))window.__vbookAcs.push(v);});}" +
            "else{for(var k in h){if(/acs/i.test(k))window.__vbookAcs.push(h[k]);}}}}catch(e){}return originalFetch.apply(this,arguments);};return 1;})()", 8000);
        // Baidu's input is a Slate editor: setting textContent leaves its React state empty and no
        // request is sent. Its paste handler follows the same path as real input.
        browser.callJs("(function(){" +
            "var i=document.querySelector('[data-slate-editor=true]')||document.querySelector('[contenteditable=true]');" +
            "if(!i||typeof DataTransfer==='undefined'||typeof ClipboardEvent==='undefined')return 0;" +
            "i.focus();var d=new DataTransfer();d.setData('text/plain','\\u4f60\\u597d');" +
            "i.dispatchEvent(new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:d}));" +
            "return 1;})()", 8000);
        sleep(1800);
        token = baiduUnwrapBridge(browser.callJs("(window.__vbookAcs&&window.__vbookAcs.length)?window.__vbookAcs[window.__vbookAcs.length-1]:''", 8000));

        // Some page variants only translate after an explicit AI Translate click.
        if (!token) {
            browser.callJs("(function(){var b=Array.prototype.slice.call(document.querySelectorAll('button'))" +
                ".filter(function(x){return (x.innerText||'').trim()==='AI\\u7ffb\\u8bd1';})[0];" +
                "if(!b)return 0;b.click();return 1;})()", 8000);
            sleep(3000);
            token = baiduUnwrapBridge(browser.callJs("(window.__vbookAcs&&window.__vbookAcs.length)?window.__vbookAcs[window.__vbookAcs.length-1]:''", 8000));
        }
    } catch (e) {
        token = "";
    }
    try {
        browser.close();
    } catch (e2) {}

    if (token) localStorage.setItem(BAIDU_TOKEN_KEY, token);
    return token;
}

function baiduUnwrapBridge(value) {
    var raw = String(value || "");
    var match = raw.match(/<body>([\s\S]*?)<\/body>/);
    return (match ? match[1] : raw).trim();
}

function baiduDetectLanguage(text) {
    var sample = String(text || "").substring(0, 200);
    var response = fetch("https://fanyi.baidu.com/langdetect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sample }),
        timeout: 30000
    });
    if (!response.ok) return "";

    var data;
    try {
        data = response.json();
    } catch (e) {
        return "";
    }
    return data && data.lan ? String(data.lan) : "";
}
