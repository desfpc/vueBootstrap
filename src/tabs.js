export default {

    props: ['tabsjson', 'startactivetab'],

    data() {
        return {
            activeTab: '',
            tabs: [],
        }
    },

    methods: {
        selectTab(tabName) {
            this.activeTab = tabName
        },

        getTabClass(tabName) {
            return this.activeTab === tabName ? 'active' : ''
        },
    },

    mounted() {
        this.tabs =  JSON.parse(this.tabsjson)
        this.activeTab = this.startactivetab
    },

    template: `<div>
        <ul class="nav nav-tabs">
            <li class="nav-item" v-for="tab in tabs">
                <a class="tab-link nav-link" :class="getTabClass(tab.id)" href="#" @click="selectTab(tab.id)">{{ tab.name }}</a>
            </li>
        </ul>
        <template v-for="tab in tabs">
            <div v-if="this.activeTab === tab.id" class="tab-body"><slot :name="tab.id"></slot></div>
        </template>
    </div>`
}