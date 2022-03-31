load('libs.js');

function execute(url) {
	var host = 'https://www.xinwanben.com';
    url = url.replace('m.xinwanben.com', 'www.xinwanben.com').append('/');
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
