window.eval("(function() {\n    var pubsub;\n    var channel;\n\n    module('Channel', {\n        setup: function() {\n            pubsub = new Tribe.PubSub({ sync: true });\n            channel = pubsub.channel('channel');\n        }\n    });\n\n    test(\"Channel publishes messages with channelId set\", function () {\n        var spy = sinon.spy();\n        pubsub.subscribe('*', spy);\n        channel.publish('topic');\n        ok(spy.calledOnce);\n        equal(spy.firstCall.args[1].channelId, 'channel');\n    });\n\n    test(\"Channel only subscribes to messages with correct channelId set\", function() {\n        var spy = sinon.spy();\n        channel.subscribe('topic', spy);\n        pubsub.publish({ topic: 'topic' });\n        pubsub.publish({ topic: 'topic', channelId: 'other' });\n        equal(spy.callCount, 0);\n        pubsub.publish({ topic: 'topic', channelId: 'channel' });\n        equal(spy.callCount, 1);\n        channel.publish({ topic: 'topic' });\n        equal(spy.callCount, 2);\n    });\n\n    test(\"Channel unsubscribe works as expected\", function() {\n        var spy = sinon.spy();\n        var token = channel.subscribe('topic', spy);\n        channel.publish({ topic: 'topic' });\n        equal(spy.callCount, 1);\n        channel.unsubscribe(token);\n        channel.publish({ topic: 'topic' });\n        equal(spy.callCount, 1);\n    });\n\n    //test(\"\", function () {\n    //});\n\n    //test(\"\", function () {\n    //});\n\n    //test(\"\", function () {\n    //});\n})();\n//@ sourceURL=tribe://Channel.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('exceptions', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    test(\"when handleExceptions is true, publishSync should call all subscribers, even if there are exceptions\", function () {\n        var spy = sinon.spy();\n\n        pubsub.subscribe(\"0\", errorFunction);\n        pubsub.subscribe(\"0\", spy);\n\n        pubsub.publishSync(\"0\");\n\n        ok(spy.called);\n    });\n\n    test(\"when handleExceptions is true, exceptionHandler is called when exception occurs in subscriber\", function () {\n        var oldHandler = Tribe.PubSub.options.exceptionHandler;\n        Tribe.PubSub.options.exceptionHandler = sinon.spy();\n\n        pubsub.subscribe(\"0\", errorFunction);\n        pubsub.publishSync(\"0\");\n\n        ok(Tribe.PubSub.options.exceptionHandler.called);\n        Tribe.PubSub.options.exceptionHandler = oldHandler;\n    });\n\n    test(\"when handleExceptions is false, exceptions thrown in subscribers will be unhandled\", function() {\n        Tribe.PubSub.options.handleExceptions = false;\n\n        raises(function() {\n            pubsub.subscribe(\"0\", errorFunction);\n            pubsub.publishSync(\"0\");\n        });\n\n        Tribe.PubSub.options.handleExceptions = true;\n    });\n    \n    function errorFunction() {\n        throw ('some error');\n    }\n})();\n\n//@ sourceURL=tribe://exceptions.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('Lifetime', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    test(\"lifetime subscribers are called as normal\", function() {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy1);\n        var lifetime = pubsub.createLifetime();\n        lifetime.subscribe(\"0\", spy2);\n        pubsub.publishSync(\"0\");\n\n        ok(spy1.called);\n        ok(spy2.called);\n    });\n    \n    test(\"lifetime subscribers are not called after end\", function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy1);\n        var lifetime = pubsub.createLifetime();\n        lifetime.subscribe(\"0\", spy2);\n        lifetime.end();\n        pubsub.publishSync(\"0\");\n\n        ok(spy1.called);\n        ok(spy2.notCalled);\n    });\n\n    test(\"lifetime handles hash of subscribers\", function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n\n        var lifetime = pubsub.createLifetime();\n        lifetime.subscribe({ \"0\": spy1, \"1\": spy2 });\n        lifetime.end();\n        pubsub.publishSync(\"0\");\n        pubsub.publishSync(\"1\");\n\n        ok(spy1.notCalled);\n        ok(spy2.notCalled);\n    });\n\n    test(\"messages published through lifetime are published to other subscribers\", function() {\n        var spy = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy);\n        var lifetime = pubsub.createLifetime();\n        lifetime.publishSync(\"0\");\n\n        ok(spy.calledOnce);\n    });\n\n    test(\"nested lifetime subscribers are removed by parent\", function() {\n        var spy = sinon.spy();\n\n        var lifetime1 = pubsub.createLifetime();\n        var lifetime2 = lifetime1.createLifetime();\n        lifetime2.subscribe(\"0\", spy);\n        lifetime1.end();\n        pubsub.publishSync(\"0\");\n\n        ok(spy.notCalled);\n    });\n\n    test(\"parent lifetime subscribers are not removed by nested lifetimes\", function() {\n        var spy = sinon.spy();\n\n        var lifetime1 = pubsub.createLifetime();\n        var lifetime2 = lifetime1.createLifetime();\n        lifetime1.subscribe(\"0\", spy);\n        lifetime2.end();\n        pubsub.publishSync(\"0\");\n\n        ok(spy.calledOnce);\n    });\n\n    test(\"publishing through nested lifetimes triggers subscribers on owner\", function() {\n        var spy = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy);\n        var lifetime1 = pubsub.createLifetime();\n        var lifetime2 = lifetime1.createLifetime();\n        lifetime2.publishSync(\"0\");\n\n        ok(spy.calledOnce);\n    });\n\n    test(\"lifetime.owner returns containing PubSub object\", function() {\n        var lifetime1 = pubsub.createLifetime();\n        var lifetime2 = lifetime1.createLifetime();\n        equal(lifetime1.owner, pubsub);\n        equal(lifetime2.owner, pubsub);\n    });\n})();\n\n//@ sourceURL=tribe://Lifetime.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('core.publish', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    test(\"publish should call all subscribers for a message exactly once\", function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy1);\n        pubsub.subscribe(\"0\", spy2);\n\n        pubsub.publishSync(\"0\", \"test\");\n\n        ok(spy1.calledOnce);\n        ok(spy2.calledOnce);\n    });\n\n    test(\"publish should only call subscribers of the published message\", function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy1);\n        pubsub.subscribe(\"1\", spy2);\n\n        pubsub.publishSync(\"0\", \"test\");\n\n        ok(spy1.called);\n        equal(spy2.callCount, 0);\n    });\n\n    test(\"publish should call subscribers with data as first argument\", function () {\n        var spy = sinon.spy();\n\n        pubsub.subscribe(\"0\", spy);\n        pubsub.publishSync(\"0\", \"1\");\n\n        ok(spy.calledWith(\"1\"));\n    });\n\n    test(\"publish should publish asynchronously\", function () {\n        var setTimeout = stubSetTimeout();\n        if (setTimeout) {\n            var spy = sinon.spy();\n\n            pubsub.subscribe(\"0\", spy);\n            pubsub.publish(\"0\", \"1\");\n            ok(setTimeout.calledOnce);\n\n            setTimeout.restore();\n        } else ok(true, \"Unable to spy on window.setTimeout.\");\n    });\n\n    test(\"publishSync should publish synchronously\", function () {\n        var setTimeout = stubSetTimeout();\n        if (setTimeout) {\n            var spy = sinon.spy();\n\n            pubsub.subscribe(\"0\", spy);\n            pubsub.publishSync(\"0\", \"1\");\n            ok(setTimeout.notCalled);\n\n            setTimeout.restore();\n        } else ok(true, \"Unable to spy on window.setTimeout.\");\n    });\n\n    test(\"publish accepts evelope as first parameter\", function () {\n        var spy = sinon.spy();\n\n        pubsub.subscribe('testMessage', spy);\n        pubsub.publish({ topic: 'testMessage', data: 'test', sync: true });\n\n        ok(spy.calledWith('test'));\n    });\n    \n    function stubSetTimeout() {\n        try {\n            return sinon.stub(window, 'setTimeout');\n        } catch (ex) { }\n    }\n})();\n\n//@ sourceURL=tribe://PubSub.publish.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('core.subscribe', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    test(\"subscribe method should return different tokens\", function () {\n        var token1 = pubsub.subscribe(\"0\", function () { });\n        var token2 = pubsub.subscribe(\"1\", function () { });\n        notEqual(token1, token2);\n    });\n\n    test('passing map of handlers to subscribe returns correct number of string tokens', function () {\n        var tokens = pubsub.subscribe({\n            'test': function () { },\n            'test2': function () { }\n        });\n        equal(tokens.length, 2, 'Return type has correct length');\n        ok(tokens[0].constructor === String);\n        ok(tokens[1].constructor === String);\n    });\n\n    test('passing map of handlers to subscribe correctly subscribes messages', function () {\n        var spy1 = sinon.spy(), spy2 = sinon.spy();\n        pubsub.subscribe({\n            'test': spy1,\n            'test2': spy2\n        });\n\n        pubsub.publishSync('test');\n        ok(spy1.called, \"First subscription successful\");\n\n        pubsub.publishSync('test2');\n        ok(spy2.called, \"Second subscription successful\");\n    });\n\n    test('passing array of handlers to subscribe returns correct number of string tokens', function () {\n        var tokens = pubsub.subscribe(['test', 'test2'], function () { });\n        equal(tokens.length, 2, 'Return type has correct length');\n        ok(tokens[0].constructor === String);\n        ok(tokens[1].constructor === String);\n    });\n\n    test('passing array of handlers to subscribe correctly subscribes messages', function () {\n        var spy = sinon.spy();\n        pubsub.subscribe(['test', 'test2'], spy);\n\n        pubsub.publishSync('test');\n        pubsub.publishSync('test2');\n        ok(spy.calledTwice, \"Both subscriptions triggered\");\n    });\n})();\n\n//@ sourceURL=tribe://PubSub.subscribe.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('core.unsubscribe', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    test(\"unsubscribe method should return token when successful\", function () {\n        var token = pubsub.subscribe(\"0\");\n        var result = pubsub.unsubscribe(token);\n        equal(result, token);\n    });\n\n    test(\"unsubscribe method should return false when unsuccesful\", function () {\n        var result = pubsub.unsubscribe(\"0\");\n        equal(result, false);\n\n        // now let's try unsubscribing the same method twice\n        var token = pubsub.subscribe(\"0\");\n        pubsub.unsubscribe(token);\n        equal(pubsub.unsubscribe(token), false);\n    });\n\n    test('passing array of tokens to unsubscribe correctly unsubscribes messages', function () {\n        var spy1 = sinon.spy(), spy2 = sinon.spy();\n        var tokens = pubsub.subscribe({\n            'test': spy1,\n            'test2': spy2\n        });\n        pubsub.unsubscribe(tokens);\n\n        pubsub.publishSync('test');\n        ok(!spy1.called, \"First subscription successful\");\n\n        pubsub.publishSync('test2');\n        ok(!spy2.called, \"Second subscription successful\");\n    });\n})();\n\n//@ sourceURL=tribe://PubSub.unsubscribe.tests.js");

