
// Panes/layout.js


TC.scriptEnvironment = { resourcePath: '/layout' };

Reference = {};
Article = {
    show: function (section, topic) {
        return function() {
            window.location.hash = "#" + topic.replace('PackScript/', '');
        };
    }
};

TC.registerModel(function (pane) {
    this.renderComplete = function() {
        pane.find('pre.example').each(function () {
            $(this).html(PR.prettyPrintOne($(this).html()));
        });
    };

    this.sections = [
        section('Introduction', 'intro'),
        section('Operation', 'operation'),
        section('Packing', 'pack'),
        section('Synchronising', 'sync'),
        section('Compressing', 'zip'),
        section('Including Files', 'includes'),
        section('Templates', 'templates'),
        section('Built-in Templates', 'builtins')
    ];

    this.links = [
        link('Download', 'PackScript.zip'),
        link('GitHub', 'https://github.com/danderson00/PackScript'),
        link('Tests', 'http://danderson00.github.io/PackScript/PackScript.Tests/index.html')
    ];
    
    function section(name, pane) {
        return { name: name, pane: pane };
    }
    
    function link(name, href) {
        return { name: name, href: href };
    }
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
window.__appendTemplate('\n<div class="content block">\n    <img src="Images/logo.packscript.gif" class="logo" />\n\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=PackScript&type=watch" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=PackScript&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n\n    <p>\n        PackScript is a powerful open source (<a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT license</a>) \n        resource build system that combines, minifies and transforms your JavaScript, HTML and CSS files based on JavaScript configuration files.\n        PackScript is part of the <a href="http://tribejs.com/" target="_blank">Tribe platform</a>.\n    </p>\n\n    <p>\n        PackScript contains APIs to minify JavaScript, synchronise files, create ZIP files, compile SASS and apply XDT transformations\n        and is easy to extend with both JavaScript and .NET.\n    </p>\n\n    <p>Using PackScript is as simple as creating files named <span class="filename">pack.js</span> that contain intuitive commands.</p>\n    <pre class="example">\npack(\'Scripts/*.js\').to(\'site.js\');</pre>\n    \n    <pre class="example">\npack({\n    to: \'site.js\',\n    include: [\'Scripts/*.js\', \'Libraries/*.js\'],\n    exclude: \'*.debug.js\',\n    recursive: true,\n    minify: true\n});</pre>\n\n    <p>PackScript can easily create multiple versions of your files for production and development scenarios.</p>\n    <pre class="example">\npack({\n    include: [\'Scripts/*.js\', \'Libraries/*.js\'],\n    recursive: true\n}).to({\n    \'site.js\': { exclude: \'*.debug\', minify: true },\n    \'site.debug.js\': { template: \'embedPath\' },\n});</pre>\n    \n    <p>\n        Transform your files with <a href="http://underscorejs.org/#template" target="_blank">underscore.js templates</a>, \n        allowing you to enhance your debugging experience, embed stylesheets and templates and much more - any transformation you can think of.\n    </p>\n    \n    <p>Creating a template is as simple as creating a file that matches the pattern <span class="filename">*.template.*</span>.</p>\n    \n    <p>Let\'s create the \'embedPath\' template from the example above. Create a file called <span class="filename">embedPath.template.js</span>:</p>\n    <pre class="example">\n// <%= pathRelativeToConfig %>\n<%= content %>\n</pre>\n    \n    <p>Now each file will have a simple header containing the original path of the script, making it much easier to debug.</p>\n    \n    <p>Configuration is pure JavaScript - you can create variables and functions to reuse configuration and create conventions.</p> \n    \n    <p>PackScript comes with a number of built-in functions and templates to greatly simplify the packaging of your application.</p>\n    \n    <pre class="example">\npack([\n    T.panes(\'Panes\'),\n    T.scripts(\'Infrastructure\'),\n    T.styles(\'Styles\'),\n    T.templates(\'Templates\')\n]).to(T.webTargets(\'Build/site\');\n</pre>\n    \n    <p>\n        This example creates a set of three files, site.js, site.min.js and site.debug.js, a special debug version that recreates your\n        filesystem in supported browsers (Google Chrome and partial support for FireFox). Each file contains embedded Tribe panes, \n        infrastructure scripts, CSS and HTML templates.\n    </p>\n    \n    <div class="tip">\n        <img src="Images/icon.tip.64.png"/>\n        <p>Why would I want to embed templates and stylesheets in JavaScript?</p>\n        <p>This provides a consistent way of loading resources and removes the need for you to write code to load templates.</p>\n        <p>\n            Perhaps more importantly, it allows you to deploy your resources to any server with no cross-domain issues. \n            You can even deploy your resources to a content delivery network (CDN) to maximise performance.\n        </p>\n        <div class="clear"></div>\n    </div>\n\n    <p>For more information, see the <a data-bind="click: Article.show(\'Reference\', \'PackScript/builtins\')">built-in functions reference</a>.</p>\n</div>', 'template--intro');

//
window.__appendTemplate('\n<div class="nav">\n    <ul data-bind="foreach: sections">\n        <a data-bind="attr: { href: \'#\' + encodeURIComponent(pane) }"><li data-bind="text: name"></li></a>\n    </ul>\n    \n    <br/>\n\n    <ul data-bind="foreach: links">\n        <a data-bind="attr: { href: href }" target="_blank"><li data-bind="text: name"></li></a>\n    </ul>\n</div>\n\n<div class="sections" data-bind="foreach: sections">\n    <a data-bind="attr: { name: encodeURIComponent(pane) }"></a>\n    <div data-bind="pane: pane"></div>\n</div>\n', 'template--layout');

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
window.__appendStyle('img.logo{position:relative;top:15px;margin-right:20px}');

//
window.__appendStyle('body{font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif;margin:0;padding:0}.header{font-size:2em;font-weight:bold}.nav{position:fixed;left:0;top:40px;width:140px}.nav ul{list-style:none;margin:0 10px 0 0;padding:0}.nav li{padding:5px 7px;color:black;font-size:1.1em}.nav li:hover{background:black;color:white}.nav a:hover{text-decoration:none}.sections{position:relative;left:140px;margin-right:140px;max-width:840px;background:white}.sections>div{margin-bottom:20px}.sections>a{display:block;height:10px}.sections h1{font-size:1.3em;margin:0}.sections h2{font-size:1.1em;margin:0}');

// C:/Projects/Tribe/Reference/Panes/Interface/API/constructor.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/constructor' };

TC.registerModel(function (pane) {    
    this.func = $.extend({ name: 'new ' + pane.data.name }, pane.data.constructor);
});



// C:/Projects/Tribe/Reference/Panes/Interface/API/function.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/function' };

TC.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = TC.Utils.pluck(pane.data.arguments, 'name').join(', ');
});



