// DOM ELEMENTS
const body           = document.getElementById("body")
const main           = document.getElementById("main-photographer")
const contactModal   = document.getElementById("contact_modal")
const contactBtn     = document.querySelector(".contact_button")
const closeBtn       = document.querySelector(".close-modal")
const firstInput     = document.getElementById("firstname")
const firstError     = document.querySelector(".firstname")
const lastInput      = document.getElementById("lastname")
const lastError      = document.querySelector(".lastname")
const emailInput     = document.getElementById("email")
const emailError     = document.querySelector(".email")
const messageInput   = document.getElementById("message")
const messageError   = document.querySelector(".message")
const successMessage = document.querySelector(".success")


  //EVENTLISTENERS
  //-----Click events
  firstInput.addEventListener("change", function() {
    isValidInput(firstnameRegexp,firstInput,firstError);
  });
  lastInput.addEventListener("change", function() {
    isValidInput(lastnameRegexp,lastInput,lastError);
  });
  emailInput.addEventListener("change", function() {
    isValidInput(emailRegexp,emailInput,emailError);
  });
  messageInput.addEventListener("change", function() {
    isValidInput(textRegex,messageInput,messageError);
  });

  //-----key events
  closeBtn.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' || e.key === 'Enter' || e.code === 'Space') {
        closeModal()
    }
})


// FUNCTIONS
//-----open modal
function displayModal() {
	contactModal.style.display = "block";
  contactModal.setAttribute('aria-hidden', 'false')
  contactModal.setAttribute('aria-modal', 'true')
  main.setAttribute('aria-hidden', 'true')
  closeBtn.focus();
}

//-----clean form after closing/sending
function clearInputs() {
    firstInput.value = ""
    firstError.setAttribute('data-error-visible', 'false')
    lastInput.value = ""
    lastError.setAttribute('data-error-visible', 'false')
    emailInput.value = ""
    emailError.setAttribute('data-error-visible', 'false')
    messageInput.value = ""
    messageError.setAttribute('data-error-visible', 'false')
  }
  
//-----close modal
function closeModal() {
    contactModal.style.display = "none";
    clearInputs()
    successMessage.innerHTML=""
    contactModal.setAttribute('aria-hidden', 'true')
    contactModal.setAttribute('aria-modal', 'false')
    main.setAttribute('aria-hidden', 'false')
}

//-----Form validation
const firstnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;
const lastnameRegexp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const textRegex = /\S/; //vérifie s'il y a au moins un caractère non blanc dans le textarea.

function isValidInput(regex,input,error) {
    if (!regex.test(input.value) || input ==="") {
      error.setAttribute('data-error-visible', 'true')
      return false;
    } else {
      error.setAttribute('data-error-visible', 'false')
      input.classList.add('success-message')
      return true;
    }
  }

  function validate() {
    const validFirstname   = isValidInput(firstnameRegexp,firstInput,firstError);
    const validLastname    = isValidInput(lastnameRegexp,lastInput,lastError);
    const validEmail       = isValidInput(emailRegexp,emailInput,emailError);
    const validText        = isValidInput(textRegex,messageInput,messageError);
  

    function isValidForm() {
        if(validFirstname && validLastname && validEmail && validText) {
          return true
        } else {
          return false
        }
      }

    const validForm = isValidForm();

    if(validForm) {
        console.log(
            "Prénom : " + firstInput.value + " / ", 
            "Nom : " + lastInput.value + " / ", 
            "Email : " + emailInput.value + " / ", 
            "Message : " + messageInput.value 
        )

        successMessage.innerHTML= '<p>Merci. Votre message a bien été envoyé. Vous pouvez fermer le formulaire. </p>'
        event.preventDefault()
        return true
    } else {
        return false
      }
  }