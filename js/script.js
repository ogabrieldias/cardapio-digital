document.addEventListener("DOMContentLoaded", () => {
    const darkModeIcon = document.querySelector("#darkMode-icon");
  
    // Verifica se o tema estava salvo
    if (localStorage.getItem("tema") === "dark") {
      document.body.classList.add("dark-mode");
      darkModeIcon.classList.replace("bx-moon", "bx-sun");
    }
  
    darkModeIcon.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      const isDark = document.body.classList.contains("dark-mode");
  
      if (isDark) {
        darkModeIcon.classList.replace("bx-moon", "bx-sun");
        localStorage.setItem("tema", "dark");
      } else {
        darkModeIcon.classList.replace("bx-sun", "bx-moon");
        localStorage.setItem("tema", "light");
      }
    });
  });
  
const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");

menuIcon.addEventListener("click", () => {
  mobileNav.classList.toggle("active");

  if (menuIcon.classList.contains("bx-menu")) {
    menuIcon.classList.remove("bx-menu");
    menuIcon.classList.add("bx-x");
  } else {
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");
  }
});


