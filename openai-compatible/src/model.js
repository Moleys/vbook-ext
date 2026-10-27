load('prompts.js');
load('llm.js');

// The picker is the provider's real model list, so the ids are always valid for the
// configured Base URL instead of a hardcoded DeepSeek catalogue.
function execute() {
    var apiKeys = llmReadApiKeys();
    var result = llmFetchModels(apiKeys);

    if (!result.models.length) {
        // Never leave the picker empty: translate.js falls back to this same default
        // model when no model is selected, and the description reports the reason.
        return Response.success([
            {
                id: LLM_DEFAULT_MODEL,
                name: LLM_DEFAULT_MODEL,
                description: "Model mặc định (" + result.error + ")",
                isNetworkRequired: true
            }
        ]);
    }

    var host = llmBaseUrl().replace(/^https?:\/\//i, "");
    var models = [];
    for (var i = 0; i < result.models.length; i++) {
        models.push({
            id: result.models[i],
            name: result.models[i],
            description: host,
            isNetworkRequired: true
        });
    }
    return Response.success(models);
}
