 const filter = {
    formatPriceCurrency (value, currencyISO3) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyISO3
        })
        return value != null ? formatter.format(value) : '-'
    },
    timeOnly(value) {
        return value != null ? new Date(value).toLocaleDateString() : '-'
    },
    dateOnly(value) {
        return value != null ? new Date(value).toLocaleTimeString() : '-'
    }
}
export default filter