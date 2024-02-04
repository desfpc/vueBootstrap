import Link from './link.js'
import Button from './button.js'
import Ainput from './ainput.js'
import Aselect from './aselect.js'
import Helper from './helper.js'
import Alerts from './alerts.js'

export default {

    components: {
        Link, Button, Alerts, Ainput, Aselect
    },

    props: ['apipath'],

    data() {
        return {
            cols: [],
            rows: [],
            filters: [],
            order: {},
            page: 1,
            nextPage: null,
            limit: 20,
            selectedPage: 1,
            helper: Helper,
            activeAlert: {},
        }
    },

    methods: {
        load(page = 1) {
            axios.get(this.apipath, {
                params: {
                    filters: JSON.stringify(this.filters),
                    order: JSON.stringify(this.order),
                    page: page,
                    limit: this.limit,
                }
            }).then(response => {
                const responseData = response.data.data;
                this.filters = responseData.filters;
                this.cols = responseData.cols;
                this.rows = responseData.rows;
                this.nextPage = responseData.nextPage;
                this.page = page;
                this.limit = responseData.limit;
                this.order = responseData.order;
            }).catch(error => {
                console.log(error);
            });
        },

        getOrderClass(colId)
        {
            let sortClass = 'atable-order';
            if (this.order.col === colId) {
                sortClass += ' ' + this.order.order;
            }
            return sortClass;
        },

        orderClick(colId)
        {
            if (this.order.col === colId) {
                if (this.order.order === 'DESC') {
                    this.order.order = 'ASC';
                } else {
                    this.order.order = 'DESC';
                }
            } else {
                this.order.col = colId;
                this.order.order = 'DESC';
            }

            this.load(1);
        },

        pageClick(page)
        {
            this.selectedPage = page;
            this.load(page);
        },

        buttonCallback(response)
        {
            this.activeAlert = response;
            
            if (response.status === 'ok') {
                this.load(this.page);
            }
        },

        inputCallback(response)
        {
            this.activeAlert = response;
        },
    },

    computed: {
        filtersExist() {
            return Object.keys(this.filters).length > 0;
        }
    },

    watch: {
        selectedPage: function(val) {
            if (val !== this.page && val > 0) {
                this.page = val;
                this.load(val);
            } else {
                this.selectedPage = this.page;
            }
        },
    },

    mounted() {
        this.load();
    },

    template: `<div>
    <Alerts :alert="activeAlert"></Alerts>
    <div v-if="filtersExist" class="d-flex justify-content-start flex-nowrap">
        <div class="form-group p-2 d-flex" v-for="filter in filters">
            <label class="p-1" :for="'filter_' + filter.id">{{ filter.name }}:</label>
            <input @change="load(1)" v-if="filter.type === 'string'" type="text" v-model="filter.value" class="form-control p-1" :id="'filter_' + filter.id" />
            <select @change="load(1)" v-if="filter.type === 'select'" v-model="filter.value" class="form-control p-1" :id="'filter_' + filter.id">
                <option v-for="option in filter.array" :value="option.value">{{ option.name }}</option>
            </select>
        </div>
    </div>
    <table class="table table-light table-bordered table-hover">
        <thead class="table-dark">   
            <tr>
                <th v-for="col in cols">{{ col.name }}<span @click="orderClick(col.id)" :class="getOrderClass(col.id)" v-if="col.ordered === true"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="col in cols">
                    <span v-if="col.editable === true">
                        <Ainput v-if="col.inputType === 'input'" :url="helper.$parseUrl(col.editUrl, row)" :value="row[col.id]"
                        :property="col.id" :callback="inputCallback"></Ainput>
                        <Aselect v-if="col.inputType === 'select'" :url="helper.$parseUrl(col.editUrl, row)" :value="row[col.id]"
                        :property="col.id" :callback="inputCallback" :variants="col.selectArray"></Aselect>
                    </span>
                    <span v-else>
                        <Link v-if="col.action === 'link'" :url="helper.$parseUrl(col.actionUrl, row)" :target="col.target" :icon="col.icon" :aclass="col.class">
                            {{ row[col.id] }}
                        </Link>
                        <span v-else>{{ row[col.id] }}</span>
                        <span v-for="button in col.buttons">
                            <Link v-if="button.action === 'link'" :url="helper.$parseUrl(button.actionUrl, row)"
                            :aclass="button.class" :icon="button.icon">{{ button.name }}</Link>
                            <Button v-if="button.action !== 'link'" :callback="buttonCallback" :action="button.action"
                            :url="helper.$parseUrl(button.actionUrl, row)" :aclass="button.class" :icon="button.icon"
                            :confirm="button.confirm">{{ button.name }}</Button>
                        </span>
                    </span>
                </td>
            </tr>
        </tbody>
        <thead v-if="page > 1 || nextPage > page">
            <tr class="table-secondary">
                <th :colspan="cols.length">
                  <div class="row">
                    <div class="col-2">
                      <nav aria-label="Page navigation">
                        <ul class="pagination pagination-sm">
                          <li v-if="page > 1" class="page-item">
                            <button @click="pageClick(page - 1)" class="page-link" href="#">{{ page - 1 }}</button>
                          </li>
                          <li class="page-item disabled">
                            <button class="page-link" href="#" tabindex="-1">{{ page }}</button>
                          </li>
                          <li v-if="nextPage !== null" class="page-item">
                            <button @click="pageClick(nextPage)" class="page-link" href="#">{{ nextPage }}</button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div class="col-3">
                      <div class="form-group row">
                        <label for="pageSelector" class="col-sm-2 col-form-label">Page</label>
                        <div class="col-sm-10">
                          <input v-model="selectedPage" type="text" class="form-control" id="pageSelector">
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
            </tr>
        </thead>
    </table>
</div>`
}