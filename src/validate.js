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
        validate(){
            if (this.rule !== undefined) {
                const validationObj = this.rule.validate(this.value)
                this.func(this.id, validationObj.valid)

                if (validationObj.valid) {
                    this.errorText = validationObj.error
                    this.errorClass = 'is-valid'
                } else {
                    this.errorText = validationObj.error
                    this.errorClass = 'is-invalid'
                }

                return validationObj
            } else {
                console.log('Validation rule is undefined')
            }
        }
    },

    computed: {
        errorParams: function(){
            const errorObj = this.validate()

            return this.errorText
        },

        errorTextClass: function(){
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