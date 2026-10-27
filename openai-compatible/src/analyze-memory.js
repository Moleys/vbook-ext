load('prompts.js');
load('llm.js');

var ANALYSIS_TABLE = "translation_memory";
var ANALYSIS_MAX_CHAPTERS = 30;
var ANALYSIS_BLOCK_LENGTH = 24000;
var ANALYSIS_MAX_MEMORY_ROWS = 2000;
var ANALYSIS_MAX_CONTEXT_ROWS = 80;
var ANALYSIS_MAX_ENTITIES = 60;

function execute() {
    var info;
    try {
        info = localBook.getInfo();
    } catch (e) {
        return Response.error("Không lấy được thông tin truyện: " + String(e));
    }
    if (!info || !info.id) {
        return Response.error("Action này chỉ dùng được khi mở cài đặt " + LLM_NAME + " Translate từ một truyện");
    }

    var apiKeys = analysisReadApiKeys();
    if (apiKeys.length === 0) {
        return Response.error("Vui lòng thêm " + LLM_NAME + " API key trong cài đặt extension");
    }

    var chapterLimit = analysisReadInteger("memory_analysis_chapters", 5, 1, ANALYSIS_MAX_CHAPTERS);
    var chapters = analysisCollectChapters(info, chapterLimit);
    if (chapters.length === 0) {
        return Response.error("Không tìm thấy nội dung chương gốc đã lưu từ chương đang đọc trở đi");
    }

    var memory = analysisLoadMemory(String(info.id));
    var languages = translationRecalledLanguages(String(info.id));
    var analyzedBlocks = 0;
    var changedRows = 0;

    for (var chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
        var chapter = chapters[chapterIndex];
        var blocks = analysisSplitContent(chapter.text, ANALYSIS_BLOCK_LENGTH);

        for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
            var block = blocks[blockIndex];
            var result = analysisRequest(
                apiKeys,
                chapter,
                block,
                blockIndex,
                blocks.length,
                analysisBuildMemoryContext(memory, block),
                languages
            );
            if (result.error) {
                return Response.error(
                    "Phân tích dừng ở chương " + chapter.position +
                    " (phần " + (blockIndex + 1) + "/" + blocks.length + "): " + result.error
                );
            }

            changedRows += analysisMergeEntities(
                String(info.id),
                memory,
                result.entities,
                block,
                chapter.position,
                translationIsChineseSource(block, languages.from),
                translationIsChineseLanguage(languages.to)
            );
            analyzedBlocks++;
        }
    }

    var message = "Đã phân tích " + chapters.length + " chương (" + analyzedBlocks +
        " phần), thực hiện " + changedRows + " lượt cập nhật bộ nhớ dịch";
    return Response.success(message);
}

function analysisCollectChapters(info, limit) {
    var toc;
    try {
        toc = localBook.getTableOfContent();
    } catch (e) {
        return [];
    }
    if (!Array.isArray(toc) || toc.length === 0) return [];

    toc.sort(function (left, right) {
        return Number(left.position || 0) - Number(right.position || 0);
    });

    var startPosition = parseInt(info.lastReadChapterIndex, 10);
    if (isNaN(startPosition) || startPosition < 0) startPosition = 0;
    var selected = [];
    var seenPositions = {};
    for (var index = 0; index < toc.length && selected.length < limit; index++) {
        var tocItem = toc[index];
        var position = Number(tocItem.position);
        if (isNaN(position) || position < startPosition) continue;
        if (String(tocItem.id || "").indexOf("_section_") >= 0) continue;
        if (seenPositions[position]) continue;

        var content;
        try {
            content = localBook.getChapterContent(position);
        } catch (e2) {
            continue;
        }
        if (!content || !content.content) continue;

        var raw = content.content.raw;
        if (raw === null || raw === undefined) raw = content.content[""];
        if (raw === null || raw === undefined || String(raw).trim() === "") continue;
        var cleaned = analysisCleanContent(String(raw));
        if (!cleaned) continue;

        seenPositions[position] = true;
        selected.push({
            position: position,
            title: analysisChapterTitle(tocItem.title, position),
            text: cleaned
        });
    }
    return selected;
}

function analysisChapterTitle(value, position) {
    if (value && value.raw) return String(value.raw);
    if (value && value[""]) return String(value[""]);
    if (value) {
        for (var key in value) {
            if (value.hasOwnProperty(key) && value[key]) return String(value[key]);
        }
    }
    return "Chương " + position;
}

