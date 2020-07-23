import store from '../store'
export default function(to, from, next) {
    if(store.getters.isUser) {
        next()
    } else {
        next('/')
    }

}