"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".nav-toggle");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section-1");
const tabsContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operations-tab");
const tabsContent = document.querySelectorAll(".operations-content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie-close");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");
const dotContainer = document.querySelector(".dots");
///////////////////////////////////
// cookie
///////////////////////////////////
cookieCloseBtn.addEventListener("click", function () {
  cookieBody.classList.add("hidden");
  cookieBody.style.bottom = "-9rem";
});
///////////////////////////////////

///////////////////////////////////
