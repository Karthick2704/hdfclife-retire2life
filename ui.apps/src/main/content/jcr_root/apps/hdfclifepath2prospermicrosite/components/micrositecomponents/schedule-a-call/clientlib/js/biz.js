$(document).ready(function () {
    // $('.schedule-a-call .hasDatepicker').daterangepicker({
    //     minDate: dayjs(),
    //     maxDate: dayjs(),
    //     isInvalidDate: function(date) {
    //       return true; // Disable all dates by default
    //     }
    //   });

    var ajaxData;
    function checkAvailabilitySlots() {
        $.ajax({
            url: apiAvailableslots,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                ajaxData = data.response.available_slots;
                var dates = Object.keys(data.response.available_slots);
                // Sort the dates in ascending order
                dates.sort();
                var sortedSlotsObject = {
                    "available_slots": {}
                };

                // Populate the sortedSlotsObject with sorted dates and slots
                dates.forEach(date => {
                    sortedSlotsObject.available_slots[date] = data.response.available_slots[date];
                });
                ajaxData = sortedSlotsObject.available_slots;

                var [firstDay, firstValue] = Object.entries(ajaxData)[0];
                var keys = Object.keys(ajaxData);
                var lastDay = keys[keys.length - 1];
                var fullDate = firstDay.split('-');
                var day = fullDate[0];
                var month = fullDate[1];
                var year = fullDate[2];
                var maxDay = lastDay.split('-')[2];
                var maxMonth = lastDay.split('-')[1];
                var maxYear = lastDay.split('-')[0];
                var slotsAdded = false;
                var numberArray = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eightth', 'nineth', 'tenth', 'eleventh', 'twelveth', 'thirteenth', 'fourteenth', 'fifteenth'];
                var firstDay = firstDay;
                var lastDay = lastDay;
                var scheduleArray = [...$('.schedule-a-call')];
                scheduleArray.map(function (val, ind) {
                    scheduleClass = numberArray[ind] + 'schedule';
                    $(val).children('.modal.fade.sac').addClass(scheduleClass);
                    daterangepickerInitialization(firstDay, lastDay, scheduleClass);
                })

                function slotsReload(sourceElement) {
                    $this = sourceElement ? sourceElement : $('.schedule-a-call .hasDatepicker');
                    var applyParent = $this.closest('.schedule-a-call');
                    var slotsavailable = $this.closest('.schedule-a-call').find('.availableTime').html();
                    slotsavailable = '<option selected disabled>No slots available</option>';
                    applyParent.find('.hasDatepicker').siblings('.error-txt').removeClass('d-block');
                    applyParent.find('.hasDatepicker').siblings('.error-txt').addClass('d-none');
                    applyParent.find('.slotsData').find('.error-txt').removeClass('d-block');
                    applyParent.find('.slotsData').find('.error-txt').addClass('d-none');
                    applyParent.find('.availableTime').html(slotsavailable);
                    var availableTime = $this.closest('.schedule-a-call').find('.slotsData .availableTime');
                    setTimeout(function () {
                        var dtyValue = $this.closest('.geta-callback-component-popup').find('.hasDatepicker')[0];
                        var dty = dtyValue.value.split('/');
                        var dateValue = dty[2] + '-' + dty[1] + '-' + dty[0];
                        var slots = ajaxData[dateValue];
                        applyParent.find('.hasDatepicker').siblings('error-txt').addClass('d-none');
                        if (slots) {
                            console.log("Available slots for " + dateValue + ":");
                            slotsavailable = '<option selected disabled>Select Available Slots</option>'
                            slots.forEach(function (slot) {
                                slotsavailable = slotsavailable + `<option value="${slot}">${slot}</option>`;
                            });
                            applyParent.find('.availableTime').html(slotsavailable);
                            applyParent.find('.hasDatepicker').parent().addClass('valid');
                            applyParent.find('.hasDatepicker').siblings('error-txt').addClass('d-none');
                            applyParent.find('.hasDatepicker').siblings('error-txt').removeClass('d-block');
                            applyParent.find('.hasDatepicker').siblings('error-txt').text('');
                            slotsAdded = true;
                        } else {
                            applyParent.find('.hasDatepicker').parent().removeClass('valid');
                            applyParent.find('.slotsData .error-txt').removeClass('d-none');
                            applyParent.find('.slotsData .error-txt').addClass('d-block');
                            applyParent.find('.slotsData .error-txt').text("No slots are available. Kindly select another date.");
                            slotsAdded = false;
                        }
                    }, 200)
                }


                // slotsReload(); // On page load
                $('.schedule-a-call .daterangepicker .applyBtn').click(function () {
                    var $this = $(this);
                    slotsReload($this);
                });

                // $('.schedule-a-call .availableTime').on('blur',function(e){
                //     if($('.schedule-a-call .modal.show .hasDatepicker').val()){
                //         setTimeout(function(){
                //             var $this = $('.schedule-a-call .modal.show .hasDatepicker');
                //         slotsReload($this)
                //     }, 100)
                //     }
                // })

                $(document).on('click', function (event) {
                    if (!$(event.target).closest('.schedule-a-call .hasDatepicker').length && $('.schedule-a-call .hasDatepicker').hasClass('clickedDate')) {
                        // Clicked outside of the select element
                        setTimeout(function () {
                            if ($('.schedule-a-call .modal.show .hasDatepicker').val()) {
                                var $this = $('.schedule-a-call .modal.show .hasDatepicker');
                                slotsReload($this)
                                $('.schedule-a-call .hasDatepicker').removeClass('clickedDate')
                            }
                        }, 100)
                    }
                });

                $('.schedule-a-call .hasDatepicker').click(function () {
                    $(this).addClass('clickedDate')
                })


                $('.schedule-a-call .availableTime').change(function (e) {
                    var $schedulCallforDatepicker = $(this).closest('.schedule-a-call')
                    if ($schedulCallforDatepicker.find('.hasDatepicker').parent().hasClass('valid')) {
                        $(this).closest('.form-group').addClass('valid');
                        $(this).parent().siblings('.error-txt').addClass('d-none');
                        $(this).parent().siblings('.error-txt').removeClass('d-block');
                        $(this).parent().siblings('.error-txt').text('');
                    }
                    else {
                        $(this).closest('.form-group').removeClass('valid');
                        $(this).parent().siblings('.error-txt').removeClass('d-none');
                        $(this).parent().siblings('.error-txt').addClass('d-block');
                        $(this).parent().siblings('.error-txt').text('Please select your slot');
                        $(this).closest('.schedule-a-call').find('.hasDatepicker').siblings('error-txt').text('Please select your Booking Date');
                    }
                })




            },
            error: function (xhr, status, error) {
                // Handle errors
                console.error("Failed to fetch data:", error);
            }
        });
    }

    $('.schedule-a-call .scheduleCallBtn').on('click', function (e) {
        e.preventDefault();
        var form = $(this).parents('form');
        var _this = $(this).parents('form');
        var firstName = _this.find('input[name=first_name]').val();
        var phone = _this.find('input[name=phone]').val();
        var ndncFlag = _this.find('input[name=ndnc_flag]:checked').val();
        var source = _this.find('input[name=source]').val();
        var insuranceCategory = _this.find('#insurance_category :selected').val();
        var dateVal = _this.find('.date.hasDatepicker').val();
        var dateValArray = dateVal.split('/');
        var dMonth = dateValArray[1];
        var dDay = dateValArray[0];
        var dYear = dateValArray[2];
        var dateVal2 = dMonth + '/' + dDay + '/' + dYear;
        var scheduleDate = dayjs(dateVal2, 'MM/DD/YYYY').format('DD-MMM-YYYY');
        var scheduleTime = _this.find('#availableTime option:selected').val();
        var $this = $(this);

        $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
        var localInput;
        if (localStorage.getItem(phone) !== null) {
            localInput = localStorage.getItem(phone);
            localInput = JSON.parse(localInput);
            console.log(localInput);
        }
        else {
            localInput = "";
        }
        if (source == 'call-me-now') {
            if (insuranceCategory === '') {
                $this.closest(".schedule-a-call").find(".scb-plan-error").css("display", "block");
                $this.closest(".schedule-a-call").find(".scb-plan-error").html("Please select plan type");
                $this.closest(".schedule-a-call").find("#scheduleCallBtn").attr("disabled", "disabled");
            } else {
                $this.closest(".schedule-a-call").find(".scb-plan-error").css("display", "none");
                $this.closest(".schedule-a-call").find(".scb-plan-error").text("");
                $this.closest(".schedule-a-call").find("#scheduleCallBtn").removeClass("error");
                $this.closest(".schedule-a-call").find("#scheduleCallBtn").removeAttr("disabled", "disabled");
            }
        }

        var isValid;

        if ($this.closest(".schedule-a-call").find('.hasDatepicker').parent().hasClass('valid') && $this.closest(".schedule-a-call").find('.availableTime').closest('.form-group').hasClass('valid') && $this.closest(".schedule-a-call").find('#insurance_category').closest('.form-group').hasClass('valid')) {
            isValid = isFormValid(form);
            $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
        }
        else {
            isValid = false;
            if (!$this.closest(".schedule-a-call").find('.hasDatepicker').parent().hasClass('valid')) {
                $this.closest(".schedule-a-call").find('.hasDatepicker').siblings('.error-txt').removeClass('d-none');
                $this.closest(".schedule-a-call").find('.hasDatepicker').siblings('.error-txt').addClass('d-block');
                $this.closest(".schedule-a-call").find('.hasDatepicker').siblings('.error-txt').text('Please select your slot');
                $this.closest(".schedule-a-call").find('.hasDatepicker').closest('.schedule-a-call').find('.availableTime').siblings('error-txt').text('Please select your Booking Date');
                $this.closest(".schedule-a-call").find('.row.successMsg').addClass('d-none')

                $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
            }
            else if ($this.closest(".schedule-a-call").find('.hasDatepicker').parent().hasClass('valid') && !$this.closest(".schedule-a-call").find('.availableTime').parent().hasClass('valid')) {
                $this.closest(".schedule-a-call").find('.availableTime').siblings('error-txt').text('Please select your Time');
                $this.closest(".schedule-a-call").find('.row.successMsg').addClass('d-none')

                $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
            }
            // scrollToError(e, $this, 150)
        }

        schdeuleACallValidtion($this);


        var $captcha = $('#recaptcha');
        var response = captachaResponse;

        if (isValid) {
            $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
            /* Re-Captcha Validation Starts */
            if (response.length === 0) {
                $this.closest(".schedule-a-call").find('.msg-error').text("Please Validate Captcha");
                if (!$captcha.hasClass("error")) {
                    $captcha.addClass("error");
                }
                return false;
            } else {
                $this.closest(".schedule-a-call").find('.msg-error').text('');
                $captcha.removeClass("error");
            }
            /* Re-Captcha Validation Ends */
            if (localStorage.getItem(phone) !== null) {
                var reqObj = {
                    "schedule_id": localInput ? localInput.schedule_id : "",
                    "name": firstName,
                    "phone": phone,
                    "insurance_category": insuranceCategory,
                    "schedule_date": dateVal,
                    "schedule_time": scheduleTime,
                    "ndnc_flag": ndncFlag == "on" ? "true" : "false",
                    "g-recaptcha-response": response,
                }
            }
            else {
                var reqObj = {
                    "name": firstName,
                    "phone": phone,
                    "insurance_category": insuranceCategory,
                    "schedule_date": dateVal,
                    "schedule_time": scheduleTime,
                    "ndnc_flag": ndncFlag == "on" ? "true" : "false",
                    "g-recaptcha-response": response,

                }
            }

            // var deleteslot = slots.find(reqObj.schedule_time)
            // var newSlotsArray = slots.filter(item => item !== deleteslot)
            // slots = newSlotsArray;

            scheduleCustomerCall(reqObj, scheduleDate, reqObj.schedule_time, localInput, reqObj.phone, $this);
            captchaReset(+$this.closest('.schedule-a-call').find('.captchaID').val());
            resetValues();
            // $('.schedule-a-call-back').trigger('reset');
            // grecaptcha.reset(captchaWidgetId);
            $this.closest(".schedule-a-call").find('.modal-dialog').toggleLoader();
            setTimeout(function () {
                $this.closest(".schedule-a-call").find('.scheduleCallMsg')[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }, 500)
        } else {
            if ($this.closest(".schedule-a-call").find('.first-name').siblings('.error-txt').hasClass('d-block') || $this.closest(".schedule-a-call").find('.modilewidth').siblings('.error-txt').hasClass('d-block')) {
                setTimeout(function () {
                    $this.closest(".schedule-a-call").find('.error-txt.d-block')[0].closest('.inputGroup ').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }, 500)
            }
            else if ($this.closest(".schedule-a-call").find('.scb-plan-error.error-txt').css('display') == 'block') {
                setTimeout(function () {
                    $this.closest(".schedule-a-call").find('.scb-plan-error.error-txt')[0].closest('.inputGroup ').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }, 500)
            }
            else if ($this.closest(".schedule-a-call").find('.hasDatepicker').siblings('.error-txt').hasClass('d-block') || $this.closest(".schedule-a-call").find('.availableTime').closest('.inputGroup ').find('.error-txt').hasClass('d-block')) {
                setTimeout(function () {
                    $this.closest(".schedule-a-call").find('.error-txt.d-block')[0].closest('.inputGroup ').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }, 500)
            }

        }
    })

    $('.schedule-a-call .scheduleCallTodayBtn').on('click', function (e) {
        e.preventDefault();
        var $thisPopup = $(this)
        var form = $(this).parents('form');
        var _this = $(this).parents('form');
        var firstName = _this.find('input[name=first_name]').val();
        var phone = _this.find('input[name=phone]').val();
        var ndncFlag = _this.find('input[name=ndnc_flag]:checked').val();
        var insuranceCategory = _this.find('#insurance_category :selected').val();
        var source = _this.find('input[name=source]').val();
        var insuranceCategory = _this.find('#insurance_category :selected').val();

        if (source == 'call-me-now') {
            if (insuranceCategory === '') {
                $(".scb-plan-error").css("display", "block");
                $(".scb-plan-error").html("Please select plan type");
                $("#scheduleCallBtn").attr("disabled", "disabled");
            } else {
                $(".scb-plan-error").css("display", "none");
                $(".scb-plan-error").text("");
                $("#scheduleCallBtn").removeClass("error");
                $("#scheduleCallBtn").removeAttr("disabled", "disabled");
            }
        }
        var isValid;

        if ($thisPopup.closest(".schedule-a-call").find('#insurance_category').closest('.form-group').hasClass('valid')) {
            isValid = isFormValid(form);
        }
        else {
            isFormValid(form);
            isValid = false;
        }

        schdeuleACallValidtion2($thisPopup);
        var $captcha = $('#recaptcha');
        var response = captachaResponse;

        if (isValid) {
            /* Re-Captcha Validation Starts */
            if (response.length === 0) {
                $('.msg-error').text("Please Validate Captcha");
                if (!$captcha.hasClass("error")) {
                    $captcha.addClass("error");
                }
                return false;
            } else {
                $('.msg-error').text('');
                $captcha.removeClass("error");
            }
            /* Re-Captcha Validation Ends */
            var reqObj = {
                "phone": phone,
                "first_name": firstName,
                "source": source,
                "ndnc_flag": ndncFlag == "on" ? "true" : "false",
                "insurance_category": insuranceCategory,
                "g-recaptcha-response": response
            }

            schedule(reqObj, $thisPopup);
            // $('.schedule-a-call-back').trigger('reset');
            // grecaptcha.reset(captchaWidgetId);
            captchaReset(+$thisPopup.closest('.schedule-a-call').find('.captchaID').val());

        }
        else {
            if ($thisPopup.closest(".schedule-a-call").find('.first-name').siblings('.error-txt').hasClass('d-block') || $thisPopup.closest(".schedule-a-call").find('.modilewidth').siblings('.error-txt').hasClass('d-block')) {
                setTimeout(function () {
                    $thisPopup.closest(".schedule-a-call").find('.error-txt.d-block')[0].closest('.inputGroup ').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }, 500)
            }
            else if ($thisPopup.closest(".schedule-a-call").find('.scb-plan-error.error-txt').css('display') == 'block') {
                setTimeout(function () {
                    $thisPopup.closest(".schedule-a-call").find('.scb-plan-error.error-txt')[0].closest('.inputGroup ').scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    })
                }, 500)
            }
        }
    })

    $('.schedule-a-call .scheduleChange').click(function () {
        checkAvailabilitySlots();
        var $thisBtn = $(this);
        var $scheduleCallTodayBtn = $thisBtn.siblings('#scheduleCallTodayBtn');
        var $scheduleCallBtn = $thisBtn.siblings('#scheduleCallBtn');
        var $allDates = $thisBtn.closest('.schedule-a-call').find('.allDates')
        var $slotsData = $thisBtn.closest('.schedule-a-call').find('.slotsData')
        $thisBtn.addClass('d-none');
        $thisBtn.removeClass('d-block');
        $scheduleCallTodayBtn.removeClass('d-block');
        $scheduleCallTodayBtn.addClass('d-none');
        $scheduleCallBtn.removeClass('d-none');
        $scheduleCallBtn.addClass('d-block');
        $allDates.addClass('d-block');
        $allDates.removeClass('d-none');
        $slotsData.addClass('d-block');
        $slotsData.removeClass('d-none');

    })


    $(".geta-callback-component-popup .scb-checkbox").on('click', function () {
        formVar = $(this).closest('form');
        $this = $(this);
        $scbError = $this.parent().siblings(".scb-checkbox-error")

        if ($(this).is(":checked")) {
            $scbError.css("display", "none");
            formVar.find('button').removeAttr("disabled", "disabled");
        } else {
            $scbError.css("display", "block");
            $scbError.html("First please authorize HDFC Life to contact you, by checking the checkbox above");
            formVar.find('button').attr("disabled", "disabled");
            // $("#scheduleCallBtn").attr("disabled", "disabled");
            $this.closest('.geta-callback-component-popup').siblings(".message-success").css("display", "none");
        }
    });

    $('.schedule-a-call #insurance_category').on('change', function () {
        var _this = $(this).parents('form');
        var source = _this.find('input[name=source]').val();
        var $insCategory = $(this);
        var insuranceCategory = _this.find('#insurance_category :selected').val();
        if (source == 'call-me-now') {
            if (insuranceCategory === '') {
                _this.find(".scb-plan-error").css("display", "block");
                _this.find(".scb-plan-error").html("Please select plan type");
                $insCategory.closest('.form-group').removeClass('valid');
                // _this.find('button').attr("disabled", "disabled");
            } else {
                _this.find(".scb-plan-error").css("display", "none");
                _this.find(".scb-plan-error").text("");
                _this.find("#scheduleCallBtn").removeClass("error");
                $insCategory.closest('.form-group').addClass('valid');
                if ($(".scb-checkbox").is(":checked")) {
                    _this.find('button').removeAttr("disabled", "disabled");
                }
            }
        }
    })



})

