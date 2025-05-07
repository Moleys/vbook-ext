load('config.js');
function execute(url) {
  var match = url.match(/(?:shu_)?(\d+)/);
  var bookId = match ? match[1] : null;


  let response = fetch("https://www.shuhaige.net/" + bookId + "/");
  if (!response.ok) return null;
  let doc = response.html();

  let chapters = doc.select('#list dd a');
  let data = [];

  for (let i = chapters.size() - 1; i >= 0; i--) {
    let e = chapters.get(i);
    let name = e.text().trim();
    let url = BASE_URL + e.attr('href');

    // Kiểm tra trùng lặp theo URL (hoặc theo name nếu bạn muốn)
    if (!data.some(item => item.url === url)) {
      data.push({
        name,
        url,
        host: BASE_URL
      });
    }
  }


  return Response.success(data.reverse());
}