function execute(key, page) {
    if (!page) page = '1';
    key = encodeURI(key)
    let response = fetch('http://app.jjwxc.net/androidapi/search?keyword=' + key + '&type=1&page=1&token=null&searchType=1&sortMode=DESC&versionCode=133`');
    if (response.ok) {
        let items = response.json().items;
        let array = []

        items.forEach((item) => {
          array.push({
              name: item.novelname,
              detail: item.authorname,
              cover: item.cover,
              link: "http://www.jjwxc.net/onebook.php?novelid=" +item.novelid,
              host: "http://www.jjwxc.net"
          })
      })

        return Response.success(array);
    }
    return null;
}