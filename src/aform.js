import Helper from './helper.js'
import Alerts from './alerts.js'

export default {

    components: {
        Alerts
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

                    } else {
                        throw new Error('Status error');
                    }
                })
                .catch(error => {
                    console.log(error);
            });
        },

        save() {
            console.log(this.formData);
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
          <span class="fw-bold" v-if="formTypes[name] === 'label'">{{ value }}</span>
          <input v-if="formTypes[name] === undefined || formTypes[name] === 'input'" type="text" class="form-control" v-model="formData[name]">
          <select v-if="formTypes[name] === 'select'" class="form-control" v-model="formData[name]">
            <option v-for="(optionValue, option) in formSelects[name]" :value="option">{{ optionValue }}</option>
          </select>
          <input type="checkbox" v-if="formTypes[name] === 'checkbox'" v-model="formData[name]"></input>
          <div v-if="formTypes[name] === 'password'" class="row">
            <div class="col-md-6"><input type="password" class="form-control" v-model="formPassword['password']"></div>
            <div class="col-md-6"><input type="password" class="form-control" v-model="formPassword['repeatPassword']"></div>
          </div>
          <div v-if="formTypes[name] === 'avatar'">
            TODO avatar change
          </div>
          <div v-if="formTypes[name] === 'jsonKeyValue'">
            TODO jsonKeyValue change
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <button class="btn btn-primary mt-3 ms-1" @click="save">{{ formButtons['save'] }}</button>
        <button class="btn btn-warning mt-3 ms-1" @click="load">{{ formButtons['load'] }}</button>
      </div>
</div>`
}