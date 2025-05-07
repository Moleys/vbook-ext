load('config.js');
function execute(url, page) {
  if (!page) page = '';
  console.log(url + "" + page)


  let response = fetch(url + "" + page);


  if (!response.ok) return null;
  let doc = response.html();

  const data = [];


  if (!page) {
    doc.select('#newscontent li').forEach(e => {

      let bookInfo = e.select('span.s1');
      if (bookInfo) {
        let bookLink = e.select('a').attr('href');
        let bookName = e.select('a').text().trim();
        let lastChapter = e.select('span.s3 a').text().trim();

        if (bookName)
          data.push({
            name: bookName,
            link: BASE_URL + bookLink,
            host: BASE_URL,
            description: lastChapter
          });
      }
    });
  }
  else {
    doc.select('.novelslist2 li').forEach(e => {

      let bookInfo = e.select('span.s1');
      if (bookInfo) {
        let bookLink = e.select('a').attr('href');
        let bookName = e.select('a').text().trim();
        let lastChapter = e.select('span.s3 a').text().trim();
        if (bookName)
          data.push({
            name: bookName,
            link: BASE_URL + bookLink,
            host: BASE_URL,
            description: lastChapter
          });
      }
    });



  }


  // Check for next page
  let nextPage = doc.select('a:contains(下一页)').attr('href').replace("list_", "").split(/[/ ]+/).pop();
  nextPage = nextPage ? "/" + nextPage : nextPage;

  return Response.success(data, nextPage);

}