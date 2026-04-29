function login(){
    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value.trim();
    let e=document.getElementById("errorText");

    if(email==="" || password===""){
        e.innerHTML="Please fill all fields";
        return;
    }

    if(!email.includes("@")){
        e.innerHTML="Invalid email format";
        return;
    }

    e.innerHTML="";

    // Fake loading animation
    const btn=document.querySelector('.btn');
    btn.innerHTML="Checking...";
    btn.style.opacity="0.8";
    btn.disabled=true;

    setTimeout(()=>{
        btn.innerHTML="Login";
        btn.style.opacity="1";
        btn.disabled=false;
        alert("Login Successful!");
    },1500);
}
