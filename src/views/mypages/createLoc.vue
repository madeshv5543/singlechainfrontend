<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>New Letter Of Credit</strong>
          </div>
          <b-alert v-if="sucmsg" variant="success" show>Request For New LC Created Successfully.</b-alert>
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
                <b-form-group label="Select Buyer Bank" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
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
                <b-form-group label="Select Seller Bank" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="bankers"   v-model="sellerBank">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                       <b-form-file v-model="file"  @change="uploadFieldChange" multiple :state="Boolean(file)" placeholder="Additional Documents"></b-form-file>
                </b-form-group>
              </b-col>
                <!-- <div class="col-md-12">
                    <div class="attachment-holder animated fadeIn" v-cloak v-for="(attachment, index) in attachments" :key="index"> 
                        <span class="label label-primary">{{ attachment.name + ' (' + Number((attachment.size / 1024 / 1024).toFixed(1)) + 'MB)'}}</span> 
                        <span class="" style="background: red; cursor: pointer;" ><button class="btn btn-xs btn-danger">Remove</button></span>
                    </div>
                </div> -->
            </b-row>
                <hr>
              <div class="searchable-container">
                <b-row>
                  <!-- <b-col md="12"> -->
                  <b-col md="4" class="items" v-cloak v-for="(attachment, index) in attachments" :key="index">
                    <div class="info-block block-info clearfix">
                        <div class="square-box pull-left">
                            <span class="fa fa-tags"></span>
                        </div>
                        <div data-toggle="buttons" class="btn-group bizmoduleselect">
                            <label class="btn btn-default">
                                <div class="bizcontent">
                                    <span @click="removeAttachment(attachment)" class="fa fa-minus-circle"></span>
                                    <h5>{{ attachment.name + ' (' + Number((attachment.size / 1024 / 1024).toFixed(1)) + 'MB)'}}</h5>
                                    
                                </div>
                            </label>
                        </div>
                    </div>
                </b-col>
                  <!-- </b-col> -->
                </b-row>
              </div>
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
                    <b-btn block href="#" v-b-toggle.accordion3 variant="info">Buyer Bank Details</b-btn>
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
        lcform: {},
        selected: [],
        file:null, 
        item: {}, // Must be an array reference!
        show: true,
        accNo: '',
        items: [],
        itemsArray: [],
        sellerListArray: [],
        bankerListArray: [],
        refBankArray : [],
        orderArray: [],
        attachments:[],
        sucmsg: false,
        sugmssg: '',
        errmsg: '',
        showErr: false,
        loading: false,
        order: {},
        banker: {},
        sellerBank: {},
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
      removeAttachment(attachment) {   
          this.attachments.splice(this.attachments.indexOf(attachment), 1);
      },
      uploadFieldChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          for (var i = files.length - 1; i >= 0; i--) {
              this.attachments.push(files[i]);
          }
          console.log("files", this.attachments)
      },
      placeOrder() {
        let self = this;
        console.log("file", this.file)
        if(this.sellerBank._id == this.banker._id) {
          self.errmsg = "Buyer bank and seller bank should not be same";
          self.showErr = true;
          return
        } 
        let data = new FormData();
        data.append('order', self.order._id)
        data.append('banker', self.banker._id)
        data.append('seller', self.order.seller._id)
        data.append('buyer', self.order.buyer._id)
        data.append('sellerBank', self.sellerBank._id)
        data.append('accNo', self.lcform.accNo)
        data.append('goodsValue', self.lcform.goodsValue)
        data.append('shipmentDate', self.lcform.shipmentDate)
        data.append('expiryDate', self.lcform.expiryDate)
        data.append('portOfDestination', self.lcform.portOfDestination)
        data.append('portOfDeparture', self.lcform.portOfDeparture)
        for(let i=0; i< self.attachments.length; i++){
          data.append('file'+1, self.attachments[i])
        }
        // data.append('file', self.file)
        // let data = {
        //   order : self.order._id,
        //   banker : self.banker._id,
        //   seller : self.order.seller._id,
        //   buyer : self.order.buyer._id,
        //   sellerBank : self.sellerBank._id,
        //   ...self.lcform
        // }
        self.sucmsg = false;
        self.errmsg = null;
        self.showErr = false;
        self.loading = true;
        userService.placeLoc(data)
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
      getBankerList() {
        let self = this;
        userService.getBankerlist()
          .then(
            res => {
              if (res.status == 200) {
                this.bankerListArray = res.data
                this.refBankArray = res.data
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
        let sellerlist = this.bankerListArray.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
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

.searchable-container{margin:20px 0 0 0}
.searchable-container label.btn-default.active{background-color:#007ba7;color:#FFF}
.searchable-container label.btn-default{border:1px solid #efefef;margin:5px; box-shadow:5px 8px 8px 0 #ccc;}
.searchable-container label .bizcontent{width:100%;}
.searchable-container .btn-group{width:90%}
.searchable-container .btn span.fa{
    opacity: 1;
}
.searchable-container .btn.active span.fa {
    opacity: 1;
}

</style>
