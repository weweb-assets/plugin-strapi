<template>
    <div class="strapi-settings-edit">
        <wwEditorFormRow required label="URL">
            <wwEditorFormInput
                type="text"
                name="url"
                placeholder="https://my-strapi-url.com"
                :value="settings.privateData.url"
                @input="setPrivateProp('url', $event)"
                v-on:keyup.native.enter="$emit('save')"
                large
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isValid() {
            return !!this.settings.privateData.url;
        },
    },
    methods: {
        setPrivateProp(key, value) {
            this.$emit('update-settings', {
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
