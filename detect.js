// import(수입하다) - 설치한 모듈을 server.js 코드에서 사용하기 위해 불러오는 키워드
import HTTP from 'superagent';

// server.js는 Node.js 환경에서 실행시킬(되는) 코드
// Node.js - 브라우저 밖에서 JS를 실행할 수 있는 JS 런타임
// 런타임 - JS를 실행할 수 있는 환경

// console.log('hello');

const clientId = 'edwgz9by0h';
const clientSecret = 'iFetxOwqbqP0xVjwxvNQiRlxa1n4vB1XywWJBqou';

// Papago 언어 감지 API 요청을 처리할 URL 주소
const url = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect';

const query = '하이';

// 실제 요청 전송하는 코드
// superagent - request 모듈을 대체할 다른 라이브러리, https://github.com/ladjs/superagent

const data = { // query라는 프로퍼티를 가진 data 객체
    query: query // query 프로퍼티에 cosnt query 변수의 값을 할당
}

HTTP.post(url)
    .send(data)
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
