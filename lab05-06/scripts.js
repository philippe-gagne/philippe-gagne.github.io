function validateForm(){

    var phoneInput = document.getElementById("example-tel-input");
    var phoneNum = phoneInput.value;
    var phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    var validPhone = phoneRegex.test(phoneNum);

    var cardInput = document.getElementById("card-number-input");
    var cardNum = cardInput.value;
    cardNum = cardNum.replace(/\s/g, "");
    var cardRegex = /^[0-9]{16}$/;
    var validCard = cardRegex.test(cardNum);

    var confirmationMessage = document.getElementById("confirmation");

    if(validCard && validPhone){
        confirmationMessage.innerHTML="Your appointment was succesfully booked!"
        confirmationMessage.setAttribute("class", "text-success")
        confirmationMessage.setAttribute("style", "visibility:visible;")
    } else if (!validCard && !validPhone){
        confirmationMessage.innerHTML="Your phone number and credit card number are invalid."
        confirmationMessage.setAttribute("class", "text-danger")
        confirmationMessage.setAttribute("style", "visibility:visible;")
    } else if (!validCard){
        confirmationMessage.innerHTML="Your credit card number is invalid."
        confirmationMessage.setAttribute("class", "text-danger")
        confirmationMessage.setAttribute("style", "visibility:visible;")
    } else if(!validPhone){
        confirmationMessage.innerHTML="Your phone number is invalid."
        confirmationMessage.setAttribute("class", "text-danger")
        confirmationMessage.setAttribute("style", "visibility:visible;")
    }

}