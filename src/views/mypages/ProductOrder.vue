<template>
 <b-col lg="14">
 <b-card>
 <b-form @submit.prevent="onSubmit">
 <b-row>
 <b-col sm="3">
 <b-form-group label="Name" :label-cols="3" :horizontal="true" >
 <span class="adj" >
 <b-form-input name="name" v-validate="'required'" type="text" id="name" placeholder="Enter product name" v-model="user.name" ></b-form-input>
 <span class="error" v-if="errors.has('name')">{{errors.first('name')}}</span>
 </span>
 </b-form-group>
 </b-col>
 <b-col sm="3" >
 <b-form-group label="sku" :label-cols="2" :horizontal="true">
 <b-form-input v-validate="'required'" name="sku" type="text" id="skucode" placeholder="Enter your sku" v-model="user.skucode" ></b-form-input>
 <span class="error" v-if="errors.has('sku')">{{errors.first('sku')}}</span>
 </b-form-group>
 </b-col>
 <b-col sm="2" >
 <b-form-group label="Quantity" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="quantity" type="number" id="quantity" v-model="user.quantity" ></b-form-input>
 <span class="error" v-if="errors.has('quantity')">{{errors.first('quantity')}}</span>
 </b-form-group>
 </b-col>
 <b-col sm="4" >
 <b-form-group label="UOM" :label-cols="3" :horizontal="true">
 <b-form-input v-validate="'required'" name="unit of quantity" type="text" id="unitprice" v-model="user.unitofquantity" ></b-form-input>
 <span class="error" v-if="errors.has('unit of quantity')">{{errors.first('unit of quantity')}}</span>
 </b-form-group>
 </b-col>
 </b-row>
 <b-row>
 <b-col sm="3" >
 <b-form-group label="Price" :label-cols="3" :horizontal="true">
 <b-form-input v-validate="'required'" name="unit price" type="number" id="unitprice" v-model="user.unitprice" ></b-form-input>
 <span class="error" v-if="errors.has('unit price')">{{errors.first('unit price')}}</span>
 </b-form-group>
 </b-col>
 <b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..." @change="previewImage" ></b-form-file>
 <!-- <div class="file">Selected file: {{file && file.name}}</div> -->
 <span class="error" v-if="errors.has('file')">{{errors.first('file')}}</span> 
 <img class="ifdre" v-if="url" :src="url">
 </b-row> 
 <b-row>
 <b-col sm="7">
 <b-form-group label="Description" :label-cols="3" :horizontal="true">
 <b-form-textarea v-validate="'required'" name="description" id="basicTextarea" :textarea="true" :rows="3" :cols="25" placeholder="Content.." v-model="user.description"></b-form-textarea>
 <span class="error" v-if="errors.has('description')">{{errors.first('description')}}</span>
 </b-form-group>
 </b-col>
 </b-row>
 <br><br><br><br><br><br>
 <b-row>
 <b-col sm="4">
 <b-form-group label="Type" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="type" type="text" id="type" v-model="user.type" ></b-form-input>
 <span class="error" v-if="errors.has('type')">{{errors.first('type')}}</span> 
 </b-form-group>
 </b-col>
 <b-col sm="4">
 <b-form-group label="Certification" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="certification" type="text" id="certification" v-model="user.certification" ></b-form-input>
 <span class="error" v-if="errors.has('certification')">{{errors.first('certification')}}</span> 
 </b-form-group>
 </b-col>
 <b-col sm="4">
 <b-form-group label="Weight" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="weight" type="number" id="weight" v-model="user.weight" ></b-form-input>
 <span class="error" v-if="errors.has('weight')">{{errors.first('weight')}}</span> 
 </b-form-group>
 </b-col>
 </b-row> 
 <b-row>
 <b-col sm="4">
 <b-form-group label="Expiry" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="expiry" type="date" id="expiry" v-model="user.expiry" ></b-form-input>
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
 <b-form-input v-validate="'required'" name="company" type="text" id="company" v-model="user.company" ></b-form-input>
 <span class="error" v-if="errors.has('company')">{{errors.first('company')}}</span> 
 </b-form-group>
</b-col>

</b-row>
<b-row>


</b-row>
<b-row>
 <b-col sm="4">
 <b-form-group label="Quality" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="quality" type="text" id="quality" v-model="user.quality" ></b-form-input>
 <span class="error" v-if="errors.has('quality')">{{errors.first('quality')}}</span> 
 </b-form-group>
 </b-col>
 <b-col sm="4">
 <b-form-group label="Manufacturer" :label-cols="5" :horizontal="true">
 <b-form-input v-validate="'required'" name="manufacturer" type="text" id="manufacturer" v-model="user.manufacturer" ></b-form-input>
 <span class="error" v-if="errors.has('manufacturer')">{{errors.first('manufacturer')}}</span> 
 </b-form-group>
 </b-col>
 </b-row>
 <b-button type="submit" variant="primary">Save </b-button>
 </b-form> 
 </b-card>
 </b-col>
</template>
<script>
import axios from 'axios'
export default {
 data () {
 return {
 selected: [],
 show: true,
 url: '',
 file: '',
 submitted: false,
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
 }
 }
 },
 methods: {
 previewImage: function (event) {
 this.fname = event.target.files[0]
 this.url = URL.createObjectURL(this.fname)
 this.user.image = this.fname.name
 },
 onSubmit() {
 this.submitted = true;
 this.$validator.validate().then(valid => {
 if (valid) {
 var app= this
 var formData = new FormData()
 formData.append('name', this.user.name)
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
 formData.append('quantity', this.user.quantity)
 formData.append('expiry', this.user.expiry)
 formData.append('skucode', this.user.skucode)
 formData.append('urlimg', this.fname)
 axios.post("http://localhost:3000/api/productOrder", formData, { headers: { "Content-Type": "multipart/form-data" } })
 .then(res => {
 this.$toasted.show(' product saved', { 
 fullWidth:false,
 theme: "outline", 
 position: "bottom-right", 
 duration : 5000,
 fitToScreen: true
 })
 app.$router.push('/list')
 }).catch (function(){
 console.log('error when uploading')
 })
 //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
 } 
 });
 }
 }
} 
</script>
<style scoped>
.error {
 color:red
}
.ifdre{
 height: 35% !important;
 padding-left: 2%;
 width: 20% !important;
 float: right;
 padding-bottom: 3%;
}
.custom-file {
 position: relative;
 margin-left: 1%;
 /* padding-left: 91px; */
 display: inline-block;
 width: 40%;
 height: calc(2.0625rem + 2px);
 margin-bottom: 5%;
}
textarea.form-control {
 height: 211%;
}
</style>