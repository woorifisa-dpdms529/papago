/**
 * source ~ : 번역할 텍스트, 번역할 언어의 타입(ko, ja..)
 * target ~ : 번역 결과 텍스트, 번역될 언어의 타입(ko, ja..)
 */
const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

// 번역할 텍스트 입력 이벤트

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
        const text = event.target.value;
        const xhr = new XMLHttpRequest(); // XMLHttpRequest API 불러오기
        
        // Node.js 서버로부터 응답이 완료되었을 때 동작시킬 이벤트
        xhr.onload = () => {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                // 결과 데이터 받음
                const responseData = xhr.responseText;

                // 결과 데이터를 JS 객체로 파싱
                const parsedData = JSON.parse(responseData);

                // 화면에 출력하는 처리 로직
                const detectedLang = parsedData.langCode // ko
                sourceSelect.value = detectedLang;

                // 언어 번역 요청 코드 작성
                // -> 비동기 요청(언어 감지)에 대한 처리 결과값인 detectedLang을 가져다가, 언어 번역 요청에 활용해야함
                const xhr2 = new XMLHttpRequest();

                const url = '/translate';

                const data = JSON.stringify({
                    source: detectedLang,
                    target: targetLanguage,
                    text, // text: text와 같다.
                });

                xhr2.open('POST', url);
                xhr2.onload = () => {
                    if (xhr2.readyState === xhr2.DONE && xhr2.status === 200) {
                        const responseData = JSON.parse(xhr2.response); // {translatedText: 'hello', srcLanguage:'ko', tarLanguage: 'en'}
                        console.log(responseData);

                        sourceLanguage = responseData.message.result.srcLangType;
                        targetTextArea.value = responseData.message.result.translatedText;
                        
                        // 번역된 텍스트 결과값을 가지고, 다른 요청을 처리해야 한다면???
                        
                    }
                }

                xhr2.setRequestHeader('Content-Type', 'application/json');
                xhr2.send(data);
            }
        }
        const url = '/detect'; // Node.js의 언어 감지 API URL

        const data = {
            query: text
        };

        // 문자열 포맷으로 직렬화된 데이터
        const strigifiedData = JSON.stringify(data);

        xhr.open('POST', url);        
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(strigifiedData);

        
    }, 1500);
    
});
