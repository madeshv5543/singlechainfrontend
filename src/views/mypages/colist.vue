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
                <label for="companyname">companyname</label>
                <b-form-input type="text" id="companyname" placeholder="enter company"></b-form-input>
              </b-form-group>
      
            </b-col>
          <b-col sm="4">

                    <b-form-group>
                <label for="regnum">regnumber</label>
                <b-form-input type="number" id="regnumber" placeholder="enter number"></b-form-input>
              </b-form-group>
      
            </b-col>
         
            
          </b-row>
          <b-row>
          <b-col sm="6">
              <b-form-group>
                <label for="address">Address</label>
                <b-form-input type="text" id="address" placeholder="Enter  address"></b-form-input>
              </b-form-group>
            </b-col>
             <b-col sm="3">
               <b-form-group>
 <label for="country origin">country of origin</label>
        
            <b-form-select id="basicSelect"
              
              :plain="true"
              :options="['korea','India']"
              value="India">
            </b-form-select>
          </b-form-group>
            </b-col>
            

                 <b-col sm="3">
               
                <b-form-group>
                <label for="phnu">phone number</label>
                <b-form-input type="number" id="phnu" placeholder="Enter your number"></b-form-input>
              </b-form-group>
            </b-col>
            
          </b-row>


 



          

             <b-row>
          


          


    

    

      

<b-col sm="10">
</b-col>
 <b-col sm="2">
<b-button  block variant="success" class="btn-pill">Update</b-button>
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
