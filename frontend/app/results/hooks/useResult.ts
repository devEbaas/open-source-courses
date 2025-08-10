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

  const getRecomendations = () => {
    // verifica que category tuvo menor puntaje para recomendarle tomar ese curso, en caso de que ambos esten iguales, felicitarlo y decirle que puede continuar con el curso
    const { categories } = assessmentResult || {};
    const aprobacionPercent = 0.7;
    if (categories) {
      const minCategory = categories.reduce((prev, curr) =>
        prev.correct / prev.total < curr.correct / curr.total ? prev : curr
      );
      if (minCategory.correct / minCategory.total < aprobacionPercent) {
        return `Te recomendamos tomar el curso de ${minCategory.categoryName} para mejorar tu desempeño y así puedas avanzar de manera correcta durante el transcurso del curso.`;
      } else {
        return `¡Felicidades! Tienes el conocimiento necesario para continuar con el curso. Nos alegra mucho tenerte aquí.`;
      }
    }
    return "";
  };

  const downloadResults = () => {
    const { detail, categories, result } = assessmentResult || {};
    if (detail && categories && result) {
      const doc = new jsPDF();
      let y = 15;

      doc.setFontSize(22);
      doc.text("Resultados", 14, y);
      y += 10;

      doc.setFontSize(14);
      doc.text(`Resultados de la prueba ${result.assessment.name}`, 14, y);
      y += 15;

      // Cuadro Resumen
      doc.setDrawColor(0);
      doc.setFillColor(240, 240, 240);
      doc.rect(14, y, 80, 35, "F"); // x, y, width, height, fill

      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.text("Resumen", 18, y + 8);
      doc.setFontSize(11);
      doc.text(`Nombre: ${result.user.name || "Desconocido"}`, 18, y + 16);
      doc.text(
        `Fecha: ${new Date(result.createdAt).toLocaleDateString()}`,
        18,
        y + 23
      );
      doc.text(`Puntaje: ${result.score}/${result.totalQuestions}`, 18, y + 30);

      // Cuadro Categorías
      const catBoxX = 110;
      doc.setFillColor(240, 240, 240);
      doc.rect(catBoxX, y, 80, 35, "F");

      doc.setFontSize(12);
      doc.text("Categorías", catBoxX + 4, y + 8);
      doc.setFontSize(11);

      let barX = catBoxX + 5;
      let barY = y + 15;
      const barHeight = 6;
      const barMaxWidth = 65;

      categories.forEach((cat) => {
        doc.text(cat.categoryName, barX, barY - 2);

        const percent = (cat.correct / cat.total) * 100;
        const barWidth = (percent / 100) * barMaxWidth;

        // barra de fondo gris claro
        doc.setFillColor(220, 220, 220);
        doc.rect(barX, barY, barMaxWidth, barHeight, "F");

        // barra verde con porcentaje
        doc.setFillColor(0, 123, 85);
        doc.rect(barX, barY, barWidth, barHeight, "F");

        doc.setTextColor(0);
        doc.text(
          `${Math.round(percent)}%`,
          barX + barMaxWidth + 3,
          barY + barHeight - 1
        );

        barY += 12;
      });

      y += 45;

      doc.setFontSize(14);
      doc.text("Detalles", 14, y);
      y += 10;

      doc.setFontSize(11);
      detail.forEach((d, i) => {
        if (y > 270) {
          doc.addPage();
          y = 15;
        }

        doc.setTextColor(0);
        doc.text(`${i + 1}. ${d.questionText}`, 14, y);
        y += 7;

        doc.setTextColor(d.isCorrect ? "green" : "red");
        doc.text(d.isCorrect ? "Correcto" : "Incorrecto", 180, y - 7, {
          align: "right",
        });
      });

      doc.setFontSize(14);
      doc.text("Recomendaciones:", 14, y);
      y += 10;

      doc.setFontSize(11);

      doc.save("resultado_assessment.pdf");
    }
  };

  useEffect(() => {
    getResults();
  }, [resultId]);

  return { assessmentResult, downloadResults, getRecomendations };
};
