<template>
    <h1 class="my-5">Liste des Factures</h1>
    <div>
        <BButton iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1}}" iconMsg="Nouvelle Facture"></BButton>
    </div>
    <div>
        <BillList>
            <BillCel v-for="(bill, index) in bills" :key="index" :item="bill" @onDeleteBill="$event => deleteBill($event)" @onEditBill=" $event => editBill($event)" />
        </BillList>
    </div>
</template>

<script>

import BillList from '../components/BillList.vue'
import BillCel from '../components/BillCel.vue'
import { useBillStore } from '../stores/bill.js'
import { mapActions, mapState } from 'pinia'


export default {
  data() {
    return {}
  },
  components: {
    BillList,
    BillCel,
  },
  methods: {
    ...mapActions(useBillStore, ['deleteBill', 'getAllBills', 'getBill', 'saveBill']),

    editBill(id){
      console.log('edit with id', id);
      this.$router.push({
        name: 'bill',
        params:{
          id
        }
      })
    }
  },
  computed: {
    ...mapState(useBillStore, ['bills', 'totalBills'])
  },
  mounted() {
    this.getAllBills()
  }
}
</script>

<style lang="scss" scoped>
</style>