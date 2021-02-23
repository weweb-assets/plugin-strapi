<template>
    <div class="ww-popup-strapi-sync">
        <button class="strapi-sync__all ww-editor-button -primary -green" @click="syncAll" :disabled="isFetching">
            <div v-if="!isFetching">Synchronize all</div>
            <div v-else>Fetching...</div>
        </button>
        <div class="strapi-sync__row" v-for="(contentType, index) in settings.privateData.contentTypes" :key="index">
            <div class="paragraph-m">{{ contentType.name }}</div>
            <div class="caption-m m-auto-left">
                <template v-if="!isContentTypeFetching(contentType)">
                    <template v-if="getSource(contentType).lastSyncDate">
                        {{ getSource(contentType).lastSyncDate | dateFromNow }}
                    </template>
                    <template v-else>never synchronized</template>
                </template>
            </div>
            <button
                :disabled="isContentTypeFetching(contentType)"
                class="ww-editor-button -primary -green -small m-left"
                @click="sync(contentType)"
            >
                <div v-if="!isContentTypeFetching(contentType)">Synchronize content type</div>
                <div v-else>Fetching...</div>
            </button>
        </div>
        <div class="strapi-sync__separator"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'SynchronizationPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        dateFromNow(date) {
            return moment(date).fromNow();
        },
    },
    data() {
        return {
            isFetching: false,
            contentTypesFetching: [],
            settings: {
                privateData: {},
            },
        };
    },
    methods: {
        getSource(contentType) {
            return wwLib.$store.getters['cms/getData'][contentType.id] || {};
        },
        isContentTypeFetching(contentType) {
            return this.contentTypesFetching.indexOf(contentType.id) !== -1;
        },
        contentTypeFetching(contentType, value) {
            if (value) {
                this.contentTypesFetching.push(contentType.id);
            } else {
                const index = this.contentTypesFetching.indexOf(contentType.id);
                if (index !== -1) this.contentTypesFetching.splice(index, 1);
            }
        },
        async sync(contentType) {
            this.contentTypeFetching(contentType, true);
            try {
                await wwLib.wwPlugin.saveCmsDataSet(
                    this.settings.id,
                    contentType.id,
                    contentType.name,
                    contentType.displayBy,
                    'Strapi'
                );

                wwLib.wwNotification.open({
                    text: {
                        en: `Content type "${contentType.name}" succesfully fetched`,
                    },
                    color: 'green',
                });
            } catch (err) {
                wwLib.wwNotification.open({
                    text: {
                        en: 'An error occured, please try again later.',
                        fr: 'Une erreur est survenue. Veuillez réessayer plus tard.',
                    },
                    color: 'red',
                });
                wwLib.wwLog.error(err);
            }
            this.contentTypeFetching(contentType, false);
        },
        async syncAll() {
            this.isFetching = true;
            for (const contentType of this.settings.privateData.contentTypes) await this.sync(contentType);
            this.isFetching = false;
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
    mounted() {
        if (this.options.data.isFirstTime) this.syncAll();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-strapi-sync {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .strapi-sync {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
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
