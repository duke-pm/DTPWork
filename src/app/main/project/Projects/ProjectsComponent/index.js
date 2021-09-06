import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import ActionHeaderProject from './ActionProjectComponent/ActionHeaderProject';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';
import { fetchsProjectFilter } from '../../_redux/_projectActions';

export default function ProjectComponent({ ArrProjectStatus, owner }) {
	const projectContext = useContext(ProjectContext);
	const dispatch = useDispatch();
	const { page, rowPage, setPage, setRowPage, status, ownerFilter, year } = projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count, entitiesEdit } = currentState;
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
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col">
					<TableProject
						listLoading={listLoading}
						actionLoading={actionLoading}
						entities={entities}
						entitiesEdit={entitiesEdit}
						ArrProjectStatus={ArrProjectStatus}
						owner={owner}
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
