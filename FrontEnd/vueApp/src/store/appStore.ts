import { defineStore } from "pinia";
// Import axios to make HTTP requests
import axios from "axios";

export const useAppStore = defineStore("product", {
  state: () => ({
    products: [],
    productName: "",
    productPrice: "",
    productImage: "",
    productId: "",
    productObjectId: "", // Add new property for ObjectId
    loading: false,
    submitting: false,
    fetchingResults: false,
    users: [],
    name: "",
    email: "",
    password: "",
    response: false,
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async fetchProducts(page = 1, limit = 60) {
      try {
        const response = await axios.get(
          "https://mevn-api-lzod.onrender.com/products",
          {
            params: { page, limit },
          }
        );

        this.products = response.data.results;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
        this.totalItems = response.data.totalItems;
        console.log("Fetched", page);
      } catch (error) {
        console.error("error while fetching product", error);
        // handle error here, e.g. show error message to user
      }
    },
    async fetchProductById(id: any) {
      try {
        this.fetchingResults = true;
        const data = await axios.get(
          `https://mevn-api-lzod.onrender.com/v2/${id}`
        );
        this.products.push(data.data);
        console.log("Product fetched", id);
        this.fetchingResults = false;
      } catch (error) {
        console.log("Not able to fetch might be server issue");
      }
    },
    async postProducts() {
      try {
        this.submitting = true;
        const response = await axios.post(
          "https://mevn-api-lzod.onrender.com/v2",
          {
            productName: this.productName,
            productPrice: this.productPrice,
            productImage: this.productImage,
            productId: this.productId,
          }
        );

        const productData = response.data;
        this.$state.products.push(productData);
        this.productName = "";
        this.productPrice = "";
        this.productImage = "";
        this.productId = "";
        // Store the ObjectId in the state
        this.productObjectId = productData._id;
        this.submitting = false;
      } catch (error) {
        console.log("error in posting product");
      }
    },
    async createUser() {
      try {
        this.submitting = true;
        await axios
          .post("https://mevn-api-lzod.onrender.com/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            const userData = response.data;
            this.$state.users.push(userData);
            this.name = "";
            this.email = "";
            this.password = "";
            this.submitting = false;
          });
      } catch (error) {
        console.log("error while creating user");
      }
    },
    async loginUser() {
      try {
        this.submitting = true;
        await axios
          .post("https://mevn-api-lzod.onrender.com/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            const userData = response.data;
            this.$state.users.push(userData);
            this.email = "";
            this.password = "";
            this.submitting = false;
            if (response.status == 200) {
              this.response = true;
            } else {
              this.response = false;
            }
          });
      } catch (error) {
        console.log("error while creating user");
      }
    },
  },
});
