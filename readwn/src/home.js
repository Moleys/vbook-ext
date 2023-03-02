function execute() {
    return Response.success([
        {title: "Popular Daily Updates", input: "https://www.readwn.com/list/all/all-lastdotime-", script: "gen.js"},
        {title: "Most Popular", input: "https://www.readwn.com/list/all/all-onclick-", script: "gen.js"},
        {title: "New Novels", input: "https://www.readwn.com/list/all/all-newstime-", script: "gen.js"},


    ]);
}