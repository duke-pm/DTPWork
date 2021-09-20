import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import './index.scss';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const PossesionConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tai-san/quan-ly-tai-san/danh-sach',
			exact: true,
			component: React.lazy(() => import('./index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/qua-trinh-su-dung',
			exact: true,
			component: React.lazy(() => import('./PossessionAll/Component/ProcessingUseAsset/index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/modify',
			exact: true,
			component: React.lazy(() => import('./PossessionAll/FormCustomAll/index'))
		}
	]
};

export default PossesionConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
