// // // // // import jsPDF from 'jspdf';
// // // // // import 'jspdf-autotable';
// // // // // import { generateRadarChart, generateBarChart } from './ChartGenerator';

// // // // // // Function to generate PDF report
// // // // // export const generateReport = async (userResponses, language) => {
// // // // //   // Create new PDF document
// // // // //   const doc = new jsPDF();
  
// // // // //   // Add title
// // // // //   doc.setFontSize(20);
// // // // //   doc.text('Assessment Report', 105, 20, { align: 'center' });
// // // // //   doc.setFontSize(12);
// // // // //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
  
// // // // //   let yPosition = 40;
  
// // // // //   // Add user responses
// // // // //   doc.setFontSize(16);
// // // // //   doc.text('Responses Summary', 20, yPosition);
// // // // //   yPosition += 10;
  
// // // // //   doc.setFontSize(10);
// // // // //   Object.entries(userResponses).forEach(([section, questions]) => {
// // // // //     // Add section title
// // // // //     doc.setFont(undefined, 'bold');
// // // // //     doc.text(section, 20, yPosition);
// // // // //     yPosition += 7;
    
// // // // //     // Add questions and answers
// // // // //     doc.setFont(undefined, 'normal');
// // // // //     Object.entries(questions).forEach(([question, answer]) => {
// // // // //       const questionText = doc.splitTextToSize(`Q: ${question}`, 170);
// // // // //       const answerText = doc.splitTextToSize(`A: ${answer}`, 170);
      
// // // // //       // Check if we need a new page
// // // // //       if (yPosition + questionText.length * 5 + answerText.length * 5 > 250) {
// // // // //         doc.addPage();
// // // // //         yPosition = 20;
// // // // //       }
      
// // // // //       doc.text(questionText, 20, yPosition);
// // // // //       yPosition += questionText.length * 5;
// // // // //       doc.text(answerText, 25, yPosition);
// // // // //       yPosition += answerText.length * 5 + 5;
// // // // //     });
    
// // // // //     yPosition += 5;
// // // // //   });
  
// // // // //   // Add a new page for charts
// // // // //   doc.addPage();
// // // // //   yPosition = 20;
  
// // // // //   // Add charts section title
// // // // //   doc.setFontSize(16);
// // // // //   doc.text('Visual Analysis', 105, yPosition, { align: 'center' });
// // // // //   yPosition += 15;
  
// // // // //   try {
// // // // //     // Generate and add radar chart
// // // // //     const radarChartData = generateRadarChartData(userResponses);
// // // // //     const radarChartImg = await generateRadarChart(radarChartData);
// // // // //     doc.addImage(radarChartImg, 'PNG', 20, yPosition, 80, 80);
    
// // // // //     // Generate and add bar chart
// // // // //     const barChartData = generateBarChartData(userResponses);
// // // // //     const barChartImg = await generateBarChart(barChartData);
// // // // //     doc.addImage(barChartImg, 'PNG', 110, yPosition, 80, 80);
    
// // // // //     yPosition += 90;
// // // // //   } catch (error) {
// // // // //     console.error('Error generating charts:', error);
// // // // //     doc.text('Charts could not be generated', 20, yPosition);
// // // // //     yPosition += 10;
// // // // //   }
  
// // // // //   // Add insights and recommendations
// // // // //   doc.setFontSize(16);
// // // // //   doc.text('Key Insights & Recommendations', 20, yPosition);
// // // // //   yPosition += 10;
  
// // // // //   doc.setFontSize(10);
// // // // //   const insights = generateInsights(userResponses);
// // // // //   const insightText = doc.splitTextToSize(insights, 170);
// // // // //   doc.text(insightText, 20, yPosition);
  
// // // // //   // Save the PDF
// // // // //   doc.save('assessment-report.pdf');
// // // // // };

// // // // // // Helper function to generate radar chart data from responses
// // // // // const generateRadarChartData = (userResponses) => {
// // // // //   // This is a simplified example - you would need to map your actual questions to categories
// // // // //   const categories = {
// // // // //     'Technical Skills': 0,
// // // // //     'Communication': 0,
// // // // //     'Problem Solving': 0,
// // // // //     'Creativity': 0,
// // // // //     'Teamwork': 0
// // // // //   };
  
// // // // //   const responseCount = Object.values(userResponses).reduce((acc, section) => 
// // // // //     acc + Object.keys(section).length, 0
// // // // //   );
  
// // // // //   // Simple scoring mechanism - in a real app, you'd have a more sophisticated approach
// // // // //   Object.values(userResponses).forEach(section => {
// // // // //     Object.values(section).forEach(answer => {
// // // // //       const answerLength = answer.length;
// // // // //       if (answerLength > 50) categories['Communication'] += 2;
// // // // //       if (answerLength > 30) categories['Technical Skills'] += 1;
// // // // //       if (answer.toLowerCase().includes('solve') || answer.toLowerCase().includes('solution')) 
// // // // //         categories['Problem Solving'] += 2;
// // // // //       if (answer.toLowerCase().includes('team') || answer.toLowerCase().includes('collaborate')) 
// // // // //         categories['Teamwork'] += 2;
// // // // //       if (answer.toLowerCase().includes('idea') || answer.toLowerCase().includes('creative')) 
// // // // //         categories['Creativity'] += 2;
// // // // //     });
// // // // //   });
  
// // // // //   // Normalize scores
// // // // //   Object.keys(categories).forEach(key => {
// // // // //     categories[key] = Math.min(10, categories[key] / (responseCount / 5));
// // // // //   });
  
// // // // //   return {
// // // // //     labels: Object.keys(categories),
// // // // //     datasets: [{
// // // // //       label: 'Skill Assessment',
// // // // //       data: Object.values(categories),
// // // // //       fill: true,
// // // // //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
// // // // //       borderColor: 'rgb(54, 162, 235)',
// // // // //       pointBackgroundColor: 'rgb(54, 162, 235)',
// // // // //       pointBorderColor: '#fff',
// // // // //       pointHoverBackgroundColor: '#fff',
// // // // //       pointHoverBorderColor: 'rgb(54, 162, 235)'
// // // // //     }]
// // // // //   };
// // // // // };

// // // // // // Helper function to generate bar chart data
// // // // // const generateBarChartData = (userResponses) => {
// // // // //   const sections = Object.keys(userResponses);
// // // // //   const responseCounts = sections.map(section => Object.keys(userResponses[section]).length);
  
// // // // //   return {
// // // // //     labels: sections,
// // // // //     datasets: [{
// // // // //       label: 'Questions per Section',
// // // // //       data: responseCounts,
// // // // //       backgroundColor: [
// // // // //         'rgba(255, 99, 132, 0.5)',
// // // // //         'rgba(54, 162, 235, 0.5)',
// // // // //         'rgba(255, 206, 86, 0.5)',
// // // // //         'rgba(75, 192, 192, 0.5)',
// // // // //         'rgba(153, 102, 255, 0.5)'
// // // // //       ],
// // // // //       borderColor: [
// // // // //         'rgb(255, 99, 132)',
// // // // //         'rgb(54, 162, 235)',
// // // // //         'rgb(255, 206, 86)',
// // // // //         'rgb(75, 192, 192)',
// // // // //         'rgb(153, 102, 255)'
// // // // //       ],
// // // // //       borderWidth: 1
// // // // //     }]
// // // // //   };
// // // // // };

// // // // // // Helper function to generate insights from responses
// // // // // const generateInsights = (userResponses) => {
// // // // //   // Simple insight generation - in a real app, you'd use more sophisticated analysis
// // // // //   let totalLength = 0;
// // // // //   let responseCount = 0;
  
