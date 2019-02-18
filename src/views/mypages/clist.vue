<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table :table-data="items" :fields="fields" caption="<i class='fa fa-align-justify'></i> Simple Table"></c-table>
      </b-col>

     
    </b-row><!--/.row-->

   

   
    
  </div>

</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '../base/Table.vue'

const someData = () => shuffleArray([
])

export default {
  name: 'tables',
  components: {cTable},
  data: () => {
    return {
      items: someData,
      itemsArray: someData(),
      fields: [
        {key: 'username', label: 'Email', sortable: true},
        {key: 'companyname'},
        {key: 'regno.'},
         {key: 'origin'},
          {key: 'phone number.', sortable: true},
           
       
      ],
    }
  }
}
</script>
s