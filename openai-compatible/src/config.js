load('prompts.js');
load('llm.js');

function execute() {
    var config = {};
    // Base URL first: it decides which service the API key below belongs to.
    llmAddProviderConfig(config);
    config[translationConfigKey("api_key")] = {
            title: LLM_NAME + " API keys",
            subtitle: "Danh sách API key; tự chuyển key khi hết quota",
            default: "",
            mode: "list",
            format: "text"
        };
    if (LLM_SUPPORTS_TEMPERATURE) {
        config[translationConfigKey("temperature")] = {
                title: "Temperature",
                subtitle: "0.0 - 2.0; giá trị thấp giúp bản dịch ổn định" + LLM_TEMPERATURE_NOTE,
                default: "0.2",
                mode: "input",
                format: "number"
            };
    }
    config[translationConfigKey("max_output_tokens")] = {
            title: "Số token đầu ra tối đa",
            default: "16384",
            mode: "input",
            format: "number"
        };
    config[translationConfigKey("retry_untranslated_chinese")] = {
            title: "Tự sửa phần tiếng Trung còn sót",
            subtitle: "Gom các cụm tiếng Trung còn sót và gọi " + LLM_NAME + " đúng 1 lần; nếu lần sửa lỗi thì giữ nguyên bản dịch ban đầu",
            default: "true",
            mode: "toggle"
        };
    config[translationConfigKey("translate_table_of_content")] = {
            title: "Dùng " + LLM_NAME + " dịch mục lục",
            subtitle: "Tắt: dùng QT (Trung → Việt), sau đó Baidu; ngôn ngữ Baidu không hỗ trợ sẽ dùng " + LLM_NAME,
            default: "false",
            mode: "toggle"
        };
    config[translationConfigKey("translate_detail")] = {
            title: "Dùng " + LLM_NAME + " dịch chi tiết",
            subtitle: "Tắt: dùng QT (Trung → Việt), sau đó Baidu; ngôn ngữ Baidu không hỗ trợ sẽ dùng " + LLM_NAME,
            default: "false",
            mode: "toggle"
        };
    config[translationConfigKey("translate_discovery")] = {
            title: "Dùng " + LLM_NAME + " dịch khám phá",
            subtitle: "Tắt: dùng QT (Trung → Việt), sau đó Baidu; ngôn ngữ Baidu không hỗ trợ sẽ dùng " + LLM_NAME,
            default: "false",
            mode: "toggle"
        };
    config[translationConfigKey("use_qt_fallback")] = {
            title: "Ưu tiên QT khi dịch bổ sung",
            subtitle: "Chỉ áp dụng cho nội dung tiếng Trung sang tiếng Việt; nếu tắt hoặc QT không dùng được sẽ chuyển sang Baidu",
            default: "true",
            mode: "toggle"
        };
    config[translationConfigKey("system_prompt")] = {
            title: "Prompt hệ thống dịch thuật",
            subtitle: "Có thể sửa toàn bộ hướng dẫn; giữ các biến {source_language}, {target_language}, {style_prompt}, {source_prompt}, {custom_instruction} và {memory_prompt} nếu muốn dùng dữ liệu tương ứng",
            default: translationDefaultSystemPrompt(),
            mode: "input",
            format: "text"
        };
    config.translation_prompts = {
            title: "Prompt phong cách dịch truyện",
            subtitle: "Dùng chung cho mọi truyện; khi thêm prompt mới hãy để trống bookId, nhập key là ID style và value là nội dung prompt",
            mode: "database"
        };
    config[translationConfigKey("use_translation_memory")] = {
            title: "Sử dụng bộ nhớ dịch",
            subtitle: "Áp dụng tên riêng, địa danh, thuật ngữ và quan hệ đã lưu cho truyện hiện tại; dùng cho mọi cặp ngôn ngữ",
            default: "true",
            mode: "toggle"
        };
    config[translationConfigKey("auto_translation_memory")] = {
            title: "Tự động học bộ nhớ dịch",
            subtitle: "Tự lưu thực thể mới khi dịch chương; chỉ hoạt động khi Sử dụng bộ nhớ dịch đang bật",
            default: "true",
            mode: "toggle"
        };
    config[translationConfigKey("memory_analysis_chapters")] = {
            title: "Số chương phân tích",
            subtitle: "Action sẽ đọc từ chương đang đọc và các chương kế sau, tối đa theo số lượng này",
            default: "5",
            mode: "input",
            format: "number"
        };

    initializeTranslationPrompts();

    var bookInfo = null;
    try {
        bookInfo = localBook.getInfo();
    } catch (e) {}

    if (bookInfo && bookInfo.id) {
        var bookPromptKey = translationConfigKey(translationBookPromptConfigKey(String(bookInfo.id)));
        config[bookPromptKey] = {
            title: "Yêu cầu dịch riêng cho truyện",
            subtitle: "Chỉ áp dụng cho truyện hiện tại, ví dụ: giữ cách xưng hô theo phong cách kiếm hiệp",
            default: "",
            mode: "input",
            format: "text"
        };
        config.translation_memory = {
            title: "Bộ nhớ dịch theo truyện",
            subtitle: "Tên riêng, địa danh, thuật ngữ và quan hệ do " + LLM_NAME + " ghi nhớ; có thể thêm, sửa hoặc xóa thủ công",
            mode: "database"
        };
    }

    return Response.success(config);
}

function initializeTranslationPrompts() {
    try {
        var defaults = translationDefaultPrompts();
        var rows = [];
        var total = localDatabase.count(TRANSLATION_PROMPT_SCOPE, TRANSLATION_PROMPT_TABLE);
        if (total === 0) {
            for (var style in defaults) {
                if (!defaults.hasOwnProperty(style)) continue;
                rows.push({ key: style, value: defaults[style] });
            }
        } else {
            var storedPrompts = {};
            var storedRows = localDatabase.list(
                TRANSLATION_PROMPT_SCOPE,
                TRANSLATION_PROMPT_TABLE,
                0,
                total
            );
            for (var rowIndex = 0; storedRows && rowIndex < storedRows.length; rowIndex++) {
                storedPrompts[String(storedRows[rowIndex].key || "")] = String(storedRows[rowIndex].value || "");
            }
            var definitions = translationDefaultStyleDefinitions();
            for (var index = 0; index < definitions.length; index++) {
                var definition = definitions[index];
                var stored = storedPrompts[definition.id];
                if (stored === translationLegacyPrompt(definition.rule) ||
                    (definition.id === "tu-nhien" && stored === undefined)) {
                    rows.push({ key: definition.id, value: definition.rule });
                }
            }
        }
        if (rows.length > 0) localDatabase.upsertAll(TRANSLATION_PROMPT_SCOPE, TRANSLATION_PROMPT_TABLE, rows);
    } catch (e) {}
}
