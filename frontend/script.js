// ===============================
// REGISTRATION
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        try {

            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const message = document.getElementById("message");

            if (response.ok) {

                message.textContent = "Account created successfully!";

                registerForm.reset();

            } else {

                message.textContent = "Registration failed.";

            }

        } catch (error) {

            document.getElementById("message").textContent =
                "Backend is not running.";

            console.error(error);
        }
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = {
            email: email,
            password: password
        };

        try {

            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const message = document.getElementById("loginMessage");

            if (response.ok) {

                message.textContent = "Login successful!";

                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1000);

            } else {

                message.textContent = "Invalid email or password.";

            }

        } catch (error) {

            document.getElementById("loginMessage").textContent =
                "Backend is not running.";

            console.error(error);
        }
    });
}
// ===============================
// DASHBOARD - APPLICATION COUNT
// ===============================

const applicationCount = document.getElementById("applicationCount");

if (applicationCount) {

    fetch("http://localhost:8080/api/applications")
        .then(response => response.json())
        .then(applications => {

            applicationCount.textContent = applications.length;

        })
        .catch(error => {

            console.error("Error loading applications:", error);

        });
}
// ===============================
// DASHBOARD - INTERVIEW COUNT
// ===============================

const interviewCount = document.getElementById("interviewCount");

if (interviewCount) {

    fetch("http://localhost:8080/api/interviews")
        .then(response => response.json())
        .then(interviews => {

            interviewCount.textContent = interviews.length;

        })
        .catch(error => {

            console.error("Error loading interviews:", error);

        });
}
// ===============================
// DASHBOARD - TASK COUNT
// ===============================

const taskCount = document.getElementById("taskCount");

if (taskCount) {

    fetch("http://localhost:8080/api/tasks")
        .then(response => response.json())
        .then(tasks => {

            taskCount.textContent = tasks.length;

        })
        .catch(error => {

            console.error("Error loading tasks:", error);

        });
}
// ===============================
// DASHBOARD - DSA PROGRESS
// ===============================

const dsaProgressText = document.getElementById("dsaProgressText");
const dsaProgressBar = document.getElementById("dsaProgressBar");

if (dsaProgressText && dsaProgressBar) {

    fetch("http://localhost:8080/api/dsa")
        .then(response => response.json())
        .then(topics => {

            if (topics.length === 0) {
                dsaProgressText.textContent = "0%";
                dsaProgressBar.style.width = "0%";
                return;
            }

            let totalProgress = 0;

            topics.forEach(topic => {
                totalProgress += topic.progress;
            });

            const averageProgress =
                Math.round(totalProgress / topics.length);

            dsaProgressText.textContent = averageProgress + "%";
            dsaProgressBar.style.width = averageProgress + "%";

        })
        .catch(error => {

            console.error("Error loading DSA progress:", error);

        });
}
// ===============================
// DASHBOARD - SELECTED COUNT
// ===============================

const selectedCount = document.getElementById("selectedCount");

if (selectedCount) {

    fetch("http://localhost:8080/api/applications")
        .then(response => response.json())
        .then(applications => {

            const selectedApplications = applications.filter(
                application => application.status === "Selected"
            );

            selectedCount.textContent = selectedApplications.length;

        })
        .catch(error => {

            console.error("Error loading selected applications:", error);

        });
}   
// ===============================
// DASHBOARD - TODAY'S TASKS
// ===============================

const todayTasks = document.getElementById("todayTasks");

if (todayTasks) {

    fetch("http://localhost:8080/api/tasks")
        .then(response => response.json())
        .then(tasks => {

            todayTasks.innerHTML = "";

            if (tasks.length === 0) {
                todayTasks.innerHTML = "<li>No tasks available.</li>";
                return;
            }

            tasks.forEach(task => {

                const listItem = document.createElement("li");

                listItem.textContent = task.title;

                todayTasks.appendChild(listItem);

            });

        })
        .catch(error => {

            console.error("Error loading tasks:", error);

            todayTasks.innerHTML =
                "<li>Unable to load tasks.</li>";
        });
}
// ===============================
// DASHBOARD - UPCOMING INTERVIEW
// ===============================

const upcomingInterview = document.getElementById("upcomingInterview");

