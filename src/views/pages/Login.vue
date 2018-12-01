<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="loginuser()" novalidate>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                 <div v-if="showerr">
                  <b-alert show variant="danger">{{errmsg}}</b-alert>
                </div>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>   <b-input-group-text>@</b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control"  v-validate="'required'" name="email" :state="!errors.has('email')" v-model="user.email" placeholder="Email" autocomplete="email" />
                 <b-form-invalid-feedback>
                  {{errors.first('email')}}
                </b-form-invalid-feedback>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control"   v-validate="'required'" name="password" :state="!errors.has('password')"  v-model="user.password" placeholder="Password" autocomplete="current-password" />
                <b-form-invalid-feedback>
                  {{errors.first('password')}}
                </b-form-invalid-feedback>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                     <b-button type="submit" variant="success" block>Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <router-link to="/register"> <b-button variant="primary" class="active mt-3">Register Now!</b-button> </router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import auth from '../../services/authservice.js';
import utils from '@/services/utils.js';
export default {
  name: 'Login',
  data(){
    return {
      user:{},
      showerr:false,
      errmsg:null
    }
  },
  methods: {
    loginuser:async function() {
      console.log("lgoin called")
      let self = this;
      self.showerr = false;
      self.errmsg ="";
      let checkform = await self.$validator.validateAll()
      if(!checkform) {
          return ;
      }
      auth.Login(self.user)
      .then( res => {
       if(res.status != 200) {
         self.showerr = true;
         self.errmsg = res.message;
       }else{
         console.log("res",res)
         utils.saveToken(res.token, JSON.stringify(res.data))
          self.$router.push({ name: "Dashboard" })
       }
      },
      err => {
        if(err.message) {
              self.showerr = true;
              self.errmsg = err.message;
        }else{
              self.showerr = true;
              self.errmsg = 'Something Went wrong. Please try after sometime.';
        }
       
      })
    }
  }
}
</script>