window.eval("(function () {\n    var spy;\n    var definition;\n    var pubsub;\n\n    module('Saga', {\n        setup: function () {\n            pubsub = new Tribe.PubSub({ sync: true });\n            definition = createDefinition();\n            spy = sinon.spy();\n        }\n    });\n\n    test(\"constructor arguments are passed to definition constructor\", function () {\n        expect(3);\n        var s = new Tribe.PubSub.Saga(pubsub, constructor, 'arg1', 'arg2');\n        function constructor(saga, arg1, arg2) {\n            equal(saga.pubsub.owner, pubsub);\n            equal(arg1, 'arg1');\n            equal(arg2, 'arg2');\n        }\n    });\n\n    test(\"arguments passed to pubsub.startSaga are passed to definition constructor\", function () {\n        expect(3);\n        var s = pubsub.startSaga(constructor, 'arg1', 'arg2');\n        function constructor(saga, arg1, arg2) {\n            equal(saga.pubsub.owner, pubsub);\n            equal(arg1, 'arg1');\n            equal(arg2, 'arg2');\n        }\n    });\n\n    test(\"arguments passed to lifetime.startSaga are passed to definition constructor\", function () {\n        expect(3);\n        var s = pubsub.createLifetime().startSaga(constructor, 'arg1', 'arg2');\n        function constructor(saga, arg1, arg2) {\n            equal(saga.pubsub.owner, pubsub);\n            equal(arg1, 'arg1');\n            equal(arg2, 'arg2');\n        }\n    });\n\n    test(\"handler is executed with correct arguments when topic is published\", function () {\n        definition.handles = { 'testTopic': spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('testTopic', 'data');\n\n        ok(spy.calledOnce);\n        equal(spy.firstCall.args[0], 'data');\n        equal(spy.firstCall.args[1].data, 'data');\n        equal(spy.firstCall.args[2], saga);\n    });\n\n    test(\"onstart handler is executed when saga is started\", function () {\n        definition.handles = { onstart: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition);\n        ok(spy.notCalled);\n        saga.start();\n        ok(spy.calledOnce);\n    });\n\n    test(\"onstart is called with argument passed to start\", function () {\n        definition.handles = { onstart: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start('arg');\n        ok(spy.calledOnce);\n        equal(spy.firstCall.args[0], 'arg');\n        equal(spy.firstCall.args[1], saga);\n    });\n\n    test(\"onend handler is executed when saga is ended\", function () {\n        definition.handles = { onend: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        ok(spy.notCalled);\n        saga.end();\n        ok(spy.calledOnce);\n    });\n\n    test(\"onend handler is called wtih argument passed to end\", function () {\n        definition.handles = { onend: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        saga.end('arg');\n        equal(spy.firstCall.args[0], 'arg');\n        equal(spy.firstCall.args[1], saga);\n    });\n\n    test(\"onstart and onend handlers are not executed when topics are published\", function () {\n        definition.handles = { onstart: spy, onend: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('onstart');\n        pubsub.publish('onend');\n        ok(spy.calledOnce);\n    });\n\n    test(\"startChild starts child and adds to children\", function () {\n        var child = createDefinition({ onstart: spy });\n        var saga = new Tribe.PubSub.Saga(pubsub, definition);\n        saga.startChild(child);\n        ok(spy.calledOnce);\n        equal(saga.children.length, 1);\n    });\n\n    test(\"startChild passes arguments to definition constructor\", function () {\n        expect(2);\n        var child = function(childSaga, arg1, arg2) {\n            this.handles = {\n                onstart: function() {\n                    equal(arg1, 'arg1');\n                    equal(arg2, 2);\n                }\n            };\n        };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition);\n        saga.startChild(child, 'arg1', 2);\n    });\n\n    test(\"end calls end on any children with data passed\", function () {\n        var child = createDefinition({ onend: spy });\n        var saga = new Tribe.PubSub.Saga(pubsub, definition);\n        saga.startChild(child);\n        saga.end('arg');\n        ok(spy.calledOnce);\n        equal(spy.firstCall.args[0], 'arg');\n    });\n\n    test(\"Saga ends when null handler is executed\", function () {\n        definition.handles = { 'endTopic': null, onend: spy };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('endTopic');\n        ok(definition.handles.onend.calledOnce);\n    });\n\n    test(\"Child saga is started when child handler is executed\", function () {\n        definition.handles = {\n            'startChild': {\n                'childTopic': spy\n            }\n        };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('childTopic');\n        ok(spy.notCalled);\n        pubsub.publish('startChild');\n        pubsub.publish('childTopic');\n        ok(spy.calledOnce);\n    });\n\n    test(\"Children are ended when parent message is received\", function () {\n        definition.handles = {\n            'startChild': {\n                'childTopic': spy\n            },\n            'parentTopic': function () { }\n        };\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('startChild');\n        pubsub.publish('childTopic');\n        pubsub.publish('parentTopic');\n        pubsub.publish('childTopic');\n        ok(spy.calledOnce);\n    });\n\n    test(\"Children are not ended when parent message is received if endsChildrenExplicitly is set\", function () {\n        definition.handles = {\n            'startChild': {\n                'childTopic': spy\n            },\n            'parentTopic': function () { }\n        };\n        definition.endsChildrenExplicitly = true;\n        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();\n        pubsub.publish('startChild');\n        pubsub.publish('childTopic');\n        pubsub.publish('parentTopic');\n        pubsub.publish('childTopic');\n        ok(spy.calledTwice);\n    });\n\n    function createDefinition(handlers) {\n        return {\n            pubsub: pubsub,\n            handles: handlers\n        };\n    }\n})();\n\n//@ sourceURL=tribe://Saga.tests.js");

