

function getToken() {
    let response = fetch("https://www.po18.tw")
    if (response.ok) {
        const data = [];
		let doc = response.html();
        let frc = doc.select("#header-search-form input ").first().attr("value")
        return frc
    }
    return null;
}
