"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".nav__toggle");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie__close");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// cookies
cookieCloseBtn.addEventListener("click", function () {
  cookieBody.classList.add("hidden");
  cookieBody.style.bottom = `-12rem`;
});

// nav height

const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries, observe) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObs = new IntersectionObserver(sticky, {
  root: null, // viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObs.observe(header);

// reveal section
function revealSection(entries) {
  // const entry = entries[0];
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove("section--hidden");
}

const sectionObs = new IntersectionObserver(revealSection, {
  root: null, // viewport
  threshold: 0,
});

allSections.forEach((section) => {
  sectionObs.observe(section);
  section.classList.add("section--hidden");
});

// modal window
const modalwindow = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector("html").style.overflow = "hidden";
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector("html").style.overflow = "visible ";
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", modalwindow));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// scroll behavior

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const attr = e.target.getAttribute("href");
    console.log(attr);
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

// toggle btn
toggleBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("nav__open")) {
    navLinks.classList.remove("nav__open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav__open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

// lazy img loading
const imgLoading = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};
const imgObserver = new IntersectionObserver(imgLoading, {
  root: null, // viewport
  threshold: 0,
  rootMargin: `252px`,
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

// Slider
let currentSlide = 0;
const maxSlide = slides.length - 1;

// DOts
function creatingDots() {
  slides.forEach((_, i) => {
    const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
}

creatingDots();

// Activate dots
function activateDots(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

activateDots(0);

function updateSlide(cs) {
  slides.forEach(
    (sl, i) => (sl.style.transform = `translateX(${100 * (i - cs)}%)`)
  );
}

updateSlide(0);

function previousSlide() {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  updateSlide(currentSlide);
  activateDots(currentSlide);
}

function nextSlide() {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  updateSlide(currentSlide);
  activateDots(currentSlide);
}

// dots handler
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    activateDots(e.target.dataset.slide);
    updateSlide(e.target.dataset.slide);
  }
});

// button handles
btnLeft.addEventListener("click", previousSlide);
btnRight.addEventListener("click", nextSlide);

// keyboard
document.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && previousSlide();
  e.key === "ArrowRight" && nextSlide();
});

// tabbed components
tabsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".operations__tab");

  if (!btn) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  btn.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add("operations__content--active");
});
