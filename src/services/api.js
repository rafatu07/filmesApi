import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=da8beefd8d201a2224d0bed08815c4f3&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "da8beefd8d201a2224d0bed08815c4f3",
        language: "pt-BR",
    },
});

export default api;