export default {
    install: (app, options) => {

        app.config.globalProperties.$validationRules = {
            empty: {
                validate(val) {
                    return {valid: true, error: ''}
                }
            },
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