let config_host = "http://localhost:9999";
let config_host2 = "http://localhost:9999";
if (typeof host !== "undefined") {
    config_host = host
    config_host2 = config_host
    if (config_host2.includes("api-fanqienovel.sunianyun.live")) {
        let response_host = fetch("http://list.api-fanqienovel.sunianyun.live/random")
        if (response_host.ok) {
            config_host2 = response_host.text()
        }
    }

}