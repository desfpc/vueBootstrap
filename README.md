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
4) Check your form for valid in your App:
```html
if (this.$checkValidation()) {
    // Form is valid
} else {
    // Form is invalid
}
```

## Tabs
Component for vue 3 and bootstrap 5 tabs

### Usage
1) Copy *.js files to your project (in example to /js/vuebootstrap/ folder)
2) Main Vue app file:
```html
const { createApp } = Vue
import App from '/js/vendor/authorize/profile.js'
import Tabs from '/js/vuebootstrap/tabs.js'

const app = createApp(App)

app.component("Tabs", Tabs);

app.mount("#app");
```
3) In your App add tabs element:
```html
<Tabs tabsjson='[{"name": "Test_Tab1", "id": "test_tab_1"},
 {"name": "Test_Tab2", "id": "test_tab_2"}]' startactivetab="test_tab_1">
    <template v-slot:test_tab_1>
        test tab 1 body
    </template>
    <template v-slot:test_tab_2>
        test tab 2 body
    </template>
</Tabs>
```
Where:
- tabsjson - json array with tabs names and ids
- startactivetab - id of tab which will be active after page load
- `<template v-slot:test_tab_1>` - body of tab with id "test_tab_1"

## Active Table
Component for vue 3 and bootstrap 5 table with ordering, pagination and filters

## Link

## Button

## AInput

## ASelect

## Alert

## Helper