export default {
    install: (app, options) => {

        app.config.globalProperties.$getValidationRuleFromString = (rule) => {
            if (rule.indexOf('|') > -1) {
                let arr = [];

                rule.split('|').forEach((r) => {
                    arr.push(app.config.globalProperties.$validationRules[r]);
                });

                return arr;
            } else {
                return app.config.globalProperties.$validationRules[rule]
            }
        }

        app.config.globalProperties.$validationRules = {
            empty: {
                validate(val) {
                    return {valid: true, error: '', return: true}
                }
            },
            string: {
                validate(val) {
                    if (val !== null && val.length > 0) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Empty string'} //TODO translate
                    }
                },
            },
            email: {
                validate(val) {
                    if (val !== null && val.length > 0 && val.includes('@') && val.includes('.')) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Not an email'}
                    }
                },
            },
            bool: {
                validate(val) {
                    if (val === true || val === false || val === 1 || val === 0 || val === '0' || val === '1') {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Not a boolean'}
                    }
                },
            },
            float: {
                validate(val) {
                    if (parseFloat(val) === val && !Number.isInteger(val)) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Not a float'}
                    }
                }
            },
            positiveInteger: {
                validate(val) {
                    let intVal = parseInt(val)

                    if (isNaN(intVal)) {
                        return {valid: false, error: 'Not an integer'}
                    }

                    if (intVal !== null && intVal >= 0) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Not an integer or negative integer'}
                    }
                },
            },
            positiveIntegerNotZero: {
                validate(val) {
                    let intVal = parseInt(val)

                    if (isNaN(intVal)) {
                        return {valid: false, error: 'Not an integer'}
                    }

                    if (intVal !== null && intVal > 0) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Not an integer, negative integer or zero'}
                    }
                },
            },
        }

        app.config.globalProperties.$validationArr = {}

        app.config.globalProperties.$globalValidation = (id, value) => {
            app.config.globalProperties.$validationArr[id] = value
        }

        app.config.globalProperties.$checkValidation = () => {
            for (const [key, value] of Object.entries(app.config.globalProperties.$validationArr)) {
                if (key !== null && key !== 'null' && !value) {
                    return false
                }
            }

            return true;
        }
    }
}