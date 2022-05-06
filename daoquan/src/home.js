function execute() {
    return Response.success([
        {title: "Xem nhiều", script: "gen.js", input: "https://daoquan.vn/tim-kiem-tong-hop?rank=view"},
        {title: "Đề cử", script: "gen.js", input: "https://daoquan.vn/tim-kiem-tong-hop?rank=nominate"},
        {title: "Yêu thích", script: "gen.js", input: "https://daoquan.vn/tim-kiem-tong-hop?rank=like"},
        {title: "Theo dõi nhiều", script: "gen.js", input: "https://daoquan.vn/tim-kiem-tong-hop?rank=follow"}
    ]);
}