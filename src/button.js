export default {

    props: ['url', 'target', 'aclass', 'icon', 'action', 'callback', 'confirm'],

    methods: {
        onClick() {

            if (this.confirm !== undefined && this.confirm !== '') {
                if (!confirm(this.confirm)) {
                    return;
                }
            }

            if (this.action === 'ajax') {
                axios.post(this.url).then(response => {
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

                    if (error.response !== undefined && error.response.data.data.message !== undefined) {
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
    },

    template: `<button @click="onClick()" :target="target" :class="aclass">
            <i v-if="icon" :class="'bi-' + icon"></i>
            <slot></slot>
        </button>`
}