import html from "/src/index.html";
import scss from "/src/style/style.scss";
import media from "/src/style/media.scss";
import "@babel/polyfill";
import {
  switchSolvingCards,
  removeActive,
  GalerySlider,
} from "/src/javascript/app.js";

document.addEventListener("DOMContentLoaded", () => {
  const solvingBtns = document.querySelectorAll(".solving__nav-btn"),
    solvingCards = document.querySelectorAll(".solving__content");
  const instructionBtns = document.querySelectorAll(".instruction-btn"),
    instructionCards = document.querySelectorAll(".instruction-img__box");
  const approachBtns = document.querySelectorAll(".approach-img"),
    approachCards = document.querySelectorAll(".approach__wrapper-item");
  const statSlider = new GalerySlider(
    document.querySelector(".stat"),
    document.querySelector(".header__stat-inner"),
    document.querySelectorAll(".stat-container"),
    0
  );
  const possibilitiesSlider = new GalerySlider(
    document.querySelector(".main__possibilities-container"),
    document.querySelector(".main__possibilities-slider"),
    document.querySelectorAll(".possibilities-item"),
    0
  );

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
  statSlider.sliderCenter();
  possibilitiesSlider.sliderUsual();
});
