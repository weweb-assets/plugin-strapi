<template>
    <div class="strapi-collection-edit">
        <wwEditorFormRow label="Content type" required>
            <wwEditorInputText
                type="text"
                name="param"
                :model-value="contentType.name"
                placeholder="blog-posts"
                large
                @update:modelValue="setProp('name', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Filter">
            <template #append-label>
                <a
                    class="strapi-collection-edit__link"
                    href="//strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorInputText
                type="text"
                name="filter"
                placeholder="firstName=John"
                :model-value="contentType.filterByFormula"
                large
                @update:modelValue="setProp('filterByFormula', $event)"
            />
        </wwEditorFormRow>
        <div class="strapi-collection-edit__row">
            <wwEditorFormRow label="Limit" class="-full">
                <wwEditorInputText
                    type="number"
                    name="limit"
                    placeholder="100"
                    :model-value="contentType.limit"
                    large
                    @update:modelValue="setProp('limit', $event)"
                />
            </wwEditorFormRow>
            <wwEditorFormRow label="Start" class="-full">
                <wwEditorInputText
                    type="number"
                    name="start"
                    placeholder="0"
                    :model-value="contentType.start"
                    large
                    @update:modelValue="setProp('start', $event)"
                />
            </wwEditorFormRow>
        </div>
        <wwEditorFormRow label="Sort">
            <template #append-label>
                <button type="button" class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addSort">
                    Add a field to sort by
                </button>
            </template>
            <div
                v-for="(sort, index) in contentType.sort"
                :key="index"
                class="strapi-collection-edit__row -space-between m-bottom"
            >
                <div v-if="!index" class="label-xs">Sort by</div>
                <div v-else class="label-xs">then by</div>
                <wwEditorInputText
                    type="text"
                    :model-value="sort.field"
                    placeholder="Field"
                    @update:modelValue="setSortProp(index, { field: $event })"
                />
                <wwEditorInputTextSelect
                    :options="directionOptions"
                    :model-value="sort.direction"
                    @update:modelValue="setSortProp(index, { direction: $event })"
                />
                <button type="button" class="ww-editor-button -tertiary -small -icon -red" @click="deleteSort(index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
    data() {
        return {
            directionOptions: [
                { value: 'asc', label: 'Asc', default: true },
                { value: 'desc', label: 'Desc' },
            ],
        };
    },
    computed: {
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
            this.setProp('sort', sort);
        },
        setSortProp(index, value) {
            const sort = _.cloneDeep(this.contentType.sort);
            sort.splice(index, 1, { ...sort[index], ...value });
            this.setProp('sort', sort);
        },
        deleteSort(index) {
            const sort = _.cloneDeep(this.contentType.sort);
            sort.splice(index, 1);
            this.setProp('sort', sort);
        },
        setProp(key, value) {
            this.$emit('update:config', { ...this.contentType, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.strapi-collection-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-content-brand);
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
