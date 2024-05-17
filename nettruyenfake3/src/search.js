load('config.js');
function execute(key, page) {
    if (!page) page = '1';

    let response = fetch(BASE_URL+'/ajax/search', {
            method: 'POST',
            body:  {'search': key}
        })

    if (response.ok) {
        let doc = response.json();
        console.log(JSON.stringify(doc))
        let data = [];
        doc.list.forEach(e => {
            let coverImg = BASE_URL + e.cover

            data.push({
                name: e.name,
                link: e.url,
                cover: coverImg,
                description: e.update,
                host: BASE_URL
            });
        });

        return Response.success(data);
    }

    return null;
}