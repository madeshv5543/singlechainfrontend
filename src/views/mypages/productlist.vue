<template>
  <div class="animated fadeIn">

    <b-row>

      <b-col lg="10">

      </b-col>
  <b-col lg="2">
<b-button type="submit" @click="tree" variant="primary"><i class="fa fa-table"></i> Tree view</b-button>
 <br>
  </b-col>
 

      <b-col lg="12">
        <c-table :table-data="items" :fields="fields" @edit-Item="editOrder"  @view-Item="viewOrder" caption="<i class='fa fa-align-justify'></i> Product List"></c-table>
      </b-col>

      
    </b-row>
    <!--/.row-->





  </div>
</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '../base/Table.vue'
import userService from '@/services/userService.js';

  export default {
    name: 'tables',
  components: {cTable},
  data: () => {
    return {
      items: [],
      itemdelete:null,
      fields: [
        {key: 'name', label: 'Name', sortable: true},
        {key: 'type', label:'Type '},
        {key: 'quantity', label: 'Quantity'},
        {key: 'certification', label: 'Certification', sortable: true},
           {key: 'unitprice', label: 'UnitPrice', sortable: true},
              {key: 'weight', label: 'Weight', sortable: true},
                 
        {key: 'orderAction',label:"view"}
      ],
    }
  },

 methods: {

     tree(){
    var app=this;
 app.$router.push("/tree");
  },
    getproductList() {
      let self = this;
      userService.getProdcutList()
      .then(
        res => {
         if(res.status === 200) {
           self.items = res.data;
         }
        },
        err => {
          console.log("error on get the order list")
        }
      )
    },

    viewOrder(item) {
     this.$router.push({
       name:'editlist',
       params:{id:item}
     })
    },
 },

  created: function() {
    this.getproductList()
  }
  }
  


</script>
