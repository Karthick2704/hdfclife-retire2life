// Add click event listeners to tabs
function activateTabs() {

    document.querySelectorAll(".tc-tab-item").forEach((tab) => {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".tc-tab-item").forEach((item) => {
                item.classList.remove("active", "active-br-btm", "active-br-tp");
                item.querySelector('.tc-paracolor').style.removeProperty("background-color");
            });

            document.querySelectorAll(".tc-tab-pane").forEach((pane) => pane.classList.remove("active"));

            this.classList.add("active");
            if (this.previousElementSibling) {
                this.previousElementSibling.classList.add("active-br-btm");
            }
            if (this.nextElementSibling) {
                this.nextElementSibling.classList.add("active-br-tp");
            }

            const paracolorelement = this.querySelector('.tc-paracolor');
            const paracolor = paracolorelement.getAttribute("data-color");
            const target = this.getAttribute("data-tab");
            const color = this.getAttribute("data-color");
            const content = document.getElementById(target);
            const tctabcon = document.querySelector(".tc-tab-menu-container");
            const tctabmenu = document.querySelector(".tc-tab-menu");

            if (content) {
                content.classList.add("active");
                content.style.backgroundColor = color;
            }

            if (paracolorelement) {
                paracolorelement.style.backgroundColor = paracolor;
            }

            if (tctabmenu) {
                tctabmenu.style.backgroundColor = this.style.backgroundColor;
            }
            if (tctabcon) {
                tctabcon.style.backgroundColor = this.style.backgroundColor;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const paginations = document.querySelectorAll("[class^='tc-tab-swiper-pagination']");
    paginations.forEach(pagination => pagination.classList.add("tc-custom-pagination"));
});


// Function to apply Swiper classes dynamically
function applySwiperClasses() {
    const currentWidth = document.documentElement.clientWidth;
    const tabItems = document.querySelectorAll('.tc-tab-item');

    if (currentWidth <= 768) {
        const child1 = document.querySelector('.tc-tab-menu');
        if (child1 && !child1.classList.contains('swiper-wrapper')) {
            child1.classList.add('swiper-wrapper');

            tabItems.forEach((childnode) => {
                if (!childnode.classList.contains('swiper-slide')) {
                    childnode.classList.add('swiper-slide');
                }
            });

            let parent = child1.parentElement;
            if (!parent.classList.contains('swiper-container')) {
                const newParent = document.createElement('div');
                newParent.setAttribute('class', 'swiper-container tc-tab-menu-container');
                child1.insertAdjacentElement('beforebegin', newParent);
                newParent.appendChild(child1);
            }
        }
    } else {
        const child1 = document.querySelector('.tc-tab-menu');
        if (child1) {
            child1.classList.remove('swiper-wrapper');

            tabItems.forEach((childnode) => {
                childnode.classList.remove('swiper-slide');
            });

            const parent = child1.parentElement;
            if (parent && parent.classList.contains('swiper-container')) {
                parent.insertAdjacentElement('beforebegin', child1);
                parent.remove();
            }
        }
    }

    //  Fix: Restore Background Colors After Resize
    tabItems.forEach((tab) => {
        const bgColor = tab.getAttribute("data-color"); // Retrieve stored data-color attribute
        if (bgColor) {
            tab.style.backgroundColor = bgColor; // Restore background color
        }
    });
}

// Function to initialize or destroy Swiper for tab menu
let tabMenuSwiper = null;

function initializeOrDestroySwiper() {
    const currentWidth = document.documentElement.clientWidth;

    if (currentWidth <= 768) {
        if (!tabMenuSwiper) {
            tabMenuSwiper = new Swiper('.tc-tab-menu-container', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                loop: false,
                centerInsufficientSlides: false,
                navigation: {
                    nextEl: '.tc-tabmenu-button-next',
                    prevEl: '.tc-tabmenu-button-prev',
                },
                mousewheel: {
                    forceToAxis: true,
                },
                on: {
                    init: function () {
                        toggleArrows(this);
                        setActiveTab(this);
                        toggleBlurEffect(this);
                    },
                    slideChange: function () {
                        toggleArrows(this);
                        setActiveTab(this);
                        toggleBlurEffect(this);
                    },
                },
            });
        } else {
            tabMenuSwiper.update();
            toggleBlurEffect(tabMenuSwiper);
        }
    } else {
        if (tabMenuSwiper) {
            tabMenuSwiper.destroy(true, true);
            tabMenuSwiper = null;
        }
    }
}

// Function to toggle blur effect on tab menu Swiper
function toggleBlurEffect(swiper) {
    const container = document.querySelector('.tc-tab-menu-container');
    if (!container) return;

    if (swiper.isEnd) {
        container.classList.add('hide-right-blur');
    } else {
        container.classList.remove('hide-right-blur');
    }
}

// Function to show/hide navigation arrows
function toggleArrows(swiperInstance) {
    const prevButton = document.querySelector('.tc-tabmenu-button-prev');
    const nextButton = document.querySelector('.tc-tabmenu-button-next');

        prevButton.style.display = swiperInstance.isBeginning ? 'none' : '';
        nextButton.style.display = swiperInstance.isEnd ? 'none' : '';
}

// Function to set the first visible slide as the active tab
function setActiveTab(swiperInstance) {
    const allSlides = swiperInstance.slides;
    const firstVisibleIndex = swiperInstance.activeIndex;

    allSlides.forEach(slide => slide.classList.remove('active-tab'));

    const firstVisibleSlide = allSlides[firstVisibleIndex + 1];
    if (firstVisibleSlide) {
        firstVisibleSlide.classList.add('active-tab');
        firstVisibleSlide.click();
    }
}

// Swiper for carousels inside tabs
document.addEventListener('DOMContentLoaded', function () {
    const swipers = document.querySelectorAll('.tab-swiper-container');
    swipers.forEach((swipercontainer, index) => {
        new Swiper(swipercontainer, {
            loop: true,
            pagination: {
                el: `.tc-tab-swiper-pagination${index + 1}`,
                clickable: true,
            },
            mousewheel: {
                forceToAxis: true,
            },
            navigation: {
                nextEl: '.tab-button-next',
                prevEl: '.tab-button-prev',
            },
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    activateTabs();
    applySwiperClasses();
    initializeOrDestroySwiper();
    const tab = document.querySelectorAll(".tc-tab-item")[1];
    const currentWidth = document.documentElement.clientWidth;
    if (currentWidth >= 768) {
        if (tab) {
            tab.click();
        }
    }
});

// let resizeTimeout;

window.addEventListener("resize", () => {
    activateTabs();
    applySwiperClasses();
    initializeOrDestroySwiper();
    // Reapply Background Colors
    document.querySelectorAll(".tc-tab-item").forEach((tab) => {
        const bgColor = tab.getAttribute("data-color");
        tab.style.backgroundColor = bgColor; // Force apply color
    });
    const activebg = document.querySelector(".tc-tab-menu .active");
    if (activebg) {
        activebg.click();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tc-tab-menu > *");
    const container = document.querySelector(".tc-tab-menu-container");

    if (tabs.length > 0 && container) {
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", function () {
                if (index === tabs.length - 1) {
                    // If last tab is clicked, hide ::after
                    container.classList.add("hide-after");
                } else {
                    // If any other tab is clicked, show ::after
                    container.classList.remove("hide-after");
                }
            });
        });
    }
});