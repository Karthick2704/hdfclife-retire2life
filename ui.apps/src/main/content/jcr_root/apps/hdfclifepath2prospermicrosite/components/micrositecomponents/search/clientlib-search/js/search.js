
    const searchInput = $('#s-search-input');
    const recentSearchesContainer = $('#s-recent-searches');
    const recentSearchesList = $('#s-recentListing');
    const recentSearchesHeading = recentSearchesContainer.find('p');
    const resultContainer = $('#s-result');
    const resultErrorContainer = $('#s-error-result');
    const noResult = $('.s-noResultFound');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const searchValue = getQueryParam('searchText');
        const inputField = document.getElementById('s-search-input');

        if (searchValue && inputField) {
            const decodedSearchValue = decodeURIComponent(searchValue);
            inputField.value = decodedSearchValue.trim();
            performSearch(decodedSearchValue.trim());
            history.replaceState(null, '', window.location.pathname);
        }
    });



    let recentSearchesArray = [];

    function renderRecentSearches() {
        recentSearchesList.empty();

        if (recentSearchesArray.length > 0) {             
            recentSearchesContainer.show();
            recentSearchesHeading.show();

            recentSearchesArray.forEach((search, index) => {
                const li = $('<li>').addClass('recent-search-item p2p-font-14');
                const span = $('<span>').text(search).click(function () {
                    searchInput.val(search);
                    performSearch(search);
                });
                const button = $('<button>')
                    .text('x')
                    .click(function (e) {
                        e.stopPropagation();
                        removeRecentSearch(index);
                    });
                li.append(span).append(button);
                recentSearchesList.append(li);
            });
        } else {
            recentSearchesContainer.hide();
            recentSearchesHeading.hide();
        }
    }

    function isValidInput(input) {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(input);
    }


    function showError(errorKey) {
        const errorMessages = $('#s-error-result .s-error-message');
        const targetError = errorMessages.filter(`[data-error="${errorKey}"]`);

        if (targetError.length) {
            errorMessages.hide();
            targetError.show();
            $('#s-error-result').show();
        }
    }

    function hideError() {
        $('#s-error-result').hide();
        $('#s-error-result .s-error-message').hide();
    }

    searchInput.on('input', function () {
        const currentValue = searchInput.val();

        if (currentValue && !isValidInput(currentValue)) {
            showError('invalid');
            searchInput.addClass('s-invalid');
        } else {
            hideError();
            searchInput.removeClass('s-invalid');
        }
    });

    function performSearch(query) {
        if (!query.trim()) {
            showError('empty');
            return;
        }

        if (!isValidInput(query)) {
            showError('invalid');
            return;
        }

        hideError();

        if (!recentSearchesArray.includes(query)) {
            recentSearchesArray.push(query);
            renderRecentSearches();
        }

        const servletPath = $('#searchServletPath').val();
        const projectPath = $('#projectPath').val();

        $.ajax({
            url: `${servletPath}/jcr:content.searchresults.json`,
            type: 'POST',
            data: { 
                searchText: query,
                projectPath: projectPath 
            },
            dataType: 'json',
            success: function (response) {
                const content = $('<div>').addClass('s-content');
                let resultsFound = false;

                response.forEach((item, index) => {
                    if (item.path) {
                        resultsFound = true;
                        content.append('<a class="s-resultHeading p2p-font-18" target="_self" href="' + item.path + '.html">' + (index + 1) + '. ' + item.title + '</a>');
                        const description = item.Description || ' ';
                        content.append('<p class="p2p-font-14 s-resultDescription">' + description + '</p>');
                    }
                });

                if (!resultsFound) {
                    content.append(noResult);
                    noResult.css('display', 'block');
                }

                resultContainer.empty().append(content);
            },
            error: function () {
                showError('server');
            },
        });
    }

    function removeRecentSearch(index) {
        recentSearchesArray.splice(index, 1);
        renderRecentSearches();
    }

    // Event listener for search button click
    $('.perform').click(function () {
        const searchText = searchInput.val();
        performSearch(searchText);
    });

    // Event listener for "Enter" key press
    searchInput.keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            const searchText = searchInput.val();
            performSearch(searchText);
        }
    });

const inputFieldSearch = document.getElementById('s-search-input');

    inputFieldSearch?.addEventListener('keydown', function (event) {
      if (event.key === ' ' && this.value.trim() === '') {
        event.preventDefault();
      }
    });
