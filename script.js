let selectedRole = '';
let selectedJoinRole = '';
let meetingTimer = null;
let timeLeft = 600; // 10 minutes in seconds

function selectRole(role) {
    selectedRole = role;
    // Update UI to show selected role
    const roleOptions = document.querySelectorAll('#createMeetingForm .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

function selectJoinRole(role) {
    selectedJoinRole = role;
    // Update UI to show selected role
    const roleOptions = document.querySelectorAll('#joinBox .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

function showCreateOptions(){
    // Hide main buttons and join box
    document.querySelector('.main-buttons').style.display = "none";
    document.getElementById("joinBox").style.display = "none";
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show create meeting form
    document.getElementById("createMeetingForm").style.display = "block";
    
    // Reset form
    document.getElementById("userName").value = "";
    const roleOptions = document.querySelectorAll('#createMeetingForm .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
    selectedRole = '';
}

function hideCreateOptions(){
    // Hide create meeting form
    document.getElementById("createMeetingForm").style.display = "none";
    
    // Show main buttons
    document.querySelector('.main-buttons').style.display = "flex";
}

function showJoinBox(){
    // Hide main buttons and create form
    document.querySelector('.main-buttons').style.display = "none";
    document.getElementById("createMeetingForm").style.display = "none";
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show join box
    document.getElementById("joinBox").style.display = "block";
    
    // Reset form
    document.getElementById("joinLink").value = "";
    const roleOptions = document.querySelectorAll('#joinBox .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
    selectedJoinRole = '';
}

function hideJoinBox(){
    // Hide join box
    document.getElementById("joinBox").style.display = "none";
    
    // Show main buttons
    document.querySelector('.main-buttons').style.display = "flex";
}

function createMeeting(){
    const userName = document.getElementById("userName").value;
    const meetingType = document.getElementById("meetingType").value;
    
    if (!userName) {
        alert("Please enter your name");
        return;
    }
    
    if (!selectedRole) {
        alert("Please select your role");
        return;
    }
    
    // Open Google Meet in a new tab
    const meetWindow = window.open("https://meet.google.com/new", "_blank");
    
    // Show instructions to user
    alert("Google Meet is opening in a new tab. Please wait for the meeting to be created, then copy the meeting link and paste it in the input field that will appear.");
    
    // Show link input field
    showLinkInput();
}

function showLinkInput() {
    // Hide the create meeting form
    document.getElementById("createMeetingForm").style.display = "none";
    
    // Show link input in meetingInfo div
    const meetingInfo = document.getElementById("meetingInfo");
    meetingInfo.innerHTML = `
        <p><b style="color: #4CAF50;">✅ Please paste the Google Meet link below</b></p>
        <div class="form-group">
            <label for="googleMeetLink">Google Meet Link:</label>
            <input type="text" id="googleMeetLink" placeholder="Paste the Google Meet link here" style="width: 100%; padding: 15px; margin: 10px 0;">
        </div>
        <button onclick="processGoogleMeetLink()">Process Link</button>
        <button onclick="hideCreateOptions()" style="background: #f44336; margin-left: 10px;">Cancel</button>
    `;
    meetingInfo.style.display = "block";
}

function processGoogleMeetLink() {
    const link = document.getElementById("googleMeetLink").value;
    
    if (!link) {
        alert("Please enter a Google Meet link");
        return;
    }
    
    if (!link.includes("meet.google.com")) {
        alert("Please enter a valid Google Meet link");
        return;
    }
    
    // Extract meeting ID from URL
    let meetId = "";
    if (link.includes("/")) {
        meetId = link.split("/").pop().split("?")[0]; // Remove any query parameters
    } else {
        meetId = link.split("?")[0]; // In case it's just the ID
    }
    
    const userName = document.getElementById("userName").value;
    const meetingType = document.getElementById("meetingType").value;
    
    // Display meeting info
    document.getElementById("meetingInfo").innerHTML = `
        <p><b style="color: #4CAF50;">✅ Meeting Created Successfully</b></p>
        <div class="meeting-info">
            <p><b>Host:</b> <span id="hostName">${userName}</span></p>
            <p><b>Role:</b> <span id="hostRole">${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span></p>
            <p><b>Meeting Type:</b> <span id="meetType">${meetingType}</span></p>
            <p><b>Meeting Link:</b> <span id="meetLink">${link}</span></p>
            <p><b>Meeting ID:</b> <span id="meetId">${meetId}</span></p>
        </div>
        <div class="action-buttons">
            <button onclick="copyLink()" style="background: #2196F3;">📋 Copy Link</button>
            <button onclick="startMeet()" style="background: #FF9800;">🚀 Start Meeting</button>
            <button onclick="hideCreateOptions()" style="background: #f44336; width: 100%; margin-top: 10px;">Close</button>
        </div>
    `;
    
    // Store meeting data
    window.generatedLink = link;
    window.generatedId = meetId;
    window.meetingHost = userName;
    window.meetingRole = selectedRole;
}

function startMeetingTimer() {
    clearInterval(meetingTimer);
    
    meetingTimer = setInterval(function() {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById("timer").innerText = 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');
        
        // Change color when less than 2 minutes left
        if (timeLeft < 120) {
            document.getElementById("timer").style.color = "#f44336";
        }
        
        // Expire meeting when time is up
        if (timeLeft <= 0) {
            clearInterval(meetingTimer);
            document.getElementById("timer").innerText = "EXPIRED";
            document.getElementById("timer").style.color = "#f44336";
            alert("Meeting link has expired!");
        }
    }, 1000);
}

function copyLink(){
    if (window.generatedLink) {
        navigator.clipboard.writeText(window.generatedLink);
        alert("Link Copied ✅");
    }
}

function startMeet(){
    if (window.generatedLink) {
        window.open(window.generatedLink, "_blank");
    }
}

function joinMeeting(){
    const link = document.getElementById("joinLink").value;
    if (!link) {
        alert("Please enter a meeting link or ID");
        return;
    }
    
    if (!selectedJoinRole) {
        alert("Please select your role");
        return;
    }
    
    // Process the meeting link
    let meetLink = link;
    if (!link.startsWith("http")) {
        meetLink = "https://meet.google.com/" + link.replace("https://meet.google.com/", "");
    }
    
    window.open(meetLink, "_blank");
    
    // Show confirmation
    const meetingInfo = document.getElementById("meetingInfo");
    meetingInfo.innerHTML = `
        <p><b style="color: #4CAF50;">✅ Joining Meeting</b></p>
        <div class="meeting-info">
            <p><b>Role:</b> <span id="joinRole">${selectedJoinRole.charAt(0).toUpperCase() + selectedJoinRole.slice(1)}</span></p>
            <p><b>Meeting Link:</b> <span id="joinLinkDisplay">${meetLink}</span></p>
        </div>
        <button onclick="hideJoinBox()" style="background: #f44336; width: 100%; margin-top: 20px;">Close</button>
    `;
    
    // Hide join box and show meeting info
    document.getElementById("joinBox").style.display = "none";
    meetingInfo.style.display = "block";
}