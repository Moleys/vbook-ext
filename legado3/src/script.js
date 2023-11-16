  function execute(url) {
  const url1 = 'https://translators.moldich.gq/translate';
  const data = {
    translator: 'baidu',
    translate_from: 'auto',
    translate_to: 'vie',
    q_text: 'hello'
  };

    const response =  fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
            if (response.ok) {
    const json =  response.json();
    const translatedText = json;
    console.log(translatedText);
            }
  }