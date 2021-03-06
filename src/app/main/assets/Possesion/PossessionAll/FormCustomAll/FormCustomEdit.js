import React from 'react';
import { Button, Grid } from '@material-ui/core';
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
							<Text type="subTitle" color="primary" borderBottom>
								TH??NG TIN T??I S???N
							</Text>
							<div className="grid grid-cols-1 gap-8">
								<Grid container spacing={2}>
									<Grid item xs={9} sm={9} md={9} lg={9}>
										<Field
											label="T??n t??i s???n"
											name="assetName"
											component={AntInputCustom}
											hasFeedback
											placeholder="Vui l??ng ??i???n t??n t??i s???n"
										/>
									</Grid>
									<Grid item xs={3} sm={3} md={3} lg={3}>
										{!initialValue.assetID && (
											<Field
												label="S??? l?????ng"
												name="qty"
												type="number"
												placeholder="Vui l??ng nh???p s??? l?????ng t??i s???n c???n t???o"
												component={AntInputCustom}
											/>
										)}
									</Grid>
								</Grid>
								<Field
									label="Nh?? cung c???p"
									name="suppiler"
									className="mx-4"
									component={AntSelectDropdown}
									handleOpenSelectCustom={handleOpenFormSupplier}
									options={suppiler}
								/>
							</div>
							<div className="grid gap-8 mb-20 ">
								<Field
									label="Quy c??ch t??i s???n/Th??ng s???"
									name="descr"
									component={AntDescriptionsCustom}
									row={4}
									placeholder="M?? t??? quy c??ch, th??ng s??? t??i s???n"
								/>
							</div>
							<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
								<Field
									label="Ng??y mua"
									defaultValue={initialValue.purchaseDate}
									name="purchaseDate"
									format="DD/MM/YYYY"
									placeholder="Vui l??ng ch???n ng??y mua"
									component={AntDateCustom}
								/>
								<Field
									label="Th???i gian hi???u l???c"
									defaultValue={initialValue.effectiveDate}
									name="effectiveDate"
									format="DD/MM/YYYY"
									className="mx-4"
									component={AntDateCustom}
								/>
								<Field
									label="Th???i gian b???o h??nh (th??ng) "
									placeholder="S??? th??ng b???o h??nh c???a t??i s???n"
									name="warrantyPeriod"
									type="number"
									component={AntInputCustom}
								/>
							</div>
							<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
								<Field
									label="Nguy??n gi?? "
									name="originalPrice"
									type="number"
									placeholder="Nguy??n gi?? t??i s???n"
									component={AntInputCurrency}
								/>
								<Field
									label="Th???i gian KH (th??ng) "
									name="depreciationPeriod"
									type="number"
									component={AntInputCustom}
									placeholder="S??? th??ng kh???u hao c???a t??i s???n"
								/>
								<Field
									label="B??? ph???n qu???n l??"
									name="deptCodeManager"
									component={AntSelectCustom}
									options={department}
									hasFeedback
								/>
							</div>
							{initialValue.assetID && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
									<Field
										label="Kh??ng d??ng"
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
								<Text type="subTitle" color="primary" borderBottom>
									QUY T???C ????NH M?? T??I S???N
								</Text>
								<div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
									<Field
										label="C??ng ty"
										name="company"
										placeholder="Vui l??ng ch???n c??ng ty "
										notFoundContent={<Spin size="small" />}
										handleChangeState={onChangeCompany}
										component={AntSelectCustom}
										options={company}
										className="w-auto"
										hasFeedback
									/>
									<Field
										label="Lo???i t??i s???n"
										readOnly={!!disableCateogry}
										name="category"
										component={AntSelectCustom}
										placeholder="Vui l??ng ch???n t??i s???n "
										handleChangeState={onChangeCategory}
										options={category}
										variant="outlined"
										hasFeedback
									/>
									<Field
										label="Nh??m t??i s???n"
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
										label="T??i s???n"
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
										label="Ti???n t???"
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
									<Text type="button" color="white">
										{initialValue.assetID ? 'C???p nh???t' : 'Th??m m???i'}
									</Text>
								</Button>
							)}
							<Button type="button" onClick={handleClose} variant="contained" color="secondary">
								<Text type="button">Hu???</Text>
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
export default React.memo(FormCustomEdit);
