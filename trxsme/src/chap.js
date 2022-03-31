load('libs.js');

function execute(url) {
    url = url.replace('m.trxs.me', 'trxs.me').replace('www.trxs.me', 'trxs.me');;
	
    var response = fetch(url);
    if (response.ok) {
        var doc = response.html('gb2312');
		
		var htm = $.Q(doc, 'div.read_chapterDetail').html();
        htm = cleanHtml(htm);

		return Response.success(htm);
    }
    return null;
}