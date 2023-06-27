# vueBootstrap
Vue js bootstrap 5 components

## Validation
Component and plugin for vue 3 and bootstrap 5 validation

### Usage
1) Copy *.js files to your project (in example to /js/vuebootstrap/ folder)
2) Main Vue app file:
```html
const { createApp } = Vue
import App from '/js/app.js'
import Validation from '/js/vuebootstrap/validation.js'
import Validate from '/js/vuebootstrap/validate.js'

const app = createApp(App)

app.use(Validation, {});
app.component("Validate", Validate);

app.mount("#app");
```
3) In your App add validation to any form element:
```html
<Validate v-slot="{ errorClass }" :rule="$validationRules.string" :value="user.name" :func="$globalValidation">
    <input type="text" class="form-control" :class="errorClass" id="name" v-model="user.name">
</Validate>
```
Where you can change:
- $validationRules.string - rule for validation (See all rules in validation.js)
- <input... - any form element
- <input :class="errorClass" - validated class for input