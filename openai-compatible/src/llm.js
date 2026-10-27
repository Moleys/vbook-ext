// Provider identity: every request here uses the OpenAI chat-completions shape, so
// the extension works with any compatible service — DeepSeek by default, Gemini's
// /v1beta/openai layer, OpenAI, or a local gateway.
var LLM_NAME = "OpenAI-compatible";
var LLM_DEFAULT_BASE_URL = "https://api.deepseek.com/v1";
var LLM_DEFAULT_MODEL = "deepseek-flash";
var LLM_ANALYSIS_MODEL = LLM_DEFAULT_MODEL;
var LLM_SUPPORTS_TEMPERATURE = true;
var LLM_TEMPERATURE_NOTE = "; bị bỏ qua với model suy luận/thinking";
var LLM_ROTATE_KEY_STATUSES = { 401: true, 402: true, 403: true, 429: true };

function llmAddProviderConfig(config) {
    config[llmConfigKey("base_url")] = {
            title: "Base URL",
            subtitle: "API tương thích OpenAI; tự thêm /v1 nếu thiếu. Ví dụ: https://api.deepseek.com/v1 hoặc https://generativelanguage.googleapis.com/v1beta/openai/",
            default: LLM_DEFAULT_BASE_URL,
            mode: "input",
            format: "text"
        };
}

// Settings are namespaced by the app's config generation (prompts.js). config.js and
// translate.js load prompts.js before this file, so reuse its helper when it exists.
function llmConfigKey(key) {
    if (typeof translationConfigKey === "function") return translationConfigKey(key);
    return key;
}

function llmReadSetting(key, fallback) {
    var value = null;
    try {
        value = localConfig.getItem(llmConfigKey(key));
    } catch (e) {}
    if (value === null || value === undefined || String(value).trim() === "") return fallback;
    return String(value).trim();
}

function llmReadApiKeys() {
    var raw = llmReadSetting("api_key", "");
    if (!raw) return [];
    var values;
    try {
        values = JSON.parse(raw);
    } catch (e) {
        values = raw.split("\n");
    }
    if (!Array.isArray(values)) values = [String(values)];

    var keys = [];
    for (var i = 0; i < values.length; i++) {
        var key = String(values[i] || "").trim();
        if (key && keys.indexOf(key) === -1) keys.push(key);
    }
    return keys;
}

// Strip trailing slashes and make sure the base carries its version segment. A base
// that already ends in /v1 is complete; so is one ending in /openai, because Google
// publishes its compatibility layer at .../v1beta/openai (no /v1 after it).
function llmNormalizeBaseUrl(url) {
    var value = String(url === undefined || url === null ? "" : url)
        .replace(/\s+/g, "")
        .replace(/\/+$/, "");
    if (!value) return LLM_DEFAULT_BASE_URL;

    // Pasting the full chat path is a common mistake; the base stops before it.
    value = value.replace(/\/chat\/completions$/i, "").replace(/\/+$/, "");
    if (!value) return LLM_DEFAULT_BASE_URL;

    if (/\/openai$/i.test(value)) return value;
    // Canonicalise the version segment: "…/V1" is meant as "…/v1".
    var versioned = value.match(/^(.*)\/v1$/i);
    if (versioned) return versioned[1] + "/v1";
    return value + "/v1";
}

function llmBaseUrl() {
    var stored = llmReadSetting("base_url", LLM_DEFAULT_BASE_URL);
    return llmNormalizeBaseUrl(stored);
}

function llmChatEndpoint() {
    return llmBaseUrl() + "/chat/completions";
}

// DeepSeek accepts an explicit thinking switch; other compatible services reject the
// unknown field, so it is only sent to DeepSeek.
function llmUsesThinkingSwitch() {
    return /(^|\.)deepseek\.com(:|\/|$)/i.test(llmBaseUrl());
}

function llmModelIsReasoning(model) {
    return /(reasoner|reasoning|thinking|(^|[-_/])o[134](-|$))/i.test(String(model || ""));
}

// Kept for compatibility with selections saved by older builds, where "thinking" was
// a separate picker entry for the same API model.
function llmNormalizeModel(model) {
    var selected = String(model || "").trim().replace(/-thinking$/i, "");
    return selected || LLM_DEFAULT_MODEL;
}

