<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <div class="input m-4">
     
    </div>
    <div class="input m-4">
      <div id="example-1">
        <button id="x-3" v-on:click="onSubmit">Add connection</button>

        <div v-if="status == 'done'">
          <p>connected {{ status }} To {{ answer }}.</p>
        </div>
      </div>
    </div>

    <table id="demo-table-id" class="table table-striped">
      <caption></caption>
      <thead>
        <tr>
         <th>Project</th>
          <th>City</th>
          <th>Comments Sentiment</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" id="checkbox" v-model="checked" />
            <label for="checkbox">{{ checked }}</label
            >- Disable 
          </td>
          <td><button type="button" class="btn btn-primary">city</button></td>
          <td>
            <button type="button" class="btn btn-success">positive</button>
          </td>
          <td><button type="button" class="btn btn-info">rating</button></td>
        </tr>

        <tr v-for="(row, idx) in rowsa" :key="idx">
          <td >{{ row["Name"] }} </td>
          <td>{{ row["City"] }}</td>
          <td>{{ row["sentiment"] }}</td>
          <td>{{ row["Rating"] }}</td>
        </tr>
        <tr class="info">
          <td colspan="4"></td>
          <td>
            <b></b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import axios from "axios";

//import { ref } from '@vue/composition-api';

export default {
  name: "HelloWorld",
  props: {
    //rows: rows,
    msg: String,
    api_endpoint_cpu: {
      type: String,
      default: "http://localhost:8081/api",
    },
    api_endpoint_gpu: {
      type: String,
      default: "https://mocki.io/v1/4b04474f-5f43-46bd-8376-cf8d48f669a2",
    },
    queries_examples: {
      type: Array,
      default: function () {
        return [
          "What is artificial intelligence?",
          "What is engagement?",
        ];
      },
    },
  },
  components: {
    ToggleButton,
  },
  data() {
    return {
      gpu: false,
      fairw: false,
      cpu: false,
      green: false,
      checked: false,
      status: "",
      answer: "",
      courses: null,
      plans: [],
      responseA: [],
      rowsa: [],
      data: null,
    };
  },
  created: function () {
    axios
      .get("https://mocki.io/v1/4b04474f-5f43-46bd-8376-cf8d48f669a2")
      .then((res) => {
        this.courses = res.data;
      });
   
  },
  mounted: function () {
    //this.loadPlan();
    this.fetchPlan();
  },
  methods: {
    fetchPlan() {
      const query = `{
                    queryEngage{
                         records{
                             fields{
                               Name 
                               City 
                               Rating
                               Comments
                               sentiment
                             } 
                         }
                    }
                 }`;

      try {
        fetch("https://shima.stepzen.net/api/tweetr/__graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "apikey shima::stepzen.net+1000::6c712fbd4771efa8bb73e003d39d39b530b2645e6993693797f9393b18009e0e",
          },
          body: JSON.stringify({
            query:
              "{queryEngage{records{fields{Name City Rating Comments sentiment} }  }}",
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            this.responseA = res.data;
            this.mapToRows();
          })
          .then((data) => {
            console.log("Success:", data);
            //  console.log(responseA);
          });
      } finally {
        console.log(query);
      }
    },

    mapToRows() {
      this.rowsa = this.responseA.queryEngage.records // <- this is an Array
        // and map each edge into its node attribute
        .map((records) => records.fields); //
      console.log(this.rowsa);
    },
    loadPlan: function () {
      // Get /intro content

      var self = this;
      var data = JSON.stringify({
        query:
          "{queryWaterplan{records{fields{Name City Rating Comments sentiment } }  }}",
      });
      //     var url= "https://shima.stepzen.net/api/airtable/__graphql"
      this.plans = [];
      var config = {
        method: "post",
        url: "https://shima.stepzen.net/api/airtable/__graphql",
        headers: {
          Authorization:
            "apikey shima::stepzen.net+1000::6c712fbd4771efa8bb73e003d39d39b530b2645e6993693797f9393b18009e0e ",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //  console.log(JSON.stringify(response.data));
          self.plans = response.data;
          console.log(self.plans);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.status = "loading";

      if (this.gpu) {
        var api_endpoint = this.api_endpoint_gpu;
      } else {
        api_endpoint = this.api_endpoint_cpu;
      }
      let self = this;
      self.answer = "";
      axios
        .get(api_endpoint, { params: { query: self.query } })
        .then(function (response) {
          self.answer = response.data.courses.name;
          self.status = "done";
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
// fetchGraphQLData();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
span {
 background-color: #30c49b;
 padding: 6;
 max-width: 30rem;
}
</style>
