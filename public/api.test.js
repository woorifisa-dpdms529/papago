// 테스트코드 작성 파일 규칙 -> { 테스트할 파일명.test.js }

import { expect, test } from "vitest"; // vitest 라이브러리에서 test 함수 import
import { detectLanguage, translateLanguage } from "./api";

// test('테스트 케이스 시나리오를 작성, 보통 문장으로 작성', 실행할 테스트 코드);
// 테스트는 기본적으로 가설에 대한 검증
test('"안녕"이라고 작성할 경우, 한국어로 감지된다.', async () => {
  // 내가 기대하는 결과값(expected) 데이터를 준비
  const expected = "ko";
  const text = "안녕";
  const url = "http://localhost:3000/detect";

  const result = await detectLanguage(url, text);

  expect(result).toBe(expected);
});

test("'hello'라고 작성할 경우 영어(en)로 감지된다.", async () => {
  const expected = "en";
  const text = "hello";
  const url = "http://localhost:3000/detect";

  const result = await detectLanguage(url, text);

  expect(result).toBe(expected);
});

test("'안녕'을 번역할 경우, 'Hi.'로 번역된다.", async () => {
  const expected = "Hi.";
  const sourceLanguage = "ko";
  const targetLanguage = "en";
  const text = "안녕";
  const url = "http://localhost:3000/translate";

  const result = await translateLanguage(sourceLanguage, targetLanguage, text, url);

  expect(result).toBe(expected);
});
