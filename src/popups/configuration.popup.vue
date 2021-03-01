<template>
    <div class="ww-popup-strapi-configuration">
        <label class="strapi-configuration__label caption-s" for="url">
            Strapi URL
            <div class="strapi-configuration__label-required">required</div>
        </label>
        <input
            type="text"
            name="url"
            class="strapi-configuration__input caption-m ww-editor-input -large"
            placeholder="https://my-strapi-url.com"
            v-model="settings.privateData.url"
        />
        <div class="strapi-configuration__delete-zone danger-zone">
            <span class="strapi-configuration__delete-zone-label">DANGER ZONE</span>
            <button
                class="strapi-configuration__delete-zone-button ww-editor-button -primary -red -small"
                @click="deletePlugin"
            >
                Delete plugin
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfigurationPopup',
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
                privateData: {},
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            return this.settings.privateData.url && this.settings.privateData.url.length;
        },
    },
    methods: {
        async deletePlugin() {
            const plugin = wwLib.wwPlugins.pluginStrapi;
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete plugin Strapi?',
                    fr: 'Supprimer le plugin Strapi ?',
                },
                text: {
                    en: 'Are you sure you want to delete the plugin from your website?',
                    fr: 'Voulez-vous vraiment supprimer le plugin de votre site ?',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            await wwLib.wwPlugin.deleteDesignPlugin(plugin.id);
        },
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                if (this.settings.privateData.url.endsWith('/'))
                    this.settings.privateData.url = this.settings.privateData.url.slice(0, -1);
                const plugin = wwLib.wwPlugins.pluginStrapi;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = this.options.data.settings || this.settings;
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-strapi-configuration {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .strapi-configuration {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            &-required {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__delete-zone {
            margin-top: auto;
            &-label {
                width: 100%;
                font-size: var(--ww-font-size-04);
                color: var(--ww-color-red-500);
            }
            &-button {
                margin-top: var(--ww-spacing-02);
                margin-right: var(--ww-spacing-02);
            }
        }
    }
}
</style>
