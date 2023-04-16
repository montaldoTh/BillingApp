import { defineStore } from "pinia";
import userInterface from "../interface/userInterface";
import cloneDeep from "lodash.clonedeep";
import axios from "axios";

const useUserStore = defineStore('user', {
    state: ()=>({
        user: null,
        users: []
    }),
    actions: {
        async getAllUsers(){
            try {
                const response = await axios.get('/users')
                this.$patch({ users: cloneDeep(response.data) })
            } catch (error) {
                console.log(error);
            }
        },
        async getLimitedUsers(){
            try {
                const response = await axios.get(`/users/limited/` + 5)
                this.$reset()
                this.$patch({ users: cloneDeep(response.data) })
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getUser(id){
            try {
                const response = await axios.get(`/users/${id}`)
                this.$patch({ user: cloneDeep(response.data) })
            } catch (error) {
                console.log(error);
                
            }
        },
        createUser(){
            this.$patch({ user: cloneDeep(userInterface)})
        },
        async deleteUser(id){
            try {
                const response = await axios.delete(`/users/${id}`)
                console.log(response.data);
                this.getAllUsers()
            } catch (error) {
                console.log(error);
                
            }
        },
        async saveUser(user){
            if(user._id){
                try {
                    const response = await axios.patch(`/users/${user._id}`, user)
                    console.log(response.data);
                    this.$reset()
                } catch (error) {
                    console.log(error);
                }
            }else{
                try {
                    const response = await axios.post('/users', user)
                    console.log(response.data);
                    this.$reset()
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
})

export { useUserStore }