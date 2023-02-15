function execute(url) {
    const data = [];
    if(url.slice(-1) !== "/")
	    url = url + "/";

    let url2 = "https://bafybeihkakqcmfbonjuwgaop2spfeceacvlv2yb4t5zty5ashhjdswbzgy.ipfs.ipfs-gateway.cloud/?filename=new%201.txt"
    let response2 = fetch(url2);
    let doc2 = response2.text()
    let result2 = doc2.split(/\r?\n/);
    let count_result2=126;
    for (let i = 0;i < result2.length; i++) {
        var e = result2[i];
        count_result2 += 1;
        data.push({
            name: e,
            url: "https://sangtacviet.pro/truyen/dich/1/6252/"+count_result2+"/",
            host: "https://ipfs-gateway.cloud"
        })
    }

    return Response.success(data);
    
    return null;
}