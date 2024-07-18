document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1000, // duration of the animations in milliseconds
    easing: 'ease-out', // default easing for AOS animations
    once: true // whether animation should happen only once - while scrolling down
  });
});

/* menu */
function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

/* document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.querySelector('.navlist');
    const closeMenu = (e) => {
        if (!navList.contains(e.target) && !menuIcon.contains(e.target)) {
            navList.style.left = '-100%'; // Hide menu
        }
    };

    menuIcon.addEventListener('click', function() {
        navList.style.left = '0'; // Show menu
    });

    document.addEventListener('click', closeMenu);
    navList.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent clicks within the menu from closing it
    });
}); */
/* menu */