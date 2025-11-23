/**
 * Charts Module - Handles all chart initialization and configuration
 */

function initializeCharts() {
  // Subscriptions Chart (Bar Chart)
  const subscriptionsCtx = document.getElementById("subscriptionsChart");
  if (subscriptionsCtx) {
    new Chart(subscriptionsCtx, {
      type: "bar",
      data: {
        labels: ["240", "300", "200", "278", "189", "239", "278", "189"],
        datasets: [
          {
            data: [240, 300, 200, 278, 189, 239, 278, 189],
            backgroundColor: "#0f172a",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
        elements: {
          bar: {
            borderWidth: 0,
          },
        },
      },
    });
  }

  // Revenue Chart (Line Chart)
  const revenueCtx = document.getElementById("revenueChart");
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [
          {
            data: [1200, 1900, 1500, 2100, 1800, 2400, 2200, 2600, 2300, 2800, 2500],
            borderColor: "#0f172a",
            backgroundColor: "transparent",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#0f172a",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 6,
          },
        },
      },
    });
  }

  // API Performance Chart (Multi-line Chart)
  const exerciseCtx = document.getElementById("exerciseChart");
  if (exerciseCtx) {
    new Chart(exerciseCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Response Time (ms)",
            data: [120, 95, 150, 85, 110, 140, 100],
            borderColor: "#0f172a",
            backgroundColor: "transparent",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#0f172a",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "API Calls",
            data: [2400, 2800, 2200, 3200, 2900, 2600, 2100],
            borderColor: "#94a3b8",
            backgroundColor: "transparent",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#94a3b8",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "Error Rate (%)",
            data: [0.5, 0.3, 0.8, 0.2, 0.4, 0.6, 0.3],
            borderColor: "#cbd5e1",
            backgroundColor: "transparent",
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#cbd5e1",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 6,
          },
        },
      },
    });
  }
}
