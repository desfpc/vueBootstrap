export default {
    data() {
        return {
            validationRules: {
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
            },
            validationArr: {}
        }
    },

    methods: {
        globalValidation(id, value) {
            this.validationArr[id] = value
        },

        checkValidationArr() {
            let result = true;

            for (const [key, value] of Object.entries(this.validationArr)) {
                if (key !== null && key !== 'null' && !value) {
                    return false
                }
            }

            return result;
        },
    }
}