export default {

    props: ['url', 'target', 'aclass', 'icon', 'action', 'callback'],

    methods: {
        onClick() {
            if (this.action === 'ajax') {
                axios.post(this.url).then(response => {
                    if (response.data.status === 'ok') {
                        this.callback({
                            'status': 'ok',
                            'message': 'ok',
                            'class': 'success',
                            'icon': 'check',
                        });
                    } else {
                        this.callback({
                            'status': 'error',
                            'message': response.data.message,
                            'class': 'warning',
                            'icon': 'exclamation-triangle',
                        });
                    }
                }).catch(error => {
                    this.callback({
                        'status': 'error',
                        'message': error.message,
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