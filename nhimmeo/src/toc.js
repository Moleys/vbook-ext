
load('config.js');

function execute(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);  
    const data = [];
    let book_id = url.split(/[/ ]+/).pop();
    let url_division = BASE_URL+"/api/catalog.php?q=" + book_id;
    let response_chapter_list = fetch(url_division)
    if (response_chapter_list.ok) {
        let text_encrypt = response_chapter_list.json();
        let chapter_infoCatatog = text_encrypt.data.chapter_list
        chapter_infoCatatog.forEach(division => {
            let chapter_list = division.chapter_list;
			chapter_list.forEach((e,index) => {
                let name = e.chapter_title;
                let buy = e.is_paid > 0 ? true : false;

                data.push({
                    name: name,
                    url: BASE_URL+"/chap/" + e.chapter_id,
                    pay: buy,
                    host: BASE_URL
                })
			}); 
        });
        return Response.success(data)
    }
    return null;
}

