/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import { DialogContent, Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { Table } from 'antd';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { AntInput } from '@fuse/CustomForm/CreateAntField';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import RadioAntd from '@fuse/CustomForm/RadioAntd';
import DateCustom from '@fuse/CustomForm/Date';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function FormCustomEdit({ handleSubmitForm, entitiesEdit, newEntitiesEdit }) {
	const dialogContent = useRef();
	let initialState = {
		name: '',
		department: null,
		dateRequest: '',
		region: '',
		locationUse: '',
		reason: '',
		reasonReject: '',
		assetsCategory: '',
		plan: false,
		supplier: ''
	};
	if (entitiesEdit) {
		initialState = {
			name: entitiesEdit.fullName,
			department: entitiesEdit.deptName,
			dateRequest: entitiesEdit.requestDate,
			region: entitiesEdit.regionName,
			locationUse: entitiesEdit.locationName,
			assetsCategory: entitiesEdit.docType,
			plan: entitiesEdit.isBudget,
			supplier: entitiesEdit.supplierName,
			reason: entitiesEdit.reason,
			reasonReject: entitiesEdit.reasonReject
		};
	}
	const columns = [
		{
			dataIndex: 'descr',
			title: 'Mô tả',
			width: '40%'
		},
		{
			dataIndex: 'qty',
			title: 'Số lượng',
			width: '10%',
			render: (text, record, index) => <p className="text-right">{text}</p>
		},
		{
			dataIndex: 'unitPrice',
			title: 'Đơn giá',
			width: '20%',
			render: (text, record, index) => <p className="text-right">{currencyFormat(text)}</p>
		},
		{
			dataIndex: 'totalAmt',
			title: 'Thành tiền',
			render: (text, record, index) => <h4 className="text-right">{currencyFormat(text)}</h4>
		}
	];
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('md'));

	// const onConfirm = values => {
	// 	// handleSubmitForm(values, dataSource);
	// };
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={initialState}
				onSubmit={values => {
					handleSubmitForm();
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent ref={dialogContent} dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<Typography variant="subtitle2">Thông tin nhân viên.</Typography>
								</div>
								<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 ">
									<Field
										readOnly
										label="Nhân viên"
										hasFeedback
										name="name"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										readOnly
										hasFeedback
										label="Bộ phận"
										name="department"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										readOnly
										hasFeedback
										label="Khu vực"
										name="region"
										component={AntInput}
										className="mt-8 mb-16"
									/>
									<Field
										readOnly
										hasFeedback
										label="Ngày yêu cầu "
										name="dateRequest"
										format="DD/MM/YYYY"
										placeholder="Vui lòng chọn ngày yêu cầu"
										component={DateCustom}
										className="mb-16"
									/>
								</div>
							</div>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<Typography variant="subtitle2">Tài sản yêu cầu.</Typography>
								</div>
								<Table
									scroll={{ x: matchesSM && 720 }}
									rowKey="descr"
									className="time-table-row-select"
									columns={columns}
									bordered
									pagination={false}
									dataSource={newEntitiesEdit}
								/>
							</div>
							<div className="px-16 sm:px-24 mt-16">
								<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
									<Field
										readOnly
										label="Nơi dùng"
										hasFeedback
										name="locationUse"
										component={AntInput}
										className="mt-8"
									/>
								</div>
								<div
									className={`grid grid-cols-1 ${
										entitiesEdit && entitiesEdit.statusID === 4
											? 'sm:grid-cols-2'
											: ' sm:grid-cols-1'
									} gap-8 `}
								>
									<Field
										readOnly
										label="Lý do"
										name="reason"
										component={InputTextArea}
										className="mt-8 mb-16"
										row={2}
									/>
									{entitiesEdit && entitiesEdit.statusID === 4 && (
										<Field
											readOnly
											label="Lý do từ chối "
											name="reasonReject"
											component={InputTextArea}
											className="mt-8 mb-16"
											row={2}
										/>
									)}
								</div>
								<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-16 ">
									<div className="flex flex-col">
										<Field
											readOnly
											label="Loại tài sản"
											hasFeedback
											name="assetsCategory"
											component={RadioAntd}
											options={[
												{ label: 'Mua mới', value: 'N' },
												{ label: 'Bổ sung thêm', value: 'A' }
											]}
											className="mt-8 mb-16"
										/>
										<Field
											readOnly
											label="Khoản mua sắm này có nằm trong kế hoạch"
											hasFeedback
											name="plan"
											component={RadioAntd}
											options={[
												{ label: 'Có', value: true },
												{ label: 'Không', value: false }
											]}
											className="mt-8 mb-16"
										/>
									</div>
									<Field
										readOnly
										label="Nhà cung cấp đề nghị (nếu có)"
										autoFocus
										name="supplier"
										row={3}
										component={InputTextArea}
										className="mb-16"
									/>
								</div>
							</div>
						</DialogContent>
						{/* <DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<>
									<Button variant="contained" type="submit" color="primary">
										Duyệt
									</Button>
									<Button
										onClick={() => handleOpenReject('Allocation')}
										variant="contained"
										type="button"
										color="secondary"
									>
										Không duyệt
									</Button>
								</>
							)}
						</DialogActions> */}
					</Form>
				)}
			</Formik>
		</>
	);
}
