<template>
    <div class="strapi-settings-edit">
        <wwEditorFormRow required label="URL">
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://my-strapi-url.com"
                :model-value="settings.privateData.url"
                large
                @update:modelValue="setPrivateProp('url', $event)"
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    methods: {
        setPrivateProp(key, value) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, [key]: value },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.strapi-settings-edit {
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
}
</style>
