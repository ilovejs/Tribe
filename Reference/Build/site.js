Article = {
    show: function (section, topic) {
        return function () {
            TC.nodeFor('.content').pane.pubsub.publish('article.show', { section: section, topic: topic });
        };
    }
};var articleUrlProvider = {
    urlDataFrom: function(options) {
        return {
            url: Navigation.isHome(options.data) ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
        };
    },
    paneOptionsFrom: function (querystring) {
        if (querystring) {
            var options = TC.Utils.Querystring.parse(querystring);
            return {
                path: '/Interface/content',
                data: {
                    section: options.section,
                    topic: options.topic
                }
            };
        }
    }
};Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'home';
    },
    Guides: {
        'Guides': {
            'Features': 'features',
            'Getting Started': 'getStarted',
            'Working With Panes': 'panes',
            'Webmail Tutorial': 'webmail',
        }
    },
    Reference: {
        'Core': {
            'Panes': 'panes',
            'Transitions': 'transitions',
            'API': 'api',
            'Global Options': 'options',
        },
        'Types': {
            'History': 'History',
            'Loader': 'Loader',
            'Logger': 'Logger',
            'Models': 'Models',
            'Node': 'Node',
            'Operation': 'Operation',
            'Pane': 'Pane',
            'Pipeline': 'Pipeline',
            'Saga': 'Saga',
            'Templates': 'Templates'
        },
        'Utilities': {
            'Panes': 'panes',
            'Paths': 'paths',
            'Events': 'events',
            'Embedded State': 'embeddedState',
            'Objects': 'objects',
            'Collections': 'collections',
            'Miscellaneous': 'misc',
            'PackScript': 'packScript'
        },
        'PubSub': {
            'Core': 'core',
            'Message Envelopes': 'envelopes',
            'Global Options': 'options',
            },
        'MessageHub': {
            'Configuration': 'configuration',
            'Client API': 'client',
        },
        //'Mobile': {},
        //'Forms': {},
        //'Components': {}
    }
};Reference = {
    Utilities: {},
    Types: {}
};

