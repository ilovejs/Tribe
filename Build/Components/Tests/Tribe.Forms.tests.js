window.eval("TF.Tests = {\n    renderTemplate: function (name, model) {\n        var $qunit = $('#qunit-fixture');\n        ko.cleanNode($qunit[0]);\n        $qunit.append($('#template--' + name).html());\n        ko.applyBindings(model, $qunit[0]);\n    }\n}\n//@ sourceURL=tribe://Tests/Infrastructure/helpers.js");
window.eval("(function () {\n    var model;\n    var list = [\n        { value: 1, text: 'One' },\n        { value: 2, text: 'Two' },\n        { value: 3, text: 'Three' }\n    ];\n\n    module('fields', {\n        setup: function () {\n            model = createModel();\n            TF.Tests.renderTemplate('fields', model);\n        }\n    });\n\n    test(\"Labels are rendered correctly\", function () {\n        expect(8);\n        $.each($('.label span'), function () {\n            equal($(this).text(), 'label');\n        });\n    });\n\n    test(\"Existing values are rendered correctly\", function () {\n        equal(getDisplay(0, 'span').html(), 'value');\n        equal(getDisplay(1, 'input').val(), 'text');\n        equal(getDisplay(2, 'input').val(), '01/01/2001');\n        equal(getDisplay(3, 'input').val(), 'password');\n        equal(getDisplay(4, 'select').val(), '2');\n        equal(getDisplay(5, 'select option:checked').text(), 'Two');\n        equal(getDisplay(6, 'input:checked').val(), '2');\n        equal(getDisplay(7, 'input').is(':checked'), true);\n    });\n\n    test(\"Model values are updated\", function () {\n        getDisplay(1, 'input').val('new').change();\n        getDisplay(2, 'input').val('02/02/2002').change();\n        getDisplay(3, 'input').val('abc123').change();\n        getDisplay(4, 'select').val('3').change();\n        getDisplay(5, 'select').prop('selectedIndex', 2).change();\n        getDisplay(6, 'input:eq(2)').click().click(); // not sure, but it works...\n        getDisplay(7, 'input').click();\n\n        equal(model.text(), 'new');\n        equal(model.date(), '02/02/2002');\n        equal(model.password(), 'abc123');\n        equal(model.simpleSelect(), '3');\n        equal(model.objectSelect(), list[2]);\n        equal(model.radio(), '3');\n        equal(model.boolean(), false);\n    });\n\n    test(\"Displayed values are updated\", function () {\n        model.display('new');\n        model.text('new');\n        model.date('02/02/2002');\n        model.password('abc123');\n        model.simpleSelect('3');\n        model.objectSelect(list[2]);\n        model.radio('3');\n        model.boolean(false);\n\n        equal(getDisplay(0, 'span').html(), 'new');\n        equal(getDisplay(1, 'input').val(), 'new');\n        equal(getDisplay(2, 'input').val(), '02/02/2002');\n        equal(getDisplay(3, 'input').val(), 'abc123');\n        equal(getDisplay(4, 'select').val(), '3');\n        equal(getDisplay(5, 'select option:checked').text(), 'Three');\n        equal(getDisplay(6, 'input:checked').val(), '3');\n        equal(getDisplay(7, 'input').is(':checked'), false);\n    });\n\n    function getDisplay(index, tag) {\n        return $('#qunit-fixture .field:eq(' + index + ') .display ' + tag);\n    }\n\n    function createModel() {\n        return {\n            display: ko.observable('value'),\n            text: ko.observable('text'),\n            date: ko.observable('01/01/2001'),\n            password: ko.observable('password'),\n            simpleSelect: ko.observable('2'),\n            objectSelect: ko.observable(list[1]),\n            radio: ko.observable('2'),\n            boolean: ko.observable(true),\n            list: list\n        };\n    };\n})();\n\n//@ sourceURL=tribe://Tests/fields.tests.js");
window.eval("(function () {\n    var model;\n    \n    module('forms', {\n        setup: function () {\n            model = {\n                data: { text: ko.observable('test') },\n            };\n            TF.Tests.renderTemplate('forms', model);\n        }\n    });\n\n    test(\"Existing field renders\", function () {\n        equal($('.existing input').val(), 'test');\n    });\n    \n    test(\"properties are created on existing objects in create mode\", function() {\n        equal(model.data.text2(), 'test');\n    });\n\n    test(\"objects are created on existing objects in create mode\", function() {\n        equal(model.data.created.text3(), 'test');\n    });\n    \n    test(\"new objects are created\", function () {\n        expect(2);\n        $('#testButton').click();\n        delete window.testCreatedObject;\n    });\n\n    window.testCreatedObject = function (model) {\n        equal(model.text4(), 'test');\n        equal(model.text5.text6(), 'test');\n    };\n\n})();\n\n//@ sourceURL=tribe://Tests/forms.tests.js");
window.eval("(function () {\n    module('Utils');\n\n    var utils = TF.Utils;\n\n    test(\"evaluateProperty\", function () {\n        var target = {\n            test1: {\n                test11: 'test',\n                test12: {\n                    test121: 'test'\n                }\n            },\n            test2: 'test'\n        };\n\n        equal(utils.evaluateProperty(target, 'test3'), undefined);\n        equal(utils.evaluateProperty(target, 'test3.test4'), undefined);\n        equal(utils.evaluateProperty(target, 'test1.test4'), undefined);\n        equal(utils.evaluateProperty(target, ''), target);\n        equal(utils.evaluateProperty(target, 'test1'), target.test1);\n        equal(utils.evaluateProperty(target, 'test2'), 'test');\n        equal(utils.evaluateProperty(target, 'test1.test11'), 'test');\n        equal(utils.evaluateProperty(target, 'test1.test12.test121'), 'test');\n        equal(utils.evaluateProperty(target, '.test1'), target.test1);\n        equal(utils.evaluateProperty(target, 'test1.'), target.test1);\n        equal(utils.evaluateProperty(target, 'test1..test11'), 'test');\n\n        var container = {};\n        equal(utils.evaluateProperty(target, 'test3', container), container);\n        equal(target.test3, container);\n        utils.evaluateProperty(target, 'test3.test4', 'test');\n        equal(target.test3.test4, 'test');\n\n        utils.evaluateProperty(target, 'test4.test5.test6', 'test');\n        equal(target.test4.test5.test6, 'test');\n    });\n})();\n\n//@ sourceURL=tribe://Tests/Utils.tests.js");
$('head')
    .append('<script type="text/template" id="template--fields"><div data-bind="display: display, displayText: \'label\'"></div>\n<div data-bind="textField: text, displayText: \'label\'"></div>\n<div data-bind="dateField: date, displayText: \'label\'"></div>\n<div data-bind="passwordField: password, displayText: \'label\'"></div>\n<div data-bind="selectField: simpleSelect, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="selectField: objectSelect, displayText: \'label\', items: list, optionsText: \'text\'"></div>\n<div data-bind="radioField: radio, displayText: \'label\', items: [\'1\', \'2\', \'3\']"></div>\n<div data-bind="booleanField: boolean, displayText: \'label\'"></div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--forms"><div class="existing" data-bind="form: data">\n    <div data-bind="textField: text"></div>\n</div>\n\n<div class="createProperties" data-bind="form: data, create: true">\n    <div data-bind="textField: \'text2\', defaultValue: \'test\'"></div>    \n</div>\n\n<div class="createObject" data-bind="form: \'data.created\', create: true">\n    <div data-bind="textField: \'text3\', defaultValue: \'test\'"></div>        \n</div>\n\n<div class="newObject" data-bind="form: {}, create: true">\n    <div data-bind="textField: \'text4\', defaultValue: \'test\'"></div>\n    <div data-bind="textField: \'text5.text6\', defaultValue: \'test\'"></div>\n    <button id="testButton" data-bind="click: testCreatedObject"></button>\n</div></script>');