if (upcomingInterview) {

    fetch("http://localhost:8080/api/interviews")
        .then(response => response.json())
        .then(interviews => {

            if (interviews.length === 0) {
                upcomingInterview.textContent =
                    "No upcoming interviews.";
                return;
            }

            const interview = interviews[0];

            upcomingInterview.textContent =
                interview.company +
                " - " +
                interview.role +
                " | " +
                interview.interviewDate +
                " | " +
                interview.round;

        })
        .catch(error => {

            console.error("Error loading interviews:", error);

            upcomingInterview.textContent =
                "Unable to load interviews.";
        });
}
// ===============================
// APPLICATION FORM
// ===============================

const applicationForm = document.getElementById("applicationForm");
let editingApplicationId = null;

if (applicationForm) {
    applicationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const application = {
            company: document.getElementById("company").value,
            role: document.getElementById("role").value,
            location: document.getElementById("location").value,
            status: document.getElementById("status").value,
            applicationDate: document.getElementById("applicationDate").value
        };

        const message = document.getElementById("applicationMessage");
        const submitButton = document.getElementById("applicationSubmitButton");

        const url = editingApplicationId
            ? `http://localhost:8080/api/applications/${editingApplicationId}`
            : "http://localhost:8080/api/applications";

        const method = editingApplicationId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(application)
            });

            if (response.ok) {
                message.textContent = editingApplicationId
                    ? "Application updated successfully!"
                    : "Application added successfully!";

                applicationForm.reset();
                editingApplicationId = null;
                submitButton.textContent = "Add Application";

                location.reload();
            } else {
                message.textContent = "Failed to save application.";
            }
        } catch (error) {
            console.error(error);
            message.textContent = "Backend is not running.";
        }
    });
}



// ===============================
// DISPLAY APPLICATIONS
// ===============================

const applicationList = document.getElementById("applicationsList");



if (applicationList) {
    fetch("http://localhost:8080/api/applications")
        .then(response => response.json())
        .then(applications => {
            applicationList.innerHTML = "";

            if (applications.length === 0) {
                applicationList.textContent = "No applications yet.";
                return;
            }

            applications.forEach(application => {
                const card = document.createElement("div");
                card.className = "application-item";

                card.innerHTML = `
                    <h3>${application.company}</h3>
                    <p><strong>Role:</strong> ${application.role}</p>
                    <p><strong>Location:</strong> ${application.location}</p>
                    <p><strong>Status:</strong> ${application.status}</p>
                    <p><strong>Date:</strong> ${application.applicationDate}</p>
                `;

                // Edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                editButton.addEventListener("click", () => {
                    editingApplicationId = application.id;

                    document.getElementById("company").value = application.company;
                    document.getElementById("role").value = application.role;
                    document.getElementById("location").value = application.location;
                    document.getElementById("status").value = application.status;
                    document.getElementById("applicationDate").value =
                        application.applicationDate;

                    document.getElementById("applicationSubmitButton").textContent =
                        "Update Application";

                    document.getElementById("applicationForm")
                        .scrollIntoView({ behavior: "smooth" });
                });

                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.style.backgroundColor = "red";

                deleteButton.addEventListener("click", () => {
                    if (confirm("Are you sure you want to delete this application?")) {
                        fetch(`http://localhost:8080/api/applications/${application.id}`, {
                            method: "DELETE"
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Delete failed");
                            }
                            location.reload();
                        })
                        .catch(error => {
                            alert("Unable to delete application.");
                            console.error(error);
                        });
                    }
                });

                card.appendChild(editButton);
                card.appendChild(deleteButton);
                applicationList.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading applications:", error);
            applicationList.textContent = "Unable to load applications.";
        });
}

// DSA Tracker: Add Topic
const dsaForm = document.getElementById("dsaForm");

if (dsaForm) {
    dsaForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const topic = {
            topic: document.getElementById("topic").value,
            status: document.getElementById("status").value,
            progress: Number(document.getElementById("progress").value)
        };

        const message = document.getElementById("dsaMessage");

        try {
            const response = await fetch("http://localhost:8080/api/dsa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(topic)
            });

            if (!response.ok) {
                throw new Error("Failed to add topic");
            }

            message.textContent = "DSA topic added successfully!";
            dsaForm.reset();
            document.getElementById("progress").value = 0;
            loadDsaTopics();
        } catch (error) {
            console.error("Error adding DSA topic:", error);
            message.textContent = "Unable to add topic. Check the backend.";
        }
    });
}

// DSA Tracker: Display Topics