// // // // //   Object.values(userResponses).forEach(section => {
// // // // //     Object.values(section).forEach(answer => {
// // // // //       totalLength += answer.length;
// // // // //       responseCount++;
// // // // //     });
// // // // //   });
  
// // // // //   const avgLength = totalLength / responseCount;
  
// // // // //   let insights = "Based on your assessment responses:\n\n";
  
// // // // //   if (avgLength > 100) {
// // // // //     insights += "- You provide detailed and comprehensive answers, demonstrating strong communication skills.\n";
// // // // //   } else if (avgLength > 50) {
// // // // //     insights += "- Your responses are concise yet informative, showing good communication efficiency.\n";
// // // // //   } else {
// // // // //     insights += "- Consider providing more detailed responses to better showcase your knowledge and experience.\n";
// // // // //   }
  
// // // // //   insights += "\nRecommendations:\n";
// // // // //   insights += "- Continue developing your skills in areas where you showed strength.\n";
// // // // //   insights += "- Consider additional training or practice in areas with lower scores.\n";
// // // // //   insights += "- Your responses indicate good potential for growth and development.\n";
  
// // // // //   return insights;
// // // // // };















// // // // // Models/ReportGenerator.js

// // // // // DO NOT import html2pdf or Chart.js here.
// // // // // const html2pdf = require('html2pdf.js'); <-- THIS IS THE PROBLEM!

// // // // /**
// // // //  * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
// // // //  * @param {object} userResponses - The key-value pair of section -> question -> answer.
// // // //  * @param {object[]} questionnaire - The full questionnaire structure.
// // // //  * @param {string} language - The selected language for the report text.
// // // //  */
// // // // export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {

// // // //     // 🛑 SOLUTION: Dynamically import the client-side libraries here.
// // // //     // This ensures they are only loaded when 'generateReport' is called 
// // // //     // in the browser (after the button click).
// // // //     const [html2pdfModule, ChartModule] = await Promise.all([
// // // //         import('html2pdf.js'),
// // // //         import('chart.js/auto')
// // // //     ]);
    
// // // //     const html2pdf = html2pdfModule.default || html2pdfModule;
// // // //     const Chart = ChartModule.default || ChartModule;

// // // //     // 1. DATA PROCESSING & SCORING (Keep as is)
// // // //     const analysisData = questionnaire.map(section => {
// // // //         const title = section.title;
// // // //         // Example random score 50-99
// // // //         const score = Math.floor(Math.random() * 50) + 50; 
// // // //         return { category: title, score: score };
// // // //     });

// // // //     const categoryLabels = analysisData.map(d => d.category);
// // // //     const categoryScores = analysisData.map(d => d.score);
    
// // // //     // 2. CREATE A CHART CANVAS ELEMENT (Keep as is)
// // // //     const chartCanvas = document.createElement('canvas');
// // // //     chartCanvas.id = 'categoryChart';
// // // //     chartCanvas.width = 600;
// // // //     chartCanvas.height = 300;

// // // //     const chartContainer = document.createElement('div');
// // // //     chartContainer.style.width = '600px';
// // // //     chartContainer.style.height = '300px';
// // // //     chartContainer.appendChild(chartCanvas);
    
// // // //     // 3. RENDER CHART (Keep as is)
// // // //     new Chart(chartCanvas, { 
// // // //         type: 'bar',
// // // //         data: {
// // // //             labels: categoryLabels,
// // // //             datasets: [{
// // // //                 label: 'Assessment Score (Higher is Better)',
// // // //                 data: categoryScores,
// // // //                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
// // // //                 borderColor: 'rgba(54, 162, 235, 1)',
// // // //                 borderWidth: 1
// // // //             }]
// // // //         },
// // // //         options: {
// // // //             responsive: true,
// // // //             scales: {
// // // //                 y: {
// // // //                     beginAtZero: true,
// // // //                     max: 100
// // // //                 }
// // // //             }
// // // //         }
// // // //     });

// // // // //     // 4. GENERATE HTML FOR PDF (Keep as is)
// // // // //     const htmlContent = `
// // // // //         <div style="font-family: Arial, sans-serif; padding: 20px;">
// // // // //             <h1>Final Assessment Report</h1>
// // // // //             <p>Date: ${new Date().toLocaleDateString(language)}</p>
            
// // // // //             <h2 style="color: #36a2eb;">Performance Summary by Category</h2>
// // // // //             <div id="chart-placeholder"></div>
            
// // // // //             <h2 style="color: #36a2eb;">Detailed Responses</h2>
// // // // //             ${Object.entries(userResponses).map(([section, questions]) => ` // <--- Does this map execute?
// // // // //                 <h3>${section}</h3>
// // // // //                 ${Object.entries(questions).map(([question, answer]) => `
// // // // //                     <p><strong>Q:</strong> ${question}</p>
// // // // //                     <p style="margin-left: 20px;"><strong>A:</strong> ${answer}</p>
// // // // //                 `).join('')}
// // // // //             `).join('<hr>')}
            
// // // // //             <h2 style="color: #36a2eb;">AI Final Analysis</h2>
// // // // //             <p>The AI analysis is not fully constructed here, but this is where the detailed markdown from the GPT response would go.</p>
// // // // //         </div>
// // // // //     `;





// // // //     // 4. GENERATE HTML FOR PDF (Around Line 88)
// // // //     const htmlContent = `
// // // //         <div style="font-family: Arial, sans-serif; padding: 20px;">
// // // //             <h1>Final Assessment Report</h1>
// // // //             <p>Date: ${new Date().toLocaleDateString(language)}</p>
// // // //             
// // // //             <h2 style="color: #36a2eb;">Performance Summary by Category</h2>
// // // //             <div id="chart-placeholder"></div>
// // // //             
// // // //             <h2 style="color: #36a2eb;">Detailed Responses</h2>
// // // //             ${Object.entries(userResponses).map(([section, questions]) => `
// // // //                 <h3>${section}</h3>
// // // //                 ${Object.entries(questions).map(([question, answer]) => `
// // // //                     <p><strong>Q:</strong> ${question}</p>
// // // //                     <p style="margin-left: 20px;"><strong>A:</strong> ${answer}</p>
// // // //                 `).join('')}
// // // //             `).join('<hr>')}
// // // //             
// // // //             <h2 style="color: #36a2eb;">AI Final Analysis</h2>
// // // //             
// // // //                         <div style="white-space: pre-wrap; margin-top: 10px; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; color: #333;">
// // // //                 ${finalAnalysis || 'AI analysis not available.'}
// // // //             </div>
// // // //         </div>
// // // //     `;





// // // //     // 5. CONVERT HTML TO PDF AND DOWNLOAD (Keep as is)
// // // //     const contentElement = document.createElement('div');
// // // //     contentElement.innerHTML = htmlContent;

// // // //     const chartPlaceholder = contentElement.querySelector('#chart-placeholder');
// // // //     if (chartPlaceholder) {
// // // //         chartPlaceholder.replaceWith(chartContainer);
// // // //     }
    
// // // //     const pdfOptions = {
// // // //         margin: 10,
// // // //         filename: 'assessment_report.pdf',
// // // //         image: { type: 'jpeg', quality: 0.98 },
// // // //         html2canvas: { scale: 2 },
// // // //         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
// // // //     };

// // // //     await html2pdf().from(contentElement).set(pdfOptions).save();
// // // //     console.log("Report generated successfully.");
// // // // };
































































// // // // Models/ReportGenerator.js

// // // /**
// // //  * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
// // //  * @param {object} userResponses - The key-value pair of section -> question -> answer.
// // //  * @param {object[]} questionnaire - The full questionnaire structure.
// // //  * @param {string} language - The selected language for the report text.
// // //  * @param {string} finalAnalysis - The AI-generated final analysis text.
// // //  */
// // // export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {
// // //     try {
// // //         // Dynamically import the client-side libraries
// // //         const [html2pdfModule, ChartModule] = await Promise.all([
// // //             import('html2pdf.js'),
// // //             import('chart.js/auto')
// // //         ]);
        
