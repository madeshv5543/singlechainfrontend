<template>
  <div class="animated fadeIn">
    <b-card>
    <div class="row">
       <div class="col-md-12">
       
  <div class="row">
      <div class="col-md-6">

 create product
         </div>

        <div class="col-md-6">
          <div><b-button type="submit" @click="create" variant="primary"><i class="fa fa-plus"></i> New product</b-button></div>&emsp;&emsp;

 <div><b-button type="submit" @click="deletee" variant="primary"><i class="fa fa-table"></i> List view</b-button></div>&emsp;&emsp;
 <!-- <div> <b-button type="submit" @click="tree" variant="primary"><i class="fa fa-tree"></i> Product Tree </b-button></div>&emsp;&emsp; -->
</div>
</div>
 </div>  </div>
 </b-card>
    </div>

</template>
<script>

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'


export default {
  data () {
    return {
    user: {
name:'',
 unitprice:'',           
 weight:'',
 expiry:'',
 description:'',
 warranty:'',
quality:'',
manufacturer:'',
type:'',
certification:'',
company:'',
unitofquantity:'',
 image:'',
urlimage:'',
 quantity:'',
 skucode:''




        },

    
    }
  },
  

methods: {
  create(){
    var app=this;
    app.$router.push("/productorder")
  },
  tree(){
    var app=this;
 app.$router.push("/tree");
  },
deletee(){
  var app=this;
  app.$router.push("/list");
}
}
}


</script>
<style scoped>
.indigo {
  background-color: cornflowerblue!important;
  border-color: cornflowerblue!important;
}
.v-card__text {
    padding: 16px;
    width: 64% !important;
}
</style>