async function loadDsaTopics() {
    const dsaList = document.getElementById("dsaList");

    if (!dsaList) {
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/dsa");

        if (!response.ok) {
            throw new Error("Failed to load topics");
        }

        const topics = await response.json();
        dsaList.innerHTML = "";

        if (topics.length === 0) {
            dsaList.textContent = "No DSA topics added yet.";
            return;
        }

        topics.forEach(topic => {
            const card = document.createElement("div");
            card.className = "application-item";

            const heading = document.createElement("h3");
            heading.textContent = topic.topic;

            const status = document.createElement("p");
            status.textContent = "Status: " + topic.status;

            const progressText = document.createElement("p");
            progressText.textContent = "Progress: " + topic.progress + "%";

            const progressBar = document.createElement("progress");
            progressBar.max = 100;
            progressBar.value = topic.progress;
            progressBar.style.width = "100%";

            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";

            editButton.addEventListener("click", async () => {
                const newTopic = prompt("Enter topic name:", topic.topic);
                if (newTopic === null || !newTopic.trim()) return;

                const newStatus = prompt(
                    "Enter status (Not Started, Learning, Completed):",
                    topic.status
                );
                if (newStatus === null) return;

                const newProgress = prompt(
                    "Enter progress (0-100):",
                    topic.progress
                );
                if (newProgress === null) return;

                const progress = Number(newProgress);

                if (
                    !["Not Started", "Learning", "Completed"].includes(newStatus) ||
                    !Number.isInteger(progress) ||
                    progress < 0 ||
                    progress > 100
                ) {
                    alert("Please enter a valid status and progress from 0 to 100.");
                    return;
                }

                try {
                    const updateResponse = await fetch(
                        `http://localhost:8080/api/dsa/${topic.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                topic: newTopic.trim(),
                                status: newStatus,
                                progress: progress
                            })
                        }
                    );

                    if (!updateResponse.ok) {
                        throw new Error("Update failed");
                    }

                    await loadDsaTopics();
                } catch (error) {
                    console.error("Error updating topic:", error);
                    alert("Unable to update topic.");
                }
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.backgroundColor = "red";

            deleteButton.addEventListener("click", async () => {
                if (!confirm("Are you sure you want to delete this topic?")) {
                    return;
                }

                try {
                    const deleteResponse = await fetch(
                        `http://localhost:8080/api/dsa/${topic.id}`,
                        { method: "DELETE" }
                    );

                    if (!deleteResponse.ok) {
                        throw new Error("Delete failed");
                    }

                    await loadDsaTopics();
                } catch (error) {
                    console.error("Error deleting topic:", error);
                    alert("Unable to delete topic.");
                }
            });

            card.appendChild(heading);
            card.appendChild(status);
            card.appendChild(progressText);
            card.appendChild(progressBar);
            card.appendChild(editButton);
            card.appendChild(deleteButton);

            dsaList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading DSA topics:", error);
        dsaList.textContent = "Unable to load DSA topics.";
    }
}

// Task Tracker: Add Task

// Task Tracker: Add, Edit and Delete
let editingTaskId = null;

const taskForm = document.getElementById("taskForm");

if (taskForm) {
    taskForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const task = {
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            dueDate: document.getElementById("taskDueDate").value,
            completed: document.getElementById("taskCompleted").value === "true"
        };

        const message = document.getElementById("taskMessage");
        const url = editingTaskId
            ? `http://localhost:8080/api/tasks/${editingTaskId}`
            : "http://localhost:8080/api/tasks";

        try {
            const response = await fetch(url, {
                method: editingTaskId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });

            if (!response.ok) {
                throw new Error("Unable to save task");
            }

            message.textContent = editingTaskId
                ? "Task updated successfully!"
                : "Task added successfully!";

            editingTaskId = null;
            taskForm.reset();
            document.getElementById("taskSubmitButton").textContent = "Add Task";

            loadTasks();
        } catch (error) {
            console.error("Error saving task:", error);
            message.textContent = "Unable to save task. Check the backend.";
        }
    });
}

