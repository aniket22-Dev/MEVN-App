<template>
  <nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div class="flex items-center">
            <ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page"><RouterLink to="/collection">Collection</RouterLink></a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline"><RouterLink to="/admin/create">Admin</RouterLink></a>
                </li>
            </ul>
        </div>
    </div>
</nav>
  
  
  <RouterView></RouterView>
  
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
