document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper(".mf-swiper", {
    navigation: {
      nextEl: ".mf-swiper-button-next",
      prevEl: ".mf-swiper-button-prev",
    },
    mousewheel: {
      forceToAxis: true, // Ensures touchpad gestures are interpreted correctly
    },  
    pagination: {
      el: ".mf-swiper-pagination",
      clickable: true,
    },
  });
});

  