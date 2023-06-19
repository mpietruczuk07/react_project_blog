const validation = (values: any) => {
    let errors: any = {};

    if (!values.name) {
        errors.name = "Name is required.";
    }

    if (!values.username) {
        errors.username = "Username is required.";
    }

    if (!values.email) {
        errors.email = "Email is required.";
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid."
    }

    if (!values.password) {
        errors.password = "Password is required."
    }
    else if (values.password.length < 8) {
        errors.password = "Password must contain at least 8 characters."
    }
    else if (!/\d/.test(values.password)) {
        errors.password = "Password must contain a number."
    }
    console.log(errors);
    return errors;
}

export default validation;