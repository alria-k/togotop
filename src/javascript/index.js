import html from "/src/index.html";
import scss from "/src/style/style.scss";
import media from "/src/style/media.scss";
import "@babel/polyfill";
import {
  switchSolvingCards,
  removeActive,
  GalerySlider,
  tabs,
  burger,
  MobileBurger,
  resetStyle,
  tabsHover
} from "/src/javascript/app.js";

document.addEventListener("DOMContentLoaded", () => {
  const solvingBtns = document.querySelectorAll(".solving__nav-btn"),
    solvingCards = document.querySelectorAll(".solving__content");
  const instructionBtns = document.querySelectorAll(".instruction-btn"),
    instructionCards = document.querySelectorAll(".instruction-img__box");
  const approachBtns = document.querySelectorAll(".approach-img"),
    approachCards = document.querySelectorAll(".approach__wrapper-item");

  solvingBtns.forEach((elem) => {
    elem.addEventListener("click", (val) => {
      removeActive(solvingBtns, "active-btn");
      switchSolvingCards(
        elem,
        solvingCards,
        "solving__content--open",
        "solving__content--hidden",
        200
      );
    });
  });
  instructionBtns.forEach((elem) => {
    elem.addEventListener("click", (val) => {
      removeActive(instructionBtns, "active-btn");
      switchSolvingCards(
        elem,
        instructionCards,
        "solving__content--open",
        "solving__content--hidden",
        200
      );
    });
  });
  approachBtns.forEach((elem) => {
    elem.addEventListener("click", (val) => {
      switchSolvingCards(
        elem,
        approachCards,
        "approach-open",
        "approach-close",
        0
      );
    });
  });
  new GalerySlider(
    document.querySelector(".main__possibilities-container"),
    document.querySelector(".main__possibilities-slider"),
    document.querySelectorAll(".possibilities-item"),
    0,
    { margin: 20 }
  ).setParametrs();
  new MobileBurger(
    document.querySelector(".burger-box"),
    document.querySelector(".mobile-nav__box")
  );
  tabs(
    document.querySelectorAll(".mobile-nav__accordion-box"),
    "mobile-nav__accordion--open",
    "mobile-nav__accordion--close"
  );
  tabsHover(document.querySelectorAll('.nav__item'), "nav__item-box--open")
  burger(
    document.querySelector(".burger-box"),
    document.querySelector(".burger-lines"),
    "burger-lines--cross",
    "burger-box--active"
  );
});
const statSlider = new GalerySlider(
  document.querySelector(".stat"),
  document.querySelector(".header__stat-inner"),
  document.querySelectorAll(".stat-container"),
  0
);
const approachSlider = new GalerySlider(
  document.querySelector(".approach__wrapper"),
  document.querySelector(".main__approach-inner"),
  document.querySelectorAll(".approach__wrapper-item"),
  0,
  { margin: 20 }
);
const instructionSlider = new GalerySlider(
  document.querySelector(".instruction__list"),
  document.querySelector(".instruction__content-text"),
  document.querySelectorAll(".instruction__list-item"),
  0,
  { margin: 20 }
);
const parntersSlider = new GalerySlider(
  document.querySelector(".partners-img__wrapper"),
  document.querySelector(".partners-img__slider"),
  document.querySelectorAll(".partners-img"),
  0
);
window.addEventListener('resize', () => {
  if(window.innerWidth <= 768){
    parntersSlider.sliderCenter()
    statSlider.sliderCenter()
    approachSlider.setParametrs()
    instructionSlider.setParametrs()
  } else {
    resetStyle(document.querySelectorAll(".approach__wrapper-item"), '')
    resetStyle(document.querySelectorAll(".instruction__list-item"), '')
    approachSlider.destroyEvents()
    instructionSlider.destroyEvents()
  }
})

