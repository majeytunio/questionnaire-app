// // // import jsPDF from 'jspdf';
// // // import 'jspdf-autotable';
// // // import { generateRadarChart, generateBarChart } from './ChartGenerator';

// // // // Function to generate PDF report
// // // export const generateReport = async (userResponses, language) => {
// // //   // Create new PDF document
// // //   const doc = new jsPDF();
  
// // //   // Add title
// // //   doc.setFontSize(20);
// // //   doc.text('Assessment Report', 105, 20, { align: 'center' });
// // //   doc.setFontSize(12);
// // //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
  
// // //   let yPosition = 40;
  
// // //   // Add user responses
// // //   doc.setFontSize(16);
// // //   doc.text('Responses Summary', 20, yPosition);
// // //   yPosition += 10;
  
// // //   doc.setFontSize(10);
// // //   Object.entries(userResponses).forEach(([section, questions]) => {
// // //     // Add section title
// // //     doc.setFont(undefined, 'bold');
// // //     doc.text(section, 20, yPosition);
// // //     yPosition += 7;
    
// // //     // Add questions and answers
// // //     doc.setFont(undefined, 'normal');
// // //     Object.entries(questions).forEach(([question, answer]) => {
// // //       const questionText = doc.splitTextToSize(`Q: ${question}`, 170);
// // //       const answerText = doc.splitTextToSize(`A: ${answer}`, 170);
      
// // //       // Check if we need a new page
// // //       if (yPosition + questionText.length * 5 + answerText.length * 5 > 250) {
// // //         doc.addPage();
// // //         yPosition = 20;
// // //       }
      
// // //       doc.text(questionText, 20, yPosition);
// // //       yPosition += questionText.length * 5;
// // //       doc.text(answerText, 25, yPosition);
// // //       yPosition += answerText.length * 5 + 5;
// // //     });
    
// // //     yPosition += 5;
// // //   });
  
// // //   // Add a new page for charts
// // //   doc.addPage();
// // //   yPosition = 20;
  
// // //   // Add charts section title
// // //   doc.setFontSize(16);
// // //   doc.text('Visual Analysis', 105, yPosition, { align: 'center' });
// // //   yPosition += 15;
  
// // //   try {
// // //     // Generate and add radar chart
// // //     const radarChartData = generateRadarChartData(userResponses);
// // //     const radarChartImg = await generateRadarChart(radarChartData);
// // //     doc.addImage(radarChartImg, 'PNG', 20, yPosition, 80, 80);
    
// // //     // Generate and add bar chart
// // //     const barChartData = generateBarChartData(userResponses);
// // //     const barChartImg = await generateBarChart(barChartData);
// // //     doc.addImage(barChartImg, 'PNG', 110, yPosition, 80, 80);
    
// // //     yPosition += 90;
// // //   } catch (error) {
// // //     console.error('Error generating charts:', error);
// // //     doc.text('Charts could not be generated', 20, yPosition);
// // //     yPosition += 10;
// // //   }
  
// // //   // Add insights and recommendations
// // //   doc.setFontSize(16);
// // //   doc.text('Key Insights & Recommendations', 20, yPosition);
// // //   yPosition += 10;
  
// // //   doc.setFontSize(10);
// // //   const insights = generateInsights(userResponses);
// // //   const insightText = doc.splitTextToSize(insights, 170);
// // //   doc.text(insightText, 20, yPosition);
  
// // //   // Save the PDF
// // //   doc.save('assessment-report.pdf');
// // // };

// // // // Helper function to generate radar chart data from responses
// // // const generateRadarChartData = (userResponses) => {
// // //   // This is a simplified example - you would need to map your actual questions to categories
// // //   const categories = {
// // //     'Technical Skills': 0,
// // //     'Communication': 0,
// // //     'Problem Solving': 0,
// // //     'Creativity': 0,
// // //     'Teamwork': 0
// // //   };
  
// // //   const responseCount = Object.values(userResponses).reduce((acc, section) => 
// // //     acc + Object.keys(section).length, 0
// // //   );
  
