/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import FuseAnimate from '@fuse/core/FuseAnimate';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Spin } from 'antd';

const useStyles = makeStyles(theme => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}));

export default function ActionComponent(props) {
	const classes = useStyles();
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-col sm:flex-row justify-between">
				<Paper component="form" className="w-full sm:w-1/4 flex justify-between">
					<InputBase
						className={classes.input}
						placeholder="Tìm kiếm"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton type="button" className={classes.iconButton} aria-label="search">
						<SearchIcon />
					</IconButton>
					{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
				</Paper>
				<Button
					onClick={props.handleOpenForm}
					className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
					variant="contained"
					color="primary"
				>
					{' '}
					<svg
						className="h-16 w-16"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Thêm mới
				</Button>{' '}
			</div>
		</FuseAnimate>
	);
}
