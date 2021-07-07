<template>
    <div class="strapi-collection-summary">
        <div class="strapi-collection-summary__elem caption-s">Content type: {{ config.name || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
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
