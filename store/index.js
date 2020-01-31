import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';


export const state = () => ({
  list: [
      {
          id: 1,
          Title: 'First Todos'
      },
      {
          id: 2,
          Title: 'Second Todos'
      }
  
  ]
})

