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

$('head')
    .append('<script type="text/template" id="template--chat"><div class="chat">\n    <input data-bind="value: message" /><br />\n    <button data-bind="click: send">Send Message</button>\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: $data"></li>\n    </ul>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--header"><h1>Application Name</h1></script>');
$('head')
    .append('<script type="text/template" id="template--home"><p>\n    Welcome to my web application!\n</p></script>');
$('head')
    .append('<script type="text/template" id="template--layout"><div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'home\', handlesNavigation: \'fade\'"></div>\n<div data-bind="pane: \'chat\'"></div></script>');
$('<style/>')
    .attr('class', '__tribe')
    .text('.chat{position:fixed;top:70px;right:10px;padding:10px;height:300px;width:160px;border:1px solid #000}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('')
    .appendTo('head');
// Infrastructure/setup.js
// Any .js file in the Infrastructure folder will be included in the build

$('<style/>')
    .attr('class', '__tribe')
    .text('body{font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif}')
    .appendTo('head');
