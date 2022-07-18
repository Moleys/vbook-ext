function execute(url) {
    const data = [];
    data.push({
        name: "0",
        url: url,
        host: "https://www.pixiv.net"
    })
    return Response.success(data);
}