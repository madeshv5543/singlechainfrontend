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

                      </div>
                      <div class="timeline-body">
                        <p>Buyer created PO<span v-if="timeline.sentToseller">, and sent to Seller </span></p>
                        <br>
                        <img class="navbar-brand-full chainlogo" :src="adhlog" alt="Adhi Logo">
                        <span v-if="timeline.sentToseller"> <a :href="timeline.buyerblockchain" target="_blank">
                            {{getChainName(timeline.buyerhost)}}</a></span>

                        <br>
                        <b-button v-if="timeline.sentToseller" type="button" size="md" variant="primary" @click="getBlockchainOrder(order.orderId)">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>

                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller</h4>

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

                </ul>
              </div>
            </div>
          </div>
        </b-card>

        <b-card>
          <b-row>

            <b-col md="3">
              <div slot="header" style="font-weight:bolder;">Remarks
                </div>

                <b-form-group >
                <label for="remark">product Review</label>
                <b-form-input type="text"  style="border-color:darkblue;"></b-form-input>
              </b-form-group>
              <b-form-group >
                <label for="remark">Delivery Review</label>
                <b-form-input type="text"  style="border-color:darkblue;"></b-form-input>
              </b-form-group>
              <!-- <b-form-group >
                <label for="remark">Remark</label>
                <b-form-input type="text"  style="border-color:darkblue;"></b-form-input>
              </b-form-group> -->
            </b-col>


            <b-col md="7" id="printpdf" style="border-style: groove;">

              <!-- <div slot="header">

                <strong>

                  purchased form
                </strong>
              </div> -->

              <b-row>
                <b-col md="8" style=" border-right:  solid ">
                  <div class="formate">

                    <div v-if="isBuyer()" slot="header">
                      <strong>Seller Details</strong>
                    </div>
                    <div v-if="!isBuyer()" slot="header">
                      <strong>Buyer Details</strong>
                    </div><br>
                    <div v-if="isBuyer() && sellerDetails">

                      <b-row>
                        <b-col md="6" style=" border-bottom:  solid ">



                          <span for="company"><strong> Name :</strong> {{sellerDetails.email}}</span><br><br>
                        </b-col>
                        <b-col md="6">
                          <span for="accountType"><strong> User Name</strong> {{sellerDetails.username}}</span><br><br>
                        </b-col>
                      </b-row>
                      <span for="firstname"><strong> Organization :</strong> {{sellerDetails.orgName}}</span><br><br>
                      <span for="phonenumber"><strong> phoneNumber</strong> {{sellerDetails.phoneNumber}}</span><br><br>

                      <span for="city"><strong> city</strong> {{sellerDetails.city}}</span><br><br>
                      <span for="pincode"><strong> Postal code</strong> {{sellerDetails.pincode}}</span><br><br>
                      <span for="Country"><strong>Country :</strong> {{sellerDetails.Country}}</span><br><br>





                    </div>


                    <div v-if="!isBuyer() && buyerDetails">

                      <b-row>
                        <b-col md="6" style=" border-bottom:  ridge;  border-right:ridge; border-top:ridge;">

                          <span for="company"><strong> Name :</strong> {{buyerDetails.email}}</span><br><br>
                        </b-col>
                        <b-col md="6" style=" border-bottom:  ridge  ;border-top:ridge ;">
                          <span for="accountType"><strong> User Name</strong> {{buyerDetails.username}}</span><br><br>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6" style=" border-bottom:  ridge ; border-right:ridge ; ">
                          <span for="firstname"><strong> Organization</strong> {{buyerDetails.orgName}}</span><br><br>
                        </b-col>
                        <b-col md="6" style=" border-bottom:  ridge  ">
                          <span for="phonenumber"><strong> phoneNumber</strong> {{buyerDetails.phoneNumber}}</span><br><br>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6" style=" border-bottom:  ridge ; border-right:ridge ; ">
                          <span for="city"><strong> State</strong> {{buyerDetails.state}}</span><br><br>
                        </b-col>
                        <b-col md="6" style=" border-bottom:  ridge  ">
                          <span for="pincode"><strong> Country</strong> {{buyerDetails.country}}</span><br><br>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6" style=" border-bottom:  ridge  ; border-right:ridge ;">
                          <span for="city"><strong> city</strong> {{buyerDetails.city}}</span><br><br>
                        </b-col>
                        <b-col md="6" style=" border-bottom:  ridge  ">
                          <span for="pincode"><strong> Postal code</strong> {{buyerDetails.pincode}}</span><br><br>
                        </b-col>
                      </b-row>








                    </div>


                    <div>

                    </div>


                  </div>
                </b-col>

                <b-col md="4" style=" border-bottom:  ridge ;font-weight:bolder; " >
                  Order Details
                  <br><br>
                 
                  <span for="company"  ><strong> Order Id</strong> {{order.orderId}}</span><br><br>
                  <span for="accountType"><strong>created Date</strong> {{createdDate}}</span><br><br>
               <span    for="firstname" ><strong> Total value:</strong> {{order.totalCost}}</span><br><br>

                </b-col>
              </b-row>



              <br>
              <b-row>


                <b-col md="12">
                  <c-table :table-data="items" :fields="fields" caption="<i class='fa fa-align-justify'></i> Purchase Orders"></c-table>
                </b-col>

                <!-- 
