load('prompts.js');

function execute() {
    var definitions = translationDefaultStyleDefinitions();
    var styles = [];
    for (var definitionIndex = 0; definitionIndex < definitions.length; definitionIndex++) {
        styles.push({
            id: definitions[definitionIndex].id,
            name: definitions[definitionIndex].name,
            description: definitions[definitionIndex].description
        });
    }

    var known = {};
    for (var i = 0; i < styles.length; i++) known[styles[i].id] = true;

    try {
        var total = localDatabase.count(TRANSLATION_PROMPT_SCOPE, TRANSLATION_PROMPT_TABLE);
        var rows = localDatabase.list(TRANSLATION_PROMPT_SCOPE, TRANSLATION_PROMPT_TABLE, 0, Math.min(total, 200));
        for (var rowIndex = 0; rows && rowIndex < rows.length; rowIndex++) {
            var id = String(rows[rowIndex].key || "").trim();
            if (!id || known[id]) continue;

            var prompt = String(rows[rowIndex].value || "").replace(/\s+/g, " ").trim();
            var description = prompt ? "Tùy chỉnh: " + prompt : "Prompt tùy chỉnh";
            if (description.length > 140) description = description.substring(0, 137) + "...";

            styles.push({
                id: id,
                name: id,
                description: description
            });
            known[id] = true;
        }
    } catch (e) {}

    return Response.success(styles);
}
