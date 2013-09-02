window.eval("(function() {\n    var hub;\n    var pubsub;\n    var publisher;\n\n    var testMessage = { test: 'message' };\n    var stringified = JSON.stringify(testMessage);\n\n    module('Client', {\n        setup: function () {\n            mockSignalR();\n            pubsub = mockPubSub();\n            publisher = mockPublisher();\n            hub = new Tribe.MessageHub.Client(pubsub, $.connection.hubImplementation, publisher);\n        }\n    });\n\n    test(\"acceptServerMessage publishes message to pubsub\", function() {\n        $.connection.hubImplementation.client.acceptServerMessage(stringified);\n        ok(pubsub.publish.calledOnce);\n        ok(pubsub.publish.firstCall.args[0].server);\n        equal(pubsub.publish.firstCall.args[0].test, 'message');\n    });\n\n    test(\"joinChannel subscribes to specified messages\", function () {\n        var options = { serverEvents: ['test', 'test2'] };\n        TMH.initialise(pubsub);\n        TMH.joinChannel('', options);\n        ok(pubsub.subscribe.calledOnce);\n        equal(pubsub.subscribe.firstCall.args[0], options.serverEvents);\n    });\n\n    test(\"joinChannel joins server channel\", function () {\n        TMH.initialise(pubsub);\n        TMH.joinChannel('channel', true);\n        ok($.connection.hubImplementation.server.joinChannel.calledOnce);\n        equal($.connection.hubImplementation.server.joinChannel.args[0], 'channel');\n    });\n\n    test(\"joinChannel replays messages when second argument is true\", function () {\n        TMH.initialise(pubsub);\n        TMH.joinChannel('channel', true);\n        ok($.connection.hubImplementation.server.replayChannel.calledOnce);\n        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');\n    });\n\n    test(\"joinChannel replays messages when option passed\", function() {\n        var options = { replay: true };\n        TMH.initialise(pubsub);\n        TMH.joinChannel('channel', options);\n        ok($.connection.hubImplementation.server.replayChannel.calledOnce);\n        equal($.connection.hubImplementation.server.replayChannel.args[0], 'channel');\n    });\n\n    test(\"channel publishes specified messages to server\", function () {\n        var subscriber = getChannelSubscriber();\n        subscriber(null, testMessage);\n        ok(publisher.publishToServer.calledOnce);\n        equal(publisher.publishToServer.firstCall.args[1], testMessage);\n        equal(publisher.publishToServer.firstCall.args[2], undefined);\n    });\n    \n    test(\"channel sets record option on server envelopes if option is set\", function () {\n        var subscriber = getChannelSubscriber(true);\n        subscriber(null, testMessage);\n        ok(publisher.publishToServer.calledOnce);\n        equal(publisher.publishToServer.firstCall.args[2], true);\n    });\n\n    test(\"joinChannel and publishToServer calls are queued until connected\", function () {\n        var deferred = $.Deferred();\n        $.connection.hub.start = function () { return deferred; };\n        TMH.initialise(pubsub);\n        TMH.joinChannel('channel');\n        TMH.publishToServer('channel', {});\n        ok($.connection.hubImplementation.server.joinChannel.notCalled);\n        ok($.connection.hubImplementation.server.publish.notCalled);\n        deferred.resolve();\n        ok($.connection.hubImplementation.server.joinChannel.calledOnce);\n        ok($.connection.hubImplementation.server.publish.calledOnce);\n    });\n\n    function getChannelSubscriber(record) {\n        hub.joinChannel('1', { serverEvents: ['test'], record: record });\n        return pubsub.subscribe.firstCall.args[1];\n    }\n})();\n//@ sourceURL=tribe://Client.tests.js");
window.eval("(function() {\n    var hub;\n    var pubsub;\n    var publisher;\n\n    module('Publisher', {\n        setup: function () {\n            mockSignalR();\n            pubsub = mockPubSub();\n            publisher = new Tribe.MessageHub.Publisher($.connection.hubImplementation);\n        }\n    });\n\n    test(\"message is not published if not connected\", function() {\n        $.connection.hubImplementation.connection.state = 0;\n        publisher.publishToServer('', {});\n        ok($.connection.hubImplementation.server.publish.notCalled);\n    });\n    \n    test(\"queued messages are published when reconnected\", function () {\n        $.connection.hubImplementation.connection.state = 0;\n        publisher.publishToServer('', {});\n        publisher.publishToServer('', {});\n        ok($.connection.hubImplementation.server.publish.notCalled);\n        executeStateChanged(1);\n        ok($.connection.hubImplementation.server.publish.calledTwice);\n    });\n\n    test(\"publishToServer ignores server messages\", function () {\n        publisher.publishToServer('', { server: true });\n        ok($.connection.hubImplementation.server.publish.notCalled);\n    });\n\n\n    function executeStateChanged(newState) {\n        $.connection.hubImplementation.connection.state = newState;\n        var handler = $.connection.hubImplementation.connection.stateChanged.firstCall.args[0];\n        return handler({ newState: newState });\n    }\n})();\n//@ sourceURL=tribe://Publisher.tests.js");
