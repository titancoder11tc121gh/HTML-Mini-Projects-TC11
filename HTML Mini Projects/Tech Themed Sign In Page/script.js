// Password visibility toggle
document.getElementById("togglePass").onclick = function(){
  const passField = document.getElementById("password");
  if(passField.type === "password"){
    passField.type = "text";
    this.textContent = "🙈";
  } else {
    passField.type = "password";
    this.textContent = "👁";
  }
};

// Login button event listener
document.getElementById("loginBtn").addEventListener("click", function(){
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();
  const err = document.getElementById("errorText");

  if(email === "" || pass === ""){
    err.innerHTML = "Please fill all fields";
    return;
  }
  if(!email.includes("@")){
    err.innerHTML = "Invalid Email";
    return;
  }

  err.innerHTML = "";
  const btn = document.getElementById("loginBtn");
  btn.innerHTML = "Please wait...";
  btn.style.opacity = "0.8";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = "Login";
    btn.style.opacity = "1";
    btn.disabled = false;
    alert("Logged in Successfully!");
  }, 1500);
});