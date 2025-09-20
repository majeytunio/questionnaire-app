import { Chart } from 'chart.js/auto';

// Function to generate radar chart as image
export const generateRadarChart = async (data) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 10
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Skill Assessment Radar'
          }
        }
      }
    });
    
    // Return the chart as image data
    setTimeout(() => {
      resolve(canvas.toDataURL('image/png'));
    }, 100);
  });
};

// Function to generate bar chart as image
export const generateBarChart = async (data) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Questions per Section'
          }
        }
      }
    });
    
    // Return the chart as image data
    setTimeout(() => {
      resolve(canvas.toDataURL('image/png'));
    }, 100);
  });
};