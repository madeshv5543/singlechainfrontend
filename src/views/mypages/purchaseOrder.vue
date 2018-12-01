<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <c-table :table-data="items" :fields="fields" @edit-Item="editOrder" @delete-Item="deleteOrder" @view-Item="viewOrder" caption="<i class='fa fa-align-justify'></i> Purchase Orders"></c-table>
      </b-col>

      
    </b-row><!--/.row-->
  <div>
    <b-modal ref="myModalRef" id="modal-center" centered  hide-footer title="Delete Order">
      <div class="d-block text-center">
        <h3>Are you sure ?</h3>
        <p> Do you really want to delete this order? This process cannot be undone.</p>
      </div>
      <div style="text-align:center"> 
      <b-btn style="margin:3px" class="mt-3" variant="plain"  @click="hideModal">Canlcel</b-btn>
       <b-btn class="mt-3" variant="danger"  @click="deleteConfirm()">Delete</b-btn>
      </div>
    </b-modal>
  </div>
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
      items: [],
      itemdelete:null,
      fields: [
        {key: 'orderId', label: 'Order', sortable: true},
        {key: 'createdDate', label:'Created Date'},
        {key: 'seller', label: 'Seller'},
        {key: 'status', sortable: true},
        {key: 'orderAction'}
      ],
    }
  },
  methods: {
    getOrderList() {
      let self = this;
      userService.getOrders()
      .then(
        res => {
         if(res.status === 200) {
           self.items = res.data;
         }
        },
        err => {
          console.log("error on get the order list")
        }
      )
    },
    editOrder(item) {
     this.$router.push({
       name:'EditOrder',
       params:{id:item}
     })
    },
    deleteOrder(item) {
     this.itemdelete = item;
     this.showModal()
    },
    viewOrder(item) {
      this.$router.push({
       name:'ViewOrder',
       params:{id:item}
     })
    },
    deleteConfirm(){
      let self = this;
      self.hideModal()
      userService.deleteOrder(self.itemdelete)
      .then(
        res=> {
          console.log("item delet ", res)
          self.itemdelete = null;
          this.getOrderList();
        },
        err => {
          console.log("item delet  errror", res)
        }
      )
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    }
  },
  created: function() {
    this.getOrderList()
  }
}
</script>
