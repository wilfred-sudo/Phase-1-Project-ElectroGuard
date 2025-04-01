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
            })
            .catch(error => console.error("Error fetching technicians:", error));
    }

    // Display Available Technicians Based on Date
    function displayAvailableTechnicians(date) {
        const technicians = JSON.parse(localStorage.getItem("technicians")) || [];
        technicianList.innerHTML = "";

        const availableTechs = technicians.filter(tech => tech.availableDates.includes(date));
        if (availableTechs.length === 0) {
            technicianList.innerHTML = "<p>No technicians available on this date.</p>";
        } else {
            availableTechs.forEach(tech => {
                const li = document.createElement("li");
                li.textContent = tech.name;
                technicianList.appendChild(li);
            });
        }
    }

    // Fetch and Display Reported Issues
    function fetchIssues() {
        fetch(`${API_URL}/issues`)
            .then(response => response.json())
            .then(data => {
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
    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();
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
            issueDescription.value = ""; // Clear input
            fetchIssues(); // Refresh issues list
        })
        .catch(error => console.error("Error reporting issue:", error));
    });

    // Event Listeners
    dateInput.addEventListener("change", function () {
        displayAvailableTechnicians(dateInput.value);
    });

    // Initial Data Fetching
    fetchTechnicians();
    fetchIssues();
});
