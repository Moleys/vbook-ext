load('libs.js');

function execute(url) {
    var host = 'http://trxs.org';
    url = url.replace('m.trxs.org', 'trxs.org').replace('www.trxs.org', 'trxs.org');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gb2312');

		var data = [];
		var elems = $.QA(doc, 'div.book_list.clearfix > ul > li');
		if (!elems.length) return Response.eror(url);
		
		elems.forEach(function(e){
			data.push({
				name: $.Q(e, 'a').text().trim(),
				url: $.Q(e, 'a').attr('href'),
				host: host
			})
		});

		return Response.success(data);
    }
    return null;
}