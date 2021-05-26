import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

function Navigation(props) {
	const { currentState } = useSelector(state => ({
		currentState: state.govern.listRole
	}));
	const { entities, actionLoading } = currentState;
	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={entities}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
