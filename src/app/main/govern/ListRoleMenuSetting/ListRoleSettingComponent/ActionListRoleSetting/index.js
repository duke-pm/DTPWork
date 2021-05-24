/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, IconButton, Paper } from '@material-ui/core';
import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import 'antd/dist/antd.css';
import FuseAnimate from '@fuse/core/FuseAnimate';

export default function ActionListRoleSetting({ handleOpenFormGroupUser }) {
	return (
		<div>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex flex-col sm:flex-row justify-end">
					<Paper className="w-full sm:w-1/4 flex justify-between">
						<InputBase
							// onKeyPress={event => {
							// 	if (event.key === 'Enter') {
							// 		handleSearch();
							// 	}
							// }}
							// onChange={e => onHandleChange(e)}
							// className={classes.input}
							// value={search}
							placeholder="Tìm kiếm"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
						// onClick={handleSearch} type="button" className={classes.iconButton}
						>
							<SearchIcon />
						</IconButton>
						{/* <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> */}
					</Paper>
				</div>
			</FuseAnimate>
		</div>
	);
}
