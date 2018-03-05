import Vue from "vue";

Vue.directive("focus", {
    inserted: function (el) {
        el.focus();
    }
});

// Vue.directive('uppercase', {
//   inserted: function (el) {
//     console.log(el)
//     el.toUpperCase()
//   }
// })

Vue.directive("resaltado", {
    bind(el, binding, vnode) {
        let color = binding.value.color ? binding.value.color : "white";
        let bgcolor = binding.value.bgcolor ? binding.value.bgcolor : "green";
        el.style.backgroundColor = bgcolor;
        el.style.color = color;
        el.style.fontWeight = "bold";
    }
});
