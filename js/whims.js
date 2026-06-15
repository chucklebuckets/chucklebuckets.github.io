const borderColors = [   
    "#ff0000",
    "#0055ff",
    "#26ff00"
];

const entries = document.querySelectorAll(".entry");

for (const entry of entries) {
    let colorIndex = Math.floor(Math.random() * borderColors.length) // Picks a random color for the entry at page load
    let cycleInterval = null;

    entry.style.borderColor = borderColors[colorIndex];

    entry.addEventListener("mouseenter", () => {
        colorIndex = (colorIndex + 1) % borderColors.length;
        entry.style.borderColor = borderColors[colorIndex];
        
        if (cycleInterval !== null) return;

        cycleInterval = setInterval(() => {
            colorIndex = (colorIndex + 1) % borderColors.length;
            entry.style.borderColor = borderColors[colorIndex];
        }, 1000 / 8);
    });

    entry.addEventListener("mouseleave", () => {
        clearInterval(cycleInterval);
        cycleInterval = null;
    });
}
