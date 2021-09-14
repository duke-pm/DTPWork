/* eslint-disable no-shadow */
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import React, { useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { Spin } from 'antd';
import TableProject from './TableLine';
import { SettingLineContext } from '../SettingLineContext';

export default function LineComponent() {
	const classes = DtpCustomStyles();
	// const dispatch = useDispatch();
	const lineContext = useContext(SettingLineContext);
	const { setPage, setRowPage, rowPage, page } = lineContext;
	const { currentState } = useSelector(state => ({ currentState: state.project }), shallowEqual);
	const { entitiesEdit, actionLoading, entities, total_count } = currentState;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
	};
	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col">
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
		</div>
	);
}
