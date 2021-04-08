import { Button, TextField } from '@material-ui/core';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';

export default function ActionComponent(props) {
	return (
		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
			<div className="flex flex-col sm:flex-row justify-between">
				<TextField
					id="outlined-full-width"
					label="Tìm kiếm"
					inputProps={{
						style: {
							height: '2px'
						}
					}}
					// margin="normal"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
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
