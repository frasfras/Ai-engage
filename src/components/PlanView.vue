<template>
  <div class="about">
    <formWizard @onComplete="fetchSentim">
      <tab-content title="Feedback " :selected="true">
        <div class="form-group">
          <label for="overview">Project</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter project"
            v-model="projectName"
          />
          <label for="overview">Comments</label>
          <input
            type="text"
            class="form-control"
            placeholder="south course "
            v-model="content"
          />
        </div>
      </tab-content>

      <tab-content title="Resolution">
        <div class="form-group">
          <label for="referral"></label>
        </div>
        
          <label for="email">Approval</label>
           <v-slider
          v-model="ex5.val"
          :color="ex5.color"
          :label="ex5.label"
          min="1"
          max="10"
          thumb-label="always"
        ></v-slider>

          <label for="Instructions">Requestor</label>
          <input
            type="text"
            class="form-control"
            placeholder=""
            v-model="projectName"
          />
        
      </tab-content>
    </formWizard>
  </div>
</template>
<script>
//local registration
import { FormWizard, TabContent } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";

export default {
  name: "PlanView",
  //component code
  components: {
    FormWizard,
    TabContent,
  },
  data() {
    return {
      projectName: "",
      requestor: "",
      content: "",
      approve: null,
      description: "approval",
      responseA: "",
      score: 0,
      done: "success",
      ex5: { label: "Approval rating", val: 5, color: "#234560" },
    };
  },
  methods: {
   fetchSentim(){
        var sentiment;
       var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic M2E5OGEwNGItN2JiZC00MTU1LWJmZmEtY2RkOTllNmI3NzU4Og==");

        var formdata = new FormData();
        formdata.append("review", this.content);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch("https://a.azure-eu-west.platform.peltarion.com/deployment/b4174022-a33f-447f-908d-d468099d9675/forward", requestOptions)
          .then(response => response.text())
          .then((res) => {
                  this.responseA = res;
                  const myObj = JSON.parse(this.responseA);
                  this.score = myObj.sentiment.positive;
                  this.Feedbackplan(this.responseA);
                  })
          .catch(error => console.log('error', error));
      
     
    },

    Feedbackplan(score){

     var name = this.projectName; 
     var approve = this.ex5.val;
     var comments = score;
     var content = this.content;

     var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query: "mutation MysendFeedback ($name: String,$comments: String,$approved:Float, $content: String) {\n  insert_projects(name: $name, comments: $comments, approved: $approved, content: $content) {\n    name\n    comments\n    city\n    approved\n    sentiment\n  }\n}",
        variables: {"name": name,"comments": score, "city": "dallas", "approved":approve,"content": content}
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
      };

      fetch("https://api.baseql.com/airtable/graphql/app0F8qS63BYS5aRv", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));





    },

     fetchSentiment(){

        var msg = this.content;
        var from = this.requestor; 
            
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "apikey shima::stepzen.net+1000::6c712fbd4771efa8bb73e003d39d39b530b2645e6993693797f9393b18009e0e ");

        var graphql = JSON.stringify({
          query: "query MyQuery {\ngoogleNaturalLanguage_analyzeSentiment(\n    content: \"i feel sad\"\n    googlenaturallanguage_key: \"AIzaSyCQk73yZWbRr3vfiCmMBR2WuXJJzfTw6BE\"\n  ) {\n    documentSentiment {\n      score\n    }\n  }\n}",
          variables: {}
        })
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: graphql,
          redirect: 'follow'
        };

     let response1 =   fetch("https://shima.stepzen.net/api/tweetr/__graphql", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then((res) => {
            this.content = res;
              console.log(this.content);
          })
          .catch(error => console.log('error', error));
         
      
    },

  },
  
};
</script>
<style>
nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
