

function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.json();
        let data = [];
        doc.data.server[0].chapters.forEach(e => {
            data.push(e)
        });
        data = data.filter(url => url !== "https://api.tainettruyen.com//assets/images/donate.jpg");

        return Response.success(data);
    }
    return null;
}