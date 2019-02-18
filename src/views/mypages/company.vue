<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
           
          <div slot="header">
            <strong>company Details</strong> 
          </div>
          <b-row>
             
            <b-col sm="4">
              
              <b-form-group>
                <label for="email">email</label>
                <b-form-input type="text" id="email" placeholder="Enter your email"></b-form-input>
              </b-form-group>
            </b-col>
        
            <b-col sm="4">
             <b-form-group>
 <label for="document type">account type</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['individual','company']"
              value="company">
            </b-form-select>
          </b-form-group>
            </b-col>

             <b-col sm="4">

                    <b-form-group>
                <label for="companyname">companyname</label>
                <b-form-input type="text" id="companyname" placeholder="enter company"></b-form-input>
              </b-form-group>
      
            </b-col>
         
            
          </b-row>
          <b-row>
          <b-col sm="6">
              <b-form-group>
                <label for="address1">Address</label>
                <b-form-input type="text" id="address" placeholder=" address1"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="6">
               
                <b-form-group>
                <label for="regnu">register number</label>
                <b-form-input type="number" id="regnu" placeholder="enter number"></b-form-input>
              </b-form-group>
            </b-col>
            

               
          </b-row>


          <b-row>
 <b-col sm="4">
  <b-form-group>
 <label for="country origin">country of origin</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['korea','India']"
              value="India">
            </b-form-select>
          </b-form-group>
</b-col>

<b-col sm="4">

 <b-form-group>
                <label for="phonenumber">phonenumber</label>
                <b-form-input type="number" id="phonenumber" placeholder="Enter your number"></b-form-input>
              </b-form-group>
</b-col>
<b-col sm="4">

 <b-form-group>
                <label for="password">password</label>
                <b-form-input type="password" id="password" ></b-form-input>
              </b-form-group>
</b-col>
          </b-row>

             <b-row>
          


          


    

    

      

<b-col sm="10">
</b-col>
 <b-col sm="2">
<b-button  block variant="success" class="btn-pill">submit</b-button>
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