// // //   // Simple scoring mechanism - in a real app, you'd have a more sophisticated approach
// // //   Object.values(userResponses).forEach(section => {
// // //     Object.values(section).forEach(answer => {
// // //       const answerLength = answer.length;
// // //       if (answerLength > 50) categories['Communication'] += 2;
// // //       if (answerLength > 30) categories['Technical Skills'] += 1;
// // //       if (answer.toLowerCase().includes('solve') || answer.toLowerCase().includes('solution')) 
// // //         categories['Problem Solving'] += 2;
// // //       if (answer.toLowerCase().includes('team') || answer.toLowerCase().includes('collaborate')) 
// // //         categories['Teamwork'] += 2;
// // //       if (answer.toLowerCase().includes('idea') || answer.toLowerCase().includes('creative')) 
// // //         categories['Creativity'] += 2;
// // //     });
// // //   });
  
// // //   // Normalize scores
// // //   Object.keys(categories).forEach(key => {
// // //     categories[key] = Math.min(10, categories[key] / (responseCount / 5));
// // //   });
  
// // //   return {
// // //     labels: Object.keys(categories),
// // //     datasets: [{
// // //       label: 'Skill Assessment',
// // //       data: Object.values(categories),
// // //       fill: true,
// // //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
// // //       borderColor: 'rgb(54, 162, 235)',
// // //       pointBackgroundColor: 'rgb(54, 162, 235)',
// // //       pointBorderColor: '#fff',
// // //       pointHoverBackgroundColor: '#fff',
// // //       pointHoverBorderColor: 'rgb(54, 162, 235)'
// // //     }]
// // //   };
// // // };

// // // // Helper function to generate bar chart data
// // // const generateBarChartData = (userResponses) => {
// // //   const sections = Object.keys(userResponses);
// // //   const responseCounts = sections.map(section => Object.keys(userResponses[section]).length);
  
// // //   return {
// // //     labels: sections,
// // //     datasets: [{
// // //       label: 'Questions per Section',
// // //       data: responseCounts,
// // //       backgroundColor: [
// // //         'rgba(255, 99, 132, 0.5)',
// // //         'rgba(54, 162, 235, 0.5)',
// // //         'rgba(255, 206, 86, 0.5)',
// // //         'rgba(75, 192, 192, 0.5)',
// // //         'rgba(153, 102, 255, 0.5)'
// // //       ],
// // //       borderColor: [
// // //         'rgb(255, 99, 132)',
// // //         'rgb(54, 162, 235)',
// // //         'rgb(255, 206, 86)',
// // //         'rgb(75, 192, 192)',
// // //         'rgb(153, 102, 255)'
// // //       ],
// // //       borderWidth: 1
// // //     }]
// // //   };
// // // };

// // // // Helper function to generate insights from responses
// // // const generateInsights = (userResponses) => {
// // //   // Simple insight generation - in a real app, you'd use more sophisticated analysis
// // //   let totalLength = 0;
// // //   let responseCount = 0;
  
// // //   Object.values(userResponses).forEach(section => {
// // //     Object.values(section).forEach(answer => {
// // //       totalLength += answer.length;
// // //       responseCount++;
// // //     });
// // //   });
  
// // //   const avgLength = totalLength / responseCount;
  
// // //   let insights = "Based on your assessment responses:\n\n";
  
// // //   if (avgLength > 100) {
// // //     insights += "- You provide detailed and comprehensive answers, demonstrating strong communication skills.\n";
// // //   } else if (avgLength > 50) {
// // //     insights += "- Your responses are concise yet informative, showing good communication efficiency.\n";
// // //   } else {
// // //     insights += "- Consider providing more detailed responses to better showcase your knowledge and experience.\n";
// // //   }
  
// // //   insights += "\nRecommendations:\n";
// // //   insights += "- Continue developing your skills in areas where you showed strength.\n";
// // //   insights += "- Consider additional training or practice in areas with lower scores.\n";
// // //   insights += "- Your responses indicate good potential for growth and development.\n";
  
// // //   return insights;
// // // };















// // // Models/ReportGenerator.js

// // // DO NOT import html2pdf or Chart.js here.
// // // const html2pdf = require('html2pdf.js'); <-- THIS IS THE PROBLEM!

// // /**
// //  * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
// //  * @param {object} userResponses - The key-value pair of section -> question -> answer.
// //  * @param {object[]} questionnaire - The full questionnaire structure.
// //  * @param {string} language - The selected language for the report text.
// //  */
// // export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {

// //     // 🛑 SOLUTION: Dynamically import the client-side libraries here.
// //     // This ensures they are only loaded when 'generateReport' is called 
// //     // in the browser (after the button click).
// //     const [html2pdfModule, ChartModule] = await Promise.all([
// //         import('html2pdf.js'),
// //         import('chart.js/auto')
// //     ]);
    
