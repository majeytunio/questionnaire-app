import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generateRadarChart, generateBarChart } from './ChartGenerator';

// Function to generate PDF report
export const generateReport = async (userResponses, language) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Assessment Report', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
  
  let yPosition = 40;
  
  // Add user responses
  doc.setFontSize(16);
  doc.text('Responses Summary', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  Object.entries(userResponses).forEach(([section, questions]) => {
    // Add section title
    doc.setFont(undefined, 'bold');
    doc.text(section, 20, yPosition);
    yPosition += 7;
    
    // Add questions and answers
    doc.setFont(undefined, 'normal');
    Object.entries(questions).forEach(([question, answer]) => {
      const questionText = doc.splitTextToSize(`Q: ${question}`, 170);
      const answerText = doc.splitTextToSize(`A: ${answer}`, 170);
      
      // Check if we need a new page
      if (yPosition + questionText.length * 5 + answerText.length * 5 > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(questionText, 20, yPosition);
      yPosition += questionText.length * 5;
      doc.text(answerText, 25, yPosition);
      yPosition += answerText.length * 5 + 5;
    });
    
    yPosition += 5;
  });
  
  // Add a new page for charts
  doc.addPage();
  yPosition = 20;
  
  // Add charts section title
  doc.setFontSize(16);
  doc.text('Visual Analysis', 105, yPosition, { align: 'center' });
  yPosition += 15;
  
  try {
    // Generate and add radar chart
    const radarChartData = generateRadarChartData(userResponses);
    const radarChartImg = await generateRadarChart(radarChartData);
    doc.addImage(radarChartImg, 'PNG', 20, yPosition, 80, 80);
    
    // Generate and add bar chart
    const barChartData = generateBarChartData(userResponses);
    const barChartImg = await generateBarChart(barChartData);
    doc.addImage(barChartImg, 'PNG', 110, yPosition, 80, 80);
    
    yPosition += 90;
  } catch (error) {
    console.error('Error generating charts:', error);
    doc.text('Charts could not be generated', 20, yPosition);
    yPosition += 10;
  }
  
  // Add insights and recommendations
  doc.setFontSize(16);
  doc.text('Key Insights & Recommendations', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(10);
  const insights = generateInsights(userResponses);
  const insightText = doc.splitTextToSize(insights, 170);
  doc.text(insightText, 20, yPosition);
  
  // Save the PDF
  doc.save('assessment-report.pdf');
};

// Helper function to generate radar chart data from responses
const generateRadarChartData = (userResponses) => {
  // This is a simplified example - you would need to map your actual questions to categories
  const categories = {
    'Technical Skills': 0,
    'Communication': 0,
    'Problem Solving': 0,
    'Creativity': 0,
    'Teamwork': 0
  };
  
  const responseCount = Object.values(userResponses).reduce((acc, section) => 
    acc + Object.keys(section).length, 0
  );
  
  // Simple scoring mechanism - in a real app, you'd have a more sophisticated approach
  Object.values(userResponses).forEach(section => {
    Object.values(section).forEach(answer => {
      const answerLength = answer.length;
      if (answerLength > 50) categories['Communication'] += 2;
      if (answerLength > 30) categories['Technical Skills'] += 1;
      if (answer.toLowerCase().includes('solve') || answer.toLowerCase().includes('solution')) 
        categories['Problem Solving'] += 2;
      if (answer.toLowerCase().includes('team') || answer.toLowerCase().includes('collaborate')) 
        categories['Teamwork'] += 2;
      if (answer.toLowerCase().includes('idea') || answer.toLowerCase().includes('creative')) 
        categories['Creativity'] += 2;
    });
  });
  
  // Normalize scores
  Object.keys(categories).forEach(key => {
    categories[key] = Math.min(10, categories[key] / (responseCount / 5));
  });
  
  return {
    labels: Object.keys(categories),
    datasets: [{
      label: 'Skill Assessment',
      data: Object.values(categories),
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };
};

// Helper function to generate bar chart data
const generateBarChartData = (userResponses) => {
  const sections = Object.keys(userResponses);
  const responseCounts = sections.map(section => Object.keys(userResponses[section]).length);
  
  return {
    labels: sections,
    datasets: [{
      label: 'Questions per Section',
      data: responseCounts,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  };
};

// Helper function to generate insights from responses
const generateInsights = (userResponses) => {
  // Simple insight generation - in a real app, you'd use more sophisticated analysis
  let totalLength = 0;
  let responseCount = 0;
  
  Object.values(userResponses).forEach(section => {
    Object.values(section).forEach(answer => {
      totalLength += answer.length;
      responseCount++;
    });
  });
  
  const avgLength = totalLength / responseCount;
  
  let insights = "Based on your assessment responses:\n\n";
  
  if (avgLength > 100) {
    insights += "- You provide detailed and comprehensive answers, demonstrating strong communication skills.\n";
  } else if (avgLength > 50) {
    insights += "- Your responses are concise yet informative, showing good communication efficiency.\n";
  } else {
    insights += "- Consider providing more detailed responses to better showcase your knowledge and experience.\n";
  }
  
  insights += "\nRecommendations:\n";
  insights += "- Continue developing your skills in areas where you showed strength.\n";
  insights += "- Consider additional training or practice in areas with lower scores.\n";
  insights += "- Your responses indicate good potential for growth and development.\n";
  
  return insights;
};