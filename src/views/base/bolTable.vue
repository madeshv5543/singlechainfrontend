<template>
  <b-card :header="caption">
    <b-table :dark="dark"  :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage">

      <template slot="status" slot-scope="data" >
       <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="Action" slot-scope="data">
        <b-button v-if="enabeledit(data.item) && isOwner(data.item)" type="button" @click="$emit('edit-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-pencil-square-o"></i></b-button>
        <b-button  v-if="enabeledit(data.item) && isOwner(data.item)" class="btnm" type="button" @click="$emit('delete-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-trash"></i></b-button>
        <b-button type="button" @click="$emit('view-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-eye"></i></b-button>
        <!-- <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge> -->
      </template>
      <template slot="shipper" slot-scope="data">
        {{getData(data.item.shipper)}}
      </template>
      <template slot="receiver" slot-scope="data">
          {{getData(data.item.receiver)}}
        </template>
            <template slot="createdDate" slot-scope="data">
        {{data.item.createdDate | moment("DD-MM-YYYY") }}
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
import jwtService from '@/services/utils.js'
export default {
  name: 'bol-table',
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentPage: 1,
      pending:'Pending',
      return : 'Return',
      newStatus : 'New',
      user:{}
    }
  },
  computed: {
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields },
    isBuyser: function() {
      return jwtService.isBuyer()
    },
  },
  methods: {
    enabeledit(item) {
      return (item.status === this.newStatus || item.status === this.return);
    },
    getUserData() {
      this.user = jwtService.getUSer()
    },
    isOwner: function(item){
      if(Object.keys(this.user).length){
        return this.user.email === item.shipper.email 
      }else{
        return false
      }
    },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
        :status === 'New' ? 'warning'
          : status === 'Pending' ? 'warning'
          : status === 'Return' ? 'secondary'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getData(data) {
       return data.username
    },

    getRowCount: function () {
      return this.items.length
    },
    itemclicked: function(item){
      console.log("clicked tem", item)
    }
  },
  created: function(){
    this.getUserData()
  }
}
</script>
<style scoped>
.btnm{
  margin: 2px
}
</style>

