<template>
  <div class="animated fadeIn">
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
                    <b-form-input name="name" v-validate="'required'" type="text" id="name" placeholder="Enter product name"
                      v-model="user.name"></b-form-input>
                    <span class="error" v-if="errors.has('name')">{{errors.first('name')}}</span>
                  </span>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="sku" :label-cols="2" :horizontal="true">
                  <b-form-input v-validate="'required'" name="sku" type="text" id="skucode" placeholder="Enter your sku"
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
                  <b-form-input v-validate="'required'" name="unit of quantity" type="text" id="unitofquantity" v-model="user.unitofquantity"></b-form-input>
                  <span class="error" v-if="errors.has('unit of quantity')">{{errors.first('unit of quantity')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <b-form-group label="Price" :label-cols="3" :horizontal="true">
                  <b-form-input v-validate="'required'" name="unit price" type="number" id="unitprice" v-model="user.unitprice"></b-form-input>
                  <span class="error" v-if="errors.has('unit price')">{{errors.first('unit price')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="2">
                <b-form-group label="Qty" :label-cols="3" :horizontal="true">
                  <b-form-input v-validate="'required'" name="quantity" type="number" id="quantity" v-model="user.quantity"></b-form-input>
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
              <div class="fileimage">
                <b-form-file name="file" v-model="user.image" :state="Boolean(file)" placeholder="Choose a file..."
                  @change="previewImage"></b-form-file>
              </div>

            </b-row>
            <b-row>
              <b-col sm="7" class="filetop">
                <b-form-group label="Description" :label-cols="3" :horizontal="true">
                  <b-form-textarea v-validate="'required'" name="description" id="basicTextarea" :textarea="true" :rows="3"
                    :cols="25" placeholder="Content.." v-model="user.description"></b-form-textarea>
                  <span class="error" v-if="errors.has('description')">{{errors.first('description')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <br><br><br><br><br><br>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Type" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="type" type="text" id="type" v-model="user.type"></b-form-input>
                  <span class="error" v-if="errors.has('type')">{{errors.first('type')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Certification" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="certification" type="text" id="certification" v-model="user.certification"></b-form-input>
                  <span class="error" v-if="errors.has('certification')">{{errors.first('certification')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Weight" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="weight" type="number" id="weight" v-model="user.weight"></b-form-input>
                  <span class="error" v-if="errors.has('weight')">{{errors.first('weight')}}</span>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Expiry" :label-cols="5" :horizontal="true">


                  <!-- <b-form-input v-validate="'required'" name="expiry" type="date" id="expiry" v-model="user.expiry"></b-form-input> -->

                  <datepicker v-model="user.expiry" name="expiry"></datepicker>
                  <span class="error" v-if="errors.has('expiry')">{{errors.first('expiry')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Warranty" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="warranty" type="number" id="warranty" v-model="user.warranty"></b-form-input>
                  <span class="error" v-if="errors.has('warranty')">{{errors.first('warranty')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Company" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="company" type="text" id="company" v-model="user.company"></b-form-input>
                  <span class="error" v-if="errors.has('company')">{{errors.first('company')}}</span>
                </b-form-group>
              </b-col>

            </b-row>
            <b-row>


            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Quality" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="quality" type="text" id="quality" v-model="user.quality"></b-form-input>
                  <span class="error" v-if="errors.has('quality')">{{errors.first('quality')}}</span>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Manufacturer" :label-cols="5" :horizontal="true">
                  <b-form-input v-validate="'required'" name="manufacturer" type="text" id="manufacturer" v-model="user.manufacturer"></b-form-input>
                  <span class="error" v-if="errors.has('manufacturer')">{{errors.first('manufacturer')}}</span>
                </b-form-group>
              </b-col>

              <b-col sm="4">
                <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Save </b-button>&emsp;&emsp;
                <b-button type="submit" @click="delet" variant="primary"><i class="fa fa-dot-circle-o"></i> delete</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </div>
  </div>
</template>
<script>
  import userService from '@/services/userService.js';
  import config from '@/services/config.js';
  var moment = require('moment')
  // import axios from 'axios'
  export default {
    data() {
      return {
        selected: [],
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
      }
    },
    created() {
      let id = this.$route.params.id;
      userService.getProduct(id)
        .then(res => {
          console.log("sdfgg");
          console.log(res);
          console.log(id)
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
      console.log("hdfged");
      console.log(id,"idvalue");
      //  this.item = data.body;
    },
  }

</script>
<style scoped>
  .error {
    color: red;
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

</style>
