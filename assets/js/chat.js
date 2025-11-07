/**
 * Chat Module - Handles chat functionality and interactions
 */

class ChatManager {
  constructor() {
    this.chatInput = document.querySelector('input[placeholder="Type your support question..."]');
    this.sendBtn = document.querySelector(".bg-blue-600");
    this.chatMessages = null;

    this.init();
  }

  init() {
    if (this.chatInput) {
      this.chatMessages = this.chatInput.closest(".flex").previousElementSibling;
    }

    if (this.sendBtn && this.chatInput) {
      this.sendBtn.addEventListener("click", () => this.sendMessage());
      this.chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });
    }

    // Add smooth animations CSS
    this.addAnimationStyles();
  }

  sendMessage() {
    if (this.chatInput && this.chatMessages && this.chatInput.value.trim()) {
      const message = this.chatInput.value.trim();

      // Add user message
      this.addUserMessage(message);

      // Clear input
      this.chatInput.value = "";

      // Simulate response (replace with actual chat functionality)
      this.simulateResponse(message);

      // Scroll to bottom
      this.scrollToBottom();
    }
  }

  addUserMessage(message) {
    const userBubble = document.createElement("div");
    userBubble.className = "flex justify-end fade-in";
    userBubble.innerHTML = `
            <div class="bg-gray-900 text-white px-4 py-2 rounded-lg rounded-br-sm max-w-xs">
                <p class="text-sm">${this.escapeHtml(message)}</p>
            </div>
        `;
    this.chatMessages.appendChild(userBubble);
  }

  addBotMessage(message) {
    const responseElement = document.createElement("div");
    responseElement.className = "fade-in";
    responseElement.innerHTML = `
            <p class="text-sm text-gray-600 dark:text-gray-400">${this.escapeHtml(message)}</p>
        `;
    this.chatMessages.appendChild(responseElement);
  }

  simulateResponse(userMessage) {
    setTimeout(() => {
      const responseText = this.getAutoResponse(userMessage);
      this.addBotMessage(responseText);
      this.scrollToBottom();
    }, 1000);
  }

  getAutoResponse(message) {
    const responses = [
      "Thank you for contacting support. How can I help you with your account today?",
      "I understand you're having an issue. Let me check your account details.",
      "That's a great question about our service. Let me provide you with the information you need.",
      "I'm here to help resolve your concern. Can you provide more details about the issue?",
      "Thank you for reaching out. Our support team will assist you with this matter.",
    ];

    // Simple keyword-based responses
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("billing") || lowerMessage.includes("payment")) {
      return "I can help you with billing inquiries. Let me check your payment information and recent transactions.";
    } else if (lowerMessage.includes("password") || lowerMessage.includes("login")) {
      return "For password and login issues, I can help you reset your credentials. Please verify your email address.";
    } else if (lowerMessage.includes("upgrade") || lowerMessage.includes("plan")) {
      return "I'd be happy to help you upgrade your plan. What features are you looking for?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  scrollToBottom() {
    if (this.chatMessages) {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  addAnimationStyles() {
    if (!document.getElementById("chat-animations")) {
      const style = document.createElement("style");
      style.id = "chat-animations";
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
    }
  }

  clearChat() {
    if (this.chatMessages) {
      // Keep only the initial messages, remove user-generated ones
      const userMessages = this.chatMessages.querySelectorAll(".fade-in");
      userMessages.forEach((msg) => msg.remove());
    }
  }

  addTypingIndicator() {
    const typingElement = document.createElement("div");
    typingElement.className = "typing-indicator fade-in";
    typingElement.innerHTML = `
            <p class="text-sm text-gray-500 italic">Support is typing...</p>
        `;
    this.chatMessages.appendChild(typingElement);
    this.scrollToBottom();

    return typingElement;
  }

  removeTypingIndicator() {
    const typingIndicator = this.chatMessages.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
}

// Initialize chat manager when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new ChatManager();
});
