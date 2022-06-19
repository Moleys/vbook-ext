function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let ele2 = doc.html().split("<script>window.__NUXT__=")[1].split("<\/script>")[0].split("return")[0].split("{")[1].split(";");;

        const data = [];
        let data_order = [];
        let data_aid = [];
        let data_title = [];
        ele2.forEach(e => {
            if(e.includes(".order="))
                data_order.push(e.split(".order=")[1]);
            if(e.includes(".aid="))
                data_aid.push("https://www.lightnovel.us/detail/" + e.split(".aid=")[1]);
            if(e.includes(".title="))
                data_title.push(JSON.parse(e.split(".title=")[1]));
	    }); 
        for (let i = 0; i < data_order.length; i++) {
            data.push({
                name: data_title[i],
                url: data_aid[i],
                order: data_order[i],
                host: "https://www.lightnovel.us"
            });
        }
        data.sort((a,b) => a.order - b.order);
        return Response.success(data);
    }
    return null;
}