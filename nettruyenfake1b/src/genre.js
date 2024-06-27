load('config.js');
load('md5.js');

function execute() {
    let w = `genre/list`;
    let sign  = buildSign(w)
    let url2 = BASE_URL + "/api/" + w + "?sign=" + sign
    console.log(url2)
    let response = fetch(url2);
    if (response.ok) {
        let doc = response.json();
        let genres = [];
        doc.forEach(e => {
            genres.push({
                title: e.name,
                input: e.id,
                script: "gen2.js"
            })
        });
        return Response.success(genres);
    }

    return null;
}