function execute() {
    return Response.success([
        {title: "中文", input:  encodeURIComponent("中文"), script: "gen2.js"},
        {title: "百合", input:  encodeURIComponent("百合"), script: "gen2.js"},




    ]);
}