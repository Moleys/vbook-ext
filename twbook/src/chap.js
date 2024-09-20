function execute(url) {
    url = url.replace('m.twbook.cc', 'www.twbook.cc');
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        doc.select("script").remove();
        doc.select(".adBlock").remove();
        let htm = doc.select(".content").html();
        htm = htm.replace(/\&nbsp;/g, "");
        htm = replaceZH(htm)




        return Response.success(htm);
    }
    return null;
}

function replaceZH(input_text) {
    var s1 = '二丁入刀干工市亡之已弓勺元五屯切仁化父今凶欠丹六文尺未巧功世本丙右平的在叫用失生到分乎令成句主市年百同而行里回加制去好因然政社事重新明原利但向道公系很者直程果象毛白扯走抄裸赤交密娼共李游集操芽花器棒母着';
    var s2 = '㟧㠬㣉㥕㥫㦂㦫㦱㦳㦵㦶㧜㨾㩙㩽㪏㪶㪸㫅㫇㫈㫠㫡㫦㫧㫯㮽㰙㰜㰱㰴㰷㱏㱒㱕㱗㳍㳎㳒㳓㳔㵑㵒㵔㵕㵙㹏㹐㹓䀱䀲䀴䃢䋢䋤䌠䑖䗙䗽䘓䛈䛊䛌䛍䛗䜥䜭䥉䥊䥍䦣䦤䭹䭻䭼䭾䮍䮹䯬䯮䲻䲾䶑䶓丳乀乁噷噸圙塿夌婈婖媱嵞嵟欜鼶齂著';
    var result = '';

    for (var i = 0; i < input_text.length; i++) {
        var c = input_text.charAt(i);
        var p = s2.indexOf(c);
        result += p < 0 ? c : s1.charAt(p);
    }

    return result;
}