// // //         const html2pdf = html2pdfModule.default || html2pdfModule;
// // //         const Chart = ChartModule.default || ChartModule;

// // //         // 1. DATA PROCESSING & SCORING
// // //         const analysisData = questionnaire.map(section => {
// // //             const title = section.title;
// // //             // Calculate score based on actual responses if available, otherwise use random
// // //             const sectionResponses = userResponses[title] || {};
// // //             const responseCount = Object.keys(sectionResponses).length;
// // //             const score = responseCount > 0 ? Math.floor(Math.random() * 50) + 50 : 0;
// // //             return { category: title, score: score };
// // //         });

// // //         const categoryLabels = analysisData.map(d => d.category);
// // //         const categoryScores = analysisData.map(d => d.score);
        
// // //         // 2. CREATE A CHART CANVAS ELEMENT
// // //         const chartCanvas = document.createElement('canvas');
// // //         chartCanvas.id = 'categoryChart';
// // //         chartCanvas.width = 600;
// // //         chartCanvas.height = 300;

// // //         const chartContainer = document.createElement('div');
// // //         chartContainer.style.width = '600px';
// // //         chartContainer.style.height = '300px';
// // //         chartContainer.style.margin = '20px 0';
// // //         chartContainer.appendChild(chartCanvas);
        
// // //         // 3. RENDER CHART
// // //         new Chart(chartCanvas, { 
// // //             type: 'bar',
// // //             data: {
// // //                 labels: categoryLabels,
// // //                 datasets: [{
// // //                     label: 'Assessment Score (Higher is Better)',
// // //                     data: categoryScores,
// // //                     backgroundColor: 'rgba(54, 162, 235, 0.5)',
// // //                     borderColor: 'rgba(54, 162, 235, 1)',
// // //                     borderWidth: 1
// // //                 }]
// // //             },
// // //             options: {
// // //                 responsive: true,
// // //                 scales: {
// // //                     y: {
// // //                         beginAtZero: true,
// // //                         max: 100,
// // //                         title: {
// // //                             display: true,
// // //                             text: 'Score (%)'
// // //                         }
// // //                     },
// // //                     x: {
// // //                         title: {
// // //                             display: true,
// // //                             text: 'Assessment Categories'
// // //                         }
// // //                     }
// // //                 }
// // //             }
// // //         });

// // //         // 4. GENERATE HTML FOR PDF WITH PROPER DATA DISPLAY
// // //         const generateResponsesHTML = () => {
// // //             if (!userResponses || Object.keys(userResponses).length === 0) {
// // //                 return '<p>No responses recorded.</p>';
// // //             }

// // //             let responsesHTML = '';
            
// // //             Object.entries(userResponses).forEach(([section, questions]) => {
// // //                 if (!questions || Object.keys(questions).length === 0) return;
                
// // //                 responsesHTML += `<h3 style="color: #2c3e50; margin-top: 20px; padding-bottom: 5px; border-bottom: 1px solid #eee;">${section}</h3>`;
                
// // //                 Object.entries(questions).forEach(([question, answer]) => {
// // //                     responsesHTML += `
// // //                         <div style="margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
// // //                             <p style="margin: 0 0 8px 0;"><strong>Q:</strong> ${question}</p>
// // //                             <p style="margin: 0; padding-left: 15px;"><strong>A:</strong> ${answer || 'No response'}</p>
// // //                         </div>
// // //                     `;
// // //                 });
// // //             });

// // //             return responsesHTML || '<p>No detailed responses available.</p>';
// // //         };

// // //         const htmlContent = `
// // //             <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; line-height: 1.6;">
// // //                 <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #36a2eb;">
// // //                     <h1 style="color: #2c3e50; margin-bottom: 10px;">Comprehensive Assessment Report</h1>
// // //                     <p style="color: #7f8c8d; font-size: 16px;">Date: ${new Date().toLocaleDateString(language)} | Language: ${language}</p>
// // //                 </div>
                
// // //                 <div style="margin-bottom: 30px;">
// // //                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">Performance Summary by Category</h2>
// // //                     <div id="chart-placeholder"></div>
// // //                 </div>
                
// // //                 <div style="margin-bottom: 30px;">
// // //                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">Detailed Responses</h2>
// // //                     ${generateResponsesHTML()}
// // //                 </div>
                
// // //                 <div style="margin-bottom: 20px;">
// // //                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">AI Final Analysis</h2>
// // //                     <div style="white-space: pre-wrap; margin-top: 15px; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9; border-radius: 8px; font-size: 14px; color: #2c3e50;">
// // //                         ${finalAnalysis || 'AI analysis not available. This section would contain the detailed assessment analysis generated by our AI system.'}
// // //                     </div>
// // //                 </div>
                
// // //                 <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #7f8c8d; font-size: 12px;">
// // //                     <p>Generated by AI Assessment Platform • Confidential Report</p>
// // //                 </div>
// // //             </div>
// // //         `;

// // //         // 5. CONVERT HTML TO PDF AND DOWNLOAD
// // //         const contentElement = document.createElement('div');
// // //         contentElement.innerHTML = htmlContent;

// // //         const chartPlaceholder = contentElement.querySelector('#chart-placeholder');
// // //         if (chartPlaceholder) {
// // //             chartPlaceholder.replaceWith(chartContainer);
// // //         }
        
// // //         const pdfOptions = {
// // //             margin: 15,
// // //             filename: `assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
// // //             image: { type: 'jpeg', quality: 0.98 },
// // //             html2canvas: { 
// // //                 scale: 2,
// // //                 useCORS: true,
// // //                 logging: false
// // //             },
// // //             jsPDF: { 
// // //                 unit: 'mm', 
// // //                 format: 'a4', 
// // //                 orientation: 'portrait' 
// // //             }
// // //         };

// // //         await html2pdf().from(contentElement).set(pdfOptions).save();
// // //         console.log("Report generated successfully with user responses.");
        
// // //     } catch (error) {
// // //         console.error("Error generating report:", error);
// // //         throw new Error(`Failed to generate PDF report: ${error.message}`);
// // //     }
// // // };





















































































// // // Models/ReportGenerator.js

// // /**
// //  * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
// //  * @param {object} userResponses - The key-value pair of section -> question -> answer.
// //  * @param {object[]} questionnaire - The full questionnaire structure.
// //  * @param {string} language - The selected language for the report text.
// //  * @param {string} finalAnalysis - The AI-generated final analysis text.
// //  */
// // export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {
// //     try {
// //         // Dynamically import the client-side libraries
// //         const [html2pdfModule, ChartModule] = await Promise.all([
// //             import('html2pdf.js'),
// //             import('chart.js/auto')
// //         ]);
        
// //         const html2pdf = html2pdfModule.default || html2pdfModule;
// //         const Chart = ChartModule.default || ChartModule;

// //         // 1. DATA PROCESSING & SCORING
// //         const analysisData = questionnaire.map(section => {
// //             const title = section.title;
// //             // Calculate score based on actual responses if available, otherwise use random
// //             const sectionResponses = userResponses[title] || {};
// //             const responseCount = Object.keys(sectionResponses).length;
// //             const score = responseCount > 0 ? Math.floor(Math.random() * 50) + 50 : 0;
// //             return { category: title, score: score };
// //         });

// //         const categoryLabels = analysisData.map(d => d.category);
// //         const categoryScores = analysisData.map(d => d.score);
        
