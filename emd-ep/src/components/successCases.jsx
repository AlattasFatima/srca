import React from "react";
import PDFViewer from "../components/pdfViewer.jsx";
import cases from "../assets/cases.pdf";

export default function SuccessCases() {
  return (
    <PDFViewer
        id="success-cases"
        title="الحالات الناجحة"
        src={cases}
    />
  );
}
