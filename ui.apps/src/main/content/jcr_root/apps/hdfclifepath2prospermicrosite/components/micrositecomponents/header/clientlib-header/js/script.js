
function toggleSearch() {
    const searchContainer = document.getElementById('hc-searchContainer');
    const headerSection = document.getElementById('hc-header-container-section');
    const body = document.body;

    if (searchContainer.style.display === "none" || headerSection.style.display === "block") {
        searchContainer.style.display = "block";
        headerSection.style.display = "none";
        body.classList.add('hc-header-no-scroll');
    } else {
        searchContainer.style.display = "none";
        headerSection.style.display = "block";
        body.classList.remove('hc-header-no-scroll');
    }
}

function toggleClick() {
    const searchMenu = document.getElementById('hc-header-mobile-nav-search-section');
    const menuImage = document.getElementById('mobileMenuImage');
    const menuCancelImage = document.getElementById('mobileMenuCancelImage');
    const secondaryLogoImage = document.getElementById('secondaryLogoImage');
	const mobileSecondaryLogoImage = document.getElementById('mobileSecondaryLogoImage');
    const headerMobileSectionOne = document.querySelector('.hc-header-mobile-section-one');
    const headerMobileSectionTwo = document.querySelector('.hc-header-mobile-section-two-description');
    const mainBgColor = document.querySelector('.hc-header-mobile-main-section');
    const mobileMessageIcon = document.querySelector('#mobileMessageIcon');
    const mobileMessageIconTwo = document.querySelector('#mobileMessageIconTwo');
    const mobileContainer = document.getElementById('hc-header-mobile-main-container');
    const mobileBorderColor = document.querySelector('.hc-mobile-color-border')
	const body = document.body;


    if (searchMenu.style.display === "none") {

        searchMenu.style.display = "block";
        menuImage.style.display = "none";
        menuCancelImage.style.display = "block";
        secondaryLogoImage.style.display = "none";
        mobileSecondaryLogoImage.style.display = "block";
        headerMobileSectionOne.style.padding= "22px 20px";
        mainBgColor.style.backgroundColor ="transparent";
        headerMobileSectionTwo.style.color = "#E0E0E0";
        mainBgColor.style.gap = "5%";
        mobileMessageIcon.style.display ="block";
        mobileMessageIconTwo.style.display ="none";
        body.classList.add('hc-header-no-scroll');
        mobileContainer.style.height="100dvh";
        mobileBorderColor.style.display="none";

    } else {

        searchMenu.style.display = "none";
        menuImage.style.display = "block";
        menuCancelImage.style.display = "none";
        mainBgColor.style.backgroundColor = "#ffffff";
        secondaryLogoImage.style.display = "block";
        mobileSecondaryLogoImage.style.display = "none";
        headerMobileSectionOne.style.padding= "12px 20px";
        headerMobileSectionTwo.style.color = "#000000";
        mainBgColor.style.gap = "2%";
        mobileMessageIcon.style.display ="none";
        mobileMessageIconTwo.style.display ="block";
        body.classList.remove('hc-header-no-scroll');
        mobileContainer.style.height="0";
        mobileBorderColor.style.display="flex";

    }
    adjustheader();
}

document.querySelectorAll('.hc-header-mobile-main-section #mobileMenuImage, .hc-header-mobile-main-section #mobileMenuCancelImage').forEach(element => {
    element.addEventListener('click', function() {        
            toggleClick();        
    });
});



// openGmailCompose

function openGmailCompose() {
    const email = "buyonline@hdfclife.in";
    const element = document.querySelector('.hc-header-conatiner-message-image');
    const subject = element.getAttribute('data-subject');
    const body = "";

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Check if the user is on a mobile device
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = mailtoUrl;  // Opens the default mail app (Gmail, Outlook, etc.)
    } else {
        window.open(gmailUrl, '_blank', 'width=600,height=600,top=100,left=100'); // Opens Gmail compose in a new window
    }
}


// search

const inputFields = document.querySelectorAll("#hc-inputForm, #hc-inputForm1").forEach(function (inputField){

    inputField.addEventListener('keydown', function (event) {
      if (event.key === ' ' && this.value.trim() === '') {
        event.preventDefault();
      }
    });
  });

function handleSearch(buttonOrInput) {
    let inputFieldId = "";
    if($(window).width() <= 768){
        inputFieldId = $("#hc-inputForm1").val();
    }else{
        inputFieldId = $("#hc-inputForm").val();
    }
    // const input1Value = document.getElementById(inputFieldId).value || "";
    const searchPath = buttonOrInput.dataset?.searchPath || buttonOrInput.closest('[data-search-path]')?.dataset.searchPath;
    if (searchPath && inputFieldId.length > 0) {
        const redirectUrl = searchPath.toString() + "?searchText=" + encodeURIComponent(inputFieldId);
        window.open(redirectUrl, "_self");
    } else {
        console.error("Search path is not defined.");
    }
}


document.querySelectorAll("#hc-submit2, #hc-submit").forEach(function (button) {
    button.addEventListener("click", function (event) {

        event.preventDefault();
        handleSearch(this);
    });
});


document.querySelectorAll("#hc-inputForm, #hc-inputForm1").forEach(function (input) {
    input.addEventListener("keydown", function (event) {
        if (event.which === 13) {
            event.preventDefault();
            const correspondingButton = this.id === "hc-inputForm" ? document.getElementById("hc-submit") : document.getElementById("hc-submit2");
            handleSearch(correspondingButton);
        }
    });
});


const inputFieldOne = document.querySelectorAll("#hc-inputForm, #hc-inputForm1").forEach(function (input){

    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var currentPagePath = window.location.pathname.split(".html")[0];
    var navLinks = document.querySelectorAll(".hc-header-nav-option-container .hc-nav-item");

    navLinks.forEach(function (link) {
        var targetPath = link.getAttribute("href")?.split(".html")[0];

        var cleanedTargetPath = targetPath.replace(/^\/content\/hdfclifepath2prosper\/us\/en\//, '/');
            if (currentPagePath.includes(targetPath) || currentPagePath.includes(cleanedTargetPath)) {
                link.classList.add("active");
            }
    });
});

$(document).ready(function(){
    adjustheader();
    $(window).on("resize", function () {
        adjustheader();
    });
})

function adjustheader() {
    const headerContainer = document.querySelector("#hc-header-container-section").offsetHeight -1;
    const mobileHeaderContainer = document.querySelector(".hc-header-mobile-main-section").offsetHeight;
    const colorBar = document.querySelector(".hc-mobile-color-border").offsetHeight;
    const emptyDiv = document.querySelector(".space-div");
    const currentWidth = window.matchMedia('(max-width:768px)').matches;
    if(currentWidth){
        emptyDiv.style.height = mobileHeaderContainer + colorBar + "px"; 
    }else{
        emptyDiv.style.height = headerContainer + "px"; 
    }     
}


// Path field

document.querySelectorAll('.hc-main-container a, .hc-main-container button').forEach((element) => {
    let attr = element.tagName === 'A' ? 'href' : 'data-search-path';
    let value = element.getAttribute(attr);

    if (!value) {
        return;
    }

    if (value.includes('content/hdfclifepath2prosper') && !value.endsWith('.html')) {
        element.setAttribute(attr, value + '.html');
    }
});

        