import React from 'react';
import { TablePagination } from '@material-ui/core';

function Panigation({ count, rowPage, handleChangePage, handleChangeRowsPerPage, page }) {
	return (
		<TablePagination
			rowsPerPageOptions={[25, 50, 75, 100]}
			component="div"
			count={count}
			rowsPerPage={rowPage}
			page={page}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);
}
export default React.memo(Panigation);
