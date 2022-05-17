function execute(url) {
    url = "https://docs.google.com/spreadsheets/d/1EzvHQFV9wC-OmJ_rqzHRSMnQv-gCn8oPKuJEaC8ezZY/gviz/tq?tqx=out:csv&sheet=comments&tq=SELECT%20B&headers=0"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.text()
        let result = doc.split(/\r?\n/);
        result.shift();
        // console.log(result.toString())
        let total = result.length/30;
        let total2 = parseInt(result.length/30,10)
        if(total>total2) total = total2+1;
        console.log(total)
        const data = [];
        for (let i = 0;i <total; i++) {
            data.push({
                name: (i+1).toString(),
                url: "http://github.com/Moleys/vbook-ext/anh_moleys-gc/"+(i+1).toString(),
                host: "http://github.com/Moleys/vbook-ext/anh_moleys-gc/"
            })
        }
        return Response.success(data);
    }

}
