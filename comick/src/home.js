function execute() {
    return Response.success([
        {title: "Updates: Hot", input: "hot", script: "updates.js"},
        {title: "Rank", input: "rank", script: "gen.js"},
        {title: "Recent Rank ", input: "recentRank", script: "gen.js"},
        {title: "News", input: "news", script: "gen.js"},
        {title: "Completions", input: "completions", script: "gen.js"},
        {title: "Trending 7 days", input: "7", script: "trending.js"},
        {title: "Trending 30 days", input: "30", script: "trending.js"},
        {title: "Trending 90 days", input: "90", script: "trending.js"},

    ]);
}