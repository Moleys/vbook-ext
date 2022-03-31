load('libs.js');

function execute(url) {
	var host = 'https://www.yyun.net';
    url = url.replace('m.yyun.net', 'www.yyun.net').append('/');
    var response = fetch(url);
    
    if (response.ok) {
        var doc = response.html();

        var data = [];
        var elems = $.QA(doc, '#list a');
        if (!elems.length) return Response.error(url);
        
        elems.forEach(function(e){
            data.push({
                name: $.Q(e, 'a').text(),
                url: e.attr('href'),
                host: host
            })
        });

        return Response.success(data);
    }
    return null;
}
