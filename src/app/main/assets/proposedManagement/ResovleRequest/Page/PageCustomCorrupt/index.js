/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import FormConfirmGobal from './FormConfirmGobal';
import FormCorrupt from './FormCorrupt';
import CustomCorruptContextProvider from './PageCustomCorruptContext';

export default function PageCustomCorrupt() {
	const params = useParams();
	const history = useHistory();
	const { actionLoading, entitiesEdit } = useSelector(
		state => ({
			entitiesEdit: state.confirm.entitiesEdit,
			actionLoading: state.confirm.actionLoading
		}),
		shallowEqual
	);
	useEffect(() => {
		if (!entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);
	const ExitPage = () => {
		history.goBack();
	};
	return (
		<CustomCorruptContextProvider>
			<FormConfirmGobal />
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Báo {params?.corrupt === 'lost' ? 'mất' : 'hỏng'} tài sản
					</Typography>
					<div className="projects__header--action">
						<Tooltip placement="bottom" title="Exit">
							<span onClick={ExitPage} className="action--button">
								<Icon fontSize="small">close</Icon>
							</span>
						</Tooltip>
					</div>
				</div>
				<div className="proposedManagement__content mt-8">
					{/* <Spin spinning={loading}> */}
					<div className="proposedManagement__form">
						<FormCorrupt params={params} entitiesEdit={entitiesEdit} actionLoading={actionLoading} />
					</div>
					{/* </Spin> */}
				</div>
			</div>
		</CustomCorruptContextProvider>
	);
}
