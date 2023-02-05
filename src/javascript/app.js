export class GalerySlider {
  constructor(block, container, elems, count, options = {}) {
    //our main block width @elems inside
    this.block = block;
    //our main container which contain @main
    this.container = container;
    //slider items
    this.elems = elems;
    //number of starting slide
    this.count = count;
    //count check
    this.countCheck = false;
    //check for slider center
    this.center = false;
    this.settings = {
      margin: options.margin || 0,
    };

    this.setParametrs = this.setParametrs.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);
    this.startSlide = this.startSlide.bind(this);
    this.draging = this.draging.bind(this);
    this.stopSlide = this.stopSlide.bind(this);
    this.setStylePosition = this.setStylePosition.bind(this);
    this.setStyleTransition = this.setStyleTransition.bind(this);
    this.resetStyleTransition = this.resetStyleTransition.bind(this);
    this.sliderCenter = this.sliderCenter.bind(this);
    this.destroyEvents = this.destroyEvents.bind(this);
    this.manageHtml = this.manageHtml.bind(this);
    this.changeDotsActive = this.changeDotsActive.bind(this);
    this.setDots = this.setDots.bind(this);

    this.setDots()
    this.setEvents();
    this.manageHtml();
  }
  sliderCenter() {
    this.center = true;
    this.resizeGallery();
    this.setParametrs();
  }
  changeDotsActive() {
    for (let i = 0; i < this.allDotsInEveryContainer.length; i++) {
      this.allDotsInEveryContainer[i].classList.remove("bars-line--active");
      if (i == this.count) {
        this.allDotsInEveryContainer[i].classList.add("bars-line--active");
      }
    }
  }
  setParametrs() {
    const sliderNodeCoords = this.block.getBoundingClientRect();
    this.centerCoords = //this calculations we are doing to get max position of last element, we will need this for easing, while person on last slide, //we get the center for all @elems in order to while scrolling they always be in center);
      this.block.offsetLeft +
      this.block.offsetWidth / 2 -
      (this.container.offsetLeft + this.container.offsetWidth / 2);
    this.width = sliderNodeCoords.width;
    this.x = this.center
      ? -this.count * this.centerCoords
      : -this.count * (this.width + this.settings.margin);
    this.maximumX = this.center
      ? -(this.elems.length - 1) * this.centerCoords
      : -(this.elems.length - 1) * (this.width + this.settings.margin);
    this.block.style.width = `${
      this.center
        ? false
        : (this.width + this.settings.margin) * this.elems.length
    }px`;
    this.elems.forEach((item) => {
      if (!this.center) {
        item.style.width = `${this.width}px`;
      } else if (window.innerWidth <= 768) {
        this.block.style.width = `${item.offsetWidth * this.elems.length}px`; //to set right width for @block, we might every @elems item multiply by all @elems length
        item.style.width = `${item.offsetWidth}px`; //this if obviously :)
      } else {
        this.block.style.width = ``;
        item.style.width = ``;
        this.changeX = 0;
        this.count = 0;
        this.setStylePosition();
      }
    });
  }
  setDots(){
    let bars = document.createElement("div");
    bars.className = "bars";
    this.container.append(bars);
    this.elems.forEach((item, i) => {
      this.barsLine = document.createElement("div");
      this.barsLine.className = "bars-line";
      bars.append(this.barsLine);
    });
    this.allDotsInEveryContainer =
    this.container.querySelectorAll(".bars-line");
    this.changeDotsActive();
  }
  manageHtml() {
    this.elems.forEach((item, i) => {
      if(window.innerWidth >= 768){
        return
      } else {
        item.style.marginRight = `${this.settings.margin}px`;
      }
      
    });
  }
  setEvents() {
    window.addEventListener("resize", this.resizeGallery);
    this.block.addEventListener("pointerdown", this.startSlide);
    this.block.addEventListener("pointerup", this.stopSlide);
  }
  destroyEvents() {
    this.block.style.width = ``;
    this.block.removeEventListener("pointerdown", this.startSlide);
    this.block.removeEventListener("pointerup", this.stopSlide);
  }
  startSlide(event) {
    this.countCheck = false;
    this.clientX = event.pageX;
    this.startX = this.x;
    this.block.addEventListener("pointermove", this.draging);
    this.resetStyleTransition();
  }
  stopSlide() {
    this.block.removeEventListener("pointermove", this.draging);
    this.x = this.center
      ? -this.count * this.centerCoords
      : -this.count * (this.width + this.settings.margin);
    this.setStylePosition();
    this.setStyleTransition();
    this.changeDotsActive();
  }
  draging(event) {
    this.dragX = event.pageX;
    const dragshift = this.dragX - this.clientX;
    const easing = dragshift / 10;
    this.x = Math.max(
      Math.min(dragshift + this.startX, easing),
      this.maximumX + easing
    );
    this.setStylePosition();
    if (dragshift > 20 && dragshift > 0 && !this.countCheck && this.count > 0) {
      this.countCheck = true;
      this.count = this.count - 1;
    } //here we checking if person move slider more than 20px/-20px, for change number of slide. As i writte above, to change position
    if (
      dragshift < -20 &&
      dragshift < 0 &&
      !this.countCheck &&
      this.count < this.elems.length - 1
    ) {
      this.countCheck = true;
      this.count = this.count + 1;
    }
  }
  setStylePosition() {
    this.block.style.transform = `translate3d(${this.x}px, 0, 0)`;
  }
  resizeGallery() {
    if (this.center && window.innerWidth > 768) {
      this.destroyEvents();
      this.count = 0;
      this.setParametrs();
    } else {
      this.manageHtml();
      this.destroyEvents();
      this.count = 0;
      this.block.style.transform = `translate3d(0px, 0, 0)`;
      this.setEvents();
      this.setParametrs();
    }
  }
  setStyleTransition() {
    this.block.style.transition =
      "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
  }
  resetStyleTransition() {
    this.block.style.transition = "transform 0s cubic-bezier(0.22, 1, 0.36, 1)";
  }
}
export function tabs(array, openCls, hideCls) {
  let openTabs = document.getElementsByClassName(openCls);
  array.forEach((elem, i) => {
    elem.classList.add(hideCls);
    elem.addEventListener("click", (event) => {
      if (openTabs.length > 0 && openTabs[0] != event.currentTarget) {
        openTabs[0].classList.add(hideCls);
        openTabs[0].classList.remove(openCls);
      }
      elem.classList.toggle(openCls);
      elem.classList.remove(hideCls);
    });
  });
}
export function burger(elem, linesElem, crossCls, activeBurgerCls) {
  elem.addEventListener("click", () => {
    elem.classList.toggle(activeBurgerCls);
    linesElem.classList.toggle(crossCls);
  });
}
export class MobileBurger {
  constructor(burger, mobileNav) {
    this.burger = burger;
    this.mobileNav = mobileNav;
    this.mobileNavOpenCls = "mobile-nav__box--open";
    this.overflowPopup = document.createElement("div");
    this.overflowPopup.classList.add("popup-overflow");

    this.events = this.events.bind(this);
    this.openMobile = this.openMobile.bind(this);
    this.closeMobile = this.closeMobile.bind(this);

    this.events();
  }
  events() {
    this.burger.addEventListener("click", (event) => {
      if (!this.mobileNav.classList.contains(this.mobileNavOpenCls)) {
        this.openMobile();
      } else {
        this.closeMobile();
      }
    });
  }
  openMobile() {
    this.mobileNav.classList.add(this.mobileNavOpenCls);
    document.body.append(this.overflowPopup);
    document.body.style.overflowY = "hidden";
  }
  closeMobile() {
    this.mobileNav.classList.toggle(this.mobileNavOpenCls);
    this.overflowPopup.remove();
    document.body.style.overflowY = "";
  }
}
export function switchSolvingCards(btns, cards, firstClass, secondClass, time) {
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
export function removeActive(array, cls) {
  return array.forEach((elem) => {
    elem.classList.remove(cls);
  });
}
export function resetStyle(arr, val){
  arr.forEach(elem => {
    elem.style.marginRight = val
  })
}
export function tabsHover(array, openCls, hideCls){
  array.forEach(elem => {
    elem.addEventListener('mouseenter', item => {
      if(!elem.querySelector('.nav__item-box')) return
      elem.querySelector('.nav__item-box').classList.add(openCls)
    })
    elem.addEventListener('mouseleave', item => {
      if(!elem.querySelector('.nav__item-box')) return
      elem.querySelector('.nav__item-box').classList.remove(openCls)
    })
  })
}
