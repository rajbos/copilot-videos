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
                        window.location.href = `detail.html?videoId=${encodeURIComponent(item.id)}`;
                    });

                    if (!item.videoUrl || item.videoUrl === "") {
                        const comingSoonBanner = document.createElement('div');
                        comingSoonBanner.id = 'coming-soon';
                        comingSoonBanner.className = 'coming-soon-small';
                        comingSoonBanner.innerHTML = '<div>Coming soon</div>';
                        featureBox.appendChild(comingSoonBanner);
                    }
                    featureGrid.appendChild(featureBox);
                });

                if (feature.sku === "GitHub Copilot Business") {
                    businessFeatures.appendChild(featureGrid);
                } else if (feature.sku === "GitHub Copilot Enterprise") {
                    enterpriseFeatures.appendChild(featureGrid);
                }
            });
        })
        .catch(error => console.error('Error loading SKU data:', error));
});
