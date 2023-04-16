<template>
    <component :is="href ? 'a' : to ? 'router-link' : 'button'" :to="to" :href="href" class="btn mx-2" :class="[`btn-${btnVariant} `, `btn-${btnSize}`]" 
    >
        <i v-if="iconLeft" :class="[`fa-solid`,  `fa-${iconLeft}`, `p-1`]"></i>{{ iconMsg }}<i v-if="iconRight" :class="[`fa-solid` , `fa-${iconRight}`, `p-1`]"></i>
    </component>

</template>

<script>
    export default {
        props: {
            btnVariant: {
                type: String,
                default: 'primary'
            },
            btnSize: {
                type: String,
                default: 'md'
            },
            iconLeft: {
                type: String,
                default: ''
            },
            iconRight: {
                type: String,
                default: ''
            },
            iconMsg: {
                type: [String, Number],
                default: ''
            },
            to: {
                type: [String, Object],
                default: ''
            },
            href: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>