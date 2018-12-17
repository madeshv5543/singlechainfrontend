<template>
  <div class="animated fadeIn">
    <div class="card">
      <div class="card-header">
        Headings
      </div>
      <div class="card-body">
        <vue-good-table :columns="columns" :rows="rows" :search-options="{enabled: true}" :pagination-options="{enabled: true}">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div>
                <a class="fa fa-pencil" @click="click(props.row._id)"></a> &emsp;&emsp;
                <a class="fa fa-times" @click="cancel(props.row._id)"></a>
              </div>
            </span>
            <span v-else>
              {{props.formattedRow[props.column.field]}}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
  import userService from '@/services/userService.js';
  import axios from 'axios';
  import {
    VueGoodTable
  } from 'vue-good-table';
  export default {
    name: 'typography',
    components: {
      VueGoodTable,
    },

    data() {

      return {
        info: '',
        id: 'null',
        splice: '',
        product: {
        },
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
        //   products:[],
        rows: [],
        columns: [{
            label: 'NAME',
            field: 'name'
          },
          {
            label: 'TYPE',
            field: 'type'
          },
          {
            label: 'QUANTITY',
            field: 'quantity'
          },
          {
            label: 'CERTIFICATION',
            field: 'certification'
          },
          {
            label: 'PRICE',
            field: 'unitprice'
          },
          {
            label: 'WEIGHT',
            field: 'weight'
          },
          {
            label: 'COMPANY',
            field: 'company'
          },
          //  { label: 'EXPIRY', field: 'expiry', type:'date',formatFn: this.formatDate},                                                                               

          // { label: 'STATUS', field: 'status'}, 
          {
            label: 'ACTION',
            field: 'action'
          }
        ],
      }


    },
    mounted() {
      // const status = JSON.parse(window.localStorage.getItem('User'));
      // var token =  status.token
      // console.log(status)
      this.getproductList()
    },

    methods: {
      getproductList(){
              var app = this;
         userService.getProdcutList()
        .then((response) => {
          app.rows = response.data;
        })
        .catch((error) => {
          console.log("error");
        });
      },
      click(params) {
        //let id = this.$route.params.id;
        let path1 = '/editlist/' + params
        this.$router.push({
          path: path1
        })
        console.log(path1)
        // console.log(params)

      },
      cancel(params) {

        let path2 = '/deletelist/' + params
        console.log(path2)

        var app = this
        var formData = new FormData();
        formData.delete(params)

        formData.delete('weight', this.user.weight)
        formData.delete('description', this.user.description)
        formData.delete('warranty', this.user.warranty)
        formData.delete('quality', this.user.quality)

        formData.delete('manufacturer', this.user.manufacturer)

        formData.delete('type', this.user.type)
        formData.delete('certification', this.user.certification)
        formData.delete('unitofquantity', this.user.unitofquantity)
        formData.delete('company', this.user.company)
        formData.delete('quantity', this.user.quantity)
        formData.delete('expiry', this.user.expiry)
        formData.delete('skucode', this.user.skucode)
        formData.delete('urlimg', this.fname)
        formData.delete('image', this.urlimage)
        console.log(this.fname)
        console.log(this.user.name)
        let id = params;
        console.log(id)
          userService.deleteProduct(id)
          .then(res => {
            // window.location.reload()
            this.$toasted.show(' Details removed', {
              fullWidth: false,
              theme: "outline",
              position: "bottom-right",
              duration: 5000
            })
            this.getproductList()
          })
      },
    }



  }

</script>
