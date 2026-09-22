const menu = document.getElementById("menu");
const enlaces = document.getElementById("enlaces");

menu.addEventListener("click", () => {

    if (enlaces.style.display === "flex") {
        enlaces.style.display = "none";
    } else {
        enlaces.style.display = "flex";
    }

});