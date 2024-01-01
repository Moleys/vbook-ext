let BASE_URL = 'https://novel-api.xiaoppkk.com';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}