load("base64.js");
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var data = [];
        let el = doc.select("script").html().split("var lstImages = new Array();")[1].split("beau(lstImages);")[0].split("lstImages.push('");
        el.forEach(e => {
            e = e.replace("');","").trim();
            e = beau(e)
            data.push(e)
        });
        data.shift()
        return Response.success(data);
    }


    return null;
}



function beau(it){
    if(it.startsWith("https"))
        return it;
    let containsS0 = it.includes("=s0")
    it = it.replace(/_x236/g, "d").replace(/_x945/g, "g")
    if (containsS0) it = it.substring(0, it.length - 3)
    else it = it.substring(0, it.length - 6)
    it = it.substring(4, 22) + it.substring(25)
    it = it.substring(0, it.length - 6) + it[it.length - 2] + it[it.length - 1]
    // it = decodeURIComponent(window.atob(it));
    it = Base64.decode(it)
    it = it.substring(0, 13) + it.substring(17)
    if (containsS0) it = it.substring(0, it.length - 2) + "=s0"
    else it = it.substring(0, it.length - 2) + "=s1600"
    return "https://2.bp.blogspot.com/" + it
}