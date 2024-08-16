const navLinks = document.querySelectorAll('#nav a');
const contentSections = document.querySelectorAll('.section');
const contentContainer = document.getElementById('content');
// Function to load data from JSON
async function loadData(section) {
    try {
        const response = await fetch('./data/data.json');
        const data = await response.json();
        // Access the relevant data based on the section
        let sectionData = data[section];
        // Dynamically create HTML elements for the selected section
        let sectionHTML = '';
        if (section === 'destinations') {
            sectionData.forEach(destination => {
                sectionHTML += `
          <div class="destination">
            <img src="${destination.images.png}" alt="${destination.name}">
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <p>Distance: ${destination.distance}</p>
            <p>Travel time: ${destination.travel}</p>
          </div>
        `;
            });
        } else if (section === 'crew') {
            sectionData.forEach(crewMember => {
                sectionHTML += `
          <div class="crew-member">
            <img src="${crewMember.images.png}" alt="${crewMember.name}">
            <h3>${crewMember.role}</h3>
            <h2>${crewMember.name}</h2>
            <p>${crewMember.bio}</p>
          </div>
        `;
            });
        } else if (section === 'technology') {
            sectionData.forEach(technology => {
                sectionHTML += `
          <div class="technology">
            <img src="${technology.images.portrait}" alt="${technology.name}">
            <h2>${technology.name}</h2>
            <p>${technology.description}</p>
          </div>
        `;
            });
        }
        // Update the content of the section
        document.getElementById(section).innerHTML = sectionHTML;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
// Add event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        // Get the section from the data-section attribute
        const section = link.getAttribute('data-section');
        // Load data for the selected section
        loadData(section);
        // Hide all sections and show the selected one
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(section).style.display = 'block';
    });
});
// Load the 'home' section by default
loadData('home');
document.getElementById('home').style.display = 'block';