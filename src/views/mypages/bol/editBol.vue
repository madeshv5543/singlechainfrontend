<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Edit Bill Of lading</strong>
          </div>
          <b-alert v-if="sugMsg" variant="success" show>BOl Details Updated Successfully.</b-alert>
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
              <b-button type="button" size="md" @click="updateBol()" variant="primary"><i class="fa fa-dot-circle-o"></i>
                Update BOL</b-button>
            </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import userService from '@/services/userService.js'
export default {
    name: 'EditBol',
    data: () => {
        return {
            bolId:null,
            showErr: false,
            sugMsg: false,
            errMsg: false,
            loading: false,
            bol:{},
            poListArray:[],
            ShipmentTypes: ['INTERNATIONAL SHIPPING', 'INTERMODAL RAIL FREIGHT', 'AIR FREIGHT'],
            purchaseOrder:{}
        }
    },
    methods:{
        getBolDetails: function() {
            let self = this;
            self.clearErr()
            self.bolId = self.$route.params.id;
            self.loading = true;
            userService.getBolDetails(self.bolId)
            .then(
                res => {
                    self.loading = false;
                    if(res.status !== 200) {
                        self.showErr =true;
                        self.errMsg = res.message;
                    }else{
                        self.bol = res.data;
                        self.setBolDetails(self.bol)
                    }
                },
                err =>{
                    self.errhandler(err)
                }
            )
        },
        updateBol: function() {
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
            userService.updateBolDetails(self.bolId, data)
            .then(
                res => {
                    self.loading =false
                    if(res.status !== 200) {
                        self.showErr = true,
                        self.errMsg= res.message
                    }else{
                        self.sugMsg = true;
                    }
                },
                err =>{
                    self.errhandler(err)
                }
            )
        },
        setBolDetails: function(bol) {
            let self = this;
            self.purchaseOrder = self.poListArray.find( n => {
                return n._id === bol.order._id
            });
        },
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
        getPoList: function () {
            let self = this;
            self.clearErr();
            userService.getCompletedOrderlist()
            .then(
                res => {
                    self.loading = false;
                if (res.status === 200) {
                    self.poListArray = res.data
                    self.getBolDetails()
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
        if (this.purchaseOrder && this.purchaseOrder.seller) {
          return this.purchaseOrder.seller.username;
        }else{
            return null
        }
      },
      receiver: function () {
        if ( this.purchaseOrder && this.purchaseOrder.buyer) {
          return this.purchaseOrder.buyer.username;
        }else{
            return null
        }
      }
    },
    created: function() {
        this.getPoList()
    }
}
</script>
<style>

</style>
