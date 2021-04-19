import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector, shallowEqual } from 'react-redux';
import DateCustom from '@fuse/CustomForm/Date';
import InputTextAreaLg from '@fuse/CustomForm/InputTextAreaLg';
import InputCurrency from '@fuse/CustomForm/InputCurrency';
import { Spin } from 'antd';
import { AntInput, AntInputNumber, AntSelect } from '@fuse/CustomForm/CreateAntField';
import SelectCustom from '../../../../../@fuse/CustomForm/Select';

export default function FormCustomEdit({ handleClose, saveAsset, initialValue, actionLoading }) {
	const checkValidateForm = Yup.object().shape({
		assetName: Yup.string().required('Tên tài sản không được để trống'),
		purchaseDate: Yup.date().required('Ngày mua không được để trống').nullable(),
		qty: Yup.number()
			.typeError('Số lượng phải là dạng số và không được để trống. ')
			.required('Số lượng không được để trống'),
		// deptCodeManager: Yup.string().required('Đơn vị quản lý không được để trống'),
		company: Yup.string().required('Công ty không được để trống'),
		category: Yup.string().required('Loại không được để trống'),
		group: Yup.string().required('Nhóm không được để trống'),
		asset: Yup.string().required('Tiền đố không được để trống')
	});
	const [disableCateogry, setDisableCategory] = React.useState(true);
	const [disableGroup, setDisableGroup] = React.useState(true);
	const [disableAsset, setDisableAsset] = React.useState(true);
	// const [disablePrefix, setDisablePrefix] = React.useState(true);
	const [arrGroup, setArrayGroup] = React.useState([]);
	const [arrAsset, setArrAsset] = React.useState([]);
	const [companyParse, setcompanyParse] = React.useState(null);
	const [prefix, setPrefix] = React.useState('');
	const [groupSelected, setGroupSelected] = React.useState('');
	const [assetSelected, setAssetSelected] = React.useState('');
	const [code, setCode] = React.useState(null);
	const { currentState } = useSelector(state => ({ currentState: state.possesion }), shallowEqual);
	const { entitiesInformation } = currentState;
	const suppiler =
		entitiesInformation && entitiesInformation.supplier
			? entitiesInformation.supplier.reduce(
					(arr, curr) => [...arr, { value: curr.supplierID, label: curr.supplierName }],
					[]
			  )
			: [];
	const department =
		entitiesInformation && entitiesInformation.department
			? entitiesInformation.department.reduce(
					(arr, curr) => [...arr, { value: curr.deptCode, label: curr.deptName }],
					[]
			  )
			: [];
	const company =
		entitiesInformation && entitiesInformation.company
			? entitiesInformation.company.reduce(
					(arr, curr) => [...arr, { value: curr.cmpnID, label: curr.cmpnName, shortName: curr.shortName }],
					[]
			  )
			: [];
	const category =
		entitiesInformation && entitiesInformation.assetType
			? entitiesInformation.assetType.reduce(
					(arr, curr) => [...arr, { value: curr.typeID, label: curr.typeName }],
					[]
			  )
			: [];
	const group =
		entitiesInformation && entitiesInformation.assetGroup
			? entitiesInformation.assetGroup.reduce(
					(arr, curr) => [...arr, { value: curr.groupID, label: curr.groupName, typeID: curr.typeID }],
					[]
			  )
			: [];
	// data lấy từ đây parse ra từ store đang test nên chưa tối ưu
	const assetDetail =
		entitiesInformation && entitiesInformation.assetGroupDetail
			? entitiesInformation.assetGroupDetail.reduce(
					(arr, curr) => [
						...arr,
						{ value: curr.absID, label: curr.itemName, code: curr.itemCode, groupID: curr.groupID }
					],
					[]
			  )
			: [];
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
		// const test = assetDetail.reduce(
		// 	(arr, curr) =>
		// 		curr.value === arrAssetDetailParse[0].value
		// 			? { value: curr.value, label: curr.label, code: curr.code }
		// 			: arr,
		// 	{}
		// );
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
				validationSchema={initialValue.assetID ? false : checkValidateForm}
				initialValues={initialValue}
				onSubmit={values => {
					saveAsset(values, prefix);
				}}
			>
				{({ handleSubmit, isSubmitting }) => (
					<Form>
						<DialogContent dividers>
							<div className="px-16 sm:px-24">
								<div className="flex flex-row">
									<h5 className="font-extrabold">Thông tin tài sản</h5>
									<span className="border-b-1 mt-3 ml-6 border-fuchsia w-3/6 sm:w-5/6 h-10" />
								</div>
								{!initialValue.assetID && (
									<div className="grid grid-cols-1 sm:grid-cols-4  gap-8 ">
										<Field
											label="Số lượng (*)"
											autoFocus
											name="qty"
											placeholder="Vui lòng điền số lượng"
											hasFeedback
											component={AntInputNumber}
											className="mx-4 mb-16"
										/>
									</div>
								)}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
									<Field
										label="Tên tài sản (*)"
										autoFocus
										name="assetName"
										type="text"
										component={AntInput}
										className="mx-4"
										hasFeedback
										placeholder="Vui lòng điền tên tài sản"
									/>
									<Field
										label="Nhà cung cấp"
										autoFocus
										name="suppiler"
										component={AntSelect}
										options={suppiler}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid mb-16 gap-8 ">
									<Field
										label="Quy cách tài sản/Thông số"
										autoFocus
										name="descr"
										component={InputTextAreaLg}
										row={2}
										placeholder="Vui lòng điền nội dung"
										className="mx-4 mb-16"
									/>
								</div>
								{/* <div className="grid mb-16 gap-8 ">
									
								</div> */}
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									<Field
										label="Ngày mua (*) "
										autoFocus
										defaultValue={initialValue.purchaseDate}
										name="purchaseDate"
										format="DD-MM-YYYY"
										placeholder="Vui lòng chọn ngày mua"
										component={DateCustom}
										className="mx-4 mb-16"
										hasFeedback
									/>
									<Field
										label="Thời gian hiệu lực"
										autoFocus
										defaultValue={initialValue.effectiveDate}
										name="effectiveDate"
										format="DD-MM-YYYY"
										component={DateCustom}
										className="mx-4 mb-16"
									/>
									<Field
										label="Thời gian bảo hành "
										autoFocus
										placeholder="Vui lòng chọn thời gian bảo hành"
										name="warrantyPeriod"
										type="number"
										component={AntInput}
										className="mx-4 mb-16"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-3 mb-16 gap-8 ">
									<Field
										label="Nguyên giá "
										autoFocus
										name="originalPrice"
										type="number"
										placeholder="Vui lòng điền nguyên giá"
										component={InputCurrency}
										className="mx-4 mb-16"
									/>
									<Field
										label="Thời gian KH "
										autoFocus
										name="depreciationPeriod"
										component={AntInputNumber}
										placeholder="Vui lòng chọn thời gian KH"
										className="mx-4 mb-16"
									/>
									<Field
										label="Đơn vị quản lí (*)"
										name="deptCodeManager"
										notFoundContent={<Spin size="small" />}
										component={AntSelect}
										options={department}
										className="mt-8 mb-16"
										hasFeedback
									/>
								</div>
							</div>
							{!initialValue.assetID && (
								<div className="px-16 sm:px-24">
									<div className="flex justify-between flex-row">
										<h5 className="font-extrabold">Quy tắc đánh mã tài sản trong lô</h5>
										<span className="border-b-1 mt-3 ml-6 border-fuchsia w-auto sm:w-8/12 h-10" />
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 mb-16 gap-8 ">
										<Field
											label="Công ty (*)"
											autoFocus
											name="company"
											notFoundContent={<Spin size="small" />}
											handleChangeState={onChangeCompany}
											component={AntSelect}
											options={company}
											className="mx-4 mb-16 w-auto	"
											hasFeedback
										/>
										<Field
											label="Loại (*)"
											autoFocus
											disabled={!!disableCateogry}
											name="category"
											component={AntSelect}
											handleChangeState={onChangeCategory}
											options={category}
											className="mx-4 mb-16"
											variant="outlined"
											hasFeedback
										/>
										<Field
											label="Nhóm (*)"
											autoFocus
											name="group"
											dafaultValue={initialValue.group}
											value={groupSelected}
											disabled={!!disableGroup}
											handleChangeState={onChangeGroup}
											component={AntSelect}
											options={arrGroup}
											className="mx-4 mb-16"
											hasFeedback
										/>
										<Field
											label="Tài sản (*)"
											autoFocus
											name="asset"
											dafaultValue={initialValue.asset}
											value={assetSelected}
											disabled={!!disableAsset}
											component={AntSelect}
											handleChangeState={onChangeAsset}
											options={arrAsset}
											className="mx-4 mb-16"
											hasFeedback
										/>
										<Field
											label="Tiền tố (*)"
											autoFocus
											disabled
											value={prefix}
											component={AntInput}
											type="text"
											className="mx-4 mb-16 flex-1"
											hasFeedback
										/>
									</div>
								</div>
							)}
						</DialogContent>
						<DialogActions>
							{actionLoading ? (
								<Spin size="middle" />
							) : (
								<Button variant="contained" autoFocus type="submit" color="primary">
									{initialValue.assetID ? 'Cập nhật' : 'Thêm mới'}
								</Button>
							)}
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	);
}
