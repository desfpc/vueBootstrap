export default {

    props: ['value', 'dataArray', 'callback', 'dataKey'],

    data() {
        return {
            newValue: this.value,
        }
    },

    watch: {
        newValue: function() {
            console.log('CheckboxGroup newValue: ' + this.newValue);
            console.log('CheckboxGroup dataKey: ' + this.dataKey);
            this.callback(this.newValue, this.dataKey);
        }
    },

    template: `<div class="form-check" v-for="(val, key, index) in dataArray">
      <input class="form-check-input" type="checkbox" :value="val.value" v-model="newValue" :id="dataKey + ':' + val.value">
      <label class="form-check-label" :for="dataKey + ':' + val.value">
        {{ val.text }}
      </label>
    </div>`
}