// C:/Projects/Tribe/Reference/Panes/Interface/API/table.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/table' };

TC.registerModel(function(pane) {
    this.columns = mapColumns();
    this.rows = mapRows();
    
    function mapColumns() {
        return TC.Utils.map(pane.data[0], function(value, key) {
            return key;
        });
    }
    
    function mapRows() {
        return TC.Utils.map(pane.data, function (row) {
            return TC.Utils.map(row, function(value) {
                return value.toString();
            });
        });
    }
});



// C:/Projects/Tribe/Reference/Panes/Interface/API/type.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/type' };

TC.registerModel(function(pane) {
    this.t = pane.data;
});



//
window.__appendTemplate('\n<div data-bind="pane: \'function\', data: func">\n</div>', 'template--Interface-API-constructor');

//
window.__appendTemplate('\n<div class="function child">\n    <h1>\n        <span data-bind="text: f.name"></span>(<span data-bind="text: argumentNames"></span>)\n        <span class="returns" data-bind="visible: f.returns">Returns: <span class="type" data-bind="text: f.returns"></span></span>\n    </h1>\n    <p data-bind="html: f.description"></p>\n\n    <table data-bind="visible: f.arguments && f.arguments.length > 0">\n        <thead>\n            <tr>\n                <th>Argument</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody data-bind="foreach: f.arguments">\n            <tr>\n                <td data-bind="text: $data.name"></td>\n                <td data-bind="text: $data.type"></td>\n                <td data-bind="html: $data.description"></td>\n            </tr>\n        </tbody>\n    </table>\n    \n    <div data-bind="foreach: f.examples">\n        <div class="example">\n            <p data-bind="text: description"></p>\n            <pre data-bind="text: code"></pre>\n            <p>Result:</p>\n            <pre data-bind="text: result"></pre>\n        </div>\n    </div>\n</div>', 'template--Interface-API-function');

