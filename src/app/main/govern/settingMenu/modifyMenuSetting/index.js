/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FormComponent from './Component';

export default function ModifyMenuSetting() {
	const dispatch = useDispatch();
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.govern.listUser,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	useEffect(() => {
		// dispatch(getInformationCompany(paramsInfo));
	}, [dispatch]);
	const { entitiesEdit, actionLoading } = currentState;
	const { entitiesInformation, listloading } = inforCompany;
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
					{params.type === 'cap-nhat' ? 'Cập nhật menu' : 'Tạo mới menu'}
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
				<Spin spinning={listloading}>
					<div className="modify-govern">
						{/* <FormComponent entitiesEdit={entitiesEdit} actionLoading={actionLoading} /> */}
					</div>
				</Spin>
			</div>
		</div>
	);
}
