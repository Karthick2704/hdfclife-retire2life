    function toggleDisclaimer() {
      const content = document.getElementById('disclaimer-content');
      const icon = document.getElementById('toggle-icon');

      // Toggle active class for the content
      content.classList.toggle('disclaimer-active');

      // Rotate the icon
      icon.classList.toggle('rotate');
   }