//
window.__appendTemplate('\n<div data-bind="foreach: pane.data.functions">\n    <div data-bind="pane: \'function\', data: $data"></div>\n</div>', 'template--Interface-API-functionList');

//
window.__appendTemplate('\n<table class="propertyList" data-bind="visible: pane.data.properties && pane.data.properties.length > 0">\n    <thead>\n        <tr>\n            <th>Property</th>\n            <th>Type</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody data-bind="foreach: pane.data.properties">\n        <tr>\n            <td data-bind="text: $data.name"></td>\n            <td data-bind="text: $data.type"></td>\n            <td data-bind="html: $data.description"></td>\n        </tr>\n    </tbody>\n</table>', 'template--Interface-API-propertyList');

//
window.__appendTemplate('\n<table>\n    <thead>\n        <tr data-bind="foreach: columns">\n            <th data-bind="text: $data"></th>\n        </tr>\n    </thead>\n    <tbody data-bind="foreach: rows">\n        <tr data-bind="foreach: $data">\n            <td data-bind="html: $data"></td>\n        </tr>\n    </tbody>\n</table>', 'template--Interface-API-table');

//
window.__appendTemplate('\n<div class="content block">\n    <h1 data-bind="text: t.name"></h1>\n    <p data-bind="text: t.description"></p>\n    <div data-bind="pane: \'constructor\', data: t"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.properties">\n    <h1>Properties</h1>\n    <div data-bind="pane: \'propertyList\', data: { properties: t.properties }"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.functions">\n    <h1>Functions</h1>\n    <div data-bind="pane: \'functionList\', data: { functions: t.functions }"></div>\n</div>', 'template--Interface-API-type');

//
window.__appendStyle('.function h1 .returns{float:right;font-weight:normal}.function h1 .returns .type{font-weight:bold;font-style:italic}.function .name{font-size:1.2em}');

// C:/Projects/Tribe/Reference/Panes/Content/Reference/PackScript/packscript.js


TC.scriptEnvironment = { resourcePath: '/packscript' };

