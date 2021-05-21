import { validateField } from '@fuse/core/DtpConfig';
import * as Yup from 'yup';

export const validateSchema = Yup.object().shape({
	name: Yup.string().required(`${validateField}`),
	department: Yup.string().required(`${validateField}`),
	region: Yup.string().required(`${validateField}`),
	locationUse: Yup.string().required(`${validateField}`)
});
