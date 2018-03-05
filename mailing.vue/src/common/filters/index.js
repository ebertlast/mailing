import Vue from "vue";

Vue.filter("capitalize", function (value) {
    if (!value) return "";
    value = value.toString();
    // return value.charAt(0).toUpperCase() + value.slice(1)
    return value.toLowerCase().replace(/(^|\s)[a-z]/g, function (a) {
        return a.toUpperCase();
    });
});

Vue.filter("upper", function (value) {
    if (!value) return "";
    value = value.toString();
    // return value.charAt(0).toUpperCase() + value.slice(1)
    return value.toUpperCase();
});

Vue.filter("formatNumber", function (value) {
    if (!value) return "";
    return value.toLocaleString("es-ES");
});
