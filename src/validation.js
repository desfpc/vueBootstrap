export default {
    install: (app, options) => {

        app.config.globalProperties.$validationRules = {
            string: {
                validate(val) {
                    if (val !== null && val.length > 0) {
                        return {valid: true, error: ''}
                    } else {
                        return {valid: false, error: 'Empty string'}
                    }
                },
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
    }
}