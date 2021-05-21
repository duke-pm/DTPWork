import { validateField } from '@fuse/core/DtpConfig';
import * as Yup from 'yup';

export const validateSchema = Yup.object().shape({
	assets: Yup.string().required(`${validateField}`),
	status: Yup.string().required(`${validateField}`),
	note: Yup.string().required(`${validateField}`),
	date: Yup.string().required(`${validateField}`)
});
