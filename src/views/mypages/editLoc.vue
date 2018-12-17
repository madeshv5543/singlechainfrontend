<template>
    <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Edit Loc</strong>
          </div>
          <b-alert v-if="sucmsg" variant="success" show>Loc Details updated Successfully.</b-alert>
          <b-alert v-if="showErr" variant="danger" show>{{errmsg}}</b-alert>
          <b-form v-if="Object.keys(locDetails).length"> 
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
                  <b-form-input type="text" id="accno" v-model="lcform.accNo"></b-form-input>
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
                  <datepicker v-model="lcform.shipmentDate" name="shipmentDate"></datepicker>
                  <!-- <b-form-input type="text" id="shipmentDate" v-model="lcform.shipmentDate"></b-form-input> -->
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Expiry Date of LC" label-for="expiryDate" :label-cols="3" :horizontal="true">
                     <datepicker v-model="lcform.expiryDate" name="expiryDate"></datepicker>
                  <!-- <b-form-input type="text" id="expiryDate" v-model="lcform.expiryDate"></b-form-input> -->
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Port of Destination" label-for="destinationPort" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="destinationPort" v-model="lcform.portOfDestination"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Port of Departure" label-for="departurePort" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="departurePort" v-model="lcform.portOfDeparture"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
               <b-col md="6">
                <b-form-group label="Select Banker" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="bankers" v-model="sellerBank">
                  </b-form-select>
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
                <b-card no-body class="mb-1" v-if="Object.keys(sellerBank).length">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion4 variant="info">Seller Bank Details</b-btn>
                  </b-card-header>
                  <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <p class="card-text">
                        <b-row>
                          <b-col md="3"><strong> Organization : {{sellerBank.orgName}}</strong></b-col>
                          <b-col md="3"><strong>Address : {{sellerBank.address}}</strong></b-col>
                          <b-col md="3"><strong> City : {{sellerBank.city}} </strong></b-col>
                          <b-col md="3"><strong> Country : {{sellerBank.country}} </strong> </b-col>
                        </b-row>
                        <b-row>
                          <!-- <b-col md="3"> <strong> Company Name : {{sellerDetails.companyName}} </strong> </b-col> -->
                          <b-col md="3"> <strong> Phone Number: {{sellerBank.phoneNumber}} </strong></b-col>
                          <b-col md="3"> <strong> Email : {{sellerBank.email}} </strong></b-col>
                          <b-col md="3"> <strong> UserName : {{sellerBank.username}} </strong> </b-col>
                        </b-row>
                      </p>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-form>
          <div slot="footer" style="text-align:center" v-if="Object.keys(lcform).length">
            <b-button type="button" size="md" @click="updateLoc()" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Update LOC</b-button>
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
    name:'editLoc',
    components: {
        cTable
    },
    data : () => {
        return {
            lcform:{},
            locId:null,
            locDetails:{},
            orderArray: [],
            bankerListArray : [],
            order:{},
            banker: {},
            sellerBank:{},
            loading: false,
            sucmsg: false
        }
    },
    methods: {
        updateLoc() {
            let self = this;
            let data = {
            order : self.order._id,
            banker : self.banker._id,
            seller : self.order.seller._id,
            buyer : self.order.buyer._id,
            sellerBank : self.sellerBank._id,
            ...self.lcform
            }
            self.sucmsg = false;
            self.errmsg = null;
            self.showErr = false;
            self.loading = true;
            userService.updateLoc(self.locId,data)
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
        getLocDetails () {
            let self = this;
            self.locId = self.$route.params.id
            self.sucmsg = false;
            self.errmsg = null;
            self.showErr = false;
            userService.getLocDetails(self.locId)
            .then(
                res => {
                    self.scrollToTop()
                    if(res.status === 200) {
                        self.locDetails = res.data
                        self.setLocDetails()
                    }else{
                        self.showErr = true;
                        self.errmsg = res.message;
                    }
                },
                err => {
                    this.errhandler(err)
                }
            )
        },
        getfullDetails(sarray, item) {
           return sarray.find((n) => {
                return n._id === item
            })
        },
        setLocDetails() {
            let self = this;
            if(Object.keys(self.locDetails).length) {
                const { order, banker, accNo, goodsValue, shipmentDate, expiryDate, portOfDestination, portOfDeparture, seller, sellerBank, buyer} = self.locDetails;
               self.banker = self.getfullDetails(self.bankerListArray, banker._id);
               self.order =self.getfullDetails(self.orderArray, order);
               self.sellerBank = self.getfullDetails(self.bankerListArray, sellerBank._id)
               self.lcform ={
                   accNo,
                   shipmentDate,
                   expiryDate,
                   portOfDestination,
                   portOfDeparture,
                   goodsValue
               }
            }
        },
        scrollToTop() {
            window.scrollTo(0,0);
        },
        errhandler : err => {
            let self = this;
            self.loading = false
            self.scrollToTop()
            if (err.message) {
              self.showErr = true;
              self.errmsg = err.message;
            } else {
              self.showErr = true;
              self.errmsg = 'Something Went wrong. Please try after sometime.';
            }
        },
        getBankers() {
            let self = this;
            userService.getBankerlist()
            .then(
                res => {
                if (res.status == 200) {
                    this.bankerListArray = res.data
                }
                },
                err => {
                    this.bankerListArray = []
                }
            )
        },
        getOrders() {
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
                this.orderArray = []
                }
            )
        }
    },
    computed: {
        sellerDetails: function () {
            if (this.order.seller) {
            return this.order.seller
            } else {
            return {}
            }
        },
        orderlist: function () {
            let list = this.orderArray.map(n => {
            let obj = {
                text: `${n.orderId}`,
                value: n
            }
            return obj;
            });
            return list;
       },
        bankers: function () {
            let list = this.bankerListArray.map(n => {
            let obj = {
                text: `${n.username} - ${n.email}`,
                value: n
            }
            return obj;
            });
            return list;
        },
    },
    created: function initFunction() {
        this.getOrders()
        this.getBankers()
        this.getLocDetails()
    }
}
</script>
<style>

</style>

