import settingsPopup from './settings.popup.vue';
import configurationPopup from './configuration.popup.vue';
import contentTypesPopup from './contentTypes.popup.vue';
import contentTypePopup from './contentType.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('strapiSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('strapiConfigurationPopup', configurationPopup);
wwLib.wwPopups.addPopup('strapiContentTypesPopup', contentTypesPopup);
wwLib.wwPopups.addPopup('strapiContentTypePopup', contentTypePopup);
wwLib.wwPopups.addPopup('strapiSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('strapiWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('STRAPI_POPUP', {
    title: {
        en: 'Strapi',
        fr: 'Strapi',
    },
    type: 'strapiSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('STRAPI_CONFIGURATION_POPUP', {
    title: {
        en: 'Strapi - Configuration',
        fr: 'Strapi - Configuration',
    },
    type: 'strapiConfigurationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save configuration',
                fr: 'Enregistrer la configuration',
            },
            next: 'STRAPI_CONTENT_TYPES_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('STRAPI_CONTENT_TYPES_POPUP', {
    title: {
        en: 'Strapi - Content types',
        fr: 'Strapi - Content types',
    },
    type: 'strapiContentTypesPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save content types',
                fr: 'Enregistrer les content types',
            },
            next: 'STRAPI_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('STRAPI_ADD_CONTENT_TYPE_POPUP', {
    title: {
        en: 'Strapi - Add content type',
        fr: 'Strapi - Ajouter un content type',
    },
    type: 'strapiContentTypePopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add content type',
                fr: 'Ajouter un content type',
            },
        },
    },
});

wwLib.wwPopups.addStory('STRAPI_EDIT_CONTENT_TYPE_POPUP', {
    title: {
        en: 'Strapi - Edit content type',
        fr: 'Strapi - Editer la content type',
    },
    type: 'strapiContentTypePopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit content type',
                fr: 'Editer le content type',
            },
        },
    },
});

wwLib.wwPopups.addStory('STRAPI_WEBHOOKS_POPUP', {
    title: {
        en: 'Strapi - Webhooks',
        fr: 'Strapi - Webhooks',
    },
    type: 'strapiWebhooksPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});

wwLib.wwPopups.addStory('STRAPI_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'Strapi - Synchronization',
        fr: 'Strapi - Synchronization',
    },
    type: 'strapiSynchronizationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});
