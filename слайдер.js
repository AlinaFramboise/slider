let images = [{
    url: "https://tvoisadrus.ru/upload/resize_cache/webp/iblock/f7a/450_450_2/f7ad3dbf8977607ec593c499a5991037.webp",
    title: "Rose"
  }, {
    url: "https://optroz.ru/upload/iblock/434/4344f9f7ee5ebc7708c5964bf46e91f2.jpg",
    title: "Peony"
  }, {
    url: "https://www.ruscemena.ru/files/product/1482_2.jpg?tagtag_uid=259da70eaf57eb62f525fdbc550a8190&utm_source=admitad&utm_medium=cpa&umt_campaign=442763",
    title: "Lily"
  }, {
    url: "https://agrosemfond.ru/upload/resize_cache/webp/iblock/c33/650_650_1/e4aa914df29111e58c15001e67b6d355_8a4197eb361a11eb80e20cc47a28e351.resize1.webp?admitad_uid=56d361830d5009698b88b076ef431d7a&utm_source=asf_admitad",
    title: "Freesia"
  }];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  
  initImages();
  initArrows();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
  
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});