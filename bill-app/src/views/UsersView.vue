<template>
    <h1 class="my-5">Liste des Clients</h1>
    <div>
        <BButton iconLeft="circle-plus" :to="{ name: 'user', params: { id:-1 }}" iconMsg="Nouveau Client"></BButton>
    </div>
    <div>
        <UserList>
            <UserCel v-for="(user, index) in users" :key="index" :item="user" @onDeleteUser="deleteUser($event)" @onEditUser="editUser($event)"></UserCel>
        </UserList>
    </div>
</template>

<script>

import UserList from '@/components/UserList.vue'
import UserCel from '@/components/UserCel.vue'
import { useUserStore } from '@/stores/user.js'
import { mapActions, mapState } from 'pinia'

    export default {
        data(){
            return{}
        },
        components: {
            UserList,
            UserCel
        },
        methods: {
            ...mapActions(useUserStore, ['getAllUsers', 'getUser', 'deleteUser', 'saveUser']),

            editUser(id){
                console.log('edit with id', id);
                this.$router.push({
                    name: 'user',
                    params:{
                        id
                    }
                })
            }
        },
        computed: {
            ...mapState(useUserStore, ['users'])
        },
        mounted(){
            this.getAllUsers()
        }
    }
</script>

<style lang="scss" scoped>

</style>