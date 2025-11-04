<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter} from "vue-router"
import Services from "../services/Services"

const route = useRoute()
const router = useRouter()
const service = Services()
const personajes = ref([])
const imagenesError = ref(new Set()) // Set para trackear qué imágenes han fallado

const loadPersonajes = async () => {
    const idSerie = route.params.serie
    const data = await service.getPersonajes(idSerie)
    personajes.value = data
    imagenesError.value.clear() // Limpiar errores anteriores
}

const handleImageError = (event, personajeId) => {
    if (!imagenesError.value.has(personajeId)) {
        imagenesError.value.add(personajeId)
        // Ocultar la imagen que falló
        event.target.style.display = 'none'
    }
}

onMounted(() => {
    loadPersonajes()
})
</script>
<template>
    <div class="min-h-screen bg-black">
        <div class="container mx-auto pt-10 px-4">
            <!-- Header con título y botón volver -->
            <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 class="text-4xl font-bold text-white mb-4 sm:mb-0 tracking-tight">
                    Personajes de la Serie
                </h1>
                <button 
                    @click="router.push('/')"
                    class="bg-white text-black hover:bg-white/90 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    Volver al Home
                </button>
            </div>

            <!-- Loader mientras carga -->
            <div v-if="personajes.length === 0" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>

            <!-- Tabla de personajes -->
            <div v-else class="rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <!-- Header de la tabla -->
                        <thead class="bg-white/5">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-white/10">
                                    ID
                                </th>
                                <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-white/10">
                                    Imagen
                                </th>
                                <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-white/10">
                                    Nombre
                                </th>
                                <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-white/10">
                                    ID Serie
                                </th>
                                <th class="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-white/10">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        
                        <!-- Cuerpo de la tabla -->
                        <tbody class="divide-y divide-white/10">
                            <tr 
                                v-for="personaje in personajes" 
                                :key="personaje.idPersonaje"
                                class="transition-colors duration-300"
                            >
                                <!-- ID del personaje -->
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                                    <span class="text-sm text-white">
                                        {{ personaje.idPersonaje }}
                                    </span>
                                </td>
                                
                                <!-- Imagen del personaje -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="shrink-0 h-16 w-16">
                                        <div class="h-16 w-16 rounded-full border-2 border-white/30 hover:border-white transition-colors duration-300 overflow-hidden bg-white/10 flex items-center justify-center">
                                            <img 
                                                v-if="personaje.imagen && !imagenesError.has(personaje.idPersonaje)"
                                                :src="personaje.imagen" 
                                                :alt="personaje.nombre"
                                                class="h-full w-full object-cover"
                                                @error="handleImageError($event, personaje.idPersonaje)"
                                            >
                                            <div 
                                                v-else
                                                class="text-white/60 text-xs text-center"
                                            >
                                                <svg class="mx-auto h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span class="text-xs">Sin foto</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                <!-- Nombre del personaje -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-white">
                                        {{ personaje.nombre }}
                                    </div>
                                </td>
                                
                                <!-- ID de la serie -->
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-300">
                                        Serie #{{ personaje.idSerie }}
                                    </span>
                                </td>
                                
                                <!-- Botones de acción -->
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold space-x-3">
                                    <button 
                                        @click="router.push(`/series/${personaje.idSerie}`)"
                                        class="cursor-pointer bg-white text-black hover:bg-white/90 px-4 py-2 rounded-lg transition-all duration-300"
                                    >
                                        Ver Serie
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Información adicional -->
            <div v-if="personajes.length > 0" class="mt-8 text-center">
                <div class="bg-white/5 border border-white/10 rounded-lg px-6 py-4 inline-block backdrop-blur-sm">
                    <p class="text-white text-lg font-bold">
                        Total de personajes: 
                        <span class="bg-white/10 text-white px-3 py-1 rounded-full ml-2 border border-white/20">
                            {{ personajes.length }}
                        </span>
                    </p>
                </div>
            </div>

            <!-- Mensaje cuando no hay personajes -->
            <div v-else-if="personajes.length === 0" class="text-center py-16">
                <div class="max-w-md mx-auto bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
                    <div class="text-white/70 text-7xl mb-6">😔</div>
                    <h3 class="text-2xl font-bold text-white mb-4">No hay personajes</h3>
                    <p class="text-white/70 text-lg">Esta serie no tiene personajes registrados.</p>
                </div>
            </div>
        </div>
    </div>
</template>