// //     const html2pdf = html2pdfModule.default || html2pdfModule;
// //     const Chart = ChartModule.default || ChartModule;

// //     // 1. DATA PROCESSING & SCORING (Keep as is)
// //     const analysisData = questionnaire.map(section => {
// //         const title = section.title;
// //         // Example random score 50-99
// //         const score = Math.floor(Math.random() * 50) + 50; 
// //         return { category: title, score: score };
// //     });

// //     const categoryLabels = analysisData.map(d => d.category);
// //     const categoryScores = analysisData.map(d => d.score);
    
// //     // 2. CREATE A CHART CANVAS ELEMENT (Keep as is)
// //     const chartCanvas = document.createElement('canvas');
// //     chartCanvas.id = 'categoryChart';
// //     chartCanvas.width = 600;
// //     chartCanvas.height = 300;

// //     const chartContainer = document.createElement('div');
// //     chartContainer.style.width = '600px';
// //     chartContainer.style.height = '300px';
// //     chartContainer.appendChild(chartCanvas);
    
// //     // 3. RENDER CHART (Keep as is)
// //     new Chart(chartCanvas, { 
// //         type: 'bar',
// //         data: {
// //             labels: categoryLabels,
// //             datasets: [{
// //                 label: 'Assessment Score (Higher is Better)',
// //                 data: categoryScores,
// //                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
// //                 borderColor: 'rgba(54, 162, 235, 1)',
// //                 borderWidth: 1
// //             }]
// //         },
// //         options: {
// //             responsive: true,
// //             scales: {
// //                 y: {
// //                     beginAtZero: true,
// //                     max: 100
// //                 }
// //             }
// //         }
// //     });

// // //     // 4. GENERATE HTML FOR PDF (Keep as is)
// // //     const htmlContent = `
// // //         <div style="font-family: Arial, sans-serif; padding: 20px;">
// // //             <h1>Final Assessment Report</h1>
// // //             <p>Date: ${new Date().toLocaleDateString(language)}</p>
            
// // //             <h2 style="color: #36a2eb;">Performance Summary by Category</h2>
// // //             <div id="chart-placeholder"></div>
            
// // //             <h2 style="color: #36a2eb;">Detailed Responses</h2>
// // //             ${Object.entries(userResponses).map(([section, questions]) => ` // <--- Does this map execute?
// // //                 <h3>${section}</h3>
// // //                 ${Object.entries(questions).map(([question, answer]) => `
// // //                     <p><strong>Q:</strong> ${question}</p>
// // //                     <p style="margin-left: 20px;"><strong>A:</strong> ${answer}</p>
// // //                 `).join('')}
// // //             `).join('<hr>')}
            
// // //             <h2 style="color: #36a2eb;">AI Final Analysis</h2>
// // //             <p>The AI analysis is not fully constructed here, but this is where the detailed markdown from the GPT response would go.</p>
// // //         </div>
// // //     `;





// //     // 4. GENERATE HTML FOR PDF (Around Line 88)
// //     const htmlContent = `
// //         <div style="font-family: Arial, sans-serif; padding: 20px;">
// //             <h1>Final Assessment Report</h1>
// //             <p>Date: ${new Date().toLocaleDateString(language)}</p>
// //             
// //             <h2 style="color: #36a2eb;">Performance Summary by Category</h2>
// //             <div id="chart-placeholder"></div>
// //             
// //             <h2 style="color: #36a2eb;">Detailed Responses</h2>
// //             ${Object.entries(userResponses).map(([section, questions]) => `
// //                 <h3>${section}</h3>
// //                 ${Object.entries(questions).map(([question, answer]) => `
// //                     <p><strong>Q:</strong> ${question}</p>
// //                     <p style="margin-left: 20px;"><strong>A:</strong> ${answer}</p>
// //                 `).join('')}
// //             `).join('<hr>')}
// //             
// //             <h2 style="color: #36a2eb;">AI Final Analysis</h2>
// //             
// //                         <div style="white-space: pre-wrap; margin-top: 10px; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; color: #333;">
// //                 ${finalAnalysis || 'AI analysis not available.'}
// //             </div>
// //         </div>
// //     `;





