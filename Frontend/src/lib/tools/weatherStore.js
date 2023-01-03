import { writable } from "svelte/store"

const weather = writable(initializeWeatherStore())

export default weather

function initializeWeatherStore() {
    let result = [
        { name: "cloud", value: randomValue() },
        { name: "rain", value: randomValue() },
        { name: "fog", value: randomValue() },
        { name: "wind", value: randomValue() }
    ]

    if (result[0].value == 0) result[1].value = 0

    return result;
}

function randomValue() {
    return Math.floor(Math.random() * 100) + 1
}

export function updateCloud(value) {
    updateWeather("cloud", value);
}

export function updateRain(value) {
    updateWeather("rain", value);
}

export function updateFog(value) {
    updateWeather("fog", value);
}

export function updateWind(value) {
    updateWeather("wind", value);
}

function updateWeather(name, value) {
    weather.update((data) => {
        let item = data.find((x) => x.name === name)

        if (item) item.value = value
        else throw new Error(`Missing name ${name} in weather global store.`)

        return data;
    });
}