/* eslint-disable no-shadow */
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import TableProject from './TableLevelApproval';
import { LevelApprovalContext } from '../LevelApprovalContext';

export default function LevelApprovalComponent() {
	const classes = DtpCustomStyles();
	// const dispatch = useDispatch();
	const levelApprovalContext = useContext(LevelApprovalContext);
	const { setPage, setRowPage, rowPage, page } = levelApprovalContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesEdit, listLoading, actionLoading, entities, total_count } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
	};
	if (listLoading) {
		return <FuseLoading />;
	}
	return (
		<div className="w-full flex flex-col">
			{/* <ActionLineComponent classes={classes} /> */}
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col ">
					<TableProject
						actionLoading={actionLoading}
						classes={classes}
						entities={entities}
						entitiesEdit={entitiesEdit}
					/>
					{entities && entities.length !== 0 && (
						<div className="flex flex-row items-center justify-end">
							{actionLoading && <Spin />}
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowPage}
								count={total_count}
							/>
						</div>
					)}
				</div>
			</FuseAnimate>
		</div>
	);
}
