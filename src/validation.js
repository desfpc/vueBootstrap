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

      return validationObj
    }
  },

  computed: {
    errorParams: function(){
      const errorObj = this.validate()
      this.errorText = errorObj.error
      if (errorObj.valid) {
        this.errorClass = 'is-valid'
      } else {
        this.errorClass = 'is-invalid'
      }
      return this.errorText
    }
  },

  mounted() {
    console.log(`Validation vue component is mounted!`)
    this.id = crypto.randomUUID()
  },
  template: `<div class="validationInput">
        <slot :errorClass="errorClass"></slot>
        <div v-if="errorClass === 'is-invalid'" class="invalid-feedback">{{ errorParams }}</div>
</div>`
}