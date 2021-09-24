const validateName = (name) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(name.toLowerCase());
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

const validatePassword = (password) => {
    const re = /(?=.*[a-z])(?=.*\d)[0-9A-Za-z]{8,20}/;
    // const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password.toLowerCase());
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword
}

export default validate;