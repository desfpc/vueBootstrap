export default {

    props: ['apipath'],

    data() {
        return {
            cols: [],
            rows: [],
            filters: [],
            activeFilters: [],
            order: {},
            page: 1,
            nextPage: null,
            limit: 20,
        }
    },

    methods: {
        load(page = 1) {

            console.log('atable.js: load(1); apipath = ' + this.apipath);

            axios.get(this.apipath, {
                params: {
                    filters: this.activeFilters,
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

            console.log('fuck!');
        },

        getRowColumnValue(row, col)
        {
            if (row.hasOwnProperty(col.id)) {
                return row[col.id];
            } else {
                return '';
            }
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
        }
    },

    mounted() {
        this.load();
    },

    template: `<table class="table table-dark table-hover">
        <thead>
            <tr>
                <th v-for="col in cols">{{ col.name }}<span @click="orderClick(col.id)" :class="getOrderClass(col.id)" v-if="col.ordered === true"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="col in cols">{{ getRowColumnValue(row, col) }}</td>
            </tr>
        </tbody>
    </table>`
}