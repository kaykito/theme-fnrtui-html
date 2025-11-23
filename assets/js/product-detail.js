function initializeSwiper() {
  var thumbSwiper = new Swiper(".thumb-swiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
  });

  new Swiper(".main-swiper", {
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbSwiper,
    },
  });
}

function initializeProductForm() {
  /** @type {HTMLFormElement} */
  const form = document.querySelector("#product-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (!formData.get("color") || !formData.get("size")) {
      showNotification("Please fill all the option", "warning");
      return;
    }
    const action = e.submitter?.value || "add_to_cart";
    const msg = {
      add_to_cart: "added to cart",
      add_to_wishlist: "Added to wishlist",
    };

    showNotification(
      `Product (color ${formData.get("color")}, size ${formData.get("size")}) ${msg[action] || "[unknown action]"}`
    );
  });
}

function initializeReviewForm() {
  document.querySelector("#review-form-open-btn").addEventListener("click", () => {
    pushPopup("#review-form-popup");

    const stars = document.querySelectorAll("#star-rating input");

    stars.forEach((star) => {
      star.addEventListener("change", () => {
        const value = parseInt(star.value);
        stars.forEach((s, i) => {
          const svg = s.nextElementSibling.querySelector("svg");
          if (i < value) {
            svg.classList.add("fill-yellow-400", "stroke-transparent");
          } else {
            svg.classList.remove("fill-yellow-400", "stroke-transparent");
          }
        });

        const label = document.querySelector("#star-rating-label");
        label.innerText = `${value} out of ${stars.length}`;
      });
    });

    /** @type {HTMLFormElement} */
    const form = document.querySelector("#review-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      if (!formData.get("name") || !formData.get("email") || !formData.get("comment") || !formData.get("rating")) {
        showNotification("Please fill all the option", "warning");
        return;
      }

      if (!validateEmail(formData.get("email"))) {
        showNotification("Invalid email", "error");
        return;
      }

      pushNewReview(
        {
          username: formData.get("name"),
          rating: formData.get("rating"),
          title: "",
          comment: formData.get("comment"),
          timestamp: "just now",
        },
        0
      );

      popPopup();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSwiper();
  initializeProductForm();
  // initialize default review
  defaultReview.map((r) => pushNewReview(r));
  initializeReviewForm();
});

/**
 * @typedef {Object} Review
 * @property {string} username
 * @property {HTMLElement|string|undefined} profile
 * @property {number|string} rating
 * @property {string} title
 * @property {string} comment
 * @property {string?} timestamp
 */

/**
 * @param {Review} review
 * @param {number} [insertIdx=1]
 * */
function pushNewReview(review, insertIdx = -1) {
  /** @type {HTMLTemplateElement} */
  const reviewTemplate = document.querySelector("#review-template");

  /** @type {HTMLDivElement} */
  const reviews = document.querySelector("#review-list");

  const reviewElement = reviewTemplate.content.cloneNode(true);
  reviewElement.querySelector(".review-user-name").textContent = review.username;

  const avatarPath = (index) => `/assets/images/avatars/${String(index).padStart(2, "0")}.png`;
  const pickRandomDefaultAvatar = () => avatarPath(Math.floor(Math.random() * 12) + 1);

  const profileContainer = reviewElement.querySelector(".review-user-profile");

  let avatarElement = null;
  if (review.profile instanceof HTMLElement) {
    avatarElement = review.profile;
  } else {
    const src =
      typeof review.profile === "string" && review.profile.length ? review.profile : pickRandomDefaultAvatar();

    avatarElement = document.createElement("img");
    avatarElement.setAttribute("alt", `${review.username}'s avatar`);
    avatarElement.setAttribute("loading", "lazy");
    avatarElement.src = src;
    avatarElement.classList.add("review-avatar");
  }

  if (profileContainer && avatarElement) {
    profileContainer.innerHTML = "";
    profileContainer.appendChild(avatarElement);
  }

  const ratingElement = reviewElement.querySelector(".review-rating");
  if (ratingElement)
    ratingElement.textContent =
      typeof review.rating === "string" ? review.rating : `${Number(review.rating).toFixed(0)}`;

  const titleElement = reviewElement.querySelector(".review-comment-title");
  if (titleElement) titleElement.textContent = review.title;

  const commentElement = reviewElement.querySelector(".review-comment");
  if (commentElement) commentElement.textContent = review.comment;

  const timestampElement = reviewElement.querySelector(".review-timestamp");
  if (timestampElement) timestampElement.textContent = review.timestamp ?? "";

  if (insertIdx === -1) {
    reviews.appendChild(reviewElement);
  } else {
    insertAt(reviews, reviewElement, insertIdx);
  }
  updateReviewSummary(review);
}

let reviewSummary = {
  totalRating: 0,
  nbRating: 0,
  individualRating: [0, 0, 0, 0, 0],
};

/**
 * @param {Review} review
 * */
function updateReviewSummary(review) {
  let rating = review.rating;
  if (typeof rating === "string") rating = parseFloat(rating);
  reviewSummary.totalRating += rating;
  reviewSummary.nbRating++;
  reviewSummary.individualRating[rating.toFixed(0) - 1]++;

  const avg = reviewSummary.totalRating / reviewSummary.nbRating;

  const ratingElement = document.querySelector(".review-summary-rating");
  ratingElement.innerText = `${avg.toFixed(1)} (${reviewSummary.nbRating} reviews)`;

  const starElement = document.querySelectorAll(".__star-average");
  if (starElement) {
    const svgs = Array.from(starElement).filter((el) => el.tagName.toLowerCase() === "svg");
    svgs.forEach((svg, i) => {
      const percent = Math.max(0, Math.min(100, (avg - i - 1) * 100));
      setSvgStarFill(svg, percent);
    });
  }

  const starPercentages = document.querySelectorAll(".__star-progress");
  const starProgress = document.querySelectorAll(".__star-progress-bar");
  starPercentages.forEach((s, i) => {
    const percent = (reviewSummary.individualRating[5 - i - 1] / reviewSummary.nbRating) * 100;
    s.textContent = `${percent.toFixed(0)}%`;
    starProgress[i].style.transform = `translateX(-${100 - percent}%)`;
  });
}

function setSvgStarFill(svg, percent) {
  const SVG_NS = "http://www.w3.org/2000/svg";

  percent = Math.round(percent);
  const oldDefs = svg.querySelector("defs[data-generated='true']");
  if (oldDefs) oldDefs.remove();

  if (percent <= 0) {
    svg.setAttribute("fill", "none");
    return;
  }
  if (percent >= 100) {
    svg.setAttribute("fill", "currentColor");
    return;
  }

  // create defs + linearGradient with unique id
  const id = `star-grad-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const defs = document.createElementNS(SVG_NS, "defs");
  defs.setAttribute("data-generated", "true");

  const grad = document.createElementNS(SVG_NS, "linearGradient");
  grad.setAttribute("id", id);
  grad.setAttribute("x1", "0%");
  grad.setAttribute("y1", "0%");
  grad.setAttribute("x2", "100%");
  grad.setAttribute("y2", "0%");

  // filled part
  const stopFilled = document.createElementNS(SVG_NS, "stop");
  stopFilled.setAttribute("offset", `${percent}%`);
  stopFilled.setAttribute("stop-color", "currentColor");
  stopFilled.setAttribute("stop-opacity", "1");

  // empty part
  const stopEmpty = document.createElementNS(SVG_NS, "stop");
  stopEmpty.setAttribute("offset", `${percent}%`);
  // use a transparent stop so the stroke still shows
  stopEmpty.setAttribute("stop-color", "currentColor");
  stopEmpty.setAttribute("stop-opacity", "0");

  grad.appendChild(stopFilled);
  grad.appendChild(stopEmpty);
  defs.appendChild(grad);

  // insert defs as first child so gradient id resolves for the fill
  svg.insertBefore(defs, svg.firstChild);
  svg.setAttribute("fill", `url(#${id})`);
}

const defaultReview = [
  {
    username: "Alice",
    profile: "/assets/images/avatars/01.png",
    rating: 5,
    title: "Amazing product!",
    comment: "Exceeded my expectations. Highly recommend to anyone considering it.",
    timestamp: "2 days ago",
  },
  {
    username: "Bob",
    profile: "/assets/images/avatars/02.png",
    rating: 4,
    title: "Very good overall",
    comment: "Works as described. Could use minor improvements, but still solid.",
    timestamp: "5 days ago",
  },
  {
    username: "Catherine",
    profile: "/assets/images/avatars/03.png",
    rating: 5,
    title: "Love it!",
    comment: "Beautiful design and great functionality. Worth every penny.",
    timestamp: "1 week ago",
  },
  {
    username: "David",
    profile: "/assets/images/avatars/04.png",
    rating: 3,
    title: "It’s okay",
    comment: "Does what it says, but not as impressive as I expected.",
    timestamp: "3 days ago",
  },
  {
    username: "Ella",
    profile: "/assets/images/avatars/05.png",
    rating: 5,
    title: "Best purchase I’ve made this year",
    comment: "Really improved my workflow. I can’t go back now!",
    timestamp: "6 days ago",
  },
  {
    username: "Frank",
    profile: "/assets/images/avatars/06.png",
    rating: 2,
    title: "Disappointed",
    comment: "Had high hopes, but it didn’t perform as advertised.",
    timestamp: "2 weeks ago",
  },
  {
    username: "Grace",
    profile: "/assets/images/avatars/07.png",
    rating: 4,
    title: "Good value",
    comment: "For the price, it’s actually quite good. Would buy again.",
    timestamp: "4 days ago",
  },
  {
    username: "Henry",
    profile: "/assets/images/avatars/08.png",
    rating: 5,
    title: "Fantastic experience",
    comment: "Everything about it feels premium. Setup was super easy.",
    timestamp: "1 day ago",
  },
  {
    username: "Isabella",
    profile: "/assets/images/avatars/09.png",
    rating: 3,
    title: "Average product",
    comment: "It’s fine for casual use, but I expected better build quality.",
    timestamp: "8 days ago",
  },
  {
    username: "Jack",
    profile: "/assets/images/avatars/10.png",
    rating: 4,
    title: "Solid choice",
    comment: "Dependable and performs well. Would recommend to friends.",
    timestamp: "9 days ago",
  },
  {
    username: "Karen",
    profile: "/assets/images/avatars/11.png",
    rating: 1,
    title: "Not happy",
    comment: "Stopped working after a week. Customer service was unhelpful.",
    timestamp: "3 weeks ago",
  },
  {
    username: "Leo",
    profile: "/assets/images/avatars/12.png",
    rating: 5,
    title: "Excellent quality",
    comment: "Built to last and performs great. Couldn’t ask for more.",
    timestamp: "10 days ago",
  },
];
