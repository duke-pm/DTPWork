import React from 'react';
// import { useHistory } from 'react-router';
import CustomForm from './CustomForm';

export default function FormComponent({ entitiesEdit, actionLoading }) {
	// const history = useHistory();
	// const handleCloseFormGroupUser = () => {
	// 	history.goBack();
	// };
	return (
		<>
			<CustomForm entitiesEdit={entitiesEdit} actionLoading={actionLoading} />
		</>
	);
}
