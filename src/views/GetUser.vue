<template>
    <div class="data-list">
        <div class="button-get-data">
            <md-button class="md-raised md-primary" @click="getUser">Get Edit User</md-button>
            <router-link to="/">
                <md-button class="md-raised md-primary">Home</md-button>
            </router-link>
        </div>
        <div class="list-wrapper" v-if="!isError">
            <md-table>
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-numeric>Name</md-table-head>
                        <md-table-head md-numeric>Email</md-table-head>
                        <md-table-head md-numeric>Address</md-table-head>
                        <md-table-head md-numeric>Gender</md-table-head>
                    </md-table-row>
                </md-table-header>
                <md-table-body>
                    <md-table-row>
                        <md-table-cell md-numeric>{{ user.name }}</md-table-cell>
                        <md-table-cell md-numeric>{{ user.email }}</md-table-cell>
                        <md-table-cell md-numeric>{{ user.address }}</md-table-cell>
                        <md-table-cell md-numeric>{{ user.gender }}</md-table-cell>
                    </md-table-row>
                </md-table-body>
            </md-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data: () => ({
            user: []
        }),
        async created() {
            let id = this.$route.params.id;
            let response = await axios.get('http://localhost:3000/api/records/' + id);
            this.user = response.data;
        },
    }
</script>

<style>
    .button-get-data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .label-user {
        color: green;
        font-size: 18pt;
    }
    .list-wrapper {
        width: 70%;
        max-height: 70vh;
        background-color: beige;
        overflow-y: scroll;
        margin: 10px auto;
    }
    .error-block {
        width: 20%;
    }
    .error-view {
        text-align: center;
    }
</style>