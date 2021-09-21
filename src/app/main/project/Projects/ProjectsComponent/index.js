import FuseAnimate from '@fuse/core/FuseAnimate';
import React, { useContext } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import TableProject from './TableProject';
import { ProjectContext } from '../ProjectContext';
import { fetchsProjectFilter } from '../../_redux/_projectActions';

export default function ProjectComponent({ ArrProjectStatus, owner }) {
	const projectContext = useContext(ProjectContext);
	const dispatch = useDispatch();
	const { page, rowPage, setPage, setRowPage, status, ownerFilter, year, setSort, sort, search } = projectContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entities, listLoading, actionLoading, total_count, entitiesEdit } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			fetchsProjectFilter(
				rowPage,
				newPage + 1,
				status?.toString(),
				ownerFilter?.toString(),
				year,
				sort.id,
				sort.direction,
				search
			)
		);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			fetchsProjectFilter(
				rowPageParse,
				page,
				status?.toString(),
				ownerFilter?.toString(),
				year,
				sort.id,
				sort.direction,
				search
			)
		);
	};
	const createSortHandler = (direction, id) => {
		dispatch(
			fetchsProjectFilter(rowPage, page, status?.toString(), ownerFilter?.toString(), year, id, direction, search)
		);
		setSort({
			direction,
			id
		});
	};
	return (
		<Spin spinning={listLoading}>
			<div className="w-full flex flex-col">
				<div className="flex flex-col">
					<TableProject
						createSortHandler={createSortHandler}
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
			</div>
		</Spin>
	);
}
