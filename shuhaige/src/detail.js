load('config.js');
function execute(url) {
  var match = url.match(/(?:shu_)?(\d+)/);
  var bookId = match ? match[1] : null;


  let response = fetch("https://www.shuhaige.net/" + bookId + "/");
  if (!response.ok) return null;
  let doc = response.html();
  let title = doc.select('meta[property="og:novel:book_name"]').attr('content') || '';
  let author = doc.select('meta[property="og:novel:author"]').attr('content') || '';
  let cover = doc.select('meta[property="og:image"]').attr('content') || '';
  let description = doc.select('meta[name="description"]').attr('content') || ''; // nếu có
  let categories = [];

  doc.select('meta[property="og:novel:category"]').forEach(meta => {
    categories.push(meta.attr('content'));
  });

  doc.select('meta[property="og:novel:status"]').forEach(meta => {
    categories.push(meta.attr('content'));
  });
  doc.select("h1").remove()


  description = doc.select('#intro')
  description.select("p").last().remove()

  let detail = doc.select("#info")
  detail.select("p").get(1).remove()

  return Response.success({
    name: title,
    cover: cover,
    author: author,
    description: description.html(),
    detail: detail.html().replace("&nbsp;", ""),
    host: BASE_URL,
    ongoing: !categories.join(',').includes('完结')
  });
}