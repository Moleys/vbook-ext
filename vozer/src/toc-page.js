load('config.js');
function execute(url) {
    let data = [];
    let doc = fetch(url).html();
    doc.select('[rel="next"]').remove()
    const lastNumber = doc.select('nav[role="navigation"] ').first().select('a[href*="pagechap"]').last().text();
    if(lastNumber) {
        for (let i = 1; i <= lastNumber; i++) {
            data.push(url + "?pagechap=" + i);
        }
    }
    else
    data.push (url)

    // Trả về số cuối cùng
    return Response.success(data);
}
