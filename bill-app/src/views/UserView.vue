<template>
    <div>
        <div class="d-flex justify-content-between align-items-baseline border-bottom mb-4">
            <h1>{{ isNewUser ? 'Créer un nouveau' : 'Modifier un' }} client <span v-if="!isNewUser" class="text-primary">#{{ id }}</span></h1>
        </div>
        <div class="mb-2">
            <BButton v-if="!isNewUser" iconVariant="outline-danger" iconLeft="trash" iconMsg="Supprimer" @click="onDeleteUser()"></BButton>
            <BButton to="/users" iconLeft="angle-left" iconMsg="Retour au tableau"></BButton>
        </div>
    </div>
    <section v-if="user">
        <h2>Contact</h2>
        <div class="row">
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="firstName" class="col-form-label text-nowrap col-6">Prénom</label>
                    <input v-model="user.firstName" class="form-control">
                </div>
            </div>
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="lastName" class="col-form-label text-nowrap col-6">Nom</label>
                    <input v-model="user.lastName" class="form-control">
                </div>
            </div>
            <div class="col-2">
                <div class="mb-3">
                    <label for="regDate">Date d'ajout</label>
                    <input v-model="user.regDate" class="form-control" disabled>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="fonction" class="col-form-label text-nowrap col-6">Fonction</label>
                    <input v-model="user.fonction" class="form-control">
                </div>
            </div>
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="telephone" class="col-form-label text-nowrap col-6">Téléphone</label>
                    <input v-model="user.telephone" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-12 col-lg-6">
                <div class="mb-3">
                    <label for="email" class="col-form-label text-nowrap col-6">Email</label>
                    <input v-model="user.email" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-12 col-lg-6">
                <div class="mb-3">
                    <label for="enterprise" class="col-form-label text-nowrap col-6">Entreprise</label>
                    <input v-model="user.enterprise" class="form-control">
                </div>
            </div>
        </div>

        <h2>Coordonnées</h2>

        <div class="row">
            <div class="col-mb-12 col-lg-6">
                <div class="mb-3">
                    <label for="mainAddress" class="col-form-label text-nowrap col-6">Adresse 1</label>
                    <input v-model="user.mainAddress" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-12 col-lg-6">
                <div class="mb-3">
                    <label for="scdAddress" class="col-form-label text-nowrap col-6">Adresse 2</label>
                    <input v-model="user.scdAddress" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="zipcode" class="col-form-label text-nowrap col-6">Code Postal</label>
                    <input v-model="user.zipcode" class="form-control">
                </div>
            </div>
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="city" class="col-form-label text-nowrap col-6">Ville</label>
                    <input v-model="user.city" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-mb-6 col-lg-2">
                <div class="mb-3">
                    <label for="country" class="col-form-label text-nowrap col-6">Pays</label>
                    <select name="country" id="country" v-model="user.country" :aria-label="user.country">
                        <option>Choisir</option>
                        <option v-for="country in countryOptions" :key="country.id" :value="country.label">{{ country.label }}</option>
                    </select>
                </div>
            </div>
        </div>
    </section>
    <BButton iconLeft="floppy-disk" @click="onSaveUser()"></BButton>
</template>

<script>

import BButton from '../components/BButton.vue';
import { countryOptions } from '../libs/countryOptions';
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from '../stores/user.js'

    export default {
        data(){
            return {
                countryOptions
            }
        },
        props: {
            id:{
                type: String,
                required: true
            }
        },
        computed: {
            ...mapWritableState(useUserStore, ['user']),
            isNewUser(){
                return !this.id || this.id < 0;
            }
        },
        methods: {
            ...mapActions(useUserStore, ['createUser', 'getUser', 'saveUser', 'deleteUser']),
            onDeleteUser() {
                this.deleteUser(this.id)
                this.$router.push('/users')
            },
            onSaveUser() {
                this.saveUser({
                    ...this.user
                })
                this.$router.push('/users')
            }
        },
        components: { BButton },
        mounted() {
            if(this.isNewUser){
                this.createUser()
            } else {
                this.getUser(this.id)
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>