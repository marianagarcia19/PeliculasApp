<template>
  <div class="badgarund">
   <layout-div> 
        <h2 class="text-center mt-10 mb-3">{{project.original_title}}</h2>
          <div class="btn">
                <router-link 
                    class="btn btn-danger mx-1"
                    to="/showMovies/{id}">Atras
                </router-link>
          </div>

          <div class="card-one ">
              <p class="card-img" ><img :src=" urlBaseImage + project.poster_path " width="140" height="100"/></p>
                <b class="p">Pelicula:</b>
                <p class="p">{{project.original_title}}</p> 
                <b class="p" >Descripcion:</b>
                <p class="p">{{project.desc}}</p>
            </div>
   </layout-div>
  </div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'ProjectShow',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      project: {
        name: '',
        description: '',
        original_title: '',
        desc: '',
        poster_path:'',
      },
      isSaving:false,
      movies:[
       ],
       urlBaseImage : 'https://image.tmdb.org/t/p/w500/',
       genre:'',
    };
  },
  created() {
    const id = this.$route.params.id;

    console.log("id " + id);

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=492d218f089fd8c20e9c3a945b482a9f&language=es-CO`)
    .then(response => {
       console.log(response.data)
        let projectInfo = response.data
        this.project.name = projectInfo.name
        this.project.description = projectInfo.description
        this.project.original_title = projectInfo.original_title
        this.project.desc = projectInfo.overview
        this.movies=projectInfo
        this.project.poster_path=projectInfo.poster_path
         
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
  methods: {
     
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.badgarund{
  background-image: url("../../assets/fondo2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.btn{
  margin-left: 18%;
  text-transform: uppercase;
  border-radius: 20px; 
  font-family: "Arvo", serif;
}
.card-one{
  width: 700px;
  margin-left: 20%;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.card-body {
  
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: "Arvo", serif;
}
.card-img {
  margin-left: 40%;
  padding: 20px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  font-family: "Arvo", serif;
}
.p{
  font-family: "Arvo", serif;
  margin-left: 2%;
  margin-bottom: 2% ;
  margin-right: 4% ;
}
 
</style>