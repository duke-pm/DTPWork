export const currencyFormat = num => {
	if (num) {
		return `${num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VNĐ`;
	}
	return '0 VNĐ';
};
