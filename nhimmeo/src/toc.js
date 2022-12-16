
function execute(url) {
    if(url.slice(-1) === "/")
        url = url.slice(0, -1);  
    const data = [];
    let book_id = url.split(/[/ ]+/).pop();
    let url_division = "https://nhimmeo.cf/api/catalog.php?q=" + book_id;
    let response_chapter_list = fetch(url_division)
    if (response_chapter_list.ok) {
        let text_encrypt = response_chapter_list.json();
        let chapter_infoCatatog = text_encrypt.data.chapter_list
        chapter_infoCatatog.forEach(division => {
            let chapter_list = division.chapter_list;
			chapter_list.forEach((e,index) => {
                let name = e.chapter_title;
                if(e.is_paid > 0){
                    name = "[VIP] " + name;
                }
                data.push({
                    name: name,
                    url: "https://nhimmeo.cf/chap/" + e.chapter_id,
                    host: "https://nhimmeo.cf"
                })
			}); 
        });
        return Response.success(data)
    }
    return null;
}

