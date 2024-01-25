const testEmail = (value) => {
    const emailPattern = /^\w+([\.-]?\w)*@\w([\.-]?\w)*(\.\w{2,3})$/g
    return emailPattern.test(value)
}

const testCodeMelli = (value) => {
    // Test
}

const testPhoneNumber = (value) => {
    // Test
}

export default {
    testEmail,
    testCodeMelli,
    testPhoneNumber
}