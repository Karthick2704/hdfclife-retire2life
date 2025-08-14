


$(document).ready(function(){
    $(".socialMediaLinks").on('click', function(e){
        e.preventDefault();
        let socialMediaLink = $(this).attr("href");
        let blogurl = $(this).attr("data-target-link");
        window.open(`${socialMediaLink}${window.location.origin}${blogurl}`, '_blank')
    })
})

// document.addEventListener("DOMContentLoaded", function() {
//     const images = document.querySelectorAll('img');
//     images.forEach(img => {
//       if (!img.hasAttribute('loading')) {
//         img.setAttribute('loading', 'lazy');
//       }
//     });
//   });