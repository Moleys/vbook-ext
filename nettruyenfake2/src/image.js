function execute(url) {
    let response = fetch(url, {
    headers: {
        'referer': 'https://nettruyenviet.com/'
    }
    });
    if (response.ok) {
        return Graphics.createImage(response.base64())
    }

    return null;
}