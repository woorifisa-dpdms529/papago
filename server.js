// express 기반으로 동작할 서버 로직 작성 파일
// express 모듈을 사용하기 위해서 express import
import express, { json } from 'express';
import HTTP from 'superagent';

// app -> express 모듈을 활용할 수 있는 객체
// app을 통해서 express의 설정들을 조작, 관리
const app = express();

// 미들웨어 추가
app.use(express.static('public')) // public 폴더를 정적 리소스가 제공되는 디렉토리로 명시
app.use(json())


// 사용자가 브라우저에서 http://www.localhost:3000/ 경로로 요청 시 응답할 담당자(Handler)를 구현
app.get('/', (_, response) => {
    response.sendFile('index.html');
});

app.post('/detect', (request, response) => {
    // console.log('POST: /detect');
    console.log('body: ', request.body);
    const clientId = 'edwgz9by0h';
    const clientSecret = 'iFetxOwqbqP0xVjwxvNQiRlxa1n4vB1XywWJBqou';

    const url = 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect';

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                response.send(result.body);
            } else {
                console.error(error);
            }
        });
});

// 번역 요청 처리 API
app.post('/translate', (request, response) => {
    const clientId = 'edwgz9by0h';
    const clientSecret = 'iFetxOwqbqP0xVjwxvNQiRlxa1n4vB1XywWJBqou';

    const url = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                response.send(result.body);
            } else {
                console.error(error);
            }
        });
});

const port = 3000; // 실행시킬 포트 번호를 port라는 변수에 할당
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 서버 프로세스가 3000번 포트에서 실행 중입니다.`)
);