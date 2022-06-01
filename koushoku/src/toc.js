function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        const data = [];
        data.push({
            name: "0",
            url: url,
            host: "https://koushoku.org"
        })
        data = data.reverse();
        return Response.success(data);
    }
    return null;
}