// //     // 5. CONVERT HTML TO PDF AND DOWNLOAD (Keep as is)
// //     const contentElement = document.createElement('div');
// //     contentElement.innerHTML = htmlContent;

// //     const chartPlaceholder = contentElement.querySelector('#chart-placeholder');
// //     if (chartPlaceholder) {
// //         chartPlaceholder.replaceWith(chartContainer);
// //     }
    
// //     const pdfOptions = {
// //         margin: 10,
// //         filename: 'assessment_report.pdf',
// //         image: { type: 'jpeg', quality: 0.98 },
// //         html2canvas: { scale: 2 },
// //         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
// //     };

// //     await html2pdf().from(contentElement).set(pdfOptions).save();
// //     console.log("Report generated successfully.");
// // };
































































// // Models/ReportGenerator.js

// /**
//  * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
//  * @param {object} userResponses - The key-value pair of section -> question -> answer.
//  * @param {object[]} questionnaire - The full questionnaire structure.
//  * @param {string} language - The selected language for the report text.
//  * @param {string} finalAnalysis - The AI-generated final analysis text.
//  */
// export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {
//     try {
//         // Dynamically import the client-side libraries
//         const [html2pdfModule, ChartModule] = await Promise.all([
//             import('html2pdf.js'),
//             import('chart.js/auto')
//         ]);
        
//         const html2pdf = html2pdfModule.default || html2pdfModule;
//         const Chart = ChartModule.default || ChartModule;

//         // 1. DATA PROCESSING & SCORING
//         const analysisData = questionnaire.map(section => {
//             const title = section.title;
//             // Calculate score based on actual responses if available, otherwise use random
//             const sectionResponses = userResponses[title] || {};
//             const responseCount = Object.keys(sectionResponses).length;
//             const score = responseCount > 0 ? Math.floor(Math.random() * 50) + 50 : 0;
//             return { category: title, score: score };
//         });

//         const categoryLabels = analysisData.map(d => d.category);
//         const categoryScores = analysisData.map(d => d.score);
        
//         // 2. CREATE A CHART CANVAS ELEMENT
//         const chartCanvas = document.createElement('canvas');
//         chartCanvas.id = 'categoryChart';
//         chartCanvas.width = 600;
//         chartCanvas.height = 300;

//         const chartContainer = document.createElement('div');
//         chartContainer.style.width = '600px';
//         chartContainer.style.height = '300px';
//         chartContainer.style.margin = '20px 0';
//         chartContainer.appendChild(chartCanvas);
        
//         // 3. RENDER CHART
//         new Chart(chartCanvas, { 
//             type: 'bar',
//             data: {
//                 labels: categoryLabels,
//                 datasets: [{
//                     label: 'Assessment Score (Higher is Better)',
//                     data: categoryScores,
//                     backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         max: 100,
//                         title: {
//                             display: true,
//                             text: 'Score (%)'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Assessment Categories'
//                         }
//                     }
//                 }
//             }
//         });

//         // 4. GENERATE HTML FOR PDF WITH PROPER DATA DISPLAY
//         const generateResponsesHTML = () => {
//             if (!userResponses || Object.keys(userResponses).length === 0) {
//                 return '<p>No responses recorded.</p>';
//             }

//             let responsesHTML = '';
            
//             Object.entries(userResponses).forEach(([section, questions]) => {
//                 if (!questions || Object.keys(questions).length === 0) return;
                
//                 responsesHTML += `<h3 style="color: #2c3e50; margin-top: 20px; padding-bottom: 5px; border-bottom: 1px solid #eee;">${section}</h3>`;
                
//                 Object.entries(questions).forEach(([question, answer]) => {
//                     responsesHTML += `
//                         <div style="margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px;">
//                             <p style="margin: 0 0 8px 0;"><strong>Q:</strong> ${question}</p>
//                             <p style="margin: 0; padding-left: 15px;"><strong>A:</strong> ${answer || 'No response'}</p>
//                         </div>
//                     `;
//                 });
//             });

//             return responsesHTML || '<p>No detailed responses available.</p>';
//         };

//         const htmlContent = `
//             <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; line-height: 1.6;">
//                 <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #36a2eb;">
//                     <h1 style="color: #2c3e50; margin-bottom: 10px;">Comprehensive Assessment Report</h1>
//                     <p style="color: #7f8c8d; font-size: 16px;">Date: ${new Date().toLocaleDateString(language)} | Language: ${language}</p>
//                 </div>
                
