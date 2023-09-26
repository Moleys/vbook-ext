load('crypto.js');
load('decode.js')

function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let jsonData = response.text();
        
        jsonData = decode_text(jsonData)
        // jsonData = JSON.parse(jsonData)
        // let htm = jsonData.data.content.replace(/\r\n/g,"<br>");
        // Define the keys you want to extract
        const keysToExtract = ['status', 'info', 'id', 'name', 'cname', 'pid', 'nid', 'content', 'hasContent'];

        // Initialize an object to store the extracted values
        const extractedData = {};

        // Iterate through the keys and extract their corresponding values using regex
        keysToExtract.forEach((key) => {
        const pattern = new RegExp(`"${key}":\\s*("(.*?)"|[^,"]*)(?:,|$)`);
        const match = jsonData.match(pattern);
        if (match) {
            extractedData[key] = match[2] || match[1];
        }
        });


        content = extractedData.content;
        if(!content) {
            const regex = /{"status":(\d+),"info":"([^"]*)","data":{"id":(\d+),"name":"([^"]*)","cid":(\d+),"cname":"([^"]*)","pid":(-?\d+),"nid":(\d+),"content":"([^"]*)","hasContent":(\d+)}}/;

            const matches = jsonData.match(regex);
            content = matches[9];

        }
        content = content.replace(/\r\n/g,"<br>").replace(/\f\t\n/g,"<br>")

        return Response.success(content);
    }
    return null;
}