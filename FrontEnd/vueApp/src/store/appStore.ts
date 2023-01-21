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
      submitting: false,
      fetchingResults: false,
      users:[],
      name: '',
      email:'',
      password:''
    }),
    getters: {
      getProducts(state){
        return state.products
      },
      getUsers(state){
        return state.users
      }
    },
    actions: {
      async fetchProducts() {
        try {
          this.fetchingResults = true;
          const data = await axios.get('http://localhost:3000/v2/getAll')
            this.products = data.data;
            this.fetchingResults = false;
          }
          catch (error) {
            console.log("server Issue")
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
          console.log("error in posting product");
          
        }
      },
      async createUser() {
        try{
          this.submitting = true;
          await axios.post('http://localhost:3000/register',{
            name:this.name,
            email: this.email,
            password: this.password
          }).then((response)=>{
            const userData = response.data;
            this.$state.users.push(userData);
            this.name = "";
            this.email = "";
            this.password = "";
            this.submitting = false;
          })
        }
        catch(error){
          console.log("error while creating user");
          
        }
      },
      async loginUser() {
        try{
          this.submitting = true;
          await axios.post('http://localhost:3000/login',{
            email: this.email,
            password: this.password
          }).then((response)=>{
            const userData = response.data;
            this.$state.users.push(userData);
            this.email = "";
            this.password = "";
            this.submitting = false;
            if(response.status == 200){
              const url = `${window.location.origin}/collection`
              
              window.location.href = url;
              return window.location.href;
            }
          })
        }
        catch(error){
          console.log("error while creating user");
          
        }
      }
    },
})