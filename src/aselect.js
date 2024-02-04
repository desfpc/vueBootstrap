export default {

    props: ['url', 'value', 'callback', 'property', 'variants'],

    data() {
        return {
            realValue: this.value,
        }
    },

    methods: {
        onChange() {
            console.log('onChange: ' + this.realValue);

            var bodyFormData = new FormData();
            bodyFormData.append('property', this.property);
            bodyFormData.append('value', this.realValue);

            axios({
                method: "post",
                url: this.url,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then(response => {
                if (response.data.success === true) {
                    this.callback({
                        'status': 'ok',
                        'message': response.data.data.message,
                        'class': 'success',
                        'icon': 'check-circle-fill',
                    });
                } else {
                    this.callback({
                        'status': 'error',
                        'message': response.data.message,
                        'class': 'warning',
                        'icon': 'exclamation-triangle-fill',
                    });
                }
            }).catch(error => {

                console.log('step1');
                console.log(error);
                let errorMessage = error.message;

                if (error.response !== undefined && error.response.data.data !== undefined && error.response.data.data.message !== undefined) {
                    console.log('step2');
                    errorMessage = error.response.data.data.message;
                }

                console.log('step3');
                this.callback({
                    'status': 'error',
                    'message': errorMessage,
                    'class': 'danger',
                    'icon': 'sign-stop-fill',
                });
            });
        }
    },

    template: `<select v-model="realValue" class="form-control" @change="onChange">
        <option v-for="(value, key, index) in variants" :value="key">{{ value }}</option>
    </select>`
}