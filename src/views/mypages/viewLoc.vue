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
                    <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Buyer')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Buyer</h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p>Buyer created LC<span v-if="timeline.sentToseller">, and sent to Buyer Bank </span></p>
                        <br>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="adhlog" alt="Adhi Logo"> -->
                        <!-- <span v-if="timeline.sentToseller"> <a :href="timeline.buyerblockchain" target="_blank">
                            {{getChainName(timeline.buyerhost)}}</a></span> -->
                        <!-- <b-button   type="button" size="md" variant="primary"><a class="linwh"
                            :href="timeline.buyerblockchain" target="_blank"><i class="fa fa-info"></i> View on
                            blockchain</a></b-button> -->
                        <br>
                        <b-button v-if="timeline.sentToseller" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge info"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel"  :class="{currentholder : getcurrentholder('BuyerBank')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Buyer Bank</h4>
                      </div>
                      <div class="timeline-body">
                      <p v-if="!timeline.sentToseller"> Pending</p>
                      <p v-if="timeline.sentToseller">Buyer Bank received the LC<span v-if="timeline.buyerBankerConfirm">, and sent to Seller Bank </span></p>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="quolog" alt="quorum Logo"> -->
                       <br>
                        <b-button v-if="timeline.buyerBankerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('SellerBank')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller Bank</h4>
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.buyerBankerConfirm"> Pending</p>
                        <p v-if="timeline.buyerBankerConfirm">Seller Bank received the LC<span v-if="timeline.sellerBankerConfirm">, and sent to Seller. </span></p>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="hyblog" alt="hyberledger Logo"> -->
                       <br>
                        <b-button v-if="timeline.sellerBankerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Seller')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Seller</h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.sellerBankerConfirm">Pending</p>
                        <p v-if="timeline.sellerBankerConfirm">Seller received the LC <span v-if="timeline.sellerConfirm">, Confirm and transfer to Buyer</span></p>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="ethlog" alt="ethereum Logo"> -->
                        <!-- <span v-if="timeline.sellerConfirm"> <a :href="timeline.sellerblockchain" target="_blank">
                            {{getChainName(timeline.sellerhost)}}</a></span>
                        <br>
                        <b-button v-if="timeline.sellerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder(order.orderId)">
                          <i class="fa fa-info"></i> View Data</b-button> -->
                        <br>
                        <b-button v-if="timeline.sellerConfirm" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
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
          <div slot="header">
            <strong>View Letter Of Credit</strong>
          </div>
          <b-alert v-if="showSucc" variant="success" show>LC Details updated Successfully.</b-alert>
          <b-alert v-if="showErr" variant="danger" show>{{errMsg}}</b-alert>
          <div>
            <h4>Basic Details</h4>
             <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="accNo">LC ID</label>
                  <b-form-input type="text" disabled id="accNo" :value="locDetails.locId"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="shipmentDate">Created Date</label>
                  <b-form-input type="text" disabled id="shipmentDate" :value="locDetails.createdDate | moment('DD MMM YYYY')"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="portOfDestination">Status</label>
                  <b-form-input type="text" disabled id="portOfDestination" :value="locDetails.status"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="accNo">Buyer Acc. No</label>
                  <b-form-input type="text" disabled id="accNo" :value="locDetails.accNo"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="shipmentDate">Shipment Date</label>
                  <b-form-input type="text" disabled id="shipmentDate" :value="locDetails.shipmentDate | moment('DD MMM YYYY')"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="portOfDestination">Port of Destination</label>
                  <b-form-input type="text" disabled id="portOfDestination" :value="locDetails.portOfDestination"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="goodsValue">Goods Value</label>
                  <b-form-input type="text" disabled id="goodsValue" :value="locDetails.goodsValue"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="expiryDate">Expiry Date of LC</label>
                  <b-form-input type="text" disabled id="expiryDate" :value="locDetails.expiryDate | moment('DD MMM YYYY')"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="portOfDeparture">Port of Departure</label>
                  <b-form-input type="text" disabled id="portOfDeparture" :value="locDetails.portOfDeparture"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div  v-if="locDetails.buyer && Object.keys(locDetails.buyer)">
            <h4>Buyer Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="locDetails.buyer.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="locDetails.buyer.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="locDetails.buyer.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="locDetails.buyer.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="locDetails.buyer.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="locDetails.buyer.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div  v-if=" locDetails.seller && Object.keys(locDetails.seller)">
            <h4>Seller Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="locDetails.seller.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="locDetails.seller.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="locDetails.seller.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="locDetails.seller.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="locDetails.seller.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="locDetails.seller.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div v-if="locDetails.banker && Object.keys(locDetails.banker)">
            <h4>Buyer Banker Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="locDetails.banker.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="locDetails.banker.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="locDetails.banker.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="locDetails.banker.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="locDetails.banker.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="locDetails.banker.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <hr>
          <div v-if="locDetails.sellerBank && Object.keys(locDetails.sellerBank)">
            <h4>Seller Banker Details</h4>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="orgName">Organization</label>
                  <b-form-input type="text" disabled id="orgName" :value="locDetails.sellerBank.orgName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="email">Email</label>
                  <b-form-input type="text" disabled id="email" :value="locDetails.sellerBank.email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="username">Username</label>
                  <b-form-input type="text" disabled id="username" :value="locDetails.sellerBank.username"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label for="phoneNumber">Phone Number</label>
                  <b-form-input type="text" disabled id="phoneNumber" :value="locDetails.sellerBank.phoneNumber"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" disabled id="city" :value="locDetails.sellerBank.city"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" disabled id="country" :value="locDetails.sellerBank.country"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
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
                                   <a :href="getDownloadUrl(attachment.fileName)" ><span  class="fa fa-cloud-download"></span> </a>
                                    <h5>{{ attachment.actualName }}</h5>
                                    
                                </div>
                            </label>
                        </div>
                    </div>
                </b-col>
                  <!-- </b-col> -->
                </b-row>
              </div>
          <div v-if="locDetails.status !== status.new &&  isOwner() ">
            <hr>
            <b-row v-if="locDetails.status !== status.new && locDetails.status !== status.completed">
              <b-col md="12">
                <b-form-group label="Remarks" label-for="remark" :horizontal="true">
                  <b-form-input id="remark" name="remark" v-model="remark" type="text" placeholder="Remarks"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- <b-row v-if="isBuyerBank()">
              <b-col md="12">
                <b-form-group label="Select Banker" label-for="basicSelectLg" :label-cols="3" :horizontal="true">
                  <b-form-select id="basicSelectLg" size="lg" :plain="true" :options="bankers" v-model="banker">
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row> -->
          </div>
          <br>
          <b-button type="button" variant="primary" @click="viewOder(locDetails.order)"> <i class="fa fa-eye"></i> View
            Purchase Order</b-button>
          <div slot="footer" class="txt-cen">
            <div>
              <b-button v-if=" locDetails.status === status.new && isBuyer()  && isOwner() " type="button" variant="primary" @click="sentToBuyerBank()">Apply
                LC</b-button>
              <b-button v-if=" locDetails.status === status.return && isBuyer()  && isOwner() " type="button" variant="primary" @click="resentToBuyerBank()">Resend
                To Bank</b-button>
            </div>
            <div v-if="  locDetails.status === status.active && isBuyerBank() && isOwner() ">
              <b-button type="button" variant="primary" @click="sentTosellerBank()">Approve And Send To Seller Bank</b-button>
              <b-button class="btn-mar" type="button" variant="primary" @click="sentToBuyer()">Return To Buyer</b-button>
            </div>
             <div v-if="  locDetails.status === status.return && isBuyerBank() && isOwner() ">
              <b-button type="button" variant="primary" @click="resentToSellerBank()">Resend To Seller Bank</b-button>
              <b-button class="btn-mar" type="button" variant="primary" @click="sentToBuyer()">Return To Buyer</b-button>
            </div>
            <div v-if=" locDetails.status === status.active && isSellerBank() && isOwner() ">
              <b-button type="button" variant="primary" @click="sentToseller()">Approve And Send To Seller </b-button>
              <b-button class="btn-mar" type="button" variant="primary" @click="returnToBuyerBank()">Return To Buyer Bank</b-button>
            </div>
            <div v-if=" locDetails.status === status.return && isSellerBank() && isOwner() ">
              <b-button type="button" variant="primary" @click="reSentToseller()">Resend To Seller </b-button>
              <b-button class="btn-mar" type="button" variant="primary" @click="returnToBuyerBank()">Return To Buyer Bank</b-button>
            </div>
            <div v-if=" locDetails.status === status.active && isSeller() && isOwner() ">
              <b-button type="button" variant="primary" @click="sellerConfirm()">Confirm </b-button>
              <b-button class="btn-mar" type="button" variant="primary" @click="returnToSellerBank()">Return To  Bank</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
      <b-modal ref="myModalRef" id="modal-center" centered hide-footer title="Order Details">
        <tree-view :data="blochainData" :options="viewerOptions"></tree-view>
      </b-modal>
      <b-row v-if="locChangeHistory.length">
        <b-col lg="12">
          <c-table :table-data="locChangeHistory" :fields="fields"  caption="<i class='fa fa-align-justify'></i> Loc Changes"></c-table>
        </b-col>
      </b-row>
  </div>
