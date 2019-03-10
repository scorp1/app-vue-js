<template>
    <div class="home">
        <md-card id="card-home">
            <form @submit.prevent="update" id="main-form" novalidate="true">

                <md-input-container class="form-control">
                    <label>Name</label>
                    <md-input v-model="name" id="name" type="text"/>
                </md-input-container>

                <md-input-container class="form-control">
                    <label>Email</label>
                    <md-input v-model="email" id="email" type="email"/>
                </md-input-container>

                <md-input-container class="form-control">
                    <label>Address</label>
                    <md-input v-model="address" id="address" type="text"/>
                </md-input-container>

                <div class="form-control">
                    <label>Gender</label>
                    <br/>
                    <md-radio v-model="gender" id="male" md-value="male" class="md-primary">Male</md-radio>
                    <md-radio v-model="gender" id="female" md-value="female" class="md-primary">Female</md-radio>
                </div>

                <div class="error-block" v-if="errors.length">
                    <md-card class="md-warn">
                        <h3>Correct the errors</h3>
                        <md-card-content>
                            <ul>
                                <li class="error-view" v-for="error in errors">{{ error }}</li>
                            </ul>
                        </md-card-content>
                    </md-card>
                </div>

                <div class="send-wrapper">
                    <md-button type="submit" class="md-raised md-primary" id="send">Update</md-button>
                </div>

            </form>
        </md-card>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'home',
        data: function() {
            return {
                errors: [],
                name: '',
                email: '',
                address: '',
                gender: '',
            }
        },
        async created() {
            let id = this.$route.params.id;
            let response = await axios.get('http://localhost:3000/api/records/' + id);
            this.name = response.data.name;
            this.email = response.data.email;
            this.address = response.data.address;
            this.gender = response.data.gender;
        },
        methods: {
            async update(){
                let id = this.$route.params.id;
                console.log(this.validEmail(this.mail));
                if (this.name && this.validEmail(this.email) && this.address) {
                    let response = await axios.put('http://localhost:3000/api/records/' + id, {name: this.name, email: this.email, address: this.address, gender: this.gender});
                    if (response.status === 200) {
                        this.$router.push({ name: 'thanks', params: { id: 'updated'} });
                    }
                    console.log(response.status);
                } else {
                    this.errors = [];
                    if (!this.name) {
                        this.errors.push('Enter your name');
                    }
                    if (!this.email) {
                        this.errors.push('Enter your email');
                    } else if (!this.validEmail(this.email)) {
                        this.errors.push('Enter correct email')
                    }
                    if (!this.address) {
                        this.errors.push('Enter your address');
                    }
                }
            },
            validEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }
</script>
<style>
    .form-control:nth-child(4) {
        padding-left: 0;
    }
    .form-control:nth-child(4) > label {
        font-size: 17px;
        color: rgba(0, 0, 0, 0.6)
    }
    .send-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    #send {
        margin-top: 5px;
        margin-bottom: 10px;
    }
    #main-form {
        padding: 5px;
    }
    .home {
        width: 30px;
        min-width: 250px;
        opacity: 0;
        position: absolute;
        left: 50%;
        top: -100%;
        transform: translate(-50%);
        animation-name: home;
        animation-duration: .5s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }
    @keyframes home {
        from {
            opacity: 0;
            top: -100%
        }
        to {
            opacity: 1;
            top: 16%
        }
    }
    #card-home {
        background-color: rgba(255, 255, 255, 0.6);
    }
    .error-block {
        width: 100%;
    }
    .error-view {
        text-align: center;
    }

</style>
