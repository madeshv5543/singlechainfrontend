<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Order Timeline</strong>
          </div>
          <b-alert v-if="succesmsg" variant="success" show>Order Details updated Successfully.</b-alert>
          <b-alert v-if="showerr" variant="danger" show>{{errmsg}}</b-alert>
          <div class="row">
            <div class="col-md-12">
              <div class="page-header">
              </div>
              <div style="display:inline-block;width:100%;">
                <ul class="timeline timeline-horizontal">
                  <li class="timeline-item">
                    <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Buyer</h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p>Buyer created PO<span v-if="timeline.sentToseller">, and sent to Seller </span></p>
                        <br>
                        <img class="navbar-brand-full chainlogo" :src="adhlog" alt="Adhi Logo">
                        <span v-if="timeline.sentToseller"> <a :href="timeline.buyerblockchain" target="_blank">
                            {{getChainName(timeline.buyerhost)}}</a></span>
                        <!-- <b-button   type="button" size="md" variant="primary"><a class="linwh"
                            :href="timeline.buyerblockchain" target="_blank"><i class="fa fa-info"></i> View on
                            blockchain</a></b-button> -->
                        <br>
                        <b-button v-if="timeline.sentToseller" type="button" size="md" variant="primary" @click="getBlockchainOrder(order.orderId)">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <!-- <li class="timeline-item">
                    <div class="timeline-badge info"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Buyer Bank</h4>
                      </div>
                      <div class="timeline-body">
                        <p>To be done</p>
                        <br>
                        <img class="navbar-brand-full chainlogo" :src="quolog" alt="quorum Logo">
                        <span> <a> Quorum</a></span>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller Bank</h4>
                      </div>
                      <div class="timeline-body">
                        <p>To be done</p>
                        <br>
                        <img class="navbar-brand-full chainlogo" :src="hyblog" alt="hyberledger Logo">
                        <span> <a> Hyberledger</a></span>
                      </div>
                    </div>
                  </li> -->
                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller</h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.sellerConfirm">Pending</p>
                        <p v-if="timeline.sellerConfirm">Seller received the PO</p>
                        <br>
                        <img class="navbar-brand-full chainlogo" :src="ethlog" alt="ethereum Logo">
                        <span v-if="timeline.sellerConfirm"> <a :href="timeline.sellerblockchain" target="_blank">
                            {{getChainName(timeline.sellerhost)}}</a></span>
                        <br>
                        <b-button v-if="timeline.sellerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder(order.orderId)">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <!-- <li class="timeline-item">
							<div class="timeline-badge warning"><i class="glyphicon glyphicon-check"></i></div>
							<div class="timeline-panel">
								<div class="timeline-heading">
									<h4 class="timeline-title">Mussum ipsum cacilds 5</h4>
									<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p>
								</div>
								<div class="timeline-body">
									<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis.</p>
								</div>
							</div>
						</li> -->
                  <!-- <li class="timeline-item">
							<div class="timeline-badge"><i class="glyphicon glyphicon-check"></i></div>
							<div class="timeline-panel">
								<div class="timeline-heading">
									<h4 class="timeline-title">Mussum ipsum cacilds 6</h4>
									<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p>
								</div>
								<div class="timeline-body">
									<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis.</p>
								</div>
							</div>
						</li> -->
                </ul>
              </div>
            </div>
          </div>
        </b-card>
        <b-card>
          <div v-if="isBuyer()" slot="header">
            <strong>Seller Details</strong>
          </div>
          <div v-if="!isBuyer()" slot="header">
            <strong>Buyer Details</strong>
          </div>
          <b-row v-if="isBuyer() && sellerDetails">
            <b-col md="6">
              <b-form-group>
                <label for="company">Name</label>
                <b-form-input type="text" id="company" v-model="sellerDetails.email" disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="accountType">User Name</label>
                <b-form-input type="text" id="accountType" v-model="sellerDetails.username" disabled></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="!isBuyer() && buyerDetails">
            <b-col md="6">
              <b-form-group>
                <label for="company">Name</label>
                <b-form-input type="text" id="company" v-model="buyerDetails.email" disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="accountType">User Name</label>
                <b-form-input type="text" id="accountType" v-model="buyerDetails.username" disabled></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="firstname">Organization</label>
                <b-form-input type="text" id="firstname" name="firstname" disabled v-model="sellerDetails.orgName"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="phonenumber">Phone Number</label>
                <b-form-input type="text" id="phonenumber" disabled v-model="sellerDetails.phoneNumber"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="address">Address</label>
                <b-form-input type="text" id="address" name="address" disabled v-model="sellerDetails.address"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="city">City</label>
                <b-form-input type="text" id="city" name="city" disabled v-model="sellerDetails.city"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="pincode">Postal code</label>
                <b-form-input type="text" id="pincode" name="pincode" disabled v-model="sellerDetails.pincode"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <label for="country">Country</label>
                <b-form-input type="text" id="country" name="country" disabled v-model="buyerDetails.country"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-col md="6">
              <b-form-group>
                <label for="companyName">Company Name</label>
                <b-form-input type="text" id="companyName" disabled v-model="buyerDetails.companyName"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6">

            </b-col>
          </b-row> -->
          <!-- <div slot="footer" style="text-align:center">
              <b-button type="submit" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            </div> -->
        </b-card>
        <b-card>
          <div slot="header">
            <strong>Order Details</strong>
          </div>
          <b-row>
            <b-col md="4">
              <b-form-group>
                <label for="phonenumber">Order Id</label>
                <b-form-input type="text" id="phonenumber" disabled v-model="order.orderId"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group v-if="createdDate">
                <label for="phonenumber">created Date</label>
                <b-form-input type="text" id="phonenumber" disabled v-model="createdDate"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group v-if="createdDate">
                <label for="phonenumber">Total value</label>
                <b-form-input type="text" id="phonenumber" disabled v-model="order.totalCost"></b-form-input>
              </b-form-group>
            </b-col>
            
          </b-row>

          <b-row>
            <b-col md="6">
              <c-table :table-data="items" :fields="fields" caption="<i class='fa fa-align-justify'></i> Purchase Orders"></c-table>
            </b-col>
            <!-- <b-col  md="6" v-if="orderHistory.length">
              <c-table :table-data="orderHistory" :fields="hfields" caption="<i class='fa fa-align-justify'></i>  Order Histroy"></c-table>
            </b-col> -->
          </b-row>
          <b-row v-if="!isBuyer() && order.status !== 'Completed' && order.status !== 'Return' ">
            <b-col md="12">
            <b-form-group label="Remarks" label-for="remark" :label-cols="5" :horizontal="true">
              <b-form-input id="remark" name="remark" v-model="remark" type="text" placeholder="Remarks"></b-form-input>
            </b-form-group> 
            </b-col>
          </b-row>
          <b-row v-if="isBuyer() && order.status === 'Return' ">
            <b-col md="12">
            <b-form-group label="Remarks" label-for="remark" :label-cols="5" :horizontal="true">
              <b-form-input id="remark" name="remark" v-model="remark" type="text" placeholder="Remarks"></b-form-input>
            </b-form-group> 
            </b-col>
          </b-row>
        <span  slot="footer" style="text-align:center">
            <b-button type="button" @click="jason" size="md" variant="primary"><i class="fa fa-eye"></i>
           JSON   </b-button>&emsp;&emsp;
          </span>
          <span slot="footer" style="text-align:center">
            <b-button type="button" @click="edidetails()" size="md" variant="primary"><i class="fa fa-eye"></i>
             EDI</b-button>&emsp;&emsp;
          </span>
        
          <span v-if="isBuyer() && order.status === 'Pending'" slot="footer" style="text-align:center">
            <b-button type="button" @click="sentToSeller()" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Send To Seller</b-button>
          </span>
          <div v-if="isBuyer() && order.status === 'Return'" slot="footer" style="text-align:center">
            <b-button type="button" @click="resentToSeller()" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Send To Seller</b-button>
          </div>
          <div v-if="!isBuyer() && order.status !== 'Completed'  && order.status !== 'Return' " slot="footer" style="text-align:center">
            <b-button type="button" @click="sellerConfirm('Approve')" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Approve</b-button>
                 <b-button type="button" @click="sellerConfirm('Reject')" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Return</b-button>
          </div>
          <!-- <b-row>
            <div>
             <b-button type="button" size="md" variant="primary" @click="getChanges(order.orderId)" ><i class="fa fa-dot-circle-o"></i>
              View </b-button>
            </div>
          </b-row> -->
        </b-card>
      </b-col>
    </b-row>
    <div>
      <!-- <b-modal ref="myModalRef" id="modal-center" centered hide-footer title="Order Details">
        <tree-view :data="blochainData" :options="viewerOprions"></tree-view>
      </b-modal>
      <b-modal ref="historyModalRef" id="modal-center" centered hide-footer title="Order History">
        <div v-for="item in orderHistory" :key="item.time">
          <p> {{item.message}}</p>
          <p> Time : {{item.time }} </p>
          <p> Owner : {{item.owner}}</p>
        </div>
      </b-modal> -->
    </div>
     <div>
    <b-modal ref="myModalRef1" id="modal-center" centered  hide-footer title="EDI formats">
      <div class="d-block text-center">
         <div   >
           
          <div type="text" id="temp"    >Hashresult</div>
          
   
         
        </div>
      
      </div>
     
    </b-modal>
  </div>
  </div>
