/**
 * Interactive Elements Module - Handles various UI interactions and event listeners
 */

function addEventListeners() {
  // Add customer button
  const addMemberBtn = document.querySelector('button[class*="border-dashed"]');
  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", function () {
      alert("Add new customer functionality would be implemented here");
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

  // Initialize tooltips
  initializeTooltips();

  // Initialize keyboard shortcuts
  initializeKeyboardShortcuts();
}

function initializeTooltips() {
  // Add tooltip functionality for buttons and interactive elements
  const elementsWithTooltips = document.querySelectorAll("[title]");
  elementsWithTooltips.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      // You can implement custom tooltip functionality here
      console.log("Tooltip:", this.title);
    });
  });
}

function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    // Command/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.querySelector('input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Escape to close modals/dropdowns
    if (e.key === "Escape") {
      // Close notifications dropdown
      const notificationsDropdown = document.getElementById("notificationsDropdown");
      if (notificationsDropdown && !notificationsDropdown.classList.contains("hidden")) {
        notificationsDropdown.classList.add("hidden");
      }
    }
  });
}

// Loading states for buttons
function setButtonLoading(button, isLoading = true) {
  if (!button) return;

  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
        `;
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText || "Submit";
  }
}

// Form validation utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRequired(value) {
  return value && value.trim().length > 0;
}

// Notification system
function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div");
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[99999] ${typeClasses[type]} fade-in`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Auto remove after duration
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// Initialize interactive elements when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  addEventListeners();
});