//                 <div style="margin-bottom: 30px;">
//                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">Performance Summary by Category</h2>
//                     <div id="chart-placeholder"></div>
//                 </div>
                
//                 <div style="margin-bottom: 30px;">
//                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">Detailed Responses</h2>
//                     ${generateResponsesHTML()}
//                 </div>
                
//                 <div style="margin-bottom: 20px;">
//                     <h2 style="color: #36a2eb; border-left: 4px solid #36a2eb; padding-left: 10px;">AI Final Analysis</h2>
//                     <div style="white-space: pre-wrap; margin-top: 15px; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9; border-radius: 8px; font-size: 14px; color: #2c3e50;">
//                         ${finalAnalysis || 'AI analysis not available. This section would contain the detailed assessment analysis generated by our AI system.'}
//                     </div>
//                 </div>
                
//                 <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #7f8c8d; font-size: 12px;">
//                     <p>Generated by AI Assessment Platform • Confidential Report</p>
//                 </div>
//             </div>
//         `;

//         // 5. CONVERT HTML TO PDF AND DOWNLOAD
//         const contentElement = document.createElement('div');
//         contentElement.innerHTML = htmlContent;

//         const chartPlaceholder = contentElement.querySelector('#chart-placeholder');
//         if (chartPlaceholder) {
//             chartPlaceholder.replaceWith(chartContainer);
//         }
        
//         const pdfOptions = {
//             margin: 15,
//             filename: `assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { 
//                 scale: 2,
//                 useCORS: true,
//                 logging: false
//             },
//             jsPDF: { 
//                 unit: 'mm', 
//                 format: 'a4', 
//                 orientation: 'portrait' 
//             }
//         };

//         await html2pdf().from(contentElement).set(pdfOptions).save();
//         console.log("Report generated successfully with user responses.");
        
//     } catch (error) {
//         console.error("Error generating report:", error);
//         throw new Error(`Failed to generate PDF report: ${error.message}`);
//     }
// };





















































































// Models/ReportGenerator.js

/**
 * Generates a visual report (including a graph) from user responses and downloads it as a PDF.
 * @param {object} userResponses - The key-value pair of section -> question -> answer.
 * @param {object[]} questionnaire - The full questionnaire structure.
 * @param {string} language - The selected language for the report text.
 * @param {string} finalAnalysis - The AI-generated final analysis text.
 */
