import { defineStore } from 'pinia'
import billInterface from '../interface/billInterface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

const useBillStore = defineStore('bill', {
    state: ()=>({
        bill: null,
        bills: []
    }),
    getters: {
        totalBills: (state) => state.bills.length
    },
    actions: {
        async getAllBills(){
          try {
            const response = await axios.get('/bills')
            this.$patch({ bills: cloneDeep(response.data) })
          } catch (error) {
            console.log(error);
          }
        },
        async getLimitedBills(){
          try {
            const response = await axios.get(`/bills/limited/` + 5)
            this.$patch({ bills: cloneDeep(response.data) })
            console.log( response.data );
          } catch (error) {
            console.log(error);
          }
        },
        async getBill(id){
          try {
            const response = await axios.get(`/bills/${id}`)
            this.$patch({ bill: cloneDeep(response.data) })
          } catch (error) {
            console.log(error);
          }
        },
        createBill(){
            this.$patch({ bill: cloneDeep(billInterface)})
        },
        async deleteBill(id){
          try {
            const response = await axios.delete(`/bills/${id}`)
            console.log(response.data);
            this.getAllBills()
          } catch (error) {
            console.log(error);
          }
        },
        async saveBill(bill){
            if(bill._id){
              try {
                const response = await axios.patch(`/bills/${bill._id}`, bill)
                console.log(response.data);
                this.$reset()  
              } catch (error) {
                console.log(error);
              }
            }else{
              try {
                const response = await axios.post(`/bills`, bill)
                console.log(response.data);
                this.$reset()  
              } catch (error) {
                console.log(error);
              }
            }
        }
    }
})

export { useBillStore }

