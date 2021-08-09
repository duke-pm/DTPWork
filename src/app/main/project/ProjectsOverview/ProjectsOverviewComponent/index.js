import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import ActionHeaderProject from './ActionProjectOverviewComponent/ActionHeaderProject';
import TableProject from './TableProject';
import { ProjectOverviewContext } from '../ProjectOverviewContext';
import { fetchsProjectFilter } from '../../_redux/_projectActions';

export default function ProjectOverviewComponent({ ArrProjectStatus, owner }) {
	const projectContext = useContext(ProjectOverviewContext);
	const dispatch = useDispatch();
	const { page, rowPage, setPage, setRowPage, status, ownerFilter, year } = projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	const classes = DtpCustomStyles();
	if (listLoading) {
		return <FuseLoading />;
	}
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchsProjectFilter(rowPage, newPage + 1, status, ownerFilter, year));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchsProjectFilter(rowPageParse, page, status, ownerFilter, year));
	};
	return (
		<div className="w-full flex flex-col">
			<ActionHeaderProject
				// sectorArr={sectorArr}
				ArrProjectStatus={ArrProjectStatus}
				owner={owner}
				classes={classes}
			/>
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<TableProject actionLoading={actionLoading} classes={classes} entities={entities} />
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
