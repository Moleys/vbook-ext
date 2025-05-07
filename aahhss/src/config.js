let BASE_URL = 'https://aahhss.com';
let BASE_URL1 = 'https://www.aahhss.com';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
        BASE_URL1 = CONFIG_URL;
    }
} catch (error) {
}