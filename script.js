function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const lang = document.getElementById("language").value;
  const output = document.getElementById("translatedOutput");
  const logList = document.getElementById("logList");

  if (!input) {
    output.textContent = "Please enter civic insight to translate.";
    return;
  }

  fetch("https://corsproxy.io/?https://translate.argosopentech.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: input, source: "auto", target: lang, format: "text" })
  })
  .then(res => res.json())
  .then(data => {
    output.innerHTML = `<strong>Translated (${lang}):</strong><br><em>${data.translatedText}</em>`;
    output.classList.add("blooming");
    setTimeout(() => output.classList.remove("blooming"), 800);

    const logItem = document.createElement("li");
    logItem.textContent = `🌱 ${input} → ${data.translatedText}`;
    logList.prepend(logItem);
  })
  .catch(() => {
    output.textContent = "Translation failed. Try fallback or check connection.";
  });
}

function translateWithMyMemory() {
  const input = document.getElementById("fallbackInput").value.trim();
  const pair = document.getElementById("languageSelect").value.split("|");
  const output = document.getElementById("translatedOutput");

  if (!input) {
    output.textContent = "Please enter fallback insight.";
    return;
  }

  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=${pair[0]}|${pair[1]}`)
    .then(res => res.json())
    .then(data => {
      const translated = data.responseData.translatedText;
      output.innerHTML = `<strong>Fallback (${pair[0]} → ${pair[1]}):</strong><br><em>${translated}</em>`;
      output.classList.add("blooming");
      setTimeout(() => output.classList.remove("blooming"), 800);
    })
    .catch(() => {
      output.textContent = "Fallback failed. Try again later.";
    });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

