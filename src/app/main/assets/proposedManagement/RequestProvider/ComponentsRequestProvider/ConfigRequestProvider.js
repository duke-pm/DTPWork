import * as Yup from 'yup';

export const validateSchema = Yup.object().shape({
	name: Yup.string().required('Nhân viên không được để trống'),
	department: Yup.string().required('Bộ phận không được để trống'),
	region: Yup.string().required('Khu vực không được để trống'),
	locationUse: Yup.string().required('Nơi dùng không được để trống'),
	reason: Yup.string().required('Lí do không được để trống')
});
