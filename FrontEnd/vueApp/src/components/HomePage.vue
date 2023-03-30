<template>
    <div class="bg-gray-100">
        <header class="bg-white shadow">
            <div class="container mx-auto px-4">
                <nav class="flex justify-between items-center py-4">
                    <a href="/" class="text-lg font-bold text-gray-800">Flowbite Store</a>
                    <div>
                        <a href="/" class="px-4 text-gray-500 hover:text-gray-800">Home</a>
                        <a href="/shop" class="px-4 text-gray-500 hover:text-gray-800">Shop</a>
                        <a href="/cart" class="px-4 text-gray-500 hover:text-gray-800">Cart</a>
                    </div>
                </nav>
            </div>
        </header>
        <main>
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-4xl font-bold text-gray-800">Welcome to Flowbite Store</h1>
                <p class="mt-4 text-gray-600">We sell high-quality products at affordable prices.</p>
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/300x300" alt="Product Image" class="w-full h-48 object-cover">
                        <h2 class="text-lg font-bold text-gray-800 mt-4">Product 1</h2>
                        <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p class="mt-2 text-gray-800 font-bold">$99.99</p>
                        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to
                            Cart</button>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/300x300" alt="Product Image" class="w-full h-48 object-cover">
                        <h2 class="text-lg font-bold text-gray-800 mt-4">Product 2</h2>
                        <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p class="mt-2 text-gray-800 font-bold">$129.99</p>
                        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to
                            Cart</button>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-4">
                        <img src="https://via.placeholder.com/300x300" alt="Product Image" class="w-full h-48 object-cover">
                        <h2 class="text-lg font-bold text-gray-800 mt-4">Product 3</h2>
                        <p class="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p class="mt-2 text-gray-800 font-bold">$149.99</p>
                        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to
                            Cart</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<script setup lang="ts">

</script>