// Check if entered OTP matches the generated OTP
function verifyCode() {
  const inputs = document.querySelectorAll('.code-inputs input');
  const enteredOtp = Array.from(inputs).map(input => input.value).join('');
  if (enteredOtp === window.currentOtp) {
    // Success: show success box
    document.getElementById('authBox').style.display = 'none';
    document.getElementById('successBox').style.display = 'block';
  } else {
    // Error: shake and clear
    const box = document.querySelector('.auth-box');
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 500);
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
  }
}






// Setup OTP input fields: only allow numbers, auto-move to next, and handle resend
function setupOtpInputs() {
  const inputs = document.querySelectorAll('.code-inputs input');
  // Only allow numbers and auto-move to next
  inputs.forEach((input, idx, arr) => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value.length === 1 && idx < arr.length - 1) arr[idx + 1].focus();
    });
    input.addEventListener('keypress', function(e) {
      if (e.key < '0' || e.key > '9') e.preventDefault();
    });
  });
  
  // Resend OTP handler
  const resendLink = document.querySelector('.resend a');
  if (resendLink) {
    resendLink.addEventListener('click', function() {
      generateAndDisplayOtp();
      showPopup('OTP sent again!');
      const last4Elem = document.getElementById('last4');
      if (last4Elem && window.lastMobile) last4Elem.textContent = window.lastMobile.slice(-4);
    });
  }
}




// Generate a random 6-digit OTP
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}




// Generate OTP, save it, and show in the UI
function generateAndDisplayOtp() {
  const otp = generateOtp();
  window.currentOtp = otp;
  document.querySelector('.auth-box strong').textContent = otp;
}




// Show a popup message for 2 seconds
function showPopup(message) {
  let popup = document.getElementById('otpPopup');
  popup.textContent = message;
  popup.style.display = 'block';
  setTimeout(() => popup.style.display = 'none', 2000);
}



// Initialize OTP input behaviors
setupOtpInputs();
// On first load, set window.currentOtp to the OTP shown in the HTML (if present)
const otpElem = document.querySelector('.auth-box strong');
if (otpElem) window.currentOtp = otpElem.textContent.trim();