window.eval("(function () {\n    var pubsub;\n\n    module('subscribeOnce', {\n        setup: function () { pubsub = new Tribe.PubSub(); }\n    });\n\n    // add some subscribers around the subscribeOnce to ensure it is unsubscribed correctly.\n    test('subscribeOnce publishes message to single subscriber only once', function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n        var spy3 = sinon.spy();\n\n        pubsub.subscribe('test', spy1);\n        pubsub.subscribeOnce('test', spy2);\n        pubsub.subscribe('test', spy3);\n        pubsub.publishSync('test');\n        pubsub.publishSync('test');\n        ok(spy1.calledTwice);\n        ok(spy2.calledOnce);\n        ok(spy3.calledTwice);\n    });\n\n    test(\"subscribeOnce publishes message to map of subscribers only once\", function () {\n        var spy = sinon.spy();\n        pubsub.subscribeOnce({ 'test1': spy, 'test2': spy });\n        pubsub.publishSync('test1');\n        pubsub.publishSync('test1');\n        pubsub.publishSync('test2');\n        ok(spy.calledOnce);\n    });\n\n    test(\"subscribeOnce publishes message to array of subscribers only once\", function () {\n        var spy = sinon.spy();\n        pubsub.subscribeOnce([ 'test1', 'test2'], spy);\n        pubsub.publishSync('test1');\n        pubsub.publishSync('test1');\n        pubsub.publishSync('test2');\n        ok(spy.calledOnce);\n    });\n\n    test(\"subscribeOnce functions correctly in a lifetime\", function () {\n        var spy1 = sinon.spy();\n        var spy2 = sinon.spy();\n        var spy3 = sinon.spy();\n\n        pubsub.subscribe('test', spy1);\n        var lifetime = pubsub.createLifetime();\n        lifetime.subscribeOnce('test', spy2);\n        lifetime.subscribe('test', spy3);\n        \n        pubsub.publishSync('test');\n        pubsub.publishSync('test');\n        lifetime.end();\n        pubsub.publishSync('test');\n        \n        ok(spy1.calledThrice);\n        ok(spy2.calledOnce);\n        ok(spy3.calledTwice);\n    });\n})();\n\n//@ sourceURL=tribe://subscribeOnce.tests.js");

