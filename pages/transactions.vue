<template>
  <v-layout>
    <v-flex class="text-center">
      <v-row class="justify-lg-center">
        
      <v-skeleton-loader
        :loading="reload"
        type="chip"

      >
 <v-chip
      class="ma-2 title"
      color="blue"
      text-color="white"
    >
      {{transactCount}} 
</v-chip>
-
</v-skeleton-loader>
   
    <v-skeleton-loader
        :loading="reload"
        type="chip"
        

      >
 <v-chip
      class="ma-2 title"
      color="red"
      text-color="white"
    >
      {{transactCountWorkers}} 
</v-chip>
=
    </v-skeleton-loader>
    
    <v-skeleton-loader
        :loading="reload"
        type="chip"

      >
<v-chip
  class="ma-2 title"
  color="green"
  text-color="white"
>

{{totalAmount}}

</v-chip>
</v-skeleton-loader>
      </v-row>
<v-row>
    <v-col class="d-flex" cols="12" sm="3">
        <v-select
          :items="PJCCtransactionss"
          item-text='client_id'
          item-value='client_id'
          label="Outlined style"
          outlined
        ></v-select>
      </v-col>


      <v-col cols="12" sm="6" md="2">
      <v-skeleton-loader
        :loading="reload"
        type="date-picker-options"
      >
      
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="startDate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="startDate"
            label="Picker in menu"
            prepend-icon=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker v-model="startDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="reload = !reload, $refs.menu.save(startDate), updateTransaction()">OK</v-btn>
        </v-date-picker>
     
      </v-menu>
      </v-skeleton-loader>
    </v-col>

     <v-col cols="12" sm="6" md="2">
                     <v-skeleton-loader
        :loading="reload"
        type="date-picker-options"

      >
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="endDate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endDate"
            label="Picker in menu"
            prepend-icon=""
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu2.save(endDate), updateTransaction()">OK</v-btn>
        </v-date-picker>
      </v-menu>
                     </v-skeleton-loader>
    </v-col>
</v-row>
  <!-- {{token}} -->
  <v-skeleton-loader
        :loading="reload"
        type="table"
      >
      <v-divider></v-divider>
<br>
  </v-skeleton-loader>
<div v-for="service in distinctServices" :key="service.id">
 <v-skeleton-loader
        :loading="reload"
        type="table"
      >
<h2 class="d-flex center" cols="12" sm="3">{{service.name}} ({{service.unit}})</h2>

<v-data-table
  
  :headers="headers"
  :items="filterTransaction(service.name)"
  item-key="id"
  
  class="elevation-1"
  :itemsPerPage="itemsPerPage"
  hide-default-footer
>

    <template v-slot:data>
      <td class="display-4"></td>
    </template>
