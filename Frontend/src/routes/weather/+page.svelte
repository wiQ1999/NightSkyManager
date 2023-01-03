<script>
    import cloud from "$lib/images/weather/cloud.svg";
    import rain from "$lib/images/weather/rain.svg";
    import fog from "$lib/images/weather/fog.svg";
    import wind from "$lib/images/weather/wind.svg";
    import weather from "$lib/tools/weatherStore.js";
    import {
        updateCloud,
        updateRain,
        updateFog,
        updateWind,
    } from "$lib/tools/weatherStore.js";

    $: weatherValues = $weather;
    function cloudValueChanged() {
        updateCloud(weatherValues[0].value);
        if (weatherValues[0].value == 0) updateRain(0);
    }
</script>

<svelte:head>
    <title>Weather</title>
</svelte:head>

<section>
    <h1>Weather</h1>

    <form method="POST">
        <div>
            <div class="weather-element">
                <img src={cloud} alt="cloud" />
                <input
                    type="range"
                    bind:value={weatherValues[0].value}
                    on:change={cloudValueChanged}
                />
            </div>
            <div class="weather-element">
                <img src={rain} alt="rain" />
                <input
                    type="range"
                    bind:value={weatherValues[1].value}
                    on:change={updateRain(weatherValues[1].value)}
                    disabled={weatherValues[0].value == 0}
                />
            </div>
        </div>
        <div>
            <div class="weather-element">
                <img src={fog} alt="fog" />
                <input
                    type="range"
                    bind:value={weatherValues[2].value}
                    on:change={updateFog(weatherValues[2].value)}
                />
            </div>
            <div class="weather-element">
                <img src={wind} alt="wind" />
                <input
                    type="range"
                    bind:value={weatherValues[3].value}
                    on:change={updateWind(weatherValues[3].value)}
                />
            </div>
        </div>
    </form>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    form {
        display: flex;
    }

    .weather-element {
        margin: 5em;
        display: flex;
        flex-direction: column;
    }

    img {
        width: 8em;
        height: 8em;
    }
</style>
