import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function Panigation() {
	return (
		<MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
			<Route>
				{({ location }) => {
					const query = new URLSearchParams(location.search);
					const page = parseInt(query.get('page') || '1', 10);
					console.log({ query, page });
					return (
						<Pagination
							rowsPerPageOptions={[10, 25, 50, 100]}
							size="small"
							page={page}
							count={10}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: false
							}}
							renderItem={item => (
								<PaginationItem
									component={Link}
									to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
									{...item}
								/>
							)}
						/>
					);
				}}
			</Route>
		</MemoryRouter>
	);
}
