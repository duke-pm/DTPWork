/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { Table } from 'antd';
import { currencyFormat } from '@fuse/core/FuseFormatCurrency';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntRadioCustom from '@fuse/FormBookingCustom/AntRadioCustom';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import Text from 'app/components/Text';

export default function FormCustomEditAllocation({ handleSubmitForm, entitiesEdit, newEntitiesEdit }) {
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
						<div>
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN NHÂN VIÊN.
								</Text>{' '}
							</div>
							<div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 ">
								<Field readOnly label="Nhân viên" hasFeedback name="name" component={AntInputCustom} />
								<Field
									readOnly
									hasFeedback
									label="Bộ phận"
									name="department"
									component={AntInputCustom}
								/>
								<Field readOnly hasFeedback label="Khu vực" name="region" component={AntInputCustom} />
								<Field
									readOnly
									hasFeedback
									label="Ngày yêu cầu "
									name="dateRequest"
									format="DD/MM/YYYY"
									placeholder="Vui lòng chọn ngày yêu cầu"
									component={AntDateCustom}
								/>
							</div>
						</div>
						<div className="table-form">
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									TÀI SẢN YÊU CẦU.
								</Text>{' '}
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
						<div className="mt-16">
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-8 ">
								<Field
									readOnly
									label="Nơi dùng"
									hasFeedback
									name="locationUse"
									component={AntInputCustom}
								/>
							</div>
							<div className={`grid grid-cols-1 gap-8 `}>
								<Field readOnly label="Lý do" name="reason" component={AntDescriptionsCustom} row={2} />
								{entitiesEdit && entitiesEdit.statusID === 4 && (
									<Field
										readOnly
										label="Lý do từ chối "
										name="reasonReject"
										component={AntDescriptionsCustom}
										row={2}
									/>
								)}
							</div>
							<div className="grid sm:grid-cols-1 gap-8 ">
								<Field
									readOnly
									label="Loại tài sản"
									hasFeedback
									name="assetsCategory"
									component={AntRadioCustom}
									options={[
										{ label: 'Mua mới', value: 'N' },
										{ label: 'Bổ sung thêm', value: 'A' }
									]}
								/>
								<Field
									readOnly
									label="Khoản mua sắm này có nằm trong kế hoạch"
									hasFeedback
									name="plan"
									component={AntRadioCustom}
									options={[
										{ label: 'Có', value: true },
										{ label: 'Không', value: false }
									]}
								/>
								<Field
									readOnly
									label="Nhà cung cấp đề nghị (nếu có)"
									name="supplier"
									row={3}
									component={AntDescriptionsCustom}
								/>
							</div>
						</div>
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
