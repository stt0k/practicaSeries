<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import Services from "../../services/Services"

// Todo del Header
const isDropdownOpen = ref(false)
const dropdownRef = ref(null)
const isMobileMenuOpen = ref(false)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
    isDropdownOpen.value = false
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

// Cerrar dropdown al hacer clic fuera
const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        closeDropdown()
    }
}

// Lista de series para el dropdown
const series = ref([])
const service = Services()

const loadSeries = async () => {
    const data = await service.getSeries()
    series.value = data
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    loadSeries()
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <header class="bg-black border-b border-white/10">
        <div class="container mx-auto px-6">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <img src="../../assets/stranger.png" class="w-20" alt="">
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-1">
                    <router-link 
                        to="/" 
                        class="text-white/80 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white"
                    >
                        Home
                    </router-link>
                    <router-link 
                        to="/create" 
                        class="text-white/80 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white"
                    >
                        Nuevo Personaje
                    </router-link>
                    <router-link 
                        to="/update" 
                        class="text-white/80 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white"
                    >
                        Modificar Personaje
                    </router-link>
                    <!-- Dropdown Oficios -->
                    <div class="relative" ref="dropdownRef">
                        <button 
                            @click="toggleDropdown"
                            class="text-white/80 cursor-pointer hover:text-white px-4 py-2 text-sm font-medium flex items-center bg-white/5 rounded-md border border-white/10"
                            :class="{ 'bg-white/10 text-white': isDropdownOpen }"
                        >
                            Series
                            <svg 
                                class="ml-2 h-4 w-4" 
                                :class="{ 'rotate-180': isDropdownOpen }"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div 
                            v-if="isDropdownOpen"
                            class="absolute right-0 mt-1 w-56 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50"
                        >
                            <div class="py-2">
                                <div class="px-4 py-2 text-xs font-medium text-white/50 uppercase tracking-wide border-b border-white/10">
                                    Series Disponibles
                                </div>
                                <router-link 
                                    v-for="serie in series" 
                                    :key="serie"
                                    @click="closeDropdown"
                                    :to="`/series/${serie.idSerie}`"
                                    class="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                                >
                                    <svg class="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6M8 6v6m0 0v8a2 2 0 002 2h4a2 2 0 002-2v-8M8 12v.01M16 12v.01" />
                                    </svg>
                                    {{ serie.nombre }}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button 
                        @click="toggleMobileMenu"
                        class="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/20 p-2"
                        :class="{ 'text-white/80': isMobileMenuOpen }"
                    >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path 
                                v-if="!isMobileMenuOpen"
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path 
                                v-else
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div 
                v-if="isMobileMenuOpen" 
                class="md:hidden border-t border-white/10"
            >
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <router-link 
                        to="/" 
                        @click="closeMobileMenu"
                        class="text-white/80 hover:text-white hover:bg-white/10 block px-3 py-2 text-base font-medium rounded-md"
                        active-class="text-white bg-white/10"
                    >
                        Departamentos
                    </router-link>
                    
                    <!-- Mobile Series Section -->
                    <div class="space-y-1">
                        <div class="px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-wide">
                            Series Disponibles
                        </div>
                        <router-link 
                            v-for="serie in series" 
                            :key="serie"
                            @click="closeMobileMenu"
                            :to="`/empleadosoficios/${serie}`"
                            class="text-white/80 hover:text-white hover:bg-white/10 block px-6 py-2 text-sm font-medium rounded-md"
                        >
                            {{ serie }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>