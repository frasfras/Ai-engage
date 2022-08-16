<template>

  <div class="about">
   <v-app id="inspire">
   <h3>Formulate waterplan
   </h3>
   <PlanView />
  </v-app>
  
  
  </div>
</template>
<script>
//import HelloCourse from "@/components/CourseView.vue";
import PlanView from "@/components/PlanView.vue";
/* eslint-disable */ 
export default {
  name: "AboutView",
  components: {
    PlanView,
  },
  data () {
    return {
      e1: 1,
    }
  },
};
</script>
