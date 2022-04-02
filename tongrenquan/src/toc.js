load('libs.js');

function execute(url) {
    var host = 'http://tongrenquan.org';
    url = url.replace('m.tongrenquan.org', 'tongrenquan.org').replace('www.tongrenquan.org', 'tongrenquan.org');

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