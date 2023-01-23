import html from "/src/index.html";
import scss from "/src/style/style.scss";
import media from "/src/style/media.scss";
import "@babel/polyfill";

function switchSolvingCards(btns, cards, firstClass, secondClass, time) {
  let btnsDataset = String(Object.values(btns.dataset));
  cards.forEach((elem) => {
    let solvingDataset = String(Object.values(elem.dataset));
    if (solvingDataset == btnsDataset) {
      btns.classList.add("active-btn");
      elem.classList.remove(secondClass);
      elem.classList.add(firstClass);
    } else {
      elem.classList.remove(firstClass);
      setTimeout(() => {
        elem.classList.add(secondClass);
      }, time);
    }
  });
}
function removeActive(array, cls) {
  return array.forEach((elem) => {
    elem.classList.remove(cls);
  });
}

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
    document.querySelector(".stat"),
    document.querySelector(".header__stat-inner"),
    document.querySelectorAll(".stat-container"),
    0
  );
});

class GalerySlider {
  constructor(block, container, elems, count) {
    this.block = block;
    this.container = container;
    this.elems = elems;
    this.count = count;
    this.countCheck = false;

    this.setParam = this.setParam.bind(this);
    this.events = this.events.bind(this);
    this.startSlider = this.startSlider.bind(this);
    this.stopSlider = this.stopSlider.bind(this);
    this.draging = this.draging.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.resize = this.resize.bind(this);

    this.resize();
    this.events();
    this.stopSlider();
  }
  setParam() {
    const coords = this.block.getBoundingClientRect();
    this.coordsWidth = coords.width;
    console.log(
      (this.block.offsetLeft +
        this.block.offsetWidth / 2 -
        (this.container.offsetLeft + this.container.offsetWidth / 2)) *
        this.count
    );
    this.changeX =
      -(
        this.block.offsetLeft +
        this.block.offsetWidth / 2 -
        (this.container.offsetLeft + this.container.offsetWidth / 2)
      ) * this.count;
    if (window.innerWidth <= 768) {
      this.elems.forEach((e) => {
        this.block.style.width = `${e.offsetWidth * this.elems.length}px`;
        e.style.width = `${e.offsetWidth}px`;
      });
    } else {
      this.elems.forEach((e) => {
        this.block.style.width = ``;
        e.style.width = ``;
      });
    }
  }
  events() {
    this.block.addEventListener("pointerdown", this.startSlider);
    window.addEventListener("pointerup", this.stopSlider);
  }
  startSlider(ev) {
    this.countCheck = false;
    this.mouseX = ev.pageX;
    this.startX = this.changeX;
    this.block.addEventListener("pointermove", this.draging);
  }
  stopSlider() {
    window.removeEventListener("pointermove", this.draging);
    this.changeX =
      -(
        this.block.offsetLeft +
        this.block.offsetWidth / 2 -
        (this.container.offsetLeft + this.container.offsetWidth / 2)
      ) * this.count;
    this.changePosition();
  }
  draging(ev) {
    const currentMove = ev.pageX - this.mouseX;
    this.changeX = currentMove + this.startX;
    this.changePosition();
    if (
      currentMove > 20 &&
      currentMove > 0 &&
      !this.countCheck &&
      this.count > 0
    ) {
      this.countCheck = true;
      this.count = this.count - 1;
    }
    if (
      currentMove < -20 &&
      currentMove < 0 &&
      !this.countCheck &&
      this.count < this.elems.length - 1
    ) {
      this.countCheck = true;
      this.count = this.count + 1;
    }
  }
  resize() {
    window.addEventListener("resize", () => {
      this.setParam();
    });
  }

  changePosition() {
    if (window.innerWidth < 768) {
      this.block.style.transform = `translate3d(${this.changeX}px, 0, 0)`;
    }
  }
}
