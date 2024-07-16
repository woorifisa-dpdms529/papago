
import HTTP from 'superagent';

const clientId = 'edwgz9by0h';
const clientSecret = 'iFetxOwqbqP0xVjwxvNQiRlxa1n4vB1XywWJBqou';

// Papago 언어 '번역' API 요청을 처리할 URL 주소
const url = '??';

// 번역할 텍스트(변수 이름 등은 API 명세 참고)
const query = '하이';

// send()에 보낼 데이터 포맷 작성도 명세 참고

HTTP.post(url)
    .send(???)
    .set('Content-Type', 'application/json')
    .set('X-NCP-APIGW-API-KEY-ID', clientId)
    .set('X-NCP-APIGW-API-KEY', clientSecret)
    .end((error, result) => {
        if (result.statusCode === 200) {
            console.log(result.body);
        } else {
            console.error(error);
        }
    });