Reference.PackScript = {
    options: [
        { Name: 'watch', Type: 'Boolean', Description: 'Makes PackScript stay active and watch for file changes.', Default: 'false' },
        { Name: 'logLevel', Type: 'String', Description: 'Logging verbosity. Can be debug, info, warn or error.', Default: 'debug' },
        { Name: 'packFileFilter', Type: 'String', Description: 'A filespec pattern to match pack files.', Default: '*pack.js' },
        { Name: 'configurationFileFilter', Type: 'String', Description: 'A filespec pattern to match configuration files.', Default: '*pack.config.js' },
        { Name: 'templateFileExtension', Type: 'String', Description: 'The file extension for template files.', Default: '.template.*' },
        { Name: 'resourcePath', Type: 'String', Description: 'An additional path to scan for templates and configuration files.', Default: 'undefined' },
        { Name: 'excludedDirectories', Type: 'String', Description: 'A semi-colon delimited list of folder names to exclude.', Default: 'csx;bin;obj' },
        { Name: 'rubyPath', Type: 'String', Description: 'The path to ruby.exe. Required for SASS integration.', Default: 'undefined' }
    ],
    pack: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the output. See "Including Files" for more details.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See "Templates" reference for more details.' },
        { name: 'outputTemplate', type: 'template options', description: 'A template or array of templates to apply to the output.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' },
        { name: 'json', type: 'Any', description: 'Stringifies the provided object as the output. Overrides the output of any included files.' },
        { name: 'minify', type: 'Boolean', description: 'Minify resources using the configured minifier.' },        
        { name: 'sass', type: 'Boolean', description: 'Compile included SASS resources using the configured compiler.' },
        { name: 'xdt', type: 'String | Array', description: 'Apply specified XDT transformations to included files.' }
    ],
    sync: [
        { name: 'to', type: 'String', description: 'Destination path to synchronise files to.' },
        { name: 'include', type: 'include options', description: 'The set of files to synchronise.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    zip: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output ZIP file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the ZIP file.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    includeOptions: [
        { name: 'files', type: 'String', description: 'File specification of files to include.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See templates reference for more details.' }
    ],
    functions: [
        { name: 'pack', description: 'Combine, minify, embed and transform into a single output file.' },
        { name: 'sync', description: 'Synchronise a set of files to a target directory.' },
        { name: 'zip', description: 'Compress a set of files into a single ZIP format archive.' }
    ],
    templateProperties: [
        { name: 'content', type: 'String', description: 'The content of the included file.' },
        { name: 'path', type: 'String', description: 'The full path to the included file.' },
        { name: 'configPath', type: 'String', description: 'The full path to the configuration file that is using the template.' },
        { name: 'pathRelativeToConfig', type: 'String', description: 'The path of the included file relative to the configuration file.' },
        { name: 'includePath', type: 'String', description: 'The full path to the path specified in the include option.' },
        { name: 'pathRelativeToInclude', type: 'String', description: 'The path of the included file relative to the path specified in the include option.' },
        { name: 'data', type: 'Any', description: 'The data object passed in the configuration file, or an empty object if not specified.' },
        { name: 'output', type: 'Output', description: 'The output configuration.' },
        { name: 'target', type: 'Container', description: 'The current output target.' }
    ],
    Builtin: {
        functions: [
            {
                Name: 'T.panes',
                Description: 'Package models, templates and styles for panes from the specified path.'
            },
            {
                Name: 'T.scripts',
                Description: 'Package JavaScript files with an extension of \'js\' from the specified path.'
            },
            {
                Name: 'T.templates',
                Description: 'Package HTML templates with an extension of \'htm\' from the specified path.'
            },
            {
                Name: 'T.styles',
                Description: 'Package CSS styles files with an extension of \'css\' from the specified path.'
            },
            {
                Name: 'T.models',
                Description: 'Package pane models from the specified path.'
            }
        ],
        arguments: [
            { Name: 'pathOrOptions', Type: 'String | Object', Description: 'Either the path containing relevant files or an object containing options.' },
            { Name: 'debug', Type: 'Boolean', Description: 'Use debug templates to enhance the debugging experience. You can also specify this using debug: true in your output configuration.' }
        ],
        options: [
            { name: 'path', type: 'String', description: 'Can either be a directory name or filespec containing the appropriate extension.' },
            { name: 'debug', type: 'Boolean', description: 'Use debug templates to enhance the debugging experience.' },
            { name: 'prefix', type: 'String', description: 'Prefix the resource path applied to models and templates.' },
            { name: 'domain', type: 'String', description: 'Specifies the domain to apply to each script in the debugger.' },
            { name: 'protocol', type: 'String', description: 'Specifies the protocol to apply to each script in the debugger.' },
            { name: 'recursive', type: 'Boolean', description: 'Set to false to override the default behaviour.' }
        ],
        helpers: [
            { Name: 'T.webTargets', Returns: 'target options', Description: 'Pass to the \'to\' function. Creates .js, .min.js and .debug.js outputs.' },
            { Name: 'T.webDependency', Returns: 'include options', Description: 'Returns an include with the appropriate extension, .js, .min.js or .debug.js.' }
        ]
    }
};



