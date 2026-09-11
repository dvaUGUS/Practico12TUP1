let menu = document.querySelector("#menu");
let enlaces = document.querySelector("#enlaces");
menu.addEventListener("click", function() {
    if (enlaces.style.display === "block") {
        enlaces.style.display = "none"
    }else{
        enlaces.style.display = "block";
    }
});