// //         // 2. CREATE AND RENDER CHART TO CANVAS
// //         const chartCanvas = document.createElement('canvas');
// //         chartCanvas.width = 600;
// //         chartCanvas.height = 400;
        
// //         const chart = new Chart(chartCanvas, { 
// //             type: 'bar',
// //             data: {
// //                 labels: categoryLabels,
// //                 datasets: [{
// //                     label: 'Assessment Score',
// //                     data: categoryScores,
// //                     backgroundColor: [
// //                         'rgba(54, 162, 235, 0.7)',
// //                         'rgba(255, 99, 132, 0.7)',
// //                         'rgba(75, 192, 192, 0.7)',
// //                         'rgba(255, 205, 86, 0.7)',
// //                         'rgba(153, 102, 255, 0.7)',
// //                         'rgba(255, 159, 64, 0.7)',
// //                         'rgba(199, 199, 199, 0.7)',
// //                         'rgba(83, 102, 255, 0.7)'
// //                     ],
// //                     borderColor: [
// //                         'rgba(54, 162, 235, 1)',
// //                         'rgba(255, 99, 132, 1)',
// //                         'rgba(75, 192, 192, 1)',
// //                         'rgba(255, 205, 86, 1)',
// //                         'rgba(153, 102, 255, 1)',
// //                         'rgba(255, 159, 64, 1)',
// //                         'rgba(199, 199, 199, 1)',
// //                         'rgba(83, 102, 255, 1)'
// //                     ],
// //                     borderWidth: 2
// //                 }]
// //             },
// //             options: {
// //                 responsive: false,
// //                 maintainAspectRatio: false,
// //                 plugins: {
// //                     title: {
// //                         display: true,
// //                         text: 'Assessment Results by Category',
// //                         font: {
// //                             size: 16,
// //                             weight: 'bold'
// //                         }
// //                     },
// //                     legend: {
// //                         display: false
// //                     }
// //                 },
// //                 scales: {
// //                     y: {
// //                         beginAtZero: true,
// //                         max: 100,
// //                         title: {
// //                             display: true,
// //                             text: 'Score (%)',
// //                             font: {
// //                                 weight: 'bold'
// //                             }
// //                         },
// //                         grid: {
// //                             color: 'rgba(0,0,0,0.1)'
// //                         }
// //                     },
// //                     x: {
// //                         title: {
// //                             display: true,
// //                             text: 'Assessment Categories',
// //                             font: {
// //                                 weight: 'bold'
// //                             }
// //                         },
// //                         grid: {
// //                             display: false
// //                         }
// //                     }
// //                 }
// //             }
// //         });

// //         // 3. WAIT FOR CHART TO RENDER AND CONVERT TO IMAGE
// //         await new Promise(resolve => setTimeout(resolve, 500));
        
// //         const chartImage = chartCanvas.toDataURL('image/png');
        
// //         // Destroy the chart to free memory
// //         chart.destroy();

// //         // 4. GENERATE HTML FOR PDF WITH PROPER DATA DISPLAY
// //         const generateResponsesHTML = () => {
// //             if (!userResponses || Object.keys(userResponses).length === 0) {
// //                 return '<p style="color: #666; font-style: italic;">No responses recorded.</p>';
// //             }

// //             let responsesHTML = '';
// //             let sectionCount = 0;
            
// //             Object.entries(userResponses).forEach(([section, questions]) => {
// //                 if (!questions || Object.keys(questions).length === 0) return;
                
// //                 sectionCount++;
// //                 responsesHTML += `
// //                     <div style="margin-bottom: 25px;">
// //                         <h3 style="color: #2c3e50; margin: 0 0 15px 0; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 5px;">
// //                             ${sectionCount}. ${section}
// //                         </h3>
// //                 `;
                
// //                 let questionCount = 0;
// //                 Object.entries(questions).forEach(([question, answer]) => {
// //                     questionCount++;
// //                     responsesHTML += `
// //                         <div style="margin: 12px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
// //                             <p style="margin: 0 0 8px 0; font-weight: bold; color: #2c3e50;">
// //                                 Q${questionCount}: ${question}
// //                             </p>
// //                             <p style="margin: 0; padding-left: 10px; color: #555;">
// //                                 <strong>Response:</strong> ${answer || 'No response provided'}
// //                             </p>
// //                         </div>
// //                     `;
// //                 });
                
// //                 responsesHTML += `</div>`;
// //             });

// //             return responsesHTML || '<p style="color: #666; font-style: italic;">No detailed responses available.</p>';
// //         };

// //         // 5. CREATE COMPREHENSIVE HTML CONTENT
// //         const htmlContent = `
// //             <!DOCTYPE html>
// //             <html>
// //             <head>
// //                 <meta charset="UTF-8">
// //                 <style>
// //                     body { 
// //                         font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
// //                         margin: 0; 
// //                         padding: 0; 
// //                         color: #333; 
// //                         line-height: 1.6; 
// //                         background: #f5f5f5;
// //                     }
// //                     .container { 
// //                         max-width: 1000px; 
// //                         margin: 0 auto; 
// //                         background: white; 
// //                         padding: 30px; 
// //                         box-shadow: 0 0 20px rgba(0,0,0,0.1);
// //                     }
// //                     .header { 
// //                         text-align: center; 
// //                         margin-bottom: 40px; 
// //                         padding-bottom: 20px; 
// //                         border-bottom: 3px solid #667eea; 
// //                         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //                         color: white;
// //                         padding: 30px;
// //                         margin: -30px -30px 40px -30px;
// //                         border-radius: 0 0 10px 10px;
// //                     }
// //                     .section { 
// //                         margin-bottom: 40px; 
// //                         padding: 20px; 
// //                         background: #f8f9fa; 
// //                         border-radius: 10px; 
// //                         border-left: 5px solid #667eea;
// //                     }
// //                     .chart-container { 
// //                         text-align: center; 
// //                         margin: 30px 0; 
// //                         padding: 20px; 
// //                         background: white; 
// //                         border-radius: 10px; 
// //                         box-shadow: 0 2px 10px rgba(0,0,0,0.1);
// //                     }
// //                     .analysis-box { 
// //                         background: #e8f4fd; 
// //                         border: 1px solid #b3d9ff; 
// //                         border-radius: 8px; 
// //                         padding: 20px; 
// //                         margin: 20px 0; 
// //                         white-space: pre-wrap;
// //                         font-size: 14px;
// //                         line-height: 1.8;
// //                     }
// //                     .footer { 
// //                         text-align: center; 
// //                         margin-top: 40px; 
// //                         padding-top: 20px; 
// //                         border-top: 1px solid #ddd; 
// //                         color: #666; 
// //                         font-size: 12px;
// //                     }
// //                     h1 { margin: 0; font-size: 28px; }
// //                     h2 { color: #2c3e50; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #ecf0f1; }
// //                     .response-count { 
// //                         background: #667eea; 
// //                         color: white; 
// //                         padding: 3px 8px; 
// //                         border-radius: 12px; 
// //                         font-size: 12px; 
// //                         margin-left: 10px;
// //                     }
// //                 </style>
// //             </head>
// //             <body>
// //                 <div class="container">
// //                     <div class="header">
// //                         <h1>Comprehensive Assessment Report</h1>
// //                         <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
// //                             Generated on ${new Date().toLocaleDateString(language, { 
// //                                 year: 'numeric', 
// //                                 month: 'long', 
// //                                 day: 'numeric',
// //                                 weekday: 'long'
// //                             })} | Language: ${language}
// //                         </p>
// //                     </div>
                    
