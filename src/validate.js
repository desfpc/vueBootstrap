export default {

    props: ['rule', 'value', 'func'],

    data() {
        return {
            errorText: '',
            errorClass: '',
            id: null,
        }
    },

    methods: {

        setErrorTextAndClass(validationObj) {
            this.errorText = validationObj.error

            if (validationObj.valid) {
                this.errorClass = 'is-valid'
            } else {
                this.errorClass = 'is-invalid'
            }
        },

        validateArr() {
            if (this.rule.isArray) {

                const validationObjReturn = {valid: true, error: ''};

                this.rule.forEach((rule) => {
                    validationObj = validateSingle(rule);

                    if (validationObj.valid === false) {
                        this.func(this.id, validationObj.valid)
                        this.setErrorTextAndClass(validationObj);
                        return validationObj;
                    } else {
                        if (validationObj.hasOwnProperty('return') && validationObj.return === true) {
                            this.setErrorTextAndClass(validationObjReturn);
                            this.func(this.id, validationObjReturn.valid)
                            return validationObjReturn;
                        }
                    }
                });

                this.setErrorTextAndClass(validationObjReturn);
                this.func(this.id, validationObjReturn.valid)
                return validationObjReturn;

            } else {
                return this.validate();
            }
        },

        validateSingle(rule) {
            if (rule !== undefined) {
                return rule.validate(this.value)
            } else {
                console.log('Validation rule is undefined')
                return {valid: true, error: ''}
            }
        },

        validate() {
            if (this.rule !== undefined) {
                const validationObj = this.rule.validate(this.value)
            } else {
                const validationObj = {valid: true, error: ''}
                console.log('Validation rule is undefined')
            }

            this.func(this.id, validationObj.valid)
            this.setErrorTextAndClass(validationObj);

            return validationObj;
        }
    },

    computed: {
        errorParams: function() {
            const errorObj = this.validate()

            return this.errorText
        },

        errorTextClass: function() {
            if (this.errorClass === 'is-valid') {
                return 'hidden'
            } else {
                return 'visible'
            }
        }
    },

    mounted() {
        console.log(`Validation vue component is mounted!`)
        let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
        this.id = [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');

        this.validate()
    },

    template: `<div class="validateInput">
        <slot :errorClass="errorClass"></slot>
        <div class="invalid-feedback" :class="errorTextClass">{{ errorParams }}</div>
</div>`
}