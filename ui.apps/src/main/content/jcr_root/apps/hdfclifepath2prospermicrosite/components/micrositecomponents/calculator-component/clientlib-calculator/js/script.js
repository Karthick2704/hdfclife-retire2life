if ($(".calci-comp").length > 0) {

    document.querySelectorAll('.calci-comp input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/^0{2,}/, '0');
        });
    });
    // Mobile Navigation Variables
    const mobilePrevBtn = document.querySelector('.btnPrevious');
    const mobileNextBtn = document.querySelector('.btnNext');
    const mobileHeadings = document.querySelectorAll('.calci-comp .calci-tab-heading');
    const mobileTabHeadingsContainer = document.querySelector('.calci-tab-headings');
    const mobileTabContents = document.querySelectorAll('.calci-comp .tab-pane'); // Tab content container
    let mobileCurrentTab = 0;

    // Initial setup for mobile and desktop
    function initializeView() {
        // Mobile view setup
        mobileHeadings[0].classList.add('active');
        mobileTabContents[0].classList.add('active', 'show');
    }

    // Mobile: Function to update tab navigation and content
    function updateMobileTabs() {
        if (!window.matchMedia('(max-width: 768px)').matches) return; // Only for mobile
        // Update heading active state
        mobileHeadings.forEach((heading, index) => {
            heading.classList.toggle('active', index === mobileCurrentTab);
        });

        // Update content active state
        mobileTabContents.forEach((tab, index) => {
            tab.classList.toggle('active', index === mobileCurrentTab);
            tab.classList.toggle('show', index === mobileCurrentTab);
        });

        // Scroll headings horizontally
        mobileHeadings.forEach((tab) => {
            const headingWidth = tab.offsetWidth;
            const translateX = -(mobileCurrentTab * headingWidth);
            mobileTabHeadingsContainer.style.transform = `translateX(${translateX + 7}px)`;
            mobileTabHeadingsContainer.style.transition = 'transform 0.3s ease-in-out';
        })
    }

    // Desktop: Reset view (no scrolling, tick mark transition only)
    function resetDesktopView() {
        // Ensure navigation buttons are visible if applicable
        mobilePrevBtn.style.display = 'block';
        mobileNextBtn.style.display = 'block';
        // Show/hide navigation buttons
        mobilePrevBtn.style.display = mobileCurrentTab === 0 ? 'none' : 'block';
        mobileNextBtn.style.display = mobileCurrentTab === mobileHeadings.length - 1 ? 'none' : 'block';
    }

    // // Resize event to handle transitions between views
    window.addEventListener('resize', () => {
        resetDesktopView();
    });

    let currentTab = 0;
    const tabs = document.querySelectorAll('.calci-comp .tab-pane');
    const navLinks = document.querySelectorAll('.calci-comp .nav-tabs .calci-nav-link');
    const tabHeadings = document.querySelectorAll('.calci-comp .calci-tab-heading');
    const btnNext = document.getElementById('btnNext');
    const btnPrevious = document.getElementById('btnPrevious');
    const btnSubmit = document.querySelector('.lastBtn');

    function updateTabs() {
        tabs.forEach((tab, index) => {
            const link = navLinks[index];
            // Update the tab content visibility
            tab.classList.toggle('active', index === currentTab);
            tab.classList.toggle('show', index === currentTab);
            // Update the navigation link styles
            link.classList.toggle('completed', index < currentTab);
            link.classList.toggle('active', index === currentTab);
        });

        // Apply faded effect to tab headings (calci-tab-title)
        tabHeadings.forEach((heading, index) => {
            if (index !== currentTab) {
                heading.classList.add('faded'); // Add faded class to the heading          
            } else {
                heading.classList.remove('faded'); // Remove faded class
            }
        });

        // Update button visibility
        btnPrevious.style.display = currentTab === 0 ? 'none' : 'inline-block';
        btnNext.style.display = currentTab === tabs.length - 1 ? 'none' : 'inline-block';
        btnSubmit.style.display = currentTab === tabs.length - 1 ? 'inline-block' : 'none';
    }

    btnNext.addEventListener('click', () => {
        if (validateFields() && validateRetirementAge()) { // Optional: Replace with your actual validation logic
            currentTab++;
            updateTabs();
            mobileCurrentTab++;
            updateMobileTabs();
        }
    });

    btnPrevious.addEventListener('click', () => {
        currentTab--;
        updateTabs();
        mobileCurrentTab--;
        updateMobileTabs();
    });

    // Initialize the view on page load
    document.addEventListener("DOMContentLoaded", function () {
        updateTabs();
    });

    function validateFields() {
        const activeTab = tabs[currentTab];
        const inputs = activeTab.querySelectorAll('.calci-comp input[required][type="text"], .calci-comp input[required][type="number"], .calci-comp input[required][type="range"]');
        let isValid = true;
        // **New function** to check retirement age validity
        validateRetirementAge();
        // Validate text and number inputs
        inputs.forEach(input => {
            let value = parseFloat(input.value);
            let min = parseFloat(input.dataset.min || 0); // Default min to 0
            let max = parseFloat(input.dataset.max || Infinity); // Default max to Infinity
            // Validate the input only if it is required
            if (isNaN(value) || value < min || value > max) {
                if (min === 0 && max === Infinity) {
                    showError(input, `This field is required`);
                    isValid = false;
                }
                else {
                    showError(input, `Please enter a value between ${min} and ${max}.`);
                    isValid = false;
                }
            } else {
                clearError(input);
            }
        });
        return isValid;
    }

    function validateRetirementAge() {
        const currentAgeInput = document.getElementById('current-age-box');
        const retirementAgeInput = document.getElementById('retirement-age-box');
        const currentAge = parseInt(currentAgeInput.value);
        const retirementAge = parseInt(retirementAgeInput.value);

        if (!isNaN(currentAge) && !isNaN(retirementAge) && retirementAge <= currentAge) {
            showError(retirementAgeInput, 'Retirement age must be greater than the current age.');
            return false;
        } else {
            clearError(retirementAgeInput);
        }
        return true;
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Set the first radio button as checked by default in each radio group
        const radioGroups = document.querySelectorAll('.calci-comp .radio-group'); // Select all radio groups
        radioGroups.forEach(group => {
            const firstRadioButton = group.querySelector('.calci-comp input[type="radio"]'); // Select the first radio button in the group
            if (firstRadioButton) {
                firstRadioButton.checked = true; // Set it as checked by default
            }
        });
        // Initialize view and tabs
        updateTabs();
    });
    // Function to validate inputs: numbers only, no negative values, no symbols or letters
    function validateNumericInput(event) {
        const input = event.target;
        let value = input.value;
        // Remove any non-numeric characters (except for the decimal point)
        value = value.replace(/[^0-9.]/g, '');
        // Prevent multiple decimal points
        if ((value.match(/\./g) || []).length > 1) {
            value = value.replace(/\.+$/, ''); // Remove the last decimal point if there are multiple
        }
        // If the value is negative or starts with a "-" (invalid)
        if (parseFloat(value) < 0) {
            value = '';
        }
        // Set the cleaned and valid value back to the input field
        input.value = value;
    }

    // Attach the event listener to all relevant inputs (example with 'input' elements)
    const inputs = document.querySelectorAll('.calci-comp input[type="text"], .calci-comp input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', validateNumericInput);
    });

    function showError(inputElement, message) {
        let errorSpan = inputElement.parentNode.querySelector('.error-message');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            inputElement.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        errorSpan.style.color = '#ed1c24';
        inputElement.style.borderColor = '#ed1c24';
    }

    // Function to clear error message
    function clearError(inputElement) {
        let errorSpan = inputElement.parentNode.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
        inputElement.style.borderColor = '';
    }

    function syncSliderWithInput(sliderId, inputId) {
        const slider = document.getElementById(sliderId);
        const input = document.getElementById(inputId);
        const min = parseFloat(input.getAttribute('data-min'));
        const max = parseFloat(input.getAttribute('data-max'));
        const tooltip = slider.nextElementSibling; // Tooltip should be next to slider
        // Set slider attributes
        slider.min = min;
        slider.max = max;
        // Function to validate input value
        function validateInput(value, inputElement) {
            if (isNaN(value) || value < min || value > max) {
                if (min === 0 && max === Infinity) {
                    showError(input, `This field is required`);
                    return false;
                }
                else {
                    showError(input, `Please enter a value between ${min} and ${max}.`);
                    return false;
                }
            }
            clearError(inputElement);
            return true;
        }

        // Function to update tooltip position and text
        function updateTooltip() {
            const value = parseFloat(slider.value);
            const progress = ((value - min) / (max - min)) * 100;
            let offset = 0;
            const currentWidth = window.matchMedia('(max-width:768px)').matches;
            
            if (currentWidth) {
                if(progress >= 0 && progress <=24){
                    offset = -5
                }
                else if (progress > 24 && progress <= 49) {
                    offset = -10;
                } else if (progress > 49 && progress <= 60) {
                    offset = -12;
                } else if (progress > 60 && progress <= 100) {
                    offset = -17;
                }
            }
            else{
                if(progress >= 0 && progress <=24){
                    offset = 0
                }
                else if (progress > 24 && progress <= 49) {
                    offset = -15;
                } else if (progress > 49 && progress <= 74) {
                    offset = -35;
                } else if (progress > 74 && progress <= 100) {
                    offset = -55;
                }
            }
       
            if (tooltip) {
                tooltip.style.left = `calc(${progress}% + ${offset}px)`;
                tooltip.textContent = value;
            }
        }
        // Function to update slider background progress
        function updateSliderBackground() {
            const value = parseFloat(slider.value);
            const percent = ((value - min) / (max - min)) * 100;
            slider.style.background = `linear-gradient(to right, #f94144 ${percent}%, lightgray ${percent}%)`;
        }

        // Event listener for slider input
        slider.addEventListener("input", () => {
            input.value = slider.value;
            validateInput(parseFloat(slider.value), input);
            updateTooltip();
            updateSliderBackground();
            validateRetirementAge(); // **Check retirement age condition**
        });
        // Event listener for manual input changes
        input.addEventListener("input", () => {
            const value = parseFloat(input.value);
            if (validateInput(value, input)) {
                slider.value = value;
                updateTooltip();
                updateSliderBackground();
                validateRetirementAge(); // **Check retirement age condition**
            }
        });

    window.addEventListener('resize', updateTooltip);
        // Initialize tooltip and background on load
        updateTooltip();
        updateSliderBackground();
    }

    // Initialize sliders with input validation
    syncSliderWithInput('current-age-slider', 'current-age-box');
    syncSliderWithInput('retirement-age-slider', 'retirement-age-box');
    syncSliderWithInput('income-growth-rate', 'income-growth-box');

    // **Ensure validation is checked when both fields change**
    document.getElementById('current-age-box').addEventListener("input", validateRetirementAge);
    document.getElementById('retirement-age-box').addEventListener("input", validateRetirementAge);

    function initializeSliderWithTooltip(slidersId) {
        const sliders = document.getElementById(slidersId);
        const tooltip = sliders.nextElementSibling;
        const min = parseFloat(sliders.getAttribute('data-min'));
        const max = parseFloat(sliders.getAttribute('data-max'));
        sliders.min = min;
        sliders.max = max;

        function updateTooltip() {
            let offset = 0 ;
            const value = parseFloat(sliders.value);
            const progress = ((value - min) / (max - min)) * 100;
            
                if(progress >= 0 && progress <=24){
                    offset = -5
                }
                else if (progress > 24 && progress <= 49) {
                    offset = -10;
                } else if (progress > 49 && progress <= 60) {
                    offset = -12;
                } else if (progress > 60 && progress <= 100) {
                    offset = -17;
                }
            
            tooltip.style.left = `calc(${progress}% + ${offset}px)`;
            tooltip.textContent = value + '%'; // Display percentage
        }
     
        function updateSliderBackgrounds() {
            const value = parseFloat(sliders.value);
            const percent = ((value - min) / (max - min)) * 100;
            sliders.style.background = `linear-gradient(to right, #f94144 ${percent}%, lightgray ${percent}%)`;
        }

        sliders.addEventListener("input", () => {
            updateTooltip();
            updateSliderBackgrounds();
        });

        updateTooltip();
        updateSliderBackgrounds();
    }

    // Initialize sliders dynamically
    initializeSliderWithTooltip('calci-rate-of-inflation');
    initializeSliderWithTooltip('calci-intrest-rate');

    // Apply CSS styling
    const style = document.createElement("style");
    style.innerHTML = `
   .highlight {
       color: #ed1c24;
       font-family: poppins-bold;
   }
`;
    document.head.appendChild(style);

    document.addEventListener("DOMContentLoaded", function () {
        const currentAgeInput = document.getElementById("current-age-box");
        const retirementAgeInput = document.getElementById("retirement-age-box");
        const annualIncomeInput = document.getElementById("annual-income");
        const incomeGrowthRateInput = document.getElementById("income-growth-box");
        const currentSavingsInput = document.getElementById("calci-current-savings");
        const monthlyExpensesInput = document.getElementById("expenseInput");
        const inflationRangeInput = document.getElementById("calci-rate-of-inflation");
        const interestRateInput = document.getElementById("calci-intrest-rate");
        const investmentTypeInputs = document.querySelectorAll("input[name='investment-type']");

        const retirementNeedOutput = document.getElementById("retirement-corpus");
        const currentSavingsGrowthOutput = document.getElementById("current-savings-growth");
        const additionalNeedOutput = document.getElementById("additional-savings-needed");
        const monthlySavingsOutput = document.getElementById("monthly-savings-message");

        function getInvestmentRate() {
            let selectedRadio = document.querySelector('input[name="investment-type"]:checked');        
            if (selectedRadio) {
                if (selectedRadio.classList.contains("calciInvestmentType1")) {
                    return 8;
                } else if (selectedRadio.classList.contains("calciInvestmentType2") || selectedRadio.classList.contains("calciInvestmentType3")) {
                    return 11;
                }
            }     
        }
        
        function calculateFutureValue(pv, rate, years) {
            return pv * Math.pow(1 + rate / 100, years);
        }

        function calculateFutureMonthlyExpenses(monthlyExpense, inflationRate, yearsToRetirement) {
            return monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
        }

        function calculateRetirementCorpus(futureMonthlyExpenses, lifeExpectancy, retirementAge) {
            return futureMonthlyExpenses * 12 * (lifeExpectancy - retirementAge);
        }

        function calculateMonthlySavingsRequired(pendingCorpus, interestRate, tenureMonths) {
            const monthlyRate = (Math.pow(1 + interestRate / 100, 1 / 12) - 1) * 100;
            return (pendingCorpus * monthlyRate / 100) / (Math.pow(1 + monthlyRate / 100, tenureMonths) - 1);
        }

        function getMonthlyExpenseValue() {
            const isExpenseInputVisible = monthlyExpensesInput.style.display !== "none";
            if (isExpenseInputVisible) {
                return parseFloat(monthlyExpensesInput.value ? monthlyExpensesInput.value.replaceAll(",", "") : 0) || 0;
            }
        }

        function updateResults() {
            const currentAge = parseInt(currentAgeInput.value ? currentAgeInput.value.replaceAll(",", "") : 0) || 0;
            const retirementAge = parseInt(retirementAgeInput.value ? retirementAgeInput.value.replaceAll(",", "") : 0) || 0;
            const annualIncome = parseFloat(annualIncomeInput.value ? annualIncomeInput.value.replaceAll(",", "") : 0) || 0;
            const incomeGrowthRate = parseFloat(incomeGrowthRateInput.value ? incomeGrowthRateInput.value.replaceAll(",", "") : 0) || 0;
            const currentSavings = parseFloat(currentSavingsInput.value ? currentSavingsInput.value.replaceAll(",", "") : 0) || 0;
            const inflationRate = parseFloat(inflationRangeInput.value ? inflationRangeInput.value.replaceAll(",", "") : 0) || 0;
            const interestRate = parseFloat(interestRateInput.value ? interestRateInput.value.replaceAll(",", "") : 0) || 0;
            const investmentRate = getInvestmentRate();
            const lifeExpectancy = 85;
            // Determine the monthly expense value based on the toggle
            const monthlyExpenses = getMonthlyExpenseValue();

            if (currentAge >= retirementAge) {
                monthlySavingsOutput.textContent = "Retirement age must be greater than current age.";
                return;
            }

            const yearsToRetirement = retirementAge - currentAge;
            const retirementPeriod = lifeExpectancy - retirementAge;
            // 1. Income at Retirement (InR)
            const incomeAtRetirement = calculateFutureValue(annualIncome, incomeGrowthRate, yearsToRetirement);
            // 2. Savings at Retirement (SaR)
            const savingsAtRetirement = calculateFutureValue(currentSavings, investmentRate, yearsToRetirement);
            // 3. Expenses at Retirement (ER)
            const expensesAtRetirement = calculateFutureMonthlyExpenses(monthlyExpenses, inflationRate, yearsToRetirement);
            // 4. Retirement Corpus Required (ReC)
            const retirementCorpus = calculateRetirementCorpus(expensesAtRetirement, lifeExpectancy, retirementAge);
            // 5. Additional Corpus Required (M)
            const pendingCorpus = Math.max(0, retirementCorpus - savingsAtRetirement);
            // 6. Monthly Savings Required
            const tenureMonths = retirementPeriod * 12;
            const monthlySavings = pendingCorpus > 0 ? calculateMonthlySavingsRequired(pendingCorpus, interestRate, tenureMonths) : 0;
            // Format large numbers for better readability
            function formatLargeNumber(amount) {
                if (amount >= 1e7) {
                    return `₹${(amount / 1e7).toFixed(2)} crore`;
                } else if (amount >= 1e5) {
                    return `₹${(amount / 1e5).toFixed(2)} lakh`;
                } else {
                    return `₹${amount.toFixed(2)}`;
                }
            }

            // Display Results with formatted values
            retirementNeedOutput.textContent = formatLargeNumber(retirementCorpus);
            currentSavingsGrowthOutput.textContent = formatLargeNumber(savingsAtRetirement);
            additionalNeedOutput.textContent = formatLargeNumber(pendingCorpus);
            monthlySavingsOutput.innerHTML = `You need to start saving <span class="highlight">${formatLargeNumber(monthlySavings)}</span> every month for <span class="highlight">${yearsToRetirement}</span> years.`; monthlySavingsOutput.innerHTML = `You need to start saving <span class="highlight">${formatLargeNumber(monthlySavings)}</span> every month for <span class="highlight">${yearsToRetirement}</span> years.`;
        }

        // Add event listeners to all inputs
        [
            currentAgeInput,
            retirementAgeInput,
            annualIncomeInput,
            incomeGrowthRateInput,
            currentSavingsInput,
            inflationRangeInput,
            interestRateInput,
            monthlyExpensesInput,
            ...investmentTypeInputs
        ].forEach(input => input.addEventListener("input", updateResults));

        $('.calci-comp input[type="text"]').on('input', function () {
            var num = $(this).val();
            var commaNum = numberWithCommas(num);
            if (parseFloat(num) > 0) {
                $(this).val(commaNum);
            }
        })
        function numberWithCommas(number) {
            var parts = parseFloat(number.toString()).toLocaleString('en-IN');
            return parts;

        }
        // Initial calculation
        updateResults();
    });

}