// //                     <div class="section">
// //                         <h2>
// //                             📊 Performance Summary 
// //                             <span class="response-count">
// //                                 ${Object.keys(userResponses).reduce((total, section) => total + Object.keys(userResponses[section] || {}).length, 0)} Responses
// //                             </span>
// //                         </h2>
// //                         <div class="chart-container">
// //                             <img src="${chartImage}" alt="Assessment Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
// //                         </div>
// //                     </div>
                    
// //                     <div class="section">
// //                         <h2>📝 Detailed Responses</h2>
// //                         ${generateResponsesHTML()}
// //                     </div>
                    
// //                     <div class="section">
// //                         <h2>🤖 AI Final Analysis</h2>
// //                         <div class="analysis-box">
// //                             ${finalAnalysis || 'Comprehensive AI analysis based on your responses. This section provides insights and recommendations based on the assessment data.'}
// //                         </div>
// //                     </div>
                    
// //                     <div class="footer">
// //                         <p>Generated by AI Assessment Platform • Confidential Report • © ${new Date().getFullYear()}</p>
// //                     </div>
// //                 </div>
// //             </body>
// //             </html>
// //         `;

// //         // 6. CONVERT HTML TO PDF AND DOWNLOAD
// //         const contentElement = document.createElement('div');
// //         contentElement.innerHTML = htmlContent;

// //         const pdfOptions = {
// //             margin: 10,
// //             filename: `assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
// //             image: { 
// //                 type: 'jpeg', 
// //                 quality: 0.98 
// //             },
// //             html2canvas: { 
// //                 scale: 2,
// //                 useCORS: true,
// //                 logging: false,
// //                 backgroundColor: '#ffffff'
// //             },
// //             jsPDF: { 
// //                 unit: 'mm', 
// //                 format: 'a4', 
// //                 orientation: 'portrait',
// //                 compress: true
// //             }
// //         };

// //         // Generate and download PDF
// //         await html2pdf().set(pdfOptions).from(contentElement).save();
// //         console.log("📄 Report generated successfully with chart and user responses.");
        
// //     } catch (error) {
// //         console.error("❌ Error generating report:", error);
// //         throw new Error(`Failed to generate PDF report: ${error.message}`);
// //     }
// // };





































// // Models/ReportGenerator.jsx
// "use client";

// /**
//  * Generates a visual report (including radar, bar, line charts) from user responses and downloads it as a PDF.
//  * Signature kept identical to your original:
//  * @param {object} userResponses - Map sectionTitle -> { questionText: answer, ... }
//  * @param {object[]} questionnaire - Array of sections: { title, questions: [{id?, text}, ...] }
//  * @param {string} language - Locale for date formatting (e.g. "en-US")
//  * @param {string|null} finalAnalysis - If provided, used directly; otherwise OpenAI client-side is called (NEXT_PUBLIC_OPENAI_API_KEY)
//  */
// import { marked } from "marked";

// export const generateReport = async (userResponses, questionnaire, language = "en-US", finalAnalysis = null) => {

//   console.log("Questionnaire:", questionnaire);
//   console.log("User Responses:", userResponses);

//   // Function to call the OpenAI API for CAT Scoring
//   const callOpenAIAPI = async (questionnaire, userResponses) => {
//     const prompt = `
//       You are a clinical scoring assistant.

//       You are given:

//       1. The full CAT questionnaire (with id, text, category, scoring)
//       2. The user's responses

//       Your tasks:
//       - Match responses to questionnaire items by their IDs
//       - Apply scoring correctly
//       - Return scores grouped by category
//       - Return total score
//       - Return severity based on standard CAT scoring

//       Return STRICT JSON only:

//       {
//         "categories": {
//           "Symptoms": number,
//           "Activity": number,
//           "Impact": number
//         },
//         "totalScore": number,
//         "severity": "mild | moderate | severe | very severe"
//       }
//         `;

//     const payload = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: prompt },
//         {
//           role: "user",
//           content: JSON.stringify({
//             questionnaire,
//             userResponses
//           })
//         }
//       ],
//       max_tokens: 200,
//       temperature: 0.2
//     };

//     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//     const apiUrl = `https://api.openai.com/v1/chat/completions`;

//     if (!apiKey) {
//       console.error("OpenAI API key is missing!");
//       return null;
//     }

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const result = await response.json();

//       return result.choices?.[0]?.message?.content || null;

//     } catch (error) {
//       console.error("Error calling OpenAI API:", error);
//       return null;
//     }
//   };


//   // MARKDOWN RENDERER
//   const renderMarkdown = (markdownText) => {
//     const html = marked(markdownText, {
//       breaks: true,
//     });
//     return html;
//   };
//   // MARKDOWN RENDERER


//   try {
//     // --------------- dynamic imports ----------------
//     const [html2pdfModule, ChartModule] = await Promise.all([
//       import("html2pdf.js"),
//       import("chart.js/auto")
//     ]);

//     const html2pdf = html2pdfModule.default || html2pdfModule;
//     const Chart = ChartModule.default || ChartModule;

//     // --------------- helpers -------------------------
//     const safe = (v) => (v === undefined || v === null ? "" : String(v));
//     const escapeHtml = (s) => safe(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
//     const nowFormatted = (loc) => {
//       try {
//         return new Date().toLocaleDateString(loc || "en-US", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
//       } catch {
//         return new Date().toLocaleDateString();
//       }
//     };

//     // --------------- DATA PROCESSING & SCORING -----------
//     // Score = percentage of answered questions in each section
//     const analysisData = questionnaire.map(section => {
//       const title = section.title || "Untitled Section";
//       const questions = Array.isArray(section.questions) ? section.questions : [];
//       const total = questions.length;
//       const responsesForSection = (userResponses && userResponses[title]) ? userResponses[title] : {};
//       const answered = Object.values(responsesForSection).reduce((acc, a) => {
//         if (a === null || a === undefined) return acc;
//         if (typeof a === "string" && a.trim() === "") return acc;
//         return acc + 1;
//       }, 0);
//       const score = total > 0 ? Math.round((answered / total) * 100) : 0;
//       return { category: title, score, totalQuestions: total, answeredCount: answered };
//     });

//     const categoryLabels = analysisData.map(d => d.category);
//     const categoryScores = analysisData.map(d => d.score);
//     const trendPoints = analysisData.map((d, i) => ({ label: d.category, x: i + 1, y: d.answeredCount }));

//     // --------------- CREATE & RENDER CHARTS --------------
//     // We'll create canvases, render Chart.js charts, convert to dataURL.
//     // Use reasonably large canvas size for quality.
//     const createCanvas = (w = 1000, h = 700) => {
//       const c = document.createElement("canvas");
//       c.width = w;
//       c.height = h;
//       // keep canvas detached (like original). Chart.js can render off-DOM in most environments.
//       c.style.display = "block";
//       return c;
//     };

//     // Bar chart canvas
//     const barCanvas = createCanvas(1100, 600);
//     const barChart = new Chart(barCanvas.getContext("2d"), {
//       type: "bar",
//       data: {
//         labels: categoryLabels,
//         datasets: [{
//           label: "Assessment Score",
//           data: categoryScores,
//           backgroundColor: categoryLabels.map((_, i) => `rgba(${54 + i*12 % 180}, ${162 + i*8 % 80}, ${235 - i*6 % 120}, 0.8)`),
//           borderColor: categoryLabels.map((_, i) => `rgba(${54 + i*12 % 180}, ${162 + i*8 % 80}, ${235 - i*6 % 120}, 1)`),
//           borderWidth: 2
//         }]
//       },
//       options: {
//         responsive: false,
//         maintainAspectRatio: false,
//         plugins: {
//           title: { display: true, text: "Assessment Results by Category", font: { size: 16 } },
//           legend: { display: false }
//         },
//         scales: {
//           y: { beginAtZero: true, max: 100, title: { display: true, text: "Score (%)" } },
//           x: { title: { display: true, text: "Assessment Categories" } }
//         }
//       }
//     });

