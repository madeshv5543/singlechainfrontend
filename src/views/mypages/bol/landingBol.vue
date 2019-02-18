<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card>
          <b-row>
            <b-col md="6">
              <img  class="lcimg" :src="onboardImg">
            </b-col>
            <b-col md="6" class="barc">
              <div class="vc">
                <div>
                  <router-link to="/bolList"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-list"> BOL List</i></b-button></router-link>
                </div>
                <br>
                <div>
                <router-link to="/createBol"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-plus"> Create A New BOL</i></b-button> </router-link> 
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
    name: 'landingBol',
    props:{
      onboardImg: {
        type: String,
        default: require('@/assets/lconboard.jpg')
      },
    },
    data : () => {
        return {

        }
    },
    methods: {}
}
</script>


<style>
.barc{
    margin: 20px 0;
    padding: 40px;
}
.lcimg{
  width: 100%
}
</style>
