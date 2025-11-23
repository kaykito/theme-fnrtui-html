// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts
  initializeCharts();
  // Initialize table data
  initializePaymentsTable();
  // Add interactivity
  addEventListeners();
});

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

function initializePaymentsTable() {
  const tableBody = document.getElementById("paymentsTableBody");
  if (tableBody) {
    const payments = [
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        amount: "$250.00",
        status: "Sale",
      },
      {
        customer: "Olivia Smith",
        email: "olivia@example.com",
        amount: "$150.00",
        status: "Refund",
      },
      {
        customer: "Noah Williams",
        email: "noah@example.com",
        amount: "$350.00",
        status: "Subscription",
      },
      {
        customer: "Emma Brown",
        email: "emma@example.com",
        amount: "$450.00",
        status: "Sale",
      },
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        amount: "$550.00",
        status: "Sale",
      },
    ];

    payments.forEach((payment) => {
      const row = document.createElement("tr");
      const statusClasses = {
        sale: "bg-green-100 text-green-800",
        refund: "bg-yellow-100 text-yellow-800",
        subscription: "bg-blue-100 text-blue-800",
      };

      row.innerHTML = `
                <td class="py-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex-shrink-0"></div>
                        <span class="text-sm font-medium text-gray-900">${payment.customer}</span>
                    </div>
                </td>
                <td class="py-3 text-sm text-gray-600">${payment.email}</td>
                <td class="py-3 text-sm font-medium text-gray-900">${payment.amount}</td>
                <td class="py-3">
                    <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusClasses[payment.status.toLowerCase()]}">
                        ${payment.status}
                    </span>
                </td>
            `;
      tableBody.appendChild(row);
    });
  }
}

function addEventListeners() {
  // Add customer button
  const addMemberBtn = document.querySelector('button[class*="border-dashed"]');
  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", function () {
      alert("Add new customer functionality would be implemented here");
    });
  }

  // Send message button
  const sendBtn = document.querySelector(".bg-blue-600");
  const chatInput = document.querySelector('input[placeholder="Type your support question..."]');

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Payment method selection
  const paymentOptions = document.querySelectorAll(".cursor-pointer");
  paymentOptions.forEach((option) => {
    option.addEventListener("click", function () {
      paymentOptions.forEach((opt) => {
        opt.classList.remove("border-blue-200", "bg-blue-50");
        opt.classList.add("border-gray-200");
      });
      this.classList.remove("border-gray-200");
      this.classList.add("border-blue-200", "bg-blue-50");
    });
  });

  // Plan select changes
  const roleSelects = document.querySelectorAll(".role-select");
  roleSelects.forEach((select) => {
    select.addEventListener("change", function () {
      console.log("Plan changed to:", this.value);
    });
  });

  // Export button
  const exportBtn = document.querySelector("button:has(span)");
  if (exportBtn && exportBtn.textContent.includes("Export")) {
    exportBtn.addEventListener("click", function () {
      alert("Export functionality would be implemented here");
    });
  }

  // Download buttons
  const downloadBtns = document.querySelectorAll("button");
  const downloadButtons = Array.from(downloadBtns).filter(
    (btn) => btn.textContent.includes("Download") || btn.textContent.includes("Upgrade Now")
  );
  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Download functionality would be implemented here");
    });
  });

  // Search functionality
  const searchInputs = document.querySelectorAll('input[placeholder*="Filter"], input[placeholder*="Search"]');
  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Filter functionality would be implemented here
      console.log("Searching for:", this.value);
    });
  });
}

function sendMessage() {
  const chatInput = document.querySelector('input[placeholder="Type your support question..."]');
  const chatMessages = chatInput.closest(".flex").previousElementSibling;

  if (chatInput && chatMessages && chatInput.value.trim()) {
    const message = chatInput.value.trim();

    // Add user message
    const userBubble = document.createElement("div");
    userBubble.className = "flex justify-end fade-in";
    userBubble.innerHTML = `
            <div class="bg-gray-900 text-white px-4 py-2 rounded-lg rounded-br-sm max-w-xs">
                <p class="text-sm">${message}</p>
            </div>
        `;
    chatMessages.appendChild(userBubble);

    // Clear input
    chatInput.value = "";

    // Simulate response (you would replace this with actual chat functionality)
    setTimeout(() => {
      const responseText = getAutoResponse(message);
      const responseElement = document.createElement("p");
      responseElement.className = "text-sm text-gray-600";
      responseElement.textContent = responseText;
      chatMessages.appendChild(responseElement);

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function getAutoResponse(message) {
  const responses = [
    "Thank you for contacting support. How can I help you with your account today?",
    "I understand you're having an issue. Let me check your account details.",
    "That's a great question about our service. Let me provide you with the information you need.",
    "I'm here to help resolve your concern. Can you provide more details about the issue?",
    "Thank you for reaching out. Our support team will assist you with this matter.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

// Smooth animations for chat messages
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.3s ease;
    }
`;
document.head.appendChild(style);
