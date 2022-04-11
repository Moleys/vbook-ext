
function execute(key, page) {
    if (!page) page = '1';
    let response = fetch('https://www.vietnovel.com/searchnovels/api/novels-list/', {
        method: "GET",
        queries: {
            q : key,
            page: page
        }
    });

    if (response.ok) {
        let json = response.json();
        let data = [];
        let total = json.count;
        let books = json.results;
        let totalPage = Math.round(total/20);


        books.forEach(e => {
            data.push({
                name: e.title,
                link: e.url,
                cover:  e.picture,
                description: e.user.name,
                host: "https://www.vietnovel.com"
            });
        });

        var next = "";
        if(next < totalPage) 
            next  =  parseInt(page, 10) + 1;

        return Response.success(data, next.toString());
    }
    return null;
}