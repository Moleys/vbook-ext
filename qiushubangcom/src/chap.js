function execute(url) {
    url = url.replace('m.qiushubang.com', 'www.qiushubang.com');
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html('gbk');
        let htm = doc.select(".articleCon").html();
        htm = htm.replace(/\&nbsp;/g, "").replace(/&#x9;/g, "").replace(/&#x8;/g, "").replace(/&#x7;/g, "").replace(/&#x6;/g, "").replace(/&#x5;/g, "").replace(/&#x4;/g, "").replace(/&#x3;/g, "").replace(/&#x2;/g, "").replace(/&#x1;/g, "").replace("【♂求♂书♂帮♂】最新网址: www.qiushubang.me", "").replace("〔求♂書♂帮-是本小♂说-唯♂一更新最快的♂站〕", "").replace("「^求^书^帮^首~发」","").replace("求♂书♂帮♂最♂新♂网♂址：www.qiushubang.me","").replace("免-费-首-发→【求】【书】【帮】","").replace("★看★最★新★章★节★百★度★搜★求★书★帮★","").replace("★首★发★求★书★帮★","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.com/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("本↘书↘首↘发↘求.书.帮↘http://m.qiushubang.me/","").replace("【♂求♂书♂帮♂】最新网址: www.qiushubang.com", "").replace("〔求♂書♂帮-是本小♂说-唯♂一更新最快的♂站〕", "").replace("「^求^书^帮^首~发」","").replace("求♂书♂帮♂最♂新♂网♂址：www.qiushubang.com","");

        //móa rác nhiều vcc
        return Response.success(htm);
    }
    return null;
}