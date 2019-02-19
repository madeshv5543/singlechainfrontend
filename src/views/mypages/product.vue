<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card>
          <b-row>
            <b-col md="6">
              <img  class="lcimg" :src="onboardImg">
            </b-col>
            <b-col md="6" class="barc">
              <div class="vc">
                <div>
                  <router-link to="/productorder"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-list"> Add  New product</i></b-button></router-link>
                </div>
                <br>
                <div>
                <router-link to="/productlist"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-plus"> Product List </i></b-button> </router-link> 
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>

</template>
<script>
  import 'vuetify/dist/vuetify.min.css'
  import 'material-design-icons-iconfont/dist/material-design-icons.css'
  import axios from 'axios'
 import jwtService from '@/services/utils.js'

  export default {
    props:{
      onboardImg: {
      type: String,
      default: require('@/assets/productlanding.jpg')
    },
    },
    data() {
      return {
        user: {
          name: '',
          unitprice: '',
          weight: '',
          expiry: '',
          description: '',
          warranty: '',
          quality: '',
          manufacturer: '',
          type: '',
          certification: '',
          company: '',
          unitofquantity: '',
          image: '',
          urlimage: '',
          quantity: '',
          skucode: ''
        },
        userDetails: null,

      }
    },


    methods: {
      create() {
        var app = this;
        app.$router.push("/productorder")
      },

      getLoggedUser: function () {
        let self = this
        self.userDetails = jwtService.getUSer()
        console.log("user details", self.userDetails)
      },

      deletee() {
        var app = this;
        app.$router.push("/productlist");
      }
    },
    created: function initFunction() {
      this.getLoggedUser()
    },
    computed: {
      admin (){
        return jwtService.admin;
      },
      hub () {
        return jwtService.hub;
      },
      centre() {
        return jwtService.centre
      }
    }
  }

</script>
<style scoped>
  .indigo {
    background-color: cornflowerblue !important;
    border-color: cornflowerblue !important;
  }

  .v-card__text {
    padding: 16px;
    width: 64% !important;
  }

</style>
