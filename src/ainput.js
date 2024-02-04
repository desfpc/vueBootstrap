export default {

    props: ['url', 'value', 'callback', 'property'],

    data() {
        return {
            realValue: this.value,
        }
    },

    methods: {
        onChange() {
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
                console.log(error);
                let errorMessage = error.message;

                if (error.response !== undefined && error.response.data.data !== undefined && error.response.data.data.message !== undefined) {
                    errorMessage = error.response.data.data.message;
                }

                this.callback({
                    'status': 'error',
                    'message': errorMessage,
                    'class': 'danger',
                    'icon': 'sign-stop-fill',
                });
            });
        }
    },

    template: `<input type="text" v-model="realValue" class="form-control" @change="onChange"></input>`
}