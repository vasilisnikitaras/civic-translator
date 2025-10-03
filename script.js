function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const pair = document.getElementById("languageSelect").value.split("|");
  const output = document.getElementById("translatedOutput");
  const logList = document.getElementById("logList");

  if (!input) {
    output.textContent = "Please enter civic insight to translate.";
    return;
  }

  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=${pair[0]}|${pair[1]}`)
    .then(res => res.json())
    .then(data => {
      const translated = data.responseData.translatedText;
      output.innerHTML = `<strong>Translated (${pair[0]} → ${pair[1]}):</strong><br><em>${translated}</em>`;
      output.classList.add("blooming");
      setTimeout(() => output.classList.remove("blooming"), 800);

      const logItem = document.createElement("li");
      logItem.textContent = `🌱 ${input} → ${translated}`;
      logList.prepend(logItem);
    })
    .catch(() => {
      output.textContent = "Translation failed. Try again later.";
    });
}
