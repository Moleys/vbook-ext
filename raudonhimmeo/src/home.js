function execute(url) {
    let response = fetch("https://raudo.eu.org/api/vbook.php")
    if (response.ok) {
        let json = response.json();
        return Response.success(json);
    }
    return null;
}
