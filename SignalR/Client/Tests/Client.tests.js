﻿(function() {
    var hub;
    var pubsub;
    var publisher;

    var testMessage = { test: 'message' };
    var stringified = JSON.stringify(testMessage);

    module('Client', {
        setup: function () {
            mockSignalR();
            pubsub = mockPubSub();
            publisher = mockPublisher();
            hub = new Tribe.SignalR.Client(pubsub, $.connection.hubImplementation, publisher);
        }
    });

    test("acceptServerMessage publishes message to pubsub", function() {
        $.connection.hubImplementation.client.acceptServerMessage(stringified);
        ok(pubsub.publish.calledOnce);
        ok(pubsub.publish.firstCall.args[0].server);
        equal(pubsub.publish.firstCall.args[0].test, 'message');
    });

    test("joinChannel subscribes to specified messages", function () {
        var options = { serverEvents: ['test', 'test2'] };
        TMH.initialise(pubsub);
        TMH.joinChannel('', options);
        ok(pubsub.subscribe.calledOnce);
        equal(pubsub.subscribe.firstCall.args[0], options.serverEvents);
    });

    test("joinChannel joins server channel", function () {
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', true);
        ok($.connection.hubImplementation.server.joinChannel.calledOnce);
        equal($.connection.hubImplementation.server.joinChannel.args[0], 'channel');
    });

    test("joinChannel replays messages when second argument is true", function () {
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', true);
        ok($.connection.hubImplementation.server.replayChannel.calledOnce);
        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');
    });

    test("joinChannel replays messages when option passed", function() {
        var options = { replay: true };
        TMH.initialise(pubsub);
        TMH.joinChannel('channel', options);
        ok($.connection.hubImplementation.server.replayChannel.calledOnce);
        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');
    });

    test("channel publishes specified messages to server", function () {
        var subscriber = getChannelSubscriber();
        subscriber(null, testMessage);
        ok(publisher.publishToServer.calledOnce);
        equal(publisher.publishToServer.firstCall.args[1], testMessage);
        equal(publisher.publishToServer.firstCall.args[2], undefined);
    });
    
    test("channel sets record option on server envelopes if option is set", function () {
        var subscriber = getChannelSubscriber(true);
        subscriber(null, testMessage);
        ok(publisher.publishToServer.calledOnce);
        equal(publisher.publishToServer.firstCall.args[2], true);
    });

    test("joinChannel and publishToServer calls are queued until connected", function () {
        var deferred = $.Deferred();
        $.connection.hub.start = function () { return deferred; };
        TMH.initialise(pubsub);
        TMH.joinChannel('channel');
        TMH.publishToServer('channel', {});
        ok($.connection.hubImplementation.server.joinChannel.notCalled);
        ok($.connection.hubImplementation.server.publish.notCalled);
        deferred.resolve();
        ok($.connection.hubImplementation.server.joinChannel.calledOnce);
        ok($.connection.hubImplementation.server.publish.calledOnce);
    });

    function getChannelSubscriber(record) {
        hub.joinChannel('1', { serverEvents: ['test'], record: record });
        return pubsub.subscribe.firstCall.args[1];
    }
})();