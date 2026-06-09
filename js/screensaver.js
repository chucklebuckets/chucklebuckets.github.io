const screensaver_icons = [];
const checked_icons = [];


window.addEventListener("load", () => {

    const icons = document.querySelectorAll(".screensaver-icon");

    for (const icon of icons) {
        const cameraRect = icon.getBoundingClientRect();

        const width = cameraRect.width;
        const height = cameraRect.height;
        const start_x = Number(icon.dataset.startX);
        const start_y = Number(icon.dataset.startY);
        const vel_x = Number(icon.dataset.velX) * (Math.random() < 0.5 ? -1 : 1);
        const vel_y = Number(icon.dataset.velY) * (Math.random() < 0.5 ? -1 : 1);
        
        screensaver_icons.push({
            element: icon,
            width: width,
            height: height,
            x: start_x, 
            y: start_y,
            vel_x: vel_x,
            vel_y: vel_y,
        });
    }

    requestAnimationFrame(animate); // kickstarts the screensaver animation
});

function animate() {

    for (const icon of screensaver_icons) {

        // Move the icon
        icon.x = icon.x + icon.vel_x;
        icon.y = icon.y + icon.vel_y;

        // Check if the icon is colliding with the edge of the window
        border_collision(icon);
        
        // Check if the icon is colliding with other icons
        checked_icons.push(icon); // exclude self from next and remaining icon collision checks
        icon_collision(icon);
        

        icon.element.style.transform = `translate(${icon.x - icon.width / 2}px, ${icon.y - icon.height / 2}px)`;
    }

    checked_icons.length = 0; // clear checked icons for next animation frame
    requestAnimationFrame(animate);
}

function icon_collision(icon) {
    const remaining_icons = screensaver_icons.filter(other_icon => !checked_icons.includes(other_icon));
    for (const other_icon of remaining_icons) {
        //if (other_icon == icon) { continue; } // Skip collision check on self

        // to make the collision easier to reason about
        const leftA = icon.x - icon.width / 2;
        const rightA = icon.x + icon.width / 2;
        const topA = icon.y - icon.height / 2;
        const bottomA = icon.y + icon.height / 2;
        const leftB = other_icon.x - other_icon.width / 2;
        const rightB = other_icon.x + other_icon.width / 2;
        const topB = other_icon.y - other_icon.height / 2;
        const bottomB = other_icon.y + other_icon.height / 2;

        // Checks for overlap from all sides
        const icons_colliding = leftA < rightB && rightA > leftB && topA < bottomB && bottomA > topB;
        if (icons_colliding == false) { continue; } // Next icon if no collision

        console.log("COLLISION!", icon.element.id, "hit", other_icon.element.id);

        const overlap_x = Math.min(rightA, rightB) - Math.max(leftA, leftB);
        const overlap_y = Math.min(bottomA, bottomB) - Math.max(topA, topB);

        if (overlap_x < overlap_y) {
            if (icon.x < other_icon.x) {
                icon.vel_x = -Math.abs(icon.vel_x);
                other_icon.vel_x = Math.abs(other_icon.vel_x);
            } else {
                icon.vel_x = Math.abs(icon.vel_x);
                other_icon.vel_x = -Math.abs(other_icon.vel_x);
            }
        } else {
            if (icon.y < other_icon.y) {
                icon.vel_y = -Math.abs(icon.vel_y);
                other_icon.vel_y = Math.abs(other_icon.vel_y);
            } else {
                icon.vel_y = Math.abs(icon.vel_y);
                other_icon.vel_y = -Math.abs(other_icon.vel_y);
            }
        }
    }
}

function border_collision(icon) {
    if (icon.x - icon.width / 2 <= 0) {
        icon.x = 0 + icon.width / 2;
        icon.vel_x = Math.abs(icon.vel_x);
    }
    if (icon.x + icon.width / 2 >= window.innerWidth) {
        icon.x = window.innerWidth - icon.width / 2;
        icon.vel_x = -Math.abs(icon.vel_x);
    }
    if (icon.y - icon.height / 2 <= 0) {
        icon.y = 0 + icon.height / 2;
        icon.vel_y = Math.abs(icon.vel_y);
    }
    if (icon.y + icon.height / 2 >= window.innerHeight) {
        icon.y = window.innerHeight - icon.height / 2;
        icon.vel_y = -Math.abs(icon.vel_y);
    }
}

// reload the page (but not a bajillion times at once) when window is resized so that the hitboxes dont get all fucky
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { window.location.reload(); }, 250);
});