function captchaReset(captchaID) {
    grecaptcha.reset(captchaID);
}

$('.schedule-a-call .modal .close-icon1').on('click', function () {
    var $modalBody = $(this).siblings('.modal-body')
    $modalBody.find('.schedule-a-call-back').trigger('reset');
    $modalBody.find(".message-success").css("display", "none");
    $modalBody.find(".successMsg").removeClass('d-flex');
    $modalBody.find(".successMsg").hide();
    $modalBody.find('.geta-callback-component-popup').show();
    $modalBody.find('.error-txt').removeClass('d-block');
    $modalBody.find('.error-txt').html('');
    // grecaptcha.reset(captchaWidgetId);
    response = captachaResponse = '';
    captchaReset(+$modalBody.closest('.schedule-a-call').find('.captchaID').val());
})

$('.modilewidth').on('paste keyup', function (e) {
    $(this).val($(this).val().replace(/[^\d]/g, ''));
});

var subscribeMessageScbHide = document.querySelectorAll('.message-success');
$('.modilewidth').focus(function (e) {
    $(subscribeMessageScbHide).hide();
});

$('.first-name').focus(function (e) {
    $(subscribeMessageScbHide).hide();
});

$('#insurance_category').focus(function (e) {
    $(subscribeMessageScbHide).hide();
})

