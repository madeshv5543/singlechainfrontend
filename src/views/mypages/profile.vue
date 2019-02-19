<template>
  <div class="animated fadeIn">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#5dc596" :is-full-screen="true" />
    <b-row>
      <b-col md="12">
        <b-form @submit.prevent="updateUser()">
          <b-card>
            <div slot="header">
              <strong>My Profile</strong>
            </div>
            <b-alert v-if="succesmsg" variant="success" show>User details updated successfully.</b-alert>
            <b-row v-if="user">
              <b-col md="6">
                <b-form-group>
                  <label for="company">Email</label>
                  <b-form-input type="text" id="company" v-model="user.email" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label for="accountType">AccountType</label>
                  <b-form-input type="text" id="accountType" v-model="user.accountType" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label for="firstname">Organization</label>
                  <b-form-input v-validate="'required'" :state="!errors.has('orgName')" type="text" id="orgName"
                    name="orgName" v-model="user.orgName"></b-form-input>
                  <b-form-invalid-feedback>
                    {{errors.first('orgName')}}
                  </b-form-invalid-feedback>
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
                    v-model="user.physicalAddress"></b-form-input>
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
              <b-button type="submit" size="md" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
  export default {
    name: 'profile',
    data() {
      return {
        user: {},
        showerr: false,
        errmsg: null,
        succesmsg: false,
        loading: false,
        succmsg: '',
        invalidFeedBack: "Require first name"
      }
    },
    methods: {
      async updateUser() {
        console.log("update user")
        let self = this;
        self.showerr = false;
        self.errmsg = "";
        self.loading = true;
        let checkform = await self.$validator.validateAll()
        if (!checkform) {
          self.loading = false
          return;
        }
        userService.updateUser(self.user)
          .then(
            res => {
              self.loading = false;
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.succesmsg = true;
                self.succmsg = 'User Details Update Succesfully'
              }
            },
            err => {
              self.loading = false
              this.errhandler(err)
            }
          )
      },
      errhandler(err) {
        let self = this;
        if (err.message) {
          self.showerr = true;
          self.errmsg = err.message;
        } else {
          self.showerr = true;
          self.errmsg = 'Something Went wrong. Please try after sometime.';
        }
      },
      getUserDetails() {
        let self = this;
        self.showerr = false;
        self.errmsg = "";
        userService.getUser()
          .then(
            res => {
              if (res.status != 200) {
                self.showerr = true;
                self.errmsg = res.message;
              } else {
                self.user = res.data
              }
            },
            err => {
              this.errhandler(err)
            }
          )
      }
    },
    created: function () {
      this.getUserDetails()
    }
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
