﻿module('Unit.Utilities.collections');

test("each executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    T.each(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("each executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    T.each({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map executes iterator for each item of array, passing value and index", function () {
    var spy = sinon.spy();
    T.map(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("map executes iterator for each property of object, passing value and property name", function () {
    var spy = sinon.spy();
    T.map({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("map does not flatten arrays", function() {
    var result = T.map([1, 2], function () { return [3, 4]; });
    equal(result.length, 2);
    deepEqual(result[0], [3, 4]);
    deepEqual(result[1], [3, 4]);
});

test("map returns empty array for undefined input", function() {
    var spy = sinon.spy();
    deepEqual(T.map(undefined, spy), []);
    ok(spy.notCalled);
});

test("filter executes once for each item of array", function() {
    var spy = sinon.spy();
    T.filter(['1', '2'], spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 0);
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 1);
});

test("filter executes once for each property of object", function () {
    var spy = sinon.spy();
    T.filter({ test1: '1', test2: '2' }, spy);
    ok(spy.calledTwice);
    equal(spy.firstCall.args[0], '1');
    equal(spy.firstCall.args[1], 'test1');
    equal(spy.secondCall.args[0], '2');
    equal(spy.secondCall.args[1], 'test2');
});

test("filter returns array of values filtered by iterator function", function() {
    var result = T.filter(['1', '2'], function (item) { return item !== '1'; });
    equal(result.length, 1);
    equal(result[0], '2');
});

test("filter returns empty array for undefined input", function () {
    var spy = sinon.spy();
    deepEqual(T.filter(undefined, spy), []);
    ok(spy.notCalled);
});