/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@material-ui/core';
import { Spin, Tooltip } from 'antd';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import React, { useEffect } from 'react';
import Text from 'app/components/Text';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FormComponent from './Component';

export default function ModifyListUser() {
	const dispatch = useDispatch();
	const { currentState, inforCompany } = useSelector(
		state => ({
			currentState: state.govern.listUser,
			inforCompany: state.possesion
		}),
		shallowEqual
	);
	const paramsInfo = 'Region, Employee, Company,  Users, Sales, BizLines, UserGroups';
	useEffect(() => {
		dispatch(getInformationCompany(paramsInfo));
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
	const groupUser = entitiesInformation?.userGroup
		? entitiesInformation.userGroup.reduce(
				(arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName }],
				[]
		  )
		: [];
	const arrCompany = entitiesInformation?.company
		? entitiesInformation.company.reduce((arr, curr) => [...arr, { value: curr.cmpnID, label: curr.cmpnName }], [])
		: [];
	const arrBizLine = entitiesInformation?.bizlines
		? entitiesInformation.bizlines.reduce(
				(arr, curr) => [...arr, { value: curr.bizLineID, label: curr.bizLineName }],
				[]
		  )
		: [];
	const arrSales = entitiesInformation?.sales
		? entitiesInformation.sales.reduce((arr, curr) => [...arr, { value: curr.slpCode, label: curr.slpName }], [])
		: [];
	const arrManag = entitiesInformation?.users
		? entitiesInformation.users.reduce((arr, curr) => [...arr, { value: curr.empID, label: curr.empName }], [])
		: [];
	const arrSap = entitiesInformation?.employees
		? entitiesInformation.employees.reduce(
				(arr, curr) => [...arr, { value: curr.empCode, label: curr.empName }],
				[]
		  )
		: [];
	const arrRegion = entitiesInformation?.region
		? entitiesInformation.region.reduce(
				(arr, curr) => [...arr, { value: curr.regionID, label: curr.regionName }],
				[]
		  )
		: [];
	return (
		<div className="container govern">
			<div className="govern__header px-16">
				<Text color="primary" type="title">
					{params.type === 'cap-nhat' ? 'Chỉnh sửa người dùng' : 'Tạo mới người dùng'}
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
				<Spin spinning={listloading}>
					<div className="modify-govern">
						<FormComponent
							arrCompany={arrCompany}
							arrSales={arrSales}
							arrManag={arrManag}
							arrSap={arrSap}
							arrRegion={arrRegion}
							groupUser={groupUser}
							arrBizLine={arrBizLine}
							entitiesEdit={entitiesEdit}
							actionLoading={actionLoading}
						/>
					</div>
				</Spin>
			</div>
		</div>
	);
}