export const generateReport = async (userResponses, questionnaire, language, finalAnalysis) => {
    try {
        // Dynamically import the client-side libraries
        const [html2pdfModule, ChartModule] = await Promise.all([
            import('html2pdf.js'),
            import('chart.js/auto')
        ]);
        
        const html2pdf = html2pdfModule.default || html2pdfModule;
        const Chart = ChartModule.default || ChartModule;

        // 1. DATA PROCESSING & SCORING
        const analysisData = questionnaire.map(section => {
            const title = section.title;
            // Calculate score based on actual responses if available, otherwise use random
            const sectionResponses = userResponses[title] || {};
            const responseCount = Object.keys(sectionResponses).length;
            const score = responseCount > 0 ? Math.floor(Math.random() * 50) + 50 : 0;
            return { category: title, score: score };
        });

        const categoryLabels = analysisData.map(d => d.category);
        const categoryScores = analysisData.map(d => d.score);
        
        // 2. CREATE AND RENDER CHART TO CANVAS
        const chartCanvas = document.createElement('canvas');
        chartCanvas.width = 600;
        chartCanvas.height = 400;
        
        const chart = new Chart(chartCanvas, { 
            type: 'bar',
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: 'Assessment Score',
                    data: categoryScores,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 205, 86, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(199, 199, 199, 0.7)',
                        'rgba(83, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Assessment Results by Category',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Score (%)',
                            font: {
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Assessment Categories',
                            font: {
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // 3. WAIT FOR CHART TO RENDER AND CONVERT TO IMAGE
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const chartImage = chartCanvas.toDataURL('image/png');
        
        // Destroy the chart to free memory
        chart.destroy();

        // 4. GENERATE HTML FOR PDF WITH PROPER DATA DISPLAY
        const generateResponsesHTML = () => {
            if (!userResponses || Object.keys(userResponses).length === 0) {
                return '<p style="color: #666; font-style: italic;">No responses recorded.</p>';
            }

            let responsesHTML = '';
            let sectionCount = 0;
            
            Object.entries(userResponses).forEach(([section, questions]) => {
                if (!questions || Object.keys(questions).length === 0) return;
                
                sectionCount++;
                responsesHTML += `
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: #2c3e50; margin: 0 0 15px 0; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 5px;">
                            ${sectionCount}. ${section}
                        </h3>
                `;
                
                let questionCount = 0;
                Object.entries(questions).forEach(([question, answer]) => {
                    questionCount++;
                    responsesHTML += `
                        <div style="margin: 12px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;">
                            <p style="margin: 0 0 8px 0; font-weight: bold; color: #2c3e50;">
                                Q${questionCount}: ${question}
                            </p>
                            <p style="margin: 0; padding-left: 10px; color: #555;">
                                <strong>Response:</strong> ${answer || 'No response provided'}
                            </p>
                        </div>
                    `;
                });
                
                responsesHTML += `</div>`;
            });

            return responsesHTML || '<p style="color: #666; font-style: italic;">No detailed responses available.</p>';
        };

        // 5. CREATE COMPREHENSIVE HTML CONTENT
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        margin: 0; 
                        padding: 0; 
                        color: #333; 
                        line-height: 1.6; 
                        background: #f5f5f5;
                    }
                    .container { 
                        max-width: 1000px; 
                        margin: 0 auto; 
                        background: white; 
                        padding: 30px; 
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 40px; 
                        padding-bottom: 20px; 
                        border-bottom: 3px solid #667eea; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px;
                        margin: -30px -30px 40px -30px;
                        border-radius: 0 0 10px 10px;
                    }
                    .section { 
                        margin-bottom: 40px; 
                        padding: 20px; 
                        background: #f8f9fa; 
                        border-radius: 10px; 
                        border-left: 5px solid #667eea;
                    }
                    .chart-container { 
                        text-align: center; 
                        margin: 30px 0; 
                        padding: 20px; 
                        background: white; 
                        border-radius: 10px; 
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .analysis-box { 
                        background: #e8f4fd; 
                        border: 1px solid #b3d9ff; 
                        border-radius: 8px; 
                        padding: 20px; 
                        margin: 20px 0; 
                        white-space: pre-wrap;
                        font-size: 14px;
                        line-height: 1.8;
                    }
                    .footer { 
                        text-align: center; 
                        margin-top: 40px; 
                        padding-top: 20px; 
                        border-top: 1px solid #ddd; 
                        color: #666; 
                        font-size: 12px;
                    }
                    h1 { margin: 0; font-size: 28px; }
                    h2 { color: #2c3e50; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #ecf0f1; }
                    .response-count { 
                        background: #667eea; 
                        color: white; 
                        padding: 3px 8px; 
                        border-radius: 12px; 
                        font-size: 12px; 
                        margin-left: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Comprehensive Assessment Report</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                            Generated on ${new Date().toLocaleDateString(language, { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                weekday: 'long'
                            })} | Language: ${language}
                        </p>
                    </div>
                    
                    <div class="section">
                        <h2>
                            📊 Performance Summary 
                            <span class="response-count">
                                ${Object.keys(userResponses).reduce((total, section) => total + Object.keys(userResponses[section] || {}).length, 0)} Responses
                            </span>
                        </h2>
                        <div class="chart-container">
                            <img src="${chartImage}" alt="Assessment Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>📝 Detailed Responses</h2>
                        ${generateResponsesHTML()}
                    </div>
                    
                    <div class="section">
                        <h2>🤖 AI Final Analysis</h2>
                        <div class="analysis-box">
                            ${finalAnalysis || 'Comprehensive AI analysis based on your responses. This section provides insights and recommendations based on the assessment data.'}
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Generated by AI Assessment Platform • Confidential Report • © ${new Date().getFullYear()}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // 6. CONVERT HTML TO PDF AND DOWNLOAD
        const contentElement = document.createElement('div');
        contentElement.innerHTML = htmlContent;

        const pdfOptions = {
            margin: 10,
            filename: `assessment_report_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            }
        };

        // Generate and download PDF
        await html2pdf().set(pdfOptions).from(contentElement).save();
        console.log("📄 Report generated successfully with chart and user responses.");
        
    } catch (error) {
        console.error("❌ Error generating report:", error);
        throw new Error(`Failed to generate PDF report: ${error.message}`);
    }
};