load('config.js');

function execute() {
    return Response.success([
        {title: "综漫同人", input:  BASE_URL+"/bl/", script: "gen.js"},
        {title: "GL百合", input:  BASE_URL+"/gl/", script: "gen.js"},

        {title: "古架耽美", input:  BASE_URL+"/jiakong/", script: "gen.js"},
        {title: "穿越耽美", input:  BASE_URL+"/chongsheng/", script: "gen.js"},
        {title: "现代耽美", input:  BASE_URL+"/xiandaidushi/", script: "gen.js"},

        {title: "现代都市_男频", input:  BASE_URL+"/xiandai/", script: "gen.js"},
        {title: "武侠玄幻_男频", input:  BASE_URL+"/wuxia/", script: "gen.js"},
        {title: "穿越重生_男频", input:  BASE_URL+"/chuanyue/", script: "gen.js"},
        {title: "架空历史_男频", input:  BASE_URL+"/jiakonglishi/", script: "gen.js"},
        {title: "网游竞技_男频", input:  BASE_URL+"/wangyou/", script: "gen.js"},

        {title: "悬疑推理小说", input:  BASE_URL+"/tuili/", script: "gen.js"},
        {title: "恐怖灵异小说", input:  BASE_URL+"/kongbulingyi/", script: "gen.js"},
        {title: "文学著作", input:  BASE_URL+"/wenxue/", script: "gen.js"}

    ]);
}