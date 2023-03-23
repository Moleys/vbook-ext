function execute(url) {
    let hid = url.split("_")[0]
    let page = url.split("_")[1] 
    let response_hid = fetch("https://api.comick.app/comic/" + hid + "/chapters?page=" + page);
    console.log("https://api.comick.app/comic/" + hid + "/chapters?page=" + page)
    if (response_hid.ok) {
        const data = [];
        let chapters = response_hid.json().chapters;
        for (let i = 0;i < chapters.length; i++) {
            let title = ""
            if(chapters[i].title) {
                title =  ": " + chapters[i].title
            }
            // language = chapters[i].lang
            let language = getFlagEmoji(chapters[i].lang)
            data.push({
                name: language + " Chap " + chapters[i].chap + title,
                url: url +"/" + chapters[i].hid,
                host: "https://comick.app"
            })
        }
        data.reverse()
        return Response.success(data);
    }
    return null;
}

function getFlagEmoji(isoCode) {
  const codePoints = Array.from(isoCode.toUpperCase())
    .filter(char => /[A-Z]/.test(char))
    .map(char => 127397 + char.charCodeAt(0));
  let flag = '';
  for (let i = 0; i < codePoints.length; i++) {
    flag += String.fromCodePoint(codePoints[i]);
  }
  flag = flag.replace("🇪🇳","🇬🇧").replace("🇨🇸","🇨🇿").replace("🇻🇮","🇻🇳").replace("🇦🇷","🇸🇦").replace("🇪🇱","🇬🇷").replace("🇭🇪","🇮🇱").replace("🇿🇭🇭🇰","🇭🇰").replace("🇵🇹🇧🇷","🇧🇷")
  return flag;
}