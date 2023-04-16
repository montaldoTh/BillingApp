<template>
    <tr>
        <td v-if="cellNumber > 5"><span class="text-primary fst-italic">{{ item.date }}</span> - {{ item.description }} / {{ item.billnum }} <span class="text-primary fw-bold">{{ item.itemnum }}</span></td>

        <td v-else><span class="text-primary fst-italic">{{ item.date }} n°{{ item.billnum }}</span></td>

        <td>{{ item.client.firstName }} {{ item.client.lastName }}</td>
        <td class="fst-italic text-primary">{{ item.client.companyName }}</td>
        <td class="text-primary">{{ item.totalHT }}</td>
        <td class="fw-bold text-primary">{{ item.totalTTC - item.paid }} € TTC</td>
        <td class="d-flex ">
            <BButton btnVariant="outline-danger" iconLeft="trash" iconMsg="Supprimer" @click="$event => onDeleteBill()" />
            <BButton btnVariant="outline-info" iconLeft="pen" iconMsg="Editer" @click="$event => onEditBill()" />
        </td>
    </tr>
</template>

<script>
    export default {
        props: [
            'item',
            'cellNumber'
        ],
        methods: {
            onDeleteBill(){
                this.$emit('onDeleteBill', this.item._id)
            },
            onEditBill(){
                this.$emit('onEditBill', this.item._id)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>