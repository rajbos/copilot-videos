// Load the game landscape and manage clickable levels
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    let levelsData = [];

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Load level data from data.json
    function loadLevels() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                levelsData = data.adventure.levels;
                drawLandscape();
            })
            .catch(error => console.error('Error loading level data:', error));
    }

    // Draw the SNES style landscape
    function drawLandscape() {
        // Placeholder for landscape drawing logic
        ctx.fillStyle = '#8B4513'; // Leathery brown background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Placeholder for drawing levels
        levelsData.forEach((level, index) => {
            const x = 100 + (index * 100); // Simple placement for demonstration
            const y = canvas.height / 2;
            ctx.fillStyle = '#FFFFFF'; // Level node color
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Add clickable area for each level
            canvas.addEventListener('click', function(event) {
                if (Math.sqrt((event.offsetX - x) ** 2 + (event.offsetY - y) ** 2) < 20) {
                    displayLevelInfo(index);
                }
            });
        });
    }

    // Display inline video and description for the clicked level
    function displayLevelInfo(levelIndex) {
        const level = levelsData[levelIndex];
        // Placeholder for displaying level info
        console.log(`Displaying info for level: ${level.title}`);
        // Logic to display inline video and description goes here
    }

    loadLevels();
});
