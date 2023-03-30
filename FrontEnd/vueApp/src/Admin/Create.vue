<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid">
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form @submit.prevent="store.postProducts()">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="product-name" class="block text-sm font-medium text-gray-700">ProductName</label>
                  <input type="text" v-model="store.$state.productName"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="product-price" class="block text-sm font-medium text-gray-700">Product Price</label>
                  <input type="text" v-model="store.$state.productPrice"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="product-id" class="block text-sm font-medium text-gray-700">Product ID</label>
                  <input type="text" v-model="store.$state.productId"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>


                <div class="col-span-6">
                  <label for="product-image" class="block text-sm font-medium text-gray-700">Product Image</label>
                  <input type="text" v-model="store.$state.productImage"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
          </div>
        </form>
        <p v-if="store.$state.submitting">Submitting...</p>
        <p v-if="store.$state.loading">Loading...</p>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { useAppStore } from '../store/appStore';

const store = useAppStore();

</script>

<style scoped></style>