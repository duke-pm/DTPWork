import React from 'react';
// import { useHistory } from 'react-router';
import CustomForm from './CustomForm';

export default function FormComponent({
	entitiesEdit,
	actionLoading,
	groupUser,
	roles,
	titleApproval,
	users,
	setIsChange,
	handleSubmitApproval
}) {
	// const history = useHistory();
	// const handleCloseFormGroupUser = () => {
	// 	history.goBack();
	// };
	return (
		<CustomForm
			setIsChange={setIsChange}
			handleSubmitApproval={handleSubmitApproval}
			groupUser={groupUser}
			roles={roles}
			titleApproval={titleApproval}
			users={users}
			entitiesEdit={entitiesEdit}
			actionLoading={actionLoading}
		/>
	);
}