async function loadTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    try {
        const response = await fetch("http://localhost:8080/api/tasks");

        if (!response.ok) {
            throw new Error("Unable to load tasks");
        }

        const tasks = await response.json();
        taskList.replaceChildren();

        if (tasks.length === 0) {
            taskList.textContent = "No tasks found.";
            return;
        }

        tasks.forEach(function (task) {
            const card = document.createElement("div");
            card.className = "application-item";

            const title = document.createElement("h3");
            title.textContent = task.title;

            const description = document.createElement("p");
            description.textContent = task.description || "No description";

            const dueDate = document.createElement("p");
            dueDate.textContent = "Due Date: " + (task.dueDate || "Not set");

            const status = document.createElement("p");
            status.textContent = task.completed ? "Completed" : "Pending";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";

            editButton.addEventListener("click", function () {
                editingTaskId = task.id;

                document.getElementById("taskTitle").value = task.title;
                document.getElementById("taskDescription").value =
                    task.description || "";
                document.getElementById("taskDueDate").value =
                    task.dueDate || "";
                document.getElementById("taskCompleted").value =
                    String(task.completed);

                document.getElementById("taskSubmitButton").textContent =
                    "Update Task";

                document.getElementById("taskMessage").textContent =
                    "Editing task...";

                taskForm.scrollIntoView({ behavior: "smooth" });
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", async function () {
                if (!confirm("Are you sure you want to delete this task?")) {
                    return;
                }

                try {
                    const response = await fetch(
                        `http://localhost:8080/api/tasks/${task.id}`,
                        { method: "DELETE" }
                    );

                    if (!response.ok) {
                        throw new Error("Unable to delete task");
                    }

                    loadTasks();
                } catch (error) {
                    console.error("Error deleting task:", error);
                    alert("Unable to delete task. Check the backend.");
                }
            });

            card.append(title, description, dueDate, status,
                editButton, deleteButton);
            taskList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
        taskList.textContent = "Unable to load tasks. Check the backend.";
    }
}

loadTasks();



// Interview Tracker: Add, Edit and Delete
let editingInterviewId = null;

const interviewForm = document.getElementById("interviewForm");

if (interviewForm) {
    interviewForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const interview = {
            company: document.getElementById("interviewCompany").value,
            role: document.getElementById("interviewRole").value,
            interviewDate: document.getElementById("interviewDate").value,
            round: document.getElementById("interviewRound").value,
            result: document.getElementById("interviewResult").value,
            notes: document.getElementById("interviewNotes").value
        };

        const message = document.getElementById("interviewMessage");
        const url = editingInterviewId
            ? `http://localhost:8080/api/interviews/${editingInterviewId}`
            : "http://localhost:8080/api/interviews";

        try {
            const response = await fetch(url, {
                method: editingInterviewId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interview)
            });

            if (!response.ok) throw new Error("Unable to save interview");

            message.textContent = editingInterviewId
                ? "Interview updated successfully!"
                : "Interview added successfully!";

            editingInterviewId = null;
            interviewForm.reset();
            document.getElementById("interviewSubmitButton").textContent = "Add Interview";
            loadInterviews();
        } catch (error) {
            console.error("Error saving interview:", error);
            message.textContent = "Unable to save interview. Check the backend.";
        }
    });
}

