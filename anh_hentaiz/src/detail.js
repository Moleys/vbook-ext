function execute(url) {

    let name = "";
    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=616622316356501515"){name="#non-hentai";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=616616204781617152"){name="#ảnh-ecchi-hentai-18";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=620657451687084042"){name="#video-hentai";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=852377613498318888"){name="#3D-hentai";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=620657953917370378"){name="#video-irl";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=781870041862897684"){name="#ảnh-gái-xinh";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=781870218192355329"){name="#ảnh-gái-xinh-18";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=616622475773476884"){name="#yuri";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=616622496765968427"){name="#futa";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=622677459690717185"){name="#yaoi";}

    if(url==="https://hentaiz.cc/gallery/?channels%5B%5D=622677550065516554"){name="#furry";}
    


    
    return Response.success({
        name: name,
        cover: "",
        author: "Hentaiz",
        description: "",
        host: "https://hentaiz.cc/gallery/"
    });
}