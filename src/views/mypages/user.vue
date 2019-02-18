<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
           
          <div slot="header">
            <strong> Details</strong> 
          </div>
          <b-row>
             
            <b-col sm="4">
              
              <b-form-group>
                <label for="firstname">Firstname</label>
                <b-form-input type="text" id="firstname" placeholder="Enter your name"></b-form-input>
              </b-form-group>
            </b-col>
        
            <b-col sm="4">
              <b-form-group>
                <label for="lastname">Lastname</label>
                <b-form-input type="text" id="lastname" placeholder="Enter your name"></b-form-input>
              </b-form-group>
            </b-col>

             <b-col sm="4">

                    <b-form-group>
                <label for="number">Phone number</label>
                <b-form-input type="number" id="number" placeholder="number"></b-form-input>
              </b-form-group>
      
            </b-col>
         
            
          </b-row>
          <b-row>
          <b-col sm="6">
              <b-form-group>
                <label for="address">Address</label>
                <b-form-input type="text" id="address" placeholder="Enter your address1"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="6">
               
                <b-form-group>
                <label for="address">Address</label>
                <b-form-input type="text" id="address" placeholder="Enter your address2"></b-form-input>
              </b-form-group>
            </b-col>
            

               
          </b-row>


          <b-row>
 <b-col sm="4">

 <b-form-group>
                <label for="country">city</label>
                <b-form-input type="text" id="country" placeholder="Enter your city"></b-form-input>
              </b-form-group>
</b-col>

<b-col sm="4">

 <b-form-group>
                <label for="country">country</label>
                <b-form-input type="text" id="country" placeholder="Enter your country"></b-form-input>
              </b-form-group>
</b-col>
<b-col sm="4">

 <b-form-group>
                <label for="country">state</label>
                <b-form-input type="text" id="country" placeholder="Enter your state"></b-form-input>
              </b-form-group>
</b-col>
          </b-row>

             <b-row>
          


             <b-col sm="4">


<b-form-group>
 <label for="document type">Document type</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['Pan card','Aadhar card', 'passport']"
              value="Pan card">
            </b-form-select>
          </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

       <b-col sm="4">


   <b-form-group>
                <label for="document type">Document file type</label>
           <b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> 
              </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

       <b-col sm="4">


   <b-form-group>
                <label for="document type">Document number</label>
                <b-form-input type="number" id="firstname" placeholder="number"></b-form-input>
              </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

       <b-col sm="4">
<b-form-group>
 <label for="document type">Document type</label>
          <!-- <   label="Document type"
            label-for="basicSelectLg"
            :label-cols="3"
            :horizontal="true"> -->
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['Pan card','Aadhar card', 'passport']"
              value="Pan card">
            </b-form-select>
          </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

       <b-col sm="4">


   <b-form-group>
                <label for="document type">Document  file type</label>
               <b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> 
              </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

       <b-col sm="4">


   <b-form-group>
                <label for="document type">Document number</label>
                <b-form-input type="number" id="firstname" placeholder="number"></b-form-input>
              </b-form-group>
                   <!-- <label for="country">state</label>
<b-form-file v-validate="'required'" name="file" v-model="file" :state="Boolean(file)" placeholder="Choose a file..."
            @change="previewImage"></b-form-file> -->
</b-col>

<b-col sm="10">
</b-col>
 <b-col sm="1">
<b-button  block variant="success" class="btn-pill">save</b-button>
               </b-col>
          </b-row>
         
        </b-card>
            
        
      </b-col>


    </b-row>

 
  
  
  </div>
</template>



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
