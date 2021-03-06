﻿Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'home';
    },
    Guides: {
        'Introduction': {
            'Features': 'features',
            'Getting Started': 'getStarted'
        },
        'Tutorials': {
            'Working With Panes': 'panes',
            'Webmail Tutorial': 'webmail',
            'Deployment With PackScript': 'packscript',
            'Modelling Processes': 'creditcard'
        }
    },
    Reference: {
        'Core': {
            'Panes': 'panes',
            'Transitions': 'transitions',
            'API': 'api',
            'Binding Handlers': 'bindingHandlers',
            'Global Options': 'options'
        },
        'Types': {
            'Flow': 'Flow',
            'History': 'History',
            'Loader': 'Loader',
            'Logger': 'Logger',
            'Models': 'Models',
            'Node': 'Node',
            'Operation': 'Operation',
            'Pane': 'Pane',
            'Pipeline': 'Pipeline',
            'Templates': 'Templates'
        },
        'Utilities': {
            'Panes': 'panes',
            'Paths': 'paths',
            'Events': 'events',
            'Embedded State': 'embeddedState',
            'Objects': 'objects',
            'Collections': 'collections',
            'Miscellaneous': 'misc'
        },
        'PubSub': {
            'Core': 'core',
            'Message Envelopes': 'envelopes',
            'Global Options': 'options',
            'Sagas': 'Saga'
            },
        'MessageHub': {
            'Configuration': 'configuration',
            'Client API': 'client'
        },
        'PackScript': {
            'Operation': 'operation',
            'Packing': 'pack',
            'Synchronising': 'sync',
            'Compressing': 'zip',
            'Including Files': 'includes',
            'Templates': 'templates',
            'Built-in': 'builtins'
        }
        //'Mobile': {},
        //'Forms': {},
        //'Components': {}
    }
};