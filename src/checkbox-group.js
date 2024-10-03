export default {

    props: ['value', 'dataArray', 'callback', 'dataKey'],

    data() {
        return {
            newValue: null
        }
    },

    methods: {
        checkCheck(cValue) {
            if (this.newValue == null) {
                return false;
            }

            return this.newValue.includes(cValue);
        },
        checkChange(cValue) {
            if (this.newValue.includes(cValue)) {
                this.newValue = this.newValue.filter(function(value, index, arr) {
                    return value != cValue;
                });
            } else {
                this.newValue.push(cValue);
            }
            this.callback(this.dataKey, JSON.stringify(this.newValue));
        },
    },

    mounted() {
        try {
            this.newValue = JSON.parse(this.value);
        } catch (e) {
            this.newValue = {};
        }
    },

    template: `<div class="form-check" v-for="(val, key, index) in dataArray">
      <input class="form-check-input" type="checkbox" :checked="checkCheck(val.value)" @change="checkChange(val.value)">
      <label class="form-check-label" :for="dataKey + ':' + val.value">
        {{ val.text }}
      </label>
    </div>`
}