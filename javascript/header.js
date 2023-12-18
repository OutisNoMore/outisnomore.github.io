/*
 * JavaScript for index.html
 * Handles dropdown menu as a button
 * @author: Jaemok C. Lee
 */

const dropdownMenu = document.getElementById("dropMenu");
const dropItems = document.getElementById("menuItems");

window.addEventListener("click", (event) => {
  if (!event.target.matches("#dropMenu")) {
    dropItems.style.display = "none";
  }
});

// Toggle menu on click
dropdownMenu.addEventListener("click", (event) => {
  dropItems.style.display = (dropItems.style.display == "" || dropItems.style.display == "none") ? "block" : "none";
});
