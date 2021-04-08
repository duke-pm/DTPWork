import { Button, TextField } from '@material-ui/core';
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
				<div className="flex flex-col sm:flex-row  justify-around">
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
					<div className="flex mt-8 sm:mt-0 flex-row sm:flex-row">
						<Button
							variant="contained"
							className="sm:ml-16 ml-0 font-sans h-26"
							color="primary"
							component="span"
						>
							Báo hỏng (0)
						</Button>
						<Button
							variant="contained"
							className="sm:ml-16 ml-8 font-sans h-26"
							color="secondary"
							component="span"
						>
							Báo mất(0)
						</Button>
					</div>
				</div>
			</div>
		</FuseAnimate>
	);
}
