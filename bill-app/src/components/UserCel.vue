<template>
    <tr>
        <td class="fst-italic text-primary">{{ item.firstName }} {{ item.lastName }}</td>
        <td class="fw-bold">{{ item.enterprise }}</td>
        <td>{{ item.regDate }}</td>
        <td class="d-flex">
            <BButton btnVariant="outline-danger" iconLeft="trash" iconMsg="Supprimer" @click="onDeleteUser()" />
            <BButton btnVariant="outline-info" iconLeft="pen" iconMsg="Editer" @click="onEditUser()"/>
        </td>
    </tr>
</template>

<script>
    export default {
        props:[
            'item'
        ],
        methods: {
            onDeleteUser(){
                this.$emit('onDeleteUser', this.item._id)
            },
            onEditUser(){
                this.$emit('onEditUser', this.item._id)
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>