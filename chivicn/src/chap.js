function execute(url) {
    url = url.split("/")
    let total_parts = url.pop();
    total_parts =  parseInt(total_parts, 10) + 1;
    url = url.join("/")
    // console.log(url)
    // console.log(total_parts)

    let cvdata = [];
    for(let i = 0; i < total_parts; i++){
        let response_parts = fetch(url+"/"+i);
        console.log(url+"/"+i)
        if (response_parts.ok) {
            let data_i = response_parts.json()
            let cvzh_i = data_i.cvdata;
            cvzh_i = cvzh_i.split("$\t$\t$\n")[2]
            // cvzh_i = cvzh_i.split(/\n/g,"<br>")
            cvzh_i = cvzh_i.split("\n")

            let cvdata_i = data_i.cvdata;
            if(checkParts(cvdata_i,total_parts)===true){
                cvzh_i.shift();
            }
            Array.prototype.push.apply(cvdata, cvzh_i);
        }
    }
    if(cvdata){
        let htm = cvdata.join("<br>");
        return Response.success(htm);
    }
    return null;
}

function checkParts(content, total_parts) {
    let heading = content.split("\n")[0];
                console.log(heading)

    if(heading.includes("/"+total_parts+"]")){
        return true
    }
    return false;
}