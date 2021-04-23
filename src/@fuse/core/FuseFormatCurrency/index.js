export const currencyFormat = num => {
	if (num) {
		return `${num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
	}
	return '0';
};
