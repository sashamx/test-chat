<template>
    <div class="wrap">
        <div class="view">
            <a-chat :id="userId"></a-chat>
        </div>
        <div class="view">
            <a-chat :id="geIdtUser"></a-chat>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ViewChat from '../components/ViewChat'
export default {
    components: {
        AChat: ViewChat
    },
    computed: {
        ...mapState({
            users: state => state.chat.users,
            userId: state => state.chat.userId
        }),
        geIdtUser(){
            return this.$store.getters.getUserById(0).id
        }
    }
}
</script>

<style scoped>    
    .wrap {
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #999;
        height: 100vh;
        display: flex;
        overflow: hidden;
    }
    .view {
        width: 70%;
    }
    @media only screen and (max-device-width: 480px) {
        .wrap {
           flex-direction: column;
           overflow-y: auto;
        }
        .view {
            width: auto;
            height: 50%;
            border-bottom: 1px #ccc solid;
        }
    }    
</style>