document.addEventListener('DOMContentLoaded', function () {
    let componentName = $('.mediahub');
    if (componentName.length > 0) {
        // Function to calculate and update counts of the cards that are present like articles,podcast etc 
        function updateCounts() {
            const cards = document.querySelectorAll('.card-item');
            const counts = { all: 0, article: 0, podcast: 0, infographic: 0, video: 0 };

            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                counts.all++;
                if (cardType && counts[cardType] !== undefined) {
                    counts[cardType]++;
                }
            });

            for (const type in counts) {
                const button = document.querySelector(`.filter-button[data-filter="${type}"] span`);
                if (button) {
                    button.textContent = `${counts[type]}`;
                }
            }
            const articlesTab = document.querySelectorAll('.filter-button');
            articlesTab?.forEach(card => {
                let dataFilter = card.getAttribute('data-filter');
                if (counts[dataFilter] === 0) {
                    card.style.display = 'none';
                }
            });
        }

        // Filter functionality article, podcast 
        function applyFilter(selectedFilter) {
            const cards = document.querySelectorAll('.card-item');
            let visibleCardsCount = 0;

            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (selectedFilter === 'all' || cardType === selectedFilter) {
                    card.style.display = 'block';
                    visibleCardsCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            resetLoadMore(visibleCardsCount);
        }

        // Load More functionality for the button 
        function resetLoadMore(visibleCardsCount) {
            const loadMoreButton = document.getElementById('loadMore');
            const cards = Array.from(document.querySelectorAll('.card-item')).filter(card => card.style.display !== 'none');
            const cardsPerRow = 3;
            const rowsToShow = 2;
            const visibleCount = cardsPerRow * rowsToShow;

            cards.forEach((card, index) => {
                card.style.display = index < visibleCount ? 'block' : 'none';
            });

            loadMoreButton.style.display = visibleCardsCount > visibleCount ? 'block' : 'none';

            // Add click event to load more button
            loadMoreButton.onclick = function () {
                const currentVisibleCount = cards.filter(card => card.style.display === 'block').length;
                const newVisibleCount = Math.min(currentVisibleCount + cardsPerRow * rowsToShow, visibleCardsCount);
                cards.forEach((card, index) => {
                    card.style.display = index < newVisibleCount ? 'block' : 'none';
                });

                if (newVisibleCount >= visibleCardsCount) {
                    loadMoreButton.style.display = 'none';
                }
            };
        }

        // Share Popup functionality
        function togglePopup(element) {
            const popup = element.nextElementSibling;

            if (popup) {
                document.querySelectorAll('.share-popup.active').forEach(activePopup => {
                    if (activePopup !== popup) {
                        activePopup.classList.remove('active');
                    }
                });

                popup.classList.toggle('active');
            }
        }

        document.addEventListener('click', function () {
            document.querySelectorAll('.share-popup').forEach(popup => {
                popup.style.display = 'none';
            });
        });
        // Event listeners for share icons
        document.querySelectorAll('.share-icon').forEach(icon => {
            icon.addEventListener('click', function (event) {
                event.stopPropagation();
                togglePopup(this);
            });
        });

        // Initialize
        updateCounts();
        applyFilter('all');

        // Event listeners for filter buttons
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', function () {
                document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                applyFilter(this.getAttribute('data-filter'));
            });
        });
    }
});
