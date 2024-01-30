export default {

    props: ['url', 'target', 'aclass', 'icon'],
    
    template: `<a :href="url" :target="target" :class="aclass">
            <i v-if="icon" :class="'bi-' + icon"></i>
            <slot></slot>
        </a>`
}