<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col md="12">
        <b-card>
            <b-row>
          <b-col md="6"> <p>Content area</p></b-col>
          <b-col md="6">
              <div>
              <router-link to="/purchaseOrderList"> 
                <b-button type="button" size="md"  variant="primary"><i class="fa fa-list-alt"></i> Purchase Order List</b-button> </router-link>
              </div>
               <br>
               <div>
               <router-link to="/newOrder"> <b-button type="button" size="md"  variant="primary"><i class="fa fa-plus"></i> Create New Purchase Order</b-button></router-link>
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
    name: 'polanding',
    data: () => {
      return {

      }
    },
    methods: {}
  }

</script>
