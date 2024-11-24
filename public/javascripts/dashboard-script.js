document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const searchInput = document.getElementById("search-input");
  const moodButtonsContainer = document.getElementById("mood-buttons");

  searchInput.addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase();
    const buttons = moodButtonsContainer.querySelectorAll("a"); // Selecting anchor tags instead of buttons
    buttons.forEach(function (button) {
      const moodText = button.textContent.toLowerCase();
      button.style.display = moodText.includes(query) ? "inline-block" : "none";
    });
  });
});
