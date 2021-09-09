/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FormComponent from './Component';

export default function ModifyGroupUser() {
	const { currentState } = useSelector(
		state => ({
			currentState: state.govern.groupUser
		}),
		shallowEqual
	);
	const { entitiesEdit, actionLoading } = currentState;
	const params = useParams();
	const history = useHistory();
	const ExitPage = () => {
		history.goBack();
	};
	useEffect(() => {
		if (params.type === 'cap-nhat' && !entitiesEdit) {
			history.goBack();
		}
	}, [params.type, history, entitiesEdit]);
	return (
		<div className="container govern">
			<div className="govern__header px-16">
				<Typography color="primary" variant="h6">
					{params.type === 'cap-nhat' ? 'Chỉnh sửa nhóm người dùng' : 'Tạo mới nhóm người dùng'}
				</Typography>
				<div className="govern__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="govern__content mt-8">
				<div className="modify-govern">
					<FormComponent entitiesEdit={entitiesEdit} actionLoading={actionLoading} />
				</div>
			</div>
		</div>
	);
}
