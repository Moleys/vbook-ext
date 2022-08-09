function execute() {
    return Response.success([
        {title: "Mới cập nhật", input: "https://mangabit.top", script: "gen1.js"},
        {title: "Top ngày", input: "https://mangabit.top/xep-hang/top-ngay", script: "gen.js"},
        {title: "Top tháng", input: "https://mangabit.top/xep-hang/top-tuan", script: "gen.js"},
        {title: "Top all", input: "https://mangabit.top/xep-hang/top-all", script: "gen.js"},
        {title: "Truyện full", input: "https://mangabit.top/truyen-full", script: "gen.js"},

    ]);
}