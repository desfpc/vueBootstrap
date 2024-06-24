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

    template: `<div class="row" v-for="(val, key, index) in dataArray">
      <div class="col-2"><input type="checkbox" :value="val.value" v-model="newValue"></div>
      <div class="col-10">{{ val.text }} - {{ index }}</div>
    </div>`
}