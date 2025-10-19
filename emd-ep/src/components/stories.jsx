import React from "react";
import PDFViewer from "../components/pdfViewer.jsx";
import inspiringstories from "../assets/stories.pdf";

export default function stories() {
  return (
    <PDFViewer
        id="inspiring-stories"
        title="قصص ملهمة"
        src={inspiringstories}
    />
  );
}
