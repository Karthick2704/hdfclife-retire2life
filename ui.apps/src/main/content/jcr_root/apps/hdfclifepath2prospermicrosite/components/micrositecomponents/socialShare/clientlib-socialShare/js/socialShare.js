$(document).ready(function () {
    const componentloadeds = $('.socialShare');
    if (componentloadeds.length > 0) {

        const currentUrl = window.location.href.trim();
        
        const socialLinks = {
            twitter: `https://twitter.com/intent/tweet?text=${currentUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
            whatsapp: `https://wa.me/?text=${currentUrl}`,
        };

        const socialIcons = document.querySelectorAll('.ss-icon-group a');

        socialIcons.forEach(icon => {
            for (const [className, url] of Object.entries(socialLinks)) {
                if (icon.classList.contains(className)) {
                    icon.setAttribute('href', url);
                    break;
                }
            }


        });

        const copyText = document.querySelector(".ss-copy-icon");
        const copiedText = document.querySelector(".ss-copied-icon");
        const shareImage = document.querySelector(".share");
        const currentUrls = window.location.href.trim();
        
        if (copyText && copiedText && shareImage) {
            shareImage.addEventListener("mouseover", function () {
                copyText.style.display = "block";
                copiedText.style.display = "none";
            });
            shareImage.addEventListener("mouseout", function () {
                copyText.style.display = "none";
                copiedText.style.display = "none";
            });
            shareImage.addEventListener("click", function () {
                navigator.clipboard.writeText(currentUrls);
                copyText.style.display = "none";
                copiedText.style.display = "block";

            });
            shareImage.addEventListener("mousedown", function () {
                copyText.style.display = "none";
                copiedText.style.display = "none";
            });
        }


    }
});