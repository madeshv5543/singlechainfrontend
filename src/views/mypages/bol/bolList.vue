<template>
  <div class="animated fadeIn">

    <b-row>
      <b-col lg="12">
        <bol-table :table-data="items" :fields="fields" @edit-Item="editOrder" @delete-Item="deleteOrder" @view-Item="viewOrder" caption="<i class='fa fa-align-justify'></i> Purchase Orders"></bol-table>
      </b-col>

      
    </b-row><!--/.row-->
  <div>
    <b-modal ref="myModalRef" id="modal-center" centered  hide-footer title="Delete Order">
      <div class="d-block text-center">
        <h3>Are you sure ?</h3>
        <p> Do you really want to delete this loc? This process cannot be undone.</p>
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
import bolTable from '../../base/bolTable.vue'
import userService from '@/services/userService.js';

export default {
  name: 'loclist',
  components: {bolTable},
  data: () => {
    return {
      items: [],
      itemdelete:null,
      fields: [
        {key: 'bolId', label: 'Bill Of Lading', sortable: true},
        {key: 'createdDate', label:'Created Date'},
        {key: 'receiver', label: 'Receiver'},
        {key: 'shipper', label: 'Shipper'},
        {key: 'status', sortable: true},
        {key: 'Action'}
      ],
    }
  },
  methods: {
    getBolList() {
      let self = this;
      userService.getBolList()
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
       name:'EditBol',
       params:{id : item}
     })
    },
    deleteOrder(item) {
     this.itemdelete = item;
     this.showModal()
    },
    viewOrder(item) {
      this.$router.push({
       name:'ViewBol',
       params:{id:item}
     })
    },
    deleteConfirm(){
      let self = this;
      self.hideModal()
      userService.deleteBol(self.itemdelete)
      .then(
        res=> {
          console.log("item delet ", res)
          self.itemdelete = null;
          this.getBolList();
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
    this.getBolList()
  }
}
</script>
