﻿TC.LoadStrategies.preloaded = function (pane, context) {
    if (!context.models[pane.path] && !context.templates.loaded(pane.path)) {
        TC.logger.error("No resources loaded for '" + pane.path + "'.");
        return $.Deferred().reject();
    }
    return null;
};