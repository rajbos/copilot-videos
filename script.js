document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const businessFeatures = document.getElementById('business-features');
            const enterpriseFeatures = document.getElementById('enterprise-features');
            const newsContainer = document.createElement('div');
            newsContainer.className = 'news-container';
            newsContainer.id = 'news-container';
            document.body.appendChild(newsContainer);

            // Load existing features
            data.features.videos.forEach(feature => {
                const featureGrid = document.createElement('div');
                featureGrid.className = 'feature-grid'; 

                const skuName = document.createElement('h2');
                skuName.textContent = feature.sku;
                featureGrid.appendChild(skuName);

                feature.items.forEach(item => {
                    const featureBox = document.createElement('div');
                    featureBox.className = 'video-box';
                    featureBox.innerHTML = `<h3>${item.title}</h3>`;
                    featureBox.addEventListener('click', () => {
                        window.location.href = `detail.html?title=${encodeURIComponent(item.title)}&videoUrl=${encodeURIComponent(item.videoUrl)}&description=${encodeURIComponent(item.description)}`;
                    });
                    featureGrid.appendChild(featureBox);
                });
                if (feature.sku === "GitHub Copilot Business") {
                    businessFeatures.appendChild(featureGrid);
                } else if (feature.sku === "GitHub Copilot Enterprise") {
                    enterpriseFeatures.appendChild(featureGrid);
                }
            });

            // Dynamically generate filter buttons for each RSS feed
            const filterButtonsContainer = document.getElementById('filter-buttons');
            const feedCounts = {}; // Store the count of posts for each feed
            data.rssFeeds.feeds.forEach(feed => {
                feedCounts[feed.name] = 0; // Initialize count for each feed
                const button = document.createElement('button');
                button.textContent = feed.name;
                button.className = 'filter-btn';
                button.setAttribute('data-feed-name', feed.name); // Add a data attribute to store the exact feed name
                button.addEventListener('click', function() {
                    filterNews(feed.name, this);
                });
                filterButtonsContainer.appendChild(button);
            });

            // Function to filter news items based on the selected feed
            function filterNews(feedName, clickedButton) {
                const newsItems = document.querySelectorAll('.news-item');
                const isActive = clickedButton.classList.contains('active');
                // Toggle active class on clicked button
                clickedButton.classList.toggle('active');
                if (isActive) {
                    // If the button was already active, display all news items
                    newsItems.forEach(item => {
                        item.style.display = '';
                    });
                } else {
                    // Filter news items based on the selected feed
                    newsItems.forEach(item => {
                        if (item.querySelector('span').textContent === feedName) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
                // Ensure only the clicked button can be active at a time
                document.querySelectorAll('.filter-btn').forEach(button => {
                    if (button !== clickedButton) {
                        button.classList.remove('active');
                    }
                });
            }

            // Fetch and display RSS feeds
            const rssFeeds = data.rssFeeds.feeds;
            rssFeeds.forEach(feed => {
                fetch(feed.url)
                    .then(response => response.text())
                    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                    .then(data => {
                        const items = data.querySelectorAll("item");
                        let itemCount = 0; // Count the number of items for the current feed
                        items.forEach(item => {
                            itemCount++;
                            const title = item.querySelector("title").textContent;
                            const description = item.querySelector("description").textContent;
                            const pubDate = new Date(item.querySelector("pubDate").textContent);
                            const formattedDate = pubDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                            const newsItem = document.createElement('div');
                            newsItem.className = 'news-item';
                            newsItem.innerHTML = `<h4>${title}</h4><p>${description}</p><span>${feed.name}</span> <span class="date">Published: ${formattedDate}</span>`;
                            newsContainer.appendChild(newsItem);
                        });
                        feedCounts[feed.name] = itemCount; // Update the count for the current feed
                        // Update button text to include the count of posts
                        document.querySelectorAll('.filter-btn').forEach(button => {
                            if (button.getAttribute('data-feed-name') === feed.name) {
                                button.textContent = `${feed.name} (${itemCount})`;
                            }
                        });
                    });
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});
