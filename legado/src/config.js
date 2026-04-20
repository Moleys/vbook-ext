const config_host = (() => {
    let raw = (typeof host !== "undefined") ? host : "";
    raw = String(raw).replace(/"/g, "").trim();
    return raw || "http://localhost:1122";
})();