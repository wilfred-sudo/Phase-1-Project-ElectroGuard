document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://phase-1-project-electroguard.onrender.com";
    // DOM Elements
    const dateInput = document.getElementById("dateInput");
    const technicianList = document.getElementById("technicianList");
    const reportForm = document.getElementById("reportForm");
    const issueDescription = document.getElementById("issueDescription");
    const reportStatus = document.getElementById("reportStatus");
    const issueList = document.getElementById("issueList");

    // Fetch Technicians from JSON Server
    function fetchTechnicians() {
        fetch(`${API_URL}/technicians`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("technicians", JSON.stringify(data));
                displayTechnicians(); // Display technicians immediately after fetching
            })
            .catch(error => console.error("Error fetching technicians:", error));
    }

    // Display Technicians with Details
    function displayTechnicians() {
        const technicians = JSON.parse(localStorage.getItem("technicians")) || [];
        if (!technicianList) return;
        technicianList.innerHTML = "";

        technicians.forEach(tech => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${tech.name}</strong><br>
                Phone: ${tech.phone_number}<br>
                Available: ${tech.available_time}<br>
                Location: ${tech.current_location}<br>
                Role: ${tech.role}
            `;
            technicianList.appendChild(li);
        });
    }

    // Display Available Technicians Based on Date (if you still need this)
    function displayAvailableTechnicians(date) {
        const technicians = JSON.parse(localStorage.getItem("technicians")) || [];
        if (!technicianList) return;
        technicianList.innerHTML = "";

        const availableTechs = technicians.filter(tech => tech.availableDates && tech.availableDates.includes(date));
        if (availableTechs.length === 0) {
            technicianList.innerHTML = "<p>No technicians available on this date.</p>";
        } else {
            availableTechs.forEach(tech => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${tech.name}</strong><br>
                    Phone: ${tech.phone_number}<br>
                    Available: ${tech.available_time}<br>
                    Location: ${tech.current_location}<br>
                    Role: ${tech.role}
                `;
                technicianList.appendChild(li);
            });
        }
    }

    // Fetch and Display Reported Issues
    function fetchIssues() {
        fetch(`${API_URL}/issues`)
            .then(response => response.json())
            .then(data => {
                if (!issueList) return;
                issueList.innerHTML = "";
                data.forEach(issue => {
                    const li = document.createElement("li");
                    li.textContent = `${issue.date}: ${issue.description}`;
                    issueList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching issues:", error));
    }

    // Handle Issue Reporting (POST Request)
    if (reportForm) {
        reportForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!issueDescription || !reportStatus) return;
            const issueText = issueDescription.value.trim();
            if (issueText === "") {
                reportStatus.textContent = "Please enter an issue description!";
                return;
            }

            const newIssue = { date: new Date().toISOString(), description: issueText };

            fetch(`${API_URL}/issues`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIssue),
            })
                .then(response => response.json())
                .then(data => {
                    reportStatus.textContent = "Issue reported successfully!";
                    issueDescription.value = "";
                    fetchIssues();
                })
                .catch(error => console.error("Error reporting issue:", error));
        });
    }

    // Function to close overlay
    function closePopup(overlayId) {
        document.getElementById(overlayId).classList.add('hidden');
    }

    // Add event listener for the "About" link
    const aboutLink = document.getElementById('aboutLink');
    if (aboutLink) {
        aboutLink.addEventListener('click', function (event) {
            event.preventDefault();
            const aboutOverlay = document.getElementById('aboutOverlay');
            if (aboutOverlay) {
                aboutOverlay.classList.remove('hidden');
            }
        });
    }

    // Add event listeners for other links (Contact, Notifications, Services)
    const contactLink = document.getElementById('contactLink');
    if (contactLink) {
        contactLink.addEventListener('click', function (event) {
            event.preventDefault();
            const contactOverlay = document.getElementById('contactOverlay');
            if (contactOverlay) {
                contactOverlay.classList.remove('hidden');
            }
        });
    }

    const notificationLink = document.getElementById('notificationLink');
    if (notificationLink) {
        notificationLink.addEventListener('click', function (event) {
            event.preventDefault();
            const notificationOverlay = document.getElementById('notificationOverlay');
            if (notificationOverlay) {
                notificationOverlay.classList.remove('hidden');
            }
        });
    }

    const servicesLink = document.getElementById('servicesLink');
    if (servicesLink) {
        servicesLink.addEventListener('click', function (event) {
            event.preventDefault();
            const servicesOverlay = document.getElementById('servicesOverlay');
            if (servicesOverlay) {
                servicesOverlay.classList.remove('hidden');
            }
        });
    }

    // Event Listeners for the date input.
    if (dateInput) {
        dateInput.addEventListener("change", function () {
            displayAvailableTechnicians(dateInput.value);
        });
    }

    // Handle Form Submissions
    const nameForm = document.getElementById('nameForm');
    const areaForm = document.getElementById('areaForm');
    const gpsForm = document.getElementById('gpsForm');

    function createListItemWithDelete(text, parentUl) {
        const li = document.createElement('li');
        li.innerHTML = text; // Allow HTML content

        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '❌';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', function () {
            li.remove();
        });

        li.appendChild(deleteIcon);
        parentUl.appendChild(li);
    }

    if (nameForm) {
        nameForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nameInput = document.getElementById('name');
            if (nameInput) {
                const name = nameInput.value;
                if (name) {
                    createListItemWithDelete(`Name: ${name}`, document.querySelector('.issue-card ul'));
                    nameInput.value = '';
                }
            }
        });
    }

    if (areaForm) {
        areaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const areaInput = document.getElementById('areaofResidence');
            if (areaInput) {
                const area = areaInput.value;
                if (area) {
                    createListItemWithDelete(`Area: ${area}`, document.querySelector('.issue-card ul'));
                    areaInput.value = '';
                }
            }
        });
    }

    if (gpsForm) {
        gpsForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const gpsInput = document.getElementById('geographicalarea');
            if (gpsInput) {
                const gps = gpsInput.value;
                if (gps) {
                    createListItemWithDelete(`Location: ${gps}`, document.querySelector('.issue-card ul'));
                    gpsInput.value = '';
                }
            }
        });
    }

    // Initial Data Fetching
    fetchTechnicians();
    fetchIssues();
});