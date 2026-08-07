import { Download, FileText } from "lucide-react";

import PageNavigation from "./PageNavigation";
import ZoomControls from "./ZoomControls";

function ResumeToolbar({
  fileName,
  downloadUrl,
  pageNumber,
  totalPages,
  onPrevious,
  onNext,
  zoom,
  onZoomIn,
  onZoomOut,
}) {
  return (
    <header className="sticky top-3 z-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      {/* File */}

      <div className="flex min-w-0 items-center gap-2 text-slate-700">
        <FileText
          size={18}
          className="shrink-0 text-blue-600"
        />

        <span className="truncate text-sm font-semibold">
          {fileName || "Resume.pdf"}
        </span>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
        <PageNavigation
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPrevious={onPrevious}
          onNext={onNext}
        />

        <ZoomControls
          zoom={zoom}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
        />

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={fileName || "Resume.pdf"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700"
            aria-label="Download Resume"
          >
            <Download size={16} />
          </a>
        )}
      </div>
    </header>
  );
}

export default ResumeToolbar;