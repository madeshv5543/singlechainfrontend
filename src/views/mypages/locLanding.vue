<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card>
          <b-row>
            <b-col md="6">
              <p>Content Area</p>
            </b-col>
            <b-col md="6">
              <div>
                <router-link to="/loclist"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-list"> LC List</i></b-button></router-link>
              </div>
              <br>
              <div>
               <router-link to="/newLoc"> <b-button type="button" size="md" variant="primary"> <i class="fa fa-plus"> Create A New LC</i></b-button> </router-link> 
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
    name: 'loclanding',
    data: () => {
        return {

        }
    },
    methods: {}
  }

</script>
<style>

</style>
