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
    
    // Show create meeting form with animation
    const form = document.getElementById("createMeetingForm");
    form.style.display = "block";
    form.style.animation = "none";
    setTimeout(() => {
        form.style.animation = "slideIn 0.4s ease-out";
    }, 10);
    
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
    
    // Show main buttons with animation
    const buttons = document.querySelector('.main-buttons');
    buttons.style.display = "flex";
    buttons.classList.add('fade-in');
    setTimeout(() => {
        buttons.classList.remove('fade-in');
    }, 600);
    
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
    
    // Show join box with animation
    const box = document.getElementById("joinBox");
    box.style.display = "block";
    box.style.animation = "none";
    setTimeout(() => {
        box.style.animation = "slideIn 0.4s ease-out";
    }, 10);
    
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
    
    // Show main buttons with animation
    const buttons = document.querySelector('.main-buttons');
    buttons.style.display = "flex";
    buttons.classList.add('fade-in');
    setTimeout(() => {
        buttons.classList.remove('fade-in');
    }, 600);
    
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
    
    // Directly open Google Meet create-meeting screen for both desktop and mobile
    window.open("https://meet.google.com/new", "_blank");
    
    // Show a simple confirmation message with animation
    document.getElementById("createMeetingForm").style.display = "none";
    const meetingInfo = document.getElementById("meetingInfo");
    meetingInfo.innerHTML = `
        <div class="meeting-card">
            <h3 style="color: #4CAF50; text-align: center; margin-top: 0;">✅ Google Meet Opened</h3>
            <div class="highlight-box">
                <p><strong>Next steps:</strong></p>
                <ol>
                    <li>Create your meeting in Google Meet</li>
                    <li>Copy the meeting link</li>
                    <li>Share it with your students</li>
                </ol>
                <p style="text-align: center; margin-top: 15px;">
                    Use the <strong>"Join Meeting"</strong> button on the home page to join meetings.
                </p>
            </div>
            <button onclick="resetToMain()" style="background: linear-gradient(135deg, #4CAF50, #45a049); width: 100%;">OK</button>
        </div>
    `;
    meetingInfo.style.display = "block";
    meetingInfo.style.animation = "none";
    setTimeout(() => {
        meetingInfo.style.animation = "slideIn 0.4s ease-out";
    }, 10);
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
    
    // Enhanced display for joining meeting with animation
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
                <button onclick="openMeetingLink('${meetLink}')" style="background: linear-gradient(135deg, #4CAF50, #45a049);">🚀 Join Meeting Now</button>
                <button onclick="resetToMain()" style="background: linear-gradient(135deg, #f44336, #d32f2f); width: 100%; margin-top: 10px;">Close</button>
            </div>
        </div>
    `;
    
    // Hide join box and show meeting info with animation
    document.getElementById("joinBox").style.display = "none";
    meetingInfo.style.display = "block";
    meetingInfo.style.animation = "none";
    setTimeout(() => {
        meetingInfo.style.animation = "slideIn 0.4s ease-out";
    }, 10);
}

// New function to reset to main screen
function resetToMain() {
    // Hide all forms and info
    document.getElementById("createMeetingForm").style.display = "none";
    document.getElementById("joinBox").style.display = "none";
    document.getElementById("meetingInfo").style.display = "none";
    
    // Show main buttons with animation
    const buttons = document.querySelector('.main-buttons');
    buttons.style.display = "flex";
    buttons.classList.add('fade-in');
    setTimeout(() => {
        buttons.classList.remove('fade-in');
    }, 600);
    
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
