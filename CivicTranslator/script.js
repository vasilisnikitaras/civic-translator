async function populateLanguages() {
  try {
    const res = await fetch("assets/languages.json");
    const langs = await res.json();
    const select = document.getElementById("targetLang");

    for (const [code, name] of Object.entries(langs)) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      select.appendChild(option);
    }

    const browserLang = navigator.language.slice(0, 2);
    if (langs[browserLang]) {
      select.value = browserLang;
    }
  } catch (error) {
    console.error("❌ Failed to load languages:", error);
  }
}

async function loadCivicPhrases(langCode) {
  try {
    const res = await fetch("assets/config.json");
    const config = await res.json();
    const phrases = config.civicPhrases[langCode] || config.civicPhrases["en"];
    return phrases;
  } catch (error) {
    console.error("❌ Failed to load civic phrases:", error);
    return {
      reportSubmitted: "Report received.",
      badgeDispatched: "Badge dispatched.",
      translationComplete: "Translation complete."
    };
  }
}

async function translateText() {
  const text = document.getElementById("inputText").value.trim();
  const target = document.getElementById("targetLang").value;
  const output = document.getElementById("outputText");

  if (!text) {
    output.innerText = "⚠️ Please enter some text.";
    return;
  }

  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    const translated = data[0].map(item => item[0]).join(" ");
    const phrases = await loadCivicPhrases(target);

    output.innerText = `${translated}\n\n✅ ${phrases.translationComplete}`;
  } catch (error) {
    output.innerText = "❌ Translation failed. Please check your connection.";
    console.error("Translation error:", error);
  }
}

window.onload = () => {
  populateLanguages();
};
document.getElementById("darkModeToggle").addEventListener("change", (e) => {
  const isDark = e.target.checked;
  document.body.classList.toggle("dark", isDark);
  document.getElementById("inputText").classList.toggle("dark", isDark);
  document.getElementById("outputText").classList.toggle("dark", isDark);
  document.getElementById("targetLang").classList.toggle("dark", isDark);
});
