function execute() {
    return Response.success([
        {title: "Latest Update", input: "https://readcomiconline.li/ComicList/LatestUpdate", script: "gen.js"},
        {title: "Most Popular", input: "https://readcomiconline.li/ComicList/MostPopular", script: "gen.js"},
        {title: "Newest", input: "https://readcomiconline.li/ComicList/Newest", script: "gen.js"}


    ]);
}