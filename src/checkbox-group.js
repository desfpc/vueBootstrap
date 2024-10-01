export default {

    props: ['value', 'dataArray', 'callback', 'dataKey'],

    data() {
        return {
            newValue: this.value,
            buffer: ''
        }
    },

    methods: {
        checkCheck(cValue) {
            return this.newValue.includes(cValue);
        },
        checkChange(cValue) {
            console.log('CheckboxGroup value:');
            console.log(this.value);
            console.log('dataArray: ');
            console.log(this.dataArray);

            console.log('Start newValue:');
            console.log(this.newValue);

            //newValue = json decode thios.value
            try {
                this.newValue = JSON.parse(this.value);
            } catch (e) {
                //this.newValue = [];
            }
            //this.newValue = JSON.parse(this.value);
            console.log('CheckboxGroup check: ' + cValue);

            if (this.newValue.includes(cValue)) {
                console.log('inArray');
                //remove from array where value is cValue
                this.newValue = this.newValue.filter(function(value, index, arr) {
                    return value != cValue;
                });
            } else {
                console.log('not inArray');
                //add to array
                this.newValue.push(cValue);
            }

            console.log('newValue:');
            console.log(this.newValue);
        },
    },

    watch: {
        /*newValue: function() {
            console.log(this.dataKey + ' startValue:');
            console.log(this.value)
            //if in string newValue is 'del' then remove it from buffer
            //let delString = this.newValue.replace('!del', '');
            //this.buffer = this.buffer.replace('_' + delString, '');
            //if (!this.newValue.includes('del')) {
            //    this.buffer = this.buffer + '_' + this.newValue;
            //}

            console.log('CheckboxGroup dataKey: ' + this.dataKey);
            this.callback(this.newValue, this.dataKey + ':' + this.newValue + ':' + this.buffer);
        }*/
    },

    template: `<div class="form-check" v-for="(val, key, index) in dataArray">
      <input class="form-check-input" type="checkbox" :checked="checkCheck(val.value)" @change="checkChange(val.value)">
      <label class="form-check-label" :for="dataKey + ':' + val.value">
        {{ val.text }}
      </label>
    </div>`
}