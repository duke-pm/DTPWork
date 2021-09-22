/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import HandlingBody from './ComponentHandlingRequest/HandlingBody';

export default function HandlingPage() {
	const [dataAssets, setDataAssets] = useState();
	const location = useLocation();
	const type = queryString.parse(location.search);
	const dispatch = useDispatch();
	const history = useHistory();
	const ExitPage = () => history.goBack();
	return (
		<>
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Báo {type?.type === 'bao-hong' ? 'hỏng' : 'mất'} tài sản
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
					<div className="proposedManagement__form">
						<HandlingBody
							value={type?.type}
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
