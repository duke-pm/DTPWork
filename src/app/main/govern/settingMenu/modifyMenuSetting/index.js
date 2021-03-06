/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Grid } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchsListMenuSettingAll } from '../_redux/menuActions';
import Text from 'app/components/Text';
import FormComponent from './Component';

export default function ModifyMenuSetting() {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.govern.menu }), shallowEqual);
	useEffect(() => {
		dispatch(fetchsListMenuSettingAll());
	}, [dispatch]);
	const { entities, actionLoading, listLoading, entitiesEdit } = currentState;
	const menuParent = entities
		? entities.reduce((arr, curr) => [...arr, { value: curr.menuID, label: curr.menuName }], [])
		: [];
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
				<Text color="primary" type="title">
					{params.type === 'cap-nhat' ? 'Cập nhật menu' : 'Tạo mới menu'}
				</Text>
				<div className="govern__header--action">
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<div className="govern__content mt-8">
				<Spin spinning={listLoading}>
					<Grid container className="w-full p-16">
						<Grid item lg={3} md={3} sm={false} xs={false} />
						<Grid item lg={6} md={6} sm={12} xs={12}>
							<FormComponent
								menuParent={menuParent}
								entitiesEdit={entitiesEdit}
								actionLoading={actionLoading}
							/>
						</Grid>
						<Grid item lg={3} md={3} sm={false} xs={false} />
					</Grid>
				</Spin>
			</div>
		</div>
	);
}
