<template>
    <div>
        <div class="d-flex justify-content-between align-items-baseline border-bottom mb-4">
            <h1>{{ isNewBill ? 'Créer une nouvelle' : 'Modifier la' }} facture <span v-if="!isNewBill" class="text-primary">#{{ id }}</span></h1>
            <div class="mb-2">
                <BButton v-if="!isNewBill" iconVariant="outline-danger" iconLeft="trash" iconMsg="Supprimer" @click="onDeleteBill()"></BButton>
                <BButton to="/bills" iconLeft="angle-left" iconMsg="Retour au tableau"></BButton>
            </div>
        </div>
        <section v-if="bill">
            <div class="row">
                <div class="col-md-6 col-lg-2">
                    <div class="mb-3">
                        <label for="billnum" class="col-form-label text-nowrap col-6">Facture N°</label>
                        <input v-model="bill.billnum" class="form-control">
                    </div>
                </div>
                <div class="col-md-12 col-lg-10">
                    <div class="mb-3">
                        <label for="description" class="col-form-label text-nowrap col-6">Description</label>
                        <input v-model="bill.description" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-2">
                    <div class="mb-3">
                        <label for="billnum" class="col-form-label text-nowrap col-6">Emise le</label>
                        <input v-model="bill.date" class="form-control">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-2">
                    <div class="mb-3">
                        <label for="client" class="col-form-label text-nowrap col-6">Client</label>
                        <select class="form-select" name="client" id="client" v-model="bill.client"  :aria-label="bill.client.firstName + bill.client.lastName">
                            <option>Choisir</option>
                            <option v-for="client in clientOptions" :key="client.value.idclient" :value="client.value">{{ client.label }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <th>Actions</th>
                    <th>Prestations</th>
                    <th>Quantité</th>
                    <th>Montant unitaire</th>
                    <th>Montant total</th>
                </thead>
                <tbody>
                    <tr v-for="(prestation, index) in bill.prestations" :key="'prestation-' + index">
                        <td><BButton :disabled="bill.prestations.length === 1" @click="onDeletePrestation(index)" iconLeft="trash" btnVariant="danger text-white border-0" /><BButton iconLeft="circle-plus" v-if="index === bill.prestations.length - 1" @click="onAddPrestation()" btnVariant="white text-success border-0" /></td>
                        <td><input v-model="prestation.description" class="form-control"></td>
                        <td><input v-model="prestation.qty" class="form-control"></td>
                        <td><input v-model="prestation.price" class="form-control"></td>
                        <td><input :value="prestation.qty * prestation.price" class="form-control" disabled></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">Remises</label></td>
                        <input class="form-control text-end" v-model.number="bill.discount" disabled>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">Total HT</label></td>
                        <input class="form-control text-end" :value="totalHT + ' €'" disabled>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">TVA (20%)</label></td>
                        <input class="form-control text-end" :value="totalTVA + ' €'" disabled>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">Montant TTC</label></td>
                        <input class="form-control text-end bg-dark text-light" :value="totalTTC + ' €'" disabled>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">Déjà payé</label></td>
                        <input class="form-control text-end" type="number" v-model.number="bill.paid" id="paid">
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end border-0 pt-3 pb-1"><label for="discount" class="form-label pt-1">Reste dû TTC</label></td>
                        <input class="form-control text-end" :value="totalRest + ' €'" disabled>
                    </tr>
                </tbody>
            </table>
        </section>
        <BButton iconLeft="floppy-disk" @click="onSaveBill()"></BButton>
    </div>
</template>

<script>

import BButton from '../components/BButton.vue';
import { clientOptions } from '../libs/clientOptions.js'
import prestationInterface from '../interface/prestationsInterface.js'
import { mapActions, mapWritableState } from 'pinia';
import { useBillStore } from '../stores/bill.js';

    export default {
    data() {
        return {
            clientOptions
        };
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapWritableState(useBillStore, ['bill']),
        isNewBill() {
            return !this.id || this.id < 0;
        },
        totalHT(){
            let total = 0
            if(this.bill.prestations && this.bill.prestations.length){
                for(const prestation of this.bill.prestations){
                total += prestation.price * prestation.qty
                }
                total-= this.bill.discount
            }
            
            return total
        },
        totalTVA(){
            return (this.totalHT * this.bill.tva) / 100
        },
        totalTTC(){
            return this.totalHT + this.totalTVA
        },
        totalRest(){
            return this.totalTTC - this.bill.paid
        }
    },
    methods: {
        ...mapActions(useBillStore, ['createBill', 'getBill', 'saveBill', 'deleteBill']), 
        onDeletePrestation(index){
            this.bill.prestations.splice(index, 1)
        },
        onAddPrestation(){
            this.bill.prestations.push( { ...prestationInterface, description:"Prestation  vierge" })
        },
        onDeleteBill() {
            this.deleteBill(this.id)
            this.$router.push('/bills')
        },
        onSaveBill() {
            this.saveBill({
                ...this.bill,
                totalHT: this.totalHT,
                totalTTC: this.totalTTC,
                
            })
            this.$router.push('/bills')
        }

    },
    components: { BButton },
    mounted() {
        if(this.isNewBill){
            this.createBill()
        } else {
            this.getBill(this.id)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>