Tutorials = {};Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;input data-bind="value: task" />\n&lt;button data-bind="click: create">Create&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Declare model constructors using this simple function.\n// Tribe creates an instance and binds it to the template.\n\nTC.registerModel(function (pane) {\n    var self = this;\n    \n    this.task = ko.observable();\n    \n    this.create = function() {\n        pane.pubsub.publish(\'task.create\', self.task());\n        self.task(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            // all the configuration you need!\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Todos&lt;/h1>\n\n&lt;!-- Creating panes is simple -->\n&lt;div data-bind="pane: \'create\'">&lt;/div>\n&lt;div data-bind="pane: \'list\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* CSS can be maintained alongside the \n   template it corresponds with */\n\n.taskList {\n    list-style: none;\n    padding: 0;\n}\n\n.taskList li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n&lt;ul class="taskList" data-bind="foreach: tasks">\n    &lt;li data-bind="pane: \'task\', data: $data">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.tasks = ko.observableArray([\'Sample task\']);\n\n    // Using messages decouples your components.\n    // Tribe cleans up subscriptions automatically.\n    pane.pubsub.subscribe(\'task.create\', function(task) {\n        self.tasks.push(task);\n    });\n\n    pane.pubsub.subscribe(\'task.delete\', function (task) {\n        var index = self.tasks.indexOf(task);\n        self.tasks.splice(index, 1);\n    });\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;button data-bind="click: deleteTask">x&lt;/button>\n&lt;span data-bind="text: task">&lt;/span></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.task = pane.data;\n    \n    this.deleteTask = function() {\n        pane.pubsub.publish(\'task.delete\', self.task);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'sender\'">&lt;/div>\n&lt;div data-bind="pane: \'messages\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Hook up our message hub and join a channel\n    TMH.initialise(pane.pubsub, \'signalr\');\n    TMH.joinChannel(\'chat\', {\n         serverEvents: [\'chat.*\']\n    });\n\n    // The dispose function is called automatically\n    // when the pane is removed from the DOM.\n    this.dispose = function() {\n        TMH.leaveChannel(\'chat\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'chat\'">&lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.messages {\n    list-style: none;\n    padding: 0;\n}\n\n.messages li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="messages" data-bind="foreach: messages">\n    &lt;li>\n        &lt;span data-bind="text: name">&lt;/span>:\n        &lt;span data-bind="text: message">&lt;/span>\n    &lt;/li>\n&lt;/ul>\n</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.messages = ko.observableArray();\n\n    pane.pubsub.subscribe(\'chat.message\',\n        function (message) {\n            self.messages.push(message);\n        });\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="chat">\n    &lt;div>\n        Name: &lt;input data-bind="value: name" />    \n    &lt;/div>\n\n    &lt;div>\n        Message: &lt;input data-bind="value: message" />\n        &lt;button data-bind="click: send">Send&lt;/button>\n    &lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.name = ko.observable(\'Anonymous\');\n    this.message = ko.observable();\n\n    this.send = function() {\n        pane.pubsub.publish(\'chat.message\', {\n            name: self.name(),\n            message: self.message()\n        });\n        self.message(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Let\'s reuse our panes from the previous example -->\n&lt;ul class="rounded">\n    &lt;li data-bind="pane: \'../Chat/sender\'">&lt;/li>\n    &lt;li data-bind="pane: \'../Chat/messages\'">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n  &lt;head>\n    &lt;title>Tribe Mobile&lt;/title>\n    &lt;meta name="viewport" \n      content="minimum-scale=1.0, width=device-width, \n               maximum-scale=1.0, user-scalable=no" />\n\n    &lt;script src="jquery.js">&lt;/script>\n    &lt;script src="knockout.js">&lt;/script>\n    &lt;script src="Tribe.js">&lt;/script>\n    &lt;script src="Tribe.Mobile.js">&lt;/script>\n        \n    &lt;script type="text/javascript">\n      $(TC.run);\n    &lt;/script>\n  &lt;/head>\n  &lt;body data-bind="pane: \'/Mobile/main\',\n                   data: { pane: \'welcome\' }">\n  &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="layout">\n    &lt;ul class="rounded">\n        &lt;li class="forward">Test1&lt;/li>\n        &lt;li class="forward">Test2&lt;/li>\n        &lt;li class="arrow" data-bind="click: function() {}">Test3&lt;/li>\n        &lt;li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }">&lt;/li>\n    &lt;/ul>\n    \n    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div>\n    \n    &lt;button class="white" data-bind="click: overlay">Overlay&lt;/button>\n    &lt;button class="white" data-bind="click: toolbar">Toolbar&lt;/button>\n    &lt;button class="white" data-bind="click: navigate">Navigate&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.title(\'Title!\');\n    TC.toolbar.options([\n        { text: \'test\', func: function () { alert(\'test\'); } },\n        { text: \'test2\', func: function () { alert(\'test2\'); } }\n    ]);\n\n    this.listData = {\n        items: [\n            { id: 1, name: \'test1\' },\n            { id: 2, name: \'test2\' },\n            { id: 3, name: \'test3\' }\n        ],\n        itemText: function (item) { return item.id + \': \' + item.name; },\n        headerText: \'Select Item:\',\n        itemClick: function(item) {\n        },\n        cssClass: \'rounded\'\n    };\n\n    this.overlay = function() {\n        TC.overlay(\'overlay\');\n    };\n\n    this.toolbar = function () {\n        TC.toolbar.visible(!TC.toolbar.visible());\n    };\n\n    this.navigate = function() {\n        pane.navigate(\'navigate\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n    &lt;li>Three&lt;/li>\n    &lt;li>Four&lt;/li>\n&lt;/ul>\n\n&lt;button class="white" data-bind="click: function() { pane.remove(); }">Close&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">ul.welcome li {\n    background: #103070;\n    color: white;\n    text-align: center;\n    text-shadow: 3px 3px 0 black, 5px 5px 5px rgba(0, 0, 0, 0.5);\n    font: bold 64pt \'Cambria\';\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="rounded welcome">\n    &lt;li>tribe&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: samples">Samples&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: chat">Chat&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.defaults.back = true;\n\n    this.samples = function() {\n        pane.navigate(\'layout\');\n    };\n\n    this.chat = function () {\n        pane.navigate(\'chat\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our heading pretty */\n.helloWorld h1 {\n    text-shadow: 3px 3px 0 #AAA;\n}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="helloWorld">\n    &lt;h1>Hello, World!&lt;/h1>\n\n    &lt;!-- Bind our message property -->\n    &lt;span data-bind="text: message">&lt;/span>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Model properties are available for \n    // data binding in your template.\n    this.message = "Message passed: " + pane.data.message;\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Creating Panes&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">$(TC.run)&lt;/script>\n    &lt;/head>\n    \n    &lt;!-- Create a pane and pass it some data -->\n    &lt;body data-bind="pane: \'helloWorld\',\n                     data: { message: \'Test message.\' }">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button>\n\n&lt;!-- New panes will be appended to this element -->\n&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var i = 0;\n    \n    // Dynamically insert a pane into the element\n    // with its class set to "items".\n    this.createPane = function() {\n        TC.appendNode(\'.items\', { path: \'item\', data: ++i });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Creating Panes Dynamically&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'create\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is pane number \n\n    &lt;!-- If our pane doesn\'t have a model, you can access \n         the pane property in data bindings -->\n    &lt;span data-bind="text: pane.data">&lt;/span>.\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Communicating&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.panels > div {\n    margin-bottom: 5px;\n    border: 1px solid black;\n}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="panels">\n    &lt;!-- Pass the shared observable to child panes -->\n\n    &lt;div data-bind="pane: \'sender\',\n                    data: observable">&lt;/div>\n\n    &lt;div data-bind="pane: \'receiver\',\n                    data: observable">&lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Create an observable to share between child panes\n    this.observable = ko.observable(\'Test\');\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    Observable: &lt;span data-bind="text: observable">&lt;/span>\n&lt;/div>\n\n&lt;div>\n    Messages:\n    &lt;ul data-bind="foreach: messages">\n        &lt;li data-bind="text: message">&lt;/li>\n    &lt;/ul>\n&lt;/div>\n</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    // Our shared observable\n    this.observable = pane.data;\n    \n    // Listen for messages and push them onto \n    // an array as they arrive\n    this.messages = ko.observableArray();\n    pane.pubsub.subscribe(\'sample.message\', function (data) {\n        self.messages.push(data);\n    });\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    Observable: &lt;input data-bind="value: observable" />\n&lt;/div>\n\n&lt;div>\n    Message: &lt;input data-bind="value: message"/>\n    &lt;button data-bind="click: send">Send&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    // Our shared observable\n    this.observable = pane.data;\n    \n    // The pubsub object is available through the pane object.\n    this.message = ko.observable();\n    this.send = function() {\n        pane.pubsub.publish(\'sample.message\',\n            { message: self.message() });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button>\n&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var i = 0;\n    \n    this.createPane = function() {\n        TC.appendNode(pane.find(\'.items\'),\n            { path: \'item\', data: ++i });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Pane Lifecycle&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'create\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is pane number &lt;span data-bind="text: data">&lt;/span>.\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    this.data = pane.data;\n\n    // The initialise function is called before the pane\n    // is rendered. If you return a jQuery deferred object,\n    // Tribe will wait for it to resolve before continuing.\n    \n    this.initialise = function() {\n        var promise = $.Deferred();\n        setTimeout(promise.resolve, 500);\n        return promise;\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is the first pane in our navigation stack.\n&lt;/div>\n&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.next = function() {\n        pane.navigate(\'second\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Navigating&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding marks the underlying node\n     as the node that should transition on navigation -->\n\n&lt;div data-bind="pane: \'first\', handlesNavigation: \'fade\'">\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is the second pane in our navigation stack.\n&lt;/div>\n&lt;button data-bind="click: back">Back&lt;/button>\n&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.back = function () {\n        pane.navigateBack();\n    };\n\n    this.next = function () {\n        pane.navigate(\'third\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    And the last one!\n&lt;/div>\n&lt;button data-bind="click: back">Back&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.back = function() {\n        pane.navigateBack();\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- A simple list of the folder names.\n     Apply the "selected" CSS class to the selected folder.\n     On click, set the selected folder -->\n\n&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectedFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Our model just contains a list of folders and\n// an observable to hold the selected folder.\n\nTC.registerModel(function (pane) {\n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(\'Inbox\');\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'folders\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The click binding is now to the selectFolder function -->\n\n&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(pane.data.folder);\n\n    // We\'ve added a separate click handler to navigate\n    // when a folder is selected.\n    this.selectFolder = function (folder) {\n        self.selectedFolder(folder);\n        pane.navigate(\'mails\', { folder: folder });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding tells Tribe to use that node for navigation. -->\n\n&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div>\n&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {\n    width: 100%;\n    table-layout: fixed;\n    border-spacing: 0;\n}\n\n.mails th {\n    background-color: #bbb;\n    font-weight: bold;\n    color: #444;\n    text-shadow: #f7f7f7 0 1px 1px;\n}\n\n.mails tbody tr:hover {\n    cursor: pointer;\n    background-color: #68c !important;\n    color: White;\n}\n\n.mails th, .mails td {\n    text-align: left;\n    padding: 0.4em 0.3em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mails td {\n    border: 0;\n}\n\n.mails th {\n    border: 0;\n    border-left: 1px solid #ddd;\n    border-right: 1px solid #888;\n    padding: 0.4em 0 0.3em 0.7em;\n}\n\n.mails th:nth-child(1), .mails td:nth-child(1) {\n    width: 20%;\n}\n\n.mails th:nth-child(2), .mails td:nth-child(2) {\n    width: 15%;\n}\n\n.mails th:nth-child(3), .mails td:nth-child(3) {\n    width: 45%;\n}\n\n.mails th:nth-child(4), .mails td:nth-child(4) {\n    width: 15%;\n}\n\n.mails th:last-child {\n    border-right: none;\n}\n\n.mails tr:nth-child(even) {\n    background-color: #EEE;\n}\n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data">\n    &lt;thead>\n        &lt;tr>\n            &lt;th>From&lt;/th>\n            &lt;th>To&lt;/th>\n            &lt;th>Subject&lt;/th>\n            &lt;th>Date&lt;/th>\n        &lt;/tr>\n    &lt;/thead>\n\n    &lt;tbody data-bind="foreach: mails">\n        &lt;tr>\n            &lt;td data-bind="text: from">&lt;/td>\n            &lt;td data-bind="text: to">&lt;/td>\n            &lt;td data-bind="text: subject">&lt;/td>\n            &lt;td data-bind="text: date">&lt;/td>\n        &lt;/tr>     \n    &lt;/tbody>\n&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = ko.observable();\n\n    // Load data using AJAX to our data property    \n    this.initialise = function() {\n        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(pane.data.folder);\n\n    this.selectFolder = function (folder) {\n        self.selectedFolder(folder);\n        pane.navigate(\'mails\', { folder: folder });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div>\n&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {\n    width: 100%;\n    table-layout: fixed;\n    border-spacing: 0;\n}\n\n.mails th {\n    background-color: #bbb;\n    font-weight: bold;\n    color: #444;\n    text-shadow: #f7f7f7 0 1px 1px;\n}\n\n.mails tbody tr:hover {\n    cursor: pointer;\n    background-color: #68c !important;\n    color: White;\n}\n\n.mails th, .mails td {\n    text-align: left;\n    padding: 0.4em 0.3em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mails td {\n    border: 0;\n}\n\n.mails th {\n    border: 0;\n    border-left: 1px solid #ddd;\n    border-right: 1px solid #888;\n    padding: 0.4em 0 0.3em 0.7em;\n}\n\n.mails th:nth-child(1), .mails td:nth-child(1) {\n    width: 20%;\n}\n\n.mails th:nth-child(2), .mails td:nth-child(2) {\n    width: 15%;\n}\n\n.mails th:nth-child(3), .mails td:nth-child(3) {\n    width: 45%;\n}\n\n.mails th:nth-child(4), .mails td:nth-child(4) {\n    width: 15%;\n}\n\n.mails th:last-child {\n    border-right: none;\n}\n\n.mails tr:nth-child(even) {\n    background-color: #EEE;\n}\n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data">\n    &lt;thead>\n        &lt;tr>\n            &lt;th>From&lt;/th>\n            &lt;th>To&lt;/th>\n            &lt;th>Subject&lt;/th>\n            &lt;th>Date&lt;/th>\n        &lt;/tr>\n    &lt;/thead>\n\n    &lt;tbody data-bind="foreach: mails">\n        &lt;tr data-bind="click: $root.selectMail">\n            &lt;td data-bind="text: from">&lt;/td>\n            &lt;td data-bind="text: to">&lt;/td>\n            &lt;td data-bind="text: subject">&lt;/td>\n            &lt;td data-bind="text: date">&lt;/td>\n        &lt;/tr>     \n    &lt;/tbody>\n&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = ko.observable();\n\n    this.initialise = function () {\n        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);\n    };\n    \n    this.selectMail = function (mail) {\n        pane.navigate(\'viewMail\', mail);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.viewMail .mailInfo {\n    background-color: #dae0e8; \n    padding: 1em 1em 0.5em 1.25em; \n    border-radius: 1em;\n}\n\n.viewMail .mailInfo h1 {\n    margin-top: 0.2em; \n    font-size: 130%;\n}\n\n.viewMail .mailInfo label {\n    color: #777; \n    font-weight: bold; \n    min-width: 2.75em; \n    text-align:right; \n    display: inline-block;\n}\n\n.viewMail .message {\n    padding: 0 1.25em;\n}</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="viewMail" data-bind="with: data">\n    &lt;div class="mailInfo">\n        &lt;h1 data-bind="text: subject">&lt;/h1>\n        &lt;p>&lt;label>From&lt;/label>: &lt;span data-bind="text: from">&lt;/span>&lt;/p>\n        &lt;p>&lt;label>To&lt;/label>: &lt;span data-bind="text: to">&lt;/span>&lt;/p>\n        &lt;p>&lt;label>Date&lt;/label>: &lt;span data-bind="text: date">&lt;/span>&lt;/p>\n        &lt;div class="message">\n            &lt;p data-bind="html: messageContent" />            \n        &lt;/div>\n    &lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    this.data = ko.observable();\n\n    this.initialise = function () {\n        $.getJSON(\'Data/mail/\' + pane.data.id, self.data);\n    };\n});</pre>'
});TC.Events.syntaxHighlight = function(pane) {
    pane.find();
};$('<style/>')
    .attr('class', '__tribe')
    .text('.example3 .sample .samplePane{padding:0;width:320px;height:480px;left:22px;top:136px}.example3 .sample>*{height:711px}.example3 .sample .source{width:548px}.example3 .sample .result{width:365px;height:721px;border:none;background:url(\'../Images/device.mobile.png\');margin-left:15px}.example3 .sample .fileList{width:548px;height:auto}.example3 .sample .fileContent{width:548px;height:auto}.example3 .result .title{display:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.features{text-align:center;color:#081735;font-size:18px}.features.small{font-size:inherit}.features>*{vertical-align:top;display:inline-block;width:180px}.features.small>*{width:100px}.features strong{font-size:1.1em;height:50px;color:#701010;padding-bottom:10px}.features>* *{text-align:center;margin:0 auto;display:block}.features.small img{margin-bottom:5px}.features img{margin-bottom:20px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.guides h2{margin-bottom:5px}.guides ul{list-style:none;padding:0;margin:0}.guides li{cursor:pointer;margin-bottom:10px;padding:5px 20px;background:#f6f6f6;border-radius:8px}.guides li:hover{background:#eed}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.knockout.block{text-align:center;background:center url(\'../Images/knockout/background.jpg\')}.knockout .features{display:inline-block;margin-left:50px;background-clip:padding-box;color:#b64838}.knockout .logo{color:#fff;vertical-align:top;margin-top:20px;display:inline-block;width:250px;font:inherit}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.masthead{color:#fff;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;text-align:center;padding-bottom:20px;border-bottom:1px #333 solid}.masthead h1{height:60px;font-size:96pt;padding:0}.masthead h2{font-size:18px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.webmail .sample .result{margin:10px auto 0 auto;width:920px;height:auto}.webmail .sample .samplePane{height:auto}.webmail .sample .fileContent{width:770px}.webmail .fixedHeight .samplePane{height:500px;overflow-y:scroll}.webmail h2{margin-top:20px!important}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.content{width:980px;position:relative;left:50%;margin-left:-490px!important}.logo{font-weight:bold;font-family:\'Cambria\'}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.footer{text-align:right;font-size:10pt;color:#888;text-shadow:1px 1px rgba(255,255,255,.2)}.footer a,.footer a:active,.footer a:visited,.footer a:link{text-decoration:none;color:#66f}.footer a:hover{color:#fff}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.header{height:46px}.header .background{position:absolute;top:0;width:100%;height:45px;border-bottom:1px #333 solid;background:#45484d;background:-moz-linear-gradient(top,#45484d 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#45484d),color-stop(100%,#000));background:-webkit-linear-gradient(top,#45484d 0%,#000 100%);background:-o-linear-gradient(top,#45484d 0%,#000 100%);background:-ms-linear-gradient(top,#45484d 0%,#000 100%);background:linear-gradient(to bottom,#45484d 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0);z-index:-2}.header .logo{display:none;position:absolute;cursor:pointer;top:2px;left:20px;color:#fff;font-size:22pt;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5)}.header .buttons{text-align:center;position:absolute;right:0}.header .buttons span{font-size:.7em;float:left;color:#eee;text-shadow:2px 2px 0 black;padding:9px;cursor:pointer;background:rgba(32,96,224,.2);font-size:1.2em;width:110px;height:27px;margin:0;margin-left:-1px;border-left:1px solid #000;border-right:1px solid #000}.header .buttons span:hover{background:#fff;background:-moz-linear-gradient(top,#fff 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fff),color-stop(100%,#000));background:-webkit-linear-gradient(top,#fff 0%,#000 100%);background:-o-linear-gradient(top,#fff 0%,#000 100%);background:-ms-linear-gradient(top,#fff 0%,#000 100%);background:linear-gradient(to bottom,#fff 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffff\',endColorstr=\'#000000\',GradientType=0);color:#aaa}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.navigation{display:none;background:#eee;border:1px solid #000;box-sizing:border-box;z-index:100}.navigation ul{list-style:none}.navigation li{cursor:pointer}.navigation ul li:hover{background:#111;color:#eee}.navigation li.selectedItem{background:#ccc}.navigation>ul li{padding:2px 10px;font-weight:bold}.navigation ul ul li{margin:0;padding:2px 0 2px 20px;box-sizing:border-box;font-weight:normal}@media(max-width:1300px){.navigation{width:980px;position:relative;left:50%;margin-left:-490px!important;border-radius:8px;padding:10px;margin-top:10px}.navigation ul{margin:0;padding:0;width:33%}.navigation ul ul{position:absolute;top:10px;right:10px;width:66%}.navigation ul ul li{width:50%;float:left}}@media(min-width:1300px){.navigation{width:170px!important;position:fixed;left:0;top:56px;border-left:0;box-shadow:3px 3px 4px -1px rgba(0,0,0,.3);border-top-right-radius:8px;border-bottom-right-radius:8px}.navigation>ul{padding:0;margin:10px}.navigation ul ul{margin:0;padding:0}}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.navigationContainer{position:relative}.navigationContainer>ul{position:absolute;top:0;right:0;list-style:none;margin:0;padding:0}.navigationContainer>ul li{display:inline-block;width:70px;height:25px;text-align:center;padding-top:2px;border-radius:6px;border:1px solid #eee;cursor:pointer}.navigationContainer>ul li:hover{background:#000;color:#fff}.navigationContainer>.out{margin-top:-20px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.sample{width:935px;margin:0}.sample>*{display:inline-block;vertical-align:top;height:305px;border:1px solid #000;border-radius:8px;overflow:hidden;background:#fff}.sample .fileList,.sample .fileContent{float:left;height:300px;box-sizing:border-box}.sample ul.fileList{width:150px;list-style:none;margin:0;padding:0}.sample .fileList li{padding:2px;cursor:pointer}.sample .fileList li:hover{color:#fff;background:#000}.sample .selectedFile{color:#fff;background:grey}.sample .fileContent{padding:5px;width:515px;overflow:auto;height:272px}.sample .result{margin-left:5px;margin-bottom:5px;width:255px}.sample .title{background:#ccc;padding:5px;width:100%;box-sizing:border-box;border-top-left-radius:8px;border-top-right-radius:8px}.sample .samplePane{overflow-y:auto;overflow-x:hidden;padding:5px;height:262px;position:relative}.sample pre{margin:0}.sample pre.prettyprint{border:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.function h1 .returns{float:right;font-weight:normal}.function h1 .returns .type{font-weight:bold;font-style:italic}.function .name{font-size:1.2em}.example{background:#eed;padding:10px;margin:10px 0}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.messages{list-style:none;padding:0}.messages li{padding:5px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('ul.welcome li{background:#103070;color:#fff;text-align:center;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);font:bold 64pt \'Cambria\'}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.taskList{list-style:none;padding:0}.taskList li{padding:5px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.panels>div{margin-bottom:5px;border:1px solid #000}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.helloWorld h1{text-shadow:3px 3px 0 #aaa}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(.4,silver),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:#fff;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(.4,silver),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:#fff;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.mails{width:100%;table-layout:fixed;border-spacing:0}.mails th{background-color:#bbb;font-weight:bold;color:#444;text-shadow:#f7f7f7 0 1px 1px}.mails tbody tr:hover{cursor:pointer;background-color:#68c!important;color:#fff}.mails th,.mails td{text-align:left;padding:.4em .3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mails td{border:0}.mails th{border:0;border-left:1px solid #ddd;border-right:1px solid #888;padding:.4em 0 .3em .7em}.mails th:nth-child(1),.mails td:nth-child(1){width:20%}.mails th:nth-child(2),.mails td:nth-child(2){width:15%}.mails th:nth-child(3),.mails td:nth-child(3){width:45%}.mails th:nth-child(4),.mails td:nth-child(4){width:15%}.mails th:last-child{border-right:none}.mails tr:nth-child(even){background-color:#eee}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(.4,silver),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:#fff;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.mails{width:100%;table-layout:fixed;border-spacing:0}.mails th{background-color:#bbb;font-weight:bold;color:#444;text-shadow:#f7f7f7 0 1px 1px}.mails tbody tr:hover{cursor:pointer;background-color:#68c!important;color:#fff}.mails th,.mails td{text-align:left;padding:.4em .3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mails td{border:0}.mails th{border:0;border-left:1px solid #ddd;border-right:1px solid #888;padding:.4em 0 .3em .7em}.mails th:nth-child(1),.mails td:nth-child(1){width:20%}.mails th:nth-child(2),.mails td:nth-child(2){width:15%}.mails th:nth-child(3),.mails td:nth-child(3){width:45%}.mails th:nth-child(4),.mails td:nth-child(4){width:15%}.mails th:last-child{border-right:none}.mails tr:nth-child(even){background-color:#eee}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.viewMail .mailInfo{background-color:#dae0e8;padding:1em 1em .5em 1.25em;border-radius:1em}.viewMail .mailInfo h1{margin-top:.2em;font-size:130%}.viewMail .mailInfo label{color:#777;font-weight:bold;min-width:2.75em;text-align:right;display:inline-block}.viewMail .message{padding:0 1.25em}')
    .appendTo('head');
$('head')
    .append('<script type="text/template" id="template--Content-About-example1"><div class="example1 block">\n    <h1>Show Me!</h1>\n    \n    <p>\n        Tribe allows you to easily break your UI down into "panes" that can consist \n        of a JavaScript model, HTML template and CSS stylesheet. \n    </p>\n    <p>\n        Simply create these files and refer to the pane by name. No complex configuration required.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Tasks\', initialFile: \'layout.htm\' }"></div>\n    \n    <p>\n        This is pretty trivial example. You can check out the <a href="" target="_blank">source</a> \n        to this site or the <a href="" target="_blank">samples</a>. \n    </p>\n    <p>\n        If you\'re using Chrome, head over to the <a href="debug.html">debug version</a> of the site \n        and look at the source in the developer tools.\n    </p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example2"><div class="example2 block">\n    <h1>Seamless, Real Time Communication</h1>\n    \n    <p>Connect your users in real time with just a few lines of code - messages you publish are seamlessly broadcast to other users or internal services.</p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Chat\', initialFile: \'chat.js\', rootPane: \'chat\' }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example3"><div class="example3 block">\n    <h1>Mobile App</h1>\n    \n    <p>\n        Tribe makes it effortless to create mobile device apps that look and perform like native apps, using the same code as your web app.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Mobile\', initialFile: \'index.html\', rootPane: { path: \'/Mobile/main\', data: { pane: \'/Samples/About/Mobile/welcome\' } } }"></div>\n    \n    <p>\n        Point your phone\'s browser at <a href="m.html" target="_blank">http://tribejs.com/m.html</a> to see the demo on your device.\n    </p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-features"><div class="block">\n    <h1>Key Features</h1>\n    <div class="features">\n        <div>\n            <img src="Images/Features/composite.jpg" />\n            <strong>Composite UI</strong>\n            <span>Simple, powerful UI decomposition.</span>\n        </div>\n        <div>\n            <img src="Images/Features/resources.jpg" />\n            <strong>Resource Management</strong>\n            <span>Full lifecycle management. Powerful load optimisation.</span>\n        </div>\n        <div>\n            <img src="Images/Features/communication.jpg" />\n            <strong>Seamless Communication</strong>\n            <span>Broadcast messages to other users and internal services in real time.</span>\n        </div>\n        <div>\n            <img src="Images/Features/mobile.jpg" />\n            <strong>Mobile Devices</strong>\n            <span>Effortlessly target web and mobile platforms with a shared codebase.</span>\n        </div>\n        <div>\n            <img src="Images/Features/simple.jpg" />\n            <strong>Simple and Intuitive</strong>\n            <span>Flexible, intuitive file structure. No complex configuration.</span>\n        </div>\n    </div>\n    <div>\n        <a data-bind="click: Article.show(\'Guides\', \'Guides/features\')">Read more...</a>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-guides"><div class="guides content block">\n    <h1>Guides</h1>\n    <ul>\n        <li data-bind="click: Article.show(\'Guides\', \'Guides/features\')">\n            <h2>Features</h2>\n            <p>Describes the individual components of Tribe and the features they offer.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Guides/getStarted\')">\n            <h2>Get Started</h2>\n            <p>How to obtain the Tribe libraries and start your project.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Guides/panes\')">\n            <h2>Working With Panes</h2>\n            <p>How to create panes, communicate between them and navigate around.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Guides/webmail\')">\n            <h2>Webmail Tutorial</h2>\n            <p>A step by step tutorial for building a simple webmail app.</p>\n        </li>\n        \n        <h1>Coming Soon!</h1>\n        <li>\n            <h2>Configuring the MessageHub</h2>\n            <p>How to configure the MessageHub component to cater for different scenarios.</p>\n        </li>\n        <li> <!--data-bind="click: Article.show(\'Guides\', \'Guides/packscript\')">-->\n            <h2>Deployment - Packing Your Apps for Maximum Performance</h2>\n            <p>How to use PackScript to combine and minify your resources for deployment.</p>\n        </li>\n        <li> <!--data-bind="click: Article.show(\'Guides\', \'Guides/sagas\')">-->\n            <h2>Modelling Your Navigation Flow and Business Processes</h2>\n            <p>Using sagas to model your navigation and business processes seperately to promote loose coupling.</p>\n        </li>\n        <li> <!--data-bind="click: Article.show(\'Guides\', \'Guides/nservicebus\')">-->\n            <h2>NServiceBus Integration</h2>\n            <p>Transparently send messages from the client to internal services and publish internal events to client channels.</p>\n        </li>\n    </ul>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-home"><div>\n    <div data-bind="pane: \'masthead\'"></div>\n\n    <div class="content">\n        <div data-bind="pane: \'knockout\'"></div>\n        <div data-bind="pane: \'features\'"></div>\n        <div data-bind="pane: \'example1\'"></div>\n        <div data-bind="pane: \'example2\'"></div>\n        <div data-bind="pane: \'example3\'"></div>\n\n        <!--<ul>\n                <li>Tribe comes with a set of UI components but integrates easily with others, like jQuery UI.</li>\n            </ul>-->\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-knockout"><div class="padded knockout block">\n    <div class="logo">\n        <span>Built with the power of</span>\n        <img src="Images/knockout/logo.png"/>\n    </div>\n    <div class="small padded features block">\n        <div>\n            <img src="Images/knockout/bindings.png" />\n            <span>Declarative Bindings</span>\n        </div>\n        <div>\n            <img src="Images/knockout/refresh.png" />\n            <span>Automatic UI Refresh</span>\n        </div>\n        <div>\n            <img src="Images/knockout/dependencies.png" />\n            <span>Dependency Tracking</span>\n        </div>\n        <div>\n            <img src="Images/knockout/templating.png" />\n            <span>Templating</span>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-masthead"><div class="masthead">\n    <h1 class="logo">tribe</h1>            \n    <h2>Easy to build, fast, integrated web and mobile <span class="underline">systems</span>.</h2>\n    \n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=Tribe&type=watch" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=Tribe&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <a href="https://twitter.com/tribejs" class="twitter-follow-button" data-show-count="false">Follow @tribejs</a>\n    <script src="http://platform.twitter.com/widgets.js"></script>    \n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-features"><div class="content block">\n    <h1>Features</h1>\n\n    <div class="child">\n        <h1>Composite</h1>\n        <img src="Images/Features/composite.jpg" />\n        <ul>\n            <li>Built on the power of <a href="http://knockoutjs.com/" target="_blank">knockout</a> - <b>declarative data binding</b>, <b>observables</b> and more.</li>\n            <li>Break your UI down into reusable pieces in a way that makes sense to you.</li>\n            <li>Simply and easily model <b>navigation flow</b> and <b>business processes</b>.</li>\n            <li>Smooth, <b>hardware accelerated transitions</b> - a core part of Tribe.Composite.</li>\n            <li>Full <b>resource lifecycle management</b> - Tribe manages the lifecycle of panes from load through to disposal.</li>\n            <li><b>Simple and intuitive</b> - structure your project how you need <b>without complex configuration</b>.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>MessageBus</h1>\n        <img src="Images/Features/communication.jpg" />\n        <ul>\n            <li>Built on <b>reliable</b>, <b>highly scalable</b>, proven technology (Microsoft SignalR)</li>\n            <li><b>Transparently broadcast messages</b> to other users on both web and mobile devices.</li>\n            <li>Seamlessly translate messages into server side messaging technology, like <b>NServiceBus</b> or <b>Azure queues</b>.</li>\n            <li>Built in <b>record and replay semantics</b> - event sourcing out of the box.</li>\n            <li><b>Secure channels</b> with simple and extensible authorisation.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Mobile</h1>\n        <img src="Images/Features/mobile.jpg" />\n        <ul>\n            <li>Target <b>mobile devices</b> with the <b>same codebase</b> as your web application.</li>\n            <li>Easily customisable <b>pre-built themes</b> and <b>UI components</b> - focus on building your app.</li>\n        </ul>\n        <br/><br/>\n    </div>\n\n    <div class="child">\n        <h1>PackScript</h1>\n        <img src="Images/Features/simple.jpg" />\n        <ul>\n            <li>Powerful resource building system for combining and minifying resources.</li>\n            <li><b>Combine, minify, transform, template, compile</b> and more.</li>\n            <li>Simple <b>JavaScript configuration</b> API.</li>\n            <li><b>"Watch" mode</b> to update your build every time you save a file.</li>\n            <li>Easily integrates with <b>continuous integration</b> tools.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Forms</h1>\n        <ul>\n            <li>Simple, themable set of templates for creating forms.</li>\n            <li>Model-based validation without any additional markup.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Components</h1>\n        <ul>\n            <li>A basic set of reusable user interface components including:\n                <ul>\n                    <li>Grid</li>\n                    <li>Graph</li>\n                    <li>Dialog</li>\n                    <li>Expander</li>\n                    <li>Tab panel</li>\n                    <li>Tooltip</li>\n                    <li>Google Map</li>\n                </ul>\n            </li>\n        </ul>\n    </div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-getStarted"><div class="content block">\n    <h1>Get Started</h1>\n    <p>There are three easy ways to get started with the Tribe platform.</p>\n\n    <div class="child">\n        <h1>Online Resources</h1>\n        <p>Use the following HTML for your bootstrapper:</p>\n        <div class="example">\n            <pre>\n&lt;!DOCTYPE HTML>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">&lt;/script>        \n        &lt;script src="http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js">&lt;/script>\n        &lt;script src="http://danderson00.github.io/Tribe/Build/Tribe.min.js">&lt;/script>\n        &lt;script>$(TC.run)&lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>\n        </div>\n        <p>Replace \'layout\' with the path to your starting pane.</p>\n    </div>\n\n    <div class="child">\n        <h1>NuGet Packages</h1>\n        <img class="topRight" style="margin-top: 10px !important" src="Images/Features/nuget.jpg"/>\n        <p>If you\'re a Visual Studio user, the easiest way to get started is to install one of the Tribe NuGet packages.</p>\n        <ul>\n            <li>Tribe - Everything you need for complete Composite and MessageHub functionality.</li>\n            <li>Tribe.Template - Everything in the Tribe package plus a basic starter template.</li>\n            <li>Tribe.Composite - Tribe.Composite, Mobile, Forms and Components.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Download</h1>\n        <a><img class="topRight" src="Images/download.png" /></a>\n        <p><a>Download a ZIP file</a> containing</p>\n        <ul>\n            <li>The production, debug and special Chrome version of Tribe.Composite</li>\n            <li>Tribe.MessageHub binaries (currently requires ASP.NET, self-hosting server coming soon!)</li>\n            <li>Forms, Mobile and Components</li>\n            <li>A starter template</li>\n        </ul>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-messageBus"><div class="content block">\n    <h1>Configuring Tribe.MessageBus</h1>\n    <p>Coming soon!</p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-nservicebus"><div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-packscript"><div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-panes"><div class="content block">\n    <h1>Creating Panes</h1>\n    \n    <p>\n        Panes can consist of a JavaScript model, HTML template and CSS stylesheet. Creating new panes is as\n        simple as creating files with corresponding extensions and referring to them by name.\n    </p>\n    \n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Creating\', initialFile: \'index.html\', rootPane: { path: \'/Samples/Panes/Creating/helloWorld\', data: { message: \'Test message.\' } } }"></div>\n    \n    <h2>Dynamically Injecting Panes</h2>\n    <p>Panes can be injected into the DOM dynamically. Here, we are creating a new pane every time the button is clicked.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Dynamic\', initialFile: \'create.js\', rootPane: \'create\' }"></div>\n    <p>For a full list of API functions, check out the <a data-bind="click: Article.show(\'Reference\', \'Core/api\')">API reference</a>.</p>\n</div>\n\n<div class="content block">\n    <h1>Communicating</h1>\n    <p>\n        Tribe provides a publish / subscribe engine for communication between panes and other components.\n    </p>\n    <p>\n        Using messages to communicate allows you to create autonomous, loosely decoupled components that\n        are extensible and easy to maintain.\n    </p>\n    <p>\n        You can also share observable objects between panes.\n    </p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Communicating\', initialFile: \'sender.js\', rootPane: \'layout\' }"></div>\n    <p>\n        TIP: Use "namespaces" in your message topics to prevent collisions as your app expands.\n    </p>\n</div>\n\n<div class="content block">\n    <h1>Pane Lifecycle</h1>\n    <p>Each pane goes through a defined set of steps from ensuring resources are loaded, rendering and binding panes through to disposal.</p>\n    <p>You can perform actions when some of these events occur by declaring functions on your model.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Lifecycle\', initialFile: \'item.js\', rootPane: \'create\' }"></div>\n    <p>\n        For a full description of the pane lifecycle and events you can hook in to, check out the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">panes reference</a>.\n    </p>\n</div>\n\n<div class="content block">\n    <h1>Navigating</h1>\n    <p>The Tribe navigation mechanism gives you a simple way to transition panes using smooth, hardware accelerated CSS transitions.</p>\n    <p>A navigation stack is maintained, allowing you to navigate back and forth through the stack.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Navigating\', initialFile: \'layout.htm\', rootPane: \'layout\' }"></div>\n    <p>\n        You can easily hook into the browser history and provide custom URLs. See the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">panes reference</a> for more information.\n    </p>\n    <p>\n        Any element or pane can be transitioned. See the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/transitions\')">transitions reference</a> for more information.\n    </p>\n</div>\n\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-webmail"><div class="webmail content block">\n    <h1>Webmail Tutorial</h1>\n    <div data-bind="pane: \'/Interface/navigationContainer\', data: Tutorials.webmail"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-Webmail-content"><h2>Navigating to Mail Content</h2>\n<p>Let\'s add a pane for displaying mail content that is displayed when an email is clicked.</p>\n<div class="fixedHeight" data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/3-Content\', initialFile: \'mails.js\', rootPane: \'layout\' }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-Webmail-folders"><h2></h2>\n<p>\n    In this tutorial, we will create a simple webmail system that loads JSON data from a server.\n</p>\n<p>\n    If you are not familiar with <a href="http://knockoutjs.com" target="_blank">knockout</a>, \n    we highly recommend you check out the <a href="http://learn.knockoutjs.com" target="_blank">tutorials.</a>\n</p>\n\n<h2>Folder Navigation Bar</h2>\n<p>First up, let\'s create a simple horizontal folder list to sit at the top of the screen.</p>\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/1-Folders\', initialFile: \'folders.js\', rootPane: \'folders\' }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-Webmail-mails"><h2>Adding a List of Mail</h2>\n<p>Let\'s add a pane called \'mails\' to display the list of mails in the selected folder and a layout pane.</p>\n<div class="fixedHeight" data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/2-Mails\', initialFile: \'layout.htm\', rootPane: \'layout\' }"></div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Core-api"><div class="content block">\n    <h1>Core API</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.API }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Core-options"><div class="content block">\n    <h1>Global Options</h1>\n    <p>Global options can be set on the TC.options object.</p>\n    <pre class="example">TC.options.basePath = \'Panes\';</pre>\n    <table>\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>Default</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>basePath</td>\n                <td>String</td>\n                <td></td>\n                <td>Root path to load panes from</td>\n            </tr>\n            <tr>\n                <td>synchronous</td>\n                <td>Boolean</td>\n                <td>false</td>\n                <td>Load resources and execute message subscribers synchronously</td>\n            </tr>\n            <tr>\n                <td>splitScripts</td>\n                <td>Boolean</td>\n                <td>false</td>\n                <td>Split loaded scripts on each sourceURL tag and execute individually</td>\n            </tr>\n            <tr>\n                <td>handleExceptions</td>\n                <td>Boolean</td>\n                <td>true</td>\n                <td>Handle exceptions within the framework</td>\n            </tr>\n            <tr>\n                <td>loadStrategy</td>\n                <td>String</td>\n                <td>adhoc</td>\n                <td>Name of the registered load strategy to use</td>\n            </tr>\n            <tr>\n                <td>events</td>\n                <td>[String]</td>\n                <td><a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">See reference</a></td>\n                <td>Array of ordered event names to execute in the pane rendering pipeline</td>\n            </tr>\n        </tbody>\n    </table>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Core-panes"><div class="content block">\n    <h1>Pane Options</h1>\n    <p>\n        Panes can be created using the pane binding handler or with JavaScript using the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/api\')">core API functions</a>.\n    </p>\n    <pre class="example">&lt;div data-bind="pane: \'path/to/pane\', data: { value: 1 }, handlesNavigation: true">&lt;/div></pre>\n\n    <p>The following bindings can be used:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.Panes.options }"></div>\n\n    <p>When using API functions, pass these options as an object and provide a path property:</p>\n    <pre class="example">TC.createNode(\'body\', { path: \'path/to/pane\', data: { value: 1 }, handlesNavigation: true });</pre>\n</div>\n\n<div class="content block">\n    <h1>Pane Lifecycle</h1>\n    <p>The following events are executed in order against each pane:</p>\n    <table>\n        <thead>\n            <tr>\n                <th>Event</th>\n                <th>Description</th>\n                <th>Model Function</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>loadResources</td>\n                <td>HTML, JS and CSS resources for the pane are loaded if required</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>createPubSub</td>\n                <td>A Tribe.PubSub object is created and attached to the pane</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>createModel</td>\n                <td>The appropriate model is instantiated and attached to the pane</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>initialiseModel</td>\n                <td>The initialise function is called on the pane</td>\n                <td>initialise</td>\n            </tr>\n            <tr>\n                <td>renderPane</td>\n                <td>The pane template is rendered in the target element and the model is bound</td>\n                <td>paneRendered</td>\n            </tr>\n            <tr>\n                <td>renderComplete</td>\n                <td>The renderComplete function is called on the pane when all panes in the render operation have been rendered</td>\n                <td>renderComplete</td>\n            </tr>\n            <tr>\n                <td>active</td>\n                <td>The pane is active</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>dispose</td>\n                <td>The pane\'s element has been removed from the DOM. Resources for the pane such as pubsub subscriptions are cleaned up</td>\n                <td>dispose</td>\n            </tr>\n        </tbody>\n    </table>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Core-transitions"><div class="content block">\n    <h1>Transitions</h1>\n\n    <p>Use the TC.transition function to perform transitions:</p>\n    <div data-bind="pane: \'/Interface/API/function\', data: Reference.Transition"></div>\n\n    <p>The returned object can be used to transition the target in, out or to another pane:</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Transition.Functions }"></div>\n\n    <div class="child">\n        <h1>Examples</h1>\n\n        <p>Fade the first element with a class of "target" out of view and remove it from the DOM</p>\n        <pre class="example">\n    TC.transition(\'.target\', \'fade\').out();</pre>\n\n        <p>Transition the node containing the element with a class of "target" to a new pane</p>\n        <pre class="example">\n    TC.transition(TC.nodeFor(\'.target\')).to(\'path/to/pane\');</pre>\n\n        <p>This can also be expressed as:</p>\n        <pre class="example">\n    TC.nodeFor(\'.target\').transitionTo(\'path/to/pane\');</pre>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-MessageHub-client"><div class="content block">\n    <h1>MessageHub Client API</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.MessageHub }"></div>\n    <div class="child">\n        <h1>joinChannel Options</h1>\n        <p>An object containing any of the following options can be passed to the TMH.joinChannel function.</p>\n        <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.MessageHub.ChannelOptions }"></div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-MessageHub-configuration"><div class="content block">\n    <h1>MessageHub Server Configuration API</h1>\n    \n    <p>\n        Configuration must start with ConfigureHub.With() followed by a container configuration.\n        Currently only Unity is supported.\n    </p>\n    <pre class="example">\nusing Tribe.MessageHub.Core.Configuration;\nusing Tribe.MessageHub.Containers.Unity;\n\nConfigureHub.With().Unity(container).StartHub();</pre>\n    \n    <p>The following extension methods are then provided, all chainable:</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.MessageHub.Server }"></div>\n    \n    <pre class="example">\nusing Tribe.MessageHub.Core.Configuration;\nusing Tribe.MessageHub.Containers.Unity;\nusing Tribe.MessageHub.ChannelPersisters.SqlServer;\nusing Tribe.MessageHub.Buses.NServiceBus;\n\nConfigureHub.With()\n    .Unity(container)\n    .ChannelAuthoriser&lt;MyChannelAuthoriser>()\n    .SqlServerPersistence("Data Source=.;Initial Catalog=Tribe.Channels;Integrated Security=true")\n    .NServiceBus(bus)\n    .MessagesFrom(typeof(ExampleMessage).Assembly)\n    .StartHub();</pre>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-PubSub-core"><div data-bind="pane: \'/Interface/API/type\', data: Reference.PubSub"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-PubSub-envelopes"><div class="content block">\n    <h1>Message Envelopes</h1>\n    <p>Message envelopes may contain the following properties:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PubSub.Envelopes }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-PubSub-options"><div class="content block">\n    <h1>Global Options</h1>\n    <p>Global options can be set on the Tribe.PubSub.options object.</p>\n    <pre class="example">Tribe.PubSub.options.sync = true;</pre>\n    <table>\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>Default</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>sync</td>\n                <td>Boolean</td>\n                <td>false</td>\n                <td>Execute message handlers synchronously.</td>\n            </tr>\n            <tr>\n                <td>handleExceptions</td>\n                <td>Boolean</td>\n                <td>true</td>\n                <td>Wrap handler functions in a try..catch block.</td>\n            </tr>\n            <tr>\n                <td>exceptionHandler</td>\n                <td>Function(error, envelope)</td>\n                <td>undefined</td>\n                <td>A function to execute when exceptions occur. Only executed if handleExceptions is false.</td>\n            </tr>\n        </tbody>\n    </table>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-History"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.History"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Loader"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Loader"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Logger"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Logger"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Models"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Models"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Node"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Node"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Operation"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Operation"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Pane"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Pane"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Pipeline"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Pipeline"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Saga"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Saga"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Types-Templates"><div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Templates"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-collections"><div class="content block">\n    <h1>Collections</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Collections }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-embeddedState"><div class="content block">\n    <h1>Embedded State</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.EmbeddedState }"></div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-events"><div class="content block">\n    <h1>Events</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Events }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-misc"><div class="content block">\n    <h1>Miscellaneous</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Misc }"></div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-objects"><div class="content block">\n    <h1>Objects</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Objects }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-packScript"><div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-panes"><div class="content block">\n    <h1>Panes</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Panes }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Utilities-paths"><div class="content block">\n    <h1>Paths</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Path }"></div>\n    <p>Functions attached to the returned object are described below.</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Path.Functions }"></div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Interface-content"><div data-bind="pane: panePath">\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-footer"><div class="footer content">\n    The Tribe platform and all resources on this website are licensed under the <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT license</a>, except portions\n    copyright <a href="knockoutjs.com" target="_blank">knockoutjs.com</a>.\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-header"><div class="header">\n    <div class="background"></div>\n    \n    <div class="content">\n        <div class="logo" data-bind="click: Article.show(\'About\', \'home\')">tribe</div>\n        <div class="buttons">\n            <span data-bind="click: Article.show(\'Guides\', \'Guides/getStarted\')">Get Started</span>\n            <span data-bind="click: Article.show(\'About\', \'guides\')">Guides</span>\n            <span data-bind="click: Article.show(\'Reference\', \'Core/panes\')">Reference</span>\n            <a href="http://danderson00.github.io/Tribe/Composite/Tests/index.html" target="_blank"><span>Tests</span></a>\n            <a href="https://github.com/danderson00/Tribe" target="_blank"><span>Source</span></a>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-layout"><div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'main\'"></div>\n<div data-bind="pane: \'footer\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-main"><div data-bind="pane: \'navigation\'"></div>\n<div data-bind="pane: { path: \'content\', data: { section: \'About\', topic: \'home\' }, handlesNavigation: { transition: \'fade\', browser: articleUrlProvider } }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-navigation"><div class="navigation">\n    <ul data-bind="foreach: items">\n        <li data-bind="click: $root.showSection, css: { selectedItem: $data.topic === $root.selectedTopic() }">\n            <span data-bind="text: $data.displayText"></span>\n        </li>\n        <ul data-bind="visible: $data.key === $root.selectedParent(), foreach: $data.items">\n            <li data-bind="click: $root.showArticle, text: $data.displayText, css: { selectedItem: $data.topic === $root.selectedTopic() }"></li>\n        </ul>\n    </ul>\n    <div class="clear"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-navigationContainer"><div class="navigationContainer">\n    <ul>\n        <li data-bind="click: back, visible: !atStart()">Back</li>\n        <li data-bind="click: next, visible: !atEnd()">Next</li>\n    </ul>\n    <div data-bind="pane: initialPane, handlesNavigation: \'fade\'"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-sample"><div class="sample">\n    <div class="source">\n        <div class="title">Source</div>\n\n        <ul class="fileList" data-bind="foreach: files">\n            <li data-bind="click: $root.selectFile, css: { selectedFile: $root.selectedFile() === $data }">\n                <img data-bind="attr: { src: icon }" />\n                <span data-bind="text: filename"></span>\n            </li>\n        </ul>\n\n        <div class="fileContent" data-bind="html: selectedFile().content"></div>\n    </div>\n\n    <div class="result">\n        <div class="title">Result</div>\n        <div class="samplePane" data-bind="pane: samplePane"></div>\n    </div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Interface-API-constructor"><div data-bind="pane: \'function\', data: func">\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-API-function"><div class="function child">\n    <h1>\n        <span data-bind="text: f.name"></span>(<span data-bind="text: argumentNames"></span>)\n        <span class="returns" data-bind="visible: f.returns">Returns: <span class="type" data-bind="text: f.returns"></span></span>\n    </h1>\n    <p data-bind="html: f.description"></p>\n\n    <table data-bind="visible: f.arguments && f.arguments.length > 0">\n        <thead>\n            <tr>\n                <th>Argument</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody data-bind="foreach: f.arguments">\n            <tr>\n                <td data-bind="text: $data.name"></td>\n                <td data-bind="text: $data.type"></td>\n                <td data-bind="html: $data.description"></td>\n            </tr>\n        </tbody>\n    </table>\n    \n    <div data-bind="foreach: f.examples">\n        <div class="example">\n            <p data-bind="text: description"></p>\n            <pre data-bind="text: code"></pre>\n            <p>Result:</p>\n            <pre data-bind="text: result"></pre>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-API-functionList"><div data-bind="foreach: pane.data.functions">\n    <div data-bind="pane: \'function\', data: $data"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-API-propertyList"><table class="propertyList" data-bind="visible: pane.data.properties && pane.data.properties.length > 0">\n    <thead>\n        <tr>\n            <th>Property</th>\n            <th>Type</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody data-bind="foreach: pane.data.properties">\n        <tr>\n            <td data-bind="text: $data.name"></td>\n            <td data-bind="text: $data.type"></td>\n            <td data-bind="text: $data.description"></td>\n        </tr>\n    </tbody>\n</table></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-API-type"><div class="content block">\n    <h1 data-bind="text: t.name"></h1>\n    <p data-bind="text: t.description"></p>\n    <div data-bind="pane: \'constructor\', data: t"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.properties">\n    <h1>Properties</h1>\n    <div data-bind="pane: \'propertyList\', data: { properties: t.properties }"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.functions">\n    <h1>Functions</h1>\n    <div data-bind="pane: \'functionList\', data: { functions: t.functions }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-mobile"><div data-bind="pane: \'/Mobile/main\', data: { pane: \'/About/Mobile/welcome\' }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Chat-chat"><div data-bind="pane: \'sender\'"></div>\n<div data-bind="pane: \'messages\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Chat-messages"><ul class="messages" data-bind="foreach: messages">\n    <li>\n        <span data-bind="text: name"></span>:\n        <span data-bind="text: message"></span>\n    </li>\n</ul>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Chat-sender"><div class="chat">\n    <div>\n        Name: <input data-bind="value: name" />    \n    </div>\n\n    <div>\n        Message: <input data-bind="value: message" />\n        <button data-bind="click: send">Send</button>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Mobile-chat"><!-- Let\'s reuse our panes from the previous example -->\n<ul class="rounded">\n    <li data-bind="pane: \'../Chat/sender\'"></li>\n    <li data-bind="pane: \'../Chat/messages\'"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Mobile-layout"><div class="layout">\n    <ul class="rounded">\n        <li class="forward">Test1</li>\n        <li class="forward">Test2</li>\n        <li class="arrow" data-bind="click: function() {}">Test3</li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }"></li>\n    </ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"></div>\n    \n    <button class="white" data-bind="click: overlay">Overlay</button>\n    <button class="white" data-bind="click: toolbar">Toolbar</button>\n    <button class="white" data-bind="click: navigate">Navigate</button>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Mobile-overlay"><ul>\n    <li>One</li>\n    <li>Two</li>\n    <li>Three</li>\n    <li>Four</li>\n</ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Mobile-welcome"><ul class="rounded welcome">\n    <li>tribe</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: samples">Samples</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: chat">Chat</li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Tasks-create"><!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<input data-bind="value: task" />\n<button data-bind="click: create">Create</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Tasks-layout"><h1>Todos</h1>\n\n<!-- Creating panes is simple -->\n<div data-bind="pane: \'create\'"></div>\n<div data-bind="pane: \'list\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Tasks-list"><!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n<ul class="taskList" data-bind="foreach: tasks">\n    <li data-bind="pane: \'task\', data: $data"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-About-Tasks-task"><!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<button data-bind="click: deleteTask">x</button>\n<span data-bind="text: task"></span></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Communicating-layout"><div class="panels">\n    <!-- Pass the shared observable to child panes -->\n\n    <div data-bind="pane: \'sender\',\n                    data: observable"></div>\n\n    <div data-bind="pane: \'receiver\',\n                    data: observable"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Communicating-receiver"><div>\n    Observable: <span data-bind="text: observable"></span>\n</div>\n\n<div>\n    Messages:\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: message"></li>\n    </ul>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Communicating-sender"><div>\n    Observable: <input data-bind="value: observable" />\n</div>\n\n<div>\n    Message: <input data-bind="value: message"/>\n    <button data-bind="click: send">Send</button>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Creating-helloWorld"><div class="helloWorld">\n    <h1>Hello, World!</h1>\n\n    <!-- Bind our message property -->\n    <span data-bind="text: message"></span>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Dynamic-create"><button data-bind="click: createPane">Create Pane</button>\n\n<!-- New panes will be appended to this element -->\n<div class="items"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Dynamic-item"><div>\n    This is pane number \n\n    <!-- If our pane doesn\'t have a model, you can access \n         the pane property in data bindings -->\n    <span data-bind="text: pane.data"></span>.\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Lifecycle-create"><button data-bind="click: createPane">Create Pane</button>\n<div class="items"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Lifecycle-item"><div>\n    This is pane number <span data-bind="text: data"></span>.\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Navigating-first"><div>\n    This is the first pane in our navigation stack.\n</div>\n<button data-bind="click: next">Next</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Navigating-layout"><!-- The handlesNavigation binding marks the underlying node\n     as the node that should transition on navigation -->\n\n<div data-bind="pane: \'first\', handlesNavigation: \'fade\'">\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Navigating-second"><div>\n    This is the second pane in our navigation stack.\n</div>\n<button data-bind="click: back">Back</button>\n<button data-bind="click: next">Next</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Panes-Navigating-third"><div>\n    And the last one!\n</div>\n<button data-bind="click: back">Back</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-1-Folders-folders"><!-- A simple list of the folder names.\n     Apply the "selected" CSS class to the selected folder.\n     On click, set the selected folder -->\n\n<ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectedFolder"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-2-Mails-folders"><!-- The click binding is now to the selectFolder function -->\n\n<ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-2-Mails-layout"><!-- The handlesNavigation binding tells Tribe to use that node for navigation. -->\n\n<div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }"></div>\n<div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-2-Mails-mails"><table class="mails" data-bind="with: data">\n    <thead>\n        <tr>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th>Date</th>\n        </tr>\n    </thead>\n\n    <tbody data-bind="foreach: mails">\n        <tr>\n            <td data-bind="text: from"></td>\n            <td data-bind="text: to"></td>\n            <td data-bind="text: subject"></td>\n            <td data-bind="text: date"></td>\n        </tr>     \n    </tbody>\n</table></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-3-Content-folders"><ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-3-Content-layout"><div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }"></div>\n<div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-3-Content-mails"><table class="mails" data-bind="with: data">\n    <thead>\n        <tr>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th>Date</th>\n        </tr>\n    </thead>\n\n    <tbody data-bind="foreach: mails">\n        <tr data-bind="click: $root.selectMail">\n            <td data-bind="text: from"></td>\n            <td data-bind="text: to"></td>\n            <td data-bind="text: subject"></td>\n            <td data-bind="text: date"></td>\n        </tr>     \n    </tbody>\n</table></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Webmail-3-Content-viewMail"><div class="viewMail" data-bind="with: data">\n    <div class="mailInfo">\n        <h1 data-bind="text: subject"></h1>\n        <p><label>From</label>: <span data-bind="text: from"></span></p>\n        <p><label>To</label>: <span data-bind="text: to"></span></p>\n        <p><label>Date</label>: <span data-bind="text: date"></span></p>\n        <div class="message">\n            <p data-bind="html: messageContent" />            \n        </div>\n    </div>\n</div></script>');
TC.scriptEnvironment = { resourcePath: '/Content/Guides/Guides/Webmail/tutorial' };
Tutorials.webmail = {
    frames: [
        'Webmail/folders',
        'Webmail/mails',
        'Webmail/content'
    ]
}
//@ sourceURL=tribe://Panes/Content/Guides/Guides/Webmail/tutorial.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/api' };
Reference.API = [
    {
        name: 'TC.run',
        description: 'Start Tribe.Composite, ensuring the specified resources are loaded first.',
        arguments: [
            { name: 'resourcesToPreload', type: '[String]', description: 'URLs to required HTML, CSS or JS resources.' },
            { name: 'initialModel', type: 'Any', description: 'The model supplied to the initial ko.applyBindings call.' }
        ],
        returns: 'undefined'
    },
    {
        name: 'TC.createNode',
        description: 'Creates a new Pane object and binds it to the specified element with the specified pane options, and encapsulates it in a Node object.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.appendNode',
        description: 'Same as createNode, but appends a new DIV element to the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.insertNodeAfter',
        description: 'Same as createNode, but inserts a new DIV element after the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.nodeFor',
        description: 'Find the Node object for the specified selector, Node or Pane.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.registerModel',
        description: 'Registers a model in the repository. Either the TC.scriptEnvironment must be set first or a resourcePath must be specified.',
        arguments: [
            { name: 'modelConstructor', type: 'Function' },
            { name: 'options', type: 'Object' },
            { name: 'resourcePath', type: 'String' }
        ],
        returns: 'undefined'
    }
];
//@ sourceURL=tribe://Panes/Content/Reference/Core/api.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/panes' };
Reference.Panes = {
    options: [
        { name: 'pane', type: 'String', description: 'Required. Relative paths will evaluate relative to the parent pane.' },
        { name: 'data', type: 'Any', description: 'Data to pass to the pane.' },
        { name: 'handlesNavigation', type: 'String | NavigationOptions', description: 'The underlying node is marked as the node to transition when child panes navigate.' },
        { name: 'transition', type: 'String', description: 'Transition to use when the pane is transitioned in or out.' },
        { name: 'reverseTransitionIn', type: 'Boolean', description: 'Use the reverse transition when transitioning in.' },
        { name: 'id', type: 'Any', description: 'An optional unique identifier for the pane.' },
        { name: 'skipPath', type: 'Boolean', description: 'When specified, the pane is skipped when determining the parent pane path.' }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Core/panes.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/transitions' };
Reference.Transition = {
    name: 'TC.transition',
    description: 'Create an object with a set of functions for transition elements and nodes.',
    arguments: [
        { name: 'target', type: 'selector | TC.Types.Pane | TC.Types.Node', description: 'The target of the transition.' },
        { name: 'transition', type: 'String', description: 'The name of the transition registered in the TC.Transitions collection. If not specified, this will default to transition specified on the pane or node.<br/>Built-in transitions are fade, slideLeft, slideRight, slideUp and slideDown.' },
        { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition to the one specified.' }
    ],
    returns: 'Object'
};

Reference.Transition.Functions = [
    {
        name: 'in',
        description: 'Transition the target into view. Returned promise resolves when transition is complete.',
        returns: 'jQuery.Deferred'
    },
    {
        name: 'out',
        description: 'Transition the target out of view. By default, the target is removed from the DOM after transitioning. Returned promise resolves when transition is complete.',
        arguments: [
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the target instead.' }
        ],
        returns: 'jQuery.Deferred'
    },
    {
        name: 'to',
        description: 'Transition the target to another pane. If the target is an element, a new node is created. Returned promise resolves when the render operation for the new pane is complete.',
        arguments: [
            { name: 'paneOptions', type: 'String | Object', description: 'The path to the new pane or an object containing path and data properties.' },
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the original target instead of removing.' }
        ],
        returns: 'jQuery.Deferred'
    }
];
//@ sourceURL=tribe://Panes/Content/Reference/Core/transitions.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/MessageHub/client' };
Reference.MessageHub = [
    {
        name: 'TMH.initialise',
        description: 'Initialise the MessageHub client.',
        returns: 'undefined',
        arguments: [
            { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub object to attach to.' },
            { name: 'url', type: 'String', description: 'The URL of the SignalR instance. Usually "signalr".' }
        ]
    },
    {
        name: 'TMH.joinChannel',
        description: 'Join the specified channel.',
        returns: '{ leave: function () { } }',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' },
            { name: 'options', type: 'Object', description: 'A hashtable of options, described below.' }
        ]
    },
    {
        name: 'TMH.leaveChannel',
        description: 'Leave the specified channel.',
        returns: 'undefined',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' }
        ]
    },
    {
        name: 'TMH.publishToServer',
        description: 'Publish a message to the server.',
        returns: 'undefined',
        arguments: [
            { name: 'channelId', type: 'String', description: 'The channel identifier.' },
            { name: 'envelope', type: 'Object', description: 'The PubSub message envelope. See the PubSub reference for more information.' },
            { name: 'record', type: 'Boolean', description: 'Request the server to record the message.' }
        ]
    }
];

Reference.MessageHub.ChannelOptions = [
    { name: 'serverEvents', type: '[String]', description: 'An array of message topics to publish to the server. Wildcards can be used.' },
    { name: 'record', type: 'Boolean', description: 'Request the server to record messages published to this channel.' },
    { name: 'replay', type: 'Boolean', description: 'Request the server to replay messages previously published to this channel.' }
];
//@ sourceURL=tribe://Panes/Content/Reference/MessageHub/client.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/MessageHub/configuration' };
Reference.MessageHub.Server = [
    {
        name: 'TopicResolver',
        description: 'Specify a function to resolve message types to a topic names.',
        arguments: [
            { name: 'resolver', type: 'Func<Type, string>', description: 'A function that resolves a message type to a topic name.' }
        ]
    },
    {
        name: 'TopicResolver<T>',
        description: 'Specify a type to resolve message types to a topic names. The default uses the type name as the client message topic.',
        arguments: [
            { name: '', type: 'IMessageTopicResolver', description: 'A type that implements IMessageTopicResolver.' }
        ]
    },
    {
        name: 'MessageSerialiser<T>',
        description: 'Specify a type to serialise messages. The default is JsonMessageSerialiser.',
        arguments: [
            { name: '', type: 'IMessageSerialiser', description: 'A type that implements IMessageSerialiser.' }
        ]
    },
    {
        name: 'MessageBus<T>',
        description: 'Specify a type that handles translation of client and server side messages.',
        arguments: [
            { name: '', type: 'IMessageBus', description: 'A type that implements IMessageBus.' }
        ]
    },
    {
        name: 'MessagesFrom',
        description: 'Use incoming and outgoing message types from the specified assemblies.',
        arguments: [
            { name: 'assemblies', type: 'params Assembly[]', description: 'A parameter array of assemblies.' }
        ]
    },
    {
        name: 'HostStarter<T>',
        description: 'Specify a type that can initialise and start the MessageHub host. The default is the IisHostStarter.',
        arguments: [
            { name: '', type: 'IHostStarter', description: 'A type that implements IHostStarter.' }
        ]
    },
    {
        name: 'ChannelAuthoriser<T>',
        description: 'Specify a type that can authorise channel requests.',
        arguments: [
            { name: '', type: 'IChannelAuthoriser', description: 'A type that implements IChannelAuthoriser.' }
        ]
    },
    {
        name: 'SqlServerPersistence',
        description: 'Store recorded messages in a SQL Server database. Requires a reference to the Tribe.MessageHub.ChannelPersisters.SqlServer assembly.',
        arguments: [
            { name: 'connectionStringOrName', type: 'String', description: 'A literal connection string or the name of a connection string defined in the configuration file.' }
        ]
    },
    {
        name: 'NServiceBus',
        description: 'Use NServiceBus as the server side messaging infrastructure. Requires a reference to the Tribe.MessageHub.Buses.NServiceBus assembly.',
        arguments: [
            { name: 'bus', type: 'NServiceBus.IBus', description: 'A configured instance of the NServiceBus IBus interface.' }
        ]
    },
];
//@ sourceURL=tribe://Panes/Content/Reference/MessageHub/configuration.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/PubSub/core' };
Reference.PubSub = {
    name: 'Tribe.PubSub',
    description: 'A fully featured publish / subscribe engine.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'A hashtable of options. These are the same as and override those specified in global options.' }
        ]
    },
    functions: [
        {
            name: 'publish',
            description: 'Publish the specified message to the bus.',
            arguments: [
                { name: 'topicOrEnvelope', type: 'String | Object', description: 'A string message topic or a message envelope object.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'publishSync',
            description: 'Publish the specified message to the bus synchronously.',
            arguments: [
                { name: 'topic', type: 'String', description: 'The message topic.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'subscribe',
            description: 'Subscribe to one or more message topics. Returns numeric token(s) that can be used to unsubscribe message handlers.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'func', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'subscribeOnce',
            description: 'Subscribe to one or more message topics with a handler that is executed once only.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'handler', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'unsubscribe',
            description: 'Unsubscribe one or more message handlers.',
            arguments: [
                { name: 'tokens', type: 'Number | [Number]', description: 'A single subscription token or array of tokens to unsubscribe. Returns the token(s) that were successfully unsubscribed.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'createLifetime',
            description: 'Create a child PubSub object where all subscriptions can be removed by calling .end().',
            returns: 'Object'
        }
    ],
    properties: [
        {
            name: 'owner',
            description: 'The root PubSub object. Child lifetimes will refer back to the owning PubSub object.',
            type: 'Tribe.PubSub'
        },
        {
            name: 'sync',
            description: 'True if the PubSub object is operating synchronously.',
            type: 'Boolean'
        },
        {
            name: 'subscribers',
            description: 'A managed collection of message subscribers. Use get(\'*\') to retrieve all subscribers.',
            type: 'Tribe.PubSub.SubscriberList'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/PubSub/core.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/PubSub/envelopes' };
Reference.PubSub.Envelopes = [
    { name: 'topic', type: 'String', description: 'The message topic.' },
    { name: 'data', type: 'Any', description: 'The message data.' },
    { name: 'sync', type: 'Boolean', description: 'Publish the message synchronously.' },
    { name: 'server', type: 'Boolean', description: 'True if the message originated from a Tribe.MessageHub host.' }
];
//@ sourceURL=tribe://Panes/Content/Reference/PubSub/envelopes.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/History' };
Reference.Types.History = {
    name: 'TC.Types.History',
    description: 'Maintains the state of the browser history stack, including URL data.',
    constructor: {
        arguments: [
            { name: 'history', type: 'window.History', description: 'An object that exposes an interface matching that of the window.History object.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Load a history entry onto the stack.',
            arguments: [
                { name: 'urlOptions', type: 'Object', description: 'An object containing url and title properties.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'go',
            description: 'Move the current stack frame forward or back the specified number of frames, triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'update',
            description: 'Move the current stack frame forward or back the specified number of frames, WITHOUT triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the History object.',
            returns: 'undefined'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/History.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Loader' };
Reference.Types.Loader = {
    name: 'TC.Types.Loader',
    description: 'Ensures URLs are only loaded once. Concurrent requests return the same promise. The actual loading of resources is performed by specific LoadHandlers.',
    functions: [
        {
            name: 'get',
            description: 'Load the specified URL using the LoadHandler that corresponds with the file extension. Returns the result of executing the LoadHandler, usually a jQuery.Deferred.',
            arguments: [
                { name: 'url', type: 'String', description: 'The URL to load.' },
                { name: 'resourcePath', type: 'String', description: 'The resource path to pass to the LoadHandler.' },
                { name: 'context', type: 'Any', description: 'A context object to pass to the LoadHandler.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Loader.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Logger' };
Reference.Types.Logger = {
    name: 'TC.Types.Logger',
    description: 'Provides a unified API for logging functionality',
    functions: [
        {
            name: 'debug',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'info',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'warn',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'error',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogLevel',
            description: '',
            arguments: [
                { name: 'level', type: 'Number', description: 'Number corresponding with the desired log level - 0 = debug, 4 = none.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogger',
            description: 'Set the underlying logging mechanism registed in the TC.Loggers collection. Default is \'console\'.',
            arguments: [
                { name: 'newLogger', type: 'String' }
            ],
            returns: 'undefined'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Logger.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Models' };
Reference.Types.Models = {
    name: 'TC.Types.Models',
    description: 'Managed collection of pane models.',
    functions: [
        {
            name: 'register',
            description: 'Register a model model with the collection. Registered models can be accessed as properties on the collection, keyed by resource path.',
            arguments: [
                { name: 'resourcePath', type: 'String', description: 'Associated pane path.' },
                { name: 'constructor', type: 'Function', description: 'Constructor function for the model.' },
                { name: 'options', type: 'Object', description: 'Options hashtable to store with the model.' }
            ],
            returns: ''
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Models.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Node' };
Reference.Types.Node = {
    name: 'TC.Types.Node',
    description: 'A Node object is a placeholder for a pane within the UI structure. Nodes can be transitioned to display different panes using the navigate or transitionTo functions.',
    constructor: {
        arguments: [
            { name: 'parent', type: 'TC.Types.Node' },
            { name: 'pane', type: 'TC.Types.Pane' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Find the navigation node for the current node and transition it to the specified pane, updating the history stack.',
            arguments: [
                { name: 'pathOrPane', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'navigateBack',
            description: 'Find the navigation node for the current node and transition it to the previous pane in the history stack.',
            returns: 'undefined'
        },
        {
            name: 'findNavigation',
            description: 'Find the node that handles navigation for the current node. Usually the closest parent that has been marked with handlesNavigation, unless overridden.',
            returns: 'TC.Types.Navigation'
        },
        {
            name: 'transitionTo',
            description: 'Transition the pane for the current node to the specified pane.',
            arguments: [
                { name: 'paneOptions', type: 'Object', description: 'An object containined path and data properties.' },
                { name: 'transition', type: 'String', description: 'The transition to use.' },
                { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setPane',
            description: 'Sets the pane on the current node.',
            arguments: [
                { name: 'pane', type: 'TC.Types.Pane' }
            ],
            returns: 'undefined'
        },
        {
            name: 'nodeForPath',
            description: 'Find the node to use for inheriting paths from.',
            returns: 'TC.Types.Node'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the node.',
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'parent',
            type: 'TC.Types.Node'
        },
        {
            name: 'children',
            type: '[TC.Types.Node]'
        },
        {
            name: 'root',
            description: 'The root node of the current node tree.',
            type: 'TC.Types.Node'
        },
        {
            name: 'id',
            description: 'A unique numeric identifier for the current node.',
            type: 'Number'
        },
        {
            name: 'pane',
            type: 'TC.Types.Pane'
        },
        {
            name: 'navigation',
            description: 'The Navigation object for the current node, if any.',
            type: 'TC.Types.Navigation'
        },
        {
            name: 'defaultNavigation',
            description: 'The default Navigation object to use for the current node. Set on the root node so that all nodes in the tree can access the navigation node.',
            type: 'TC.Types.Node'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Node.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Operation' };
Reference.Types.Operation = {
    name: 'TC.Types.Operation',
    description: 'Encapsulates an operation involving several child operations, keyed by an id. Child operations can be added cumulatively. Promise resolves when the all child operations complete.',
    functions: [
        {
            name: 'add',
            description: 'Add an id corresponding with a child operation',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        },
        {
            name: 'complete',
            description: 'Mark the specified id is being complete',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'promise',
            description: 'The promise object representing the state of the operation.',
            type: 'jQuery.Deferred'
        },
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Operation.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Pane' };
Reference.Types.Pane = {
    name: 'TC.Types.Pane',
    description: 'A pane is a single user interface component within an application. It can consist of a HTML template, a JavaScript model and a CSS stylesheet. Panes can be nested within other panes.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'Hashtable of options for the pane.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Navigate the node containing the pane to the specified pane.',
            arguments: [
                { name: 'pathOrPane', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'remove',
            description: 'Remove the pane from the DOM.',
            returns: 'undefined'
        },
        {
            name: 'find',
            description: 'Find elements contained within the pane.',
            arguments: [
                { name: 'selector', type: 'selector' }
            ],
            returns: 'jQuery'
        },
        {
            name: 'inheritPathFrom',
            description: 'If the pane\'s current path is relative, inherit the absolute path from the specified node.',
            arguments: [
                { name: 'node', type: 'TC.Types.Node' }
            ],
            returns: 'undefined'
        },
        {
            name: 'startRender',
            description: 'Adds a CSS class to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'endRender',
            description: 'Remvoes the CSS class used to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the pane.',
            returns: 'undefined'
        },
        {
            name: 'toString',
            description: 'Returns a human readable identifier for the pane.',
            returns: 'String'
        }
    ],
    properties: [
        {
            name: 'path',
            type: 'String'
        },
        {
            name: 'data',
            type: 'Any'
        },
        {
            name: 'element',
            type: 'HTMLElement'
        },
        {
            name: 'transition',
            description: 'Transition to use when the pane is rendered and removed.',
            type: ''
        },
        {
            name: 'reverseTransitionIn',
            description: 'Use the reverse transition when rendering.',
            type: ''
        },
        {
            name: 'handlesNavigation',
            description: 'The pane has been marked as handling navigation.',
            type: ''
        },
        {
            name: 'pubsub',
            type: 'Tribe.PubSub'
        },
        {
            name: 'id',
            type: 'Any'
        },
        {
            name: 'skipPath',
            description: 'Skip this pane when determining the parent path to inherit from.',
            type: 'Boolean'
        },
        {
            name: 'is.rendered',
            description: '',
            type: ''
        },
        {
            name: 'is.disposed',
            description: '',
            type: ''
        },
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Pane.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Pipeline' };
Reference.Types.Pipeline = {
    name: 'TC.Types.Pipeline',
    description: 'Manages the step by step execution of a number of named events. Each step will only execute after the promise returned by the previous step resolves. A rejected promise will halt execution of the pipeline.',
    constructor: {
        arguments: [
            { name: 'events', type: 'Object', description: 'Hashtable of event handler functions, keyed by the event name.' },
            { name: 'context', type: 'Any', description: 'Context data that is passed to each event function.' }
        ]
    },
    functions: [
        {
            name: 'execute',
            description: 'Execute the specified events against the specified target.',
            arguments: [
                { name: 'eventsToExecute', type: '[String]', description: 'Ordered array of events to execute against the target.' },
                { name: 'target', type: 'Object', description: 'Target object to pass to each event handler function.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Pipeline.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Saga' };
Reference.Types.Saga = {
    name: 'TC.Types.Saga',
    description: 'Manages a long running process by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'pane', type: 'TC.Types.Pane', description: 'A Pane object to serve as the saga\'s "parent". The lifetime of the saga is tied to the pane.' },
            { name: 'handlers', type: 'Object', description: 'A hashtable of message handlers, keyed by the message topic.' },
            { name: 'initialData', type: 'Any', description: 'Initial value for the saga\'s data property.' }
        ]
    },
    functions: [
        {
            name: 'start',
            description: 'Subscribes provided message handlers to messages published on the pane\'s pubsub engine.',
            returns: 'undefined'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'childHandlers', type: 'Object', description: 'A hashtable of message handlers, keyed by the message topic.' },
                { name: 'childData', type: 'Any', description: 'Initial value for the saga\'s data property.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            returns: 'undefined'
        }
    ],
    properties: [
        { name: 'pubsub', type: 'Tribe.PubSub' },
        { name: 'pane', type: 'TC.Types.Pane' },
        { name: 'data', type: 'Any' },
        { name: 'children', type: '[TC.Types.Saga]' }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Saga.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Templates' };
Reference.Types.Templates = {
    name: 'TC.Types.Templates',
    description: 'Managed collection of HTML templates.',
    functions: [
        {
            name: 'store',
            description: 'Store the specified template, keyed by the specified path',
            arguments: [
                { name: 'template', type: 'String' },
                { name: 'path', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'loaded',
            description: 'Checks whether the template for the specified path has been loaded',
            arguments: [
                { name: 'path', type: 'String' }
            ],
            returns: 'Boolean'
        },
        {
            name: 'render',
            description: 'Render the template for the specified path to the specified target',
            arguments: [
                { name: 'target', type: 'selector' },
                { name: 'path', type: 'string' }
            ],
            returns: 'undefined'
        }
    ]
};
//@ sourceURL=tribe://Panes/Content/Reference/Types/Templates.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/collections' };
Reference.Utilities.Collections = [
    { name: 'TC.Utils.each', description: '', arguments: [{ name: 'collection' }, { name: 'iterator' }] },
    { name: 'TC.Utils.map', description: '', arguments: [{ name: 'collection' }, { name: 'iterator' }] },
    { name: 'TC.Utils.reduce', description: '', arguments: [{ name: 'collection' }, { name: 'initialValue' }, { name: 'iterator' }] },
    { name: 'TC.Utils.filter', description: '', arguments: [{ name: 'array' }, { name: 'iterator' }] },
    { name: 'TC.Utils.pluck', description: '', arguments: [{ name: 'array' }, { name: 'iterator' }] }
];
//@ sourceURL=tribe://Panes/Content/Reference/Utilities/collections.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/embeddedState' };
Reference.Utilities.EmbeddedState = [
    { name: 'TC.Utils.embedState', description: '', arguments: [{ name: 'model' }, { name: 'context' }, { name: 'node' }] },
    { name: 'TC.Utils.contextFor', description: '', arguments: [{ name: 'element' }] },
    { name: 'TC.Utils.extractContext', description: '', arguments: [{ name: 'koBindingContext' }] },
    { name: 'TC.Utils.extractNode', description: '', arguments: [{ name: 'koBindingContext' }] }
];
//@ sourceURL=tribe://Panes/Content/Reference/Utilities/embeddedState.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/events' };
Reference.Utilities.Events = [
    { name: 'TC.Utils.elementDestroyed', description: '', arguments: [{ name: 'element' }], returns: 'jQuery.Deferred' },
    { name: 'TC.Utils.raiseDocumentEvent', description: '', arguments: [{ name: 'name' }, { name: 'data' }] },
    { name: 'TC.Utils.handleDocumentEvent', description: '', arguments: [{ name: 'name' }, { name: 'handler' }] },
    { name: '$.complete', description: '', arguments: [{ name: 'deferreds' }] },
    { name: 'jQuery.Event("destroyed")' }
];

//@ sourceURL=tribe://Panes/Content/Reference/Utilities/events.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/misc' };
Reference.Utilities.Misc = [
    { name: 'TC.Utils.try', description: '', arguments: [{ name: 'func' }, { name: 'args' }, { name: 'handleExceptions' }, { name: 'message' }] },
    { name: 'TC.Utils.idGenerator', description: '', returns: '{ next: function() }' },
    { name: 'TC.Utils.getUniqueId', description: '' },
    { name: 'TC.Utils.cleanElement', description: '', arguments: [{ name: 'element' }] }
];

//@ sourceURL=tribe://Panes/Content/Reference/Utilities/misc.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/objects' };
Reference.Utilities.Objects = [
    { name: 'TC.Utils.arguments', description: '', arguments: [{ name: 'args' }] },
    { name: 'TC.Utils.removeItem', description: '', arguments: [{ name: 'array' }, { name: 'item' }] },
    { name: 'TC.Utils.inheritOptions', description: '', arguments: [{ name: 'from' }, { name: 'to' }, { name: 'options' }] },
    { name: 'TC.Utils.evaluateProperty', description: '', arguments: [{ name: 'target' }, { name: 'property' }] }
];

//@ sourceURL=tribe://Panes/Content/Reference/Utilities/objects.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/packScript' };
Reference.Utilities.PackScript = [
];
//@ sourceURL=tribe://Panes/Content/Reference/Utilities/packScript.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/panes' };
Reference.Utilities.Panes = [
    {
        name: 'TC.Utils.getPaneOptions',
        description: 'Normalise the passed value and merge the other options.',
        arguments: [{ name: 'value' }, { name: 'otherOptions' }]
    },
    {
        name: 'TC.Utils.bindPane',
        description: 'Load and bind the pane specified in paneOptions to the specified element and link it to the specified node.',
        arguments: [{ name: 'node' }, { name: 'element' }, { name: 'paneOptions' }, { name: 'context' }]
    },
    {
        name: 'TC.Utils.insertPaneAfter',
        description: 'As bindPane, but create a new DIV element and insert it after the specified target.',
        arguments: [{ name: 'node' }, { name: 'target' }, { name: 'paneOptions' }, { name: 'context' }]
    }
];
//@ sourceURL=tribe://Panes/Content/Reference/Utilities/panes.js
TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/paths' };
Reference.Path = [
    {
        name: 'TC.Path',
        description: 'The Path function accepts a string containing a path, normalises the path and returns an object with several manipulation functions attached.',
        arguments: [{ name: 'path', type: 'String' }],
        returns: 'TC.Path',
        examples: [{
            description: 'Most functions can be chained',
            code: "TC.Path('Folder').makeAbsolute().combine('file.ext').withoutExtension().toString()",
            result: '/Folder/file'
        }]
    }
];

Reference.Path.Functions = [
    { name: 'withoutFilename', description: '', returns: 'TC.Path' },
    { name: 'filename', description: '', returns: 'TC.Path' },
    { name: 'extension', description: '', returns: 'String' },
    { name: 'withoutExtension', description: '', returns: 'TC.Path' },
    { name: 'combine', description: '', arguments: [{ name: 'additionalPath' }], returns: 'TC.Path' },
    { name: 'isAbsolute', description: '', returns: 'Boolean' },
    { name: 'makeAbsolute', description: '', returns: 'TC.Path' },
    { name: 'makeRelative', description: '', returns: 'TC.Path' },
    { name: 'asMarkupIdentifier', description: '', returns: 'String' },
    { name: 'setExtension', description: '', arguments: [{ name: 'extension' }], returns: 'TC.Path' },
    { name: 'toString', description: '', returns: 'String' }
];
//@ sourceURL=tribe://Panes/Content/Reference/Utilities/paths.js
TC.scriptEnvironment = { resourcePath: '/Interface/content' };
TC.registerModel(function (pane) {
    this.panePath = panePath(pane.data);

    this.renderComplete = function() {
        pane.find('pre').each(function() {
            $(this).html(PR.prettyPrintOne($(this).html()));
        });
    };

    pane.pubsub.subscribe('article.show', function (article) {
        $(pane.element).css({ 'width': '100%' });
        pane.navigate({ path: '/Interface/content', data: article });
    });
    
    function panePath(article) {
        return '/Content/' + article.section + '/' + article.topic;
    }
});
//@ sourceURL=tribe://Panes/Interface/content.js
TC.scriptEnvironment = { resourcePath: '/Interface/header' };
TC.registerModel(function (pane) {
    window.addEventListener('navigating', navigating);
    function navigating(e) {
        if (Navigation.isHome(e.data.options.data))
            hide();
        else
            show();
    }

    this.renderComplete = function() {
        if (!Navigation.isHome(pane.node.findNavigation().node.pane.data))
            show();
    };

    function show() {
        if (!$('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').in();
    }

    function hide() {
        if ($('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').out(false);
    }

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };
});
//@ sourceURL=tribe://Panes/Interface/header.js
TC.scriptEnvironment = { resourcePath: '/Interface/navigation' };
TC.registerModel(function (pane) {
    var self = this;
    var currentSection;

    this.items = ko.observableArray();
    this.selectedTopic = ko.observable();
    this.selectedParent = ko.computed(function () {
        var topic = self.selectedTopic();
        if (!topic) return null;
        var index = topic.indexOf('/');
        return index == -1 ? topic :
            topic.substr(0, index);
    });

    this.showSection = function (item) {
        self.selectedTopic(item.topic);
    };

    this.showArticle = function (item) {
        self.selectedTopic(item.topic);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    // it would be nice to use the article.show message for this,
    // but that won't work with browser back and forward buttons
    window.addEventListener('navigating', navigating);
    function navigating(e) {
        var data = e.data.options.data || {};
        updateCurrentArticle(data);
    }
    
    // this is to handle bookmarks / refresh
    // need to come up with a better way of doing this
    this.renderComplete = function() {
        updateCurrentArticle(pane.node.findNavigation().node.pane.data);
    };

    function updateCurrentArticle(data) {
        if (data.section && data.topic) {
            self.selectedTopic(data.topic);

            if (currentSection !== data.section) {
                currentSection = data.section;
                var items = mapNavigation(data.section);
                if (items.length > 0) {
                    self.items(items);
                    show();
                } else
                    hide();
            }
        }
    }

    function show() {
        if (!$('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideRight').in();
    }

    function hide() {
        if ($('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideLeft').out(false);
    }

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };

    // maps the cleaner API navigation structure into a structure suitable for data bindings. could be refactored out.
    function mapNavigation(section) {
        return TC.Utils.map(Navigation[section], function (item, key) {
            return {
                displayText: key,
                section: section,
                key: key,
                topic: key + '/index',
                items: mapChildItems(key, item)
            };
        });
    }

    function mapChildItems(parentKey, container) {
        return TC.Utils.map(container, function (item, key) {
            return {
                displayText: key,
                topic: parentKey + '/' + item
            };
        });
    }
});
//@ sourceURL=tribe://Panes/Interface/navigation.js
TC.scriptEnvironment = { resourcePath: '/Interface/navigationContainer' };
TC.registerModel(function (pane) {
    pane.node.skipPath = true;
    pane.node.root = pane.node;

    var currentFrame = 0;
    this.initialPane = pane.data.frames[currentFrame];
    this.atStart = ko.observable(true);
    this.atEnd = ko.observable(false);

    this.back = function() {
        pane.navigateBack();
        currentFrame--;
        this.atEnd(false);
        this.atStart(currentFrame === 0);
    };

    this.next = function() {
        pane.navigate(pane.data.frames[++currentFrame]);
        this.atEnd(currentFrame === pane.data.frames.length - 1);
        this.atStart(false);
    };
    
    
});
//@ sourceURL=tribe://Panes/Interface/navigationContainer.js
TC.scriptEnvironment = { resourcePath: '/Interface/sample' };
TC.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};
    var rootPane = data.rootPane || 'layout';

    // this is a hack to make samples navigate as if they were the root pane
    pane.node.root = pane.node;

    this.samplePane = rootPane.constructor === String ? 
        '/Samples/' + data.name + '/' + rootPane : rootPane;
    this.files = Samples[pane.data.name];
    this.selectedFile = ko.observable(initialSelection());
    
    this.selectFile = function(file) {
        self.selectedFile(file);
        PR.prettyPrint();
    };

    this.renderComplete = function() {
        PR.prettyPrint();
    };
    
    function initialSelection() {
        if (!pane.data.initialFile)
            return self.files[0];
        for(var i = 0; i < self.files.length; i++)
            if (self.files[i].filename === pane.data.initialFile)
                return self.files[i];
    }
});
//@ sourceURL=tribe://Panes/Interface/sample.js
TC.scriptEnvironment = { resourcePath: '/Interface/API/constructor' };
TC.registerModel(function (pane) {    
    this.func = $.extend({ name: 'new ' + pane.data.name }, pane.data.constructor);
});
//@ sourceURL=tribe://Panes/Interface/API/constructor.js
TC.scriptEnvironment = { resourcePath: '/Interface/API/function' };
TC.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = TC.Utils.pluck(pane.data.arguments, 'name').join(', ');
});
//@ sourceURL=tribe://Panes/Interface/API/function.js
TC.scriptEnvironment = { resourcePath: '/Interface/API/type' };
TC.registerModel(function(pane) {
    this.t = pane.data;
});
//@ sourceURL=tribe://Panes/Interface/API/type.js
TC.scriptEnvironment = { resourcePath: '/Samples/mobile' };
TC.registerModel(function(pane) {
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });
});
//@ sourceURL=tribe://Panes/Samples/mobile.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/chat' };
TC.registerModel(function (pane) {
    // Hook up our message hub and join a channel
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', {
         serverEvents: ['chat.*']
    });

    // The dispose function is called automatically
    // when the pane is removed from the DOM.
    this.dispose = function() {
        TMH.leaveChannel('chat');
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Chat/chat.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/messages' };
TC.registerModel(function(pane) {
    var self = this;

    this.messages = ko.observableArray();

    pane.pubsub.subscribe('chat.message',
        function (message) {
            self.messages.push(message);
        });
});
//@ sourceURL=tribe://Panes/Samples/About/Chat/messages.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/sender' };
TC.registerModel(function(pane) {
    var self = this;

    this.name = ko.observable('Anonymous');
    this.message = ko.observable();

    this.send = function() {
        pane.pubsub.publish('chat.message', {
            name: self.name(),
            message: self.message()
        });
        self.message('');
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Chat/sender.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Mobile/layout' };
TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    TC.toolbar.options([
        { text: 'test', func: function () { alert('test'); } },
        { text: 'test2', func: function () { alert('test2'); } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' }
        ],
        itemText: function (item) { return item.id + ': ' + item.name; },
        headerText: 'Select Item:',
        itemClick: function(item) {
        },
        cssClass: 'rounded'
    };

    this.overlay = function() {
        TC.overlay('overlay');
    };

    this.toolbar = function () {
        TC.toolbar.visible(!TC.toolbar.visible());
    };

    this.navigate = function() {
        pane.navigate('navigate');
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Mobile/layout.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Mobile/welcome' };
TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('layout');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Mobile/welcome.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/create' };
// Declare model constructors using this simple function.
// Tribe creates an instance and binds it to the template.

TC.registerModel(function (pane) {
    var self = this;
    
    this.task = ko.observable();
    
    this.create = function() {
        pane.pubsub.publish('task.create', self.task());
        self.task('');
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Tasks/create.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/list' };
TC.registerModel(function(pane) {
    var self = this;

    this.tasks = ko.observableArray(['Sample task']);

    // Using messages decouples your components.
    // Tribe cleans up subscriptions automatically.
    pane.pubsub.subscribe('task.create', function(task) {
        self.tasks.push(task);
    });

    pane.pubsub.subscribe('task.delete', function (task) {
        var index = self.tasks.indexOf(task);
        self.tasks.splice(index, 1);
    });
});
//@ sourceURL=tribe://Panes/Samples/About/Tasks/list.js
TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/task' };
TC.registerModel(function(pane) {
    var self = this;

    this.task = pane.data;
    
    this.deleteTask = function() {
        pane.pubsub.publish('task.delete', self.task);
    };
});
//@ sourceURL=tribe://Panes/Samples/About/Tasks/task.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/layout' };
TC.registerModel(function (pane) {
    // Create an observable to share between child panes
    this.observable = ko.observable('Test');
});
//@ sourceURL=tribe://Panes/Samples/Panes/Communicating/layout.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/receiver' };
TC.registerModel(function(pane) {
    var self = this;

    // Our shared observable
    this.observable = pane.data;
    
    // Listen for messages and push them onto 
    // an array as they arrive
    this.messages = ko.observableArray();
    pane.pubsub.subscribe('sample.message', function (data) {
        self.messages.push(data);
    });
});
//@ sourceURL=tribe://Panes/Samples/Panes/Communicating/receiver.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/sender' };
TC.registerModel(function (pane) {
    var self = this;
    
    // Our shared observable
    this.observable = pane.data;
    
    // The pubsub object is available through the pane object.
    this.message = ko.observable();
    this.send = function() {
        pane.pubsub.publish('sample.message',
            { message: self.message() });
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Communicating/sender.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Creating/helloWorld' };
TC.registerModel(function (pane) {
    // Model properties are available for 
    // data binding in your template.
    this.message = "Message passed: " + pane.data.message;
});
//@ sourceURL=tribe://Panes/Samples/Panes/Creating/helloWorld.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Dynamic/create' };
TC.registerModel(function (pane) {
    var i = 0;
    
    // Dynamically insert a pane into the element
    // with its class set to "items".
    this.createPane = function() {
        TC.appendNode('.items', { path: 'item', data: ++i });
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Dynamic/create.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Lifecycle/create' };
TC.registerModel(function (pane) {
    var i = 0;
    
    this.createPane = function() {
        TC.appendNode(pane.find('.items'),
            { path: 'item', data: ++i });
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Lifecycle/create.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Lifecycle/item' };
TC.registerModel(function (pane) {
    this.data = pane.data;

    // The initialise function is called before the pane
    // is rendered. If you return a jQuery deferred object,
    // Tribe will wait for it to resolve before continuing.
    
    this.initialise = function() {
        var promise = $.Deferred();
        setTimeout(promise.resolve, 500);
        return promise;
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Lifecycle/item.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/first' };
TC.registerModel(function(pane) {
    this.next = function() {
        pane.navigate('second');
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Navigating/first.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/second' };
TC.registerModel(function(pane) {
    this.back = function () {
        pane.navigateBack();
    };

    this.next = function () {
        pane.navigate('third');
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Navigating/second.js
TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/third' };
TC.registerModel(function(pane) {
    this.back = function() {
        pane.navigateBack();
    };
});
//@ sourceURL=tribe://Panes/Samples/Panes/Navigating/third.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/1-Folders/folders' };
// Our model just contains a list of folders and
// an observable to hold the selected folder.

TC.registerModel(function (pane) {
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable('Inbox');
});
//@ sourceURL=tribe://Panes/Samples/Webmail/1-Folders/folders.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/2-Mails/folders' };
TC.registerModel(function (pane) {
    var self = this;
    
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    // We've added a separate click handler to navigate
    // when a folder is selected.
    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});
//@ sourceURL=tribe://Panes/Samples/Webmail/2-Mails/folders.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/2-Mails/mails' };
TC.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    // Load data using AJAX to our data property    
    this.initialise = function() {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
});
//@ sourceURL=tribe://Panes/Samples/Webmail/2-Mails/mails.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/folders' };
TC.registerModel(function (pane) {
    var self = this;

    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});
//@ sourceURL=tribe://Panes/Samples/Webmail/3-Content/folders.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/mails' };
TC.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
    
    this.selectMail = function (mail) {
        pane.navigate('viewMail', mail);
    };
});
//@ sourceURL=tribe://Panes/Samples/Webmail/3-Content/mails.js
TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/viewMail' };
TC.registerModel(function (pane) {
    var self = this;
    
    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/mail/' + pane.data.id, self.data);
    };
});
//@ sourceURL=tribe://Panes/Samples/Webmail/3-Content/viewMail.js
$('<style/>')
    .attr('class', '__tribe')
    .text('.block{background:#fff;border:1px solid #aaa;margin-bottom:10px;margin-top:10px;border-radius:8px;box-sizing:border-box;padding:20px}.block p{margin:10px 0;font-size:18px}.block .child{position:relative;padding:15px;border:2px solid #222;border-radius:6px;margin-bottom:10px}.block .child h1{color:#fff;background:#222;font-weight:bold;font-size:inherit;height:20px;margin:-15px -15px 0 -15px;padding:7px 10px 10px 10px}.block .child p{margin:10px 0}.block .child pre{margin:0}.child img{position:absolute;top:50%;right:20px;margin-top:-30px}img.topRight{position:static!important;float:right;margin:0!important}.out .content.block{margin-top:0}.block>h1{color:#fff;font-weight:bold;font-size:inherit;height:20px;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px;margin:-20px -20px 10px -20px;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;background:-moz-linear-gradient(top,#103070 0%,#457ae4 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#103070),color-stop(100%,#457ae4));background:-webkit-linear-gradient(top,#103070 0%,#457ae4 100%);background:-o-linear-gradient(top,#103070 0%,#457ae4 100%);background:-ms-linear-gradient(top,#103070 0%,#457ae4 100%);background:linear-gradient(to bottom,#103070 0%,#457ae4 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#103070\',endColorstr=\'#457ae4\',GradientType=0)}.block h2{font-size:1.2em;font-weight:bold;margin-top:10px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('body{background:#ccc;font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif;padding:0;margin:0;overflow-y:scroll}h1,h2,h3{margin-top:0}b{color:#103070}.padded{padding:10px}.underline{text-decoration:underline}.clear{clear:both}a,a:active,a:visited,a:link{text-decoration:none;cursor:pointer;color:#1b50ba}a:hover{text-decoration:underline}table{border-spacing:0;border-collapse:collapse}th{text-align:left;background:#457ae4;color:#fff;padding:2px 5px}th,td{border:1px solid #457ae4;padding:2px 5px}pre.inline{display:inline-block}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.com{color:green}.str,.tag{color:#a31515}.kwd,.atv{color:#00f}.typ{color:#2b91af}.lit,.atn{color:red}.pun,.pln{color:#000}.dec{color:purple}')
    .appendTo('head');
