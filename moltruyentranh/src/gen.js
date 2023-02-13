function execute(url) {
    url = "https://docs.google.com/spreadsheets/d/1zQyN-d7R84eEzj6GwuOO7vzfLBXgOwQonepDDVNPk6E/gviz/tq?tqx=out:csv&sheet=comments&tq=SELECT%20B,%20C&headers=0"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.text()
        let result = doc.split(/\r?\n/);
        result.shift();
        result.reverse()
        // let total = result.length;
        const data = [];
        result.forEach(e => {
            let row = e.split('\",\"')
            let row0 = row[0].substring(1);
            let name = row0.split("–")[0].trim();
            let author = row0.split("–")[1].trim();
            let cid = row[1].slice(0, -1)
            data.push({
                name: name,
                link: "https://nftstorage.link/ipfs/" + cid,
                cover: "https://nftstorage.link/ipfs/" + cid + "/cover.jpeg",
                description: author,
                host: "https://nftstorage.link"
            })
        });
        return Response.success(data);
    }
}