load('config.js');

function containsChinese(text) {
    const hasChinese = /[\u4e00-\u9fff]/;

  return hasChinese.test(text);
}
function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    let response_chapter_info = fetch(url)
    if (response_chapter_info.ok) {
		let doc = response_chapter_info.html();
        let data = []
        doc.select("#scrollIntoView div[style*=font-size:20px]").forEach((e,index) => {

            data.push(e.html())
        });


        return Response.success(data.join("<br>"));
    }
    return null;
}

