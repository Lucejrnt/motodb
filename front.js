var field = new Vue({
  el: '#defaultVue',
  data: {
    result : {value: "my value"}
  },
  methods: {
    getMotos: function(event) {
      $.get('/motos').then(
        function(data) {
          console.log("success");
          console.log(data);
          this.result = data;
        },
        function(data) {
          console.log("failure");
        }
    );
    }
  }
})
