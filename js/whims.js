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

const imgPlaceholder = document.querySelector(".img-placeholder")
const imgDisplay = document.querySelector(".img-display");
const imgContent = document.querySelector(".content");
const imgBorder = document.querySelector(".img-border")
const imgThoughtBubble = document.querySelector(".img-thought-bubble")
const imgWords = document.querySelectorAll(".img-word")

const borderImgs = {
    square: "/assets/whims/1x1_border.gif",
    wide: "/assets/whims/4x3_border.gif",
    tall: "/assets/whims/4x5_border.gif"
};

const borderThoughtBubbles = {
    square: "/assets/whims/thought_bubble_red.gif",
    wide: "/assets/whims/thought_bubble_blue.gif",
    tall: "/assets/whims/thought_bubble_green.gif"
}

for (const word of imgWords) {
    word.addEventListener("mouseenter", () => {
        const imgPath = word.dataset.img;
        const imgShape = word.dataset.shape;
        
        imgPlaceholder.style.display = "none";

        imgDisplay.classList.remove("square", "wide", "tall");
        imgDisplay.classList.add("show", imgShape);

        imgThoughtBubble.src = borderThoughtBubbles[imgShape];
        imgContent.src = imgPath;
        imgBorder.src = borderImgs[imgShape];
    });
}