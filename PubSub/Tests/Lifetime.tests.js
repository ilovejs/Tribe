﻿(function () {
    var pubsub;

    module('Lifetime', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("lifetime subscribers are called as normal", function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.called);
    });
    
    test("lifetime subscribers are not called after end", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        lifetime.end();
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.notCalled);
    });

    test("lifetime handles hash of subscribers", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        var lifetime = pubsub.createLifetime();
        lifetime.subscribe({ "0": spy1, "1": spy2 });
        lifetime.end();
        pubsub.publishSync("0");
        pubsub.publishSync("1");

        ok(spy1.notCalled);
        ok(spy2.notCalled);
    });

    test("messages published through lifetime are published to other subscribers", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime = pubsub.createLifetime();
        lifetime.publishSync("0");

        ok(spy.calledOnce);
    });

    test("nested lifetime subscribers are removed by parent", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.subscribe("0", spy);
        lifetime1.end();
        pubsub.publishSync("0");

        ok(spy.notCalled);
    });

    test("parent lifetime subscribers are not removed by nested lifetimes", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime1.subscribe("0", spy);
        lifetime2.end();
        pubsub.publishSync("0");

        ok(spy.calledOnce);
    });

    test("publishing through nested lifetimes triggers subscribers on owner", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.publishSync("0");

        ok(spy.calledOnce);
    });

    test("lifetime.owner returns containing PubSub object", function() {
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        equal(lifetime1.owner, pubsub);
        equal(lifetime2.owner, pubsub);
    });
})();
