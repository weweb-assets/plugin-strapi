<template>
    <div class="ww-popup-strapi-webhooks">
        <div
            class="strapi-webhooks__row"
            v-for="(contentType, index) in settings.privateData.contentTypes"
            :key="index"
        >
            <div class="paragraph-m">{{ contentType.name }}</div>
            <button class="ww-editor-button -primary -green -small m-auto-left" @click="copyUrl(contentType)">
                <wwEditorIcon class="ww-editor-button-icon -left" name="copy-paste" small />
                Copy url
            </button>
            <a
                class="ww-editor-button -secondary -small m-left"
                :href="`//${settings.privateData.url}/admin/webhooks`"
                target="_blank"
            >
                <wwEditorIcon class="ww-editor-button-icon -left" name="open-out" small />
                Setup webhook
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebhooksPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            settings: {
                privateData: {
                    url: '',
                    contentTypes: [],
                },
            },
        };
    },
    methods: {
        async copyUrl(contentType) {
            const designId = wwLib.wwWebsiteData.getInfo().id;
            await wwLib
                .getManagerWindow()
                .navigator.clipboard.writeText(
                    `https://data.weweb.io/designs/${designId}/cms_data_set/${contentType.id}/callback`
                );
            wwLib.wwNotification.open({
                text: {
                    en: 'Url copied to clipboard',
                },
                color: 'green',
            });
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
    },
};
</script>

<style scoped lang="scss">
.ww-popup-strapi-webhooks {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .strapi-webhooks {
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
