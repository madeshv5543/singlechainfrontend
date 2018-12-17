<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>New Bill Of lading</strong>
          </div>
          <b-alert v-if="sucmsg" variant="success" show>Request For New BOl Created Successfully.</b-alert>
          <b-alert v-if="showErr" variant="danger" show>{{errMsg}}</b-alert>
          <b-form>
            <b-row>
              <b-col md="6">
                <b-form-group label="Select Purchase Order" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="orderlist" v-model="purchaseOrder">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Select Shipment Type" label-for="shipmentType" :label-cols="3" :horizontal="true">
                  <b-form-select id="shipmentType" size="lg" :plain="true" :options="ShipmentTypes" v-model="bol.shipmentType">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Shipment Date" label-for="shipmentDate" :label-cols="3" :horizontal="true">
                  <!-- <b-form-input type="text" id="shipmentDate" v-model="bol.shipmentDate"></b-form-input> -->
                  <datepicker v-model="bol.shipmentDate" name="shipmentDate"></datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Notes" label-for="shipmentDate" :label-cols="3" :horizontal="true">
                  <b-form-textarea id="notes" v-model="bol.notes" placeholder="" :rows="3" :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Shipper" label-for="shipper" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="shipper" disabled :value="shipper"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Receiver " label-for="receiver" :label-cols="3" :horizontal="true">
                  <b-form-input type="text" id="receiver" disabled :value="receiver"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
            <div slot="footer" style="text-align:center" v-if="Object.keys(bol).length">
              <b-button type="button" size="md" @click="placeOrder()" variant="primary"><i class="fa fa-dot-circle-o"></i>
                Request BOL</b-button>
            </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import userService from '@/services/userService.js'
  export default {
    name: 'CreateBol',
    data: () => {
      return {
        loading: false,
        sucmsg: false,
        showErr: false,
        errMsg: null,
        poListArray: [],
        bol: {},
        purchaseOrder: {},
        ShipmentTypes: ['INTERNATIONAL SHIPPING', 'INTERMODAL RAIL FREIGHT', 'AIR FREIGHT'],
        shipmentType: null
      }
    },
    methods: {
      getPoList: function () {
        let self = this;
        self.clearErr();
        userService.getCompletedOrderlist()
          .then(
            res => {
                self.loading = false;
              if (res.status === 200) {
                self.poListArray = res.data
              } else {
                self.showErr = true;
                self.errmsg = 'Cannot get the loc list.'
              }
            },
            err => {
              self.errhandler(err)
            }
          )
      },
      placeOrder() {
         let self = this;
         self.clearErr();
         let data = {
             order: self.purchaseOrder._id,
             shipper: self.purchaseOrder.seller._id,
             receiver: self.purchaseOrder.buyer._id,
             shipmentDate: self.bol.shipmentDate,
             shipmentType: self.bol.shipmentType,
             notes: self.bol.notes,
         }
         self.loading = true;
         userService.createBol(data)
         .then(
             res => {
                 self.loading = false
                 if( res.status !== 200){
                     self.showErr = true;
                     self.errMsg = res.message
                 }else {
                     self.sucmsg = true
                 }
             },
             err => {
                 self.errhandler(err)
             }
         )
      },
      // setOrderDetails(po) {
      //     let self = this;
      //     if(po.seller && po.buyer){
      //         self.shipper = po.seller.username;
      //         self.receiver = po.buyer.username;
      //     }
      // },
      errhandler: function (err) {
        let self = this;
        self.loading = false
        self.scrollToTop()
        if (err.message) {
          self.showErr = true;
          self.errMsg = err.message;
        } else {
          self.showErr = true;
          self.errMsg = 'Something Went wrong. Please try after sometime.';
        }
      },
      clearErr() {
        let self = this;
        self.showErr = false;
        self.errMsg = null;
        self.sugMsg = null;
        self.showSucc = false;
        self.loading = false
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
    },
    computed: {
      orderlist: function () {
        return this.poListArray.map(
          n => {
            let obj = {
              text: `${n.orderId}`,
              value: n
            }
            return obj;
          }
        );
      },
      shipper: function () {
        if (this.purchaseOrder.seller) {
          return this.purchaseOrder.seller.username;
        }
      },
      receiver: function () {
        if (this.purchaseOrder.buyer) {
          return this.purchaseOrder.buyer.username;
        }
      }
    },
    created: function () {
      this.getPoList()
    }
  }

</script>

<style>

</style>
