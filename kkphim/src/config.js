const BASE_URL = "https://kkphim.com";

const API_URL = "https://phimapi.com";

function normalizeUrl(url) {
    url = url || BASE_URL;
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}
