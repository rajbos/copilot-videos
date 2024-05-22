document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const skus = data.features.videos;
            const container = document.getElementById('sku-container');

            skus.forEach(sku => {
                const skuElement = document.createElement('div');
                skuElement.classList.add('sku');

                const skuTitle = document.createElement('h2');
                skuTitle.textContent = sku.sku;
                skuElement.appendChild(skuTitle);

                const itemsList = document.createElement('ul');
                sku.items.forEach(item => {
                    const itemElement = document.createElement('li');
                    const itemLink = document.createElement('a');
                    itemLink.href = `detail.html?title=${encodeURIComponent(item.title)}&videoUrl=${encodeURIComponent(item.videoUrl)}&description=${encodeURIComponent(item.description)}`;
                    itemLink.textContent = item.title;
                    itemElement.appendChild(itemLink);
                    itemsList.appendChild(itemElement);
                });

                skuElement.appendChild(itemsList);
                container.appendChild(skuElement);
            });
        })
        .catch(error => console.error('Error loading SKU data:', error));
});
