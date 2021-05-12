import * as Yup from 'yup';

export const validateSchema = Yup.object().shape({
	assets: Yup.string().required('Tài sản không được để trống'),
	status: Yup.string().required('Trạng thái không được để trống'),
	note: Yup.string().required('Lí do báo hỏng/mất không được được để trống'),
	date: Yup.string().required('Ngày báo hỏng/mất không được để trống')
});
