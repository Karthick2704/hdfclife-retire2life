$(document).ready(function () {
    const componetloaded = $('.carouselMenu');
    if (componetloaded.length > 0) {

        var getAttr = "";
        var headerHeight = $(".space-div").height() + $(".cm-swiper-container").height() + 10;
        console.log(headerHeight);

        $(document).on("click", ".cm-carousel-title", function () {

            var getAttr = $(this).parent().attr("getAttr");
            var getTop = $("#" + $(this).parent().attr("getAttr")).offset().top;
            $("html, body").animate({ scrollTop: getTop - headerHeight + 20 });
            $(this).find(">a").addClass("cm-active");   
        });

        const swiper = new Swiper('.cm-swiper', {
            slidesPerView: 3,
            navigation: {
                prevEl: '.cm-button-prev',
                nextEl: '.cm-button-next',
            },
            on: {
                init: function () {
                    toggleArrowsCm(this);
                },
                slideChange: function () {
                    toggleArrowsCm(this);
                },
            },
        });

        $(document).on("click", ".cm-button-next, .cm-button-prev", function () {
            var headerHeights = $(".space-div").height() + $(".cm-swiper-container").height() + 10;
            var getAttr = $(".swiper-slide.swiper-slide-active > a").attr("href");
            window.location = getAttr;
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top - headerHeights + 20
                }, 10);
            }, 0);

        });



        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".swiper-slide a");
        const carouselContainer = document.querySelector('.cm-swiper-container');
        const headerSection = document.querySelector('#hc-desktop-main-container');
        const swiperSection = document.querySelector('.cm-swiper-container');

        let scrollTimeout;
        window.addEventListener("scroll", () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                let scrollPosition = window.scrollY;
                const headerHeight = headerSection ? headerSection.offsetHeight : 0;
                const swiperHeight = swiperSection ? swiperSection.offsetHeight : 0;
                const totalHeight = headerHeight + swiperHeight;
                if (scrollPosition === 0) {
                    carouselContainer.style.display = 'none';
                } else {
                    carouselContainer.style.display = 'block';
                }
                sections.forEach((section) => {
                    let offsetTop = section.offsetTop - totalHeight;
                    let offsetBottom = offsetTop + section.offsetHeight;
                    let id = section.getAttribute("id");

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        navLinks.forEach((link) => link.classList.remove("cm-active"));
                        const currentLink = document.querySelector(
                            '.swiper-slide a[href="#' + id + '"]');
                        if (currentLink) {
                            currentLink.classList.add("cm-active");
                            const activeIndex = [...navLinks].indexOf(currentLink);
                            if (activeIndex >= 0) {
                                swiper.slideTo(activeIndex, 500);
                            }
                        }
                    }
                });
            }, 50);
        });

    }
});
function toggleArrowsCm(swiperInstance) {
    const prevButton = document.querySelector('.cm-button-prev');
    const nextButton = document.querySelector('.cm-button-next');

    if (!swiperInstance.params.loop) {
        prevButton.style.display = swiperInstance.isBeginning ? 'none' : '';
        nextButton.style.display = swiperInstance.isEnd ? 'none' : '';
    } else {
        prevButton.style.display = '';
        nextButton.style.display = '';
    }
}