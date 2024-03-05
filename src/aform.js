import Helper from './helper.js'
import Alerts from './alerts.js'
import Validation from './validation.js'
import Validate from './validate.js'

export default {
    components: {
        Alerts, Validate
    },

    props: ['apipath'],

    data() {
        return {
            formActions: '',
            formData: {},
            formNames: {},
            formSelects: {},
            formTypes: {},
            formButtons: {},
            formPassword: { // if form have pasword field hack
                'password': '',
                'repeatPassword': '',
            },
            formValidators: {},
            activeAlert: {},
        }
    },

    methods: {
        load() {
            console.log('Aform mounted - apipath: ' + this.apipath)
            axios.get(this.apipath, {})
                .then(response => {
                    if (response.data !== undefined && response.data.success === true) {

                        const realData = response.data.data;

                        console.log('Aform response: ');
                        console.log(realData);

                        this.formActions = realData.formActions;
                        this.formData = realData.formData;
                        this.formNames = realData.formNames;
                        this.formSelects = realData.formSelects;
                        this.formTypes = realData.formTypes;
                        this.formButtons = realData.formButtons;
                        this.formValidators = realData.formValidators;

                    } else {
                        throw new Error('Status error');
                    }
                })
                .catch(error => {
                    console.log(error);
            });
        },

        checkPassword() {
            if (this.formPassword['password'] !== '' && this.formPassword['password'].length < 8) {
                this.activeAlert = {
                    class: 'danger',
                    icon: 'key-fill',
                    message: 'Password is too short'
                }
                return false;
            }

            return true;
        },

        save() {
            console.log(this.formData);
        },

        password() {
            var bodyFormData = new FormData();
            bodyFormData.append('password', this.formPassword['password']);
            bodyFormData.append('repeatPassword', this.formPassword['repeatPassword']);

            axios({
                method: "post",
                url: this.formActions['password'],
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(response => {
                if (response.data.success === true) {
                    this.activeAlert = {
                        'status': 'ok',
                        'message': response.data.data.message,
                        'class': 'success',
                        'icon': 'check-circle-fill',
                    };
                } else {
                    this.activeAlert = {
                        'status': 'error',
                        'message': response.data.message,
                        'class': 'warning',
                        'icon': 'exclamation-triangle-fill',
                    };
                }
            }).catch(error => {
                console.log(error);
                let errorMessage = error.message;

                if (error.response !== undefined && error.response.data.data !== undefined && error.response.data.data.message !== undefined) {
                    errorMessage = error.response.data.data.message;
                }

                this.activeAlert = {
                    'status': 'error',
                    'message': errorMessage,
                    'class': 'danger',
                    'icon': 'sign-stop-fill',
                };
            });
        },
    },

    computed: {
        disabledPassword() {
            if (this.formPassword['password'] === '' || this.formPassword['repeatPassword'] === '' || this.formPassword['password'] !== this.formPassword['repeatPassword']) {
                return 'disabled';
            } else {
                return this.checkPassword() ? '' : 'disabled';
            }
        }
    },

    mounted() {
        this.load();
    },

    template: `<div>
      <Alerts :alert="activeAlert"></Alerts>
      <div class="row p-1 align-items-center" v-for="(value, name) in this.formData">
        <div class="col-md-2">
          <label :for="name">{{ formNames[name] }}</label>
        </div>
        <div class="col-md-10">
          <Validate v-slot="{ errorClass }" :rule="$getValidationRuleFromString(formValidators[name] ?? 'empty')" :value="formData[name]" :func="$globalValidation">
            <span class="fw-bold" v-if="formTypes[name] === 'label'">{{ value }}</span>
            <input v-if="formTypes[name] === undefined || formTypes[name] === 'input'" type="text" class="form-control" v-model="formData[name]">
            <select v-if="formTypes[name] === 'select'" class="form-control" v-model="formData[name]">
              <option v-for="(optionValue, option) in formSelects[name]" :value="option">{{ optionValue }}</option>
            </select>
            <input type="checkbox" v-if="formTypes[name] === 'checkbox'" v-model="formData[name]"></input>
            <div v-if="formTypes[name] === 'password'" class="row">
              <div class="col-md-5"><input type="password" class="form-control" v-model="formPassword['password']"></div>
              <div class="col-md-5"><input type="password" class="form-control" v-model="formPassword['repeatPassword']"></div>
              <div class="col-md-2"><button class="btn btn-primary" :class="disabledPassword" @click="password">{{ formButtons['password'] }}</button></div>
            </div>
            <div v-if="formTypes[name] === 'avatar'">
              TODO avatar change
            </div>
            <div v-if="formTypes[name] === 'jsonKeyValue'">
              TODO jsonKeyValue change
            </div>
          </Validate>
        </div>
      </div>
      <div class="col-md-12 mb-4">
        <button class="btn btn-primary mt-3 ms-1" @click="save">{{ formButtons['save'] }}</button>
        <button class="btn btn-warning mt-3 ms-1" @click="load">{{ formButtons['load'] }}</button>
      </div>
</div>`
}