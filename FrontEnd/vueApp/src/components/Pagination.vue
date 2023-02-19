<template>
    <div>
        <nav v-if="totalPages > 1" class="mt-4">
            <ul class="pagination inline-flex -space-x-px">
                <!-- First page link -->
                <li :class="{ 'border-gray-300 dark:border-gray-700': currentPage === 1 }" class="border rounded-l-lg">
                    <a @click.prevent="fetchProducts(1)" href="#"
                        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First</a>
                </li>

                <!-- Previous page link -->
                <li :class="{ 'border-gray-300 dark:border-gray-700': currentPage === 1 }" class="border">
                    <a @click.prevent="fetchProducts(Math.max(currentPage - 1, 1))" href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</a>
                </li>

                <!-- Display up to 5 pages, with ellipsis if needed -->
                <template v-for="page in pages">
                    <!-- Show ellipsis if this is not the first page and the previous page is more than 1 page away -->
                    <li v-if="page > 1 && page - previousPage > 1" class="border">
                        <span class="px-3 py-2 leading-tight text-gray-500 bg-white border">{{ String.fromCharCode(8230)
                        }}</span>
                    </li>
                    <!-- Show the page link -->
                    <li :class="{ 'border-gray-300 dark:border-gray-700': page === currentPage }" class="border">
                        <a @click.prevent="fetchProducts(page)" href="#"
                            class="px-3 py-2 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
                                page }}</a>
                    </li>
                </template>

                <!-- Next page link -->
                <li :class="{ 'border-gray-300 dark:border-gray-700': currentPage === totalPages }" class="border">
                    <a @click.prevent="fetchProducts(Math.min(currentPage + 1, totalPages))" href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>

                <!-- Last page link -->
                <li :class="{ 'border-gray-300 dark:border-gray-700': currentPage === totalPages }"
                    class="border rounded-r-lg">
                    <a @click.prevent="fetchProducts(totalPages)" href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover">Last</a>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useAppStore } from '../store/appStore'

export default defineComponent({
    name: 'Pagination',

    setup() {
        const store = useAppStore()

        const currentPage = ref(1)
        const totalPages = computed(() => store.totalPages)
        const products = computed(() => store.products)

        watchEffect(() => {
            store.fetchProducts(currentPage.value)
        })

        function fetchProducts(page: number) {
            currentPage.value = page
        }

        const pages = computed(() => {
            const totalPages = store.totalPages;
            const pageNumbers = [];
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        });

        return {
            currentPage,
            totalPages,
            products,
            fetchProducts,
            pages
        }
    },
})
</script>
