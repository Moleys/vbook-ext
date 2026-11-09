<?php
/**
 * Hoàng Quả (HGhub) — cover proxy (hardened)
 * Ảnh bìa của CDN là AES-128-CBC ciphertext; PHP fetch rồi giải mã trả ra ảnh thường.
 * Dùng: cover.php?u=<urlencoded cover url>
 *
 * Bảo mật:
 * - Chỉ cho fetch host trong whitelist (chống SSRF nội bộ).
 * - Kết quả nhị phân luôn trả với Content-Type ảnh cứng + nosniff (chống XSS).
 * - Lỗi trả text/plain, không reflect input.
 * - Giới hạn kích thước body (4 MB).
 */

const KEY     = 'f5d965df75336270'; // from HGhub src-tauri/src/media.rs
const IV      = '97b60394abc2fbe1';
const MAX_BUF = 4194304;

// Chỉ CDN ảnh của upstream được phép qua proxy này.
$ALLOWED_HOSTS = array('pic.drleao.cn', 'tp1.drleao.cn');

function hgq_fail($code, $msg) {
    http_response_code($code);
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    exit($msg);
}

function hgq_is_image($d) {
    if (strlen($d) < 12) return false;
    if (substr($d, 0, 2) === "\xFF\xD8") return true;                 // JPEG
    if (substr($d, 0, 4) === "\x89PNG") return true;                  // PNG
    if (substr($d, 0, 4) === 'GIF8') return true;                     // GIF
    if (substr($d, 0, 4) === 'RIFF' && substr($d, 8, 4) === 'WEBP') return true; // WebP
    return false;
}

$u = isset($_GET['u']) ? (string)$_GET['u'] : '';
$p = parse_url($u);
$scheme = isset($p['scheme']) ? strtolower($p['scheme']) : '';
$host   = isset($p['host']) ? strtolower($p['host']) : '';
if ($u === '' || ($scheme !== 'https' && $scheme !== 'http')
    || $host === '' || !in_array($host, $ALLOWED_HOSTS, true)) {
    hgq_fail(400, 'bad target');
}

$ch = curl_init($u);
curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS      => 5,
    CURLOPT_REDIR_PROTOCOLS=> CURLPROTO_HTTP | CURLPROTO_HTTPS,
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_REFERER        => 'https://huangguoai.com/',
    CURLOPT_USERAGENT      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    CURLOPT_MAXFILESIZE    => MAX_BUF,
));
$data = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($status !== 200 || !is_string($data) || $data === '' || strlen($data) > MAX_BUF) {
    hgq_fail(502, 'fetch failed');
}

// Plain image → pass through; otherwise AES-128-CBC decrypt (strip PKCS7 tự động).
if (!hgq_is_image($data)) {
    $dec = openssl_decrypt($data, 'AES-128-CBC', KEY, OPENSSL_RAW_DATA, IV);
    if ($dec !== false && hgq_is_image($dec)) {
        $data = $dec;
    }
}

// Không nhận diện được ảnh thật → từ chối, không echo nội dung lạ về client.
if (!hgq_is_image($data)) {
    hgq_fail(502, 'not an image');
}

$type = 'image/jpeg';
if (substr($data, 0, 4) === "\x89PNG") $type = 'image/png';
elseif (substr($data, 0, 4) === 'GIF8') $type = 'image/gif';
elseif (substr($data, 0, 4) === 'RIFF' && substr($data, 8, 4) === 'WEBP') $type = 'image/webp';

header('Content-Type: ' . $type);
header('Cache-Control: public, max-age=86400');
header('X-Content-Type-Options: nosniff');
header('Content-Security-Policy: default-src \'none\'; sandbox');
echo $data;
