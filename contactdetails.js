// CONTACT PAGE: COPY CONTACT DETAILS TO CLIPBOARD

// COPY E-MAIL
document.addEventListener("DOMContentLoaded", () => {
    const emailLink = document.getElementById("email-link");
    const emailLinkCopy = document.getElementById("email-link-copy");
  
    emailLinkCopy.addEventListener("click", (event) => {
      event.preventDefault();
  
      const email = emailLink.textContent;
      navigator.clipboard
        .writeText(email)
        .then(() => {
          copyMessage.style.display = "block";
          setTimeout(function () {
            copyMessage.style.display = "none";
          }, 1500);
        })
        .catch((err) => {
          console.error("Erro ao copiar o e-mail: ", err);
        });
    });
  });
  
  // COPY EU NUMBER
  document.addEventListener("DOMContentLoaded", () => {
    const euPhoneNumber = document.getElementById("euPhoneNumber");
    const euPhoneNumberCopy = document.getElementById("eu-Phone-Number-Copy");
  
    euPhoneNumberCopy.addEventListener("click", (event) => {
      event.preventDefault();
  
      const euPhone = euPhoneNumber.textContent;
      navigator.clipboard
        .writeText(euPhone)
        .then(() => {
          copyMessage2.style.display = "block";
          setTimeout(function () {
            copyMessage2.style.display = "none";
          }, 1500);
        })
        .catch((err) => {
          console.error("Erro ao copiar o e-mail: ", err);
        });
    });
  });
  
  // COPY US NUMBER
  document.addEventListener("DOMContentLoaded", () => {
    const usPhoneNumber = document.getElementById("usPhoneNumber");
    const usPhoneNumberCopy = document.getElementById("us-Phone-Number-copy");
  
    usPhoneNumberCopy.addEventListener("click", (event) => {
      event.preventDefault();
  
      const usPhone = usPhoneNumber.textContent;
      navigator.clipboard
        .writeText(usPhone)
        .then(() => {
          copyMessage3.style.display = "block";
          setTimeout(function () {
            copyMessage3.style.display = "none";
          }, 1500);
        })
        .catch((err) => {
          console.error("Erro ao copiar o e-mail: ", err);
        });
    });
  });
  
  // COPY EU ADDRESS
  document.addEventListener("DOMContentLoaded", () => {
    const euOffice = document.getElementById("eu-office");
    const euOfficeCopy = document.getElementById("eu-office-copy");
  
    euOfficeCopy.addEventListener("click", (event) => {
      event.preventDefault();
  
      const euOfficeAddress = euOffice.textContent;
      navigator.clipboard
        .writeText(euOfficeAddress)
        .then(() => {
          copyMessage4.style.display = "block";
          setTimeout(function () {
            copyMessage4.style.display = "none";
          }, 1500);
        })
        .catch((err) => {
          console.error("Erro ao copiar o e-mail: ", err);
        });
    });
  });
  
  // COPY US ADDRESS
  document.addEventListener("DOMContentLoaded", () => {
    const usOffice = document.getElementById("us-office");
    const usOfficeCopy = document.getElementById("us-office-copy");
  
    usOfficeCopy.addEventListener("click", (event) => {
      event.preventDefault();
  
      const usOfficeAddress = usOffice.textContent;
      navigator.clipboard
        .writeText(usOfficeAddress)
        .then(() => {
          copyMessage5.style.display = "block";
          setTimeout(function () {
            copyMessage5.style.display = "none";
          }, 1500);
        })
        .catch((err) => {
          console.error("Erro ao copiar o e-mail: ", err);
        });
    });
  });
  