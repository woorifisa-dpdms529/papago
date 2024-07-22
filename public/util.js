// 동일한 국적의 언어로 번역 요청 시 다른 언어로 자동 변경해주는 기능
export const changeLanguage = (sourceLanguage, targetLanguage) => {
  const defaultLanguage = "ko";
  const alternativeLanguage = "en";

  if (sourceLanguage === targetLanguage) {
    if (targetLanguage === defaultLanguage) {
      targetLanguage = alternativeLanguage;
    } else {
      targetLanguage = defaultLanguage;
    }
  }

  return targetLanguage;
};

// fetch에 대한 유틸 함수
const optionsFrom = (method, body, headers) => {
  // options 객체를 만들어서 반환
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      //   headers에 다른 옵션들도 범용적으로 추가하고 싶을 경우?
      ...headers,
    },
    body: JSON.stringify(body),
  };

  return options;
};
