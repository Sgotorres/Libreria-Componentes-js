document.addEventListener("DOMContentLoaded", () => {
const tabButtons = document.querySelectorAll(".pill-tab");
const contentPanels = document.querySelectorAll(".content-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    contentPanels.forEach(panel => panel.classList.remove("active"));

    
    button.classList.add("active");

    const targetPanel = document.getElementById(button.getAttribute("data-target"));
    if (targetPanel) {
        targetPanel.classList.add("active");
    }
    });
    });
});