$(document).ready(function () {
    const componetloaded = $('.articleblog');
    if (componetloaded.length > 0) {

        document.addEventListener('click', function (event) {
            const isClickInside = event.target.closest('.share-icon, .share-popup');
            if (!isClickInside) {
                document.querySelectorAll('.share-popup').forEach(popup => popup.style.display = 'none');
            }
        });
    }

    new Swiper(".articleBlog-swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".articleBlog-carousel-control-next-icon",
            prevEl: ".articleBlog-carousel-control-prev-icon",
        },
        loop: false,
        breakpoints: {
            725: {
                slidesPerView: 2
            },
        }
    });
});

function togglePopup(shareIcon) {
    const popup = shareIcon.parentElement.querySelector('.share-popup');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        document.querySelectorAll('.share-popup').forEach(p => p.style.display = 'none');
        popup.style.display = 'block';
    }
}