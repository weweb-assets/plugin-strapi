<template>
    <div class="strapi-settings-summary">
        <wwEditorIcon name="link" class="strapi-settings-summary__icon"></wwEditorIcon>
        <span class="caption-m">{{ settings.privateData.url }}</span>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
};
</script>

<style lang="scss" scoped>
.strapi-settings-summary {
    display: flex;
    align-items: center;
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
}
</style>
