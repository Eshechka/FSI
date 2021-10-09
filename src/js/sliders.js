  // core version + navigation, pagination modules:
  import Swiper, { Navigation, Pagination, Parallax } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/parallax';
  //   import 'swiper/css/pagination';

  // configure Swiper to use modules
  Swiper.use([Navigation, Pagination, Parallax]);

  //BildSlider
  let sliders = document.querySelectorAll('._swiper');
  if (sliders) {
      for (let index = 0; index < sliders.length; index++) {
          let slider = sliders[index];
          if (!slider.classList.contains('swiper-bild')) {
              let slider_items = slider.children;
              if (slider_items) {
                  for (let index = 0; index < slider_items.length; index++) {
                      let el = slider_items[index];
                      el.classList.add('swiper-slide');
                  }
              }
              let slider_content = slider.innerHTML;
              let slider_wrapper = document.createElement('div');
              slider_wrapper.classList.add('swiper-wrapper');
              slider_wrapper.innerHTML = slider_content;
              slider.innerHTML = '';
              slider.appendChild(slider_wrapper);
              slider.classList.add('swiper-bild');
          }
      }
  }


  if (document.querySelector('.slider-main__body')) {
      const swiper = new Swiper('.slider-main__body', {

          observer: true,
          observeParents: true,
          slidesPerView: 1,
          spaceBetween: 0,
          watchOverflow: true,
          speed: 800,
          loop: true,
          loopAdditionalSlides: 5,
          preloadImages: false,
          parallax: true,
          // Dotts
          pagination: {
              el: '.controls-slider-main__dots',
              clickable: true,
          },
          // Arrows
          navigation: {
              nextEl: '.slider-main .slider-arrow_next',
              prevEl: '.slider-main .slider-arrow_prev',
          },
      });
  }

  if (document.querySelector('.slider-rooms__body')) {
      const swiper = new Swiper('.slider-rooms__body', {
          observer: true,
          observeParents: true,
          slidesPerView: "auto",
          spaceBetween: 24,
          watchOverflow: true,
          speed: 800,
          loop: true,
          loopAdditionalSlides: 5,
          preloadImages: false,
          parallax: true,
          // Dotts
          pagination: {
              el: '.slider-rooms__dotts',
              clickable: true,
          },
          // Arrows
          navigation: {
              prevEl: '.slider-rooms .slider-arrow_prev',
              nextEl: '.slider-rooms .slider-arrow_next',
          },
      });
  }
  if (document.querySelector('.slider-tips__body')) {
      const swiper = new Swiper('.slider-tips__body', {
          observer: true,
          observeParents: true,
          slidesPerView: 3,
          spaceBetween: 32,
          watchOverflow: true,
          speed: 800,
          loop: true,
          // Dotts
          pagination: {
              el: '.slider-tips__dotts',
              clickable: true,
          },
          // Arrows
          navigation: {
              prevEl: '.slider-tips .slider-arrow_prev',
              nextEl: '.slider-tips .slider-arrow_next',
          },
          breakpoints: {
              320: {
                  slidesPerView: 1,
                  spaceBetween: 15,
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
              },
              992: {
                  slidesPerView: 3,
                  spaceBetween: 32,
              },
          }
      });
  }