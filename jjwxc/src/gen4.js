function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let el = response.json();
        const data = [];
        for (let i = 0;i < el.length; i++) {
            data.push({
              name: el[i].novelName,
              detail: el[i].authorName,
              cover: "https://images.weserv.nl/?url=" + el[i].cover +"&output=jpg&w=300",
              link: "http://www.jjwxc.net/onebook.php?novelid=" +el[i].novelId,
              host: "http://www.jjwxc.net"
          })
        }
        return Response.success(data);
    }
    return null;
}