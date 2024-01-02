function execute() {
    return Response.success([
        {title: "全部", input:  "/bookstack/", script: "zen.js"},
        {title: "玄幻", input:  "/bookstack/xuanhuan/", script: "zen.js"},
        {title: "修真", input:  "/bookstack/xiuzhen/", script: "zen.js"},
        {title: "都市", input:  "/bookstack/dushi/", script: "zen.js"},
        {title: "歷史", input:  "/bookstack/lishi/", script: "zen.js"},
        {title: "網游", input:  "/bookstack/wangyou/", script: "zen.js"},
        {title: "科幻", input:  "/bookstack/kehuan/", script: "zen.js"},
        {title: "女頻", input:  "/bookstack/nvpin/", script: "zen.js"},
        {title: "靈異", input:  "/bookstack/lingyi/", script: "zen.js"},
        {title: "同人", input:  "/bookstack/tongren/", script: "zen.js"},
        {title: "軍事", input:  "/bookstack/junshi/", script: "zen.js"},
        {title: "懸疑", input:  "/bookstack/xuanyi/", script: "zen.js"},
        {title: "穿越", input:  "/bookstack/chuanyue/", script: "zen.js"},
        {title: "其他", input:  "/bookstack/other/", script: "zen.js"}

    ]);
}