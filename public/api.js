// 언어 감지 요청 기능을 수행하는 함수
export const detectLanguage = async (url, text) => {
  let sourceLanguage;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: text }),
  };

  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      sourceLanguage = data.langCode;
    });

  return sourceLanguage;
};

// 언어 번역 요청 기능을 수행하는 함수
export const translateLanguage = async (sourceLanguage, targetLanguage, text, url) => {
  let translatedText;

  const body = {
    source: sourceLanguage,
    target: targetLanguage,
    text: text, // text: text와 같음
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  await fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const result = data.message.result;
      translatedText = result.translatedText;

      // 파파고 화면에 출력하는 부분
      // targetTextArea.value = result.translatedText;
      // targetSelect.value = result.tarLangType;
    });

  return translatedText;
};