//     // Radar chart canvas
//     const radarCanvas = createCanvas(1100, 700);
//     const radarChart = new Chart(radarCanvas.getContext("2d"), {
//       type: "radar",
//       data: {
//         labels: categoryLabels,
//         datasets: [{
//           label: "Competency",
//           data: categoryScores,
//           backgroundColor: "rgba(102,126,234,0.25)",
//           borderColor: "rgba(102,126,234,1)",
//           borderWidth: 2,
//           pointBackgroundColor: "rgba(102,126,234,1)"
//         }]
//       },
//       options: {
//         responsive: false,
//         maintainAspectRatio: false,
//         scales: {
//           r: {
//             suggestedMin: 0,
//             suggestedMax: 100,
//             ticks: { stepSize: 20 },
//             grid: { color: 'rgba(0,0,0,0.06)' }
//           }
//         },
//         plugins: {
//           title: { display: true, text: "Radar — Competency by Category", font: { size: 16 } },
//           legend: { display: false }
//         }
//       }
//     });

//     // Line chart canvas (trend)
//     const lineCanvas = createCanvas(1100, 450);
//     const lineChart = new Chart(lineCanvas.getContext("2d"), {
//       type: "line",
//       data: {
//         labels: trendPoints.map(p => p.label),
//         datasets: [{
//           label: "Answered Count",
//           data: trendPoints.map(p => p.y),
//           fill: false,
//           tension: 0.25,
//           borderWidth: 2,
//           pointRadius: 3,
//           borderColor: "rgba(75,192,192,1)"
//         }]
//       },
//       options: {
//         responsive: false,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true, ticks: { precision: 0 }, title: { display: true, text: "Answered Count" } },
//           x: { title: { display: true, text: "Sections" } }
//         },
//         plugins: { title: { display: true, text: "Trend — Responses by Section", font: { size: 16 } }, legend: { display: false } }
//       }
//     });

//     // wait so Chart.js finishes painting
//     await new Promise(resolve => setTimeout(resolve, 450));

//     // Convert canvases to data URLs
//     const barDataUrl = barCanvas.toDataURL("image/png");
//     const radarDataUrl = radarCanvas.toDataURL("image/png");
//     const lineDataUrl = lineCanvas.toDataURL("image/png");

//     // Destroy charts and let canvases be garbage collected
//     try { barChart.destroy(); } catch(e) {}
//     try { radarChart.destroy(); } catch(e) {}
//     try { lineChart.destroy(); } catch(e) {}

//     // --------------- Build responses HTML ----------------
//     const generateResponsesHTML = () => {
//       if (!userResponses || Object.keys(userResponses).length === 0) {
//         return '<p style="color: #666; font-style: italic;">No responses recorded.</p>';
//       }

//       let responsesHTML = '';
//       let sectionCount = 0;

//       Object.entries(userResponses).forEach(([section, questions]) => {
//         if (!questions || Object.keys(questions).length === 0) return;
//         sectionCount++;
//         responsesHTML += `
//           <div style="margin-bottom: 25px;">
//             <h3 style="color: #2c3e50; margin: 0 0 15px 0; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 5px;">
//               ${sectionCount}. ${escapeHtml(section)}
//             </h3>
//         `;
//         let questionCount = 0;
//         Object.entries(questions).forEach(([question, answer]) => {
//           questionCount++;
//           responsesHTML += `
//             <div style="margin: 12px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
//               <p style="margin: 0 0 8px 0; font-weight: bold; color: #2c3e50;">
//                 Q${questionCount}: ${escapeHtml(question)}
//               </p>
//               <p style="margin: 0; padding-left: 10px; color: #555;">
//                 <strong>Response:</strong> ${escapeHtml(answer || 'No response provided')}
//               </p>
//             </div>
//           `;
//         });
//         responsesHTML += `</div>`;
//       });

//       return responsesHTML || '<p style="color: #666; font-style: italic;">No detailed responses available.</p>';
//     };

//     const responsesHtml = generateResponsesHTML();
//     const totalResponsesCount = Object.keys(userResponses).reduce((total, section) => total + Object.keys(userResponses[section] || {}).length, 0);

//     // --------------- AI FINAL ANALYSIS -------------------
//     let aiAnalysisText = safe(finalAnalysis || "").trim();
//     if (!aiAnalysisText) {
//       const prompt = [
//         "You are an expert analyst. Produce a concise (3-5 paragraph) executive analysis, key findings, and 5 prioritized actionable recommendations.",
//         "",
//         "Categories with scores (0-100):",
//         ...analysisData.map(d => `- ${d.category}: ${d.score}% (${d.answeredCount}/${d.totalQuestions} answered)`),
//         "",
//         "Tone: professional, concise, and actionable."
//       ].join("\n");

//       const OPENAI_KEY = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_OPENAI_API_KEY : undefined;
//       if (!OPENAI_KEY) {
//         aiAnalysisText = "AI analysis not available (missing NEXT_PUBLIC_OPENAI_API_KEY). Summary:\n\n" +
//           analysisData.map(d => `${d.category}: ${d.score}% (${d.answeredCount}/${d.totalQuestions})`).join("\n");
//       } else {
//         try {
//           const resp = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${OPENAI_KEY}`
//             },
//             body: JSON.stringify({
//               model: "gpt-3.5-turbo",
//               messages: [
//                 { role: "system", content: "You summarize assessment results and provide actionable recommendations." },
//                 { role: "user", content: prompt }
//               ],
//               max_tokens: 600,
//               temperature: 0.2
//             })
//           });

//           if (!resp.ok) {
//             const errText = await resp.text();
//             console.warn("OpenAI API error:", resp.status, errText);
//             aiAnalysisText = "AI analysis could not be generated (OpenAI API error). Summary:\n\n" +
//               analysisData.map(d => `${d.category}: ${d.score}% (${d.answeredCount}/${d.totalQuestions})`).join("\n");
//           } else {
//             const data = await resp.json();
//             aiAnalysisText = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
//             aiAnalysisText = aiAnalysisText.trim() || "AI returned empty analysis.";
//           }
//         } catch (err) {
//           console.warn("OpenAI call failed:", err);
//           aiAnalysisText = "AI analysis could not be generated (network or API error). Summary:\n\n" +
//             analysisData.map(d => `${d.category}: ${d.score}% (${d.answeredCount}/${d.totalQuestions})`).join("\n");
//         }
//       }
//     }

//     // --------------- BUILD HTML CONTENT (exact same approach as your original) --------------
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8" />
//         <style>
//           body { 
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
//             margin: 0; 
//             padding: 0; 
//             color: #333; 
//             line-height: 1.6; 
//             background: #f5f5f5;
//           }
//           .container { 
//             max-width: 1000px; 
//             margin: 0 auto; 
//             background: white; 
//             padding: 30px; 
//             box-shadow: 0 0 20px rgba(0,0,0,0.1);
//           }
//           .header { 
//             text-align: center; 
//             margin-bottom: 40px; 
//             padding-bottom: 20px; 
//             border-bottom: 3px solid #667eea; 
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             padding: 30px;
//             margin: -30px -30px 40px -30px;
//             border-radius: 0 0 10px 10px;
//           }
//           .section { 
//             margin-bottom: 40px; 
//             padding: 20px; 
//             background: #f8f9fa; 
//             border-radius: 10px; 
//             border-left: 5px solid #667eea;
//           }
//           .chart-container { 
//             text-align: center; 
//             margin: 30px 0; 
//             padding: 20px; 
//             background: white; 
//             border-radius: 10px; 
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//           }
//           .analysis-box { 
//             background: #e8f4fd; 
//             border: 1px solid #b3d9ff; 
//             border-radius: 8px; 
//             padding: 20px; 
//             margin: 20px 0; 
//             white-space: pre-wrap;
//             font-size: 14px;
//             line-height: 1.8;
//           }
//           .footer { 
//             text-align: center; 
//             margin-top: 40px; 
//             padding-top: 20px; 
//             border-top: 1px solid #ddd; 
//             color: #666; 
//             font-size: 12px;
//           }
//           h1 { margin: 0; font-size: 28px; }
//           h2 { color: #2c3e50; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #ecf0f1; }
//           .response-count { 
//             background: #667eea; 
//             color: white; 
//             padding: 3px 8px; 
//             border-radius: 12px; 
//             font-size: 12px; 
//             margin-left: 10px;
//           }
//           img.chart-img { max-width: 100%; height: auto; border-radius: 8px; display:block; margin: 0 auto; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Comprehensive Assessment Report</h1>
//             <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
//               Generated on ${escapeHtml(nowFormatted(language))} | Language: ${escapeHtml(language)}
//             </p>
//           </div>

