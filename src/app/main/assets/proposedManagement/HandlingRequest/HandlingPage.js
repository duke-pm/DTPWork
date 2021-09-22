/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router';
import HandlingBody from './ComponentHandlingRequest/HandlingBody';

export default function HandlingPage() {
	const [dataAssets, setDataAssets] = useState();
	const dispatch = useDispatch();
	const history = useHistory();
	const { currentState } = useSelector(state => ({ currentState: state.tabs }), shallowEqual);
	const { value } = currentState;
	const ExitPage = () => history.goBack();
	return (
		<>
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Báo {value === 1 ? 'hỏng' : 'mất'} tài sản
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
					<div>
						<HandlingBody
							value={value}
							dispatch={dispatch}
							setDataAssets={setDataAssets}
							dataAssets={dataAssets}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
