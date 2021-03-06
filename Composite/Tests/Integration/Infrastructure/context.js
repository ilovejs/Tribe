﻿TC.context = function (state) {
    Test.Integration.context = $.extend({
        models: new TC.Types.Resources(),
        sagas: new TC.Types.Resources(),
        loader: new TC.Types.Loader(),
        options: TC.options,
        templates: new TC.Types.Templates(),
        loadedPanes: {},
        renderOperation: new TC.Types.Operation(),
        pubsub: Test.Integration.pubsub()
    }, state);
    return Test.Integration.context;
};