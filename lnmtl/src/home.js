function execute() {
    return Response.success([
        {title: "Home", input: "https://lnmtl.com/novel?orderBy=date&order=desc&filter=all", script: "gen.js"}

    ]);
}