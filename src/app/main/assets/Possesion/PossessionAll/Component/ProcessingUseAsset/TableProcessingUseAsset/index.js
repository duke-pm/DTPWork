import { Paper, TableContainer } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import TableBodyProcessing from './TableBodyProcessing';
import TableHeaderProcessing from './TableHeaderProcessing';
import * as actions from '../../../../_redux/possesionActions';

export default function TableProcessingUseAsset({ entitiesEdit }) {
	const dispatch = useDispatch();
	const [history, setHistory] = useState(null);
	useEffect(() => {
		dispatch(actions.getAssetHistory(entitiesEdit.assetID)).then(data => {
			setHistory(data.data.listTransHistory);
		});
	}, [dispatch, entitiesEdit.assetID]);
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>
			<TableContainer>
				<Paper>
					<TableHeaderProcessing />
					<TableBodyProcessing history={history} />
				</Paper>
			</TableContainer>
		</FuseAnimate>
	);
}
