$(document).ready(function () {
    const componetloaded = $('.video');
    if (componetloaded.length > 0) {


        const url = $('#videoIframe').data('video-url').match(/(?:youtu\.be\/|v=|\/embed\/|v\/|watch\?v=|\&v=)([^#\&\?]{11})/);
        if (url) $('#videoIframe').attr('src', 'https://www.youtube.com/embed/' + url[1]);

        document.querySelectorAll('.video-container').forEach(component => {
            const width = component.getAttribute('data-width');
            if (width) {
                component.style.width = width + 'px';
            }
        });


    }
});