// options: { temperature, maxTokens, json }
function llmBuildBody(model, systemPrompt, userText, options) {
    options = options || {};
    var selected = String(model || "").trim();
    var apiModel = llmNormalizeModel(selected);
    // "-thinking" is no longer a picker entry, but a selection saved by an older build
    // still means the same API model with thinking enabled.
    var thinking = /-thinking$/i.test(selected);
    var body = {
        model: apiModel,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userText }
        ],
        max_tokens: options.maxTokens || 4096,
        stream: false
    };
    if (llmUsesThinkingSwitch()) body.thinking = { type: thinking ? "enabled" : "disabled" };
    if (!thinking && !llmModelIsReasoning(apiModel) && options.temperature !== undefined) {
        body.temperature = options.temperature;
    }
    if (options.json) body.response_format = { type: "json_object" };
    return body;
}

// Tries each key in order; rotates on auth/quota errors. Returns { text, finishReason, error, keyIndex }.
function llmRequest(apiKeys, body, timeout) {
    var payload = JSON.stringify(body);
    var endpoint = llmChatEndpoint();
    var lastError = "";
    for (var keyIndex = 0; keyIndex < apiKeys.length; keyIndex++) {
        var response;
        try {
            response = fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiKeys[keyIndex]
                },
                body: payload,
                timeout: timeout || 120000
            });
        } catch (e) {
            lastError = LLM_NAME + ": " + String(e);
            continue;
        }

        if (!response.ok) {
            lastError = llmApiError(response);
            if (LLM_ROTATE_KEY_STATUSES[response.status]) continue;
            return { text: "", finishReason: "", error: lastError, keyIndex: keyIndex };
        }

        var data;
        try {
            data = JSON.parse(response.text());
        } catch (e2) {
            return { text: "", finishReason: "", error: LLM_NAME + " trả về dữ liệu không hợp lệ", keyIndex: keyIndex };
        }

        var choice = data && data.choices && data.choices.length > 0 ? data.choices[0] : null;
        var message = choice && choice.message ? choice.message : null;
        return {
            text: message && message.content ? String(message.content) : "",
            finishReason: choice && choice.finish_reason ? String(choice.finish_reason) : "",
            error: "",
            keyIndex: keyIndex
        };
    }
    return { text: "", finishReason: "", error: lastError || "Không có " + LLM_NAME + " API key khả dụng", keyIndex: -1 };
}

function llmApiError(response) {
    var message = "";
    try {
        var data = JSON.parse(response.text());
        if (data && data.error && data.error.message) message = String(data.error.message);
    } catch (e) {}
    return LLM_NAME + " HTTP " + response.status + (message ? ": " + message : "");
}

// Reads the provider's model list (GET <base>/models). Returns { models, error }.
function llmFetchModels(apiKeys) {
    if (!apiKeys || !apiKeys.length) return { models: [], error: "chưa có API key" };

    var endpoint = llmBaseUrl() + "/models";
    var lastError = "";
    for (var keyIndex = 0; keyIndex < apiKeys.length; keyIndex++) {
        var response;
        try {
            response = fetch(endpoint, {
                method: "GET",
                headers: { "Authorization": "Bearer " + apiKeys[keyIndex] },
                timeout: 30000
            });
        } catch (e) {
            lastError = String(e);
            continue;
        }

        if (!response.ok) {
            lastError = llmApiError(response);
            if (LLM_ROTATE_KEY_STATUSES[response.status]) continue;
            return { models: [], error: lastError };
        }

        var data;
        try {
            data = JSON.parse(response.text());
        } catch (e2) {
            return { models: [], error: "API trả về dữ liệu model không hợp lệ" };
        }

        var rows = data && data.data ? data.data : [];
        var ids = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i] || {};
            // Gemini's compatibility layer reports ids as "models/<name>" but expects
            // the bare name in a chat request; other services never use that prefix.
            var id = String(row.id || row.name || "").trim().replace(/^models\//, "");
            if (id && ids.indexOf(id) === -1) ids.push(id);
        }
        ids.sort();
        return { models: ids, error: ids.length ? "" : "API không trả về model nào" };
    }
    return { models: [], error: lastError || "Không đọc được danh sách model" };
}
