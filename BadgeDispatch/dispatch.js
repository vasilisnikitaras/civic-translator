// 🏅 Civic Badge Dispatch Logic

function dispatchBadge(reportType) {
  const badges = {
    cleanliness: "🧼 Cleanliness Badge",
    noise: "🔊 Noise Awareness Badge",
    accessibility: "♿ Accessibility Ally Badge",
    safety: "🛡️ Safety Sentinel Badge",
    kindness: "💛 Kindness Keeper Badge"
  };

  const badge = badges[reportType];

  if (!badge) {
    console.warn("⚠️ Unknown report type:", reportType);
    return `❌ No badge dispatched. Unknown category: ${reportType}`;
  }

  const message = `✅ ${badge} dispatched with dignity.`;
  console.log(message);
  return message;
}

// 🔁 Example usage
dispatchBadge("cleanliness");
dispatchBadge("noise");
dispatchBadge("unknown"); // Will trigger warning
