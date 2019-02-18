<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-form @submit.prevent="update()">
          <b-card>
            <div slot="header">
              <strong>My Profile</strong>
            </div>
            <b-alert v-if="succesmsg" variant="success" show>User details updated successfully.</b-alert>
            <b-row v-if="user">
              <b-col md="6">
                <b-form-group>
                  <label for="company">name</label>
                  <b-form-input type="text"  v-validate="'required'" :state="!errors.has('username')" 
                    name="username"  id="username" v-model="user.username" ></b-form-input>
                </b-form-group>
              </b-col>
             
           
              <b-col md="6">
                <b-form-group>
                  <label for="phonenumber">Phone Number</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('phonenumber')" id="phonenumber"
                    name="phonenumber" v-model="user.phoneNumber"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('phonenumber')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="address">Address</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('address')" id="address" name="address"
                    v-model="user.address"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('address')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="city">City</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('city')" id="city" name="city"
                    v-model="user.city"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('city')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="pincode">Postal code</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('pincode')" id="pincode" name="pincode"
                    v-model="user.pincode"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('pincode')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="country">Country</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('country')" id="country" name="country"
                    v-model="user.country"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('country')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
             <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="state">state</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('state')" id="state" name="state"
                    v-model="user.state"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('state')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="address2">address2</label>
                  <b-form-input type="text" v-validate="'required'" :state="!errors.has('address2')" id="address2" name="address2"
                    v-model="user.address2"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('address2')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>


             <b-row>
              <b-col md="4">
               <b-form-group>
 <label for="document type">Document type</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['Pan card','Aadhar card', 'passport']"
              value="Pan card"
              
               v-validate="'required'" :state="!errors.has('basicSelect')" 
                    name="basicSelect" v-model="user.basicSelect1">
            </b-form-select>
                 <b-form-invalid-feedback>
                    {{errors.first('basicSelect')}}
                  </b-form-invalid-feedback>
          </b-form-group>
              </b-col>
              <b-col md="4">
                 <b-form-group>
                <label for="document type">Document file type</label>
            <b-form-file name="file2" id="file2" v-model="user.file2" :state="!errors.has('file2')"  placeholder="Choose a file..."
            @change="previewImage"></b-form-file>
                 <b-form-invalid-feedback>
                    {{errors.first('file2')}}
                  </b-form-invalid-feedback>
              </b-form-group>
              </b-col>
   <b-col md="4">
               <b-form-group>
                <label for="document type">Document number</label>
                <b-form-input type="number" id="number2" placeholder="number"
                
                 v-validate="'required'" :state="!errors.has('number2')" 
                    name="number2" v-model="user.number2" ></b-form-input>
                         <b-form-invalid-feedback>
                    {{errors.first('number2')}}
                  </b-form-invalid-feedback>
              </b-form-group>
               </b-col>
            </b-row>

             <b-row>
              <b-col md="4">
               <b-form-group>
 <label for="document type">Document type</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['Pan card','Aadhar card', 'passport']"
              value="Pan card"
              
               v-validate="'required'" :state="!errors.has('basicSelect')" 
                    name="basicSelect" v-model="user.basicSelect2">
            </b-form-select>
                 <b-form-invalid-feedback>
                    {{errors.first('basicSelect')}}
                  </b-form-invalid-feedback>
          </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                <label for="document type">Document file type</label>
            <b-form-file name="file2" id="file2" v-model="user.file2" :state="!errors.has('file2')"  placeholder="Choose a file..."
            @change="previewImage1"></b-form-file>
                 <b-form-invalid-feedback>
                    {{errors.first('file2')}}
                  </b-form-invalid-feedback>
              </b-form-group>
              </b-col>
   <b-col md="4">
               <b-form-group>
                <label for="document type">Document number</label>
                <b-form-input type="number" id="number2" placeholder="number"
                
                 v-validate="'required'" :state="!errors.has('number2')" 
                    name="number2" v-model="user.number3" ></b-form-input>
                         <b-form-invalid-feedback>
                    {{errors.first('number2')}}
                  </b-form-invalid-feedback>
              </b-form-group>
               </b-col>
            </b-row>
            <!-- <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="blockchainHost">Blackchain Host</label>
                  <b-form-input type="text" v-validate="'url:require_protocol|required'" :state="!errors.has('blockchainHost')"
                    id="blockchainHost" name="blockchainHost" v-model="user.blockchainHost"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('blockchainHost')}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="blockchainExplore">Blackchain Explore</label>
                  <b-form-input type="text" v-validate="'url:require_protocol|required'" :state="!errors.has('blockchainExplore')"
                    id="blockchainExplore" name="blockchainExplore" v-model="user.blockchainExplore"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('blockchainExplore')}}
                  </b-form-invalid-feedback>
                  <b-form-text id="inputFormatterHelp">
                    ex: https://etherscan.io/tx/
                  </b-form-text>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                  <b-col md="12">
              <b-form-group>
                <label for="contractAddress">Contract Address</label>
                <b-form-input type="text" v-validate="'required'" :state="!errors.has('contractAddress')"
                  id="contractAddress" name="contractAddress" v-model="user.contractAddress"></b-form-input>
                <b-form-invalid-feedback>
                  {{errors.first('contractAddress')}}
                </b-form-invalid-feedback>
                <b-form-text id="inputFormatterHelp">
                  ex: '0xd747dbfffa2e806ee769a67cc627428c61de5942'
                </b-form-text>
              </b-form-group>
              </b-col>
            </b-row> -->
            <div slot="footer" style="text-align:center">
              <b-button type="submit" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i> save</b-button>
              <!-- <b-button type="reset" size="md" variant="danger"><i class="fa fa-ban"></i> Reset</b-button> -->
            </div>
          </b-card>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
 import userService from '@/services/userService.js';
  var moment = require('moment')
  import axios from 'axios'
  export default {
    name: 'profile',
    data() {
      return {

         user: {
          username: '',
          city: '',
          country: '',
          state: '',
          phonenumber: '',
          address: '',
          address1: '',
          
        },
        // user: {},
        showerr: false,
        errmsg: null,
        succesmsg: false,
        loading: false,
        succmsg: '',
        invalidFeedBack: "Require first name"
      }
    },
     methods: {



          delet(params){let id = this.$route.params.id;
   
      // let path2='/deletelist/'+ params
      //  console.log(path2)
      
    var app= this
        var formData = new FormData();
   formData.delete(params)
    
        formData.delete('weight',this.user.weight)
        formData.delete('description',this.user.description)
        formData.delete('warranty',this.user.warranty)
        formData.delete('quality',this.user.quality)
        
        formData.delete('manufacturer',this.user.manufacturer)

         formData.delete('type',this.user.type)
          formData.delete('certification',this.user.certification)
           formData.delete('unitofquantity',this.user.unitofquantity)
 formData.delete('company',this.user.company)
  formData.delete('quantity',this.user.quantity)
  formData.delete('expiry',this.user.expiry)
   formData.delete('skucode',this.user.skucode)
     formData.delete('urlimg',this.fname)
       formData.delete('image',this.urlimage)
     console.log(this.fname)
console.log(this.user.name)
   
      console.log(id)    

       userService.deleteProduct (id, formData)
//     const url3 = "http://localhost:3000/api/remove/" + id;
//     axios.post(url3,formData,{ headers: {"Content-Type": "multipart/form-data"
//           }
// })
    .then(res => {
   app.$router.push("/list");

        console.log("sdfgg");
      console.log(res);
window.location.reload()
    this.$toasted.show(' Details removed',{ 
              
                 fullWidth:false,
                 theme: "outline", 
                 position: "bottom-right", 
                 duration : 5000
                 
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
            formData.append('username', this.user.username)
            formData.append('phoenNumber', this.user.phoneNumber)
            formData.append('address', this.user.address)
            formData.append('address2', this.user.address2)
            formData.append('city', this.user.city)
            formData.append('country', this.user.country)
            formData.append('state', this.user.state)
            formData.append('basicSelect1', this.user.basicSelect1)
            formData.append('basicSelect2', this.user.basicSelect2)
            formData.append('pincode', this.user.pincode)
            formData.append('number2', this.user.number2)
            formData.append('number3', this.user.number3)
            // formData.append('quantity', this.user.quantity)
            // formData.append('expiry', this.user.expiry)
            // //formData.append('price', this.user.price)
            // formData.append('skucode', this.user.skucode)
            // formData.append('urlimg', this.fname)
          console.log(formData);
            let id = this.$route.params.id;
            const urll = "http://localhost:3000/api/updateUser/" + id;
                    axios.post(urll,formData,{ headers: {"Content-Type": "multipart/form-data"
          }
    })
              .then(res => {    this.$router.push("/list");
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
  //  const status = JSON.parse(window.localStorage.getItem("User"));
  //  var token = status.token;
    const url2 = "http://localhost:3000/api/User/" + id;
    axios.get(url2 )
     
    // var token = status.token;

   
      .then(response => {
        console.log("sdfgg");
        console.log(response);
        console.log(id)
        this.user = response.data;
        this.user.username = response.data.data.username;
        this.user.city = response.data.data.city;
        this.user.country = response.data.data.country;
        this.user.state = response.data.data.state;
        this.user.phoneNumber = response.data.data.phoneNumber;
        this.user.address = response.data.data.address;
  this.user.basicSelect1 = response.data.data.basicSelect1;
  this.user.basicSelect2 = response.data.data.basicSelect2;
        this.user.address2 = response.data.data.address2;
   this.user.pincode = response.data.data.pincode;
           this.user.number2 = response.data.data.number2;
              this.user.number3 = response.data.data.number3;
              
        // this.user.skucode = res.data.skucode;
        // this.user.weight = res.data.weight;
        // this.user.warranty = res.data.warranty;
        // this.user.expiry = moment(res.data.expiry).format("MM/DD/YYYY ")
        // this.user.image = res.data.image;
        // this.url2 = ' http://localhost:3000/static/img/' + this.user.image
        this.user.manufacturer = res.data.manufacturer;
        this.user.description = res.data.description;
        this.user.unitprice = res.data.unitprice;
      });
  
      console.log("hdfged");
      // console.log(response.data.data)
      console.log(id);
      //  this.item = data.body;
    },
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

</style>
