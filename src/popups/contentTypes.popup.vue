<template>
    <div class="ww-popup-strapi-content-types">
        <button class="strapi-content-types__all ww-editor-button -primary" @click="addContentType">
            Add content type
        </button>
        <div
            class="strapi-content-types__row"
            v-for="(contentType, index) in settings.privateData.contentTypes"
            :key="index"
        >
            <div class="paragraph-m">{{ contentType.name }}</div>
            <button class="ww-editor-button -secondary -small m-auto-left" @click="editContentType(index, contentType)">
                Edit
            </button>
            <div class="strapi-content-types__button-delete m-left" @click="deleteContentType(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentTypesPopup',
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
            return this.settings.privateData.contentTypes && this.settings.privateData.contentTypes.length;
        },
    },
    methods: {
        async addContentType() {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'STRAPI_ADD_CONTENT_TYPE_POPUP',
                    data: { url: this.settings.privateData.url },
                });
                this.settings.privateData.contentTypes.push(result.contentType);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async editContentType(index, contentType) {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'STRAPI_EDIT_CONTENT_TYPE_POPUP',
                    data: { url: this.settings.privateData.url, contentType },
                });
                this.settings.privateData.contentTypes.splice(index, 1, result.contentType);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        deleteContentType(index) {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete data source?',
                    fr: 'Supprimer la source de données?',
                },
                text: {
                    en: 'Are you sure you want to delete the data source?',
                    fr: 'Voulez-vous vraiment supprimer la source de données ?',
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
            this.settings.privateData.contentTypes.splice(index, 1);
        },
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                const plugin = wwLib.wwPlugins.pluginStrapi;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );

                const oldContentTypes = this.options.data.settings.privateData.contentTypes;
                const newContentTypes = this.options.result.settings.privateData.contentTypes;
                const deletedContentTypes = oldContentTypes.filter(
                    contentType => !newContentTypes.find(elem => elem.id === contentType.id)
                );
                deletedContentTypes.forEach(contentType => wwLib.wwPlugin.deleteCmsDataSet(contentType.id));

                wwLib.wwPlugins.pluginStrapi.settings = plugin.settings;
                this.options.data.settings = plugin.settings;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-strapi-content-types {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .strapi-content-types {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
        &__button-delete {
            margin: 0 var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-03);
    }
}
</style>
