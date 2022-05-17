function execute(url) {
    let id_per = url.split(/[/ ]+/).pop() -1;
    url = "https://docs.google.com/spreadsheets/d/1EzvHQFV9wC-OmJ_rqzHRSMnQv-gCn8oPKuJEaC8ezZY/gviz/tq?tqx=out:csv&sheet=comments&tq=SELECT%20B&headers=0"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.text()
        let result = doc.split(/\r?\n/);
        result.shift();
        // console.log(result.toString())
        // const chunkSize = 30;
        // for (let i = 0; i < array.length; i += chunkSize) {
        //     const chunk = array.slice(i, i + chunkSize);
        //     // do whatever
        // }
        let imgs = result.slice(id_per*30,id_per*30+30)
        for (let i=0; i < imgs.length; i++) {
            imgs[i] = imgs[i].replace(/\"/g, "");
        }


        

        return Response.success(imgs);
    }
    return null;
}