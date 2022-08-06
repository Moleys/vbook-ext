function execute(url) {
    url = url.replace('m.dghsym.com', 'www.dghsym.com');
    let url2 = url.replace(".html","");
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let htm = doc.select("article#article").html();
        let next = doc.select("#next_url").attr("href")
        next = getNext(next)
        while (next > 0) {
            let response1 = fetch(url2 +"_"+ next +".html");
            if (response1.ok) {
                let doc1 = response1.html();
                next = doc1.select("#next_url").attr("href")
                next = getNext(next)
                let htm1 = doc1.select("article#article").html();
                htm = htm + htm1;
            } 
            else {
                break;
            }
        }

        return Response.success(htm);
    }
    return null;
}

function getNext(next){
    next = next.replace(".html","")
    if(next.includes("_")){
        next = next.split("_")[1]
        next = parseInt(next,10)
    }
    else{
        next = 0;
    }
    return next;
}
