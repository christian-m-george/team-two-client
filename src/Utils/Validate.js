const validateName = (name) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(name.toLowerCase());
}

const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

const validatePassword = (password) => {
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[0-9A-Za-z]{8,20}/;
    return re.test(password);
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword
}

export default validate;