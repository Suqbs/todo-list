// Select the toggle button and the sidebar
const toggleBtn = document.getElementById("menu-icon-wrapper");
const sidebar = document.getElementById("sidebar");

// Add a click event listener to toggle the sidebar's "open" class
toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("close");
  toggleBtn.classList.toggle("rotate-y-axis");
});

const noteWrapper = document.querySelector(".note-wrapper");
const scrollIndicator = document.getElementById("scroll-indicator-span");
console.log(scrollIndicator);

function updateScrollIndicator() {
  if (noteWrapper.scrollHeight > noteWrapper.clientHeight) {
    scrollIndicator.style.setProperty(
      "--scroll-indicator-content",
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E")`
    );
  } else {
    scrollIndicator.style.setProperty("--scroll-indicator-content", '""');
  }
}

scrollIndicator.addEventListener("click", () => {
  noteWrapper.scrollTo({
    top: noteWrapper.scrollHeight,
    behavior: "smooth", // Smooth scrolling effect
  });
});

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
    scrollIndicator.style.setProperty(
      "--scroll-indicator-content",
      `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E")`
    );
  }
});

const openDialogBtn = document.getElementById("add-todo-button");
const todoDialog = document.getElementById("todoDialog");
const closeDialogBtn = document.getElementById("closeDialog");

openDialogBtn.addEventListener("click", () => {
  todoDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  todoDialog.close();
});
