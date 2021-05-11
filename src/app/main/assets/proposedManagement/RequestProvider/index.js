import React from 'react';
import RequestContext from './RequestContext';
import RequestProviderPage from './RequestProviderPage';

export default function RequestProvider() {
	return (
		<RequestContext>
			<RequestProviderPage />
		</RequestContext>
	);
}
