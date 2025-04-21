
function execute(input, next) {
    let page = '0'; // Khai báo biến page mặc định là '0'
    if (next) page = next; // Nếu next được truyền vào, gán giá trị cho page

    let url1 = "https://www.pixiv.net/ajax/novel/series_content/"+input+"?limit=30&last_order=0&order_by=asc&lang=en";

    let response = fetch(url1);

    if (response.ok) {
        let doc = response.json();
        let item_list = doc.body.thumbnails.novel;
        const data = [];

        item_list.forEach((el, index) => {

            if (el.title) {
                data.push({
                    name: el.title,
                    link: "https://www.pixiv.net/novel/show.php?id=" + el.id,
                    cover: (el.url),
                    description: doc.body.userName,
                    host: "https://www.pixiv.net"
                });
            }
        });

        let nextPage = (parseInt(page, 10) + 1).toString();
        return Response.success(data, nextPage);
    }
    return null;
}
