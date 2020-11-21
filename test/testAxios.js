const axios = require('axios').default

// Make a request for a user with a given ID
axios.get('http://10.0.0.164/?f=on/')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

//cria outro projeto e usa o axios para ver 