/* eslint-disable no-shadow */
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin, Tag } from 'antd';
import * as moment from 'moment';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import DrawerComponent from './DrawerComponent';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';
import {
	fetchProjectDetailFilter,
	updatedGantt,
	getTaskDetailAll,
	addTaskActivity
} from '../../_redux/_projectActions';

export default function ProjectComponent({ owner, ArrProjectStatus, params, sectorArr }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const { sector, setPage, setRowPage, rowPage, page, status, ownerFilter, dateStart, search } = projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesDetail, listLoading, actionLoading, total_count } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			fetchProjectDetailFilter(
				params.detail,
				rowPage,
				newPage + 1,
				ownerFilter,
				status,
				dateStart,
				sector,
				search
			)
		);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			fetchProjectDetailFilter(params.detail, rowPageParse, page, ownerFilter, status, dateStart, sector, search)
		);
	};
	return (
		<div className="w-full flex flex-col">
			<DrawerComponent ArrProjectStatus={ArrProjectStatus} params={params} />
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className={`'grid-cols-1'}  gap-8`}>
					<div className="flex flex-col">
						<TableProject
							ArrProjectStatus={ArrProjectStatus}
							params={params}
							sectorArr={sectorArr}
							owner={owner}
							listLoading={listLoading}
							actionLoading={actionLoading}
							entitiesDetail={entitiesDetail}
						/>

						{entitiesDetail?.listTask?.length !== 0 && (
							<div className="flex flex-row items-center justify-between">
								<div className="flex flex-row">
									<Tag
										className="shadow-md"
										style={{ width: '25px', height: '25px', marginLeft: '8px' }}
										color="#d50000"
									/>
									<p style={{ fontWeight: '400', color: '#006565' }}>Late deadline</p>
								</div>

								<div>
									{actionLoading && <Spin />}
									<Panigation
										page={page}
										handleChangePage={handleChangePage}
										rowPage={rowPage}
										handleChangeRowsPerPage={handleRowPage}
										count={total_count}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}
