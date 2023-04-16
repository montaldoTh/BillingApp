<template>
    <div>
        <table class="table my-5">
            <thead>
                <tr>
                    <th scope="col">Date & Numéro Factures</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Entreprise</th>
                    <th scope="col">Prix HT</th>
                    <th scope="col">Reste Dû</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>