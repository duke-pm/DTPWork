import moment from 'moment';

export const TimeParse = time => {
	const date = new Date(moment(time).add(25, 'hours').format('MMM DD, YYYY HH:MM'));
	return date;
};
