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
			path: '/tai-san/quan-ly-tai-san/cap-phat',
			exact: true,
			component: React.lazy(() => import('./PossessionUnused/FormCustomUnused/index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/sua-chua-bao-hanh',
			exact: true,
			component: React.lazy(() => import('./FormControl/FormCustomRepair/index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/thanh-ly',
			exact: true,
			component: React.lazy(() => import('./FormControl/FormAssetLiquidation/index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/thu-hoi',
			exact: true,
			component: React.lazy(() => import('./PossessionUsed/FormCustomUsed/index'))
		},
		{
			path: '/tai-san/quan-ly-tai-san/dua-vao-su-dung-lai',
			exact: true,
			component: React.lazy(() => import('./FormControl/FormControlCycle/index'))
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
