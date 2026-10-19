load('config.js');

function execute() {
    var latest = null;
    var r1 = fetch(API_BASE + "/api/works", {
        queries: { order: "release", sort: "desc", page: "1", pageSize: "10" },
        headers: { "Referer": BASE_URL },
    });
    if (r1.ok) latest = r1.json();

    var popular = null;
    var r2 = fetch(API_BASE + "/api/recommender/popular", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Referer": BASE_URL },
        body: JSON.stringify({ keyword: "", page: 1, pageSize: 10, subtitle: null }),
    });
    if (r2.ok) popular = r2.json();

    var sections = [];
    if (popular && popular.works && popular.works.length > 0) {
        sections.push({
            id: "popular",
            title: "Phổ biến",
            subtitle: "",
            type: "banner",
            items: parseWorks(popular),
            action: { type: "list", script: "popular.js", input: "", data: "" },
        });
    }
    if (latest && latest.works && latest.works.length > 0) {
        sections.push({
            id: "latest",
            title: "Mới nhất",
            subtitle: "",
            type: "grid",
            items: parseWorks(latest),
            action: { type: "list", script: "latest.js", input: "", data: "" },
        });
    }

    return Response.success(sections);
}
