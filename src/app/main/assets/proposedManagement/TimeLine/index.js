import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './TimeLine.scss';
import TodayIcon from '@material-ui/icons/Today';

const statusClassName = {
	'-1': 'primary',
	0: 'danger',
	1: 'success',
	null: 'dark'
};
export default function TimeLine({ timeLine, setTimeLine }) {
	const handleClose = () =>
		setTimeLine({
			open: false
			// title: ''
		});
	const { newEntitiesApproval } = useSelector(
		state => ({
			newEntitiesApproval: state.confirm.newEntitiesApproval
		}),
		shallowEqual
	);
	return (
		<Dialog
			PaperProps={{
				style: {
					overflow: 'hidden',
					width: 600,
					zIndex: 20
				}
			}}
			maxWidth="md"
			aria-labelledby="customized-dialog-title"
			open={timeLine.open}
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="subtitle2" color="inherit">
						Quá trình phê duyệt {timeLine.title} tài sản
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<PerfectScrollbar style={{ height: '350px' }} id="DZ_W_TimeLine" className="widget-timeline  style-1">
					<ul className="timeline">
						{newEntitiesApproval && newEntitiesApproval.length > 0
							? newEntitiesApproval.map((item, index) => (
									<li key={index}>
										<div className={`timeline-badge ${statusClassName[item.statusID]}`} />
										<div
											className={`timeline-panel ${item.approveDate ? null : 'timellineDisable'}`}
										>
											{item.approveDate && item.approveTime ? (
												<span>
													{' '}
													<TodayIcon /> {`${item.approveDate} - ${item.approveTime}`}
												</span>
											) : null}
											<h4>
												{item.levelApproval > 0 ? 'Người duyệt' : 'Người tạo'} :{' '}
												{item.personApproveName}{' '}
											</h4>

											<h6 className="mb-0">Trạng thái : {item.statusName}</h6>
											{item.reason && item.reason.length > 0 ? (
												<h6 className="mb-0">Lý do : {item.reason}</h6>
											) : null}
										</div>
									</li>
							  ))
							: null}
					</ul>
				</PerfectScrollbar>
			</DialogContent>
		</Dialog>
	);
}
