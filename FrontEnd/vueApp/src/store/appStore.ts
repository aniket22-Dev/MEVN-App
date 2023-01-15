import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useAppStore = defineStore("product",{
    state: () => ({ 
      products: [],
      productName: '',
      productPrice: '',
      productImage: '',
      productId: '',
      loading: false,
      submitting: false
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
      },
      async postProducts() {
        try {
          this.submitting = true;
          await axios.post('http://localhost:3000/v2',{
            productName:this.productName,
            productPrice:this.productPrice,
            productImage:this.productImage,
            productId:this.productId

          }).then((response) =>{
            const productData = response.data;
            this.$state.products.push(productData);
            this.productName = "";
            this.productPrice = "";
            this.productImage = "";
            this.productId = "";

            this.submitting = false;
          });
        }
        catch(error) {
          alert(error)
          console.log("error in posting product");
          
        }
      }
    },
})