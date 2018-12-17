<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-card v-if="Object.keys(timeline).length">
          <div slot="header">
            <strong>Timeline</strong>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="page-header">
              </div>
              <div style="display:inline-block;width:100%;">
                <ul class="timeline timeline-horizontal">
                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller</h4>
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.sentToBuyer">Seller Created BOL
                        <span v-if="timeline.sentToBuyer">,
                         and sent to Buyer </span></p>
                        <br>
                        <br>
                        <b-button v-if="timeline.sentToBuyer" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Buyer</h4>
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.sentToBuyer">Pending</p>
                        <p v-if="timeline.sentToBuyer">Buyer received the BOL <span v-if="timeline.buyerConfirm">, Confirm and transfer to Seller</span></p>
                        <br>
                        <br>
                        <br>
                        <b-button v-if="timeline.buyerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
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
          <div slot="header">
            <strong>View Bill Of Lading</strong>
          </div>
          <b-alert v-if="showSucc" variant="success" show>BOL Document transfer Successfully.</b-alert>
          <b-alert v-if="showErr" variant="danger" show>{{errMsg}}</b-alert>
          <div>
            <h4>Basic Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="bolId">LC ID</label>
                  <b-form-input type="text" disabled id="bolId" :value="bolDetails.bolId"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="createdDate">Created Date</label>
                  <b-form-input type="text" disabled id="createdDate" :value="bolDetails.createdDate | moment('DD MMM YYYY')"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="status">Status</label>
                  <b-form-input type="text" disabled id="status" :value="bolDetails.status"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="shipmentType">Shipment Type</label>
                  <b-form-input type="text" disabled id="shipmentType" :value="bolDetails.shipmentType"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="shipmentDate">Shipment Date</label>
                  <b-form-input type="text" disabled id="shipmentDate" :value="bolDetails.shipmentDate | moment('DD MMM YYYY')"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="notes">Port of Destination</label>
                  <b-form-input type="text" disabled id="notes" :value="bolDetails.Notes"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div v-if="bolDetails.shipper && Object.keys(bolDetails.shipper)">
            <h4>Shipper Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="bolDetails.shipper.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="bolDetails.shipper.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="bolDetails.shipper.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="bolDetails.shipper.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="bolDetails.shipper.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="bolDetails.shipper.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div v-if="bolDetails.receiver && Object.keys(bolDetails.receiver)">
            <h4>Receiver Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="bolDetails.receiver.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="bolDetails.receiver.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="bolDetails.receiver.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="bolDetails.receiver.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="bolDetails.receiver.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="bolDetails.receiver.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div v-if="bolDetails.order && Object.keys(bolDetails.order)">
            <h4>Order Details</h4>
            <b-row>
              <b-col md="4"><strong> Order Id: {{bolDetails.order.orderId}}</strong></b-col>
              <b-col md="4"><strong>Created Date : {{bolDetails.order.createdDate | moment("DD-MM-YYYY")}}</strong></b-col>
              <b-col md="4"><strong> TotalCost : {{bolDetails.order.totalCost}} </strong></b-col>
            </b-row>
            <br>
            <b-row>
              <b-col lg="12" md="12">
                <c-table :table-data="bolDetails.order.items" :fields="fields" caption="<i class='fa fa-align-justify'></i> Items List"></c-table>
              </b-col>
            </b-row>
          </div>
          <b-row v-if="!isSeller() && bolDetails.status !== 'Completed' && bolDetails.status !== 'Return' ">
            <b-col md="12">
            <b-form-group label="Remarks" label-for="remark" :label-cols="5" :horizontal="true">
              <b-form-input id="remark" name="remark" v-model="remark" type="text" placeholder="Remarks"></b-form-input>
            </b-form-group> 
            </b-col>
          </b-row>
          <b-row v-if="isSeller() && bolDetails.status === 'Return' ">
            <b-col md="12">
            <b-form-group label="Remarks" label-for="remark" :label-cols="5" :horizontal="true">
              <b-form-input id="remark" name="remark" v-model="remark" type="text" placeholder="Remarks"></b-form-input>
            </b-form-group> 
            </b-col>
          </b-row>
          <div v-if="isSeller() && bolDetails.status === 'New'" slot="footer" style="text-align:center">
            <b-button type="button" @click="sentToBuyer()" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Send To Buyer</b-button>
          </div>
          <div v-if="isSeller() && bolDetails.status === 'Return'" slot="footer" style="text-align:center">
            <b-button type="button" @click="resentToBuyer()" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Send To Buyer</b-button>
          </div>
          <div v-if="!isSeller() && bolDetails.status !== 'Completed'  && bolDetails.status !== 'Return' " slot="footer" style="text-align:center">
            <b-button type="button" @click="buyerConfirm('Approve')" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Approve</b-button>
                 <b-button type="button" @click="buyerConfirm('Reject')" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i>
              Return</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import cTable from '../../base/Table.vue'
  import userService from '@/services/userService.js'
  import utils from '@/services/utils.js';
  export default {
    name: 'ViewBol',
    components: {
      cTable
    },
    data: () => {
      return {
        loading: false,
        timeline: {},
        showSucc: false,
        showErr: false,
        errMsg: null,
        bolId: null,
        bolDetails:{}
      }
    },
    methods: {
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
                        self.bolDetails = res.data;
                        self.timeline = self.bolDetails.timeline;
                    }
                },
                err =>{
                    self.errhandler(err)
                }
            )
        },
        sentToBuyer() {
            let self = this;
            self.loading = true;
            self.showerr = false;
            self.succesmsg = false;
                userService.sentBolToBuyer(self.bolId)
                .then(
                    res => {
                        self.scrollToTop()
                        self.loading = false;
                        if (res.status != 200) {
                            self.showErr =true;
                            self.errMsg = res.message;
                        } else {
                            self.showSucc = true;
                            self.getBolDetails()
                        }
                    },
                    err => {
                        self.errhandler(err)
                    }

                )
       },
        isSeller() {
            return utils.isSeller()
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
    },
    created: function() {
        this.getBolDetails()
    }
  }

</script>
<style>
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
