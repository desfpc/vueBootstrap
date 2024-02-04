export default {

    props: ['alert'],

    data() {
        return {
            show: false,
            timer: false,
            icon: false,
        }
    },

    methods: {
        close: function () {
            this.show = false;
        }
    },

    watch: {
        alert: function () {
            this.show = true;

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.show = false;
            }, 5000);
        },
    },

    computed: {
        alertClass() {
            return 'alert-' + this.alert.class;
        },
        
        alertIcon() {
            return 'bi-' + this.alert.icon;
        }
    },

    template: `<div v-if="show" class="alert alert-dismissible m-2 fixed-top fade show" :class="alertClass" role="alert">
            <i :class="alertIcon"></i>
            {{ alert.message }}
            <button @click="close" type="button" class="btn-close" aria-label="Close"></button>
        </div>`
}