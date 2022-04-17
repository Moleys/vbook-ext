function execute() {
    return Response.success([
        {title: "玄幻奇幻", input:  "https://www.haitang16.com/xuanhuan", script: "gen.js"},
        {title: "武侠仙侠", input:  "https://www.haitang16.com/wuxia", script: "gen.js"},
        {title: "历史军事", input:  "https://www.haitang16.com/lishi", script: "gen.js"},
        {title: "都市生活", input:  "https://www.haitang16.com/dushi", script: "gen.js"},
        {title: "科幻未来", input:  "https://www.haitang16.com/kehuan", script: "gen.js"},
        {title: "其他类型", input:  "https://www.haitang16.com/qita", script: "gen.js"}
    ]);
}