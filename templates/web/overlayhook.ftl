<#assign authoringServer = envConfig.authoringServer!''/>
<#assign studioContext = envConfig.studioContext!''/>
<#assign hostOrigin = authoringServer?replace("/${studioContext}", "") />
<#assign staticAssets = "${authoringServer}/static-assets"/>

crafterRequire.requirejs.config({
    baseUrl: '${staticAssets}/scripts',
    paths: {
        'libs': '${staticAssets}/libs/',
        'jquery': '${staticAssets}/libs/jquery/dist/jquery',
        'jquery-ui': '${staticAssets}/libs/jquery-ui/jquery-ui',
        'amplify': '${staticAssets}/libs/amplify/lib/amplify.core',
        'noty': '${staticAssets}/libs/notify/notify.min',
        'cache': '${staticAssets}/libs/js-cache/cache'
    }
});

crafterRequire.require(['guest'], function (guest) {
    guest.init({
        hostOrigin: '${hostOrigin}',
        studioContext: '${studioContext}',
        studioStaticAssets: 'static-assets'
    });
});
