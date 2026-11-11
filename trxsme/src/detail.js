load('libs.js');

function execute(url) {
    var host = 'https://m.tongrenshe.cc';
    url = url.replace(/(m|www)\.trxs\.me/, host).replace(/(m|www\.)?trxs\.me/, host);
	
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gb2312');
		
		return Response.success({
			name: $.Q(doc, 'div.infos > h1').text(),
			cover: $.Q(doc, 'div.book_info.clearfix > div.pic > img').attr('src'),
			author: $.Q(doc, 'div.book_info.clearfix > div.infos > div.date > span > a').text(),
			description: $.Q(doc, 'div.booktips + p').text(),
			detail: $.Q(doc, 'div.date').text(),
			host: host
		});
    }
    return null;
}