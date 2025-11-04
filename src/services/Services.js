import axios from "axios"
import Global from "../Global"

const Service = () => {

    const getSeries = async () => {
        try {
            const request = "api/Series"
            const url = Global.URL_SERIES + request

            const response = await axios.get(url)
            console.log("Series cargadas correctamente")
            return response.data
        } catch (error) {
            console.log("Error al cargar series:", error)
            throw error
        }
    }

    const getSerie = async (idSerie) => {
        try {
            const request = `api/Series/${idSerie}`
            const url = Global.URL_SERIES + request

            const response = await axios.get(url)
            console.log("Serie cargada correctamente")
            return response.data
        } catch (error) {
            console.log("Error al cargar la serie:", error)
        }
    }

    const getPersonajesSerie = async (idSerie) => {
        try {
            const request = `/api/Series/PersonajesSerie/${idSerie}`
            const url = Global.URL_SERIES + request

            const response = await fetch(url)
            
            const data = await response.json()
            console.log("Personajes cargados correctamente")
            return data
        } catch (error) {
            console.log("Error al cargar personajes:", error)
            throw error
        }
    }

    const getPersonajes = async () => {
        try {
            const request = `api/Personajes`
            const url = Global.URL_SERIES + request

            const data = await axios.get(url)
            console.log("Personajes cargados correctamente")
            return data
        } catch (error) {
            console.log("Error al cargar los personajes:", error)
        }
    }

    const insertPersonaje = async (personaje) => {
        try {
            const request = "api/Personajes"
            const url = Global.URL_SERIES + request

            const response = await axios.post(url, personaje)
            console.log("Personaje insertado correctamente")
            return response.data
        } catch (error) {
            console.log("Error al crear un personaje: ", error)
        }
    }

    // Retornar las funciones del servicio
    return {
        getSeries,
        getSerie,
        getPersonajesSerie,
        insertPersonaje,
        getPersonajes,
    }
}

export default Service