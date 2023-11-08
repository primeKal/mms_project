const filter = {
    formatPriceCurrency (value, currencyISO3) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyISO3
        })
        return value != null ? formatter.format(value) : '-'
    },
}
export default filter