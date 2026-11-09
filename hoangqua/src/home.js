// home.js — tabs routed to search.js via encoded inputs.
function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: "feed", script: "search.js" },
        { title: "Bảng xếp hạng", input: "rank:hot", script: "search.js" },
        { title: "Đề xuất", input: "rank:recommend", script: "search.js" },
        { title: "Tiềm năng", input: "rank:potential", script: "search.js" }
    ]);
}
