import PropTypes from 'prop-types';
import React from 'react';
import { Typography, Divider } from '@material-ui/core';

function Text(props) {
	const {
		style = {},
		className = '',
		borderBottom = false,
		required = false,
		click = false,
		type = 'body',
		color = 'textPrimary',
		children = '',
		onClick = undefined
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
			<Typography
				style={style}
				color={color}
				variant={variant}
				className="flex flex-1 flex-row items-start"
				component={click ? 'button' : undefined}
				onClick={onClick}
			>
				{children}
				{required && (
					<Typography className="" color="error">
						*
					</Typography>
				)}
			</Typography>
			{borderBottom && <Divider className="mt-6 mb-16" />}
		</div>
	);
}

Text.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	borderBottom: PropTypes.bool,
	required: PropTypes.bool,
	click: PropTypes.bool,
	type: PropTypes.oneOf(['title', 'subTitle', 'body', 'caption', 'button']),
	color: PropTypes.string,
	children: PropTypes.string,
	onClick: PropTypes.func
};

export default Text;
