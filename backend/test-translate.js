const translateText = require("./translate");

(async () => {
  console.log("🔍 Testing translation...");

  const result1 = await translateText("hello", "ta");
  console.log("English → Tamil:", result1);

  const result2 = await translateText("வணக்கம்", "en");
  console.log("Tamil → English:", result2);

  const result3 = await translateText("hello", "es");
  console.log("English → Spanish:", result3);
})();
