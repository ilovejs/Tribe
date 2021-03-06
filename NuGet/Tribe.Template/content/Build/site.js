
// Panes/chat.js


TC.scriptEnvironment = { resourcePath: '/chat' };

TC.registerModel(function(pane) {
    var self = this;

    TMH.initialise(pane.pubsub);
    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });

    this.message = ko.observable();
    this.messages = ko.observableArray();

    this.send = function () {
        pane.pubsub.publish('chat.message', self.message());
    };

    pane.pubsub.subscribe('chat.message', function (message) {
        self.messages.push(message);
    });
});



//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<div class="chat">\n    <input data-bind="value: message" /><br />\n    <button data-bind="click: send">Send Message</button>\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: $data"></li>\n    </ul>\n</div>', 'template--chat');

//
window.__appendTemplate('\n<h1>Application Name</h1>', 'template--header');

//
window.__appendTemplate('\n<p>\n    Welcome to my web application!\n</p>', 'template--home');

//
window.__appendTemplate('\n<div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'home\', handlesNavigation: \'fade\'"></div>\n<div data-bind="pane: \'chat\'"></div>', 'template--layout');

//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('.chat{position:fixed;top:70px;right:10px;padding:10px;height:300px;width:160px;border:1px solid black}');

//
window.__appendStyle('');

// Infrastructure/setup.js

// Any .js file in the Infrastructure folder will be included in the build



//
window.__appendStyle('body{font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif}');