</template>

<script>
  import userService from '@/services/userService.js';
  import utils from '@/services/utils.js';
  import cTable from '../base/Table.vue'
  export default {
    name: 'profile',
    components: {
      cTable
    },
    data() {
      return {
        user: {},
        viewerOprions: {
          rootObjectKey: "Order"
        },
        orderId: null,
        remark:null,
        sellerDetails: {},
        buyerDetails: {},
        timeline: {},
        order: {},
        items: [],
      
        UnitPrice:'',
        hfields:[
          {key: 'time', label:'Created Date'},
          {key: 'owner', label: 'Owner'},
          {key: 'message', label: 'Changes', sortable: true},
        ],
        orderHistory:[],
        blochainData: {},
        loading: false,
        showerr: false,
        errmsg: null,
         item: {}, // Must be an array reference!
        show: true,
        items: [],
        itemsArray: [],
        succesmsg: false,
        succmsg: '',
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
        ],
      }
    },
    props: {
      ethlog: {
        type: String,
        default: require('@/assets/chain/etherum.png')
      },
      adhlog: {
        type: String,
        default: require('@/assets/chain/adhi.png')
      },
      quolog: {
        type: String,
        default: require('@/assets/chain/quorem.jpg')
      },
      hyblog: {
        type: String,
        default: require('@/assets/chain/hyberledger.png')
      }
    },
    methods: {
      json(){

        

      },


      edidetails() {
        let self = this;
        self.ediId = this.$route.params.id;
        self.showerr = false;
        self.errmsg = "";
        userService.getEdiDetails(self.ediId)
          .then(
            res => {
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
            //      var resultStr;
            // var seperator = '*';
            // var newLine = "\n";
            // // seller=Order.orderId;
            // // var items =" ";
            // // var i;
            // // for ( i=0;i<items.length;i++){
            // //     item += items[i]
            // // }
        
            // resultStr =  "ISA" + seperator + order.seller.email + seperator + newLine + "NI" + seperator + "SO" + order.seller.username + seperator + newLine + "N3" + seperator + order.totalCost +seperator  + newLine + "N3" + seperator +  order.orderId +seperator  + newLine + order.createdDate +seperator + newLine+  "N3" + seperator + order.items[0].product +seperator  + newLine  + newLine+  "N3" + seperator + order.items[0].quantity +seperator  + newLine  + newLine+  "N3" + seperator + order.items[0].total +seperator  + newLine   + newLine+  "N3" + seperator + order.items[0].unitprice +seperator  + newLine ;
            //   // resultStr =  "ISA" + seperator + order.seller.username + seperator + newLine;
            // console.log( 'hlo', 
            // resultStr)
                self.sellerDetails = res.data.seller
                self.order = res.data
                console.log(self.order.seller.username)
                   console.log(self.order.seller.email)
                      // console.log(self.order.seller.username)
var edi=self.order.seller.username   +  self.order.seller.email;
console.log('dgsg'  ,edi);
                self.items = res.data.items
              console.log (self.items[0].product)
                 console.log(self.items[0].quantity)
                  console.log(self.items[0].total)
                   console.log(self.items[0].unitprice)
                self.buyerDetails = res.data.buyer
                console.log(self.buyerDetails.email)
                                console.log(self.buyerDetails.username)

                self.timeline = res.data.timeline
                // self.getChanges(self.edi.ediId);
                  // res.json({})
            

              }
            
            },
            err => {
              this.errhandler(err)
            }
      
      
      )

       this.showModal()  
      },