function analysisCleanContent(value) {
    var text = String(value || "");
    if (/<[a-z][\s\S]*>/i.test(text)) {
        try {
            text = Html.parse(text).text();
        } catch (e) {}
    }
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function analysisSplitContent(text, maxLength) {
    var blocks = [];
    var remaining = String(text || "").trim();
    while (remaining.length > maxLength) {
        var cut = remaining.lastIndexOf("\n\n", maxLength);
        if (cut < Math.floor(maxLength * 0.6)) cut = remaining.lastIndexOf("\n", maxLength);
        if (cut < Math.floor(maxLength * 0.6)) cut = maxLength;
        blocks.push(remaining.substring(0, cut).trim());
        remaining = remaining.substring(cut).trim();
    }
    if (remaining) blocks.push(remaining);
    return blocks;
}

function analysisRequest(apiKeys, chapter, text, blockIndex, blockCount, memoryContext, languages) {
    var chinese = translationIsChineseSource(text, languages.from);
    var sourceName = chinese ? translationLanguageName("zh") : translationLanguageName(languages.from);
    var targetName = translationLanguageName(languages.to);
    var instruction = "Bạn là biên tập viên phân tích truyện để xây dựng bộ nhớ dịch bền vững từ " + sourceName +
        " sang " + targetName + ". " +
        "Chỉ trích xuất thông tin có độ tin cậy cao từ đoạn được cung cấp; không dịch toàn chương và không suy đoán khi thiếu bằng chứng. " +
        "Tên/cách dịch đã có trong BỘ NHỚ HIỆN TẠI là chuẩn bắt buộc, không tự đổi. " +
        "Phân biệt nhân vật trùng họ, gộp biệt danh vào đúng nhân vật, và ghi quan hệ theo góc nhìn của nhân vật đang xét. " +
        "Xưng hô chỉ ghi khi lời thoại hoặc vai vế cho thấy rõ. " +
        "Trả về duy nhất một JSON hợp lệ, không Markdown, dạng: " +
        '{"entities":[{"source":"tên/thuật ngữ đúng như nguyên văn","target":"cách dịch ổn định sang ngôn ngữ đích",' +
        '"kind":"character|place|organization|term","aliases":["biệt danh đúng như nguyên văn"],' +
        '"gender":"male|female|unknown","role":"vai trò ngắn gọn",' +
        '"relationships":[{"with":"tên nguyên văn của người kia","type":"quan hệ",' +
        '"addressTo":"nhân vật này gọi người kia","addressFrom":"người kia gọi nhân vật này"}],' +
        '"note":"ghi chú ngắn cần cho các chương sau"}]}. ' +
        "source và aliases phải là chuỗi xuất hiện nguyên văn trong đoạn hoặc đã có trong bộ nhớ; target viết bằng " + targetName + ". " +
        "Không lấy đại từ, từ thông thường, câu dài, dữ liệu mơ hồ; tối đa " + ANALYSIS_MAX_ENTITIES + " mục.";

    var userText = "CHƯƠNG: " + chapter.title + " (vị trí " + chapter.position +
        ", phần " + (blockIndex + 1) + "/" + blockCount + ")";
    if (memoryContext) userText += "\n\nBỘ NHỚ HIỆN TẠI:\n" + memoryContext;
    userText += "\n\nNỘI DUNG CẦN PHÂN TÍCH:\n" + text;

    var result = llmRequest(
        apiKeys,
        llmBuildBody(LLM_ANALYSIS_MODEL, instruction, userText, { temperature: 0.1, maxTokens: 8192, json: true }),
        120000
    );
    if (result.error) {
        analysisLog(
            "chapter=" + chapter.position +
            " part=" + (blockIndex + 1) + "/" + blockCount +
            " error=" + result.error
        );
        return { entities: [], error: result.error };
    }
    var parsed = analysisParseEntities(result.text);
    if (parsed.error) analysisLog("chapter=" + chapter.position + " parseError=" + parsed.error);
    return parsed;
}

function analysisParseEntities(value) {
    var text = analysisStripFence(value);
    var data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        var objectMatch = text.match(/\{[\s\S]*\}/);
        try {
            data = objectMatch ? JSON.parse(objectMatch[0]) : null;
        } catch (e2) {
            data = null;
        }
    }
    var entities = null;
    if (Array.isArray(data)) {
        entities = data;
    } else if (data && Array.isArray(data.entities)) {
        entities = data.entities;
    } else if (data && Array.isArray(data.items)) {
        entities = data.items;
    } else if (data && data.result && Array.isArray(data.result.entities)) {
        entities = data.result.entities;
    } else if (data && data.data && Array.isArray(data.data.entities)) {
        entities = data.data.entities;
    }
    if (!entities && data && typeof data === "object") {
        var discovered = [];
        for (var key in data) {
            if (!data.hasOwnProperty(key) || !Array.isArray(data[key])) continue;
            for (var itemIndex = 0; itemIndex < data[key].length; itemIndex++) {
                var item = data[key][itemIndex];
                if (item && (item.source || item.target)) discovered.push(item);
            }
        }
        if (discovered.length > 0) entities = discovered;
        else return { entities: [], error: "" };
    }
    if (!entities) return { entities: [], error: LLM_NAME + " trả về JSON không thể phân tích" };
    return { entities: entities.slice(0, ANALYSIS_MAX_ENTITIES), error: "" };
}

