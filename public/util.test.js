import { test, expect } from "vitest";
import { changeLanguage } from "./util.js";

test("sourceLanguage와 targetLanguage가 모두 ko일 경우 en을 반환한다.", () => {
  const expected = "en";
  const sourceLanguage = "ko";
  const targetLanguage = "ko";
  const result = changeLanguage(sourceLanguage, targetLanguage);

  expect(result).toBe(expected);
});

test("sourceLanguage와 targetLanguage가 모두 en일 경우 ko을 반환한다.", () => {
  const expected = "ko";
  const sourceLanguage = "en";
  const targetLanguage = "en";
  const result = changeLanguage(sourceLanguage, targetLanguage);

  expect(result).toBe(expected);
});
