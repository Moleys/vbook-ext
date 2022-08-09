function execute(key) {
    let response = fetch("https://mangabit.top/ajax/search?q=" +key);
    if (response.ok) {
        let doc = response.json();
        const obj = doc.data.stories
        const data = [];
		obj.forEach(e => {
            data.push({
                name: e.name.replace("<font>","").replace("<\/font>",""),
                link: e.url,
                cover: e.logoUrl,
                description: e.authorName,
                host: "https://mangabit.top"
            })
        });
        return Response.success(data)
    }
    return null;
}