window.eval("(function() {\n    var list;\n\n    module(\"SubscriberList\", {\n        setup: function () { list = new Tribe.PubSub.SubscriberList(); }\n    });\n\n    test(\"add returns consecutive tokens\", function () {\n        equal(list.add(), \"0\");\n        equal(list.add(), \"1\");\n    });\n\n    test(\"remove returns token if removed\", function() {\n        var token = list.add(\"0\");\n        equal(list.remove(token), token);\n    });\n\n    test(\"remove returns false if not removed\", function () {\n        list.add(\"0\");\n        equal(list.remove(\"1\"), false);\n    });\n\n    test(\"get returns subscribers to specific topic\", function() {\n        list.add(\"0\", \"0\");\n        list.add(\"0\", \"1\");\n        list.add(\"2\", \"2\");\n\n        var subscribers = list.get(\"0\");\n        equal(subscribers.length, 2);\n        equal(subscribers[0].handler, \"0\");\n        equal(subscribers[1].handler, \"1\");\n    });\n\n    test(\"get includes global wildcard\", function () {\n        list.add(\"0\", \"0\");\n        list.add(\"*\", \"1\");\n        list.add(\"1\", \"2\");\n\n        var subscribers = list.get(\"0\");\n        equal(subscribers.length, 2);\n        equal(subscribers[0].handler, \"0\");\n        equal(subscribers[1].handler, \"1\");\n    });\n\n    test(\"global wildcard matches all topics\", function() {\n        list.add(\"*\", \"1\");\n        equal(list.get(\"0\").length, 1);\n        equal(list.get(\"00\").length, 1);\n        equal(list.get(\"0.0\").length, 1);\n        equal(list.get(\"0.0.0\").length, 1);\n    });\n\n    test(\"get includes child wildcard\", function () {\n        list.add(\"0.0\", \"0\");\n        list.add(\"0.*\", \"1\");\n        list.add(\"0.1\", \"2\");\n\n        var subscribers = list.get(\"0.0\");\n        equal(subscribers.length, 2);\n        equal(subscribers[0].handler, \"0\");\n        equal(subscribers[1].handler, \"1\");\n    });\n\n    test(\"get includes embedded wildcard\", function () {\n        list.add(\"0.0.0\", \"0\");\n        list.add(\"0.*.0\", \"1\");\n        list.add(\"0.1.0\", \"2\");\n\n        var subscribers = list.get(\"0.0.0\");\n        equal(subscribers.length, 2);\n        equal(subscribers[0].handler, \"0\");\n        equal(subscribers[1].handler, \"1\");\n    });\n\n    test(\"publish matches topics correctly\", function () {\n        list.add(\"test\", {});\n        list.add(\"testtest\", {});\n        list.add(\"1test\", {});\n        list.add(\"test1\", {});\n        list.add(\"1test1\", {});\n\n        equal(list.get(\"test\").length, 1);\n        equal(list.get(\"testtest\").length, 1);\n        equal(list.get(\"1test\").length, 1);\n        equal(list.get(\"test1\").length, 1);\n        equal(list.get(\"1test1\").length, 1);\n    });\n})();\n\n//@ sourceURL=tribe://SubscriberList.tests.js");

