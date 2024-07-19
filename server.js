// express 기반으로 동작할 서버 로직 작성 파일

// express 모듈을 사용하기 위해서 express import
import express, { json } from "express";
import HTTP from "superagent";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// app -> express 모듈을 활용할 수 있는 객체
// app을 통해서 express의 설정들을 조작, 관리
const app = express();

// 미들웨어 추가
app.use(express.static("public")); //public 폴더를 정적 리소스가 제공되는 디렉토리로 명시
app.use(json());

// 사용자가 브라우저에서 http://www.localhost:3000/ 경로로 요청 시 응답할 담당자(Handler)를 구현
app.get("/", (_, response) => {
  console.log("Hello!!");
  response.sendFile("index.html");
});
// button.addEventlistener('click', () => console.log('clicked!'));

app.post("/detect", (request, response) => {
  const url = "https://naveropenapi.apigw.ntruss.com/langs/v1/dect";

  const query = request.body.query;

  // 실제 요청 전송하는 코드
  const data = {
    // query라는 프로퍼티를 가진 data 객체
    query: query, // query 프로퍼티에 const query 변수 값을 할당
  };

  HTTP.post(url)
    .send(data)
    .set("Content-Type", "application/json")
    .set("X-NCP-APIGW-API-KEY-ID", clientId)
    .set("X-NCP-APIGW-API-KEY", process.env.CLIENT_SECRET)
    .end((error, result) => {
      if (result.statusCode === 200) {
        response.send(result.body);
      } else {
        console.log(error);
      }
    });
});

app.post("/translate", (request, response) => {
  // Papago 언어 '번역' API 요청을 처리할 URL 주소
  const url = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";

  HTTP.post(url)
    .send(request.body)
    .set("Content-Type", "application/json")
    .set("X-NCP-APIGW-API-KEY-ID", clientId)
    .set("X-NCP-APIGW-API-KEY", clientSecret)
    .end((error, result) => {
      if (result.statusCode === 200) {
        // const {srcLangType, tarLangType, translatedText} = result.body.message.result;
        // response.send(JSON.stringify(translatedText));
        response.send(result.body);
      } else {
        console.log(error);
      }
    });
});

const port = 3000; // 실행시킬 포트 번호를 port라는 변수에 할당
app.listen(port, () =>
  console.log(`http://127.0.0.1:${port}/ 서버 프로세스가 3000번 포트에서 실행 중입니다.`)
);
