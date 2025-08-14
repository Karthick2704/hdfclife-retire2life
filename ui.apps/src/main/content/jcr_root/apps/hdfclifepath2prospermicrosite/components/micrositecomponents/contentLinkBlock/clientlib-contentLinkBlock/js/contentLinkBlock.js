$(document).ready(function () {
    const componetloaded = $('.contentLinkBlock');
    if (componetloaded.length > 0) {

    document.querySelectorAll(".contentLinkBlock-scroll").forEach(function(link) {
        const headerheight = document.querySelector(".space-div").offsetHeight;
        const carouselheight = document.querySelector(".carouselMenu").offsetHeight; 
        link.addEventListener("click", function(event) {
            event.preventDefault();            
            let targetId = this.getAttribute("data-target");
            let target = document.querySelector(targetId);            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - headerheight - carouselheight - 40,
                    behavior: "smooth"
                });
            }
        });
    });
    }
});
