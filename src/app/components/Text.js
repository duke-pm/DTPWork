import PropTypes from 'prop-types';
import React from 'react';
import { Typography, Divider } from '@material-ui/core';

function Text(props) {
	const {
		className = '',
		borderBottom = false,
		required = false,
		type = 'body',
		color = undefined,
		children = ''
	} = props;

	let variant = 'body1';
	if (type === 'title') {
		variant = 'h6';
	}
	if (type === 'subTitle') {
		variant = 'subtitle2';
	}
	if (type === 'caption') {
		variant = 'caption';
	}
	if (type === 'button') {
		variant = 'button';
	}

	return (
		<div className={`${className}`}>
			<Typography color={color} variant={variant} className="flex flex-1 flex-row items-start">
				{children}
				{required && (
					<Typography className="ml-4" color="error">
						(*)
					</Typography>
				)}
			</Typography>
			{borderBottom && <Divider className="mt-6 mb-16" />}
		</div>
	);
}

Text.propTypes = {
	className: PropTypes.string,
	borderBottom: PropTypes.bool,
	required: PropTypes.bool,
	type: PropTypes.oneOf(['title', 'subTitle', 'body', 'caption', 'button']),
	color: PropTypes.string,
	children: PropTypes.string
};

export default Text;
