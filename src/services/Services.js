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

    const getPersonajes = async (idSerie) => {
        try {
            const request = `/api/Series/PersonajesSerie/${idSerie}`
            const url = Global.URL_SERIES + request

            const response = await axios.get(url)
            console.log("Personajes cargados correctamente")
            return response.data
        } catch (error) {
            console.log("Error al cargar personajes:", error)
        }
    }

    // Retornar las funciones del servicio
    return {
        getSeries,
        getSerie,
        getPersonajes,
    }
}

export default Service