//
window.__appendTemplate('\n<div class="content block">\n    <h1>Built-in Functions and Templates</h1>\n    <p>\n        PackScript provides a number of built-in configuration functions and templates to make\n        building and debugging your Tribe applications much easier.\n    </p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.functions"></div>\n    \n    <p>Each of these functions accepts the following arguments:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.arguments"></div>\n\n    <p>An object consisting of the following properties can be passed to these functions:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.Builtin.options }"></div>\n    \n    <p>\n        PackScript also provides a number of other helper functions that help you deal with different versions of files.\n        Pass these functions a file path but omit the extension. The appropriate extensions will be added.\n    </p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.helpers"></div>\n    \n    <h2>Examples</h2>\n    <p>\n        A simple project structure. This creates three files, site.js, site.min.js and site.debug.js. \n        It merges in the appropriate version of a script located in the Libraries directory -\n        either dependency.js, dependency.min.js or dependency.debug.js.\n    </p>\n    <pre class="example">\npack([\n    T.panes(\'Panes\'),\n    T.scripts(\'Infrastructure\'),\n    T.templates(\'Templates\'),\n    T.styles(\'Css\'),\n    T.webDependency(\'Libraries/dependency\')\n]).to(T.webTargets(\'Build/site\');</pre>\n</div>', 'template--builtins');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Including and Excluding Sets of Files</h1>\n    <p>\n        The include and exclude options are available when using the pack, sync or zip commands.\n        Files can be specified as simple string specifications, as an object or an array of both.\n        Options available are:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.includeOptions }"></div>\n    <p>Options such as recursive and template override the values set in the main configuration.</p>\n\n    <h2>Examples</h2>\n    <p>A simple string specification.</p>\n    <pre class="example">\ninclude: \'Scripts/*.js\'</pre>\n\n    <p>As an object that specifies additional options.</p>\n    <pre class="example">\ninclude: { files: \'Templates/*.htm\', template: \'embedTemplate\' }</pre>\n\n    <p>A more complex example.</p>\n    <pre class="example">\npack({\n    to: \'Build/site.js\',\n    include: [\n        { \n            files: \'Scripts/*.js\', \n            template: { name: \'sourceUrl\', data: { prefix: \'/Source/\' } },\n            first: \'intro.js\',\n            last: \'outro.js\',\n            recursive: false\n        }, {\n        { \n            files: \'Templates/*.htm\', \n            template: \'embedTemplate\' \n        }, {\n            files: \'Styles/*.css\',\n            template: \'embedCss\'\n        }\n    ],\n    exclude: \'*.debug.js\',\n    outputTemplate: \'license\',\n    recursive: true,\n    minify: true\n});</pre>\n</div>', 'template--includes');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Running PackScript</h1>\n    <p>\n        PackScript is distributed as a Windows console application. A node.js version will be released in\n        the near future. PackScript binaries can be obtained from \n        <a href="https://github.com/danderson00/PackScript" target="_blank">github</a> and\n        are included in the Tribe <a href="http://danderson00.github.io/Tribe/Tribe.zip">download</a>.\n    </p>\n    \n    <p>\n        PackScript.exe has the following command line syntax:\n    </p>\n\n    <pre class="example">PackScript.exe ["Directory\\To\\Process"] [/option[:value]]</pre>\n    \n    <p>The following options can be specified:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.options"></div>\n    <p>If a value is not provided for an option, true will be used.</p>\n    <p>If no directory is specified, the current working directory is used.</p>\n    <p>Options can also be specified as appSettings in PackScript.exe.config.</p>\n    <p>All options specified are available in JavaScript through the pack.options object.</p>\n    <p>When in watch mode, the console can also be used to interrogate or execute JavaScript members.</p>\n\n    <h2>Configuration Files</h2>\n    <p>\n        PackScript scans recursively through the target directory structure and finds all files \n        fitting the following specifications:\n    </p>\n    <table>\n        <tbody>\n            <tr>\n                <td>*pack.config.js</td>\n                <td>JavaScript configuration files. These are executed before any other file is processed.</td>\n            </tr>\n            <tr>\n                <td>*pack.js</td>\n                <td>JavaScript configuration files.</td>\n            </tr>\n            <tr>\n                <td>*.template.*</td>\n                <td>These files are loaded as templates and can be accessed by name using the template option.</td>\n            </tr>\n        </tbody>\n    </table>\n    \n    <p>Create output files by executing the following functions in your configuration files:</p>\n    <table class="pointer">\n        <tbody data-bind="foreach: Reference.PackScript.functions">\n            <tr data-bind="click: Article.show(\'Reference\', \'PackScript/\' + name)">\n                <td data-bind="text: name"></td>\n                <td data-bind="text: description"></td>\n            </tr>\n        </tbody>\n    </table>\n</div>', 'template--operation');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>pack(options[, options, ...])</h1>\n    <p>\n        The pack function is used to combine and transform sets of files into a single output.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.pack }"></div>\n\n    <pre class="example">\npack({\n    to: \'Build/site.min.js\',\n    include: \'*.js\',\n    exclude: \'debug.js\',\n    minify: true\n});</pre>\n\n    <p>You can also pass the pack function a string or an array. These are translated into the include option specified above.</p>\n    <p>The pack function returns an object that exposes a function called \'to\'.</p>\n\n    <h2>to(options)</h2>\n    <p>\n        The to function attaches options to outputs defined by the preceding call to the pack function.\n        It has two formats:\n    </p>\n    \n    <pre class="example">\npack(\'*.js\').to(\'combined.js\');</pre>\n    <p>Passing a string simply attaches a \'to\' option to the existing output.</p>\n    \n    <pre class="example">\npack(\'*.js\').to({\n    \'combined.js\': { },\n    \'combined.min.js\': { minify: true }\n});</pre>\n    <p>\n        Passing a hashtable of paths and additional options creates multiple outputs. \n        The additional options are merged with those specified in the call to pack.\n    </p>\n\n    <h2>Examples</h2>\n    <p>\n        This example combines JavaScript files from the Scripts and Libraries folder into two files, \n        one simply combined and the other prepared for production. A template called license is applied\n        to each file.\n    </p>\n    <pre class="example">\npack({\n    include: [\n        { files: \'Scripts/*.js\', recursive: true },\n        \'Libraries/*.min.js\'\n    ],\n    outputTemplate: \'license\'\n}).to({\n    \'Build/site.js\': { },\n    \'Build/site.min.js\': { minify: true, exclude: \'*debug.js\' }\n});</pre>\n\n    <p>\n        This example embeds all panes, infrastructure scripts, additional templates and styles\n        from their respective folders into a set of three files, combined, minified and a\n        special debug mode.\n    </p>\n    <pre class="example">\npack({\n    include: [\n        T.panes(\'Panes\'),\n        T.scripts(\'Infrastructure\'),\n        T.templates(\'Templates\'),\n        T.styles(\'Styles\')\n    ],\n    recursive: true\n}).to({\n    \'Build/site.js\': { },\n    \'Build/site.min.js\': { minify: true }\n    \'Build/site.debug.js\': { debug: true }\n});</pre>\n    <p>\n        See the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/builtins\')">\n            built-in templates reference\n        </a>\n        for more information.\n    </p>\n</div>', 'template--pack');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>sync(options[, options, ...])</h1>\n    <p>\n        The sync function is used to synchronise files from one location to another.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.sync }"></div>\n    <p>\n        Similar to the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/pack\')">pack function</a>, \n        the sync function returns an object containing a function called \'to\'.\n    </p>\n\n    <h2>Examples</h2>\n\n    <p>This simple example keeps a local Libraries folder in sync with an external source.</p>\n    <pre class="example">\nsync(\'../../Libraries/*.js\').to(\'Libraries\');</pre>\n    \n    <p>You can keep a number of target folders synchronised.</p>\n    <pre class="example">\nsync(\'Libraries/*.js\').to({\n    \'Site1/Scripts\': { },\n    \'Site2/Scripts\': { }\n});</pre>\n\n    <p>\n        Here, we are keeping a master build folder synchronised with individual components.\n        The folder structure underneath each included path is preserved.\n    </p>\n    <pre class="example">\nsync({\n    to: \'Build\',\n    include: [\n        \'Component1/Build/*.js\',\n        \'Component2/Client/Build/*.js\'\n    ],\n    exclude: \'debug.js\',\n    recursive: true\n});</pre>\n</div>\n', 'template--sync');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Templates</h1>\n    <p>\n        PackScript includes powerful templating functionality based on \n        <a href="http://underscorejs.org/#template" target="_blank">underscore.js templates</a>.\n    </p>\n    \n    <p>\n        PackScript scans the target folder recursively for files with names matching the filespec <strong>*.template.*</strong>.\n        These templates are made available to the pack function.\n    </p>\n\n\n    <h2>Example</h2>\n    <p>\n        Let\'s define a simple template that appends a \n        <a href="https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#breakpoints-dynamic-javascript" target="__blank">sourceUrl tag</a> \n        to scripts. We\'ll give this a filename of <strong>sourceUrl.template.js</strong>.\n        This file can be placed anywhere under the directory being processed by PackScript.\n    </p>\n    <pre class="example">\n<%= content %>\n//@ sourceURL=<%= data.prefix %><%= pathRelativeToConfig %></pre>\n    \n    <p>This template can then be used in the template option of the pack function:</p>    \n    <pre class="example">\npack({\n    to: \'Build/site.js\',\n    include: \'*.js\',\n    template: {\n        name: \'sourceUrl\',\n        data: { prefix: \'/Source/\' }\n    }\n});</pre>    \n    <p></p>\n\n    <p>From within templates, the following properties are available:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.templateProperties }"></div>\n    <p>Only the content, data, configPath, output and target properties are available when the outputTemplate option is used.</p>\n</div>', 'template--templates');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>zip(options[, options, ...])</h1>\n    <p>\n        The zip function is used to create a compressed file in ZIP format.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.zip }"></div>\n        <p>\n        Similar to the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/pack\')">pack function</a>, \n        the sync function returns an object containing a function called \'to\'.\n    </p>\n\n    <h2>Examples</h2>\n    <p>A simple flat ZIP file.</p>\n    <pre class="example">\nzip(\'Build/*.*\').to(\'Build.zip\');</pre>\n\n    <p>This compresses the entire directory structure underneath the Build directory to Content/Build.zip.</p>\n    <pre class="example">\nzip({\n    to: \'Content/Build.zip\',\n    include: \'Build/*.*\',\n    recursive: true\n});</pre>\n</div>', 'template--zip');