function analysisLoadMemory(bookId) {
    var memory = {};
    try {
        var total = localDatabase.count(bookId, ANALYSIS_TABLE);
        var rows = localDatabase.list(bookId, ANALYSIS_TABLE, 0, Math.min(total, ANALYSIS_MAX_MEMORY_ROWS));
        for (var index = 0; rows && index < rows.length; index++) {
            var key = analysisOneLine(rows[index].key);
            if (!key) continue;
            memory[key] = analysisParseMemoryValue(rows[index].value);
        }
    } catch (e) {}
    return memory;
}

function analysisParseMemoryValue(value) {
    var raw = String(value || "");
    try {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.target) return parsed;
    } catch (e) {}
    return { target: raw, kind: "term", note: "", aliases: [], relationships: [], chapters: [] };
}

function analysisBuildMemoryContext(memory, text) {
    var lines = [];
    for (var source in memory) {
        if (!memory.hasOwnProperty(source)) continue;
        var data = memory[source] || {};
        var aliases = Array.isArray(data.aliases) ? data.aliases : [];
        var matched = translationTermInText(text, source);
        for (var aliasIndex = 0; !matched && aliasIndex < aliases.length; aliasIndex++) {
            if (translationTermInText(text, String(aliases[aliasIndex]))) matched = true;
        }
        if (!matched) continue;

        var line = "- " + source;
        if (aliases.length > 0) line += " (còn gọi: " + aliases.join(", ") + ")";
        line += " => " + String(data.target || "") + " [" + String(data.kind || "term") + "]";
        var details = [];
        if (data.gender && data.gender !== "unknown") details.push("giới tính " + data.gender);
        if (data.role) details.push(String(data.role));
        if (data.note) details.push(String(data.note));
        if (data.autoNote) details.push(String(data.autoNote));
        if (Array.isArray(data.relationships)) {
            for (var relationshipIndex = 0; relationshipIndex < data.relationships.length; relationshipIndex++) {
                var relationship = data.relationships[relationshipIndex];
                if (!relationship || !relationship.with || !relationship.type) continue;
                var relationshipText = relationship.with + ": " + relationship.type;
                if (relationship.addressTo) relationshipText += ", gọi " + relationship.addressTo;
                if (relationship.addressFrom) relationshipText += ", được gọi " + relationship.addressFrom;
                details.push(relationshipText);
            }
        }
        if (details.length > 0) line += " — " + details.join("; ");
        lines.push(line);
        if (lines.length >= ANALYSIS_MAX_CONTEXT_ROWS) break;
    }
    return lines.join("\n");
}

function analysisMergeEntities(bookId, memory, entities, text, position, chinese, chineseTarget) {
    if (!Array.isArray(entities) || entities.length === 0) return 0;
    var records = [];
    var touched = {};

    for (var index = 0; index < entities.length; index++) {
        var entity = entities[index];
        if (!entity) continue;
        var source = analysisOneLine(entity.source);
        var target = analysisOneLine(entity.target);
        if (!source || !target) continue;
        // A Chinese "translation" makes the model keep the source text; see translate.js.
        if (analysisContainsChinese(target) && !chineseTarget) continue;

        var canonical = analysisFindCanonical(memory, source);
        if (!canonical && !translationIsMemoryTerm(source, target, text, chinese)) continue;
        if (!canonical) canonical = source;
        if (touched[canonical]) continue;

        var old = memory[canonical] || {};
        var merged = {};
        merged.target = analysisOneLine(old.target) || target;
        merged.kind = analysisNormalizeKind(old.kind || entity.kind);
        merged.note = analysisOneLine(old.note || "");
        merged.aliases = analysisMergeAliases(old.aliases, entity.aliases, canonical, text, chinese);
        if (source !== canonical && merged.aliases.indexOf(source) < 0) merged.aliases.push(source);
        merged.gender = analysisMergeSingle(old.gender, entity.gender, "unknown");
        merged.role = analysisMergeText(old.role, entity.role, 400);
        merged.relationships = analysisMergeRelationships(old.relationships, entity.relationships);
        merged.autoNote = analysisMergeText(old.autoNote, entity.note, 500);
        merged.chapters = analysisMergeChapters(old.chapters, position);
        merged.updatedAt = Date.now();

        memory[canonical] = merged;
        records.push({ key: canonical, value: JSON.stringify(merged) });
        touched[canonical] = true;
    }

    if (records.length === 0) return 0;
    try {
        return Number(localDatabase.upsertAll(bookId, ANALYSIS_TABLE, records)) || 0;
    } catch (e) {
        return 0;
    }
}

