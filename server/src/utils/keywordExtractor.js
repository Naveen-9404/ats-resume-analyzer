const SKILLS = [
  "react",
  "reactjs",
  "react.js",
  "nextjs",
  "next.js",
  "node",
  "nodejs",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "sql",
  "javascript",
  "typescript",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "git",
  "github",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "firebase",
  "rest",
  "graphql",
  "jwt",
  "redux",
  "linux",
  "jenkins",
  "terraform",
  "redis",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "power bi",
  "tableau",
  "excel",
  "selenium",
  "cypress",
  "jest",
  "figma",
  "jira",
  "agile",
  "scrum",
];

export const extractKeywords = (text = "") => {
  const normalizedText = text.toLowerCase();

  const keywords = SKILLS.filter((skill) => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");
    return regex.test(normalizedText);
  });

  return [...new Set(keywords)].sort();
};