let eyeIcon = document.querySelector(".fa-eye");
let eyeSlashIcon = document.querySelector(".fa-eye-slash");
let nameInput = document.querySelector("#exampleFormControlInput");
let emailInput = document.querySelector("#formGroupExampleInput1");
let passwordInput = document.querySelector("#inputPassword5");
let signInUpBtn = document.querySelector("#signInUpBtn");
let alertSuccess = document.querySelector("#alertSuccess");
let alertAllRequired = document.querySelector("#alertAllRequired");
let alertAlreadyExists = document.querySelector("#alertAlreadyExists");
let alertIncorrect = document.querySelector("#alertIncorrect");


let arrInfos = [];
localStorage.getItem("arrInfos") != null
   ? (arrInfos = JSON.parse(localStorage.getItem("arrInfos")))
   : (arrInfos = []);

if (signInUpBtn.innerHTML == "Sign Up") {
   signInUpBtn.addEventListener("click", signUp);
} else if (signInUpBtn.innerHTML == "Login") {
   signInUpBtn.addEventListener("click", login);
}

function login() {
   validateLoginData();
   if (isEmailAndPasswordTrue() >= 0) {
      signInUpBtn.setAttribute("href", "index.html");
      let userIndex = isEmailAndPasswordTrue();
      localStorage.setItem("index", JSON.stringify(userIndex));
   }
}

function signUp() {
   validateSignUpData();
   if (isUserDataValid() && isEmailNotExists()) {
      let userInfos = {
         name: nameInput.value,
         email: emailInput.value,
         password: passwordInput.value,
      };
      arrInfos.push(userInfos);
      localStorage.setItem("arrInfos", JSON.stringify(arrInfos));
      clearInputs();
   }
}

function isUserDataValid() {
   return (
      /^[A-Za-z]{1}[a-zA-z0-9\s]{2,19}$/.test(nameInput.value) &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
         emailInput.value
      ) &&
      /^.*(?=.{8,})(?=.*[\d])(?=.*[\W]).*$/.test(passwordInput.value)
   );
}

function validateSignUpData() {
   if (isUserDataValid() && isEmailNotExists() && !allInputsIsRequired()) {
      alertSuccess.classList.remove("d-none"); // Success
      alertAlreadyExists.classList.add("d-none");
      alertAllRequired.classList.add("d-none");
      emailInput.classList.remove("is-invalid");
   } else {
      alertSuccess.classList.add("d-none");
      if (allInputsIsRequired()) {
         alertAllRequired.classList.remove("d-none"); // All inputs is required
         alertAlreadyExists.classList.add("d-none");
      }
      if (!isEmailNotExists() && !allInputsIsRequired()) {
         alertAlreadyExists.classList.remove("d-none"); // Email already exists
         alertAllRequired.classList.add("d-none");
         emailInput.classList.add("is-invalid");
      }
   }
}

function validateLoginData() {
   if (emailInput.value == "" || passwordInput.value == "") {
      alertAllRequired.classList.remove("d-none"); // All are Required
      alertSuccess.classList.add("d-none");
      alertIncorrect.classList.add("d-none");

   } else if (isEmailAndPasswordTrue() >= 0) {
      console.log(isEmailAndPasswordTrue());
      alertSuccess.classList.remove("d-none"); // Success
      alertAllRequired.classList.add("d-none");
      alertIncorrect.classList.add("d-none");
   } else if (isEmailAndPasswordTrue() == -1) {
      console.log(isEmailAndPasswordTrue());
      alertIncorrect.classList.remove("d-none"); // Incorrect Data
      alertSuccess.classList.add("d-none");
      alertAllRequired.classList.add("d-none");
   }
}

function isEmailNotExists() {
   for (let i = 0; i < arrInfos.length; i++) {
      let counter = 0;
      if (arrInfos[i].email.length == emailInput.value.length) {
         for (let j = 0; j < arrInfos[i].email.length; j++) {
            if (arrInfos[i].email[j] == emailInput.value[j]) {
               counter++;
            }
         }
         if (counter == emailInput.value.length) {
            return false; // Email already exists
         }
      }
   }
   return true; // Not exists
}

function isEmailAndPasswordTrue() {
   for (let i = 0; i < arrInfos.length; i++) {
      let emailCounter = 0;
      let passwordCounter = 0;
      if (
         arrInfos[i].email.length == emailInput.value.length &&
         arrInfos[i].password.length == passwordInput.value.length
      ) {
         for (let j = 0; j < arrInfos[i].email.length; j++) {
            if (arrInfos[i].email[j] == emailInput.value[j]) {
               emailCounter++;
            }
         }
         for (let j = 0; j < arrInfos[i].password.length; j++) {
            if (arrInfos[i].password[j] == passwordInput.value[j]) {
               passwordCounter++;
            }
         }
         if (emailCounter == emailInput.value.length && passwordCounter == passwordInput.value.length) {
            return i; // Email & Password are exist
         }
      }
   }
   return -1; // Email & Password not exist
}

function allInputsIsRequired() {
   return (
      nameInput.value === "" ||
      emailInput.value === "" ||
      passwordInput.value === ""
   );
}

function clearInputs() {
   nameInput.value = "";
   emailInput.value = "";
   passwordInput.value = "";
}

eyeIcon.addEventListener("click", () => {
   eyeIcon.classList.add("d-none");
   eyeSlashIcon.classList.remove("d-none");
   passwordInput.setAttribute("type", "password");
});
eyeSlashIcon.addEventListener("click", () => {
   eyeSlashIcon.classList.add("d-none");
   eyeIcon.classList.remove("d-none");
   passwordInput.setAttribute("type", "text");
});

signInUpBtn.addEventListener("mousedown", function () {
   signInUpBtn.style.cssText = "background-color: #397887 !important;";
});
signInUpBtn.addEventListener("mouseup", function () {
   signInUpBtn.style.cssText = "background-color: #0dcaf0 !important;";
});
signInUpBtn.addEventListener("mouseenter", function () {
   signInUpBtn.style.cssText = "background-color: #0dcaf0 !important;";
});
signInUpBtn.addEventListener("mouseleave", function () {
   signInUpBtn.style.cssText = "background-color: #24353f !important;";
});