</template>
<script>
  import cTable from '../base/Table.vue'
  import userService from '@/services/userService.js'
  import config from '@/services/config.js'
  import jwtService from '@/services/utils.js'
  export default {
    name: 'viewloc',
    components: {cTable},
    data: () => {
      return {
        locDetails: {},
        locId: null,
        errMsg: null,
        showErr: false,
        showSucc: false,
        sugMsg: null,
        loading: false,
        viewerOptions: {
          rootObjectKey: "Letter Of Credit"
        },
        fields:[
          {key: 'time', label:'Created Date'},
          {key: 'owner', label: 'Owner'},
          {key: 'message', label: 'Changes', sortable: true},
        ],
        userDetails: {},
        blochainData:{},
        timeline:{},
        status: {
          new: 'New',
          active: 'Active',
          completed: 'Completed',
          return: 'Return'
        },
        remark: null,
        banker: {},
        bankerListArray: [],
        locChangeHistory :[]
      }
    },
    methods: {
      viewOder: function (item) {
        this.$router.push({
          name: 'ViewOrder',
          params: {
            id: item
          }
        })
      },
      getcurrentholder(type){
        switch(type) {
          case 'Buyer':
          return this.locDetails.buyer && this.locDetails.buyer.email === this.locDetails.currentholder;
          break;
          case 'Seller':
          return this.locDetails.seller && this.locDetails.seller.email === this.locDetails.currentholder;
          break;
          case 'BuyerBank':
          return this.locDetails.banker && this.locDetails.banker.email === this.locDetails.currentholder;
          break;
          case 'SellerBank':
          return this.locDetails.sellerBank && this.locDetails.sellerBank.email === this.locDetails.currentholder;
          break;
          default:
          return false
        }
      },
       getBlockchainOrder() {
        let self = this;
        self.loading = true;
        self.showerr = false;
        self.blochainData = {};
        userService.getBlockchainOrder(self.locDetails.locId)
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
                self.showModal()
              }
            }, err => {
              self.scrollToTop()
              self.loading = false
              self.errhandler(err)
            }
          )
      },
      getDownloadUrl(file){
        return `${config.DOC_URL}${file}`;
      },
      resentToSellerBank(){
        let self = this;
        self.clearErr();
        if (!Object.keys(self.banker).length) {
          self.showErr = true;
          self.errMsg = "Select the bank to transfer."
          self.scrollToTop()
          return;
        }
        if(!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remark'
          self.scrollToTop()
          return
        }
        let data = {
          banker: self.banker._id,
          remark:self.remark
        }
        self.loading = true;
        userService.reSentToSellerBank(self.locId, data)
          .then(
            res => {
               self.loading = false
               self.scrollToTop()
              if (res.status === 200) {
                self.showSucc = true;
                self.getLocDetails()
              } else {
                self.showErr = true;
                self.errMsg = res.message;
              }
            },
            err => {
              self.errhandler(err)
            }
          )
      },
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
      isOwner() {
        return this.userDetails.email === this.locDetails.currentholder
      },
      isBuyerBank() {
        return this.userDetails.email === this.locDetails.banker.email
      },
      isBuyer() {
        return this.userDetails.email === this.locDetails.buyer.email
      },
      isSellerBank() {
        if(!this.locDetails.sellerBank){
          return false;
        }
        return this.userDetails.email === this.locDetails.sellerBank.email
      },
      isSeller() {
        return this.userDetails.email === this.locDetails.seller.email;
      },
      sellerConfirm(){
        let self = this;
        self.clearErr();
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        self.loading = true;
        userService.sellerConfirm(self.locId, { remark: self.remark})
        .then(
          res => {
            self.sucessHandler(res)
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      returnToSellerBank(){
        let self = this;
        self.clearErr();
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        self.loading = true;
        userService.sellerReturn(self.locId, { remark: self.remark})
        .then(
          res => {
            self.sucessHandler(res)
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      sentToseller() {
        let self = this;
        self.clearErr();
        self.loading = true;
        userService.transferToSeller(self.locId,{ remark: null })
        .then(
          res => {
            self.sucessHandler(res)
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      reSentToseller() {
        let self = this;
        self.clearErr();
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        self.loading = true;
        userService.transferToSeller(self.locId, {remark: self.remark})
        .then(
          res => {
            self.sucessHandler(res)
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      returnToBuyerBank() {
        let self = this;
        self.clearErr();
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        self.loading = true;
        userService.returnToBuyerBank(self.locId, { remark: self.remark})
        .then(
          res => {
            self.sucessHandler(res)
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      sucessHandler (res){
        let self = this;
        self.loading = false
        if (res.status === 200) {
          self.showSucc = true;
          self.getLocDetails()
        }else {
          self.showErr = true;
          self.errMsg = res.message;
        }
      },
      resentToBuyerBank() {
        let self = this;
        self.clearErr();
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        self.loading = true;
        userService.resentToBank(self.locId,{ remark: self.remark})
        .then(
          res => {
            self.loading = false
            if (res.status === 200) {
              self.showSucc = true;
              self.getLocDetails()
            }else {
              self.showErr = true;
              self.errMsg = res.message;
            }
          },
          err => {
            self.errhandler(err)
          }
        )
      },
      sentToBuyerBank: function () {
        let self = this;
        self.sucmsg = false;
        self.errMsg = null;
        self.showErr = false;
        self.loading = true;
        userService.sentBuyerBank(self.locId)
          .then(
            res => {
              self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showErr = true;
                self.errMsg = res.message;
              } else {
                self.succesmsg = true;
                self.getLocDetails()
              }
            },
            err => {
              self.errhandler(err)
            }
          )
      },
      getLoggedUser: function () {
        let self = this
        self.userDetails = jwtService.getUSer()
        console.log("user details", self.userDetails)
      },
      clearErr() {
        let self = this;
        self.showErr = false;
        self.errMsg = null;
        self.sugMsg = null;
        self.showSucc = false;
        self.loading = false
      },
      sentTosellerBank() {
        let self = this;
        self.clearErr();
        // if (!Object.keys(self.banker).length) {
        //   self.showErr = true;
        //   self.errMsg = "Select the bank to transfer."
        //   self.scrollToTop()
        //   return;
        // }
        // let data = {
        //   banker: self.banker._id
        // }
        self.loading = true;
        userService.transferToSellerBank(self.locId, {})
          .then(
            res => {
               self.loading = false
               self.scrollToTop()
              if (res.status === 200) {
                self.showSucc = true;
                self.getLocDetails()
              } else {
                self.showErr = true;
                self.errMsg = res.message;
              }
            },
            err => {
              self.errhandler(err)
            }
          )
      },
      sentToBuyer() {
        let self = this;
        self.clearErr()
        if (!self.remark) {
          self.showErr = true;
          self.errMsg = 'Enter the remarks';
          self.scrollToTop();
          return;
        }
        let data = {
          remark: self.remark
        }
        self.loading = true;
        userService.sentToBuyer(self.locId, data)
          .then(
            res => {
              self.loading = false
              if (res.status === 200) {
                self.showSucc = true;
                self.getLocDetails()
              } else {
                self.showErr = true;
                self.errMsg = res.message;
              }
              self.scrollToTop()
            },
            err => {
              self.errhandler(err)
            }
          )
      },
      setTimeline(lc){
        console.log("lcde",lc.timeline)
        this.timeline = lc.timeline;
        this.attachments = lc.documets
      },
      getLocDetails: function () {
        let self = this;
        self.locId = self.$route.params.id;
        self.loading = false;
        userService.getLocDetails(self.locId)
          .then(
            res => {
              self.loading = false
              if (res.status === 200) {
                self.locDetails = res.data
                this.filterBank()
                self.setTimeline(self.locDetails)
                self.getChanges(self.locDetails.locId)
                self.scrollToTop()
              } else {
                self.showErr = true;
                self.errMsg = res.message;
              }
            },
            err => {
              self.errhandler(err)
            }
          )
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
      scrollToTop() {
        window.scrollTo(0, 0);
      },
      getBankList() {
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
      filterBank() {
        let self = this;
        this.bankerListArray = this.bankerListArray.filter(n => {
          return n._id != self.locDetails.banker._id
        })
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
                self.succesmsg = true;
                if(res.data.length){
                  self.locChangeHistory = res.data.map( n => {
                    let obj = {
                      time: n.time,
                      owner: self.getUsername(n.owner),
                      message: n.message
                    }
                    return obj;
                  });
                }else{
                  self.locChangeHistory = [];
                }
                console.log("history", res.data)
                // self.showHisModal()
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
        if(self.locDetails.buyer.walletAddress === address){
          return 'Buyer'
        }else if(self.locDetails.seller.walletAddress === address ){
          return 'Seller'
        }else if(self.locDetails.banker.walletAddress === address){
          return 'Buyer Bank'
        }else{
           return 'Seller Bank'
        }
      }
    },
    computed: {
      bankers: function () {
        let self = this
        let list = this.bankerListArray.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
            value: n
          }
          return obj;
        });
        return list;
      }
    },
    created: function initFunction() {
      this.getBankList()
      this.getLocDetails()
      this.getLoggedUser()
    }
  }

</script>
<style>
  .txt-cen {
    text-align: center !important
  }

  .btn-mar {
    margin-left: 5px
  }

  .currentholder{
    background:#67d267  !important
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

  .searchable-container{margin:20px 0 0 0}
.searchable-container label.btn-default.active{background-color:#007ba7;color:#FFF}
.searchable-container label.btn-default{border:1px solid #efefef;margin:5px; box-shadow:5px 8px 8px 0 #ccc;}
/* .searchable-container label .bizcontent{width:100%;} */
/* .searchable-container .btn-group{width:90%} */
.searchable-container .btn span.fa{
    opacity: 1;
}
.searchable-container .btn.active span.fa {
    opacity: 1;
}

</style>