<b-col md="6">
Order Details
<br>
<span for="company"><strong> Order Id</strong> {{order.orderId}}</span><br><br>
                   <span for="accountType"><strong>created Date</strong> {{createdDate}}</span><br><br>
                  <span for="firstname"><strong> Total value:</strong> {{order.totalCost}}</span><br><br>

  </b-col> -->
              </b-row>
            </b-col>
            <b-col md="2">
            <div class="md-layout-item md-size-100 text-right">
                      <b-button @click="print" >Print </b-button>
                    </div> 
            </b-col>


          </b-row>

        </b-card>

      </b-col>
    </b-row>
    <div>

    </div>
    <div>
      <b-modal ref="myModalRef1" id="modal-center" centered hide-footer title="EDI formats">
        <div class="d-block text-center">
          <div>

            <div type="text" id="temp">Hashresult</div>



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
        remark: null,
        sellerDetails: {},
        buyerDetails: {},
        timeline: {},
        order: {},
        items: [],
        doc:null,
 id:null,
        UnitPrice: '',
        hfields: [{
            key: 'time',
            label: 'Created Date'
          },
          {
            key: 'owner',
            label: 'Owner'
          },
          {
            key: 'message',
            label: 'Changes',
            sortable: true
          },
        ],
        orderHistory: [],
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
      json() {



      },
       print() {
    let self = this;

          this.fromHTML($('#printpdf').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    this.save('sample-file.pdf');
  //        var app=this;
  //  let  id=this.$route.params.id;
  //     const token = window.localStorage.getItem('token')
  //     console.log('id',id)
      
  //     let self = this;
  //       self.orderId = this.$route.params.id;
  //       self.showerr = false;
  //       self.errmsg = "";
  //       userService.getOrderDetails(self.orderId)
  //         .then(
  //           res => {
  //             if (res.status != 200) {
  //               self.showerr = true;
  //               self.errmsg = res.message;
  //             } else {
  //               console.log("orserdsdd",res)
  //               self.sellerDetails = res.data.seller
  //               self.order = res.data
  //               self.items = res.data.items
  //               self.buyerDetails = res.data.buyer
  //               self.timeline = res.data.timeline
  //               self.getChanges(self.order.orderId);
  //               console.log("ordertiemline")
  //             }
  //           },
  //           err => {
  //             this.errhandler(err)
  //           }
  //         )
     
    
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
                var edi = self.order.seller.username + self.order.seller.email;
                console.log('dgsg', edi);
                self.items = res.data.items
                console.log(self.items[0].product)
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
      resentToSeller() {
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
      getChanges(orderId) {
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
                self.orderHistory = res.data.map(n => {
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
      getUsername(address) {
        let self = this;
        if (self.order.buyer.walletAddress === address) {
          return 'Buyer'
        } else {
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
          orderId: self.order.orderId,
          remark: self.remark,
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
<style>
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