window.eval("(function () {\n    module(\"utils\");\n\n    var utils = Tribe.PubSub.utils;\n    // these tests taken from the underscore library. Licensing at http://underscorejs.org.\n\n    test(\"each\", function () {\n        utils.each([1, 2, 3], function (num, i) {\n            equal(num, i + 1, 'each iterators provide value and iteration count');\n        });\n\n        var answers = [];\n        utils.each([1, 2, 3], function (num) { answers.push(num * this.multiplier); }, { multiplier: 5 });\n        equal(answers.join(', '), '5, 10, 15', 'context object property accessed');\n\n        answers = [];\n        var obj = { one: 1, two: 2, three: 3 };\n        obj.constructor.prototype.four = 4;\n        utils.each(obj, function (value, key) { answers.push(key); });\n        equal(answers.join(\", \"), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');\n        delete obj.constructor.prototype.four;\n\n        answers = 0;\n        utils.each(null, function () { ++answers; });\n        equal(answers, 0, 'handles a null properly');\n    });\n\n    test('map', function () {\n        var doubled = utils.map([1, 2, 3], function (num) { return num * 2; });\n        equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');\n\n        var tripled = utils.map([1, 2, 3], function (num) { return num * this.multiplier; }, { multiplier: 3 });\n        equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');\n\n        var ifnull = utils.map(null, function () { });\n        ok(utils.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');\n    });\n\n    test('applyToConstructor', function () {\n        expect(2);\n        \n        // current implementation does not support Date\n        //deepEqual(\n        //    utils.applyToConstructor(Date, [2008, 10, 8, 00, 16, 34, 254]),\n        //    new Date(2008, 10, 8, 00, 16, 34, 254));\n\n        utils.applyToConstructor(constructor, ['arg1', 'arg2']);\n        \n        function constructor(arg1, arg2) {\n            equal(arg1, 'arg1');\n            equal(arg2, 'arg2');\n        }\n    });\n})();\n\n//@ sourceURL=tribe://utils.tests.js");
