<template>
    <div class="strapi-collection-edit">
        <wwEditorFormRow label="Content type" required>
            <wwEditorFormInput
                type="text"
                name="param"
                :value="contentType.name"
                @input="setProp('name', $event)"
                placeholder="blog-posts"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Filter">
            <template slot="append-label">
                <a
                    class="strapi-collection-edit__link"
                    href="//strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorFormInput
                type="text"
                name="filter"
                placeholder="firstName=John"
                :value="contentType.filterByFormula"
                @input="setProp('filterByFormula', $event)"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <div class="strapi-collection-edit__row">
            <wwEditorFormRow label="Limit" class="-full">
                <wwEditorFormInput
                    type="number"
                    name="limit"
                    placeholder="100"
                    :value="contentType.limit"
                    @input="setProp('limit', $event)"
                    v-on:keyup.native.enter="$emit('next')"
                    large
                />
            </wwEditorFormRow>
            <wwEditorFormRow label="Start" class="-full">
                <wwEditorFormInput
                    type="number"
                    name="start"
                    placeholder="0"
                    :value="contentType.start"
                    @input="setProp('start', $event)"
                    v-on:keyup.native.enter="$emit('next')"
                    large
                />
            </wwEditorFormRow>
        </div>
        <wwEditorFormRow label="Sort">
            <template slot="append-label">
                <button class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addSort">
                    Add a field to sort by
                </button>
            </template>
            <div
                class="strapi-collection-edit__row -space-between m-bottom"
                v-for="(sort, index) in contentType.sort"
                :key="index"
            >
                <div class="label-xs" v-if="!index">Sort by</div>
                <div class="label-xs" v-else>then by</div>
                <wwEditorFormInput
                    type="text"
                    :value="sort.field"
                    @input="setSortProp(index, { field: $event })"
                    placeholder="Field"
                    v-on:keyup.native.enter="$emit('next')"
                />
                <wwEditorSelect
                    :options="directionOptions"
                    :value="sort.direction"
                    @input="setSortProp(index, { direction: $event })"
                />
                <button class="ww-editor-button -tertiary -small -icon -red" @click="deleteSort(index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    data() {
        return {
            directionOptions: [
                { value: 'asc', label: 'Asc', default: true },
                { value: 'desc', label: 'Desc' },
            ],
        };
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return !!this.contentType.name;
        },
        contentType() {
            return {
                name: undefined,
                filterByFormula: undefined,
                limit: undefined,
                start: undefined,
                sort: [],
                ...this.config,
            };
        },
    },
    methods: {
        addSort() {
            const sort = _.cloneDeep(this.contentType.sort || []);
            sort.push({ field: '', direction: 'asc' });
            this.setProp('order', sort);
        },
        setSortProp(index, value) {
            const sort = _.cloneDeep(this.contentType.sort);
            sort.splice(index, 1, { ...sort[index], ...value });
            this.setProp('order', sort);
        },
        deleteSort(index) {
            const sort = _.cloneDeep(this.contentType.sort);
            sort.splice(index, 1);
            this.setProp('order', sort);
        },
        setProp(key, value) {
            this.$emit('update-config', { ...this.contentType, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.strapi-collection-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
    &__row {
        display: flex;
        align-items: center;
        > *:not(:first-child) {
            margin-left: var(--ww-spacing-02);
        }
        &.-space-between {
            justify-content: space-between;
        }
        .-full {
            width: 100%;
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-bottom {
        margin-bottom: var(--ww-spacing-02);
    }
}
</style>