//
window.__appendStyle('.filename{font-family:"Courier New"}');

//
window.__appendStyle('a,a:active,a:visited,a:link{text-decoration:none;cursor:pointer;color:#1b50ba}a:hover{text-decoration:underline}table{border-spacing:0;border-collapse:collapse}table.pointer tr:hover{background:#103070;color:white}table.pointer tr{cursor:pointer}th{text-align:left;background:#457ae4;color:white;padding:2px 5px}th,td{border:1px solid #457ae4;padding:2px 5px}h1{background:#90afef;color:black;border:1px solid #999;border-radius:8px;padding:2px 10px 5px 10px;text-shadow:1px 1px 0 #DDD}');

//
window.__appendStyle('.filename{font-family:monospace;white-space:nowrap}.example{position:relative;background:#EED;padding:10px;margin:10px 0;font-family:monospace;overflow:hidden;border-radius:8px}.example .filename{display:block;position:absolute;top:0;right:0;font-size:8pt;color:gray!important;padding:0 5px}span.example{border-radius:0;margin:inherit;padding:inherit}');

//
window.__appendStyle('.com{color:#008000}.str,.tag{color:#a31515}.kwd,.atv{color:#00f}.typ{color:#2b91af}.lit,.atn{color:#f00}.pun,.pln{color:#000}.dec{color:purple}');