async function loadInterviews() {
    const interviewList = document.getElementById("interviewList");
    if (!interviewList) return;

    try {
        const response = await fetch("http://localhost:8080/api/interviews");
        if (!response.ok) throw new Error("Failed to load interviews");

        const interviews = await response.json();
        interviewList.replaceChildren();

        if (interviews.length === 0) {
            interviewList.textContent = "No interviews found.";
            return;
        }

        interviews.forEach(function (interview) {
            const card = document.createElement("div");
            card.className = "application-item";

            const title = document.createElement("h3");
            title.textContent = interview.company;

            const role = document.createElement("p");
            role.textContent = "Role: " + interview.role;

            const date = document.createElement("p");
            date.textContent = "Date: " + interview.interviewDate;

            const round = document.createElement("p");
            round.textContent = "Round: " + interview.round;

            const result = document.createElement("p");
            result.textContent = "Result: " + interview.result;

            const notes = document.createElement("p");
            notes.textContent = "Notes: " + (interview.notes || "No notes");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function () {
                editingInterviewId = interview.id;
                document.getElementById("interviewCompany").value = interview.company || "";
                document.getElementById("interviewRole").value = interview.role || "";
                document.getElementById("interviewDate").value = interview.interviewDate || "";
                document.getElementById("interviewRound").value = interview.round || "";
                document.getElementById("interviewResult").value = interview.result || "Scheduled";
                document.getElementById("interviewNotes").value = interview.notes || "";
                document.getElementById("interviewSubmitButton").textContent = "Update Interview";
                document.getElementById("interviewMessage").textContent = "Editing interview...";
                interviewForm.scrollIntoView({ behavior: "smooth" });
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async function () {
                if (!confirm("Are you sure you want to delete this interview?")) return;

                try {
                    const response = await fetch(
                        `http://localhost:8080/api/interviews/${interview.id}`,
                        { method: "DELETE" }
                    );

                    if (!response.ok) throw new Error("Unable to delete interview");

                    if (editingInterviewId === interview.id) {
                        editingInterviewId = null;
                        interviewForm.reset();
                        document.getElementById("interviewSubmitButton").textContent = "Add Interview";
                    }

                    loadInterviews();
                } catch (error) {
                    console.error("Error deleting interview:", error);
                    alert("Unable to delete interview. Check the backend.");
                }
            });

            card.append(title, role, date, round, result, notes, editButton, deleteButton);
            interviewList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading interviews:", error);
        interviewList.textContent = "Unable to load interviews. Check the backend.";
    }
}

loadInterviews();
// Resume Tracker: Load, Save and Update
const resumeForm = document.getElementById("resumeForm");

if (resumeForm) {
    let editingResumeId = null;

    const resumeMessage = document.getElementById("resumeMessage");
    const submitButton = resumeForm.querySelector("button[type='submit']");

    // Load existing resume
    async function loadResume() {
        try {
            const response = await fetch("http://localhost:8080/api/resume");

            if (!response.ok) {
                throw new Error("Unable to load resume");
            }

            const profiles = await response.json();

            if (profiles.length > 0) {
                const resume = profiles[0];

                editingResumeId = resume.id;

                document.getElementById("resumeName").value = resume.name || "";
                document.getElementById("resumeEmail").value = resume.email || "";
                document.getElementById("resumePhone").value = resume.phone || "";
                document.getElementById("resumeGithub").value = resume.github || "";
                document.getElementById("resumeLinkedin").value = resume.linkedin || "";
                document.getElementById("resumeSkills").value = resume.skills || "";
                document.getElementById("resumeEducation").value = resume.education || "";
                document.getElementById("resumeProjects").value = resume.projects || "";

                submitButton.textContent = "Update Resume";
                resumeMessage.textContent = "Existing resume loaded.";
            }
        } catch (error) {
            console.error("Error loading resume:", error);
            resumeMessage.textContent = "Unable to load resume.";
        }
    }

    // Save or update resume
    resumeForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const resume = {
            name: document.getElementById("resumeName").value,
            email: document.getElementById("resumeEmail").value,
            phone: document.getElementById("resumePhone").value,
            github: document.getElementById("resumeGithub").value,
            linkedin: document.getElementById("resumeLinkedin").value,
            skills: document.getElementById("resumeSkills").value,
            education: document.getElementById("resumeEducation").value,
            projects: document.getElementById("resumeProjects").value
        };

        const url = editingResumeId
            ? `http://localhost:8080/api/resume/${editingResumeId}`
            : "http://localhost:8080/api/resume";

        const method = editingResumeId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resume)
            });

            if (!response.ok) {
                throw new Error("Unable to save resume");
            }

            const savedResume = await response.json();

            editingResumeId = savedResume.id;
            submitButton.textContent = "Update Resume";
            resumeMessage.textContent = "Resume saved successfully!";
        } catch (error) {
            console.error("Error saving resume:", error);
            resumeMessage.textContent = "Unable to save resume. Check the backend.";
        }
    });

    loadResume();
}
// Download Resume as PDF
const downloadButton = document.getElementById("downloadResume");

if (downloadButton) {
    downloadButton.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const name = document.getElementById("resumeName").value;
        const email = document.getElementById("resumeEmail").value;
        const phone = document.getElementById("resumePhone").value;
        const github = document.getElementById("resumeGithub").value;
        const linkedin = document.getElementById("resumeLinkedin").value;
        const skills = document.getElementById("resumeSkills").value;
        const education = document.getElementById("resumeEducation").value;
        const projects = document.getElementById("resumeProjects").value;

        let y = 20;

        doc.setFontSize(20);
        doc.text(name || "My Resume", 20, y);
        y += 12;

        doc.setFontSize(11);
        doc.text("Email: " + email, 20, y);
        y += 7;
        doc.text("Phone: " + phone, 20, y);
        y += 7;
        doc.text("GitHub: " + github, 20, y);
        y += 7;
        doc.text("LinkedIn: " + linkedin, 20, y);
        y += 12;

        function addSection(title, content) {
            doc.setFontSize(14);
            doc.setFont(undefined, "bold");
            doc.text(title, 20, y);
            y += 8;

            doc.setFontSize(11);
            doc.setFont(undefined, "normal");

            const lines = doc.splitTextToSize(content || "Not provided", 170);

            lines.forEach(line => {
                if (y > 275) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, 20, y);
                y += 6;
            });

            y += 7;
        }

        addSection("SKILLS", skills);
        addSection("EDUCATION", education);
        addSection("PROJECTS", projects);

        doc.save("My_Resume.pdf");
    });
}