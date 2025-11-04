<script setup>
import { onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import Services from "../services/Services"

const route = useRoute()
const router = useRouter()
const service = Services()
const serie = ref(null)
const imagenError = ref(false)

const loadSerie = async () => {
    const idSerie = route.params.serie
    const data = await service.getSerie(idSerie)
    serie.value = data
    imagenError.value = false // Reset del estado de error de imagen
}

const handleImageError = (event) => {
    if (!imagenError.value) {
        imagenError.value = true
        event.target.src = 'https://via.placeholder.com/400x600/cccccc/666666?text=Sin+Imagen'
    } else {
        // Si ya falló una vez, ocultar la imagen
        event.target.style.display = 'none'
    }
}

onMounted(() => {
    loadSerie()
})

watch(() => route.params.serie, () => {
    loadSerie()
})
</script>
<template>
    <div class="container mx-auto mt-10 px-4">
        <!-- Loader mientras carga -->
        <div v-if="!serie" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>

        <!-- Card de la serie -->
        <div v-else class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="md:flex">
                    <!-- Imagen de la serie -->
                    <div class="md:w-1/3">
                        <img 
                            v-if="serie.imagen && !imagenError"
                            :src="serie.imagen" 
                            :alt="serie.nombre"
                            class="h-full w-full object-cover md:h-96"
                            @error="handleImageError"
                        >
                        <div 
                            v-else
                            class="h-full w-full md:h-96 bg-gray-200 flex items-center justify-center"
                        >
                            <div class="text-center text-gray-500">
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="mt-2 text-sm">Sin imagen</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Información de la serie -->
                    <div class="md:w-2/3 p-8">
                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Serie {{ serie.anyo }}
                        </div>
                        
                        <h1 class="mt-2 text-3xl font-bold text-gray-900 leading-tight">
                            {{ serie.nombre }}
                        </h1>
                        
                        <div class="mt-4 flex items-center">
                            <span class="text-sm font-medium text-gray-600 mr-2">Puntuación:</span>
                            <div class="flex items-center">
                                <!-- Estrellas -->
                                <div class="flex">
                                    <svg 
                                        v-for="star in 5" 
                                        :key="star"
                                        class="w-5 h-5"
                                        :class="star <= serie.puntuacion ? 'text-yellow-400' : 'text-gray-300'"
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span class="ml-2 text-lg font-bold text-gray-900">
                                    {{ serie.puntuacion }}/5
                                </span>
                            </div>
                        </div>
                        
                        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="text-sm font-medium text-gray-500">ID de Serie</h3>
                                <p class="mt-1 text-lg font-semibold text-gray-900">{{ serie.idSerie }}</p>
                            </div>
                            
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="text-sm font-medium text-gray-500">Año de Estreno</h3>
                                <p class="mt-1 text-lg font-semibold text-gray-900">{{ serie.anyo }}</p>
                            </div>
                        </div>
                        
                        <!-- Botones de acción -->
                        <div class="mt-8 flex flex-col sm:flex-row gap-4">
                            <router-link 
                                :to="`/series/${serie.idSerie}/personajes`"
                                class="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform"
                            >
                                Personajes
                            </router-link>
                            
                            <button 
                                @click="router.push('/')"
                                class="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Volver al Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

