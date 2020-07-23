export default {
    state: {
        userId: null,
        users: [
            {
                id: 0,
                avatar: 'https://avatarfiles.alphacoders.com/243/243615.png',
                name: 'Иван Иванов'
            }
        ],
        messages: [
            {
                creator: 0,
                avatar: 'https://avatarfiles.alphacoders.com/243/243615.png',
                name: 'Иван Иванов',
                message: 'Привет'
            }
        ]      
    },
    mutations: {
        addUser(state, user){
            state.users.push(user)
            state.userId = user.id
        },
        addMessage(state, message){
            state.messages.push(message)
        }
    },
    actions: {
        addUser({commit}, user){
            commit('addUser', user)
        },
        addMessage({commit}, message){
            commit('addMessage', message)
        }
    },
    getters: {
        isUser(state){
            return state.userId !== null
        },
        getUserById: state => id => {
            return state.users.find(user => user.id === id);
        }
    }
}