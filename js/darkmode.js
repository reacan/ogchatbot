// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const mainStylesheet = document.getElementById('main-stylesheet');
    const darkStylesheet = document.getElementById('dark-stylesheet');

    // Toggle the dark-mode class on the body
    body.classList.toggle('dark-mode');

    // Update the user's preference in local storage
    const darkModeEnabled = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled);

    // Toggle between the main and dark stylesheets
    mainStylesheet.disabled = darkModeEnabled;
    darkStylesheet.disabled = !darkModeEnabled;

    // Update image sources based on dark mode
    updateImageSources(darkModeEnabled);
}

// Function to check and apply user's dark mode preference
function applyUserPreference() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const body = document.body;
    const mainStylesheet = document.getElementById('main-stylesheet');
    const darkStylesheet = document.getElementById('dark-stylesheet');

    // Apply dark mode preference
    if (darkModeEnabled) {
        body.classList.add('dark-mode');
    }

    // Toggle between the main and dark stylesheets based on the preference
    mainStylesheet.disabled = darkModeEnabled;
    darkStylesheet.disabled = !darkModeEnabled;

    // Update image sources based on dark mode
    updateImageSources(darkModeEnabled);
}

// Apply user's dark mode preference when the page loads
document.addEventListener('DOMContentLoaded', applyUserPreference);

// Function to update image sources based on dark mode
function updateImageSources(isDarkMode) {
    const logoImage = document.querySelector('.logo');
    const settingsIcon = document.querySelector('.settings-ico');
    const darkThemeIcon = document.querySelector('.darkmode-ico');

    // Define the paths for dark and light mode images
    const lightLogoPath = 'resources/harry.svg';
    const darkLogoPath = 'resources/harry-dark.svg';

    const lightSettingsPath = 'resources/settings.svg';
    const darkSettingsPath = 'resources/settings-dark.svg';

    const lightDarkThemePath = 'resources/dark-theme.svg';
    const darkDarkThemePath = 'resources/dark-theme-dark.svg';

    // Update logo image source based on dark mode
    logoImage.src = isDarkMode ? darkLogoPath : lightLogoPath;

    // Update settings icon source based on dark mode
    settingsIcon.src = isDarkMode ? darkSettingsPath : lightSettingsPath;

    // Update dark-theme icon source based on dark mode
    darkThemeIcon.src = isDarkMode ? darkDarkThemePath : lightDarkThemePath;
}