<template v-slot:item.created_at="{ item }">
           <span>{{new Date(item.created_at).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'})}}</span>
</template>

</v-data-table>

<div class="text-lg-right" cols="12" sm="3" md="12" lg="12">
 <v-chip
      class="ma-10 title"
      :color="totalColor"
      text-color="white"
      large
    >
      {{totalPerServices(service.name)}}
    

</v-chip>

</div>
</v-skeleton-loader>

</div>

 <v-skeleton-loader
        :loading="reload"
        type="table"
      >
      <v-divider></v-divider>
<br>
  </v-skeleton-loader>
    </v-flex>
   
  </v-layout>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import axios from 'axios';

export default {
inject: ['theme'],
  data () {
    return {
 
      reload: true,
      token: '',
      totalColor: "#424242",
      startDate: '2019-12-23',
      endDate: '2019-12-30',
      menu: false,
      menu2: false,
      clientCharge: 0,
      workerCharge: 0,
      itemsPerPage: 10000,
singleSelect: false,
singleSelect2: false,
        selected: [],
        selected2: [],
        total: 0,
        headers: [
          // {
          //   text: 'I.D',
          //   align: 'left',
          //   sortable: false,
          //   value: 'id',
        
          // },
          { text: 'Date Created',  align: 'center', value: 'created_at'},
          { text: 'Description',  align: 'left',value: 'description' },
          // { text: 'User',  align: 'center',value: 'user' },
          // { text: 'Service',  align: 'center',value: 'Service'},
          { text: 'Quantity', align: 'center', value: 'quantity' },
          // { text: 'Unit',  align: 'center', value: 'Unit' },
          { text: 'Rate',  align: 'center', value: 'rate_per_ton' },
          { text: 'Equivalent',  align: 'center', value: 'total_amount'},
          { text: 'Remarks',  align: 'center', value: 'remarks' },
          // { text: 'Client',  align: 'center', value: 'client_id' },
        ],
         headers2: [
          // {
          //   text: 'I.D',
          //   align: 'left',
          //   sortable: false,
          //   value: 'id',
        
          // },
          { text: 'Date Created',  align: 'left', value: 'created_at' },
          { text: 'Description',  align: 'left',value: 'description' },
          // { text: 'User',  align: 'left',value: 'user' },
          { text: 'Service',  align: 'left',value: 'Service' },
          { text: 'Quantity', align: 'left', value: 'quantity' },
          { text: 'Unit',  align: 'left', value: 'Unit' },
          { text: 'Rate',  align: 'left', value: 'rate_per_ton_worker' },
          { text: 'Equivalent',  align: 'left', value: 'total_amount_workers'},
          { text: 'Remarks',  align: 'left', value: 'remarks' },
          // { text: 'Client',  align: 'left', value: 'client_id' },
        ]
    }
    
  },
  name: 'Todos',
  computed: {
  PJCCtransactionss ()
   {
      return this.$store.state.transactions.PJCCtransactions;
      
  },
    distinctServices () {
    var items = this.$store.state.transactions.PJCCtransactions;
    var services = [];
   
    const map = new Map();
    for (const item of items) {
        if(!map.has(item.Service)){
            map.set(item.Service, true);    // set any value to Map
            services.push({
                name: item.Service,
                unit: item.Unit
            });
        }
    }
    return services;
    
  },
  transactCount(){
    var items = this.$store.state.transactions.PJCCtransactions;
    var total = 0;
    for(var i = 0; i < items.length; i++){
      total += parseFloat(items[i].total_amount);
      }
      this.clientCharge = total;
      return `Php. ${Number(total.toFixed(2)).toLocaleString('en')}` 

  },

  transactCountWorkers(){
    var items = this.$store.state.transactions.PJCCtransactions;
    var total = 0;
    for(var i = 0; i < items.length; i++){
            total += parseFloat(items[i].total_amount_workers);
       }
       this.workerCharge = total;
      return `Php. ${Number(total.toFixed(2)).toLocaleString('en')}`
     
  },
  totalAmount () {
   var total = this.clientCharge - this.workerCharge;
   return `Php. ${Number(total.toFixed(2)).toLocaleString('en')}`;

  }

},

  created () {
    
       let payload = {
      dateStart: this.startDate,
      dateEnd: this.endDate,
      /* more parameters */
    }
    
     this.$store.dispatch('transactions/getTransactionsFiltered', payload);
    
     
if(process.browser){
     this.token = localStorage.getItem("authToken");
     
}
    
  },
  methods: {
  updateTransaction () {
    
    let payload = {
      dateStart: this.startDate,
      dateEnd: this.endDate,
      /* more parameters */
    }
    this.$store.dispatch('transactions/getTransactionsFiltered', payload)
  

  },
  filterTransaction (service) {
    var items = this.$store.state.transactions.PJCCtransactions;
    
   return items.filter((i) => {
        return (i.Service === service);
        
      })
       
  },
  totalPerServices (service) {
    var items = this.$store.state.transactions.PJCCtransactions;
    var total = 0;
    for(var i = 0; i < items.length; i++){
      if(items[i].Service == service)
      {
        total += parseFloat(items[i].total_amount);
      }
      }
      // this.clientCharge = total;
      return `Total: ${Number(total.toFixed(2)).toLocaleString('en')}` 

  },
},
updated () {
  this.reload = false;
  
}
} 
</script>

<style>
.v-data-table th{
  font-size: 1rem;
}
.v-data-table td{
  font-size: 1.15rem;
}

</style>