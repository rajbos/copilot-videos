document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const businessFeatures = document.getElementById('business-features');
            const enterpriseFeatures = document.getElementById('enterprise-features');
            const newsContainer = document.createElement('div');
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

            // Fetch and display RSS feeds
            const rssFeeds = data.rssFeeds.feeds;
            rssFeeds.forEach(feed => {
                fetch(feed.url)
                    .then(response => response.text())
                    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                    .then(data => {
                        const items = data.querySelectorAll("item");
                        items.forEach(item => {
                            const title = item.querySelector("title").textContent;
                            const description = item.querySelector("description").textContent;
                            const pubDate = new Date(item.querySelector("pubDate").textContent);
                            const newsItem = document.createElement('div');
                            newsItem.className = 'news-item';
                            newsItem.innerHTML = `<h4>${title}</h4><p>${description}</p><span>${feed.name}</span>`;
                            newsContainer.appendChild(newsItem);
                        });
                    });
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});
