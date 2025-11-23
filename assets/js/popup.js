/**
 * @typedef {Object} PopupInstance
 * @property {HTMLElement} overlay - The overlay element
 * @property {HTMLElement} container - The popup container
 * @property {string} templateId - The template ID used
 */

class PopupManager {
  constructor() {
    /** @type {PopupInstance[]} */
    this.stack = [];
    this.baseZIndex = 1000;
    this.setupKeyboardListener();
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById("popup-manager-styles")) return;

    const style = document.createElement("style");
    style.id = "popup-manager-styles";
    style.textContent = `
      .popup-overlay {
        opacity: 0;
        transition: opacity 200ms ease-out;
      }
      .popup-overlay.popup-active {
        opacity: 1;
      }
      .popup-overlay.popup-closing {
        opacity: 0;
      }
      .popup-container {
        transform: scale(0.95);
        opacity: 0;
        transition: transform 200ms ease-out, opacity 200ms ease-out;
      }
      .popup-overlay.popup-active .popup-container {
        transform: scale(1);
        opacity: 1;
      }
      .popup-overlay.popup-closing .popup-container {
        transform: scale(0.95);
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  setupKeyboardListener() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.stack.length > 0) {
        this.pop();
      }
    });
  }

  /**
   * @param {string} templateSelector - CSS selector for the template element
   * @returns {PopupInstance}
   */
  push(templateSelector) {
    const template = document.querySelector(templateSelector);
    if (!template || !(template instanceof HTMLTemplateElement)) {
      throw new Error(`Template not found: ${templateSelector}`);
    }

    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${this.baseZIndex + this.stack.length * 2};
    `;

    const container = document.createElement("div");
    container.className = "popup-container";
    container.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 24px;
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
      position: relative;
      z-index: ${this.baseZIndex + this.stack.length * 2 + 1};
    `;

    const content = template.content.cloneNode(true);
    container.appendChild(content);
    overlay.appendChild(container);

    const instance = { overlay, container, templateId: templateSelector };
    this.stack.push(instance);

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("popup-active");
      });
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        this.pop();
      }
    });

    return instance;
  }

  /**
   * @param {number} [count=1] - Number of popups to pop
   */
  pop(count = 1) {
    for (let i = 0; i < count && this.stack.length > 0; i++) {
      const instance = this.stack.pop();

      instance.overlay.classList.remove("popup-active");
      instance.overlay.classList.add("popup-closing");

      instance.overlay.addEventListener(
        "transitionend",
        () => {
          instance.overlay.remove();
        },
        { once: true }
      );
    }
  }

  popAll() {
    while (this.stack.length > 0) {
      this.pop();
    }
  }

  /**
   * @returns {PopupInstance|null}
   */
  getCurrent() {
    return this.stack[this.stack.length - 1] || null;
  }
}

const popupManager = new PopupManager();

/**
 * @param {string} templateSelector
 */
function pushPopup(templateSelector) {
  popupManager.push(templateSelector);
}

function popPopup() {
  popupManager.pop();
}

function popAllPopups() {
  popupManager.popAll();
}
