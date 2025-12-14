// get the current year.
document.getElementById("year").textContent = new Date().getFullYear();

// chnge the buy button.
document.getElementById("buy").addEventListener("click", function () {
  this.textContent = "bought!";
  setTimeout(() => {
    this.textContent = "Buy Now";
  }, 2000);
});

// img hover effect.
const productImg = document.getElementById("productImg");
const originalSrc = productImg.src;

productImg.addEventListener("mouseover", function () {
  this.style.transform = "scale(1.1)";
  this.style.transition = "transform 0.3s ease-in-out";
});
productImg.addEventListener("mouseout", function () {
  this.style.transform = "scale(1)";
});

// collaosed list.
const toggleBtn = document.getElementById("toggleFeatures");
const featuresList = document.getElementById("featuresList");

toggleBtn.addEventListener("click", function () {
  featuresList.classList.toggle("collapsed");
  if (featuresList.classList.contains("collapsed")) {
    toggleBtn.textContent = "Show Features";
    toggleBtn.setAttribute("aria-expanded", "false");
  } else {
    toggleBtn.textContent = "Hide Features";
    toggleBtn.setAttribute("aria-expanded", "true");
  }
});

// highlight visited links.
const resourceLinks = document.querySelectorAll(".resource-links a");

resourceLinks.forEach((link) => {
  link.addEventListener("click", function () {
    this.style.fontWeight = "bold";
    this.style.color = "#ad4444ff";
  });
});

// form alert.
document.getElementById("forum").addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Thank you for Ordering from us!");
  this.reset();
});

//highlight from.
document.getElementById("checkout").addEventListener("mouseover", function () {
  this.style.background = "#1f1f1f";
  this.style.transition = "background 0.3s, color 0.3s";
});
document.getElementById("checkout").addEventListener("mouseout", function () {
  this.style.background = "#fff";
});
