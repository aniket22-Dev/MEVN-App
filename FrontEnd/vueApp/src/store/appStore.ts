import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useAppStore = defineStore("product",{
    state: () => ({ 
      products: []
    }),
    getters: {
      getProducts(state){
        return state.products
      }
    },
    actions: {
      async fetchProducts() {
        try {
          const data = await axios.get('http://localhost:3000/v2/getAll')
            this.products = data.data 
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      }
    },
})