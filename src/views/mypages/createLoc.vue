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
            <b-row>
              <b-col md="6">
                <b-form-group label="Select order" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="orderlist" v-model="order">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Select Banker" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="bankers" v-model="banker">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-form-group label="Acc. No" label-for="accno" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="accno" v-model="lcform.accno"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Goods Value" label-for="goodsValue" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="goodsValue" v-model="lcform.goodsValue"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Shipment Date" label-for="shipmentDate" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="shipmentDate" v-model="lcform.shipmentDate"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Expiry Date of LC" label-for="expiryDate" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="expiryDate" v-model="lcform.expiryDate"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Port of Destination" label-for="destinationPort" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="destinationPort" v-model="lcform.destinationPort"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Port of Departure" label-for="departurePort" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="departurePort" v-model="lcform.departurePort"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="Object.keys(order).length">
              <div role="tablist">
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion1 variant="info">Seller Details</b-btn>
                  </b-card-header>
                  <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <p class="card-text">
                        <b-row>
                          <b-col md="3"><strong> Organization : {{sellerDetails.orgName}}</strong></b-col>
                          <b-col md="3"><strong>Address : {{sellerDetails.address}}</strong></b-col>
                          <b-col md="3"><strong> City : {{sellerDetails.city}} </strong></b-col>
                          <b-col md="3"><strong> Country : {{sellerDetails.country}} </strong> </b-col>
                        </b-row>
                        <b-row>
                          <!-- <b-col md="3"> <strong> Company Name : {{sellerDetails.companyName}} </strong> </b-col> -->
                          <b-col md="3"> <strong> Phone Number: {{sellerDetails.phoneNumber}} </strong></b-col>
                          <b-col md="3"> <strong> Email : {{sellerDetails.email}} </strong></b-col>
                          <b-col md="3"> <strong> UserName : {{sellerDetails.username}} </strong> </b-col>
                        </b-row>
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion2 variant="info">Order Details</b-btn>
                  </b-card-header>
                  <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <p class="card-text">
                        <b-row>
                          <b-col md="4"><strong> Order Id: {{order.orderId}}</strong></b-col>
                          <b-col md="4"><strong>Created Date : {{order.createdDate | moment("DD-MM-YYYY")}}</strong></b-col>
                          <b-col md="4"><strong> TotalCost : {{order.totalCost}} </strong></b-col>
                        </b-row>
                        <br>
                        <b-row>
                          <b-col lg="12" md="12">
                            <c-table :table-data="order.items" :fields="fields" caption="<i class='fa fa-align-justify'></i> Purchase Orders"></c-table>
                          </b-col>
                        </b-row>
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1" v-if="Object.keys(banker).length">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion3 variant="info">Banker Details</b-btn>
                  </b-card-header>
                  <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <p class="card-text">
                        <b-row>
                          <b-col md="3"><strong> Organization : {{banker.orgName}}</strong></b-col>
                          <b-col md="3"><strong>Address : {{banker.address}}</strong></b-col>
                          <b-col md="3"><strong> City : {{banker.city}} </strong></b-col>
                          <b-col md="3"><strong> Country : {{banker.country}} </strong> </b-col>
                        </b-row>
                        <b-row>
                          <!-- <b-col md="3"> <strong> Company Name : {{sellerDetails.companyName}} </strong> </b-col> -->
                          <b-col md="3"> <strong> Phone Number: {{banker.phoneNumber}} </strong></b-col>
                          <b-col md="3"> <strong> Email : {{banker.email}} </strong></b-col>
                          <b-col md="3"> <strong> UserName : {{banker.username}} </strong> </b-col>
                        </b-row>
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-form>

          <div slot="footer" style="text-align:center" v-if="Object.keys(order).length">
            <b-button type="button" size="md" @click="placeOrder()" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Request LC</b-button>
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
    name: 'letterofcredit',
    components: {
      cTable
    },
    data() {
      return {
        selected: [],
        item: {}, // Must be an array reference!
        show: true,
        accNo: '',
        items: [],
        itemsArray: [],
        sellerListArray: [],
        bankerListArray: [],
        orderArray: [],
        lcform: {},
        sucmsg: false,
        sugmssg: '',
        errmsg: '',
        showErr: false,
        loading: false,
        order: {},
        banker: {},
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
          }
        ]
      }
    },
    methods: {
      click() {
        // do nothing
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
      ResetForm() {
        let self = this;
        self.item = {}
      },
      placeOrder() {
        let self = this;
        self.sucmsg = false;
        self.errmsg = null;
        self.showErr = false;
        if (!self.totalCost || !self.items) {
          console.log("cannot place a empty order");
          return;
        }
        if (!Object.keys(self.order).length) {
          console.log("please select the seller");
          return;
        }
        let data = {
          totalCost: self.totalCost,
          sellerId: self.seller._id,
          items: self.items
        }
        self.loading = true;
        userService.placeOrder(data)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false
              if (res.status === 200) {
                self.sucmsg = true
              } else {
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
        if (!valid) {
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
      getBankerList() {
        let self = this;
        userService.getBankerlist()
          .then(
            res => {
              if (res.status == 200) {
                this.bankerListArray = res.data
              }
            },
            err => {
              console.log("err", err)
            }
          )
      },
      getOrderList() {
        let self = this;
        userService.getCompletedOrderlist()
          .then(
            res => {
              console.log("success", res)
              if (res.status == 200) {
                this.orderArray = res.data
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
      sellerDetails: function () {
        if (this.order.seller) {
          return this.order.seller
        } else {
          return {}
        }
      },
      orderlist: function () {
        console.log("order", this.orderArray)
        let sellerlist = this.orderArray.map(n => {
          let obj = {
            text: `${n.orderId}`,
            value: n
          }
          return obj;
        });
        return sellerlist;
      },
      bankers: function () {
        console.log("this bamk", this.bankerListArray)
        let sellerlist = this.bankerListArray.map(n => {
          let obj = {
            text: `${n.firstName} - ${n.lastName}`,
            value: n
          }
          return obj;
        });
        return sellerlist;
      },
    },
    created: function () {
      this.getOrderList();
      this.getBankerList()
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
