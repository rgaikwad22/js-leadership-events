// variable declarations for selectors
var hamburger = document.querySelector(".hamburger"),
    headerNav = document.querySelector(".navbar"),
    activeNavBar = document.querySelectorAll(".nav-list li"),
    backToTopBtn = document.querySelector(".back-to-top-btn"),
    yourName = document.querySelector(".name-input"),
    email = document.querySelector(".email-input"),
    subject = document.querySelector(".subject"),
    textMessage = document.querySelector(".textarea-input textarea"),
    sendMessageBtn = document.querySelector(".send-msge-btn"),
    videoPopup = document.querySelectorAll(".prev-years-highlights-list li"),
    modalPopup = document.querySelectorAll(".feed-list li img"),
    modal = document.querySelector(".modal-content"),
    modalSection = document.querySelector(".modal"),
    closeModal = document.querySelector(".close"),
    nextSectionBtn = document.querySelector(".next-section-btn"),
    scheduleFilterAtr = document.querySelectorAll(".schedule-day-list li"),
    scheduledTaskFilter = document.querySelectorAll(".scheduled-task-list");

// global variables declaration
var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    nameRequired = "*Name is required!",
    subjectRequired = "*Subject is required!",
    nameGreterthanThree = "*Enter name greater than 3 char!",
    validSubName = "*please enter valid subject name!",
    noNumbersAsName = "*Please enter valid name!",
    noNumAsSubject = "*Please enter valid subject name!";

// global calls
//  hamberger remove active class 
hamburger.classList.remove("active-nav");
headerNav.classList.remove("active-nav");

// global event 
window.onclick = function (event) {
    if (event.target == modalSection) { 
        modalSection.classList.remove("active"); 
    }
}

// event declaration starts

// check contact fields on focus out event
yourName.addEventListener("focusout", function () { checkNameSubject(yourName, nameRequired, nameGreterthanThree, noNumbersAsName) });
email.addEventListener("focusout", function () { checkEmail() });
subject.addEventListener("focusout", function () { checkNameSubject(subject, subjectRequired, validSubName, noNumAsSubject) });
message.addEventListener("focusout", function () { checkMessage() });

// hamberger event 
hamburger.addEventListener("click", function () {
    var html = document.querySelector("html");

    hamburger.classList.toggle("active-nav");
    headerNav.classList.toggle("active-nav");

    if (hamburger.classList.contains("active-nav")) {
        // Disable scroll
        html.classList.add("hidden");
    } else {
        // Enable scroll
        html.classList.remove("hidden");
    }
});

// navlink active when clicked
activeNavBar.forEach(function (el) {
    el.addEventListener("click", function () {
        var removeActiveClass = document.querySelector(".active-link"),
            html = document.querySelector("html");

        removeActiveClass.classList.remove("active-link");
        el.classList.add("active-link");
        hamburger.classList.toggle("active-nav");
        headerNav.classList.toggle("active-nav");
        html.classList.remove("hidden");
    })
})

// back to top event 
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0 });
})

/* contact form validation event */
sendMessageBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (validateFields()) {
        emptyFormFields();
        alert("Your message is submitted successfully!");
    }
});

// video popup modal event
videoPopup.forEach(function (el) {
    el.addEventListener("click", function () {
        var videoSource = el.querySelector("source"),
            videosrc = videoSource.getAttribute("src"),
            videoTag = `<video class="watch-video" autoplay loop muted controls>
            <source src="assets/images/mixkit-fresh-sliced-fruit.mp4" type="video/mp4">
            Your browser does not support the video.
          </video>`;
        modal.innerHTML = videoTag;

        var getVideoTagsrc = document.querySelector(".modal-content video source");

        getVideoTagsrc.setAttribute('src', videosrc);
        modalSection.classList.add("active");
    })
})

// modal close event
closeModal.addEventListener("click", function () {
    modalSection.classList.remove("active");
})

// next section button event
nextSectionBtn.addEventListener("click", function () {
    document.getElementById('about').scrollIntoView();
})

// schedule filter event 
scheduleFilterAtr.forEach(function (el) {
    el.addEventListener("click", function () {
        scheduleFilter(el);
    })
})

// event declaration ends

// function declarations starts

// form validation
function validateFields() {
    var isValidName = checkNameSubject(yourName, nameRequired, nameGreterthanThree, noNumbersAsName),
        isValidEmail = checkEmail(),
        isValidSubject = checkNameSubject(subject, subjectRequired, noNumAsSubject),
        isValidMessage = checkMessage();

    // check all form fields are valid or not
    if (!isValidName || !isValidSubject || !isValidEmail || !isValidMessage) {
        return false;
    } else {
        return true;
    }
}

function checkNameSubject (inputField, errorTextMsge, nameGreterthanThree, noNumber) {
    var nameValue = inputField.value.trim();

    if (nameValue === "") {
        var errorText = errorTextMsge,
            errorParent = inputField.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (nameValue.length < 3) {
        var errorText = nameGreterthanThree,
            errorParent = inputField.parentElement;

        showError(errorText, errorParent);
        return false;

    } else if (!isNaN(nameValue)) {
        var errorText = noNumber,
            errorParent = inputField.parentElement;

        showError(errorText, errorParent);
        return false;
    } else {
        showSuccess(yourName);
        return true;
    }
}

function checkEmail() {
    var emailValue = email.value.trim();

    if (emailValue === "") {
        var errorText = "*Email is required!",
            errorParent = email.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (emailValue.match(emailPattern) == null) {
        var errorText = "*Please enter valid email!",
            errorParent = email.parentElement;

        showError(errorText, errorParent);
        return false;
    } else {
        showSuccess(email);
        return true;
    }
}

function checkMessage() {
    var messageValue = message.value.trim();

    if (messageValue === "") {
        var errorText = "*Please enter some message!",
            errorParent = message.parentElement;

        showError(errorText, errorParent);
        return false;
    } else if (messageValue.length < 8) {
        var errorText = "*Message should be greater than 8 characters!",
            errorParent = message.parentElement;

        showError(errorText, errorParent);
        return false;
    } else {
        showSuccess(message);
        return true;
    }
}

function showError(errorText, errorParent) {
    var showError = errorParent.querySelector(".error-text");

    if (showError && !null) {
        showError.remove();
    }

    var p = document.createElement("p");

    p.innerText = errorText;
    errorParent.appendChild(p);
    p.classList.add("error-text");

    errorParent.classList.add("error");
    errorParent.classList.remove("success");
}

function showSuccess(element) {
    var successParent = element.parentElement,
        showError = successParent.querySelector(".error-text");

    if (showError) {
        showError.remove();
    }

    successParent.classList.add("success");
    successParent.classList.remove("error");
}

// empty contact input fields
function emptyFormFields() {
    firstName.value = "";
    lastName.value = "";
    subject.value = "";
    email.value = "";
    message.value = "";
}

// fulter schedules function
function scheduleFilter(el) {
    var removeActiveClass = document.querySelector(".active-filter"),
        filterAtr = el.querySelector("span").innerText.toLowerCase();

    removeActiveClass.classList.remove("active-filter");
    el.classList.add("active-filter");

    scheduledTaskFilter.forEach(function (data) {
        var getFilteredData = data.getAttribute("data-day");

        if (getFilteredData.includes(filterAtr)) {
            data.classList.add("active");
            data.classList.remove("hidden");
        } else {
            data.classList.add("hidden");
            data.classList.remove("active");
        }
    })
}

// function declarations ends