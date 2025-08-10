import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { IAssessmentResult } from "../props.interface";
import { fetchResult } from "../services/resultsService";

export const useResult = (resultId: number | string) => {
  const [assessmentResult, setAssessmentResult] =
    useState<IAssessmentResult | null>(null);

  const getResults = async () => {
    const result = await fetchResult(resultId);
    console.log(result);
    setAssessmentResult(result);
  };

  const downloadResults = () => {
    const { detail, categories, result } = assessmentResult || {};
    if (detail && categories && result) {
      const doc = new jsPDF();
      let y = 10;

      doc.setFontSize(18);
      doc.text(`Resultados Assessment: ${result.assessment.name}`, 10, y);
      y += 10;
      doc.setFontSize(14);
      doc.text(`Nombre: ${result.user.name}`, 10, y);
      y += 8;
      doc.text(`Puntaje: ${result.score} / ${result.totalQuestions}`, 10, y);
      y += 8;
      doc.text(`Fecha: ${new Date(result.createdAt).toLocaleString()}`, 10, y);
      y += 12;

      // Resumen por categoría
      doc.setFontSize(16);
      doc.text("Resumen por Categoría:", 10, y);
      y += 8;
      categories.forEach((cat) => {
        doc.setFontSize(12);
        doc.text(
          `${cat.categoryName}: Correctas ${cat.correct}, Incorrectas ${cat.incorrect} (de ${cat.total})`,
          10,
          y
        );
        y += 8;
      });

      y += 8;
      doc.setFontSize(16);
      doc.text("Detalle de Preguntas:", 10, y);
      y += 8;

      detail.forEach((d, i) => {
        if (y > 270) {
          // Nueva página si llega al final
          doc.addPage();
          y = 10;
        }
        doc.setFontSize(14);
        doc.text(`${i + 1}. ${d.questionText}`, 10, y);
        y += 8;
        doc.setFontSize(12);
        doc.text(
          `Tu respuesta: ${d.isCorrect ? "✔️ " : "❌ "}${d.selectedAnswerId}`,
          12,
          y
        );
        y += 7;
        doc.text(`Respuesta correcta: ${d.correctAnswerId}`, 12, y);
        y += 10;
      });

      doc.save("resultado_assessment.pdf");
    }
  };

  useEffect(() => {
    getResults();
  }, [resultId]);

  return { assessmentResult, downloadResults };
};
