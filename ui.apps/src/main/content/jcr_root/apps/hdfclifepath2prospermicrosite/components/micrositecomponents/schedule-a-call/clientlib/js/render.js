function renderScbSuccessMessageSchedule(res, $this) {
    if (res.successMsg === 'success' || res.statusCode === 201) {
        $this.closest('.schedule-a-call').find('.message-success').css({ 'display': 'block' });
        $this.closest('.schedule-a-call').find('.geta-callback-component-popup').hide();

        category = $this.closest('.schedule-a-call').find('input[name=categoriesCompo]').val();
        slug = $this.closest('.schedule-a-call').find('input[name=pageslugCompo]').val();
        pageName = $this.closest('.schedule-a-call').find(".schedule-a-call-back").attr("data-page-name");

        if (slug != "" && category != "") {
            getCallBack(category, slug);
        } else {
            getCallBack(pageName, pageName);
        }
    } else {
        console.log('error');
    }
}

function getCallBack(planName, productName) {

    dataLayer.push({
        'event': 'callFormSubmit',
        'planName': planName,
        'productName': productName
    });
}

function renderScbSuccessMessage2(res2, scheduleDate, schedule_time, schedule_id, phone, $this) {
    if (res2.successMsg === 'success' || res2.statusCode === 200 || res2.statusCode === 201) {

        // $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-none');
        $this.closest('.schedule-a-call').find('.successMsg').addClass('d-flex');
        category = $('.schedule-a-call input[name=categoriesCompo]').val();
        slug = $('.schedule-a-call input[name=pageslugCompo]').val();
        pageName = $(".schedule-a-call .schedule-a-call-back").attr("data-page-name");
        var callCount = res2.responseJson.response.modification_count;
        var isExistingSchedule = res2.responseJson.response.is_existing_schedule;
        var canReschedule = res2.responseJson.response.can_reschedule;

        if (slug != "" && category != "") {
            getCallBack(category, slug);
        } else {
            getCallBack(pageName, pageName);
        }

        var formattedDate = dayjs(scheduleDate, 'DD-MMM-YYYY').format('DD MMMM, YYYY');
        var successmsg;
        var formattedDate2 = dayjs(res2.responseJson.response.scheduled_date, 'DD-MMM-YYYY').format('DD MMMM, YYYY');
        if (callCount == 0 && isExistingSchedule == false && canReschedule == true) {
            $this.closest('.schedule-a-call').find('.scheduleMsg .scheduledDate b').html(formattedDate);
            $this.closest('.schedule-a-call').find('.scheduleMsg .scheduledTime b').html(schedule_time);
            successmsg = $this.closest('.schedule-a-call').find('.scheduleMsg').html();
        } else if (callCount > 0 && isExistingSchedule == false) {
            $this.closest('.schedule-a-call').find('.rescheduleMsg .scheduledDate b').html(formattedDate);
            $this.closest('.schedule-a-call').find('.rescheduleMsg .scheduledTime b').html(schedule_time);
            successmsg = $this.closest('.schedule-a-call').find('.rescheduleMsg').html();
        } else if (callCount > 0 && isExistingSchedule == true && canReschedule == false) {
            $this.closest('.schedule-a-call').find('.alreadyScheduleMsg .scheduledDate b').html(formattedDate2);
            $this.closest('.schedule-a-call').find('.alreadyScheduleMsg .scheduledTime b').html(res2.responseJson.response.scheduled_time);
            successmsg = $this.closest('.schedule-a-call').find('.alreadyScheduleMsg').html();
        }
        else if (callCount >= 0 && isExistingSchedule == true && canReschedule == true) {
            $this.closest('.schedule-a-call').find('.alreadyScheduleMsg .scheduledDate b').html(formattedDate2);
            $this.closest('.schedule-a-call').find('.alreadyScheduleMsg .scheduledTime b').html(res2.responseJson.response.scheduled_time);
            successmsg = $this.closest('.schedule-a-call').find('.alreadyScheduleMsg').html();
        }
        else if (res2.responseJson.is_popup == true || res2.responseJson.detail) {
            successmsg = $this.closest('.schedule-a-call').find('.maxAttemptMsg').html();
        }

        $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-none');
        $this.closest('.schedule-a-call').find('.successMsg').addClass('d-flex');
        $this.closest('.schedule-a-call').find('.scheduleCallBtn').text('RESCHEDULE');
        $this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg').html(successmsg);

        if (res2.responseJson.response.schedule_id !== null) {
            var local = { "schedule_id": res2.responseJson.response.schedule_id, "phone": phone };
            local = JSON.stringify(local);
            localStorage.setItem(phone, local);
        }
        // scrollToElement($this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg')[0],55)
    } else {
        if (res2.responseJson.is_popup == true || res2.responseJson.detail) {
            var errmsg = $this.closest('.schedule-a-call').find('.maxAttemptMsg').html();
        }
        $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-none');
        $this.closest('.schedule-a-call').find('.successMsg').addClass('d-flex');
        $this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg').html(errmsg);
        buttonDisable($this);
        // scrollToElement($this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg')[0],55)
    }
}



// var Sitekey = '6Leh5h0UAAAAADDvPeY_frLQsgcvxQrc1rB4rbPQ';
var mouseMoved = false;
var touchStarted = false;

function scheduleCallHandler() {
    $('.schedule-a-call .successMsg').addClass('d-none');
    $('.schedule-a-call .successMsg').removeClass('d-flex');
    $('.schedule-a-call .scheduleCallBtn').removeAttr('disabled');
    $('.schedule-a-call .scheduleCallBtn').text('SUBMIT');
    $('.schedule-a-call .form-group').removeClass('valid');
    $('.schedule-a-call .scheduleCallBtn').addClass('d-none');
    $('.schedule-a-call .scheduleCallBtn').removeClass('d-block');
    $('.schedule-a-call .allDates').addClass('d-none');
    $('.schedule-a-call .allDates').removeClass('d-block');
    $('.schedule-a-call .slotsData').addClass('d-none');
    $('.schedule-a-call .slotsData').removeClass('d-block');
    $('.schedule-a-call .scheduleCallTodayBtn').removeClass('d-none');
    $('.schedule-a-call .scheduleCallTodayBtn').addClass('d-block');
    $('.schedule-a-call .scheduleChange').removeClass('d-none');
    $('.schedule-a-call .scheduleChange').addClass('d-block');

    resetValues();
    setTimeout(function () {
        captchaReset(+$('.schedule-a-call .modal.show .captchaID').val());
    }, 1000);
    $.getScript("https://www.google.com/recaptcha/api.js"); //The trick is here.
    $('body').append($('<div id="captcha_container" class="google-cpatcha"></div>'));
    setTimeout(function () {
        var recaptchas = $('.schedule-a-call div[data-captcha]');
        for (i = 0; i < recaptchas.length; i++) {
            try {
                var captchaIDReset = grecaptcha.render(recaptchas[i].id, {
                    'sitekey': Sitekey,
                    'callback': function (response) {
                        captachaResponse = response;
                    }
                });
                recaptchas.eq(i).closest('.schedule-a-call').find('.captchaID').val(captchaIDReset);
            } catch (error) {
                // console.log(error)
            }
        }
    }, 1000);
}

// Bind the function to mousemove event
$(document).on('mousemove', function () {
    if (!mouseMoved) {
        scheduleCallHandler();
        mouseMoved = true;
    }
});

// Bind the function to touchstart event
$(document).on('touchstart', function () {
    if (!touchStarted) {
        scheduleCallHandler();
        touchStarted = true;
    }
});