import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Spin } from 'antd';
import CheckboxAntd from '@fuse/CustomForm/CheckboxAntd';
import AntInputCustom from '@fuse/FormBookingCustom/AntInputCustom';
import AntSelectDropdown from '@fuse/FormBookingCustom/AntSelectDropdown';
import AntDescriptionsCustom from '@fuse/FormBookingCustom/AntDescriptionsCustom';
import AntDateCustom from '@fuse/FormBookingCustom/AntDateCustom';
import AntInputCurrency from '@fuse/FormBookingCustom/AntInputCurrency';
import AntSelectCustom from '@fuse/FormBookingCustom/AntSelectCustom';
import Text from 'app/components/Text';
import { checkValidateFormConfig, checkValidateFormConfigUpdate } from '../ConfigPossessionAll';
import FormSupplier from './FormSupplier';

function FormCustomEdit({
	saveAsset,
	initialValue,
	actionLoading,
	assetDetail,
	group,
	category,
	company,
	department,
	suppiler,
	handleClose
}) {
	const [disableCateogry, setDisableCategory] = React.useState(true);
	const [disableGroup, setDisableGroup] = React.useState(true);
	const [disableAsset, setDisableAsset] = React.useState(true);
	const [formSupplier, setFormSupplier] = React.useState(false);
	const [arrGroup, setArrayGroup] = React.useState([]);
	const [arrAsset, setArrAsset] = React.useState([]);
	const [companyParse, setcompanyParse] = React.useState(null);
	const [prefix, setPrefix] = React.useState('');
	const [groupSelected, setGroupSelected] = React.useState('');
	const [assetSelected, setAssetSelected] = React.useState('');
	const [code, setCode] = React.useState(null);
	const onChangeCompany = value => {
		const arrayParse = company.reduce((arr, curr) =>
			curr.value === value ? { value: curr.value, label: curr.label, shortName: curr.shortName } : arr
		);
		setcompanyParse(arrayParse);
		setDisableCategory(false);
		if (code) {
			setPrefix(arrayParse.shortName.concat('.', code));
		}
	};
	const onChangeCategory = value => {
		const arrGroupParese = group.filter(i => i.typeID === value).map(e => ({ label: e.label, value: e.value }));
		const arrAssetDetail = assetDetail.reduce(
			(arr, curr) =>
				curr.value === arrGroupParese && arrGroupParese[0].value
					? [...arr, { value: curr.value, label: curr.label }]
					: arr,
			[]
		);
		setGroupSelected('');
		setAssetSelected('');
		setPrefix('');
		setArrAsset(arrAssetDetail);
		setArrayGroup(arrGroupParese);
		setDisableGroup(false);
	};
	const onChangeGroup = value => {
		setGroupSelected(value);
		const arrAssetDetailParse = assetDetail.reduce(
			(arr, curr) => (curr.groupID === value ? [...arr, { value: curr.value, label: curr.label }] : arr),
			[]
		);
		setAssetSelected('');
		setPrefix('');
		setArrAsset(arrAssetDetailParse);
		setDisableAsset(false);
	};
	const onChangeAsset = value => {
		setAssetSelected(value);
		const arrAssetDetail = assetDetail.reduce(
			(arr, curr) => (curr.value === value ? { value: curr.value, label: curr.label, code: curr.code } : arr),
			{}
		);
		setCode(arrAssetDetail.code);
		setPrefix(companyParse.shortName.concat('.', arrAssetDetail.code));
	};
	const handleOpenFormSupplier = value => setFormSupplier(value);
	const handleCloseFormSupplier = value => {
		setFormSupplier(false);
	};
	return (
		<>
			<FormSupplier handleCloseFormSupplier={handleCloseFormSupplier} open={formSupplier} />
			<Formik
				enableReinitialize
				validationSchema={initialValue.assetID ? checkValidateFormConfigUpdate : checkValidateFormConfig}
				initialValues={initialValue}
				onSubmit={values => {
					saveAsset(values, prefix);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<div>
							<div>
								<Text type="subTitle" color="primary" borderBottom>
									THÔNG TIN TÀI SẢN
								</Text>{' '}
							</div>
							{!initialValue.assetID && (
								<div className="grid grid-cols-1 sm:grid-cols-3  gap-8 ">
									<Field
										label="Số lượng"
										name="qty"
										type="number"
										placeholder="Vui lòng nhập số lượng tài sản cần tạo"
										hasFeedback
										component={AntInputCustom}
									/>
								</div>
							)}
							<div className="grid grid-cols-1 gap-8 ">
								<Field
									label="Tên tài sản"
									name="assetName"
									component={AntInputCustom}
									hasFeedback
									placeholder="Vui lòng điền tên tài sản"
								/>
								<Field
									label="Nhà cung cấp"
									name="suppiler"
									className="mx-4"
									component={AntSelectDropdown}
									handleOpenSelectCustom={handleOpenFormSupplier}
									options={suppiler}
								/>
							</div>
							<div className="grid gap-8 mb-20 ">
								<Field
									label="Quy cách tài sản/Thông số"
									name="descr"
									component={AntDescriptionsCustom}
									row={4}
									placeholder="Mô tả quy cách, thông số tài sản"
								/>
							</div>
							<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
								<Field
									label="Ngày mua"
									defaultValue={initialValue.purchaseDate}
									name="purchaseDate"
									format="DD-MM-YYYY"
									placeholder="Vui lòng chọn ngày mua"
									component={AntDateCustom}
									hasFeedback
								/>
								<Field
									label="Thời gian hiệu lực"
									defaultValue={initialValue.effectiveDate}
									name="effectiveDate"
									format="DD-MM-YYYY"
									className="mx-4"
									component={AntDateCustom}
								/>
								<Field
									label="Thời gian bảo hành (tháng) "
									placeholder="Số tháng bảo hành của tài sản"
									name="warrantyPeriod"
									type="number"
									component={AntInputCustom}
								/>
							</div>
							<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
								<Field
									label="Nguyên giá "
									name="originalPrice"
									type="number"
									placeholder="Nguyên giá tài sản"
									component={AntInputCurrency}
								/>
								<Field
									label="Thời gian KH (tháng) "
									name="depreciationPeriod"
									type="number"
									component={AntInputCustom}
									placeholder="Số tháng khấu hao của tài sản"
								/>
								<Field
									label="Bộ phận quản lý"
									name="deptCodeManager"
									component={AntSelectCustom}
									options={department}
									hasFeedback
								/>
							</div>
							{initialValue.assetID && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Không dùng"
										name="inactive"
										type="text"
										value={initialValue.inactive}
										component={CheckboxAntd}
										className="mt-16"
									/>
								</div>
							)}
						</div>
						{!initialValue.assetID ? (
							<div>
								<div>
									<Text type="subTitle" color="primary" borderBottom>
										{' '}
										QUY TẮC ĐÁNH MÃ TÀI SẢN
									</Text>
								</div>
								<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
									<Field
										label="Công ty"
										name="company"
										placeholder="Vui lòng chọn công ty "
										notFoundContent={<Spin size="small" />}
										handleChangeState={onChangeCompany}
										component={AntSelectCustom}
										options={company}
										className="w-auto"
										hasFeedback
									/>
									<Field
										label="Loại tài sản"
										readOnly={!!disableCateogry}
										name="category"
										component={AntSelectCustom}
										placeholder="Vui lòng chọn tài sản "
										handleChangeState={onChangeCategory}
										options={category}
										variant="outlined"
										hasFeedback
									/>
									<Field
										label="Nhóm tài sản"
										name="group"
										defaultValue={initialValue.group}
										value={groupSelected}
										readOnly={!!disableGroup}
										handleChangeState={onChangeGroup}
										component={AntSelectCustom}
										options={arrGroup}
										hasFeedback
									/>
									<Field
										label="Tài sản"
										name="asset"
										defaultValue={initialValue.asset}
										value={assetSelected}
										readOnly={!!disableAsset}
										component={AntSelectCustom}
										handleChangeState={onChangeAsset}
										options={arrAsset}
										hasFeedback
									/>
									<Field
										label="Tiền tố"
										readOnly
										value={prefix}
										component={AntInputCustom}
										hasFeedback
									/>
								</div>
							</div>
						) : null}
						<div className="flex justify-end">
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button variant="contained" type="submit" color="primary" className="mr-8">
									<Typography variant="button">
										{' '}
										{initialValue.assetID ? 'Cập nhật' : 'Thêm mới'}{' '}
									</Typography>
								</Button>
							)}
							<Button type="button" onClick={handleClose} variant="contained" color="secondary">
								<Typography variant="button">Huỷ</Typography>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
export default React.memo(FormCustomEdit);
