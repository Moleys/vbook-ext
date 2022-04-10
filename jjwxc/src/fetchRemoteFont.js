function execute(namefont) {
    let response = fetch("https://jjwxc.bgme.bid/" + namefont + ".json");
    if (response.ok) {
        let doc = response.json();
        console.log(doc)
        return Response.success(htm);
    }
    return url;
}