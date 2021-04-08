import { TextField } from '@material-ui/core';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';

// const useStyles = makeStyles(theme => ({
// 	inputSearch: {
// 		height: '37px'
// 	}
// }));
export default function ActionComponent(props, { handleOpenForm }) {
	// const classes = useStyles(props);
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
			</div>
		</FuseAnimate>
	);
}
