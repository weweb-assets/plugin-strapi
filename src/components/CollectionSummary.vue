<template>
    <div class="strapi-collection-summary">
        <div class="strapi-collection-summary__elem caption-s">Content type: {{ config.name || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return !!this.config.name;
        },
    },
};
</script>

<style lang="scss" scoped>
.strapi-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
