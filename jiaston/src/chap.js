function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let res_json = response.json();
        let content = res_json.data.content.replace(/\r\n/g, "<br>");;  
        return Response.success(content);
    }
    return null;
}