//       edi(user){
// let self =this;
//    self.getediDetails()
        
//   // this.itemdelete = user;
//      this.showModal()  
//     //  self.items = res.data.items
  
//       },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
      showHisModal() {
        this.$refs.historyModalRef1.show()
      },
      hideHisModal() {
        this.$refs.historyModalRef.hide()
      },
      showModal() {
        this.$refs.myModalRef1.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
      resentToSeller(){
        let self = this;
        self.loading = true;
        self.showerr = false;
        self.succesmsg = false;
        let data = {
         remark: self.remark
        }
        userService.resentToseller(self.orderId, data)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.getOrderDetails()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      sentToSeller() {
        let self = this;
        self.loading = true;
        self.showerr = false;
        self.succesmsg = false;
        userService.sentToseller(self.orderId)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.getOrderDetails()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      getChanges(orderId){
        let self = this;
        userService.getOrderHistory(orderId)
        .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.orderHistory = res.data.map( n => {
                    let obj = {
                      time: n.time,
                      owner: self.getUsername(n.owner),
                      message: n.message
                    }
                    return obj;
                  });
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
        )
      },
      getUsername(address){
        let self = this;
        if(self.order.buyer.walletAddress === address){
          return 'Buyer'
        }else {
          return 'Seller'
        }
      },
      getBlockchainOrder() {
        let self = this;
        self.loading = true;
        self.showerr = false;
        self.blochainData = {};
        userService.getBlockchainOrder(self.order.orderId)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.blochainData = res.data;
                // self.showModal()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      getBlockchainData(host, contract) {
        let self = this;
        self.loading = true;
        self.showerr = false;
        let data = {
          host,
          contract,
          orderId: self.order.orderId
        }
        self.blochainData = {};
        userService.getDataFromBlochain(data)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.blochainData = JSON.parse(res.data);
                // self.showModal()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      sellerConfirm(action) {
        let self = this;
        self.loading = true;
        self.showerr = false;
        self.succesmsg = false
        let data = {
          orderId : self.order.orderId,
          remark : self.remark,
          action: action
        }
        userService.SellerConfirm(data, self.orderId)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.getOrderDetails()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      errhandler(err) {
        let self = this;
        if (err.message) {
          self.showerr = true;
          self.errmsg = err.message;
        } else {
          self.showerr = true;
          self.errmsg = 'Something Went wrong. Please try after sometime.';
        }
      },
        getEdiDetails() {
        let self = this;
        self.ediId = this.$route.params.id;
        self.showerr = false;
        self.errmsg = "";
        userService.getEdiDetails(self.ediId)
          .then(
            res => {
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.sellerDetails = res.data.seller
                self.order = res.data
                self.items = res.data.items
                self.buyerDetails = res.data.buyer
                self.timeline = res.data.timeline
                self.getChanges(self.order.orderId);
              }
            },
            err => {
              this.errhandler(err)
            }
          )
      },
      getOrderDetails() {
        let self = this;
        self.orderId = this.$route.params.id;
        self.showerr = false;
        self.errmsg = "";
        userService.getOrderDetails(self.orderId)
          .then(
            res => {
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.sellerDetails = res.data.seller
                self.order = res.data
                self.items = res.data.items
                self.buyerDetails = res.data.buyer
                self.timeline = res.data.timeline
                self.getChanges(self.order.orderId);
              }
            },
            err => {
              this.errhandler(err)
            }
          )
      },
      getChainName(url) {
        return utils.getChainName(url)
      },
      isBuyer() {
        return utils.isBuyer()
      }
    },
    computed: {
      createdDate() {
        if (this.order && this.order.createdDate) {
          return this.$moment(this.order.createdDate).format("DD-MM-YYYY")
        } else {
          return null
        }
      }
    },
    created: function () {
      this.getOrderDetails()
      this.getEdiDetails()
    }
  }

