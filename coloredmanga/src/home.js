function execute() {
    return Response.success([
        {title: "Lastest", input: "https://coloredmanga.com/manga/?m_orderby=trending", script: "gen.js"}
    ]);
}