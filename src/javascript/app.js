// export class GalerySlider {
//   constructor(block, container, elems, count) {
//     //our main block width @elems inside
//     this.block = block;
//     //our main container which contain @main
//     this.container = container;
//     //slider items
//     this.elems = elems;
//     //number of starting slide
//     this.count = count;
//     //count check
//     this.countCheck = false;
//     //active bars
//     // this.barBox = document.createElement("div");
//     // this.barsLine = document.createElement("span");

//     this.setParam = this.setParam.bind(this);
//     this.events = this.events.bind(this);
//     this.startSlider = this.startSlider.bind(this);
//     this.stopSlider = this.stopSlider.bind(this);
//     this.draging = this.draging.bind(this);
//     this.changePosition = this.changePosition.bind(this);
//     this.resize = this.resize.bind(this);
//     this.removeEvents = this.removeEvents.bind(this);
//     // this.manageHtml = this.manageHtml.bind(this);
//     this.resize();
//     this.setParam();
//     this.events();
//   }
//   setParam() {
//     this.coords = this.block.getBoundingClientRect(); //get all coordinates of @block
//     this.coordsWidth = this.coords.width; //resive only width
//     this.center = //this calculations we are doing to get max position of last element, we will need this for easing, while person on last slide, //we get the center for all @elems in order to while scrolling they always be in center);
//       this.block.offsetLeft +
//       this.block.offsetWidth / 2 -
//       (this.container.offsetLeft + this.container.offsetWidth / 2);
//     this.maximumX = -(this.elems.length - 1) * this.center; //below we get the start position, which depens on what @count we wrote
//     this.changeX = -this.center * this.count; //we set some width parametrs for slider. to work correctly
//   }
//   events() {
//     this.container.addEventListener("pointerdown", this.startSlider); //do @startSlider func when we cliked on @block
//     this.container.addEventListener("pointerup", this.stopSlider); //do @stopSlider when person mouseup/pointerup on @window
//   }
//   removeEvents() {
//     this.container.removeEventListener("pointerdown", this.startSlider);
//     this.container.removeEventListener("pointerup", this.stopSlider);
//   }
//   startSlider(event) {
//     this.countCheck = false; //we still hold false, until person pointerup/mouseup from @block
//     this.mouseX = event.pageX; //geting static coordinates of click
//     this.startX = this.changeX; //save start position of @block
//     this.container.addEventListener("pointermove", this.draging); //while person clicked on slider, he/she/it can move it left or right, while this movement we are using @dragging func
//   }
//   stopSlider() {
//     this.container.removeEventListener("pointermove", this.draging); //after person mouseup/pointerup, we remove listener in order to avoid future errors which might happen
//     this.changeX = -this.center * this.count; //changing slide, if you keep reading you will se that after person move slider more/less than 20px/-20px, we increas default (0) number of @count. So our start position of slider multipy (1). So we move slider on that coordinates
//     this.changePosition(); //changing position after all
//   }
//   draging(event) {
//     const currentMove = event.pageX - this.mouseX; // here we dinamicly change coordinates of slider by using "mouse cliked" coordinates minus coordinates which we dinamicly get by moving mouse
//     const easing = currentMove / 10; //this is simple easing when person on first/last slide (we do this in order to avoid giant and fast movement)
//     this.changeX = Math.max(
//       Math.min(currentMove + this.startX, easing),
//       this.maximumX + easing
//     );
//     this.changePosition(); //change position, just edit trasform: translate3d
//     if (
//       currentMove > 20 &&
//       currentMove > 0 &&
//       !this.countCheck &&
//       this.count > 0
//     ) {
//       this.countCheck = true;
//       this.count = this.count - 1;
//     } //here we checking if person move slider more than 20px/-20px, for change number of slide. As i writte above, to change position
//     if (
//       currentMove < -20 &&
//       currentMove < 0 &&
//       !this.countCheck &&
//       this.count < this.elems.length - 1
//     ) {
//       this.countCheck = true;
//       this.count = this.count + 1;
//     }
//   }
//   resize() {
//     window.addEventListener("resize", () => {
//       this.setParam(); //we are just edit parametrs while some very picky developers or my boss want to see how good it works while resize width of screen
//     });
//   }
//   // manageHtml() {
//   //   if (window.innerWidth <= 768) {
//   //     this.barBox.className = "bars";
//   //     this.container.append(this.barBox);
//   //     for (let i = 0; i < this.elems.length; i++) {
//   //       this.barsLine = document.createElement("span");
//   //       this.barsLine.className = "bars-line";
//   //       this.barBox.append(this.barsLine);
//   //     }
//   //   }
//   // }
//   changePosition() {
//     this.block.style.transform = `translate3d(${this.changeX}px, 0, 0)`; //just change transform translate. so that is make slider move
//   }

//   sliderCenter() {
//     if (window.innerWidth <= 768) {
//       this.elems.forEach((e) => {
//         this.block.style.width = `${e.offsetWidth * this.elems.length}px`; //to set right width for @block, we might every @elems item multiply by all @elems length
//         e.style.width = `${e.offsetWidth}px`; //this if obviously :)
//       });
//     } else {
//       //if our window width are lower than 768px, we remove all size parametrs from @elems
//       this.elems.forEach((e) => {
//         this.block.style.width = ``;
//         e.style.width = ``;
//         this.changeX = 0;
//       });
//     }
//   }
//   //   sliderUsual() {
//   //     this.block.style.width = `${this.elems.length * this.coordsWidth}px`;
//   //     this.elems.forEach((item) => {
//   //       item.style.width = `${this.coordsWidth}px`;
//   //     });
//   //     this.setParam(this.block.getBoundingClientRect().width);
//   //   }
// }
export class GalerySlider {
  constructor(block, container, elems, count) {
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

    this.setEvents();
  }
  sliderCenter() {
    this.center = true;
    this.resizeGallery();
    this.setParametrs();
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
      : -this.count * this.width;
    this.maximumX = this.center
      ? -(this.elems.length - 1) * this.centerCoords
      : -(this.elems.length - 1) * this.width;
    this.block.style.width = `${
      this.center ? false : this.width * this.elems.length
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
  setEvents() {
    window.addEventListener("resize", this.resizeGallery);
    this.block.addEventListener("pointerdown", this.startSlide);
    window.addEventListener("pointerup", this.stopSlide);
  }
  startSlide(event) {
    this.countCheck = false;
    this.clientX = event.pageX;
    this.startX = this.x;
    window.addEventListener("pointermove", this.draging);
    this.resetStyleTransition();
  }
  stopSlide() {
    window.removeEventListener("pointermove", this.draging);
    this.x = this.center
      ? -this.count * this.centerCoords
      : -this.count * this.width;
    this.setStylePosition();
    this.setStyleTransition();
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
    this.count = 0;
    this.setParametrs();
  }
  setStyleTransition() {
    this.block.style.transition =
      "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)";
  }
  resetStyleTransition() {
    this.block.style.transition = "transform 0s cubic-bezier(0.22, 1, 0.36, 1)";
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
