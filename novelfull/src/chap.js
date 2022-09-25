function execute(url) {
    var doc = Http.get(url).html();
    const MAX_LENGTH = 1700;
    if (doc){
        var p_tag = doc.select("#chapter-content p");

        let arr_text_output = [];
        let temp_text = "";
        p_tag.forEach(e => 
        {
            let el = e.select("p").text().trim();
        	if(temp_text.length + el.length >= MAX_LENGTH)
        	{
        		arr_text_output.push(temp_text);
                temp_text = "";
        	}
        	else
        	{
        		temp_text = temp_text + el + "\n";
        		
        	}
        });
        if(temp_text.length > 0)
        {
            arr_text_output.push(temp_text);
            temp_text = "";
        }

        let output_text =  "";

        arr_text_output.forEach(phra => 
        {
            let input_value_q = encodeURIComponent(phra);
            let response = fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=" + input_value_q);
            if (response.ok) {
                let t = response.json();
                phra_output = "";
				t[0].forEach(element => phra_output += element[0]);
                output_text += phra_output;
            }
        });

        output_text = output_text.replace(/\n/g, "<br>");
        return Response.success(output_text);
    }   
    return null;
}

