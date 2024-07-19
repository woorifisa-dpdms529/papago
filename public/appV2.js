const [sourceSelect, targetSelect] = document.getElementsByTagName("select");
const [sourceTextArea, targetTextArea] = document.getElementsByTagName("textarea");

let targetLanguage = "en";
targetSelect.addEventListener("change", (event) => (targetLanguage = event.target.value));

let timer;
sourceTextArea.addEventListener("input", (event) => {
  if (timer) clearTimeout(timer);

  timer = setTimeout(async () => {
    const text = event.target.value;
    const result = await detectLanguage(text);
    translateLanguage(result, text);
  }, 1500);
});