</script>
<style >
  .chainlogo {
    float: right;
    width: 100px;
    height: 100px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* Timeline */
  .timeline,
  .timeline-horizontal {
    list-style: none;
    padding: 20px;
    position: relative;
  }

  .timeline:before {
    top: 40px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: #eeeeee;
    left: 50%;
    margin-left: -1.5px;
  }

  .timeline .timeline-item {
    margin-bottom: 20px;
    position: relative;
  }

  .timeline .timeline-item:before,
  .timeline .timeline-item:after {
    content: "";
    display: table;
  }

  .timeline .timeline-item:after {
    clear: both;
  }

  .timeline .timeline-item .timeline-badge {
    color: #fff;
    width: 54px;
    height: 54px;
    line-height: 52px;
    font-size: 22px;
    text-align: center;
    position: absolute;
    top: 18px;
    left: 50%;
    margin-left: -25px;
    background-color: #7c7c7c;
    border: 3px solid #ffffff;
    z-index: 100;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .timeline .timeline-item .timeline-badge i,
  .timeline .timeline-item .timeline-badge .fa,
  .timeline .timeline-item .timeline-badge .glyphicon {
    top: 2px;
    left: 0px;
  }

  .timeline .timeline-item .timeline-badge.primary {
    background-color: #1f9eba;
  }

  .timeline .timeline-item .timeline-badge.info {
    background-color: #5bc0de;
  }

  .timeline .timeline-item .timeline-badge.success {
    background-color: #59ba1f;
  }

  .timeline .timeline-item .timeline-badge.warning {
    background-color: #d1bd10;
  }

  .timeline .timeline-item .timeline-badge.danger {
    background-color: #ba1f1f;
  }

  .timeline .timeline-item .timeline-panel {
    position: relative;
    width: 46%;
    float: left;
    right: 16px;
    border: 1px solid #c0c0c0;
    background: #ffffff;
    border-radius: 2px;
    padding: 20px;
    -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  }

  .timeline .timeline-item .timeline-panel:before {
    position: absolute;
    top: 26px;
    right: -16px;
    display: inline-block;
    border-top: 16px solid transparent;
    border-left: 16px solid #c0c0c0;
    border-right: 0 solid #c0c0c0;
    border-bottom: 16px solid transparent;
    content: " ";
  }

  .timeline .timeline-item .timeline-panel .timeline-title {
    margin-top: 0;
    color: inherit;
  }

  .timeline .timeline-item .timeline-panel .timeline-body>p,
  .timeline .timeline-item .timeline-panel .timeline-body>ul {
    margin-bottom: 0;
  }

  .timeline .timeline-item .timeline-panel .timeline-body>p+p {
    margin-top: 5px;
  }

  .timeline .timeline-item:last-child:nth-child(even) {
    float: right;
  }

  .timeline .timeline-item:nth-child(even) .timeline-panel {
    float: right;
    left: 16px;
  }

  .timeline .timeline-item:nth-child(even) .timeline-panel:before {
    border-left-width: 0;
    border-right-width: 14px;
    left: -14px;
    right: auto;
  }

  .timeline-horizontal {
    list-style: none;
    position: relative;
    padding: 20px 0px 20px 0px;
    display: inline-block;
  }

  .timeline-horizontal:before {
    height: 3px;
    top: auto;
    bottom: 26px;
    left: 56px;
    right: 0;
    width: 100%;
    margin-bottom: 20px;
  }

  .timeline-horizontal .timeline-item {
    display: table-cell;
    height: 280px;
    width: 20%;
    min-width: 320px;
    float: none !important;
    padding-left: 0px;
    padding-right: 20px;
    margin: 0 auto;
    vertical-align: bottom;
  }

  .timeline-horizontal .timeline-item .timeline-panel {
    top: auto;
    bottom: 64px;
    display: inline-block;
    float: none !important;
    left: 0 !important;
    right: 0 !important;
    width: 100%;
    margin-bottom: 20px;
  }

  .timeline-horizontal .timeline-item .timeline-panel:before {
    top: auto;
    bottom: -16px;
    left: 28px !important;
    right: auto;
    border-right: 16px solid transparent !important;
    border-top: 16px solid #c0c0c0 !important;
    border-bottom: 0 solid #c0c0c0 !important;
    border-left: 16px solid transparent !important;
  }

  .timeline-horizontal .timeline-item:before,
  .timeline-horizontal .timeline-item:after {
    display: none;
  }

  .timeline-horizontal .timeline-item .timeline-badge {
    top: auto;
    bottom: 0px;
    left: 43px;
  }

  .linwh {
    color: white;
  }

</style>
