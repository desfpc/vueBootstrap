export default {

    props: ['value', 'dataArray', 'callback'],

    data() {
        return {
            newValue: this.value,
        }
    },

    watch: {
        newValue: function() {
            this.callback(this.newValue)
        }
    },

    template: `<div class="row" v-for="(val, key, index) in dataArray">
      <div class="col-2"><input type="checkbox" :value="val.value" v-model="newValue"></div>
      <div class="col-10">{{ val.text }}</div>
    </div>`
}