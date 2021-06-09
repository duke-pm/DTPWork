import { Button, Divider } from '@material-ui/core';
import { Avatar, Input } from 'antd';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const { TextArea } = Input;

export default function DrawerActivity() {
	const [comment, setComment] = useState('');
	const clearCommnent = () => setComment('');
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-between mt-16">
				<p className="text-base font-normal"> June 8, 2021 </p>
				<p> Show activities with comments only </p>
			</div>
			<Divider />
			<PerfectScrollbar style={{ height: '250px', position: 'relative' }}>
				<div className="flex flex-col mt-16" style={{ position: 'absolute' }}>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row">
								<Avatar
									style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginTop: 5 }}
									size="large"
								>
									{' '}
									AA{' '}
								</Avatar>
								<div className="flex flex-col ml-8">
									<div className="w-full flex-none text-sm font-medium text-black "> Anonymous </div>
									<div className="w-full flex-none text-sm font-normal text-gray-500">
										{' '}
										Created on 06/08//2021 9:22 AM{' '}
									</div>
								</div>
							</div>
							<div className="font-medium flex-none"> #1</div>
						</div>
						<blockquote className="mt-8">
							<p className="text-sm font-light">
								“Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to
								customize, adapts to any design, and the build size is tiny.”
							</p>
						</blockquote>
					</div>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row">
								<Avatar
									style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginTop: 5 }}
									size="large"
								>
									{' '}
									AA{' '}
								</Avatar>
								<div className="flex flex-col ml-8">
									<div className="w-full flex-none text-sm font-medium text-black "> Anonymous </div>
									<div className="w-full flex-none text-sm font-normal text-gray-500">
										{' '}
										Created on 06/08//2021 9:22 AM{' '}
									</div>
								</div>
							</div>
							<div className=""> #1</div>
						</div>
						<blockquote className="mt-8">
							<p className="text-sm font-light">
								“Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to
								customize, adapts to any design, and the build size is tiny.”
							</p>
						</blockquote>
					</div>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row">
								<Avatar
									style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginTop: 5 }}
									size="large"
								>
									{' '}
									AA{' '}
								</Avatar>
								<div className="flex flex-col ml-8">
									<div className="w-full flex-none text-sm font-medium text-black "> Anonymous </div>
									<div className="w-full flex-none text-sm font-normal text-gray-500">
										{' '}
										Created on 06/08//2021 9:22 AM{' '}
									</div>
								</div>
							</div>
							<div className=""> #1</div>
						</div>
						<blockquote className="mt-8">
							<p className="text-sm font-light">
								“Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to
								customize, adapts to any design, and the build size is tiny.”
							</p>
						</blockquote>
					</div>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between">
							<div className="flex flex-row">
								<Avatar
									style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginTop: 5 }}
									size="large"
								>
									{' '}
									AA{' '}
								</Avatar>
								<div className="flex flex-col ml-8">
									<div className="w-full flex-none text-sm font-medium text-black "> Anonymous </div>
									<div className="w-full flex-none text-sm font-normal text-gray-500">
										{' '}
										Created on 06/08//2021 9:22 AM{' '}
									</div>
								</div>
							</div>
							<div className=""> #1</div>
						</div>
						<div className="content w-full flex-none h-26  mt-8">Demo comment </div>
					</div>
				</div>
			</PerfectScrollbar>
			<Divider />
			<div className="flex flex-row justify-between mt-16">
				<TextArea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" rows={3} />
			</div>
			{comment.length > 0 && (
				<div className="flex flex-row justify-end mt-8">
					<Button variant="contained" className="mr-8" color="primary">
						Save
					</Button>{' '}
					<Button onClick={clearCommnent} variant="contained" color="secondary">
						Cancel
					</Button>{' '}
				</div>
			)}
		</div>
	);
}
