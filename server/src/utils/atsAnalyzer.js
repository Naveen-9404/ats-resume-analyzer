export function analyzeResume(text) {

  const keywords = [
    "react",
    "node",
    "mongodb",
    "javascript",
    "express",
    "api",
    "sql",
    "html",
    "css",
    "python",
  ];

  const lowerText = text.toLowerCase();

  let matched = [];
  let missing = [];

  keywords.forEach((word) => {

    if (lowerText.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }

  });

  const score = Math.round(
    (matched.length / keywords.length) * 100
  );

  return {
    score,
    matched,
    missing,
  };
}