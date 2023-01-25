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
    //active bars
    // this.barBox = document.createElement("div");
    // this.barsLine = document.createElement("span");
    this.coords;

    this.setParam = this.setParam.bind(this);
    this.events = this.events.bind(this);
    this.startSlider = this.startSlider.bind(this);
    this.stopSlider = this.stopSlider.bind(this);
    this.draging = this.draging.bind(this);
    this.changePosition = this.changePosition.bind(this);
    this.resize = this.resize.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.getSizes = this.getSizes.bind(this);
    // this.manageHtml = this.manageHtml.bind(this);

    this.resize();
    this.events();
  }
  getSizes() {
    this.coords = this.block.getBoundingClientRect(); //get all coordinates of @block
    this.coordsWidth = this.coords.width; //resive only width
  }
  setParam(coord) {
    this.coordVal = coord;
    this.maximumX = -(this.elems.length - 1) * this.coordVal; //below we get the start position, which depens on what @count we wrote
    this.changeX = -this.coordVal * this.count; //we set some width parametrs for slider. to work correctly
  }
  events() {
    this.block.addEventListener("pointerdown", this.startSlider); //do @startSlider func when we cliked on @block
    this.block.addEventListener("pointerup", this.stopSlider); //do @stopSlider when person mouseup/pointerup on @window
  }
  removeEvents() {
    this.block.removeEventListener("pointerdown", this.startSlider);
    this.block.removeEventListener("pointerup", this.stopSlider);
  }
  startSlider(event) {
    this.countCheck = false; //we still hold false, until person pointerup/mouseup from @block
    this.mouseX = event.pageX; //geting static coordinates of click
    this.startX = this.changeX; //save start position of @block
    this.block.addEventListener("pointermove", this.draging); //while person clicked on slider, he/she/it can move it left or right, while this movement we are using @dragging func
  }
  stopSlider() {
    this.block.removeEventListener("pointermove", this.draging); //after person mouseup/pointerup, we remove listener in order to avoid future errors which might happen
    this.changeX = -this.coordVal * this.count; //changing slide, if you keep reading you will se that after person move slider more/less than 20px/-20px, we increas default (0) number of @count. So our start position of slider multipy (1). So we move slider on that coordinates
    this.changePosition(); //changing position after all
  }
  draging(event) {
    const currentMove = event.pageX - this.mouseX; // here we dinamicly change coordinates of slider by using "mouse cliked" coordinates minus coordinates which we dinamicly get by moving mouse
    const easing = currentMove / 10; //this is simple easing when person on first/last slide (we do this in order to avoid giant and fast movement)
    this.changeX = Math.max(
      Math.min(currentMove + this.startX, easing),
      this.maximumX + easing
    );
    this.changePosition(); //change position, just edit trasform: translate3d
    if (
      currentMove > 20 &&
      currentMove > 0 &&
      !this.countCheck &&
      this.count > 0
    ) {
      this.countCheck = true;
      this.count = this.count - 1;
    } //here we checking if person move slider more than 20px/-20px, for change number of slide. As i writte above, to change position
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
      this.getSizes();
      this.setParam(); //we are just edit parametrs while some very picky developers or my boss want to see how good it works while resize width of screen
    });
  }
  // manageHtml() {
  //   if (window.innerWidth <= 768) {
  //     this.barBox.className = "bars";
  //     this.container.append(this.barBox);
  //     for (let i = 0; i < this.elems.length; i++) {
  //       this.barsLine = document.createElement("span");
  //       this.barsLine.className = "bars-line";
  //       this.barBox.append(this.barsLine);
  //     }
  //   }
  // }
  changePosition() {
    this.block.style.transform = `translate3d(${this.changeX}px, 0, 0)`; //just change transform translate. so that is make slider move
  }

  sliderCenter() {
    this.center =
      this.block.offsetLeft + //some number of px of @block from left
      this.block.offsetWidth / 2 - //some number of px of @blok width, the same we do for @container
      (this.container.offsetLeft + this.container.offsetWidth / 2); //this calculations we are doing to get max position of last element, we will need this for easing, while person on last slide, //we get the center for all @elems in order to while scrolling they always be in center
    this.getSizes();
    if (window.innerWidth <= 768) {
      this.events();
      this.elems.forEach((e) => {
        this.block.style.width = `${e.offsetWidth * this.elems.length}px`; //to set right width for @block, we might every @elems item multiply by all @elems length
        e.style.width = `${e.offsetWidth}px`; //this if obviously :)
      });
    } else {
      //if our window width are lower than 768px, we remove all size parametrs from @elems
      this.elems.forEach((e) => {
        this.block.style.width = ``;
        e.style.width = ``;
        this.changeX = 0;
        this.removeEvents();
        this.changePosition();
      });
    }
    this.setParam(this.center);
  }
  sliderUsual() {
    this.getSizes();
    this.block.style.width = `${this.elems.length * this.coordsWidth}px`;
    this.elems.forEach((item) => {
      item.style.width = `${this.coordsWidth}px`;
    });
    this.setParam(this.coordsWidth);
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
