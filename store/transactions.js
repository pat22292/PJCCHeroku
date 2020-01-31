import axios from 'axios';


export const state = () => ({
  
    PJCCtransactions: [],
  })
  


    // export const getters = {
    //   get (state) {
    //     return state.PJCCtransactions
    //   }
    // }
  export const actions = {
    
    async getTransactions({ commit }){
      
      axios.defaults.baseURL = process.env.apiURL;
  const auth = {
    headers: {Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyNjZiODYyNGVmN2ZjNjdjMmI0OGM2YWFiMjE2MjM1MTFjYWI1N2I4Y2QyOTFkYmU4Zjk5YzdjODNmZDNhMzgzZWJkZjFiZThlMWNhM2QxIn0.eyJhdWQiOiIyIiwianRpIjoiZjI2NmI4NjI0ZWY3ZmM2N2MyYjQ4YzZhYWIyMTYyMzUxMWNhYjU3YjhjZDI5MWRiZThmOTljN2M4M2ZkM2EzODNlYmRmMWJlOGUxY2EzZDEiLCJpYXQiOjE1Nzg0MDgwNzYsIm5iZiI6MTU3ODQwODA3NiwiZXhwIjoxNjEwMDMwNDc2LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.UUB5xTAwR_i8luphULjSnxz1poT89DceKErM_AlsBJB9vHuSkyspC408TDBk8ifpie2i_f5Y_VgzMGCiwPP7we94bwRHsmqWUIm54prxKj8Ssca3sXqLB42z-90-gZu6QP22aAdHvhslh8jOlcA1rkOO4iLr_4_hcpwitWaTwFtnup-1RvlpNh1nuNWShmok4tz93LPE3C_PSc5zGwa3_OTeKAczHGz2MlR9nglQoalvghK9Q4X8a3E175-jMdX8fgxtDPRvWJ_xjnblsmb3jtDssQn0i5feYGcb_yBTMcMJjTBjxe_PNbdLgu1qnhplvb6xTw0yuxzxKknfe4PGJYgKmsrwEK0m7fAozPcS0dGrVIAYrmFlSQEiex_ElXjL6P0mS24_XBny8CdNspwxmnLnk4kD_zPAoi-AE9jHxsFXcKxQGKSyllTxwBTCpYsP1G-iKfA-5IkzoK2JrGnxVTyJGPZcE15LftZPXA3R2S7noj_CKlw6_gdJYr8AdetnBhq4ZRrHt0l8EXEDlCuPWxVcSnhSiqN2vFwfVal8cuvJ4BQGqDNzJNB65yUixS3C-7bnu6kDp4hDLWRZApu_sRoQ5xcJHUrl5u7yAHgPWfgMKwAL7S0Mb3_qdj-jujn5aHjLd6ifok2mVefFuTrWhQgfWEyZCmKtetzRZ85ATAM',
    'Access-Control-Allow-Origin': '*',
    } 
    
}
await axios.get(`transactions`,auth).then(result => {
commit('ALL_TRANSACTIONS', { transactions: result.data.data })
})
    },

  async getTransactionsFiltered({ commit }, {dateStart, dateEnd} ){
      
    axios.defaults.baseURL = process.env.apiURL;
      const auth = {
        headers: {Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyNjZiODYyNGVmN2ZjNjdjMmI0OGM2YWFiMjE2MjM1MTFjYWI1N2I4Y2QyOTFkYmU4Zjk5YzdjODNmZDNhMzgzZWJkZjFiZThlMWNhM2QxIn0.eyJhdWQiOiIyIiwianRpIjoiZjI2NmI4NjI0ZWY3ZmM2N2MyYjQ4YzZhYWIyMTYyMzUxMWNhYjU3YjhjZDI5MWRiZThmOTljN2M4M2ZkM2EzODNlYmRmMWJlOGUxY2EzZDEiLCJpYXQiOjE1Nzg0MDgwNzYsIm5iZiI6MTU3ODQwODA3NiwiZXhwIjoxNjEwMDMwNDc2LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.UUB5xTAwR_i8luphULjSnxz1poT89DceKErM_AlsBJB9vHuSkyspC408TDBk8ifpie2i_f5Y_VgzMGCiwPP7we94bwRHsmqWUIm54prxKj8Ssca3sXqLB42z-90-gZu6QP22aAdHvhslh8jOlcA1rkOO4iLr_4_hcpwitWaTwFtnup-1RvlpNh1nuNWShmok4tz93LPE3C_PSc5zGwa3_OTeKAczHGz2MlR9nglQoalvghK9Q4X8a3E175-jMdX8fgxtDPRvWJ_xjnblsmb3jtDssQn0i5feYGcb_yBTMcMJjTBjxe_PNbdLgu1qnhplvb6xTw0yuxzxKknfe4PGJYgKmsrwEK0m7fAozPcS0dGrVIAYrmFlSQEiex_ElXjL6P0mS24_XBny8CdNspwxmnLnk4kD_zPAoi-AE9jHxsFXcKxQGKSyllTxwBTCpYsP1G-iKfA-5IkzoK2JrGnxVTyJGPZcE15LftZPXA3R2S7noj_CKlw6_gdJYr8AdetnBhq4ZRrHt0l8EXEDlCuPWxVcSnhSiqN2vFwfVal8cuvJ4BQGqDNzJNB65yUixS3C-7bnu6kDp4hDLWRZApu_sRoQ5xcJHUrl5u7yAHgPWfgMKwAL7S0Mb3_qdj-jujn5aHjLd6ifok2mVefFuTrWhQgfWEyZCmKtetzRZ85ATAM',
        'Access-Control-Allow-Origin': '*',
        } 
        
    }
    

   await axios.post(`filter-date`,{
      dateStart: dateStart,
      dateEnd: dateEnd,
      service_id: 0
    },auth).then(result => {
      
    commit('ALL_TRANSACTIONS', { transactions: result.data.data })
    })
        },



  }

  export const mutations = {

    ALL_TRANSACTIONS: (state, { transactions }) => {
      state.PJCCtransactions = transactions
  },
      }