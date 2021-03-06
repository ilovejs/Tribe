﻿(function () {
    TC.Types.Flow = function (navigationSource, definition) {
        var self = this;

        this.node = navigationNode();
        this.pubsub = this.node.pane.pubsub.owner;
        this.sagas = [];

        definition = createDefinition(self, definition);
        this.saga = new Tribe.PubSub.Saga(this.pubsub, definition);

        this.start = function(data) {
            self.saga.start(data);
            return self;
        };

        this.end = function(data) {
            self.saga.end(data);
            TC.Utils.each(self.sagas, function(saga) {
                saga.end(data);
            });
            return self;
        };

        function navigationNode() {
            if (navigationSource.constructor === TC.Types.Node)
                return navigationSource.findNavigation().node;
            if (navigationSource.constructor === TC.Types.Pane)
                return navigationSource.node.findNavigation().node;
            throw new Error("navigationSource must be either TC.Types.Pane or TC.Types.Node");
        }
    };

    TC.Types.Flow.prototype.startChild = function(definition, data) {
        definition = createDefinition(this, definition);
        this.saga.startChild(definition, data);
        return this;
    };

    TC.Types.Flow.prototype.navigate = function (pathOrOptions, data) {
        this.node.navigate(pathOrOptions, data);
    };
    
    // This keeps a separate collection of sagas bound to this flow's lifetime
    // It would be nice to make them children of the underlying saga, but
    // then they would end any time a message was executed.
    TC.Types.Flow.prototype.startSaga = function (definition, data) {
        var saga = this.pubsub.startSaga(definition, data);
        this.sagas.push(saga);
        return saga;
    };

    // flow helpers
    TC.Types.Flow.prototype.to = function (pathOrOptions, data) {
        var node = this.node;
        return function () {
            node.navigate(pathOrOptions, data);
        };
    };

    TC.Types.Flow.prototype.endsAt = function (pathOrOptions, data) {
        var flow = this;
        return function () {
            flow.node.navigate(pathOrOptions, data);
            flow.end();
        };
    };

    TC.Types.Flow.prototype.start = function(flow, data) {
        var thisFlow = this;
        return function() {
            thisFlow.startChild(flow, data);
        };
    };


    // This is reused by Node and Pane
    TC.Types.Flow.startFlow = function (definition, data) {
        return new TC.Types.Flow(this, definition).start(data);
    };
    
    function createDefinition(flow, definition) {
        if (definition.constructor === Function)
            definition = new definition(flow);
        return definition;
    }
})();