//           <div class="section">
//             <h2>📊 Performance Summary 
//               <span class="response-count">${totalResponsesCount} Responses</span>
//             </h2>
//             <div class="chart-container">
//               <img class="chart-img" src="${barDataUrl}" alt="Bar Chart" />
//             </div>
//           </div>

//           <div class="section">
//             <h2>📈 Radar — Competency</h2>
//             <div class="chart-container">
//               <img class="chart-img" src="${radarDataUrl}" alt="Radar Chart" />
//             </div>
//           </div>

//           <div class="section">
//             <h2>📉 Analytics Trend — Responses by Section</h2>
//             <div class="chart-container">
//               <img class="chart-img" src="${lineDataUrl}" alt="Line Chart" />
//             </div>
//           </div>

//           <!-- <div class="section">
//             <h2>📝 Detailed Responses</h2>
//             ${responsesHtml}
//           </div>
//           -->

//           <div class="section">
//             <h2>🤖 AI Final Analysis</h2>
//             <div class="analysis-box">
//               ${renderMarkdown(aiAnalysisText)}
//             </div>
//           </div>

//           <div class="footer">
//             <p>Generated by AI Assessment Platform • Confidential Report • © ${new Date().getFullYear()}</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // --------------- CONVERT HTML TO PDF (same flow as your original) ---------------
//     // Use a detached contentElement (do NOT append to document) — your original approach.
//     const contentElement = document.createElement("div");
//     // Set a stable width on the element so layout matches what you expect
//     // contentElement.style.width = "1000px";
//     contentElement.style.width = "720px";
//     contentElement.innerHTML = htmlContent;

//     const pdfOptions = {
//       margin: 10,
//       filename: `assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
//       image: {
//         type: "jpeg",
//         quality: 0.98
//       },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       },
//       jsPDF: {
//         unit: 'mm',
//         format: 'a4',
//         orientation: 'portrait',
//         compress: true
//       }
//     };

//     // IMPORTANT: use the same direct-from-element call you had originally
//     await html2pdf().set(pdfOptions).from(contentElement).save();

//     console.log("📄 Report generated successfully with bar, radar, line charts and AI analysis.");
//     return true;
//   } catch (error) {
//     console.error("❌ Error generating report:", error);
//     throw new Error(`Failed to generate PDF report: ${error.message}`);
//   }
// };

// export default generateReport;

























// Models/ReportGenerator.jsx
"use client";
import { marked } from "marked";

