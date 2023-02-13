function execute(key, page) {
    url = "https://docs.google.com/spreadsheets/d/1zQyN-d7R84eEzj6GwuOO7vzfLBXgOwQonepDDVNPk6E/gviz/tq?tqx=out:csv&sheet=comments&tq=SELECT%20B,%20C&headers=0";
    let newkey = slugify(key)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.text()
        let result = doc.split(/\r?\n/);
        result.shift();
        result.reverse()
        const data = [];
        result.forEach(e => {
            let row = e.split('\",\"')
            let row0 = row[0].substring(1);
            let name = row0.split("–")[0].trim();
            let author = row0.split("–")[1].trim();
            let cid = row[1].slice(0, -1)
           if (slugify(name).includes(newkey)) {
                data.push({
                    name: name,
                    link: "https://nftstorage.link/ipfs/" + cid,
                    cover: "https://nftstorage.link/ipfs/" + cid + "/cover.jpeg",
                    description: author,
                    host: "https://nftstorage.link"
                })
           }
        });
        return Response.success(data);
    }
}

function slugify(e){var a="àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;",r=new RegExp(a.split("").join("|"),"g");return e.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,"a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi,"e").replace(/i|í|ì|ỉ|ĩ|ị/gi,"i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,"o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi,"u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi,"y").replace(/đ/gi,"d").replace(/\s+/g,"-").replace(r,e=>"aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------".charAt(a.indexOf(e))).replace(/&/g,"-and-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}

