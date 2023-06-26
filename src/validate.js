export default {

    props: ['validationRule', 'value', 'globalValidation'],

    data() {
        return {
            errorText: '',
            errorClass: '',
            id: null,
        }
    },

    methods: {
        validate(){
            const validationObj = this.validationRule.validate(this.value)
            this.globalValidation(this.id, validationObj.valid)

            if (validationObj.valid) {
                this.errorText = validationObj.error
                this.errorClass = 'is-valid'
            } else {
                this.errorText = errorObj.error
                this.errorClass = 'is-invalid'
            }

            return validationObj
        }
    },

    computed: {
        errorParams: function(){
            const errorObj = this.validate()

            return this.errorText
        },

        errorClass: function(){
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
        <div class="invalid-feedback" :class="errorClass">{{ errorParams }}</div>
</div>`
}