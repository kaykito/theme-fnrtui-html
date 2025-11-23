/**
 * Main Application Module - Initializes all components and handles global functionality
 */

// Main application initialization
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize charts
  try {
    if (typeof initializeCharts === "function") {
      initializeCharts();
    }
  } catch (e) {
    console.error(`Failed to initialize charts: ${e}`);
  }

  // Initialize table data
  try {
    if (typeof initializePaymentsTable === "function") {
      initializePaymentsTable();
    }
  } catch (e) {
    console.error(`Failed to initialize payments table: ${e}`);
  }

  // Add interactivity
  try {
    if (typeof addEventListeners === "function") {
      addEventListeners();
    }
  } catch (e) {
    console.error(`Failed to add event listener: ${e}`);
  }

  try {
    await includeHTML();
  } catch (e) {
    console.error(`Failed to include html tags: ${e}`);
  }

  console.log("Dashboard application initialized successfully");
});

async function includeHTML() {
  const els = document.querySelectorAll("[include-html]");
  for (const el of els) {
    const url = el.getAttribute("include-html");
    const res = await fetch(url);
    if (!res.ok) {
      el.innerHTML = "";
      continue;
    }
    el.innerHTML = await res.text();
  }

  document.dispatchEvent(new Event("includesLoaded"));
}

function insertAt(parent, newChild, index) {
  const children = parent.children;
  if (index >= children.length) {
    parent.appendChild(newChild);
  } else {
    parent.insertBefore(newChild, children[index]);
  }
}

// Global utility functions
window.DashboardApp = {
  // Theme utilities
  setTheme: function (theme) {
    if (window.ThemeManager) {
      window.ThemeManager.setTheme(theme);
    }
  },

  // Notification utilities
  showNotification: function (message, type = "info", duration = 3000) {
    if (typeof showNotification === "function") {
      showNotification(message, type, duration);
    }
  },

  // Chart utilities
  refreshCharts: function () {
    if (typeof initializeCharts === "function") {
      initializeCharts();
    }
  },

  // Table utilities
  refreshTable: function () {
    if (typeof initializePaymentsTable === "function") {
      // Clear existing table data
      const tableBody = document.getElementById("paymentsTableBody");
      if (tableBody) {
        tableBody.innerHTML = "";
      }
      // Reinitialize
      initializePaymentsTable();
    }
  },

  // General utilities
  formatCurrency: function (amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  },

  // API simulation utilities
  simulateApiCall: function (endpoint, delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { message: `API call to ${endpoint} successful` },
          timestamp: new Date().toISOString(),
        });
      }, delay);
    });
  },
};

// Performance monitoring
function logPerformanceMetrics() {
  if (performance && performance.timing) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  }
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("Global error caught:", e.error);

  // You can implement error reporting here
  // For example, send to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);

  // Prevent the default browser behavior
  e.preventDefault();
});

// Log performance metrics when page is fully loaded
window.addEventListener("load", logPerformanceMetrics);

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DashboardApp };
}
