function formatDate(date) {
    return format(date, "MMM do, yyyy hh:mm aaaa", { locale: enAULocale })
}

module.exports.formatDate = formatDate;