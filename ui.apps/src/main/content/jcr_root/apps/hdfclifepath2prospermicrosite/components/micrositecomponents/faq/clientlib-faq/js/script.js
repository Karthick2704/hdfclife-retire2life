$(document).ready(function () {
    const componetloaded = $('.faq');
    if (componetloaded.length > 0) {
        // Comments
        // Adding the swiper class name 
        function applySwiperClassesFaq() {
            const currentWidth = window.matchMedia('(max-width:660px)').matches;
            if (currentWidth) {
                const child1 = document.querySelector('.faq-nav-tabs');
                if (child1 && !child1.classList.contains('swiper-wrapper')) {
                    child1.classList.add('swiper-wrapper');
                    const child2 = document.querySelectorAll('.faq-nav-item');
                    child2.forEach((childnode) => {
                        if (!childnode.classList.contains('swiper-slide')) {
                            childnode.classList.add('swiper-slide');
                        }
                    });
                    const parent = document.querySelectorAll('.faq-nav-tab');
                    parent.forEach((parent) => {
                        parent.classList.add('swiper');
                    });
                }
            } else {
                const child1 = document.querySelector('.faq-nav-tabs');
                if (child1) {
                    child1.classList.remove('swiper-wrapper');
                    const child2 = child1.querySelectorAll('.faq-nav-item');
                    child2.forEach((childnode) => {
                        childnode.classList.remove('swiper-slide');
                    });
                    const parent = document.querySelectorAll('.faq-nav-tab');
                    parent.forEach((parent) => {
                        parent.classList.remove('swiper');
                    });
                }
            }
        }

        // Initialize Swiper only after applying the correct classes for responsiveness
        function initializeSwiper() {
            const swiperContainer = document.querySelector('.faq-nav-tab.swiper');
            if (swiperContainer) {
                const swiper = new Swiper('.faq-nav-tab.swiper', {
                    slidesPerView: 2,
                    mousewheel: {
                        forceToAxis: true,
                    },
                    navigation: {
                        nextEl: '.faq-button-next',
                        prevEl: '.faq-button-prev',
                    },
                    loop: false,
                    on: {
                        init: function () {
                            toggleArrowsCm(this);
                        },
                        slideChange: function () {
                            toggleArrowsCm(this);
                        },
                    },
                });
            } else {
                console.log('Swiper container not found');
            }
        }

        // Swiper first/second button visible
        function toggleArrowsCm(swiperInstance) {
            const prevButton = document.querySelector('.faq-button-prev');
            const nextButton = document.querySelector('.faq-button-next');

            if (!swiperInstance.params.loop) {
                prevButton.style.display = swiperInstance.isBeginning ? 'none' : '';
                nextButton.style.display = swiperInstance.isEnd ? 'none' : '';
            } else {
                prevButton.style.display = '';
                nextButton.style.display = '';
            }
        }

        // Swiper button should visible after adding 2 nav-items
        $(document).ready(function () {
            const faqbtn1 = document.querySelectorAll(".faq-button-prev,.faq-button-next");
            const faqnav = document.querySelectorAll(".faq-nav-item");
            if (faqnav.length < 3) {
                faqbtn1.forEach((btn) => {
                    btn.style.display = "none";
                });
            }
        });

        window.addEventListener('load', () => {
            applySwiperClassesFaq();
            initializeSwiper();
        });
        window.addEventListener('resize', () => {
            applySwiperClassesFaq();
            initializeSwiper();
        });

        // faq content slide,image.v-line toggle
        $(".faq-tab-content .faq-accordion-item").click(function () {
            const isVisible = $(this).find(".faq-accordion-content").is(":visible");
            $(this).find(".faq-accordion-content").slideToggle();
            if (isVisible) {
                $(this).find(".faq-vertical-line").css("height", "0px");
                $(".faqs-arrow-img img").css("transform", "rotate(0deg)");
            } else {
                $(this).find(".faq-vertical-line").css({
                    "height": "100px",
                    "transition": "height 0.5s ease"
                });
                $(".faqs-arrow-img img").css("transform", "rotate(180deg)");
            }
            $(".faq-tab-content .faq-accordion-item").not(this).each(function () {
                $(this).find(".faq-accordion-content").slideUp();
                $(this).find(".faq-vertical-line").css("height", "0px");
                $(this).find(".faqs-arrow-img img").css("transform", "rotate(0deg)");
            });
        });

        // Select nav-item, related content showup and viewAll/viewLess button 
        $(document).ready(function () {
            const firstNav = $(".faq-nav-item").first();
            const firstTabId = firstNav.data("tabnumber");
            const firstContent = $("#" + firstTabId);
            firstContent.css("display", "block");
            firstNav.addClass("faqactive");
            firstContent.find(".faq-accordion-item:gt(3)").hide();
            $(".faq-nav-item").click(function () {
                const navTitle = $(this).data("tabnumber");
                const contentBlock = $("#" + navTitle);
                $(".faq-nav-item").removeClass("faqactive");
                $(".faq-tab-content").hide();
                $(this).addClass("faqactive");
                contentBlock.css("display", "block");
                contentBlock.find(".faq-accordion-item:gt(3)").hide();
                $(".faq-button").html(($(".faq-button").data('show-more')) + ' <img src="' + $(".faq-button").data('show-more-icon') + '" alt="' + $(".faq-button").data('show-more-icon-alt') + '"> ');

            });
            $('.faq-button').on('click', function () {
                const activeTabId = $(".faq-nav-item.faqactive").data("tabnumber");
                const activeContent = $("#" + activeTabId);
                const hiddenItems = activeContent.find(".faq-accordion-item:gt(3)");

                let viewAll = $(this).data('show-more');
                let viewLess = $(this).data('show-less');
                let viewAllImage = $(this).data('show-more-icon');
                let viewLessImage = $(this).data('show-less-icon');
                let viewAllImageIcon = $(this).data('show-more-icon-alt');
                let viewLessImageIcon = $(this).data('show-less-icon-alt');
                if (hiddenItems.is(':visible')) {
                    hiddenItems.slideUp();
                    $(this).html(viewAll + ' <img src="' + viewAllImage + '" alt="' + viewAllImageIcon + '"> ');
                } else {
                    hiddenItems.slideDown();
                    $(this).html(viewLess + ' <img src="' + viewLessImage + '" alt="' + viewLessImageIcon + '">');
                }
            });
        });
    }
});











