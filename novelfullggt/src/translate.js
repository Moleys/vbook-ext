function execute(text_input) {
    let response = fetch("https://lingva.ml/_next/data/W2CEX1soVk5C7i5QIjf3q/auto/vi/"+ text_input +".json");
    if (response.ok) {
        let doc = response.json();
        let translated = doc.pageProps.translationRes;
        console.log(translated)
        
    }
    return null;
}
