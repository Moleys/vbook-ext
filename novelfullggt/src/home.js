function execute() {
    return Response.success([
        { title: "Latest", input: "https://novelfull.com/latest-release-novel?page=", script: "gen.js" },
        { title: "Hot Novel", input: "https://novelfull.com/hot-novel?page=", script: "gen.js" }, 
        { title: "Compelete", input: "https://novelfull.com/completed-novel?page=", script: "gen.js" }, 
        { title: "Most popular", input: "https://novelfull.com/most-popular?page=", script: "gen.js" }, 
    ]);
}