<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" /> 
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>New Order</strong>
          </div>
           <b-alert v-if="sucmsg" variant="success" show>Order Placed Successfully.</b-alert>
            <b-alert v-if="showErr" variant="danger" show>{{errmsg}}</b-alert>
          <b-form>
            <b-form-group label="Select Seller" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
              <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="sellerlist" v-model="seller">
              </b-form-select>
            </b-form-group>
            <div v-if="Object.keys(seller).length">
              <b-card title="Seller Details" class="mb-2">
                <p class="card-text">
                  <b-row>
                    <b-col md="3"><strong> Name: {{seller.orgName}}</strong></b-col>
                    <b-col md="3"><strong>Address : {{seller.address}}</strong></b-col>
                    <b-col md="3"><strong> City : {{seller.city}} </strong></b-col>
                    <b-col md="3"><strong> Country : {{seller.country}} </strong> </b-col>
                  </b-row>
                  <b-row>
                    <!-- <b-col md="3"> <strong> Company Name : {{seller.companyName}} </strong> </b-col> -->
                    <b-col md="3"> <strong> Phone Number: {{seller.phoneNumber}}  </strong></b-col>
                    <b-col md="3">  <strong> Email : {{seller.email}} </strong></b-col>
                    <b-col md="3">  <strong> UserName : {{seller.username}} </strong>  </b-col>
                  </b-row>
                </p>
              </b-card>
            </div>
          </b-form>
          <div v-if="Object.keys(seller).length">
          <b-row>
            <b-col md="3">
            </b-col>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Add Items
                </div>
                <b-form @submit.prevent="addItem(item)" novalidate>
                  <b-form-group label="Product Name" label-for="product" :label-cols="5" :horizontal="true">
                    <b-form-input id="product" :state="!errors.has('product')"  v-validate="'required'" name="product" v-model="item.product" type="text" placeholder="Product name"></b-form-input>
                  <b-form-invalid-feedback >
                   {{errors.first('product')}}
                  </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Unit Price" label-for="unitprice" :label-cols="5" :horizontal="true">
                    <b-form-input id="unitprice" :state="!errors.has('unitprice')"   v-validate="'required'" name="unitprice" v-model="item.unitprice" type="number" placeholder="Unit Price"></b-form-input>
                  <b-form-invalid-feedback >
                   {{errors.first('unitprice')}}
                  </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group label="Quantity" label-for="quantity" :label-cols="5" :horizontal="true">
                    <b-form-input id="quantity" :state="!errors.has('quantity')"  v-validate="'required'" name="quantity" v-model="item.quantity" type="number" placeholder="Quantity"></b-form-input>
                  <b-form-invalid-feedback >
                   {{errors.first('quantity')}}
                  </b-form-invalid-feedback>
                  </b-form-group>
                  <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Add</b-button>
                    <b-button type="button"  @click="ResetForm()" size="sm"  variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
                  </div>
                </b-form>
              </b-card>
            </b-col>
          </b-row>
          <b-row>

            <b-col lg="12">
              <c-table @edit-Item="editItemTrigger" @delete-Item="deleteItem" :table-data="items" :fields="fields"
                caption="<i class='fa fa-align-justify'></i> Purchase Orders"></c-table>
              <h3 style="float:right">Total Cost : {{totalCost}} </h3>
            </b-col>

          </b-row>
          </div>
            <div slot="footer" style="text-align:center" v-if="Object.keys(seller).length">
              <b-button type="button" size="md" @click="placeOrder()" variant="primary"><i class="fa fa-dot-circle-o"></i> Place Order</b-button>
            </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import cTable from '../base/Table.vue'
  import userService from '@/services/userService.js'
  export default {
    name: 'order',
    components: {
      cTable
    },
    data() {
      return {
        selected: [],
        item: {}, // Must be an array reference!
        show: true,
        items: [],
        itemsArray: [],
        sellerListArray: [],
        sucmsg:false,
        sugmssg:'',
        errmsg:'',
        showErr:false,
        loading:false,
        seller: {},
        fields: [{
            key: 'product',
            label: 'Product',
            sortable: true
          },
          {
            key: 'unitprice',
            labe: 'Unit Price'
          },
          {
            key: 'quantity',
            label: 'Quantity'
          },
          {
            key: 'total',
            label: 'Total'
          },
          {
            key: 'Action',
            label: 'Auction'
          }
        ],
      }
    },
    methods: {
      click() {
        // do nothing
      },
      scrollToTop() {
        window.scrollTo(0,0);
      },
      ResetForm() {
        let self = this;
        self.item = {}
      },
      placeOrder () {
        let self = this;
        self.sucmsg = false;
        self.errmsg = null;
        self.showErr = false;
        if(!self.totalCost || !self.items) {
          console.log("cannot place a empty order");
          return;
        }
        if(!Object.keys(self.seller).length) {
          console.log("please select the seller");
          return;
        }
        let data = {
          totalCost :self.totalCost,
          sellerId : self.seller._id,
          items : self.items
        }
        self.loading = true;
        userService.placeOrder(data)
        .then(
          res => {
            self.scrollToTop()
            self.loading = false
            if(res.status === 200) {
              self.sucmsg = true
            }else{
                self.showErr = true;
                self.errmsg = res.message;
            }
          },
          err => {
            self.scrollToTop()
            self.loading = false
              if (err.message) {
                self.showErr = true;
                self.errmsg = err.message;
              } else {
                self.showErr = true;
                self.errmsg = 'Something Went wrong. Please try after sometime.';
              }
          }
        )
      },    
      editItemTrigger(item) {
        this.items = this.items.filter(n => {
          return n.product != item.product && n.total != item.total
        })
        this.item.product = item.product;
        this.item.unitprice = item.unitprice
        this.item.quantity = item.quantity
      },
      async addItem(item) {
        let valid = await this.$validator.validateAll()
        if(!valid) {
          return;
        }
        let newItem = JSON.parse(JSON.stringify(item))
        newItem.total = parseFloat(newItem.quantity) * parseFloat(newItem.unitprice);
        this.items.push(newItem);
      },
      deleteItem(item) {
        this.items = this.items.filter(n => {
          return n.product != item.product && n.total != item.total
        })
      },
      getSellerList() {
        let self = this;
        userService.getSellerList()
          .then(
            res => {
              console.log("success", res)
              if (res.status == 200) {
                this.sellerListArray = res.data
              }
            },
            err => {
              console.log("err", err)
            }
          )
      }
    },
    computed: {
      totalCost: function () {
        return this.items.reduce((a, b) => {
          return a + b.total
        }, 0)
      },
      sellerlist: function () {
        let sellerlist = this.sellerListArray.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
            value: n
          }
          return obj;
        });
        return sellerlist;
      }
    },
    created: function () {
      this.getSellerList()
    }
  }

</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
