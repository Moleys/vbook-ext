function execute() {
    return Response.success([
        {
            title: "都市",
            input: "/reading/bookapi/new_category/landing/v/?category_id=1&offset={{page}}&sub_category_id&genre_type=0&limit=10&source=front_category&front_page_selected_category&no_need_all_tag=true&query_gender=1",
            script: "gen2.js"
        },
    ]);
}