import React from 'react';
import { TablePagination } from '@material-ui/core';

function Panigation({ count, rowPage, handleChangePage, handleChangeRowsPerPage, page }) {
	return (
		<TablePagination
			rowsPerPageOptions={[2, 4, 6, 8]}
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
