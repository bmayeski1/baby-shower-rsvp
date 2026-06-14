// 1. PASTE YOUR NEW APPS SCRIPT WEB APP URL HERE:
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkMvJvuMWsdBO8FBaSOx0baOw7TWKqTihQnGlKJI9qniCm9E44FZou72-qUSDWwefv/exec";

function switchView(viewId) {
  const views = document.querySelectorAll('.view-section');
  views.forEach(view => view.classList.remove('active'));

  const navBtns = document.querySelectorAll('nav button');
  navBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(viewId).classList.add('active');
  event.currentTarget.classList.add('active');
}

document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault(); 
  
  const submitBtn = document.getElementById('submit-btn');
  const messageDiv = document.getElementById('form-message');
  
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending Ticket...";
  messageDiv.innerText = "";

  const formData = {
    guestName: document.getElementById('guestName').value,
    isAttending: document.getElementById('isAttending').value,
    guestCount: document.getElementById('guestCount').value
  };

  // This replaces the old google.script.run command
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit RSVP";
    
    if(data.result === "success") {
      messageDiv.innerText = data.message;
      messageDiv.style.color = "green";
      document.getElementById('rsvp-form').reset();
    } else {
      messageDiv.innerText = "Error: " + data.message;
      messageDiv.style.color = "red";
    }
  })
  .catch(error => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit RSVP";
    messageDiv.innerText = "Error connecting to server. Please try again.";
    messageDiv.style.color = "red";
  });
});
