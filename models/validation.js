const generateEmptyMsg = field => {
    return `Please enter your ${field}`
}

const checkFieldEmpty = field => {
    return field === undefined || field === null || field.length === 0;
}
const validateEmail = email => {
    const regEx = /^[A-Za-z0-9._]+@([A-Z0-9]+\.)+[A-Za-z]{2,4}$/i;
    return regEx.test(email);
}

const validatePassword = pswd => {
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,8}$/i;
    return regEx.test(pswd);
}


module.exports.validateFields = (data, fields) => {
    const errMsg = [];

    fields.forEach(field => {
        fieldValue = data[field]
        if (checkFieldEmpty(fieldValue)) {
            errMsg.push({
                id: field,
                message: generateEmptyMsg(field)
            });
        } else if (field === 'email' && !validateEmail(fieldValue)) {
            errMsg.push({
                id: field,
                message: 'Please enter a valid email'
            })
        } else if (field === 'password' && !validatePassword(fieldValue)) {
            errMsg.push({
                id: field,
                message: 'Please enter a valid password'
            })
        }
    })

    const errObj = {};

    errMsg.forEach(err => {
        errObj[err.id] = err.message;
    })

    return errObj;
}

