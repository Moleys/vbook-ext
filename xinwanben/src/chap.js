load('libs.js');

function execute(url) {
    url = url.replace('m.xinwanben.com', 'www.xinwanben.com');

    var response = fetch(url);
    if (response.ok) {
        var doc = response.html();
        var htm = $.Q(doc, '#content').html();
        htm = cleanHtml(htm);
        return Response.success(htm);
    }
    return null;
}