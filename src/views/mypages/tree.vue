<template>
  <div>
    <template>
      <v-card>
        <v-card-title class="indigo white--text headline">Products</v-card-title>
        <v-layout justify-space-between pa-3>
          <v-flex xs5>
            <v-treeview
              :active.sync="active"
              :items="items"
              :load-children="fetchUsers"
              :open.sync="open"
              activatable
              active-class="primary--text"
              class="grey lighten-5"
              open-on-click
              transition
              
            >
            
              <v-icon
                v-if="!item.children"
                slot="prepend"
                slot-scope="{ item, active }"
                :color="active ? 'primary' : ''"
              >mdi-account</v-icon>
            </v-treeview>
         
          </v-flex>
          <v-flex d-flex text-xs-center>
            <v-scroll-y-transition mode="out-in">
              <div
                v-if="(!selectedac)&&(!selectedcl)&&(!selectedfu)&&(!selectedel)"
                class="title grey--text text--lighten-1 font-weight-light"
                style="align-self: center;">
                  Select a Product
              </div>
              <v-card v-if="selectedfu"
                :key="selectedfu.id"
                class="pt-4 mx-auto" flat
                max-width="400">
                <v-card-text>
                  <v-avatar  size="200">
                    <v-img :src="`http://localhost:3000/static/img/${selectedfu.image}`" class="mb-4"></v-img>
                  </v-avatar>
                  <h3 class="headline mb-2" style="text-transform:capitalize">{{ selectedfu.name }}</h3>
                  <div class="blue--text mb-2" style="text-transform:capitalize">{{ selectedfu.type }}</div>
                  <div class="blue--text subheading font-weight-bold" style="text-transform:capitalize">{{ selectedfu.company }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-layout tag="v-card-text" text-xs-left wrap>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Price:</v-flex>
                  <v-flex>{{ selectedfu.unitprice }} INR</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Quantity:</v-flex>
                  <v-flex>{{ selectedfu.quantity }}</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Warranty:</v-flex>
                  <v-flex>{{ selectedfu.warranty }} months</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Manufacturer:</v-flex>
                  <v-flex style="text-transform:capitalize;">{{ selectedfu.manufacturer }}</v-flex>
                </v-layout>
              </v-card>
                <v-card v-if="selectedcl"
                :key="selectedcl.id"
                class="pt-4 mx-auto" flat
                max-width="400">
                <v-card-text>
                  <v-avatar  size="200">
                    <v-img :src="`http://localhost:3000/static/img/${selectedcl.image}`" class="mb-4"></v-img>
                  </v-avatar>
                  <h3 class="headline mb-2" style="text-transform:capitalize">{{ selectedcl.name }}</h3>
                  <div class="blue--text mb-2" style="text-transform:capitalize">{{ selectedcl.type }}</div>
                  <div class="blue--text subheading font-weight-bold" style="text-transform:capitalize">{{ selectedcl.company }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-layout tag="v-card-text" text-xs-left wrap>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Price:</v-flex>
                  <v-flex>{{ selectedcl.unitprice }} INR</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Quantity:</v-flex>
                  <v-flex>{{ selectedcl.quantity }}</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Warranty:</v-flex>
                  <v-flex>{{ selectedcl.warranty }} months</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Manufacturer:</v-flex>
                  <v-flex style="text-transform:capitalize;">{{ selectedcl.manufacturer }}</v-flex>
                </v-layout>
              </v-card>
                <v-card v-if="selectedac"
                :key="selectedac.id"
                class="pt-4 mx-auto" flat
                max-width="400">
                <v-card-text>
                  <v-avatar  size="200">
                    <v-img :src="`http://localhost:3000/static/img/${selectedac.image}`" class="mb-4"></v-img>
                  </v-avatar>
                  <h3 class="headline mb-2" style="text-transform:capitalize">{{ selectedac.name }}</h3>
                  <div class="blue--text mb-2" style="text-transform:capitalize">{{ selectedac.type }}</div>
                  <div class="blue--text subheading font-weight-bold" style="text-transform:capitalize">{{ selectedac.company }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-layout tag="v-card-text" text-xs-left wrap>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Price:</v-flex>
                  <v-flex>{{ selectedac.unitprice }} INR</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Quantity:</v-flex>
                  <v-flex>{{ selectedac.quantity }}</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Warranty:</v-flex>
                  <v-flex>{{ selectedac.warranty }} months</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Manufacturer:</v-flex>
                  <v-flex style="text-transform:capitalize;">{{ selectedac.manufacturer }}</v-flex>
                </v-layout>
              </v-card>
               <v-card v-if="selectedel"
                :key="selectedel.id"
                class="pt-4 mx-auto" flat
                max-width="400">
                <v-card-text>
                  <v-avatar  size="200">
                    <v-img :src="`http://localhost:3000/static/img/${selectedel.image}`" class="mb-4"></v-img>
                  </v-avatar>
                  <h3 class="headline mb-2" style="text-transform:capitalize">{{ selectedel.name }}</h3>
                  <div class="blue--text mb-2" style="text-transform:capitalize">{{ selectedel.type }}</div>
                  <div class="blue--text subheading font-weight-bold" style="text-transform:capitalize">{{ selectedel.company }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-layout tag="v-card-text" text-xs-left wrap>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Price:</v-flex>
                  <v-flex>{{ selectedel.unitprice }} INR</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Quantity:</v-flex>
                  <v-flex>{{ selectedel.quantity }}</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Warranty:</v-flex>
                  <v-flex>{{ selectedel.warranty }} months</v-flex>
                  <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Manufacturer:</v-flex>
                  <v-flex style="text-transform:capitalize;">{{ selectedel.manufacturer }}</v-flex>
                </v-layout>
              </v-card>
            </v-scroll-y-transition>
          </v-flex>
        </v-layout>
      </v-card>
    </template>
  </div>   
</template>
<script>

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import userService from '@/services/userService.js';

import axios from 'axios'
const avatars = [

  
]
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  data () {
    return {
      active: [],
      avatar: null,
      open: [],
      users: [],
      clothing: [],
      acces: [],
      furniture: [],
      electronics:[],
      url2: null,
      selectedImage: null,

    
    }
  },
  computed: {
    items () {
      return [
        {
          name:'products',
          children:[
       
        {
          name: 'Accessories',
          children:this.acces
         
         
         
        },
        {
          name: 'Clothing',
          children: this.clothing
        },
        {
          name: 'Furniture',
          children: this.furniture
        },
         {
          name: 'Electronics',
   
            children:this.electronics
          }
          
         
       
        
          ]}
      ]
    },
    
    selectedfu() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      console.log('activeeee',this.active)
       return this.furniture.find(user => user.id === id)
    },
  
     selectedcl() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      console.log('activeeee',this.active)
 return  this.clothing.find(user => user.id === id )
        // return this.furniture.find(user.id == id)
     
         
  //  return this.acces.find(user =>user.id === id)
    },
     selectedac() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      console.log('activeeee',this.active)
   
  return this.acces.find(user =>user.id === id)
  
    },
      selectedel() {
      if (!this.active.length) return undefined
      const id = this.active[0]
      console.log('activeeee',this.active)
        return this.electronics.find(user => user.id === id)
     
    },
     },

  watch: {
      selected: 'randomAvatar'
  },
  methods: {
    getImage(img) {
      console.log(img)
      var url = 'http://localhost:3000/static/img/' + img
      console.log(url)
    },
    async fetchUsers (item) {
      await pause(500)
      console.log("getproductlist")
      userService.getProdcutList()
      
      .then(res => res.data)
    
        .then(json => {
          var length = Object.keys(json).length
          console.log('length',length)
          for(var i=0;i<length;i++) {
            console.log(json[i])
            if(json[i].type === 'Clothing') {
              if(item.name === 'Clothing') {
               // console.log('item',item)
                item.children.push(json[i])
              }
            }
            if(json[i].type === 'Furniture') {
              if(item.name === 'Furniture') {
                item.children.push(json[i])
              }
            }
              if(json[i].type === 'Electronics') {
              if(item.name === 'Electronics') {
                item.children.push(json[i])
              }
            }
            if(json[i].type === 'Accessories') {
              if(item.name === 'Accessories') {
                item.children.push(json[i])
              }
            }
              
          }
          return item
         // return item.children.push(...json)
      })
      .catch(err => console.warn(err))
    },
    randomAvatar () {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    }
  },
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

  