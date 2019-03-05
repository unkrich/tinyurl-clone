exports.getDateInTenYears = () => {
	var date = new Date();
	date.setFullYear(date.getFullYear() + 10); // Expire in 10 years
	return date;
}