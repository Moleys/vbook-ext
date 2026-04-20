load('config.js');
function execute(key, page) {
    if (!page) page = '1';
    let response = fetch(API_URL + "/v1/api/tim-kiem?keyword=", {
        queries: {
            keyword: key
        }
    });
    if (response.ok) {
        let json = response.json();
        let list = json.data.items.map(item => {
            return {
                name: item.name,
                link: BASE_URL + "/phim/" + item.slug,
                description: item.origin_name,
                cover: "https://phimimg.com/" + item.poster_url,
                tag: item.current_episode,
                host: BASE_URL,
            };
        });
        let next = parseInt(page) + 1;
        if (next > json.data.params.pagination.totalPages) {
            next = null;
        }
        return Response.success(list, next);
    }
    return null;
}
