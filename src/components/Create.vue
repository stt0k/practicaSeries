<script setup>
import Service from "../services/Services"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"

const series = ref([])
const router = useRouter()
const mensaje = ref("")
const service = Service()

const personaje = ref ({
    nombre: "",
    imagen: "",
})

const idSerieSeleccionada = ref(0)

const insertPersonaje = async () => {
    try {
        mensaje.value = ""
        
        if (!personaje.value.nombre || !personaje.value.imagen || !idSerieSeleccionada.value || idSerieSeleccionada.value === 0) {
            mensaje.value = "Todos los campos son obligatorios y debe seleccionar una serie válida"
            return
        }
        
        // Crear objeto completo para enviar
        const personajeCompleto = {
            nombre: personaje.value.nombre,
            imagen: personaje.value.imagen,
            idSerie: parseInt(idSerieSeleccionada.value)
        }
        
        console.log("Objeto a enviar:", personajeCompleto)
        
        const data = await service.insertPersonaje(personajeCompleto)
        mensaje.value = "Personaje creado exitosamente"
        
        // Limpiar formulario después de insertar
        personaje.value = {
            nombre: "",
            imagen: "",
        }
        idSerieSeleccionada.value = 0

        // Redireccionar a home al insertar
        router.push("/")
    } catch (error) {
        mensaje.value = "Error al crear el personaje: " + error.message
    }
}

const loadSeries = async () => {
    const data = await service.getSeries()
    series.value = data
}

onMounted(() => {
    loadSeries()
})

</script>
<template>
    <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md mx-auto">
            <!-- Header -->
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-white">Crear Personaje</h2>
                <p class="text-gray-400 mt-2">Añade un nuevo personaje al sistema</p>
            </div>

            <!-- Form Card -->
            <div class="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8">
                <form @submit.prevent="insertPersonaje" class="space-y-6">
                    <!-- Nombre -->
                    <div class="space-y-2">
                        <label for="nombre" class="block text-sm font-semibold text-white">
                            Nombre del Personaje
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <input 
                                id="nombre"
                                type="text" 
                                v-model="personaje.nombre"
                                class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                placeholder="Ej: Ramón"
                                required
                            >
                        </div>
                    </div>

                    <!-- Imagen -->
                    <div class="space-y-2">
                        <label for="imagen" class="block text-sm font-semibold text-white">
                            Imagen
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <input 
                                id="imagenPersonaje"
                                type="text" 
                                v-model="personaje.imagen"
                                class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                placeholder="Ej: https://"
                                required
                            >
                        </div>
                    </div>

                    <!-- Serie -->
                    <div class="space-y-2">
                        <label for="serie" class="block text-sm font-semibold text-white">
                            Serie
                        </label>
                        <div class="relative">
                            <select 
                                id="serie"
                                v-model="idSerieSeleccionada"
                                class="w-full pl-3 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                required
                            >
                                <option value="0" class="bg-black text-gray-400">Selecciona una serie</option>
                                <option 
                                    class="bg-black text-white" 
                                    v-for="serie in series" 
                                    :key="serie.idSerie"
                                    :value="serie.idSerie"
                                >
                                    {{ serie.nombre }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-4">
                        <button 
                            type="submit"
                            class="w-full cursor-pointer bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 flex items-center justify-center"
                        >
                            Crear Personaje
                        </button>
                    </div>
                </form>

                <!-- Message Display -->
                <div v-if="mensaje" class="mt-6">
                    <div 
                        class="p-4 rounded-lg border"
                        :class="{
                            'bg-green-900/50 border-green-500/50 text-green-200': mensaje.includes('exitosamente'),
                            'bg-red-900/50 border-red-500/50 text-red-200': mensaje.includes('Error') || mensaje.includes('obligatorios')
                        }"
                    >
                        <div class="flex items-center">
                            <svg 
                                v-if="mensaje.includes('exitosamente')"
                                class="h-5 w-5 text-green-400 mr-2" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            <svg 
                                v-else
                                class="h-5 w-5 text-red-400 mr-2" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-sm font-medium">{{ mensaje }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Back Link -->
            <div class="text-center mt-8">
                <router-link 
                    to="/" 
                    class="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center"
                >
                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver a Home
                </router-link>
            </div>
        </div>
    </div>
</template>