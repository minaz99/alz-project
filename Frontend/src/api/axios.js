import axios from "axios";

export default axios.create({ baseUrl: "https://reqres.in" }); //Fake api
//export default axios.create({ baseUrl: "https://alz-project.herokuapp.com/" }); Real api
