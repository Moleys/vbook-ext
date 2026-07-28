load('config.js');

function execute() {
    var cats = [
        "categories/vietnamese@@Việt Nam",
        "categories/uncensored@@Không Che",
        "categories/asian@@Châu Á",
        "categories/japanese@@Nhật Bản",
        "categories/chinese@@Trung Quốc",
        "categories/korean@@Hàn Quốc",
        "categories/big-tits@@Vú Bự",
        "categories/anal@@Anal",
        "categories/amateur@@Amateur",
        "categories/milf@@MILF",
        "categories/teen@@Teen",
        "categories/creampie@@Creampie",
        "categories/hentai@@Hentai",
        "categories/lesbian@@Lesbian",
        "categories/massage@@Massage",
        "categories/threesome@@Threesome",
        "categories/gangbang@@Gangbang",
        "categories/hairy@@Hairy",
        "categories/squirting@@Squirting",
        "categories/cosplay@@Cosplay",
        "best/weekly@@Hay Trong Tuần",
        "newest@@Hàng Mới"
    ];

    var list = [];
    for (var i = 0; i < cats.length; i++) {
        var parts = cats[i].split("@@");
        list.push({
            title: parts[1],
            input: BASE_URL + "/" + parts[0],
            script: "gen.js"
        });
    }
    return Response.success(list);
}
