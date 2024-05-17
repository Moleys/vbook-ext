let BASE_URL = 'https://nettruyenco.vn';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}