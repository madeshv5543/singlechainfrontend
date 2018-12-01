<template>
  <b-card :header="caption">
    <b-table :dark="dark"  :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage">
      <template slot="Action" slot-scope="data">
        <b-button type="button" @click="$emit('edit-Item', data.item)" size="sm" variant="primary"><i class="fa fa-pencil-square-o"></i></b-button>
         <b-button type="button" class="btnm" @click="$emit('delete-Item', data.item)" size="sm" variant="primary"><i class="fa fa-trash"></i></b-button>
        <!-- <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge> -->
      </template>
      <template slot="status" slot-scope="data" >
       <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="orderAction" slot-scope="data">
        <b-button v-if="isBuyser && enabeledit(data.item)" type="button" @click="$emit('edit-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-pencil-square-o"></i></b-button>
        <b-button v-if="isBuyser && enabeledit(data.item)" class="btnm" type="button" @click="$emit('delete-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-trash"></i></b-button>
        <b-button type="button" @click="$emit('view-Item', data.item._id)" size="sm" variant="primary"><i class="fa fa-eye"></i></b-button>
        <!-- <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge> -->
      </template>
      <template slot="seller" slot-scope="data">
        {{getData(data)}}
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
  name: 'c-table',
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
      return : 'Return'
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
    }
  },
  methods: {
    enabeledit(item) {
      return (item.status === this.pending || item.status === this.return);
    },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getData(data) {
       return data.item.seller.username
    },
    getRowCount: function () {
      return this.items.length
    },
    itemclicked: function(item){
      console.log("clicked tem", item)
    }
  }
}
</script>
<style scoped>
.btnm{
  margin: 2px
}
</style>

