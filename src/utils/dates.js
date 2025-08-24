export const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getMonth = (date) => {
    return date.toLocaleString('default', { month: 'long' });
};

export const incrementDate = (date) => {
    date.setDate(date.getDate() + 1);
};
