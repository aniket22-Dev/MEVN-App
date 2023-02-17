<template>
  <div>
    <h2>Product Details</h2>
    <p>{{ productDetails.productName }}</p>
    <p>{{ productDetails.productPrice }}</p>
    <p>{{ productDetails.productImage }}</p>
    <p>{{ productDetails.productId }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAppStore } from '../store/appStore';

const store = useAppStore();

const route = useRoute();

const productDetails = ref({});

const productId = route.params.id;
console.log("product id",route.params);

axios.get(`https://mevn-api-lzod.onrender.com/v2/${window.location.href.split('/product/')[1]}`)
  .then(response => {
    productDetails.value = response.data;
  })
  .catch(error => {
    console.error(error);
  });
</script>
