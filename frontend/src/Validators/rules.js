const requiredValue = "REQUIRED-VALUE"
const minValue ='MIN-VALUE'
const maxValue ='MAX-VALUE'
const emailValue ='EMAIL-VALUE'

export const requiredValidator = () => ({
    value : requiredValue
})

export const minValidator = min => ({
    value : minValue,
    min : min
})
export const maxValidator = max => ({
    value : maxValue,
    max : max
})
export const emailValidator = () => ({
    value : emailValue
})

export default {requiredValue ,minValue , maxValue , emailValue}