
        Vue.component('demo-grid', {
            template: '#grid-template',
            props: {
                data: Array,
                columns: Array,
                filterKey: String
            },
            data: function () {
                var sortOrders = {}
                this.columns.forEach(function (key) {
                    sortOrders[key] = 1
                })
                return {
                    sortKey: '',
                    sortOrders: sortOrders
                }
            },
            computed: {
                filteredData: function () {
                    var sortKey = this.sortKey
                    var filterKey = this.filterKey && this.filterKey.toLowerCase()
                    var order = this.sortOrders[sortKey] || 1
                    var data = this.data
                    if (filterKey) {
                        data = data.filter(function (row) {
                            return Object.keys(row).some(function (key) {
                                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                            })
                        })
                    }
                    if (sortKey) {
                        data = data.slice().sort(function (a, b) {
                            a = a[sortKey]
                            b = b[sortKey]
                            return (a === b ? 0 : a > b ? 1 : -1) * order
                        })
                    }
                    return data
                }
            },
            filters: {
                capitalize: function (str) {
                    return str.charAt(0).toUpperCase() + str.slice(1)
                }
            },
            methods: {
                sortBy: function (key) {
                    this.sortKey = key
                    this.sortOrders[key] = this.sortOrders[key] * -1
                }
            }
        });

    var app = new Vue({
        el: '#app',
        data: {
            greeting: 'vue-all-in-one playground!',
            docsURL: 'http://vuejs.org/guide/',
            discordURL: 'https://chat.vuejs.org',
            forumURL: 'http://forum.vuejs.org/'
        },
        methods: {
            humanizeURL: function (url) {
                return url
                    .replace(/^https?:\/\//, '')
                    .replace(/\/$/, '')
            }
        }
    });

    var demo = new Vue({
        el: '#demo',
        data: {
            searchQuery: '',
            gridColumns: ['name', 'company', 'power'],
            gridData: [
                {name: 'Chuck Norris', company: 'Chucky Company', power: Infinity},
                {name: 'Bruce Lee', company: 'Lee Incorporated', power: 9000},
                {name: 'Jackie Chan', company: 'Chans Pizza Hut', power: 7000},
                {name: 'Jet Li', company: 'Li and Friends', power: 8000}
            ]
        }
    });