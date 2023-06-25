# vueBootstrap
Vue js bootstrap 5 components

## validation.js
Component for vue 3 and bootstrap 5

Usage:
1) Install vue 3 and bootstrap 5
2) Download scripts from repository or install via composer and create symlink to vendor/desfpc/vuebootstrap in your js scripts folder
3) Add to your html page:
```html
import Validation from "/{patch to vuebootstrap dir}}/validation.js"
import App from './{your App scipt}.js'

const app = createApp(App)

app.component("Validation", Validation)
app.mount("#app")
```

OR

```html
const { createApp } = Vue
const app = createApp({
    data() { ... }
})

app.component("Validation", "/{patch to vuebootstrap dir}}/validation.js")
app.mount('#app')
```
4) In App example:
```html
<validation v-slot="slotProps" :globalValidation="globalValidation" :validationRule="validationRulez.positiveInteger" :value="buildTime">
    <input type="number" class="form-control" :class="slotProps.errorClass" v-model="buildTime" aria-required="true">
</validation>
```
Where:
- globalValidation - global validation function
- validationRule - validation function for this field
- value - value for validation
- slotProps.errorClass - param from Validation component for error class

Example of validation methods and params in App:
```html
export default {
    data() {
        return {
            buildTime: 0,
            validationArr: {},
            validationRulez: {
                positiveInteger: {
                    validate(val) {
                        let intVal = parseInt(val)

                        if (isNaN(intVal)) {
                            return {valid: false, error: 'Not a integer number'}
                        }

                        if (intVal !== null && intVal >= 0) {
                            return {valid: true, error: ''}
                        } else {
                            return {valid: false, error: 'Not valid or not positive integer number'}
                        }
                    },
                },
            }
        }
    },

    methods: {
        globalValidation(id, value) {
        this.validationArr[id] = value
        },
    }
}
```

## validationRulez.js
Object with default validation rules.