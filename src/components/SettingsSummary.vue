<template>
    <div class="strapi-settings-summary" v-if="isValid">
        <wwEditorIcon name="link" class="strapi-settings-summary__icon"></wwEditorIcon>
        <span class="caption-m">{{ settings.privateData.url }}</span>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    computed: {
        isValid() {
            const { contentApiKey, adminApiKey, url } = this.settings.privateData;
            return !!contentApiKey && !!adminApiKey && !!url;
        },
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
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
