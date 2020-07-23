<template>
    <div class="chatView">
        <div class="users">
            <div 
                class="user"
                :class="user.id === id ? 'userActive':''"
                v-for="user in users"
                :key="user.id"
            >
                <div class="avatar">
                    <img :src="user.avatar" alt="">
                </div>
                <div class="name">
                    <strong>{{user.name}}</strong>
                </div>
            </div>
        </div>
        <div class="rightMessages">
            <div class="messages" ref="chatWindow">
                <div                     
                    v-for="(m, index) in massages"
                    :key="index"
                    :class="m.creator === id ? 'inMessage' : 'message'"
                >
                    <template v-if="m.creator === id">                        
                        <div class="content">
                            <div>{{m.message}}</div>
                            <div class="author">
                                {{m.name}}
                            </div>
                        </div>
                        <div class="avatar">
                            <img :src="m.avatar" alt="">
                        </div>
                    </template>
                    <template v-else>
                        <div class="avatar">
                            <img :src="m.avatar" alt="">
                        </div>
                        <div class="content">
                            <div>{{m.message}}</div>
                            <div class="author">
                                {{m.name}}
                            </div>
                        </div>
                    </template>                    
                </div>
            </div>
            
            <div class="addMessage">
                <input type="text" v-model="message" @keyup.enter="addMessage">
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['id'],
    data(){
        return {
            message: null
        }
    },
    computed: {
        ...mapState({
            users: state => state.chat.users,
            massages: state => state.chat.messages,
        }),
        getUser(){
            return this.$store.getters.getUserById(this.id)
        }
    },
    methods: {
        addMessage(){
            if(this.message && this.message !== ''){
                const obj = {
                    creator: this.id,
                    avatar: this.getUser.avatar,
                    name: this.getUser.name,
                    message: String(this.message) 
                }
                this.$store.dispatch('addMessage', obj)
                this.message = null
            }
        }
    },
    updated(){
        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
    },
}
</script>

<style scoped>
    .chatView {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .users {
        width: 30%;
        background: #ecf4fd;
        height: 100%;
    }
    .userActive {
        background: #bbdafd;
    }
    .rightMessages {
         width: 70%;
    }
    .messages {
       height: calc(100% - 70px);
       overflow-y: auto;
    }
    .message, .inMessage {
        padding: 15px 15px 0 15px;
        display: flex;
    }
    .inMessage {  
        justify-content: flex-end;
    }
    .content {
       margin: 0 10px;
       padding: 15px;
       background: #ecf4fd; 
       border-radius: 10px;
    }
    .inMessage .content {
        background: #2e8bfd;
        color: #fff;
    }
    .user {
        display: flex;
        margin: 15px 0 0 0;
        padding: 5px 15px;
        align-items:center
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        overflow: hidden;
    }
    .avatar img {
        width: 100%;
        height: auto;
    }
    .name {
        padding: 10px;
    }
    .author {
        font-size: 11px;
        color: #999;
        padding: 5px 0 0 0;
        font-style: italic;
    }
    .inMessage .author {
        color: #c2ddff;
    }
    .addMessage {
        text-align: center;
        border-top: 1px #ccc solid;
        padding: 20px 0;
    }
    .addMessage input {
        width: 90%;
        border: 1px #ccc solid;
        border-radius: 10px;
        height: 30px;
        line-height: 30px;
        padding: 0 1%;
        background: #ecf4fd;
    }
    @media only screen and (max-device-width: 900px) {
       .name {display: none;}
       .users {
           width: 80px;
       }
    }
</style>