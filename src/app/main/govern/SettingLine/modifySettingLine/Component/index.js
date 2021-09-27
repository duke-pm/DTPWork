import React from 'react';
// import { useHistory } from 'react-router';
import CustomForm from './CustomForm';

export default function FormComponent({ entitiesEdit, actionLoading, handleSubmitLine, ExitPage }) {
	// const history = useHistory();
	// const handleCloseFormGroupUser = () => {
	// 	history.goBack();
	// };
	return (
		<>
			<CustomForm
				ExitPage={ExitPage}
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleSubmitLine={handleSubmitLine}
			/>
		</>
	);
}
