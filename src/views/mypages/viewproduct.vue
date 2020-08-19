<template>
  <div class="animated fadeIn">
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
                    <div class="timeline-badge primary"></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Admin')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Admin</h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p>Admin Created a Product<span v-if="timeline.dispatchToHub">, and dispatch to delivery hub. </span></p>
                        <br>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="adhlog" alt="Adhi Logo"> -->
                        <br>
                        <b-button v-if="timeline.dispatchToHub" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge info"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel"  :class="{currentholder : getcurrentholder('Hub')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Delivery Hub</h4>
                      </div>
                      <div class="timeline-body">
                      <p v-if="!timeline.dispatchToHub"> Pending</p>
                      <p v-if="timeline.dispatchToHub">Delivery Hub received the product<span v-if="timeline.dispatchToCenter">, and dispatch to delivery center.</span></p>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="quolog" alt="quorum Logo"> -->
                       <br>
                        <b-button v-if="timeline.dispatchToCenter" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge danger"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Center')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Delivery Center</h4>
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.dispatchToCenter"> Pending</p>
                        <p v-if="timeline.dispatchToCenter">Delivery Center received the product <span v-if="timeline.dispatchToDelivery">, and sent to delivery. </span></p>
                        <br>
                        <!-- <img class="navbar-brand-full chainlogo" :src="hyblog" alt="hyberledger Logo"> -->
                       <br>
                        <b-button v-if="timeline.dispatchToDelivery" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Delivery')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Delivery Person </h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.dispatchToDelivery">Pending</p>
                        <p v-if="timeline.dispatchToDelivery">Product Out for delivery<span v-if="timeline.delivered">, Product delivered to Customer</span></p>
                        <br>
                        <br>
                        <b-button v-if="timeline.delivered" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-item">
                    <div class="timeline-badge success"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel" :class="{currentholder : getcurrentholder('Customer')}">
                      <div class="timeline-heading">
                        <h4 class="timeline-title">Customer </h4>
                        <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                      </div>
                      <div class="timeline-body">
                        <p v-if="!timeline.delivered">Pending</p>
                        <p v-if="timeline.delivered">Customer received the Product</p>
                        <br>
                        <br>
                        <b-button v-if="timeline.delivered" type="button" size="md" variant="primary" @click="getBlockchainOrder()">
                          <i class="fa fa-info"></i> View Data</b-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <div class="card">
      <div class="card-header">
        <strong> {{user.name}} </strong>
      </div>
      <b-col lg="14">
        <b-card>
          <b-form @submit.prevent="update">
            <b-row>
              <b-col sm="3">
                <b-form-group label="Name" :label-cols="3" :horizontal="true">
                  <span class="adj">
                    <b-form-input name="name" disabled v-validate="'required'" type="text" id="name" placeholder="Enter product name"
                      v-model="user.name"></b-form-input>
                    <span class="error" v-if="errors.has('name')">{{errors.first('name')}}</span>
                  </span>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="sku" :label-cols="2" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="sku" type="text" id="skucode" placeholder="Enter your sku"
                    v-model="user.skucode"></b-form-input>
                  <span class="error" v-if="errors.has('sku')">{{errors.first('sku')}}</span>
                </b-form-group>
              </b-col>
              <!-- <b-col sm="2">
            <b-form-group label="Quantity" :label-cols="3" :horizontal="true">
              <b-form-input v-validate="'required'" name="quantity" type="number" id="quantity" v-model="user.quantity"></b-form-input>
              <span class="error" v-if="errors.has('quantity')">{{errors.first('quantity')}}</span>
            </b-form-group>
          </b-col> -->
              <b-col sm="4">
                <b-form-group label="UOM" :label-cols="3" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="unit of quantity" type="text" id="unitofquantity"
                    v-model="user.unitofquantity"></b-form-input>
                  <span class="error" v-if="errors.has('unit of quantity')">{{errors.first('unit of quantity')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <b-form-group label="Price" :label-cols="3" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="unit price" type="number" id="unitprice" v-model="user.unitprice"></b-form-input>
                  <span class="error" v-if="errors.has('unit price')">{{errors.first('unit price')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="2">
                <b-form-group label="Qty" :label-cols="3" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="quantity" type="number" id="quantity" v-model="user.quantity"></b-form-input>
                  <span class="error" v-if="errors.has('quantity')">{{errors.first('quantity')}}</span>
                </b-form-group>
              </b-col>
              <!--           
          <b-form-file name="file" v-model="user.image" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
              <!-- <div class="mt-3" v-if="editim==null">Selected file: {{user.image}} -->
              <b-form-group class="previewImage" v-if="editim==null">
                <img class="ifdre" :src="url2">
              </b-form-group>
              <!-- </div> -->
              <b-form-group class="previewImage">
                <img class="ifdre" v-if="url" :src="url">
              </b-form-group>
              <!-- <div class="fileimage">
                <b-form-file name="file" v-model="user.image" :state="Boolean(file)" placeholder="Choose a file..."
                  @change="previewImage"></b-form-file>
              </div> -->

            </b-row>
            <b-row>
              <b-col sm="7" class="filetop">
                <b-form-group label="Description" :label-cols="3" :horizontal="true">
                  <b-form-textarea disabled v-validate="'required'" name="description" id="basicTextarea" :textarea="true"
                    :rows="3" :cols="25" placeholder="Content.." v-model="user.description"></b-form-textarea>
                  <span class="error" v-if="errors.has('description')">{{errors.first('description')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <br><br><br><br><br><br>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Type" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="type" type="text" id="type" v-model="user.type"></b-form-input>
                  <span class="error" v-if="errors.has('type')">{{errors.first('type')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Certification" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="certification" type="text" id="certification"
                    v-model="user.certification"></b-form-input>
                  <span class="error" v-if="errors.has('certification')">{{errors.first('certification')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Weight" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="weight" type="number" id="weight" v-model="user.weight"></b-form-input>
                  <span class="error" v-if="errors.has('weight')">{{errors.first('weight')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Expiry" :label-cols="5" :horizontal="true">


                  <!-- <b-form-input v-validate="'required'" name="expiry" type="date" id="expiry" v-model="user.expiry"></b-form-input> -->

                  <datepicker disabled v-model="user.expiry" name="expiry"></datepicker>
                  <span class="error" v-if="errors.has('expiry')">{{errors.first('expiry')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Warranty" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="warranty" type="number" id="warranty" v-model="user.warranty"></b-form-input>
                  <span class="error" v-if="errors.has('warranty')">{{errors.first('warranty')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Company" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="company" type="text" id="company" v-model="user.company"></b-form-input>
                  <span class="error" v-if="errors.has('company')">{{errors.first('company')}}</span>
                </b-form-group>
              </b-col>

            </b-row>
            <b-row>


            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Quality" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="quality" type="text" id="quality" v-model="user.quality"></b-form-input>
                  <span class="error" v-if="errors.has('quality')">{{errors.first('quality')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Manufacturer" :label-cols="5" :horizontal="true">
                  <b-form-input disabled v-validate="'required'" name="manufacturer" type="text" id="manufacturer"
                    v-model="user.manufacturer"></b-form-input>
                  <span class="error" v-if="errors.has('manufacturer')">{{errors.first('manufacturer')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <form v-if="userDetails&& userDetails.accountType === admin && productDetails && !productDetails.deliveryHub"
              @submit.prevent="dispatchTohub">
              <b-row>

                <b-col md="6">
                  <b-form-group label="Select Delivery Hub" label-for="deliveryhub" :label-cols="3" :horizontal="true">
                    <b-form-select id="deliveryhub" name="deliveryhub" v-validate="'required'" size="lg" :plain="true"
                      :options="hubs" v-model="deliveryHub">
                    </b-form-select>
                  </b-form-group>
                  <span class="error" v-if="errors.has('deliveryhub')">{{errors.first('deliveryhub')}}</span>
                </b-col>
                <b-col md="6">
                  <b-button type="submit" variant="primary" size="lg"> Dispatch to delivery Hub</b-button>
                  <!-- <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Save </b-button>&emsp;&emsp;
                <b-button type="submit" @click="delet" variant="primary"><i class="fa fa-dot-circle-o"></i> delete</b-button> -->
                </b-col>

              </b-row>
            </form>
            <form v-if="userDetails&& userDetails.accountType === centre && productDetails && !productDetails.deliveryBoy"
              @submit.prevent="dispatchToDelivery">
              <b-row>

                <b-col md="6">
                  <b-form-group label="Select Delivery Person" label-for="deliveryboy" :label-cols="3" :horizontal="true">
                    <b-form-select id="deliveryboy" name="deliveryboy" v-validate="'required'" size="lg" :plain="true"
                      :options="deliverys" v-model="deliveryBoy">
                    </b-form-select>
                  </b-form-group>
                  <span class="error" v-if="errors.has('deliveryboy')">{{errors.first('deliveryboy')}}</span>
                </b-col>
                <b-col md="6">
                  <b-button type="submit" variant="primary" size="lg"> Dispatch to delivery </b-button>
                  <!-- <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Save </b-button>&emsp;&emsp;
                <b-button type="submit" @click="delet" variant="primary"><i class="fa fa-dot-circle-o"></i> delete</b-button> -->
                </b-col>

              </b-row>
            </form>
            <form v-if="userDetails && userDetails.accountType === hub && productDetails && !productDetails.deliveryCenter"
              @submit.prevent="dispatchToCenter">
              <b-row>

                <b-col md="6">
                  <b-form-group label="Select Delivery Center" label-for="deliveryCenter" :label-cols="3" :horizontal="true">
                    <b-form-select id="deliveryCenter" name="deliveryCenter" v-validate="'required'" size="lg" :plain="true"
                      :options="centers" v-model="deliveryCenter">
                    </b-form-select>
                  </b-form-group>
                  <span class="error" v-if="errors.has('deliveryCenter')">{{errors.first('deliveryCenter')}}</span>
                </b-col>
                <b-col md="6">
                  <b-button type="submit" variant="primary" size="lg"> Dispatch to delivery Center</b-button>
                  <!-- <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Save </b-button>&emsp;&emsp;
                <b-button type="submit" @click="delet" variant="primary"><i class="fa fa-dot-circle-o"></i> delete</b-button> -->
                </b-col>

              </b-row>
            </form>
          </b-form>
        </b-card>
      </b-col>
    </div>
    <b-row v-if="locChangeHistory.length">
      <b-col lg="12">
        <c-table :table-data="locChangeHistory" :fields="fields" caption="<i class='fa fa-align-justify'></i> Product History"></c-table>
      </b-col>
    </b-row>
    <b-modal ref="myModalRef" id="modal-center" centered hide-footer title="Product Details">
        <tree-view :data="blochainData" :options="viewerOptions"></tree-view>
    </b-modal>
  </div>
</template>
<script>
  import userService from '@/services/userService.js';
  import config from '@/services/config.js';
  import jwtService from '@/services/utils.js'
  import cTable from '../base/Table.vue'
  var moment = require('moment')
  // import axios from 'axios'
  export default {
    components: {cTable},
    data() {
      return {
        selected: [],
        viewerOptions: {
          rootObjectKey: "Product"
        },
        hubList: [],
        centersList: [],
        dePersionList: [],
        locChangeHistory :[],
        fields:[
          {key: 'time', label:'Created Date'},
          {key: 'owner', label: 'Owner'},
          {key: 'message', label: 'Info', sortable: true},
        ],
        productDetails: null,
        userDetails: null,
        timeline:{},
        blochainData:{},
        show: true,
        url: '',
        file: null,
        submitted: false,
        //  url: '',
        url2: '',
        editim: null,
        user: {
          name: '',
          unitprice: '',
          weight: '',
          expiry: '',
          description: '',
          warranty: '',
          quality: '',
          manufacturer: '',
          type: '',
          certification: '',
          company: '',
          unitofquantity: '',
          image: '',
          quantity: '',
          skucode: ''
        },
        fname: '',
        urlimage: '',
      }
    },
    methods: {
      getcurrentholder(type){
        switch(type) {
          case 'Admin':
          return !this.productDetails.deliveryHub;
          break;
          case 'Hub':
          return this.productDetails.deliveryHub && !this.productDetails.deliveryCenter;
          break;
          case 'Center':
         return this.productDetails.deliveryCenter && !this.productDetails.deliveryBoy;
          break;
          case 'Delivery':
         return this.productDetails.deliveryBoy ;
          case 'Customer':
          return this.productDetails.status === 'Delivered'
          break;
          default:
          return false
        }
      },
      getBlockchainOrder() {
        let self = this;
        self.blochainData = {};
        userService.getBlockchainOrder(self.productDetails.productId)
          .then(
            res => {
              // self.scrollToTop()
              self.loading = false;
              if (res.status != 200) {
                self.showToast(res.message)
              } else {
                self.blochainData = res.data;
                self.showModal()
              }
            }, err => {
              self.showToast('Please try after sometime.')
            }
          )
      },
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
      getChanges(orderId){
        let self = this;
        userService.getOrderHistory(orderId)
        .then(
            res => {
              // self.scrollToTop()
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
                      owner: n.owner,
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
              console.log('err', err)
              // self.scrollToTop()
              // self.loading = false
              // self.errhandler(err)
            }
        )
      },
      delet(params) {
        let id = this.$route.params.id;

        // let path2='/deletelist/'+ params
        //  console.log(path2)

        var app = this
        var formData = new FormData();
        formData.delete(params)

        formData.delete('weight', this.user.weight)
        formData.delete('description', this.user.description)
        formData.delete('warranty', this.user.warranty)
        formData.delete('quality', this.user.quality)

        formData.delete('manufacturer', this.user.manufacturer)

        formData.delete('type', this.user.type)
        formData.delete('certification', this.user.certification)
        formData.delete('unitofquantity', this.user.unitofquantity)
        formData.delete('company', this.user.company)
        formData.delete('quantity', this.user.quantity)
        formData.delete('expiry', this.user.expiry)
        formData.delete('skucode', this.user.skucode)
        formData.delete('urlimg', this.fname)
        formData.delete('image', this.urlimage)
        console.log(this.fname)
        console.log(this.user.name)

        console.log(id)

        userService.deleteProduct(id, formData)
          //     const url3 = "http://localhost:3000/api/remove/" + id;
          //     axios.post(url3,formData,{ headers: {"Content-Type": "multipart/form-data"
          //           }
          // })
          .then(res => {
            app.$router.push("/productlist");

            console.log("sdfgg");
            console.log(res);
            window.location.reload()
            this.$toasted.show(' Details removed', {

              fullWidth: false,
              theme: "outline",
              position: "bottom-right",
              duration: 5000

            })

          })
        // .then (res=>this.user.splice(index,1))
      },
      dispatchTohub() {
        let self = this;
        self.$validator.validate().then(valid => {
          if (!valid) {
            return;
          }
          let data = {
            deliveryHub: self.deliveryHub._id
          }
          let id = self.$route.params.id;
          userService.sentToDeliveryHub(data, id)
            .then(
              res => {
                if (res.data && res.data.status !== 200) {
                  this.showToast(res.data.message)
                } else if (res.data && res.data.status === 200) {
                  this.showToast('Product dispatched to Delivery Hub')
                  self.getProductDetails()
                } else {
                  this.showToast('Something Went wrong.Please Try after sometime')
                }
              },
              err => {
                this.showToast('Something went wrong.Please try after sometime.')
              }
            )
        })
      },

      dispatchToCenter() {
        let self = this;
        self.$validator.validate().then(valid => {
          if (!valid) {
            return;
          }
          let data = {
            deliveryCenter: self.deliveryCenter._id,
            remark: 'Product Dispatch to delivery Center'
          }
          let id = self.$route.params.id;
          userService.sentToDeliveryCenter(data, id)
            .then(
              res => {
                if (res.data && res.data.status !== 200) {
                  this.showToast(res.data.message)
                } else if (res.data && res.data.status === 200) {
                  this.showToast('Product dispatched to Delivery Center')
                  self.getProductDetails()
                } else {
                  this.showToast('Something Went wrong.Please Try after sometime')
                }
              },
              err => {
                this.showToast('Something went wrong.Please try after sometime.')
              }
            )
        })
      },

      dispatchToDelivery() {
        let self = this;
        self.$validator.validate().then(valid => {
          if (!valid) {
            return;
          }
          let data = {
            deliveryBoy: self.deliveryBoy._id,
            remark: 'Product sent to delivery'
          }
          let id = self.$route.params.id;
          userService.sentToDelivery(data, id)
            .then(
              res => {
                if (res.data && res.data.status !== 200) {
                  this.showToast(res.data.message)
                } else if (res.data && res.data.status === 200) {
                  this.showToast('Product sent to Delivery')
                  self.getProductDetails()
                } else {
                  this.showToast('Something Went wrong.Please Try after sometime')
                }
              },
              err => {
                this.showToast('Something went wrong.Please try after sometime.')
              }
            )
        })
      },

      showToast(message) {
        this.$toasted.show(message, {
          fullWidth: false,
          theme: "outline",
          position: "bottom-right",
          duration: 5000
        })
      },
      getHubList() {
        let self = this;
        userService.getHubList()
          .then(
            res => {
              console.log('hub list', res.data)
              if (res.data.status === 200) {
                self.hubList = res.data.data;
              }
            },
            err => {
              this.$toasted.show('Cannot get hub list', {
                fullWidth: false,
                theme: "outline",
                position: "bottom-right",
                duration: 5000

              })
            }
          )
      },
      getCenterList() {
        console.log('get centyer list')
        let self = this;
        userService.getCenters()
          .then(
            res => {
              console.log('hub list', res.data)
              if (res.data.status === 200) {
                self.centersList = res.data.data;
              }
            },
            err => {
              this.$toasted.show('Cannot get hub list', {
                fullWidth: false,
                theme: "outline",
                position: "bottom-right",
                duration: 5000

              })
            }
          )
      },
      getdeliveryList() {
        let self = this;
        userService.getDeliveryPersons()
          .then(
            res => {
              console.log('hub list', res.data)
              if (res.data.status === 200) {
                self.dePersionList = res.data.data;
              }
            },
            err => {
              this.$toasted.show('Cannot get hub list', {
                fullWidth: false,
                theme: "outline",
                position: "bottom-right",
                duration: 5000

              })
            }
          )
      },
      previewImage() {
        this.fname = event.target.files[0]
        console.log(this.fname)
        this.url = URL.createObjectURL(this.fname);
        this.user.image = this.fname.name;
        console.log(this.user.image)
        this.editim = true
      },
      showimg() {

      },
      getLoggedUser: function () {
        let self = this
        console.log('deliver center')
        self.userDetails = jwtService.getUSer()
        if (self.userDetails.accountType === jwtService.admin) {
          self.getHubList()
        } else if (self.userDetails.accountType === jwtService.hub) {
          self.getCenterList()
        } else if (self.userDetails.accountType === jwtService.centre) {
          self.getdeliveryList()
        } else {
          return
        }
        console.log("user details", self.userDetails)
      },
      update() {
        let id = this.$route.params.id;
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            let self = this;
            var formData = new FormData()
            formData.append('name', this.user.username)
            formData.append('unitprice', this.user.unitprice)
            formData.append('weight', this.user.weight)
            formData.append('description', this.user.description)
            formData.append('warranty', this.user.warranty)
            formData.append('quality', this.user.quality)
            formData.append('manufacturer', this.user.manufacturer)
            formData.append('type', this.user.type)
            formData.append('certification', this.user.certification)
            formData.append('unitofquantity', this.user.unitofquantity)
            formData.append('company', this.user.company)
            // formData.append('quantity', this.user.quantity)
            // formData.append('expiry', this.user.expiry)
            // //formData.append('price', this.user.price)
            // formData.append('skucode', this.user.skucode)
            // formData.append('urlimg', this.fname)
            console.log(formData);
            let id = this.$route.params.id;
            userService.updateUsser(id, formData)
              .then(res => {
                this.$router.push("/list");
                console.log(res)

                this.$toasted.show('Update Details saved', {
                  fullWidth: false,
                  theme: "outline",
                  position: "bottom-right",
                  duration: 5000
                })
              }).catch(function () {
                console.log('error when uploading')
              })
          }
        });
      },
      setTimeline(product) {
        this.timeline = product.timeline;
      },
      getProductDetails() {
         let id = this.$route.params.id;
        userService.getProduct(id)
        .then(res => {
          console.log("sdfgg");
          console.log(res);
          console.log(id)
          this.productDetails = res.data
          this.setTimeline(this.productDetails)
          this.getChanges(  this.productDetails.productId)
          this.products = res.data;
          this.user.type = res.data.type;
          this.user.company = res.data.company;
          this.user.name = res.data.name;
          this.user.certification = res.data.certification;
          this.user.quantity = res.data.quantity;
          this.user.quality = res.data.quality;


          this.user.unitofquantity = res.data.unitofquantity;
          this.user.skucode = res.data.skucode;
          this.user.weight = res.data.weight;
          this.user.warranty = res.data.warranty;
          this.user.expiry = moment(res.data.expiry).format("MM/DD/YYYY ")
          this.user.image = res.data.image;
          this.url2 = `${config.DOC_URL}` + this.user.image
          this.user.manufacturer = res.data.manufacturer;
          this.user.description = res.data.description;
          this.user.unitprice = res.data.unitprice;
        });
      }
    },
    created() {
      this.getProductDetails()
      this.getLoggedUser()
      console.log("hdfged");
      console.log(id);
      //  this.item = data.body;
    },
    computed: {
      hubs() {
        let self = this;
        return self.hubList.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
            value: n
          }
          return obj
        })
      },
      centers() {
        let self = this;
        return self.centersList.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
            value: n
          }
          return obj
        });
      },
      deliverys() {
        let self = this;
        return self.dePersionList.map(n => {
          let obj = {
            text: `${n.username} - ${n.email}`,
            value: n
          }
          return obj
        });
      },
      admin() {
        return jwtService.admin;
      },
      hub() {
        return jwtService.hub;
      },
      centre() {
        return jwtService.centre
      }
    }
  }

</script>
<style scoped>
  .error {
    color: red;
  }

  .currentholder{
    background:#67d267  !important
  }

  /* .ifdre {
    height: 45% !important;
    padding-left: 7%;
    width: 51%;
    float: right;
    padding-bottom: 3%;
     margin-right: -24%;
  } */

  .ifdre {
    /* padding-left: 7%; */
    float: right;
    height: 147px;
    padding-left: 370px;
  }

  textarea.form-control {
    height: 211%;
  }

  .fileimage {
    /* float: right; */
    padding-left: 70% !important;
    padding-top: -4%;
    position: relative;
    /* top: 5%; */
    width: 100%;

  }

  .filetop {

    margin-top: -112px;
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
    min-width: 250px;
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
