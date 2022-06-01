function execute() {
    return Response.success([
        {title: "Artist", input: "https://koushoku.org/artists", script: "gen2.js"},
        {title: "Mags", input: "https://koushoku.org/magazines", script: "gen2.js"},
        {title: "Tags", input: "https://koushoku.org/tags", script: "gen2.js"},
        {title: "Collections", input: "https://koushoku.org/collections", script: "gen2.js"},
    ]);
}