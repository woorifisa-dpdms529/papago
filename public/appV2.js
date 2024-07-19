import { detectLanguage, translateLanguage } from "./api.js";

const [sourceSelect, targetSelect] = document.getElementsByTagName("select");
const [sourceTextArea, targetTextArea] = document.getElementsByTagName("textarea");

let targetLanguage = "en";
targetSelect.addEventListener("change", (event) => (targetLanguage = event.target.value));

let timer;
sourceTextArea.addEventListener("input", (event) => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    const text = event.target.value;
    const result = await detectLanguage("/detect", text);
    sourceSelect.value = result;
    const translatedText = await translateLanguage(result, targetSelect.value, text, "/translate");
    targetTextArea.value = translatedText;
  }, 1500);
});
