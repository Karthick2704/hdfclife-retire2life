 $(document).ready(function () {
    const componentloadedv = $('.verticalsocialshare');
    if (componentloadedv.length > 0) {

        const currentUrln = window.location.href.trim();

        const socialShareLinks = {
            twitterShare: `https://twitter.com/intent/tweet?text=${currentUrln}`,
            facebookShare: `https://www.facebook.com/sharer/sharer.php?u=${currentUrln}`,
            linkedinShare: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrln}`,
            whatsappShare: `https://wa.me/?text=${currentUrln}`,
        };

        const socialShareIcons = document.querySelectorAll('.vertical-socialshare a');
        socialShareIcons.forEach(icon => {

            for (const [className, url] of Object.entries(socialShareLinks)) {
                if (icon.classList.contains(className)) {
                    icon.setAttribute('href', url);
                    break;
                }
            }
        });

     const copyTextn = document.querySelector(".vertical-copy-icon");
        const copiedTextn = document.querySelector(".vertical-copied-icon");
        const shareImagen = document.querySelector(".vertical-share-icon");
        const currentUrlsn = window.location.href.trim();
        
        if (copyTextn && copiedTextn && shareImagen) {
            shareImagen.addEventListener("mouseover", function () {
                copyTextn.style.display = "block";
                copiedTextn.style.display = "none";
            });
            shareImagen.addEventListener("mouseout", function () {
                copyTextn.style.display = "none";
                copiedTextn.style.display = "none";
            });
            shareImagen.addEventListener("click", function () {
                navigator.clipboard.writeText(currentUrlsn);
                copyTextn.style.display = "none";
                copiedTextn.style.display = "block";

            });
            shareImagen.addEventListener("mousedown", function () {
                copyTextn.style.display = "none";
                copiedTextn.style.display = "none";
            });
        }

    }
});
