function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        const data = [];

        data.push({
            name: "Solo Leveling",
            link: "https://sololeveling.ga",
            description: 'Theo chân Sung JinWoo trên hành trình từ "thợ săn kém cỏi" đến "thợ săn hạng S mạnh nhất thế giới".',
            cover: "https://i.imgur.com/8w6mwf7.jpg",
            host: "https://sololeveling.ga"
        })



        return Response.success(data)
    }
    return null;
}