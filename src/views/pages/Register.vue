<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card v-if="proceseStage === 1" no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="register()">
                <h1 class="sedtxt">Register</h1>
                <p class="text-muted sedtxt">Create your account</p>
                <div v-if="showerr">
                  <b-alert show variant="danger">{{errmsg}}</b-alert>
                </div>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" name="username"  :state="!errors.has('username')" v-validate="'required'" class="form-control" v-model="newUser.username" placeholder="Username"
                    autocomplete="username" />
                <b-form-invalid-feedback>
                  {{errors.first('username')}}
                </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="email" name="email" :state="!errors.has('email')" v-validate="'required|email'" class="form-control" v-model="newUser.email" placeholder="Email"
                    autocomplete="email" />
                <b-form-invalid-feedback>
                  {{errors.first('email')}}
                </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" ref="password" name="password" :state="!errors.has('password')" v-validate="'required'" class="form-control" v-model="newUser.password" placeholder="Password"
                     />
                <b-form-invalid-feedback>
                  {{errors.first('password')}}
                </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" :state="!errors.has('confirmPassword')" name="confirmPassword" v-validate="'required|confirmed:password'" class="form-control" v-model="newUser.confirmPassword" placeholder="Repeat password"
                    />
                <b-form-invalid-feedback>
                  {{errors.first('confirmPassword')}}
                </b-form-invalid-feedback>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select id="basicSelect" :state="!errors.has('accountType')" name="accountType" v-validate="'required'" :plain="true" v-model="newUser.accountType" :options="['Seller', 'Buyer', 'Banker']">
                  </b-form-select>
                <b-form-invalid-feedback>
                  {{errors.first('accountType')}}
                </b-form-invalid-feedback>
                </b-input-group>


                <b-button type="submit" variant="success" block>Create Account</b-button>
                <br>
                <p class="lgbtn">Already hava a account ? <router-link to="/login">Login</router-link>
                </p>

              </b-form>
            </b-card-body>

          </b-card>
          <b-card v-if="proceseStage === 2">
            <b-card-body class="p-4">
              <h1 class="sedtxt">Seed</h1>
              <h4 class="text-muted sedtxt">These 12 words are the only way to redtore your account. Save them somewhere safe and secret </h4>

              <div class="seedbox">
                <p class="seedwords">{{seed}}</p>
              </div>
              <br>
              <div>
                <b-button type="button"  @click="downloadFile()" variant="success" block>Download As File</b-button>
               <b-button type="button"  @click="signupsucces()" variant="success" block>I Saved Continue</b-button>
              </div>


            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import auth from '../../services/authservice.js'
  import utils from '@/services/utils.js';
  export default {
    name: 'Register',
    data() {
      return {
        newUser: {
          accountType: 'Seller'
        },
        proceseStage: 1,
        seed:null,
        showerr: false,
        errmsg: null
      }
    },
    methods: {
       register : async function () {
        let self = this;
        self.showerr = false;
        self.errmsg = "";
        let checkform = await self.$validator.validateAll()
        if(!checkform) {
          return ;
        }
        auth.RegisterUser(this.newUser)
          .then(res => {
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.proceseStage = 2
                self.data = res.data
                self.seed = res.seed
                utils.saveToken(res.token, JSON.stringify(res.data))
              }
            },
            err => {
              if (err.message) {
                self.showerr = true;
                self.errmsg = err.message;
              } else {
                self.showerr = true;
                self.errmsg = 'Something Went wrong. Please try after sometime.';
              }
            })
      },
      downloadFile() {
          let self = this;
          const filename = `${new Date().getTime()}seed.txt`
          const element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(self.seed));
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
      },
      signupsucces() {
          this.$router.push({
              name: 'Dashboard'
          })
      }
    }
  }

</script>
<style scoped>
  .lgbtn {
    text-align: center
  }

  .sedtxt {
    text-align: center
  }

  .seedbox {
        height: 150px;
        background: #e8e4e4;
        box-shadow: 4px 3px #d0c8c8;
        padding: 50px;
    }

    .seedwords{
      font-weight: bold;
      font-size: 16px
    }


</style>
