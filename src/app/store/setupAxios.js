export default function setupAxios(axios, store) {
	const token = `cee1DDIm0NhzXJgncnpd4HTq7_Tkd-F0KKcBOXQUTfsnhKgbtj_ayLj2cVpuJW5DTGLZicgfVu7h257mB1RhusI1nDsb5arDCOMqy3eTKre5MUP9NpRiWwPZLY_cJGVkTfr6R-eYSKyJv3L0hePXhrQjp2-ycfEo9UMVoNlsBczJsfZzN1QEF_sUFmDNLvcuTrwiCVMV1rud990FZnin3ieFb7RGC_Ka0S3-BKQgYPEpbryA-zeY8frHqmPLl0aZzHKTb0hGDtUgKOt13YI7JlSUiBzBXAHFkg1BXUfpu9bb4cPBo7jvEwalnhQSVpXprI3LYiuEwn-R7BozsKOVjoGvEUW2u4bKr4KufG2E_R0xs5CKuIJbrezNImiSk9zhJDMcir3so-64PKstB7V_IutkQsd4dQFC4oz5DVtTF7I`;
	axios.interceptors.request.use(
		config => {
			const {
				auth: { authToken }
			} = store.getState();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		err => Promise.reject(err)
	);
}
