const menuIcon = document.getElementById("menu-icon-wrapper");
const sidebar = document.getElementById("sidebar");
const sidebarContainer = document.getElementById("sidebar-container");
console.log(sidebar);

let menuOpen = true;

function closeMenu() {
  menuOpen = false;
  sidebarContainer.style.flexBasis = "0px";
  sidebar.style.display = "none";
  menuIcon.classList.add("rotate-y-axis");
}

function openMenu() {
  menuOpen = true;
  sidebar.style.display = "block";
  sidebarContainer.style.flexBasis = "70rem";
  menuIcon.classList.remove("rotate-y-axis");
}

menuIcon.addEventListener("click", function () {
  if (!menuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
});

const noteWrapper = document.querySelector(".note-wrapper");
const scrollIndicator = document.getElementById("scroll-indicator-span");
console.log(scrollIndicator);

function updateScrollIndicator() {
  if (noteWrapper.scrollHeight > noteWrapper.clientHeight) {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '"↓"');
  } else {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '""');
  }
}

// Initial check
updateScrollIndicator();

// Update indicator on window resize (in case of layout changes)
window.addEventListener("resize", updateScrollIndicator);

// Hide the indicator when scrolled to the bottom
noteWrapper.addEventListener("scroll", () => {
  if (
    noteWrapper.scrollTop + noteWrapper.clientHeight >=
    noteWrapper.scrollHeight
  ) {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '""');
  } else {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '"↓"');
  }
});

const openDialogBtn = document.getElementById('add-todo-button');
const todoDialog = document.getElementById('todoDialog');
const closeDialogBtn = document.getElementById('closeDialog');

openDialogBtn.addEventListener('click', () => {
  todoDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  todoDialog.close();
});
