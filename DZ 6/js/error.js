Vue.component('error-component', {

    data() {
        return {
            hasError: false,
        }
    },

    template: `
            <div class="error-style" v-if="hasError">Oops... Something went wrong!</div>
  
    `
});