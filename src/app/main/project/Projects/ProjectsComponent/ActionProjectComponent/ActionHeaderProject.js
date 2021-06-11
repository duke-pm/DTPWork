import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { ProjectContext } from '../../ProjectContext';
import { setTaskEditProject, fetchsProjectFilter } from '../../../_redux/_projectActions';

export default function ActionHeaderProject({ classes }) {
	const dispatch = useDispatch();
	const projectContext = useContext(ProjectContext);
	const { setFormProject, search, setSearch } = projectContext;
	const handleOpenFormProject = () => {
		setFormProject(true);
		dispatch(setTaskEditProject());
	};
	const handleSearch = () => {
		dispatch(fetchsProjectFilter(search));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);

		if (e.target.value.length <= 0) {
			dispatch(fetchsProjectFilter(e.target.value));
		}
	};
	return (
		<div>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div>
					<div className="flex flex-col sm:flex-row justify-between">
						<Button
							onClick={handleOpenFormProject}
							className="mt-8 sm:mt-0 max-w-sm md:max-w-lg h-26"
							variant="contained"
							color="primary"
						>
							<svg
								className="h-16 w-16"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Project
						</Button>{' '}
						<Paper className="w-full sm:w-1/4 flex justify-between ">
							<InputBase
								onKeyPress={event => {
									if (event.key === 'Enter') {
										handleSearch();
									}
								}}
								onChange={e => onHandleChange(e)}
								className={classes.input}
								value={search}
								placeholder="Search"
								inputProps={{ 'aria-label': 'search google maps' }}
							/>
							<IconButton
								onClick={handleSearch}
								type="button"
								className={classes.iconButton}
								aria-label="search"
							>
								<SearchIcon />
							</IconButton>
						</Paper>
					</div>
				</div>
			</FuseAnimateGroup>
		</div>
	);
}