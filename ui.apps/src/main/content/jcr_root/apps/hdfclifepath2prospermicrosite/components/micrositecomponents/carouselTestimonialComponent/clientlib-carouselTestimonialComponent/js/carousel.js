
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.testimonial-swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.testimonial-car-body .testimonial-car-indicators',
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        navigation: {
            nextEl: '.testimonial-car-body .swiper-button-next',
            prevEl: '.testimonial-car-body .swiper-button-prev',
        },
        mousewheel: {
            forceToAxis: true, // Ensures touchpad gestures are interpreted correctly
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2.3,
            },
        },
        on: {
            init: function () {
                document.querySelector('.testimonial-car-body .swiper-button-prev').classList.add('swiper-button-disabled');
                applyPartialVisibleClass(this);
            },
            slideChange: function () {
                if (swiper.activeIndex === 0) {
                    document.querySelector('.testimonial-car-body .swiper-button-prev').classList.add('swiper-button-disabled');
                } else {
                    document.querySelector('.testimonial-car-body .swiper-button-prev').classList.remove('swiper-button-disabled');
                }
                applyPartialVisibleClass(this);
            },
        },
    });
    function applyPartialVisibleClass(swiper) {
        // Remove 'partial-visible' class from all slides
        swiper.slides.forEach((slide) => {
            slide.classList.remove('partial-visible');
        });
        // Determine the indices of partially visible slides based on screen width
        const screenWidth = window.innerWidth;
        let leftIndex, rightIndex;
        if (screenWidth < 768) {
            // Mobile view: Show 1 full slide and apply opacity to the second partially visible slide
            leftIndex = swiper.activeIndex - 1;
            rightIndex = swiper.activeIndex + 1;
        } else {
            // Desktop view: Show 2 full slides and apply opacity to the third partially visible slide
            leftIndex = swiper.activeIndex - 1;
            rightIndex = swiper.activeIndex + 2;
        }
        // Apply 'partial-visible' class if the indices are within bounds
        if (leftIndex >= 0) {
            swiper.slides[leftIndex].classList.add('partial-visible');
        }
        if (rightIndex < swiper.slides.length) {
            swiper.slides[rightIndex].classList.add('partial-visible');
        }
    }
    // Reapply opacity classes on resize
    window.addEventListener('resize', function () {
        applyPartialVisibleClass(swiper);
    });
});
 
window.addEventListener('load', function () {  
    SetHeightTc();
});
 
window.addEventListener('resize', function () {  
    SetHeightTc();
});
 
function SetHeightTc(){
    var maxHeight = 0;   
    $('.testimonialcar-richtext').css('height', 'auto');
    $('.testimonialcar-richtext').each(function() {
        var thisHeight = $(this).outerHeight();
        if (thisHeight > maxHeight) {
            maxHeight = thisHeight;
        }
    });
    $('.testimonialcar-richtext').height(maxHeight);
}
 
 