/* wwEditor:start */
import './popups';
/* wwEditor:end */

export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        Data
    \================================================================================================*/
    settings: {
        data: {},
        privateData: {
            url: '',
            contentTypes: [],
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginStrapi;
        if (plugin.id) plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;
        if (!plugin.settings.privateData.url) plugin.settings.privateData.url = '';
        if (!plugin.settings.privateData.contentTypes) plugin.settings.privateData.contentTypes = [];
        if (!plugin.settings.privateData.url.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id, settings } = wwLib.wwPlugins.pluginStrapi;
            const isSetup = !settings.privateData.url.length;
            const isFirstTime = !settings.privateData.contentTypes.length;
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'STRAPI_POPUP' : 'STRAPI_CONFIGURATION_POPUP',
                data: {
                    isFirstTime,
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    /* wwEditor:end */
};
