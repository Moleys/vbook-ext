function execute(key) {
    let response = fetch("http://truyentuan.com/wp-content/themes/nos/js/search.js");
    if (response.ok) {
        let doc = response.html();
        let newkey = slugify(key)
        // console.log(newkey)
        let search_arr = doc.text().replace("var availableTags=","").slice(0, -1).trim().replace(/label:/g,'"label":').replace(/value:/g,'"value":').replace(/url:/g,'"url":').replace(/'/g,'"').replace(/\"s/g,"``s").replace(/\"m/g,"``m").replace(/\"t/g,"``t").replace(/I\"S/g,"I``S").replace(/ - \"Kono/g,' - ``Kono').replace(/yo\" \"Kotowaru!\"/g,'yo Kotowaru!').replace(/Fireflies\" Light/g,'Fireflies Light').replace(/Smokin\"Parade/g,"Smokin Parade").replace(/Zenryoku "Otome\"/g,"Zenryoku Otome").replace(/ER\"S /g,"ER``S ").replace(/Shin\"ai/g,"Shin``ai")
        search_arr = JSON.parse(search_arr)
        // console.log(search_arr)
        const data = [];
		search_arr.forEach(e => {
            let slug_name = e.url.replace("http://truyentuan.com/","").slice(0, -1)
            if(slug_name.includes(newkey)){
                data.push({
                    name: e.label,
                    link: e.url,
                    description: "",
                    host: "http://truyentuan.com"
                })
            }
        
        });
        return Response.success(data)
    }
    return null;
}

function slugify(e){var a="àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;",r=new RegExp(a.split("").join("|"),"g");return e.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,"a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi,"e").replace(/i|í|ì|ỉ|ĩ|ị/gi,"i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,"o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi,"u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi,"y").replace(/đ/gi,"d").replace(/\s+/g,"-").replace(r,e=>"aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------".charAt(a.indexOf(e))).replace(/&/g,"-and-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}