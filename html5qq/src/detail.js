function execute(url) {
    url = String(url || "");
    var bookidRegex = /[?&](?:bookid|bookId|resourceId)=(\d+)/;
    var match = url.match(bookidRegex);
    if (!match) return Response.error("Cannot detect book id");
    var bookid = match[1];
    var url2 = buildDetailUrl(url, bookid);
    var response = fetch(url2, {
        "headers":
        {
        "user-agent":"Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36",
        "Referer":"https://bookshelf.html5.qq.com/qbread"
        }
    });
    if (response.ok) {
        var doc = response.json();
        var book = getBookInfo(doc);
        if (!book) return Response.error("Cannot parse book info");
        var resourceId = cleanText(book.resourceID || book.resourceId || book.bookid || bookid);
        var summary = cleanDescription(book.summary || book.intro || book.abstract);
        var tags = splitTags(book.tag);
        var detailLines = [];
        addDetail(detailLines, "作者", book.author);
        addDetail(detailLines, "分类", joinText([book.subject, book.subtype], "·"));
        addDetail(detailLines, "标签", tags.join("、"));
        addDetail(detailLines, "字数", formatWordCount(book.contentsize || book.wordCount || book.totalWords));
        addDetail(detailLines, "最新章节", cleanChapterName(book.lastSerialname || book.lastChapter || book.updateInfo));
        addDetail(detailLines, "评分", book.userscore ? cleanText(book.userscore) + "分" : "");
        addDetail(detailLines, "状态", isFinished(book) ? "已完结" : "连载中");
        addDetail(detailLines, "更新时间", formatUpdateTime(book.lastUpdatetime || book.updateTime || book.updateTimeStamp));

        return Response.success({
            name: cleanText(book.resourceName || book.title || book.name),
            cover: cleanText(book.picurl || book.coverUrl || book.cover_url),
            author: cleanText(book.author),
            description: summary.replace(/\n/g, "<br>"),
            detail: detailLines.join("<br>"),
            url: url2,
            link: url2,
            tocUrl: "https://novel.html5.qq.com/qbread/api/book/all-chapter?bookId=" + resourceId,
            kind: joinText([book.subject, book.subtype], "·"),
            lastChapter: cleanChapterName(book.lastSerialname || book.lastChapter || book.updateInfo),
            wordCount: formatWordCount(book.contentsize || book.wordCount || book.totalWords),
            genres: buildGenres(book, tags),
            ongoing: !isFinished(book),
            host: "https://bookshelf.html5.qq.com"
        });
    }
    return null;
}

function buildDetailUrl(url, bookid) {
    if (url.indexOf("/api/novel/bookInfo") !== -1 || url.indexOf("resourceId=") !== -1) {
        return "https://novel.html5.qq.com/qbread/api/novel/bookInfo?resourceId=" + bookid;
    }
    return "https://bookshelf.html5.qq.com/qbread/api/novel/intro-info?bookid=" + bookid;
}

function getBookInfo(doc) {
    if (!doc) return null;
    if (doc.data && doc.data.bookInfo) return doc.data.bookInfo;
    if (doc.bookInfo) return doc.bookInfo;
    if (doc.resourceName || doc.title || doc.author) return doc;
    if (doc.data && (doc.data.resourceName || doc.data.title || doc.data.author)) return doc.data;
    return null;
}

function cleanText(text) {
    if (text === undefined || text === null) return "";
    return String(text).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
}

function cleanDescription(text) {
    if (text === undefined || text === null) return "";
    return String(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/^\s+|\s+$/g, "");
}

function joinText(items, separator) {
    var data = [];
    for (var i = 0; i < items.length; i++) {
        var value = cleanText(items[i]);
        if (value) data.push(value);
    }
    return data.join(separator);
}

function addDetail(lines, label, value) {
    value = cleanText(value);
    if (value) lines.push(label + "： " + value);
}

function splitTags(value) {
    value = cleanText(value);
    if (!value) return [];
    var parts = value.split("|");
    var tags = [];
    var seen = {};
    for (var i = 0; i < parts.length; i++) {
        var tag = cleanText(parts[i]);
        if (tag && !seen[tag]) {
            seen[tag] = true;
            tags.push(tag);
        }
    }
    return tags;
}

function buildGenres(book, tags) {
    var data = [];
    var groupId = getRankGroupId(book);
    addGenre(data, cleanText(book.subject), "groupid=" + groupId + "&start={{page}}&count=20&sort=0&sub=");
    addGenre(data, cleanText(book.subtype), "groupid=" + groupId + "&start={{page}}&count=20&sort=0&sub=" + encodeURIComponent(cleanText(book.subtype)));
    for (var i = 0; i < tags.length; i++) {
        addGenre(data, tags[i], "groupid=" + groupId + "&tag=" + encodeURIComponent(tags[i]) + "&start={{page}}&count=20");
    }
    return data;
}

function addGenre(data, title, input) {
    title = cleanText(title);
    if (!title || !input) return;
    for (var i = 0; i < data.length; i++) {
        if (data[i].title === title) return;
    }
    data.push({
        title: title,
        input: input,
        script: "gen.js"
    });
}

function getRankGroupId(book) {
    var subject = cleanText(book.subject);
    var map = {
        "玄幻": "1501",
        "奇幻": "1502",
        "武侠": "1503",
        "仙侠": "1504",
        "都市": "1505",
        "历史": "1506",
        "军事": "1507",
        "悬疑": "1508",
        "科幻": "1509",
        "游戏": "1510",
        "体育": "1511",
        "轻小说": "1512",
        "短篇": "1515",
        "现实": "1499",
        "现代言情": "1524",
        "古代言情": "1523",
        "仙侠奇缘": "1517",
        "玄幻言情": "1516",
        "浪漫青春": "1522",
        "科幻空间": "1519",
        "游戏竞技": "1520",
        "纯爱": "1707"
    };
    if (map[subject]) return map[subject];
    return cleanText(book.groupid || book.groupID || book.categoryId2 || book.subjectid || "1505");
}

function cleanChapterName(text) {
    return cleanText(text).replace(/正文卷\.|正文\.|VIP卷\.|默认卷\.|卷_|VIP章节\.|免费章节\.|章节目录\.|最新章节\./g, "");
}

function isFinished(book) {
    var value = book.isfinish;
    if (value === true) return true;
    value = cleanText(value).toLowerCase();
    return value === "true" || value === "1" || value === "已完结" || value === "完结";
}

function formatWordCount(value) {
    value = cleanText(value);
    if (!value) return "";
    var num = parseInt(value, 10);
    if (isNaN(num)) return value;
    if (num >= 10000) return Math.round(num / 1000) / 10 + "万字";
    return String(num) + "字";
}

function formatUpdateTime(value) {
    value = cleanText(value);
    if (!value) return "";
    var num = parseInt(value, 10);
    if (isNaN(num)) return value;
    if (num < 10000000000) num = num * 1000;
    var date = new Date(num);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + "-" + pad2(month) + "-" + pad2(day);
}

function pad2(value) {
    value = String(value);
    return value.length < 2 ? "0" + value : value;
}
