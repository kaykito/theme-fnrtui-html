/**
 * Theme Module - Handles dark mode toggle functionality
 */

class ThemeManager {
  constructor() {
    this.darkModeToggle = document.getElementById("darkModeToggle");
    this.sidebarDarkModeToggle = document.getElementById("sidebarDarkModeToggle");
    this.html = document.documentElement;

    this.init();
  }

  init() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
      this.html.classList.add("dark");
    }

    // Main dark mode toggle
    if (this.darkModeToggle) {
      this.darkModeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // Sidebar dark mode toggle
    if (this.sidebarDarkModeToggle) {
      this.sidebarDarkModeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.html.classList.toggle("dark");

    // Save theme preference
    if (this.html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  getCurrentTheme() {
    return this.html.classList.contains("dark") ? "dark" : "light";
  }

  setTheme(theme) {
    if (theme === "dark") {
      this.html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      this.html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("includesLoaded", function () {
  new ThemeManager();
});
