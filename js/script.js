const formContainer = document.getElementById('formContainer');
const showSignup = document.getElementById('showSignup');
const showSignin = document.getElementById('showSignin');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const signinSuccess = document.getElementById('signinSuccess');
const signupSuccess = document.getElementById('signupSuccess');

const BASE_URL = "http://localhost:3000";

// Toggle forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.add('active');
    signinSuccess.style.display = 'none';
});

showSignin.addEventListener('click', (e) => {
    e.preventDefault();
    formContainer.classList.remove('active');
    signupSuccess.style.display = 'none';
});

// ---------- Signup ----------
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });

    const data = await res.json();

    if (res.status === 201) { 
      signupForm.reset();
      signupSuccess.style.display = "block";
      setTimeout(() => { signupSuccess.style.display = "none"; }, 3000);
    } else if (res.status === 409) { 
      alert(data.message); 
      signupSuccess.style.display = "none";
    } else {
      alert("Something went wrong!");
      signupSuccess.style.display = "none";
    }

  } catch (err) {
    console.error(err);
    alert("Signup failed ❌");
    signupSuccess.style.display = "none";
  }
});

// ---------- Login ----------
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) { 
      signinForm.reset();
      signinSuccess.style.display = "block";
      setTimeout(() => { signinSuccess.style.display = "none"; }, 3000);
    } else if (res.status === 404) { 
      alert(data.message); 
      signinSuccess.style.display = "none";
    } else {
      alert("Something went wrong!");
      signinSuccess.style.display = "none";
    }

  } catch (err) {
    console.error(err);
    alert("Login failed ❌");
    signinSuccess.style.display = "none";
  }
});


