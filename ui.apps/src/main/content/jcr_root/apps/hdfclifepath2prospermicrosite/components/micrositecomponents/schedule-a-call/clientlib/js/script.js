// var Sitekey = '6Leh5h0UAAAAADDvPeY_frLQsgcvxQrc1rB4rbPQ';
var captachaResponse
// BELOW FUNCTION REMOVES EMOJIS AND '<','>' SCRIPT BRACKETS FROM ALL INPUT FIELDS
$('input[type=text], input[type=number]').on('input', function (event) {
  var pattern = /^$|^(?!\s)[a-zA-Z0-9,.;:_@.#&!-/()'\s-]+$/;
  var value = $(this).val();
  if (!(pattern.test(value))) {
    $(this).val('');
    var emojiError = $(this).parent().find('.error-txt')
    emojiError.text('');
    emojiError.removeClass('d-block');
  }
})

$("[data-validation]").on("input", function (event) {
  var validation = $(this).attr("data-validation");
  if ($(event.currentTarget).is(':visible')) {
    validationobj[validation](event);
  }
});

var validationobj = {
  mobileNo: mobileNumberValidation,
  fullname: nameValidation
}


// name validation

function nameValidation(event) {
  //GET ALL ELEMENTS

  var _obj = returnValidationElements(event);
  var currentElement = _obj.ele;
  var currentValue = _obj.value;
  var fvc = _obj.fvc;

  var pattern = /^[a-zA-Z\s]+$/;
  if (currentValue !== "" && currentValue != undefined) {
    if (!pattern.test(currentValue)) {
      $(currentElement).find(".error-txt").addClass("d-block");
      $(currentElement).find(".error-txt").removeClass("d-none");
      $(currentElement).find(".error-txt").text("Please enter valid name");
      // $(currentElement).find(".error-txt").text("Field should contain minimum 3 and max 50 characters");
      fvc.classList.remove("valid");
    } else if (currentValue.length < 3 || currentValue.length > 50) {
      $(currentElement).find(".error-txt").addClass("d-block");
      $(currentElement).find(".error-txt").removeClass("d-none");
      $(currentElement).find(".error-txt").text("Field should contain minimum 3 and max 50 characters");
      fvc.classList.remove("valid");
    } else {
      $(currentElement).find(".error-txt").text("");
      fvc.classList.add("valid");
    }
  } else {
    $(currentElement).find(".error-txt").addClass("d-block");
    $(currentElement).find(".error-txt").text("Please enter valid name");
    fvc.classList.remove("valid");
  }
}

function returnValidationElements(event) {
  var ele =
    event.currentTarget.closest(".form-group,.ta-val-fn") || event.currentTarget.parentElement;
  var value = event.currentTarget.value;
  var fvc = event.currentTarget.closest(".form-group") || ele;
  return {
    ele,
    value,
    fvc
  };
}

var notAllowedNumbersArray =
  [
    7070700707,
    8889988899,
    8555666666,
    9858888888,
    8065656565,
    7007601255,
    8989899999,
    9989998040,
    9000000000,
    9898898989,
    8888888888,
    9999999999,
    9111111111,
    9777777777,
    9890098900,
    8989999999,
    9888888888,
    9999955555,
    9999995555,
    7777777777,
    9899999999,
    9999900000,
    9898989898,
    9898989888,
    8787878787,
    9999999991,
    9999999995,
    9999999992,
    9999999990,
    9898999999,
    9999908765,
    6999999999,
    9999988888,
    8999999999,
    9898988888,
    8998989898,
    9890000000,
    9898899889,
    9000000001,
    9811111111,
    6666666666,
    9999099990,
    8989898989,
    9555555555,
    9000000009,
    9222222222,
    9877777777,
    9699999999,
    9666666666,
    7999999999,
    8585858585,
    9820098200,
    8000000000,
    9800000000,
    7878787878,
    9999999989,
    9898988988,
    9999000099,
    8888888889,
    9099999999,
    9999999996,
    9999999998,
    9123456789,
    9999999919,
    9898989999,
    9999911111,
    9900990099,
    7676767676,
    9999998888,
    9900000000,
    8888999900,
    9898889898,
    7000000000,
    9889898989,
    9999966666,
    9999999988,
    9999999958,
    9999999898,
    9898998989,
    9999999997,
    9797979797,
    8888899999,
    9977997799,
    6565656565,
    9999999909,
    9000000008,
    9960000000,
    9858585858,
    9999999993,
    9999999900,
    9988877888,
    1111111111,
    9898959898,
    9999000000,
    9998888999,
    8888800000,
    9898998999,
    8056565656,
    9988889999,
    9711111111,
    9999912345,
    7788778877,
    9100000000,
    8999989999,
    8888888855,
    8899999999,
    9999999922,
    9988998899,
    9191919191,
    9977777777,
    9999990000,
    8080808080,
    9999922222,
    9000090000,
    9200000000,
    9998888888,
    8888888880,
    9999999966,
    9856666666,
    1234567890,
    8989898888,
    8988888888,
    6777777777,
    9820000000,
    9700000000,
    9494949494,
    8777777777,
      0000000000
  ]


// mobile number validation
function mobileNumberValidation(event) {
  //GET ALL ELEMENTS


  var _obj = returnValidationElements(event);
  var currentElement = _obj.ele;
  var currentValue = _obj.value;
  var fvc = _obj.fvc;
  var blockSpecificNumbers = event.currentTarget.dataset.blockspecificnumbers

  var pattern = /^[0]?[6789]\d{9}$/;
  if (currentValue !== "") {
    if (currentValue.length != 10) {
      $(currentElement).find(".error-txt").addClass("d-block");
      $(currentElement)
        .find(".error-txt")
        .text("Please enter valid mobile number");
      fvc.classList.remove("valid");
    } else if (!pattern.test(currentValue)) {
      $(currentElement).find(".error-txt").addClass("d-block");
      $(currentElement)
        .find(".error-txt")
        .text("Please enter valid mobile number");
      fvc.classList.remove("valid");
    } else if (blockSpecificNumbers && notAllowedNumbersArray.includes(Number(currentValue))) {
      // BLOCK SPECIFIC NUMBER FOR SANCHAY PLUS OTP REQUIREMENT
      $(currentElement).find(".error-txt").addClass("d-block");
      $(currentElement)
        .find(".error-txt")
        .text("Please enter valid mobile number");
      fvc.classList.remove("valid");
    } else {
      $(currentElement).find(".error-txt").text("");
      fvc.classList.add("valid");
    }
  } else {
    $(currentElement).find(".error-txt").addClass("d-block");
    $(currentElement).find(".error-txt").text("Please enter mobile number");
    fvc.classList.remove("valid");
  }
}


$.fn.toggleLoader = function (options) {
  var settings = $.extend({
    loaderText: "Please wait... Data is Loading"
  }, options)
  var loaderHtml = `<div style="visibility: visible;" class="customloader rdmore">
            <div class="rdmore-inner">
            <button class="draw"></button>
            <p class="rdmore-loader-text">${settings.loaderText}</p>
            <div class="cardcontainer">
            <img class="galleryImg"
            data-src="/content/dam/hdfclifeinsurancecompany/hdfclogo.png"
            src="/content/dam/hdfclifeinsurancecompany/hdfclogo.png" alt="HDFC Logo"
            title="HDFC Logo" width="50" height="50">
            </div>
            </div>
            </div>`;
  return this.each(function () {
    if ($(this).children('.rdmore').length > 0 && $(this).children('.rdmore').css('display') !=
      'none') {
      $(this).children('.rdmore').css('display', 'none');
    } else if ($(this).children('.rdmore').length > 0 && $(this).children('.rdmore').css('display')
      == 'none') {
      $(this).children('.rdmore').css('display', 'block');
    } else {
      $(this).css('position', 'relative');
      $(this).append(loaderHtml);
    }
  })
}

$(".schedule-btn,.talk-to-advisor-link,.forRecaptcha").click(function () {
  $.getScript("https://www.google.com/recaptcha/api.js") //The trick is here.
  $('body').append($('<div id="captcha_container" class="google-cpatcha"></div>'));
  setTimeout(function () {
    var recaptchas = document.querySelectorAll('div[data-captcha]');
    for (i = 0; i < recaptchas.length; i++) {
      grecaptcha.render(recaptchas[i].id, {
        'sitekey': Sitekey,
        'callback': function (response) {
          captachaResponse = response;
        }
      });
    }
  }, 1000);
});

var arr;

$(".schedule-a-call .modal .close-icon1").on("click", function () {
  var a = $(this).siblings(".modal-body");
  a.find(".schedule-a-call-back").trigger("reset");
  a.find(".message-success").css("display", "none");
  a.find(".successMsg").removeClass("d-flex");
  a.find(".successMsg").hide();
  a.find(".geta-callback-component-popup").show();
  a.find(".error-txt").removeClass("d-block");
  a.find(".error-txt").html("");
  response = captachaResponse = "";
  captchaReset(+a.closest(".schedule-a-call").find(".captchaID").val());
  $("#myModal").modal('hide');
});

function isFormValid(form) {
  arr = [];
  form.find("[data-validation]").each(function (index, val) {
    if ($(this).is(':visible')) {
      $(this).trigger('input');
      var valid = $(this).parents().hasClass("valid");
      arr.push(valid);
    }
  });
  var formValid;
  if (arr.includes(false)) {
    formValid = false;
  } else {
    formValid = true;
  }
  if (formValid) {
    form.addClass("validForm");
    return true;
  } else {
    try {
      form.removeClass("validForm");
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}
;

// Get the total number of items in local storage
function clearValueScheduleCallOnTabChange() {
  var totalItems = localStorage.length;
  var keysToRemove = [];

  // Iterate through all keys in local storage
  for (var i = 0; i < totalItems; i++) {
    // Get the key at index i
    var key = localStorage.key(i);
    // Get the value associated with the key
    var value = localStorage.getItem(key);
    if (value.includes('schedule_id')) {
      keysToRemove.push(key);
    }
  }

  // Remove keys outside the loop to avoid modifying the collection being looped over
  keysToRemove.forEach(function (key) {
    localStorage.removeItem(key);
  });
}

// Use a single event listener that covers both desktop and mobile
window.addEventListener('beforeunload', clearValueScheduleCallOnTabChange);
window.addEventListener('pagehide', clearValueScheduleCallOnTabChange);

function dateValidation(daterangeelemnt) {
  var newDate = $(daterangeelemnt)[0].value;
  var newDate1 = newDate.split('/');
  if (newDate.length <= 10) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;

    var today1 = today.split('/');

    if ((newDate1[1] > 12) || (newDate1[0] > 31) || ((newDate1[2] >= today1[2]) || (newDate1[2] <= 1910))) {
      $(daterangeelemnt).siblings('.error-txt').html('Enter Valid Date');
    }
    else {
      $(daterangeelemnt).siblings('.error-txt').html('');

    }
  }
  else {

    if (newDate.length == 0) {
      $(daterangeelemnt).siblings('.error-txt').html('');
    }
  }

}


// daterangepicker initialization start
function daterangepickerInitialization(firstDay, lastDay, scheduleElement) {
  var currentFormat = 'DD/MM/YYYY';
  var daterangeelemnt = '.schedule-a-call .' + scheduleElement + ' .hasDatepicker';
  var today = new Date();
  var fDateArray = firstDay.split('-');
  var fDate = fDateArray[2] + '/' + fDateArray[1] + '/' + fDateArray[0];
  $(daterangeelemnt).val(fDate);
  $(daterangeelemnt).daterangepicker(
    {
      parentEl: $(daterangeelemnt).parent('.schedule-a-call .inputGroup.form-group'),
      autoUpdateInput: true,
      singleDatePicker: true,
      showDropdowns: true,
      startDate: firstDay,
      minYear: today.getFullYear(),
      minDate: new Date(firstDay),
      maxDate: new Date(lastDay),
      maxYear: today.getFullYear(),
      locale: {
        format: "DD/MM/YYYY",
        separator: " - ",
      },
    },
    function (start, end, label) {
      // CALLBACK TO FORMAT THE SELECTED DATE
      var formattedDate = start.format(currentFormat);
      $(daterangeelemnt).val(formattedDate);
      dateValidation(daterangeelemnt);
      // FUNCTION FOR VALIDATION
    }
  );



  //DATE PICKER VALIDATION


  var $jqDate = jQuery(daterangeelemnt);
  $(".geta-callback-inner #callScheduleDateValue").val('');

  //Bind keyup/keydown to the input
  $jqDate.bind('keyup', 'keydown', function (e) {

    //To accomdate for backspacing, we detect which key was pressed - if backspace, do nothing:
    if (e.which !== 8) {
      var numChars = $jqDate.val().length;
      if (numChars === 2 || numChars === 5) {
        var thisVal = $jqDate.val();
        thisVal += '/';
        $jqDate.val(thisVal);
      }
    }
  });

}



// function scheduleCall(schedule_date,schedule_time,attemptFlag,$this){
//   if(attemptFlag == true){


//   // getsuccessmsg(successmsg);
// }else{

// }
// }


function buttonDisable($this) {
  $this.closest('.schedule-a-call').find('.scheduleCallBtn').attr('disabled', 'disabled');

}

function selectedDate(firstDate) {
  var fDate = firstDate.split('-');
  var selectedInputDate = fDate[2] + '/' + fDate[1] + '/' + fDate[0];
  $('.schedule-a-call .hasDatepicker').val(selectedInputDate);
}

function availabledates(a, b, c) {
  var todayDate = new Date;
  var today = todayDate.getDate();
  var todayMonth = todayDate.getMonth();
  var todayYear = todayDate.getFullYear();
  var allDates = [...a];

  allDates.map(function () {
    splitedDate = $(this).split('/');

  })

}

function resetValues() {
  $('.schedule-a-call .schedule-a-call-back').trigger('reset');
  $('.schedule-a-call .first-name').closest('.form-group').removeClass('valid');
  $('.schedule-a-call .modilewidth').closest('.form-group').removeClass('valid');
  $('.schedule-a-call #insurance_category').closest('.form-group').removeClass('valid');
  $('.schedule-a-call .hasDatepicker').closest('.form-group').removeClass('valid');
  $('.schedule-a-call .hasDatepicker').val('');
  $('.schedule-a-call .availableTime').closest('.form-group').removeClass('valid');
  $('.schedule-a-call .availableTime').html('<option selected disabled>No slots available</option>');
}


function schdeuleACallValidtion($this) {
  var $successMsg = $this.closest('.schedule-a-call').find('.row.successMsg');
  var $fName = $this.closest('.schedule-a-call').find('.first-name');
  var $fNameError = $fName.siblings('.error-txt');
  var $mobile = $this.closest('.schedule-a-call').find('.modilewidth');
  var $mobileError = $mobile.siblings('.error-txt');
  var $insCategory = $this.closest('.schedule-a-call').find('#insurance_category');
  var $insCategoryError = $insCategory.parent().siblings('.error-txt');
  var $date = $this.closest('.schedule-a-call').find('.hasDatepicker');
  var $dateError = $date.siblings('.error-txt');
  var $time = $this.closest('.schedule-a-call').find('.availableTime');
  var $timeError = $time.parent().siblings('.error-txt');

  $fName.closest('.form-group').hasClass('valid') ? ($fNameError.text(''), $fNameError.addClass('d-none'), $fNameError.removeClass('d-block'))
    : ($fNameError.text('Please Enter First Name'), $successMsg.addClass('d-none'), $fNameError.removeClass('d-none'), $fNameError.addClass('d-block'));

  $mobile.closest('.form-group').hasClass('valid') ? ($mobileError.text(''), $mobileError.addClass('d-none'), $mobileError.removeClass('d-block')) : ($mobileError.text('Please Enter Mobile Number'), $successMsg.addClass('d-none'), $mobileError.removeClass('d-none'), $mobileError.addClass('d-block'));

  // $insCategory.closest('.form-group').hasClass('valid') ? ($insCategoryError.text(''), $insCategoryError.addClass('d-none'), $insCategoryError.removeClass('d-block')) : ($insCategoryError.text('Please Select Plan Type'), $successMsg.addClass('d-none'), $insCategoryError.removeClass('d-none'), $insCategoryError.addClass('d-block'));

  $date.closest('.form-group').hasClass('valid') ? ($dateError.text(''), $dateError.addClass('d-none'), $dateError.removeClass('d-block')) : ($dateError.removeClass('d-none'), $dateError.text('Please Enter Date'), $successMsg.addClass('d-none'), $dateError.removeClass('d-none'), $dateError.addClass('d-block'));

  $time.closest('.form-group').hasClass('valid') ? ($timeError.text(''), $timeError.addClass('d-none'), $timeError.removeClass('d-block')) : ($timeError.text('Please Select Your Slot'), $successMsg.addClass('d-none'), $timeError.removeClass('d-none'), $timeError.addClass('d-block'));
}

function schdeuleACallValidtion2($this) {
  var $fName = $this.closest('.schedule-a-call').find('.first-name');
  var $fNameError = $fName.siblings('.error-txt');
  var $mobile = $this.closest('.schedule-a-call').find('.modilewidth');
  var $mobileError = $mobile.siblings('.error-txt');
  var $insCategory = $this.closest('.schedule-a-call').find('#insurance_category');
  var $insCategoryError = $insCategory.parent().siblings('.error-txt');

  $fName.closest('.form-group').hasClass('valid') ? ($fNameError.text(''), $fNameError.addClass('d-none'), $fNameError.removeClass('d-block'))
    : ($fNameError.text('Please Enter First Name'), $fNameError.removeClass('d-none'), $fNameError.addClass('d-block'));

  $mobile.closest('.form-group').hasClass('valid') ? ($mobileError.text(''), $mobileError.addClass('d-none'), $mobileError.removeClass('d-block')) : ($mobileError.text('Please Enter Mobile Number'), $mobileError.removeClass('d-none'), $mobileError.addClass('d-block'));

  $insCategory.closest('.form-group').hasClass('valid') ? ($insCategoryError.text(''), $insCategoryError.addClass('d-none'), $insCategoryError.removeClass('d-block')) : ($insCategoryError.text('Please Select Plan Type'), $insCategoryError.removeClass('d-none'), $insCategoryError.addClass('d-block'));

}

function scrollToSuccess($this, offsetValue) {
  var successScroll = $this.closest('.schedule-a-call').find('.successMsg');
  scrollToElement(successScroll[0], offsetValue);
}