function analysisFindCanonical(memory, source) {
    if (memory[source]) return source;
    for (var key in memory) {
        if (!memory.hasOwnProperty(key)) continue;
        var aliases = memory[key] && Array.isArray(memory[key].aliases) ? memory[key].aliases : [];
        for (var index = 0; index < aliases.length; index++) {
            if (String(aliases[index]) === source) return key;
        }
    }
    return "";
}

function analysisMergeAliases(oldAliases, newAliases, source, text, chinese) {
    var result = [];
    var lists = [Array.isArray(oldAliases) ? oldAliases : [], Array.isArray(newAliases) ? newAliases : []];
    for (var listIndex = 0; listIndex < lists.length; listIndex++) {
        for (var index = 0; index < lists[listIndex].length; index++) {
            var alias = analysisOneLine(lists[listIndex][index]);
            if (!alias || alias === source) continue;
            if (chinese && !analysisContainsChinese(alias)) continue;
            if (listIndex === 1 && !translationTermInText(text, alias)) continue;
            if (result.indexOf(alias) < 0) result.push(alias);
            if (result.length >= 20) return result;
        }
    }
    return result;
}

function analysisMergeRelationships(oldRelationships, newRelationships) {
    var result = [];
    var seen = {};
    var lists = [
        Array.isArray(oldRelationships) ? oldRelationships : [],
        Array.isArray(newRelationships) ? newRelationships : []
    ];
    for (var listIndex = 0; listIndex < lists.length; listIndex++) {
        for (var index = 0; index < lists[listIndex].length; index++) {
            var item = lists[listIndex][index];
            if (!item) continue;
            var withName = analysisOneLine(item.with);
            var type = analysisOneLine(item.type);
            if (!withName || !type) continue;
            var key = withName.toLowerCase() + "|" + type.toLowerCase();
            if (seen[key]) continue;
            seen[key] = true;
            result.push({
                with: withName,
                type: type,
                addressTo: analysisOneLine(item.addressTo || ""),
                addressFrom: analysisOneLine(item.addressFrom || "")
            });
            if (result.length >= 20) return result;
        }
    }
    return result;
}

function analysisMergeChapters(oldChapters, position) {
    var result = Array.isArray(oldChapters) ? oldChapters.slice(0) : [];
    if (result.indexOf(position) < 0) result.push(position);
    if (result.length > 30) result = result.slice(result.length - 30);
    return result;
}

function analysisMergeSingle(oldValue, newValue, fallback) {
    var oldText = analysisOneLine(oldValue || "");
    var newText = analysisOneLine(newValue || "");
    if (oldText && oldText !== fallback) return oldText;
    return newText || oldText || fallback;
}

function analysisMergeText(oldValue, newValue, maxLength) {
    var oldText = analysisOneLine(oldValue || "");
    var newText = analysisOneLine(newValue || "");
    if (!oldText) return newText.substring(0, maxLength);
    if (!newText || oldText.indexOf(newText) >= 0) return oldText.substring(0, maxLength);
    return (oldText + "; " + newText).substring(0, maxLength);
}

function analysisNormalizeKind(value) {
    var kind = String(value || "term").toLowerCase();
    if (kind === "character" || kind === "place" || kind === "organization" || kind === "term") return kind;
    return "term";
}

function analysisReadApiKeys() {
    var raw = analysisReadConfig("api_key", "").trim();
    if (!raw) return [];
    var values;
    try {
        values = JSON.parse(raw);
    } catch (e) {
        values = raw.split("\n");
    }
    if (!Array.isArray(values)) values = [String(values)];
    var keys = [];
    for (var index = 0; index < values.length; index++) {
        var key = String(values[index] || "").trim();
        if (key && keys.indexOf(key) < 0) keys.push(key);
    }
    return keys;
}

function analysisReadConfig(key, fallback) {
    var value = localConfig.getItem(translationConfigKey(key));
    return value === null || value === undefined || value === "" ? fallback : String(value);
}

function analysisReadInteger(key, fallback, min, max) {
    var value = parseInt(analysisReadConfig(key, String(fallback)), 10);
    if (isNaN(value)) value = fallback;
    if (value < min) value = min;
    if (value > max) value = max;
    return value;
}



function analysisStripFence(value) {
    var text = String(value || "").trim();
    var match = text.match(/^```[^\n]*\n([\s\S]*?)\n```$/);
    return match ? match[1] : text;
}

function analysisContainsChinese(value) {
    return /[\u3400-\u9fff\uf900-\ufaff]/.test(String(value || ""));
}

function analysisOneLine(value) {
    return String(value || "").replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function analysisLog(message) {
    console.log("[" + LLM_NAME + " Memory Analysis] " + String(message));
}
