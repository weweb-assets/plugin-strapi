<template>
    <div class="ww-popup-strapi-content-type">
        <label class="strapi-content-type__label caption-s" for="name-strapi">
            Content type
            <div class="strapi-content-type__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-strapi"
            class="strapi-content-type__input caption-m ww-editor-input -large"
            placeholder="Blog-Post"
            v-model="contentType.name"
            autofocus
        />
        <label class="strapi-content-type__label caption-s" for="display-by-strapi">
            Display by
            <div class="strapi-content-type__label-required">required</div>
        </label>
        <input
            type="text"
            name="display-by-strapi"
            class="strapi-content-type__input caption-m ww-editor-input -large"
            placeholder="Title"
            v-model="contentType.displayBy"
        />
        <label class="strapi-content-type__label caption-s" for="filter-strapi">
            Filter by formula
            <a
                class="strapi-content-type__link"
                href="//strapi.io/documentation/developer-docs/latest/content-api/parameters.html#filters"
                target="_blank"
            >
                Find it here
            </a>
            <div class="strapi-content-type__label-required">optional</div>
        </label>
        <input
            type="text"
            name="filter-strapi"
            class="strapi-content-type__input caption-m ww-editor-input -large"
            placeholder="firstName=John"
            v-model="contentType.filterByFormula"
            :disabled="!contentType.name"
        />
        <div class="strapi-content-type__row -space-between">
            <div class="strapi-content-type__row-item">
                <label class="strapi-content-type__label caption-s" for="limit-strapi">
                    Limit
                    <div class="strapi-content-type__label-required">optional</div>
                </label>
                <input
                    type="number"
                    name="limit-strapi"
                    class="strapi-content-type__input caption-m ww-editor-input -large"
                    placeholder="100"
                    v-model="contentType.limit"
                    :disabled="!contentType.name"
                />
            </div>
            <div class="strapi-content-type__row-item">
                <label class="strapi-content-type__label caption-s" for="start-strapi">
                    Start
                    <div class="strapi-content-type__label-required">optional</div>
                </label>
                <input
                    type="number"
                    name="start-strapi"
                    class="strapi-content-type__input caption-m ww-editor-input -large"
                    placeholder="0"
                    v-model="contentType.start"
                    :disabled="!contentType.name"
                />
            </div>
        </div>
        <div class="strapi-content-type__row strapi-content-type__input">
            <label class="strapi-content-type__label caption-s" for="content-type-view"> Sort </label>
            <button class="ww-editor-button -primary -small m-auto-left" @click="addSort" :disabled="!contentType.name">
                Add a field to sort by
            </button>
        </div>
        <div
            class="strapi-content-type__row -space-between strapi-content-type__input"
            v-for="(sort, index) in contentType.sort"
            :key="index"
        >
            <div class="caption-s" v-if="!index">Sort by</div>
            <div class="caption-s" v-else>then by</div>
            <input
                type="text"
                class="caption-m ww-editor-input"
                v-model="sort.field"
                :disabled="!contentType.name"
                placeholder="Field"
            />
            <wwEditorSelect
                class="strapi-content-type__select"
                :options="directionOptions"
                :value="sort.direction"
                @input="updateSort(sort, $event)"
            />
            <div class="strapi-content-type__button-delete" @click="deleteSort(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentTypePopup',
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
            directionOptions: [
                { value: 'asc', label: 'Asc', default: true },
                { value: 'desc', label: 'Desc' },
            ],
            contentType: {
                id: wwLib.wwUtils.getUid(),
                name: undefined,
                displayBy: undefined,
                filterByFormula: undefined,
                limit: undefined,
                start: undefined,
                sort: [],
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
            return !!this.contentType.name && !!this.contentType.name.length;
        },
    },
    methods: {
        addSort() {
            if (!this.contentType.sort) this.contentType.sort = [];
            this.contentType.sort.push({ field: '', direction: 'asc' });
            this.$forceUpdate();
        },
        updateSort(sort, event) {
            sort.direction = event;
            this.$forceUpdate();
        },
        deleteSort(index) {
            this.contentType.sort.splice(index, 1);
            this.$forceUpdate();
        },
    },
    created() {
        this.contentType = this.options.data.contentType || this.contentType;
        this.options.result.contentType = this.contentType;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-strapi-content-type {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .strapi-content-type {
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
        &__link {
            color: var(--ww-color-blue-500);
            margin-left: var(--ww-spacing-02);
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__select {
            min-width: 65px;
            margin-left: var(--ww-spacing-02);
        }
        &__row {
            display: flex;
            align-items: center;
            &.-space-between {
                justify-content: space-between;
                // padding: 0 var(--ww-spacing-05);
            }
            &-item {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-right: var(--ww-spacing-02);
                &:last-child {
                    margin-right: 0;
                    margin-left: var(--ww-spacing-02);
                }
            }
        }
        &__button-delete {
            margin-right: var(--ww-spacing-03);
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
}
</style>
