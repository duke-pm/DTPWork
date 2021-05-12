import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 24,
			height: 24,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className="logo-icon" src="favicon.ico" alt="logo" />
			<Typography className="text-12 mx-12 font-light logo-text text-uppercase" color="inherit">
				EDUCATION SOLUTIONS
			</Typography>
			{/* <div className={clsx(classes.reactBadge, 'react-badge flex items-center py-4 px-8 rounded')}>
				<img className="react-logo" src="assets/logo-dtp.png" alt="react" width="16" />
			</div> */}
		</div>
	);
}

export default Logo;
