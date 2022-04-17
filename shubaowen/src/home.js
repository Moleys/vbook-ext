function execute() {
    return Response.success([
        {title: "玄幻奇幻", input:  "https://www.shubaowen.com/xuanhuan", script: "gen.js"},
        {title: "仙侠修真", input:  "https://www.shubaowen.com/xianxia", script: "gen.js"},
        {title: "穿越历史", input:  "https://www.shubaowen.com/lishi", script: "gen.js"},
        {title: "都市言情", input:  "https://www.shubaowen.com/dushi", script: "gen.js"},
        {title: "科幻网游", input:  "https://www.shubaowen.com/kehuan", script: "gen.js"},
        {title: "精品其他", input:  "https://www.shubaowen.com/jingpin", script: "gen.js"}
    ]);
}