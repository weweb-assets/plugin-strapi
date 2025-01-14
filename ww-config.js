export default {
    features: {
        datasource: true
    },
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                return !!settings.privateData.url;
            },
            /* wwEditor:start */
            copilot: {
                description: 'Configure the Strapi API connection settings',
                returns: 'void',
                schema: {
                    privateData: {
                        type: 'object',
                        description: 'Private configuration data',
                        bindable: false,
                        schema: {
                            url: {
                                type: 'string',
                                description: 'The base URL of your Strapi API instance',
                                bindable: false
                            }
                        }
                    }
                }
            }
            /* wwEditor:end */
        },
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.name;
            },
            /* wwEditor:start */
            copilot: {
                description: 'Configure a Strapi collection data source',
                returns: 'void',
                schema: {
                    name: {
                        type: 'string',
                        description: 'The name of the Strapi content type to fetch',
                        bindable: false
                    },
                    filterByFormula: {
                        type: 'string',
                        description: 'Filter query to apply to the collection',
                        bindable: true
                    },
                    limit: {
                        type: 'number',
                        description: 'Maximum number of records to return',
                        bindable: true
                    },
                    start: {
                        type: 'number',
                        description: 'Starting offset for pagination',
                        bindable: true
                    },
                    sort: {
                        type: 'array',
                        description: 'Sorting configuration for the results',
                        bindable: false,
                        schema: {
                            field: {
                                type: 'string',
                                description: 'Field name to sort by',
                                bindable: false
                            },
                            direction: {
                                type: 'string',
                                description: 'Sort direction (asc or desc)',
                                bindable: false
                            }
                        }
                    }
                }
            }
            /* wwEditor:end */
        },
    },
};