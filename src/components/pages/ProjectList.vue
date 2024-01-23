<template >
  <layout-div >
    <div class="container ">
      <h2 class="text-center mt-50 mb-20  ">MI APP DE PELICULAS</h2>
      <div class="card badgarund">
        <div class="row" id="generos">
          <div class="col-2" v-for="genre in genres" :key="genre.id">
            <router-link :to="`/showMovies/${genre.id}`" class="card bg-light text-center  ">
              <div class="card-body text-uppercase ">
                <p>{{ genre.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="btn-group" role="group" style="display: flex; justify-content: center; align-items: center">
      
        <button class="btn" @click="BestsMovies()" className="btn btn-outline-danger mx-1">
          Cartelera
        </button>

        <button class="btn" @click="BestsMovies()" className="btn btn-outline-danger mx-1">
          Mejores peliculas
        </button>

        <button class="btn" @click="fetchTopRatedMovies()" className="btn btn-outline-danger mx-1" >
          Mejor Calificada
        </button>
      </div>

      <div v-if="popularMovies.length > 0 || bestMovies.length > 0 || topRatedMovies.length > 0">
        <h2 class="text-center" v-if="popularMovies.length > 0">Películas Populares</h2>
        <div class="row" v-if="popularMovies.length > 0">
          <div class="col-3" v-for="movie in popularMovies" :key="movie.id">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <h2 class="text-center" v-if="bestMovies.length > 0">Mejores Películas</h2>
        <div class="row" v-if="bestMovies.length > 0">
          <div class="col-3" v-for="movie in bestMovies" :key="movie.id">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-center" v-if="topRatedMovies.length > 0">Películas Mejor Calificadas</h2>
      <div class="row" v-if="topRatedMovies.length > 0">
          <div class="col-3" v-for="movie in topRatedMovies" :key="movie.id">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>

    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";

export default {
  name: "ProjectList",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      genres: [],
      bestMovies: [],
      popularMovies:[],
      topRatedMovies: [],
    };
  },
  created() {
    this.fetchProjectList();
  },
  methods: {
    fetchProjectList() {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=492d218f089fd8c20e9c3a945b482a9f&language=es-CO"
        )
        .then((response) => {
          this.genres = response.data.genres;
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },

    fetchPopularMovies() {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?page=1&api_key=492d218f089fd8c20e9c3a945b482a9f&language=es-CO"
    )
    .then((response) => {
      this.popularMovies = response.data.results;
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
},
    BestsMovies() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=492d218f089fd8c20e9c3a945b482a9f&language=es-CO"
        )
        .then((response) => {
          this.bestMovies = response.data;
          console.log(response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
        
    },
  

    fetchTopRatedMovies() {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=492d218f089fd8c20e9c3a945b482a9f&language=es-CO"
    )
    .then((response) => {
      this.topRatedMovies = response.data;
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  }
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap');
 
.container {
  background-position: center center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  font-family: "Arvo", serif;
}

.badgarund{
  background-image: url("../../assets/fondo2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; 
}

.text-center {
  font-weight: bold;
  font-family: "Arvo", serif;
  text-align: center;
  margin-bottom: 2%;
  text-decoration: none;
}

.btn-group .btn {
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arvo", serif;
}

.card {
  border: 1px solid #807a7a71;
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.card-body {
  padding: 20px; 
}

.card:hover {
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);
}
</style>
