function execute(url) {
//books/
    var doc = Http.get(url).html();
    if (doc){
        var content = doc.select("#chapter-content p");
        //content.select("script").remove();
        //content.select("ins").remove();
        //content = content.text();
        let countlength = 0;
        let content1 = "";
        let contentTra = "";
        for (let i = 0;i < content.size(); i++) {
            content1 = content1 +content.get(i).text() +"\n";
            countlength = countlength + content1.length;
            if(countlength>=3000){

                let response = fetch("https://lingva.ml/_next/data/W2CEX1soVk5C7i5QIjf3q/auto/vi/"+ encodeURIComponent(content1) +".json");
                if (response.ok) {
                    let doc = response.json();
                    contentTra = contentTra + doc.pageProps.translationRes +"\n";
                    
                }
                countlength = 0;
                content1 = "";

            }
        }
        console.log(contentTra)

        contentTra = contentTra.replace(/\n/g, "<br />");
        
        // console.log(content1)

        return Response.success(contentTra);
    }   


    return null;
}

function TranslateText(text_input) {
    let response = fetch("https://lingva.ml/_next/data/W2CEX1soVk5C7i5QIjf3q/auto/vi/"+ text_input +".json");
    if (response.ok) {
        let doc = response.json();
        let translated = doc.pageProps.translationRes;
        return translated;
        
    }
    return null;
}
