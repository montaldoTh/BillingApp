<template>
  <div class="d-flex justify-content-between align-item-baseline">
    <h1>Dashboard</h1>
    <div class="d-flex flex-row justify-content-around">
      <BButton iconLeft="circle-plus" :to="{ name: 'user', params: { id: -1 }}" iconMsg="Ajouter un client"></BButton>
      <BButton iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1 }}" iconMsg="Ajouter une facture"></BButton>
    </div>
  </div>
  <section class="container">
    <div class="row">
      <div class="col-5">
      </div>
      <div class="col-5">
        <div class="d-flex flex-column">
          <BillList v-if="bills" >
            <BillCel v-for="(bill) in bills" :key="bill" :item="bill" @onDeleteBill="$event => deleteBill($event)" @onEditBill=" $event => editBill($event)" />
          </BillList>
          <UserList v-if="users"> 
            <UserCel v-for="(user) in users" :key="user" :item="user" @onDeleteUser="$event => deleteUser($event)" @onEditUser=" $event => editUser($event)"/>
          </UserList>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BillList from '../components/BillList.vue';
import BillCel from '../components/BillCel.vue';
import UserList from '../components/UserList.vue';
import UserCel from '../components/UserCel.vue';
import { useBillStore } from '../stores/bill.js';
import { useUserStore } from '../stores/user.js';
import { mapActions, mapState } from 'pinia';
import BButton from '../components/BButton.vue';

export default {
  data() {
    return {}
  },
  components: {
    BillList,
    BillCel,
    UserList,
    UserCel,
    BButton
},
  methods:{
    ...mapActions(useBillStore, ['getLimitedBills', 'getBill', 'deleteBill', 'saveBill']),
    ...mapActions(useUserStore, ['getLimitedUsers', 'getUser', 'deleteUser','saveUser']),
    editBill(id){
      console.log('bill : ', id);
      this.$router.push({
        name: 'bill',
        params:{
          id
        }
      })
    },
    editUser(id){
      console.log('user : ', id);
      this.$router.push({
        name: 'user',
        params:{
          id
        }
      })
    }
  },
  computed: {
    ...mapState(useBillStore, ['bills', 'bill']),
    ...mapState(useUserStore, ['users', 'user'])
  },
  mounted(){
    this.getLimitedBills(),
    this.getLimitedUsers()
  }
}
</script>


<style lang="scss" scoped>
</style>