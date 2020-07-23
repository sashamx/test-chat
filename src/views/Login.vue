<template>
    <div class="wrap" @keyup.enter="sendLogin">
        <div class="header">
            Вход в чат
        </div>
        <div v-if="error" class="error">
            {{error}}
        </div>
        <div class="content">
            <div><input type="text" v-model="link" placeholder="Ссылка на автарку"></div>
            <div><input type="text" v-model="name" placeholder="Ваш Ник"></div>
        </div>
        <div class="acions">
            <button @click="sendLogin">Войти</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            error: null,
            link: null,
            name: null
        }
    },
    computed: {
        ...mapState({
            users: state => state.chat.users,
        }),
    },
    methods: {
        sendLogin(){
            this.error = null
            if(this.validateUrl(this.link) && this.name){
                const user = {
                    id: this.users.length,
                    avatar: String(this.link),
                    name: String(this.name)
                }
                this.$store.dispatch('addUser', user)
                this.$router.push('/chat')
            } else if (!this.validateUrl(this.link)) {
                this.error = 'Введите корректный линк'
            } else {
                this.error = 'Введите ник'
            }         
        },
        validateUrl(url) {
            return /^[a-z]+:\/\//i.test(url);
        }
    }
}
</script>

<style scoped>
    .wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -130px;
        width: 300px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #999;
        overflow: hidden;
    }
    .header {
        font-size: 18px;
        padding: 15px;
        text-align: center;
        background: #333;
        color: #fff;
    }
    .content, .acions {padding: 10px 15px;}
    .content div {padding: 10px 0;}
    .content div input {
        display: block;
        width: 250px;
        padding: 10px;
        border: 1px #ccc solid;
        border-radius: 5px;
        background: #f5f6fa;
    }
    .acions {
        background: #f5f6fa;
        text-align: center;
    }
    .acions button {
        padding: 10px 30px;
        background: #307bd7;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }
    .error {
        background: red;
        color: #fff;
        text-align: center;
        padding: 15px 0;
    }
</style>