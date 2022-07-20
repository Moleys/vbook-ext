function execute(url) {
    const data = [];
    data.push({
        name: "0",
        url: url,
        host: "https://yazhouse8.com"
    })
    return Response.success(data);
}