let Users = JSON.parse(localStorage.getItem("Users")) || [];
var username = document.querySelector("#Username");
var password=document.querySelector("#Password");
var email=document.querySelector("#email");
var logInBtn=document.querySelector("#login");
var Registerationbtn=document.querySelector("#Register");
var logOutBtn=document.querySelector("#logOut");

function Register(){
    var user={
        username:username.value.trim(),
        password:password.value,
        email:email.value,
    };  
    if (user.username === "" || user.password === "" || user.email === "") {
        Swal.fire("⚠️ Error", "Please fill all fields", "warning");
        return;
    }

    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email === user.email) {
            Swal.fire("⚠️ Error", "Email already exists", "warning");
            return;
        } else if (Users[i].username === user.username) {
            Swal.fire("⚠️ Error", "Username already exists", "warning");
            return;
        }
    }
    if (!validateEmail(user.email)) {
        Swal.fire("⚠️ Error", "Please enter a valid email address", "warning");
        return;
    }
    else if (!validatePassword(user.password)) {
        Swal.fire("⚠️ Error", "Password must be at least 6 characters and contain a number", "warning");
        return;
    }
    
    Users.push(user);
    localStorage.setItem("Users", JSON.stringify(Users));
    Swal.fire({
        title: "Good Job",
        text: "User successfully registered",
        icon: "success"
    });
    clear();
}

function Login() {
    const user = {
        email: email.value.trim(),
        password: password.value
    };

    if (user.email === "" || user.password === "") {
        Swal.fire({
            icon: "warning",
            title: "⚠️ Error",
            text: "Please fill all fields",
            timer: 5000,
        });
        return;
    }

    if (!validateEmail(user.email)) {
        Swal.fire("⚠️ Error", "Please enter a valid email address", "warning");
        return;
    }

    let found = false;
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email === user.email && Users[i].password === user.password) {
            found = true;
            break;
        }
    }

    if (found) {
    const loggedInUser = Users.find(u => u.email === user.email && u.password === user.password);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        Swal.fire({
            icon: "success",
            title: "✅ Welcome",
            text: "Welcome back" ,
            confirmButtonText: "Continue",
        }).then(() => {
            window.location.href = "Home.html";  
        });
    } else {
        Swal.fire("⚠️ Error", "Email or password is incorrect", "warning");
    }
    clear()
}



function logout(){
    window.location.href = "index.html";

}

function clear(){
    username.value="";
    password.value="";
    email.value="";
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
}


if (Registerationbtn != null) {
    Registerationbtn.addEventListener("click", function(){
        Register();
    });
}
if (logInBtn != null) {
    logInBtn.addEventListener("click", function(){
        Login();
    });
}
if (logOutBtn != null) {
    logOutBtn.addEventListener("click", function(){
        logout();
    });
}
