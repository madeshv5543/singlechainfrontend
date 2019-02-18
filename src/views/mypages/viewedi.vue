<template>
  <div class="animated fadeIn">
<b-card>
<div class="row">
 <div class="col-md-12">
    <!--/.row-->
</div>
</div>

</b-card>
  
  </div>
</template>
<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '../base/Table.vue'
import userService from '@/services/userService.js';



export default {
  name: 'tables',
  components: {cTable},
  data: () => {
    return {
      
    }
  },
  methods: {
  
 
   
   
  
    
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  },
  created: function() {
    this. getproductList()
  }
}
</script>
