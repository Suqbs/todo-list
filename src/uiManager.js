// Select the toggle button and the sidebar
const toggleBtn = document.getElementById('menu-icon-wrapper');
const sidebar = document.getElementById('sidebar');

// Add a click event listener to toggle the sidebar's "open" class
toggleBtn.addEventListener('click', function() {
  sidebar.classList.toggle('close');
  toggleBtn.classList.toggle('rotate-y-axis');
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
