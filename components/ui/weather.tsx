import { getWeather } from "@/lib/get-weather";
const Weather = async () => {
    const weather = await getWeather();

    if (!weather) {
        return <main>
            <p>{73}</p>
        </main>
    }
    return (
        <main>
            <p>{weather?.toFixed(2)}</p>
        </main>
    )
}

export default Weather;