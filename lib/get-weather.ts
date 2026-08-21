import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";

interface WeatherResponse {
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
    };
    name: string;
}

export async function getWeather() {
    const apiKey = process.env.WEATHER_APP_API_KEY;

    const city = "California";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(1500),
            next: { revalidate: 3600 }
        });

        if (!response.ok) return null;

        if (!response.ok) {
            throw new Error(`HTTP error!`)
        }
        const data: WeatherResponse = await response.json();
        return data.main.temp;
    }
    catch (error) {
        console.error("Failed to fetch wheather");
    }

}

