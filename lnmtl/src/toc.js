function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let el1 = doc.html().split("lnmtl.volumes = ")[1].split(";lnmtl.route")[0]
        let el2 = JSON.parse(el1)
        const data = [];
        let count = 1;
        for (let i = 0;i < el2.length; i++) {
            // let total_pagi = 10;
            let volume_page = 1;
            while(true) {

                let response1 = fetch("https://lnmtl.com/chapter?page="+ volume_page +"&volumeId="+el2[i].id);
                if (response1.ok) {
                    volume_page ++;
                    let json1 =response1.json();
                    // let last_page = json1.last_page;
                    let json1_data = json1.data;
                    if(json1_data.length < 1) break;

                    for (let j = 0;j < json1_data.length; j++) {
                        data.push({
                            name: "#"+count +" " + json1_data[j].title,
                            url:"https://lnmtl.com/chapter/" + json1_data[j].slug,
                            host: "https://lnmtl.com"
                        });
                        count++;
                    }

                }
            }


        }
        return Response.success(data);
    }
    return null;
}