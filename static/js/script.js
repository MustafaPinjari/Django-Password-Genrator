// Select necessary DOM elements
const lengthSlider = document.querySelector(".passgen-length input");
const options = document.querySelectorAll(".passgen-option input");
const copyIcon = document.querySelector(".passgen-input-box span");
const passwordInput = document.querySelector(".passgen-input-box input");
const passIndicator = document.querySelector(".passgen-indicator");
const generateBtn = document.querySelector(".passgen-generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

// Function to generate password
const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    // Iterate through each option and construct the staticPassword string
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "passgen-exc-duplicate" && option.id !== "passgen-spaces") {
                staticPassword += characters[option.id.split('-')[1]];
            } else if (option.id === "passgen-spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    // Generate random password based on staticPassword string
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

// Function to update password strength indicator
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

// Function to update slider and password
const updateSlider = () => {
    document.querySelector(".passgen-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

// Function to copy password to clipboard
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

// Event listeners for interactivity
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

console.log("JavaScript is loaded");

document.querySelector('.passgen-generate-btn').addEventListener('click', function() {
    // Show a confirmation dialog
    if (confirm('Generate new password?')) {
        // If user clicks "Yes", generate a new password
        generatePassword();
    } else {
        // If user clicks "No", do nothing
        console.log('User cancelled password generation.');
    }
});

