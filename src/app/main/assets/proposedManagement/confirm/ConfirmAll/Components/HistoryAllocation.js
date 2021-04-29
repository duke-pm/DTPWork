import { AppBar, Dialog, DialogContent, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

export default function HistoryAllocation({ handleCloseHistory, open }) {
	return (
		<Dialog
			style={{ zIndex: 20 }}
			fullWidth
			maxWidth="sm"
			onClose={handleCloseHistory}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Chi tiết lịch sử
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<div className="flex flex-col justify-around">
					<div className="flex flex-row justify-around">
						<div> 26/04/2021 </div>
						<div className="flex flex-col">
							<span>Check</span>
							<span>Border</span>
						</div>
						<div className="flex flex-col">
							<div>
								<p>Người gửi:Châu Thế Linh</p>
							</div>
							<div>
								<p>Lí do:Cấp máy mới</p>
							</div>
							<div>
								<p>Trạng thái:Đã duyệt</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
