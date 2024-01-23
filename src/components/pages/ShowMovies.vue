<template>
    <layout-div>
        <div class="container ">
      <h2 class="text-center mt-10 mb-20">PELICULAS</h2>
      <div class="btn">
        <div class="row" >
          <router-link
            class="btn btn-outline-danger mx-1"
            to="/">Atras
          </router-link>
        </div>
      </div>
      <div class="card badgarund">
        <div class="row" id="pelicula">
          <div class="col-2" v-for="movie in movies" :key="movie.id">
            <router-link :to="`/show/${movie.id}`" class="card card bg-light text-center">
                <div class="card-body text-uppercase ">
                <img :src="urlBaseImage + movie.poster_path" width="140" height="100" />
              <div class="card-title">  <p>{{ movie.original_title }}</p>
              </div>
               <div class="card-text">  <p>{{ movie.release_date }}</p>
              </div>
                </div>
            </router-link>
          </div>
        </div>
    </div>
</div>

   <!-- <div class="paginador">
      <button v-if="currentPage > 1" @click="prevPage">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button v-if="currentPage < totalPages" @click="nextPage">Siguiente</button>
    </div> -->
    </layout-div>
  </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'ShowMovies',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       project: {
         name: '',
         description: '',
         original_language: '',
         image: '',
        
       },
       isSaving:false,
       movies:[
       ],
       urlBaseImage : 'https://image.tmdb.org/t/p/w500/',
       genre:'',
     };
   },

   /* methods: {
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },

  computed: {
    movie() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.allMovies.slice(start, end);
    },
  },
     */
   created() {
     const id = this.$route.params.id;
     const namegen = this.$route.params.name;
     console.log("id " + id);
     console.log("name gen " + namegen);
     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=492d218f089fd8c20e9c3a945b482a9f&language=esCO&with_genres=${id}`)
     .then(response => {
        console.log(response.data.results)
         let projectInfo = response.data
         this.project.name = projectInfo.name
         this.project.description = projectInfo.description
         this.project.original_language =projectInfo.original_language
         this.movies = response.data.results
    
         return response

 
     })
     .catch(error => {
         Swal.fire({
             icon: 'error',
             title: 'An Error Occured!',
             showConfirmButton: false,
             timer: 1500
         })
         return error
     })
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
.btn{
  margin-left: 10%;
  text-transform: uppercase;
  font-family: "Arvo", serif;
  border-radius: 20px; 
}

.card {
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}

.card-body {   
  padding: 20px;
}

.card-title {
  text-transform: uppercase;
  font-size: 14px;
  font-family: "Arvo", serif;
  text-align: left;
}

.card-text {
  font-size: 13px;
  font-weight:normal;
  line-height: 1.5;
  text-align: left;
  font-family: "Arvo", serif;

}
 
.paginador {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

</style>