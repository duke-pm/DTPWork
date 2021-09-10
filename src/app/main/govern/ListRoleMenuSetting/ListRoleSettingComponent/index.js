/* eslint-disable no-shadow */
import FuseAnimate from '@fuse/core/FuseAnimate';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import ListRoleSettingBody from './ListRoleSettingBody';

export default function ListRoleSettingContent({ setNewData, newData }) {
	const classes = DtpCustomStyles();
	const { currentState } = useSelector(
		state => ({
			currentState: state.govern.listRole
		}),
		shallowEqual
	);
	const { entities, actionLoading, listLoading } = currentState;
	return (
		<div className="w-full flex flex-col">
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col mt-16 min-h-full shadow-md  sm:border-1 sm:rounded-4 overflow-hidden">
					<ListRoleSettingBody
						actionLoading={actionLoading}
						newData={newData}
						setNewData={setNewData}
						classes={classes}
						entities={entities}
						listLoading={listLoading}
					/>
				</div>
			</FuseAnimate>
		</div>
	);
}
