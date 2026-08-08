import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../components/common/ConfirmDialog";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Sidebar from "../components/dashboard/Sidebar";
import StatsGrid from "../components/dashboard/StatsGrid";
import ATSScoreCard from "../components/dashboard/ATSScoreCard";
import RecruiterVerdictCard from "../components/dashboard/RecruiterVerdictCard";
import ExecutiveSummaryCard from "../components/dashboard/ExecutiveSummaryCard";
import ResumeHealthCard from "../components/dashboard/ResumeHealthCard";
import StrengthsCard from "../components/dashboard/StrengthsCard";
import ImprovementsCard from "../components/dashboard/ImprovementsCard";
import RecommendationsCard from "../components/dashboard/RecommendationsCard";
import SkillCoverageCard from "../components/dashboard/SkillCoverageCard";

import ResumePreview from "../components/preview/ResumePreview";
import ResumeHistory from "../components/history/ResumeHistory";

import { useATS } from "../hooks/useATS";
import { useHistory } from "../hooks/useHistory";

import { logout } from "../services/authService";
import { exportPDF } from "../utils/pdf/exportPDF";

/* -------------------------------------------------------------------------- */
/* Helper Functions */
/* -------------------------------------------------------------------------- */

const getHealthMetrics = (analysis = {}) => ({
  formatting: analysis.breakdown?.formatting ?? 0,
  resumeQuality: analysis.breakdown?.resumeQuality ?? 0,
  keywordMatch: analysis.breakdown?.keywordMatch ?? 0,
  skillsMatch: analysis.breakdown?.skillsMatch ?? 0,
  overall: analysis.atsScore ?? 0,
});

const getSkillCoverage = (analysis = {}) =>
  (analysis.matched ?? []).map((skill) => ({
    name: skill,
    value: 100,
  }));

const EMPTY_ANALYSIS = {
  atsScore: 0,
  breakdown: {},
  matched: [],
  missing: [],
  summary: "",
  strengths: [],
  improvements: [],
  recommendations: [],
  recruiterVerdict: {
    rating: "",
    reason: "",
  },
};

/* -------------------------------------------------------------------------- */

function Dashboard() {
  const navigate = useNavigate();

  const { analysis, setAnalysis, hasAnalysis } = useATS();

  const { history, removeHistory } = useHistory();

  const [pendingDelete, setPendingDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const current = hasAnalysis ? analysis : EMPTY_ANALYSIS;

  const health = getHealthMetrics(current);

  const stats = {
    atsScore: current.atsScore,
    resumeHealth: Math.round(
      (
        health.formatting +
        health.resumeQuality +
        health.keywordMatch +
        health.skillsMatch +
        health.overall
      ) / 5
    ),
    keywordMatch: health.keywordMatch,
    skillsMatch: health.skillsMatch,
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDownload = (report = current) => {
    exportPDF(report);
  };

  const handleViewHistory = (item) => {
    setAnalysis({
      ...item,
      breakdown: item.breakdown || {},
    });
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;

    await removeHistory(pendingDelete._id);

    setPendingDelete(null);
  };

  return (
    <DashboardLayout
       sidebar={
    <Sidebar onLogout={handleLogout} />
  }
    >
      <DashboardHeader
        username={user.name?.split(" ")[0] || "there"}
      />

      <StatsGrid values={stats} />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <ATSScoreCard
          score={current.atsScore}
          breakdown={current.breakdown}
        />

        <RecruiterVerdictCard
          verdict={current.recruiterVerdict}
        />
      </div>

      <div className="mt-6">
        <ExecutiveSummaryCard
          summary={current.summary}
        />
      </div>

      <div className="mt-6">
        <ResumeHealthCard
          health={health}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <StrengthsCard
          strengths={current.strengths}
        />

        <ImprovementsCard
          improvements={current.improvements}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <RecommendationsCard
          recommendations={current.recommendations}
        />

        <SkillCoverageCard
          skills={getSkillCoverage(current)}
        />
      </div>

      <div className="mt-6">
        <ResumePreview
          file={current.resumeUrl || current.fileUrl}
          fileName={current.fileName}
          emptyMessage="Upload a resume to preview it here."
        />
      </div>

      <ResumeHistory
        history={history}
        onView={handleViewHistory}
        onDelete={setPendingDelete}
        onDownload={handleDownload}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this resume analysis?"
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardLayout>
  );
}

export default Dashboard;