/**
 * source ~ : 번역할 텍스트, 번역할 언어의 타입(ko, ja..)
 * target ~ : 번역 결과 텍스트, 번역될 언어의 타입(ko, ja..)
 */

const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => {
    targetLanguage = event.target.value;
});

// 번역할 텍스트 입력 이벤트

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
        const text = event.target.value;

        getDetectLang(text);
    }, 1500);
    
});

// 번역하기 버튼
// const button = document.getElementById("translate-button");

// button.addEventListener("click", (event) => {
//     const xhr = new XMLHttpRequest();

//     const url = '/translate';

//     const data = JSON.stringify({
//         "source": sourceSelect.value,
//         "target": targetLanguage,
//         "text": sourceTextArea.value
//     })
    
//     xhr.onload = () => {
//         if (xhr.readyState === xhr.DONE && xhr.status === 200) {

//             // 결과 데이터 받음
//             const responseData = xhr.responseText;

//             // 결과 데이터를 JS 객체로 파싱
//             const parsedData = JSON.parse(responseData);

//             // 화면에 출력하는 처리 로직
//             const translatedText = parsedData.translatedText // ko	
//             targetTextArea.textContent = translatedText;
//         }
//     }

//     xhr.open('POST', url);        
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(data);
// })

function getDetectLang(text) {
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

            getTranslateResult();
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
}

function getTranslateResult() {
    const xhr = new XMLHttpRequest();

    const url = '/translate';

    const data = JSON.stringify({
        "source": sourceSelect.value,
        "target": targetLanguage,
        "text": sourceTextArea.value
    })
    
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {

            // 결과 데이터 받음
            const responseData = xhr.responseText;

            // 결과 데이터를 JS 객체로 파싱
            const parsedData = JSON.parse(responseData);

            // 화면에 출력하는 처리 로직
            const translatedText = parsedData // ko	
            targetTextArea.textContent = translatedText;
        }
    }

    xhr.open('POST', url);        
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}