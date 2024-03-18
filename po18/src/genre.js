load('config.js');

function execute(url) {
    let response = fetch(BASE_URL);
    if (response.ok) {
        let doc = response.html();
        let el = doc.select(".tags a.tag")
        const data = [];
        el.forEach(e => {
            data.push(
                {title: e.text(), script: "gen.js", input: BASE_URL + e.attr("href")},
            )
        })
        return Response.success(data);

    }
}