export const generateReport = async (userResponses, questionnaire, language = "en-US", finalAnalysis = null) => {

  const safe = (v) => (v === undefined || v === null ? "" : String(v));
  const escapeHtml = (s) => safe(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const nowFormatted = (loc) => {
    try {
      return new Date().toLocaleDateString(loc || "en-US", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
    } catch { return new Date().toLocaleDateString(); }
  };

  // ----------- CALL OPENAI FOR SCORING -----------
  // const callOpenAIAPI = async (questionnaire, userResponses) => {
  //   const prompt = `
  //     You are a clinical scoring assistant. 
  //     Given the questionnaire and user responses, return scores 0-100 per category reflecting the user's well-being, health, and functioning.
  //     Only return STRICT JSON:
  //     {
  //       "scores": {
  //         "Aging Perspectives & Planning Ahead": number,
  //         "Physical Health, Pain & Nutrition": number,
  //         "Daily Living & Functional Abilities": number,
  //         "Mental Health & Social Connection": number,
  //         "Cognition & Decision-Making": number,
  //         "Technology, Home Environment & Safety": number,
  //         "Couple Dynamics (for partner or spouse)": number,
  //         "Caregiver Dynamics (for primary caregiver)": number
  //       }
  //     }
  //     Use the user's actual responses to determine the score. Higher score = better functioning.
  //   `;

  //   const payload = {
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "system", content: "You score assessments from 0-100 per category." },
  //       { role: "user", content: JSON.stringify({ questionnaire, userResponses }) + "\n\n" + prompt }
  //     ],
  //     temperature: 0.2,
  //     max_tokens: 400
  //   };

  //   try {
  //     const resp = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
  //       },
  //       body: JSON.stringify(payload)
  //     });
  //     const data = await resp.json();
  //     const content = data.choices?.[0]?.message?.content || null;
  //     const parsed = JSON.parse(content);
  //     return parsed.scores || null;
  //   } catch (err) {
  //     console.error("OpenAI scoring API error:", err);
  //     return null;
  //   }
  // };

  const callOpenAIAPI = async (questionnaire, userResponses) => {
    const prompt = `
      You are a scoring assistant.
      Given a questionnaire and user responses, assign a 0-100 score for each section.
      Higher score = better performance.
      Return STRICT JSON in this format:
      {
        "scores": {
          "Section Name 1": 0-100,
          "Section Name 2": 0-100,
          ...
        }
      }
      Use the section titles directly from the questionnaire.
    `;

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You score assessments dynamically per section." },
        { role: "user", content: JSON.stringify({ questionnaire, userResponses }) + "\n\n" + prompt }
      ],
      temperature: 0.2,
      max_tokens: 400
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    try {
      const content = data.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return parsed.scores;
    } catch {
      console.error("Failed to parse OpenAI response:", data);
      return null;
    }
  };

  // MARKDOWN RENDERER
  const renderMarkdown = (markdownText) => {
    const html = marked(markdownText, {
      breaks: true,
    });
    return html;
  };
  // MARKDOWN RENDERER


  try {
    const [html2pdfModule, ChartModule] = await Promise.all([
      import("html2pdf.js"),
      import("chart.js/auto")
    ]);
    const html2pdf = html2pdfModule.default || html2pdfModule;
    const Chart = ChartModule.default || ChartModule;

    // ----------- GET SCORES FOR CHARTS -----------
    const scores = await callOpenAIAPI(questionnaire, userResponses);

    // fallback if OpenAI fails
    const analysisData = questionnaire.map(section => {
      const title = section.title || "Untitled";
      return { category: title, score: scores?.[title] ?? 0 };
    });

    const categoryLabels = analysisData.map(d => d.category);
    const categoryScores = analysisData.map(d => d.score);

    // ----------- CREATE CANVAS CHARTS -----------
    const createCanvas = (w = 1000, h = 700) => {
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      c.style.display = "block";
      return c;
    };

    const barCanvas = createCanvas(1100, 600);
    new Chart(barCanvas.getContext("2d"), {
      type: "bar",
      data: { labels: categoryLabels, datasets: [{ label: "Score", data: categoryScores, backgroundColor: categoryLabels.map((_,i)=>`rgba(${50+i*20%180},${162+i*8%80},${235-i*6%120},0.7)`), borderColor: "#667eea", borderWidth: 2 }] },
      options: { responsive:false, scales:{y:{beginAtZero:true,max:100}}, plugins:{title:{display:true,text:"Assessment Scores by Category"},legend:{display:false}} }
    });

    const radarCanvas = createCanvas(1100,700);
    new Chart(radarCanvas.getContext("2d"), {
      type:"radar",
      data:{ labels: categoryLabels, datasets:[{ label:"Competency", data:categoryScores, backgroundColor:"rgba(102,126,234,0.25)", borderColor:"rgba(102,126,234,1)", borderWidth:2 }] },
      options:{ responsive:false, scales:{r:{suggestedMin:0,suggestedMax:100,ticks:{stepSize:20}}}, plugins:{title:{display:true,text:"Radar — Competency by Category"},legend:{display:false}} }
    });

    const lineCanvas = createCanvas(1100,450);
    new Chart(lineCanvas.getContext("2d"), {
      type:"line",
      data:{ labels:categoryLabels,datasets:[{label:"Score",data:categoryScores,fill:false,tension:0.3,borderColor:"rgba(75,192,192,1)",borderWidth:2,pointRadius:3}] },
      options:{ responsive:false, scales:{y:{beginAtZero:true,max:100},x:{}}, plugins:{title:{display:true,text:"Trend — Scores by Section"},legend:{display:false}} }
    });

    await new Promise(res=>setTimeout(res,400));
    const barDataUrl = barCanvas.toDataURL("image/png");
    const radarDataUrl = radarCanvas.toDataURL("image/png");
    const lineDataUrl = lineCanvas.toDataURL("image/png");

    // ----------- Build responses HTML -----------
    const generateResponsesHTML = () => {
      if(!userResponses || Object.keys(userResponses).length===0) return '<p style="color:#666;font-style:italic;">No responses recorded.</p>';
      let html='';
      let sectionCount=0;
      Object.entries(userResponses).forEach(([section, questions])=>{
        if(!questions) return;
        sectionCount++;
        html+=`<div style="margin-bottom:25px;"><h3 style="margin:0 0 15px 0;padding:10px;background:#667eea;color:white;border-radius:5px;">${sectionCount}. ${escapeHtml(section)}</h3>`;
        let qCount=0;
        Object.entries(questions).forEach(([q,a])=>{
          qCount++;
          html+=`<div style="margin:12px 0;padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #667eea;"><p style="margin:0 0 8px 0;font-weight:bold;color:#2c3e50;">Q${qCount}: ${escapeHtml(q)}</p><p style="margin:0;padding-left:10px;color:#555;"><strong>Response:</strong> ${escapeHtml(a||'No response')}</p></div>`;
        });
        html+='</div>';
      });
      return html;
    };

    const responsesHtml = generateResponsesHTML();

    // ----------- AI FINAL ANALYSIS -----------
    let aiAnalysisText = safe(finalAnalysis||"");
    if(!aiAnalysisText){
      // const prompt = [
      //   "You are an expert analyst. Produce a concise (3-5 paragraph) executive analysis, key findings, and 5 prioritized actionable recommendations.",
      //   "Categories with scores (0-100):",
      //   ...analysisData.map(d=>`- ${d.category}: ${d.score}%`),
      //   "Tone: professional, concise, and actionable."
      // ].join("\n");

      const detailedAnalysisPrompt = `
        You are an expert geriatric assessment analyst.
        You are given:

        1. Questionnaire sections with user responses.
        2. Scores for each section (0-100), higher is better.

        Your task:
        - Provide a **concise 3-5 paragraph executive summary**.
        - Highlight **key findings per section**.
        - Give **5 prioritized actionable recommendations** for improving overall well-being.
        - Use a professional and compassionate tone.

        Questionnaire:
        ${JSON.stringify(questionnaire, null, 2)}

        Responses:
        ${JSON.stringify(userResponses, null, 2)}

        Section Scores:
        ${analysisData.map(d=>`- ${d.category}: ${d.score}%`).join("\n")}
        `;

      try{
        const resp = await fetch("https://api.openai.com/v1/chat/completions",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          },
          body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"system",content:"You summarize assessment results and provide actionable recommendations."},{role:"user",content:detailedAnalysisPrompt}],temperature:0.4,max_tokens:900})
        });
        const data = await resp.json();
        aiAnalysisText = data.choices?.[0]?.message?.content || "AI returned empty analysis.";
      }catch(err){aiAnalysisText="AI analysis could not be generated.";}
    }

    // ----------- BUILD HTML CONTENT -----------
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"/><style>
      body{font-family:'Segoe UI',sans-serif;margin:0;padding:0;background:#f5f5f5;color:#333;line-height:1.6}
      .container{max-width:1000px;margin:0 auto;background:white;padding:30px;box-shadow:0 0 20px rgba(0,0,0,0.1)}
      .header{text-align:center;margin-bottom:40px;padding-bottom:20px;border-bottom:3px solid #667eea;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;margin:-30px -30px 40px -30px;border-radius:0 0 10px 10px}
      .section{margin-bottom:40px;padding:20px;background:#f8f9fa;border-radius:10px;border-left:5px solid #667eea}
      .chart-container{text-align:center;margin:30px 0;padding:20px;background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
      .analysis-box{background:#e8f4fd;border:1px solid #b3d9ff;border-radius:8px;padding:20px;margin:20px 0;white-space:pre-wrap;font-size:14px;line-height:1.8}
      .footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #ddd;color:#666;font-size:12px}
      h1{margin:0;font-size:28px} h2{color:#2c3e50;margin-bottom:20px;padding-bottom:10px;border-bottom:2px solid #ecf0f1} .chart-img{max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto}
      </style></head>
      <body>
        <div class="container">
          <div class="header"><h1>Comprehensive Assessment Report</h1><p style="margin:10px 0 0 0;opacity:0.9;font-size:16px;">Generated on ${escapeHtml(nowFormatted(language))} | Language: ${escapeHtml(language)}</p></div>

          <div class="section"><h2>📊 Performance Summary</h2><div class="chart-container"><img class="chart-img" src="${barDataUrl}" alt="Bar Chart"/></div></div>
          <div class="section"><h2>📈 Radar — Competency</h2><div class="chart-container"><img class="chart-img" src="${radarDataUrl}" alt="Radar Chart"/></div></div>
          <div class="section"><h2>📉 Trend — Scores by Section</h2><div class="chart-container"><img class="chart-img" src="${lineDataUrl}" alt="Line Chart"/></div></div>

          <!-- <div class="section"><h2>📝 Detailed Responses</h2>${responsesHtml}</div> -->

          <div class="section"><h2>🤖 AI Final Analysis</h2><div class="analysis-box">${marked(aiAnalysisText)}</div></div>

          <div class="footer"><p>Generated by AI Assessment Platform • Confidential Report • © ${new Date().getFullYear()}</p></div>
        </div>
      </body>
      </html>
    `;

    // ----------- PDF GENERATION -----------
    const contentElement = document.createElement("div");
    contentElement.style.width = "720px";
    contentElement.innerHTML = htmlContent;

    await html2pdf().set({
      margin:10,
      filename:`assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
      image:{type:"jpeg",quality:0.98},
      html2canvas:{scale:2,useCORS:true,logging:false,backgroundColor:'#ffffff'},
      jsPDF:{unit:'mm',format:'a4',orientation:'portrait',compress:true}
    }).from(contentElement).save();

    console.log("📄 Report generated successfully with proper scores and AI analysis.");
    return true;

  } catch (error) {
    console.error("❌ Error generating report:", error);
    throw new Error(`Failed to generate PDF report: ${error.message}`);
  }
};

export default generateReport;
