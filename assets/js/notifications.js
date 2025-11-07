/**
 * Notifications Module - Handles notifications dropdown functionality
 */

class NotificationsManager {
  constructor() {
    this.notificationsBtn = document.getElementById("notifications");
    this.notificationsDropdown = document.getElementById("notificationsDropdown");
    this.sidebarNotifications = document.getElementById("sidebarNotifications");

    this.init();
  }

  init() {
    if (this.notificationsBtn && this.notificationsDropdown) {
      // Toggle dropdown on button click
      this.notificationsBtn.addEventListener("click", (e) => this.toggleDropdown(e));

      // Prevent clicks inside dropdown from closing it
      this.notificationsDropdown.addEventListener("click", (e) => e.stopPropagation());

      // Close dropdown when clicking outside
      document.addEventListener("click", () => this.closeDropdown());

      // Handle Accept/Decline buttons
      this.initActionButtons();
    }

    // Sidebar notifications button
    if (this.sidebarNotifications) {
      this.sidebarNotifications.addEventListener("click", (e) => this.toggleDropdown(e));
    }
  }

  toggleDropdown(e) {
    e.stopPropagation();
    const isHidden = this.notificationsDropdown.classList.contains("hidden");

    if (isHidden) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  openDropdown() {
    this.notificationsDropdown.classList.remove("hidden");
    this.notificationsBtn.setAttribute("aria-expanded", "true");
  }

  closeDropdown() {
    if (!this.notificationsDropdown.classList.contains("hidden")) {
      this.notificationsDropdown.classList.add("hidden");
      this.notificationsBtn.setAttribute("aria-expanded", "false");
    }
  }

  initActionButtons() {
    const acceptButtons = this.notificationsDropdown.querySelectorAll("button");
    acceptButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close dropdown after action
        this.closeDropdown();

        // Remove badge indicating unread (optional)
        const badge = document.getElementById("notificationsBadge");
        if (badge) badge.style.display = "none";

        // Handle specific button action
        this.handleNotificationAction(btn);
      });
    });
  }

  handleNotificationAction(button) {
    const buttonText = button.textContent.trim().toLowerCase();

    if (buttonText === "accept") {
      console.log("Notification accepted");
      // Add your accept logic here
    } else if (buttonText === "decline") {
      console.log("Notification declined");
      // Add your decline logic here
    } else if (buttonText === "view all") {
      console.log("View all notifications");
      // Add your view all logic here
    }
  }

  addNotification(notification) {
    // Method to dynamically add new notifications
    const notificationsList = this.notificationsDropdown.querySelector("ul");
    if (notificationsList && notification) {
      const li = document.createElement("li");
      li.className = "px-4 py-3 flex items-start gap-3";
      li.innerHTML = `
                <img src="${notification.avatar || "https://i.pravatar.cc/40"}" alt="avatar" class="w-8 h-8 rounded-full flex-shrink-0">
                <div class="flex-1">
                    <div class="flex items-start justify-between gap-3">
                        <div>
                            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">${notification.title}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${notification.message}</p>
                        </div>
                        <div class="ml-2 text-xs text-gray-400">${notification.time}</div>
                    </div>
                </div>
            `;

      notificationsList.insertBefore(li, notificationsList.firstChild);

      // Show badge if hidden
      const badge = document.getElementById("notificationsBadge");
      if (badge) badge.style.display = "block";
    }
  }

  clearAllNotifications() {
    const notificationsList = this.notificationsDropdown.querySelector("ul");
    if (notificationsList) {
      notificationsList.innerHTML = "";

      // Hide badge
      const badge = document.getElementById("notificationsBadge");
      if (badge) badge.style.display = "none";
    }
  }
}

// Initialize notifications manager when DOM is loaded
document.addEventListener("includesLoaded", function () {
  new NotificationsManager();
});
