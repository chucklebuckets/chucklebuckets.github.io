const cursor = document.querySelector("#custom-cursor");
const cursorImg = document.querySelector("#custom-cursor-img");
const cursorText = document.querySelector("#custom-cursor-text");
const cursorTextOutline = document.querySelector("#cursor-text-outline");
const cursorTextFill = document.querySelector("#cursor-text-fill");

const clickAreas = document.querySelectorAll(".click-area");

const smallCursor = "/assets/send_word/smallcursor.gif";
const mediumCursor = "/assets/send_word/growing.png"
const bigCursor = "/assets/send_word/bigcursor.gif";

let cursorTimer = null;

window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});

for (const clickArea of clickAreas) {
    clickArea.addEventListener("mouseenter", () => {
        clearTimeout(cursorTimer);

        cursorTextOutline.textContent = "";
        cursorTextFill.textContent = "";
        cursorText.style.display = "none";

        cursorImg.src = mediumCursor;

        cursorTimer = setTimeout(() => {
            cursorImg.src = bigCursor;
            cursorTextOutline.textContent = clickArea.dataset.cursorText;
            cursorTextFill.textContent = clickArea.dataset.cursorText;
            cursorText.style.display = "block";

            const soundId = clickArea.dataset.sound;
            const sound = document.querySelector(`#${soundId}`);
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
            
        }, 50);
       
    });

    clickArea.addEventListener("mouseleave", () => {
        clearTimeout(cursorTimer);

        cursorTextOutline.textContent = "";
        cursorTextFill.textContent = "";
        cursorText.style.display = "none";

        cursorImg.src = mediumCursor;

        cursorTimer = setTimeout(() => {
            cursorImg.src = smallCursor;
        }, 50);
       
    });
}