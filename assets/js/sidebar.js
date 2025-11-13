/**
 * Sidebar Module - Handles all sidebar functionality including collapse/expand and navigation
 */

class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById("sidebar");
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.sidebarTitleContainer = document.querySelector(".sidebar-title-container");
    this.sidebarTitle = document.querySelector(".sidebar-title");
    this.sidebarSearch = document.querySelector(".sidebar-search");
    this.sidebarSectionTitles = document.querySelectorAll(".sidebar-section-title");
    this.sidebarLinks = document.querySelectorAll(".sidebar-link");
    this.sidebarTexts = document.querySelectorAll(".sidebar-text");
    this.sidebarIcons = document.querySelectorAll(".sidebar-icon");
    this.sidebarUpgrade = document.querySelector(".sidebar-upgrade");
    this.sidebarUser = document.querySelector(".sidebar-user");
    this.sidebarUserInfo = document.querySelector(".sidebar-user-info");
    this.sidebarUserMenu = document.querySelector(".sidebar-user-menu");
    this.sidebarArrows = document.querySelectorAll(".sidebar-arrow");
    this.headerButtons = document.querySelector(".header-buttons");

    // Get saved state from localStorage, default to false if not set
    this.isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

    this.init();
  }

  init() {
    // Initialize sidebar state on page load
    console.log("Initializing sidebar, saved state:", localStorage.getItem("sidebarCollapsed"));
    this.applySidebarState();

    // Event listeners
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }

    // Add tooltip functionality for collapsed state
    this.addTooltips();

    // Initialize submenu functionality
    this.initSubmenuToggles();

    // Initialize hover expand functionality
    this.initHoverExpand();
  }

  applySidebarState() {
    console.log("Applying sidebar state:", this.isCollapsed ? "collapsed" : "expanded");

    if (this.isCollapsed) {
      this.collapseSidebar();
    } else {
      this.expandSidebar();
    }
  }

  collapseSidebar() {
    this.sidebar.classList.remove("w-72");
    this.sidebar.classList.add("w-16");

    if (this.sidebarTitleContainer) {
      this.sidebarTitleContainer.classList.add("justify-center");
      this.sidebarTitleContainer.classList.remove("justify-between");
    }

    // Hide elements
    if (this.sidebarTitle) this.sidebarTitle.style.display = "none";
    if (this.sidebarSearch) this.sidebarSearch.style.display = "none";
    if (this.sidebarUpgrade) this.sidebarUpgrade.style.display = "none";
    if (this.sidebarUserInfo) this.sidebarUserInfo.style.display = "none";
    if (this.headerButtons) this.headerButtons.style.display = "none";

    // Hide text in links
    this.sidebarTexts.forEach((text) => (text.style.display = "none"));

    // Hide arrows
    this.sidebarArrows.forEach((arrow) => (arrow.style.display = "none"));

    // Hide badges
    const sidebarBadges = document.querySelectorAll(".sidebar-badge");
    sidebarBadges.forEach((badge) => (badge.style.display = "none"));

    // Center icons and make them appropriately sized
    this.sidebarIcons.forEach((icon) => {
      icon.classList.remove("mr-3");
      icon.classList.remove("mx-auto");
      icon.style.width = "24px";
      icon.style.height = "24px";
    });

    // Adjust link padding and centering
    this.sidebarLinks.forEach((link) => {
      link.classList.add("justify-center", "px-2", "items-center");
      link.style.justifyContent = "center";
    });

    // Hide section titles
    this.sidebarSectionTitles.forEach((title) => (title.style.display = "none"));

    // Hide submenus
    const submenus = document.querySelectorAll(".submenu");
    submenus.forEach((submenu) => (submenu.style.display = "none"));

    // Adjust user section
    if (this.sidebarUser) this.sidebarUser.classList.add("justify-center");
    if (this.sidebarUserMenu) this.sidebarUserMenu.style.display = "none";

    // Show quick actions in sidebar
    const quickActions = document.querySelector(".sidebar-quick-actions");
    if (quickActions) quickActions.style.display = "block";
  }

  expandSidebar() {
    this.sidebar.classList.remove("w-16");
    this.sidebar.classList.add("w-72");

    if (this.sidebarTitleContainer) {
      this.sidebarTitleContainer.classList.remove("justify-center");
      this.sidebarTitleContainer.classList.add("justify-between");
    }

    // Show elements
    if (this.sidebarTitle) this.sidebarTitle.style.display = "block";
    if (this.sidebarSearch) this.sidebarSearch.style.display = "block";
    if (this.sidebarUpgrade) this.sidebarUpgrade.style.display = "block";
    if (this.sidebarUserInfo) this.sidebarUserInfo.style.display = "block";
    if (this.headerButtons) this.headerButtons.style.display = "flex";

    // Show text in links
    this.sidebarTexts.forEach((text) => (text.style.display = "inline"));

    // Show arrows
    this.sidebarArrows.forEach((arrow) => (arrow.style.display = "block"));

    // Show badges
    const sidebarBadges = document.querySelectorAll(".sidebar-badge");
    sidebarBadges.forEach((badge) => (badge.style.display = "inline"));

    // Reset icons
    this.sidebarIcons.forEach((icon) => {
      icon.classList.add("mr-3");
      icon.style.width = "";
      icon.style.height = "";
    });

    // Reset link padding
    this.sidebarLinks.forEach((link) => {
      link.classList.remove("justify-center", "px-2");
      link.classList.add("px-3");
      link.style.justifyContent = "";
    });

    // Show section titles
    this.sidebarSectionTitles.forEach((title) => (title.style.display = "block"));

    // Show submenus if they were open
    const submenus = document.querySelectorAll(".submenu");
    submenus.forEach((submenu) => {
      if (!submenu.classList.contains("hidden")) {
        submenu.style.display = "block";
      }
    });

    // Reset user section
    if (this.sidebarUser) this.sidebarUser.classList.remove("justify-center");
    if (this.sidebarUserMenu) this.sidebarUserMenu.style.display = "block";

    // Hide quick actions in sidebar
    const quickActions = document.querySelector(".sidebar-quick-actions");
    if (quickActions) quickActions.style.display = "none";
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    console.log("Toggling sidebar to:", this.isCollapsed ? "collapsed" : "expanded");
    localStorage.setItem("sidebarCollapsed", this.isCollapsed.toString());
    this.applySidebarState();
  }

  addTooltips() {
    this.sidebarLinks.forEach((link) => {
      const text = link.querySelector(".sidebar-text");
      if (text) {
        link.setAttribute("title", text.textContent);
      }
    });
  }

  initSubmenuToggles() {
    const submenuToggles = document.querySelectorAll(".submenu-toggle");

    submenuToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const submenuName = this.getAttribute("data-submenu");
        const submenu = document.querySelector(`.submenu[data-submenu="${submenuName}"]`);
        const chevron = this.querySelector(".submenu-chevron");

        if (submenu) {
          const isHidden = submenu.classList.contains("hidden");

          if (isHidden) {
            // Show submenu
            submenu.classList.remove("hidden");
            submenu.classList.remove("submenu-hide");
            submenu.classList.add("submenu-show");
            if (chevron) chevron.classList.add("rotate-90");
          } else {
            // Hide submenu
            submenu.classList.add("submenu-hide");
            if (chevron) chevron.classList.remove("rotate-90");
            // Remove show class and add hidden after animation
            setTimeout(() => {
              submenu.classList.remove("submenu-show");
              submenu.classList.add("hidden");
            }, 300);
          }
        }
      });
    });
  }

  initHoverExpand() {
    // Hover to expand collapsed sidebar
    this.sidebar.addEventListener("mouseenter", () => {
      if (this.isCollapsed) {
        this.expandSidebar();
      }
    });

    this.sidebar.addEventListener("mouseleave", () => {
      if (this.isCollapsed) {
        this.collapseSidebar();
      }
    });
  }
}

// Initialize sidebar when DOM is loaded
document.addEventListener("includesLoaded", function () {
  new SidebarManager();
});
