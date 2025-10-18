import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

const PDFEditor = ({ pdfBlob }: { pdfBlob: Blob }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPDF = async () => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdfDoc.getPage(1);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context!, viewport });
    };

    loadPDF();
  }, [pdfBlob]);

  return <canvas ref={canvasRef} />;
};

export default PDFEditor;
