import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import ActionHeaderProject from './ActionProjectOverviewComponent/ActionHeaderProject';
import TableProject from './TableProject';
import { ProjectOverviewContext } from '../ProjectOverviewContext';
import { fetchsProjectOverviewFilter } from '../../_redux/_projectActions';

export default function ProjectOverviewComponent({ ArrProjectStatus, owner, sectorArr }) {
	const projectContext = useContext(ProjectOverviewContext);
	const dispatch = useDispatch();
	const { page, rowPage, setPage, setRowPage, status, ownerFilter, year, sector, dateStart, dateEnd, search } =
		projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { projectOverview, listLoading, actionLoading, total_count } = currentState;
	const classes = DtpCustomStyles();
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			fetchsProjectOverviewFilter(
				rowPage,
				newPage + 1,
				year,
				ownerFilter,
				sector,
				status,
				dateStart,
				dateEnd,
				search
			)
		);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			fetchsProjectOverviewFilter(
				rowPageParse,
				page,
				year,
				ownerFilter,
				sector,
				status,
				dateStart,
				dateEnd,
				search
			)
		);
	};
	return (
		<Spin spinning={listLoading}>
			<div className="w-full flex flex-col">
				<ActionHeaderProject
					sectorArr={sectorArr}
					ArrProjectStatus={ArrProjectStatus}
					owner={owner}
					classes={classes}
				/>
				<div className="flex flex-col">
					<TableProject
						listLoading={listLoading}
						actionLoading={actionLoading}
						classes={classes}
						entities={projectOverview}
					/>
					{projectOverview?.length !== 0 && (
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
			</div>
		</Spin>
	);
}
