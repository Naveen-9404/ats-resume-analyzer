/**
 * Production ATS Scoring Engine
 */

export const calculateATSScore = (
  jdKeywords = [],
  resumeKeywords = [],
  resumeText = ""
) => {

  const uniqueJD = [...new Set(jdKeywords)];
  const uniqueResume = [...new Set(resumeKeywords)];

  // Prevent divide-by-zero
  if (uniqueJD.length === 0) {
    return {
      score: 0,
      breakdown: {
        keywordMatch: 0,
        resumeQuality: 0,
        completeness: 0,
      },
    };
  }

  /* ---------------- Keyword Match (70%) ---------------- */

  const matched = uniqueJD.filter(skill =>
    uniqueResume.includes(skill)
  );

  const keywordScore =
    (matched.length / uniqueJD.length) * 70;

  /* ---------------- Resume Quality (20%) ---------------- */

  let qualityScore = 0;

  const text = resumeText.toLowerCase();

  if (text.includes("experience")) qualityScore += 5;

  if (text.includes("education")) qualityScore += 5;

  if (text.includes("project")) qualityScore += 5;

  if (text.includes("skill")) qualityScore += 5;

  /* ---------------- Resume Completeness (10%) ---------------- */

  let completenessScore = 0;

  if (resumeText.length > 1000)
    completenessScore += 5;

  if (resumeText.length > 2000)
    completenessScore += 5;

  const total = Math.round(
    keywordScore +
    qualityScore +
    completenessScore
  );

  return {

    score: Math.min(total, 100),

    breakdown: {

      keywordMatch: Math.round(keywordScore),

      resumeQuality: qualityScore,

      completeness: completenessScore,

      matched,

      missing: uniqueJD.filter(
        skill => !matched.includes(skill)
      )

    }

  };

};