load('config.js');

function execute(url, page) {

    if (!page) page = '1';
    if (page !== '1') {
        url = url + "?page=" + page;
    }

    let response = fetch(url);
    if (response.ok) {
        let json = response.json();
        let list = json.items.map(item => {
            return {
                name: item.name,
                link: BASE_URL + "/phim/" + item.slug,
                description: item.description,
                cover: item.poster_url,
                tag: item.current_episode,
                host: BASE_URL,
            };
        });
        let next = parseInt(page) + 1;
        if (next > json.pagination.totalPages) {
            next = null;
        }
        return Response.success(list, next);
    }
    return null;
}
