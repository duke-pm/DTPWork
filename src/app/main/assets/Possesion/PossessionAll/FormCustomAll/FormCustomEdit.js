import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import DateCustom from '@fuse/CustomForm/Date';
import InputTextArea from '@fuse/CustomForm/InputTextArea';
import InputCurrency from '@fuse/CustomForm/InputCurrency';
import { Spin } from 'antd';
import { AntInput, AntInputNumber } from '@fuse/CustomForm/CreateAntField';
import SelectAntd from '@fuse/CustomForm/SelectAntd';
import { checkValidateFormConfig, checkValidateFormConfigUpdate } from '../ConfigPossessionAll';

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
	return (
		<>
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
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex justify-between flex-row">
									<h5 className="font-extrabold">Thông tin tài sản</h5>
								</div>
								{!initialValue.assetID && (
									<div className="grid grid-cols-1 sm:grid-cols-3  gap-8 ">
										<Field
											label="Số lượng"
											autoFocus
											name="qty"
											placeholder="Nhập số lượng tài sản cần tạo"
											hasFeedback
											component={AntInputNumber}
											// className="mx-4"
										/>
									</div>
								)}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Tên tài sản"
										name="assetName"
										type="text"
										component={AntInput}
										className="mx-4"
										hasFeedback
										placeholder="Vui lòng điền tên tài sản"
									/>
									<Field
										label="Nhà cung cấp"
										name="suppiler"
										component={SelectAntd}
										options={suppiler}
										className="mx-4"
									/>
								</div>
								<div className="grid gap-8 ">
									<Field
										label="Quy cách tài sản/Thông số"
										name="descr"
										component={InputTextArea}
										row={2}
										placeholder="Mô tả quy cách, thông số tài sản"
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 ">
									<Field
										label="Ngày mua"
										defaultValue={initialValue.purchaseDate}
										name="purchaseDate"
										format="DD-MM-YYYY"
										placeholder="Vui lòng chọn ngày mua"
										component={DateCustom}
										className="mx-4"
										hasFeedback
									/>
									<Field
										label="Thời gian hiệu lực"
										defaultValue={initialValue.effectiveDate}
										name="effectiveDate"
										format="DD-MM-YYYY"
										component={DateCustom}
										className="mx-4"
									/>
									<Field
										label="Thời gian bảo hành (tháng) "
										placeholder="Số tháng bảo hành của tài sản"
										name="warrantyPeriod"
										type="number"
										component={AntInput}
										className="mx-4"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
									<Field
										label="Nguyên giá "
										name="originalPrice"
										type="number"
										placeholder="Nguyên giá tài sản"
										component={InputCurrency}
										className="mx-4"
									/>
									<Field
										label="Thời gian KH (tháng) "
										name="depreciationPeriod"
										type="number"
										component={AntInput}
										placeholder="Số tháng khấu hao của tài sản"
										className="mx-4"
									/>
									<Field
										label="Bộ phận quản lý"
										name="deptCodeManager"
										notFoundContent={<Spin size="small" />}
										component={SelectAntd}
										options={department}
										className=""
										hasFeedback
									/>
								</div>
							</div>
							{!initialValue.assetID ? (
								<div className="px-16 sm:px-24">
									<div className="flex justify-between flex-row">
										<h5 className="font-extrabold">Quy tắc đánh mã tài sản. </h5>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-3 mb:6 gap-8 ">
										<Field
											label="Công ty"
											name="company"
											placeholder="Vui lòng chọn công ty "
											notFoundContent={<Spin size="small" />}
											handleChangeState={onChangeCompany}
											component={SelectAntd}
											options={company}
											className="mx-4 w-auto	"
											hasFeedback
										/>
										<Field
											label="Loại tài sản"
											readOnly={!!disableCateogry}
											name="category"
											component={SelectAntd}
											placeholder="Vui lòng chọn tài sản "
											handleChangeState={onChangeCategory}
											options={category}
											className="mx-4"
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
											component={SelectAntd}
											options={arrGroup}
											className="mx-4"
											hasFeedback
										/>
										<Field
											label="Tài sản"
											name="asset"
											defaultValue={initialValue.asset}
											value={assetSelected}
											readOnly={!!disableAsset}
											component={SelectAntd}
											handleChangeState={onChangeAsset}
											options={arrAsset}
											className="mx-4"
											hasFeedback
										/>
										<Field
											label="Tiền tố"
											readOnly
											value={prefix}
											component={AntInput}
											type="text"
											className="mx-4 flex-1"
											hasFeedback
										/>
									</div>
								</div>
							) : null}
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button variant="contained" type="submit" color="primary">
									{initialValue.assetID ? 'Cập nhật' : 'Thêm mới'}
								</Button>
							)}
							<Button
								type="button"
								onClick={handleClose}
								className="h-26 font-sans"
								variant="contained"
								color="secondary"
							>
								Hủy
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
export default React.memo(FormCustomEdit);
