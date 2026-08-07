import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function ResumeDocument({
  file,
  pageNumber = 1,
  zoom = 1,
  onLoadSuccess,
  onLoadError,
  onLoadProgress,
}) {
  return (
    <Document
      file={file}
      loading={null}
      error={null}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      onLoadProgress={onLoadProgress}
    >
      <Page
        pageNumber={pageNumber}
        scale={zoom}
        renderTextLayer={true}
        renderAnnotationLayer={true}
        className="shadow-lg"
      />
    </Document>
  );
}

export default ResumeDocument;