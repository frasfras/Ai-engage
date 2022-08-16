<template>
  <div id="app">
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Plan</router-link>
    </div>
    <router-view />
    </v-col cols="12">
  </v-row class="text-center">
  </v-container>
  </div>
</template>
<script>
/* eslint-disable */ 
import { ToggleButton } from 'vue-js-toggle-button';
export default {
  name: 'App',
   methods: { 
          fetchWeather(){
              fetch('https://api.openweathermap.org/data/2.5/weather?q=manila&appid=04086e1e40f5e8aad7854a1b88547698'
              )
              .then((res) => res.json())
              .then((res) => {
                    this.informations= res;
                    console.log(res);
              });
  },
  components: {
   ToggleButton
    
  },
   data() {
    return {
      gpu: false,
      fairw: false,
      cpu: false,
      green: false
    };
  },
  mounted(){
    
     this.fetchWeather();
    },
  
}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
