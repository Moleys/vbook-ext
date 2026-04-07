var config_host = getHost();

function getHost() {
    if (typeof host === 'undefined') return "http://localhost:1122";

    let cleanVal = String(host).replace(/"/g, "").trim();
    return cleanVal || "http://localhost:1122";
}