function schedule(reqObj, $this) {
    schdeuleACallbackApiObj.schdeuleACallback(reqObj).then(function (res) {
        if (res.statusCode == 200 || res.statusCode == 201) {
            $this.closest('.schedule-a-call').find('.schedule-a-call-back').trigger('reset');
            // grecaptcha.reset();
        }
        renderScbSuccessMessageSchedule(res, $this);
    }).catch(function (err) {
        console.log('error: ', err);
    })
}

function scheduleCustomerCall(reqObj, scheduleDate, schedule_time, schedule_id, phone, $this) {

    var reqObjNew = reqObj;
    customerCallScheduleApiObj.customerCallSchedule(reqObjNew).then(function (res2) {
        if (res2.statusCode == 200 || res2.statusCode == 201) {
            $('.schedule-a-call-back').trigger('reset');
            $('.form-group').removeClass('valid');
            $this.closest('.schedule-a-call').find('.availableTime').html('<option selected disabled>No slots available</option>')
        }
        renderScbSuccessMessage2(res2, scheduleDate, schedule_time, schedule_id, phone, $this);
        // scheduleCall(scheduleDate,schedule_time,res2.responseJson.response.can_reschedule,schedule_id,$this);
    }).catch(function (err2) {
        console.log('error: ', err2);
        var err = JSON.parse(err2);
        var formattedDate = dayjs(scheduleDate, 'DD-MMM-YYYY').format('DD MMMM, YYYY');
        var errmsg;
        if (err.is_popup == true || err.detail) {
            if (err.detail == "Slot not available") {
                $this.closest('.schedule-a-call').find('.availableTime').parent().siblings('.error-txt').text('This slot is not available. Kindly select another slot.');
                $this.closest('.schedule-a-call').find('.availableTime').parent().siblings('.error-txt').addClass('d-block');
                $this.closest('.schedule-a-call').find('.availableTime').parent().siblings('.error-txt').removeClass('d-none');
                $this.closest('.schedule-a-call').find('.successMsg').addClass('d-none');
                $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-flex');
            }
            else {
                errmsg = $this.closest('.schedule-a-call').find('.maxAttemptMsg').html();
                $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-none');
                $this.closest('.schedule-a-call').find('.successMsg').addClass('d-flex');
                $this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg').html(errmsg);
            }
        }
        else {
            errmsg = `<div class="message">
                <p>Oops! Something went wrong!<br>
                Please try later.</p>
                </div>`;
            $this.closest('.schedule-a-call').find('.successMsg').removeClass('d-none');
            $this.closest('.schedule-a-call').find('.successMsg').addClass('d-flex');
            $this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg').html(errmsg);
        }
        buttonDisable($this);
        // scrollToElement($this.closest('.schedule-a-call').find('.row.successMsg .scheduleCallMsg')[0],55)
    })
}

function submitForm() {
    var $captcha = $('#recaptcha'),
        response = grecaptcha.getResponse();
    if (response.length === 0) {
        console.log(response, 'false');
    } else {
        $('.msg-error').text('');
        $captcha.removeClass("error");
    }
}