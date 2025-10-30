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
    
    // Also hide meeting info if it was shown
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show main buttons
    document.querySelector('.main-buttons').style.display = "flex";
    
    // Reset form values
    document.getElementById("userName").value = "";
    document.getElementById("googleMeetLink").value = "";
    selectedRole = '';
    
    // Reset role selection UI
    const roleOptions = document.querySelectorAll('#createMeetingForm .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
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
    
    // Also hide meeting info if it was shown
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show main buttons
    document.querySelector('.main-buttons').style.display = "flex";
    
    // Reset form values
    document.getElementById("joinLink").value = "";
    document.getElementById("googleMeetLink").value = "";
    selectedJoinRole = '';
    
    // Reset role selection UI
    const roleOptions = document.querySelectorAll('#joinBox .role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
    });
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
    
    // Check if user is on mobile device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, show instructions instead of opening in new tab
        showMobileInstructions();
    } else {
        // For desktop, open in new tab as before
        const meetWindow = window.open("https://meet.google.com/new", "_blank");
        
        // Show instructions to user
        alert("Google Meet is opening in a new tab. Please wait for the meeting to be created, then copy the meeting link and paste it in the input field that will appear.");
        
        // Show link input field
        showLinkInput();
    }
}

function showMobileInstructions() {
    // Hide the create meeting form
    document.getElementById("createMeetingForm").style.display = "none";
    
    // Show mobile instructions
    const meetingInfo = document.getElementById("meetingInfo");
    meetingInfo.innerHTML = `
        <p><b style="color: #4CAF50;">📱 Mobile Device Detected</b></p>
        <div class="meeting-info">
            <p>To create a Google Meet:</p>
            <ol>
                <li>Open the Google Meet app on your device</li>
                <li>Tap "New meeting" or the "+" button</li>
                <li>Create your meeting</li>
                <li>Copy the meeting link</li>
                <li>Return to this app and paste the link below</li>
            </ol>
        </div>
        <div class="form-group">
            <label for="googleMeetLink">Google Meet Link:</label>
            <input type="text" id="googleMeetLink" placeholder="Paste the Google Meet link here" style="width: 100%; padding: 15px; margin: 10px 0;">
        </div>
        <button onclick="processGoogleMeetLink()">Process Link</button>
        <button onclick="resetToMain()" style="background: #f44336; margin-left: 10px;">Cancel</button>
    `;
    meetingInfo.style.display = "block";
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
        <button onclick="resetToMain()" style="background: #f44336; margin-left: 10px;">Cancel</button>
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
    
    // Enhanced display of meeting info with better formatting
    document.getElementById("meetingInfo").innerHTML = `
        <div class="meeting-card">
            <h3 style="color: #4CAF50; text-align: center; margin-top: 0;">✅ Meeting Created Successfully</h3>
            
            <div class="highlight-box">
                <p style="margin: 5px 0;"><strong>Host:</strong> ${userName}</p>
                <p style="margin: 5px 0;"><strong>Role:</strong> ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</p>
                <p style="margin: 5px 0;"><strong>Type:</strong> ${meetingType}</p>
            </div>
            
            <p style="text-align: center; margin: 20px 0 10px 0; color: #555;"><strong>Meeting ID</strong></p>
            <div class="meeting-id-display" id="meetIdDisplay">${meetId}</div>
            
            <p style="text-align: center; margin: 20px 0 10px 0; color: #555;"><strong>Meeting Link</strong></p>
            <div class="meeting-link-display" id="meetLinkDisplay">${link}</div>
            
            <div class="action-buttons">
                <button onclick="copyLink()" style="background: #2196F3;">📋 Copy Link</button>
                <button onclick="openMeetingLink('${link}')" style="background: #FF9800;">🚀 Join Meeting</button>
                <button onclick="resetToMain()" style="background: #f44336; width: 100%; margin-top: 10px;">Close</button>
            </div>
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

function openMeetingLink(link) {
    // Check if user is on mobile device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, try to open in browser first, then app
        window.open(link, "_blank");
    } else {
        // For desktop, open in new tab
        window.open(link, "_blank");
    }
}

function startMeet(){
    if (window.generatedLink) {
        openMeetingLink(window.generatedLink);
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
    
    // Extract meeting ID for display
    let meetId = "";
    if (meetLink.includes("/")) {
        meetId = meetLink.split("/").pop().split("?")[0];
    } else {
        meetId = meetLink.split("?")[0];
    }
    
    // Enhanced display for joining meeting
    const meetingInfo = document.getElementById("meetingInfo");
    meetingInfo.innerHTML = `
        <div class="meeting-card">
            <h3 style="color: #4CAF50; text-align: center; margin-top: 0;">✅ Joining Meeting</h3>
            
            <div class="highlight-box">
                <p style="margin: 5px 0;"><strong>Role:</strong> ${selectedJoinRole.charAt(0).toUpperCase() + selectedJoinRole.slice(1)}</p>
            </div>
            
            <p style="text-align: center; margin: 20px 0 10px 0; color: #555;"><strong>Meeting ID</strong></p>
            <div class="meeting-id-display" id="joinMeetIdDisplay">${meetId}</div>
            
            <p style="text-align: center; margin: 20px 0 10px 0; color: #555;"><strong>Meeting Link</strong></p>
            <div class="meeting-link-display" id="joinLinkDisplay">${meetLink}</div>
            
            <div class="action-buttons">
                <button onclick="openMeetingLink('${meetLink}')" style="background: #4CAF50;">🚀 Join Meeting Now</button>
                <button onclick="resetToMain()" style="background: #f44336; width: 100%; margin-top: 10px;">Close</button>
            </div>
        </div>
    `;
    
    // Hide join box and show meeting info
    document.getElementById("joinBox").style.display = "none";
    meetingInfo.style.display = "block";
}

// New function to reset to main screen
function resetToMain() {
    // Hide all forms and info
    document.getElementById("createMeetingForm").style.display = "none";
    document.getElementById("joinBox").style.display = "none";
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show main buttons
    document.querySelector('.main-buttons').style.display = "flex";
    
    // Reset all form values
    document.getElementById("userName").value = "";
    document.getElementById("joinLink").value = "";
    document.getElementById("googleMeetLink").value = "";
    selectedRole = '';
    selectedJoinRole = '';
    
    // Reset role selection UI
    const createRoleOptions = document.querySelectorAll('#createMeetingForm .role-option');
    createRoleOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    const joinRoleOptions = document.querySelectorAll('#joinBox .role-option');
    joinRoleOptions.forEach(option => {
        option.classList.remove('selected');
    });
}
