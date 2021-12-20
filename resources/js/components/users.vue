<template>

    <sw-page :showSearchBar="false" :showSmartBar="false">
        <template #content>
            <sw-data-grid
                full-page
                :dataSource="users"
                :is-loading="isLoading"
                :columns="columns">

                <template #pagination>
                    <sw-pagination
                        :page="page"
                        :limit="limit"
                        :total="total"
                        @page-change="paginate"
                    >

                    </sw-pagination>
                </template>
            </sw-data-grid>
        </template>

        <template #sidebar>
            <sw-sidebar>
                <sw-sidebar-item
                    icon="default-arrow-360-left"
                    title="Boostday"
                    @click="getListUsers()"
                >

                </sw-sidebar-item>
            </sw-sidebar>
        </template>
    </sw-page>
</template>

<script>
export default {
    data: () => ({
        users: [],
        isLoading: false,
        page: 1,
        limit: 25,
        total: 0,
    }),

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: this.$tc('listing.name')
                },
                {
                    property: "email",
                    label: this.$tc('listing.email')
                }
            ]
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            window.parent.postMessage('sw-app-loaded', '*');
            this.getListUsers();
        },

        async getListUsers() {
            const params = {
                page: this.page,
                limit: this.limit,
                ...this.$route.query
            }
            this.isLoading = true;
            const url = 'http://boostday.test/api/users';
            const response = await this.axios.get(url, {params: params});

            this.users = response.data.data
            this.total = response.data.total
            this.page = response.data.current_page
            this.isLoading = false;
        },

        paginate({ page = 1, limit = 25}) {
            this.page = page;
            this.limit = limit;

            this.getListUsers();
        }
    }
}
</script>
