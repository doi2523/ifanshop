const togglePasswordButton = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordButton.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Thay đổi icon giữa 'eye' và 'eye-slash'
  this.querySelector('i').classList.toggle('fa-eye');
  this.querySelector('i').classList.toggle('fa-eye-slash');
});
