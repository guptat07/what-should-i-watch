export default {
  async fetch(request: Request) {
    console.log(request);
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};

import { GoogleGenAI } from "@google/genai";

const tmdbJsonSchema = {
    type: "object",
    properties: {
        certification: {
            type: "string",
            description: "Age rating (e.g., PG-13, R). Use in conjunction with 'region'."
        },
        "certification.gte": {
            type: "string",
            description: "Minimum age rating."
        },
        "certification.lte": {
            type: "string",
            description: "Maximum age rating."
        },
        certification_country: {
            type: "string",
            description: "Country code for certification (e.g., US)."
        },
        include_adult: {
            type: "boolean",
            description: "Set to true only if explicit adult content is requested. Default false."
        },
        include_video: {
            type: "boolean",
            description: "Include videos. Default false."
        },
        language: {
            type: "string",
            description: "ISO 639-1 language code (e.g., en-US, es-ES)."
        },
        primary_release_year: {
            type: "integer",
            escription: "Specific 4-digit release year (e.g., 1985)."
        },
        "primary_release_date.gte": {
            type: "string",
            description: "Earliest primary release date in YYYY-MM-DD format (e.g., 1980-01-01 for the 80s)."
        },
        "primary_release_date.lte": {
            type: "string",
            description: "Latest primary release date in YYYY-MM-DD format (e.g., 1989-12-31 for the 80s)."
        },
        region: {
            type: "string",
            description: "2-letter ISO region code (e.g., US)."
        },
        "release_date.gte": {
            type: "string",
            description: "Earliest release date in YYYY-MM-DD format."
        },
        "release_date.lte": {
            type: "string",
            description: "Latest release date in YYYY-MM-DD format."
        },
        sort_by: {
            type: "string",
            description: "Sorting method. Allowed values: original_title.asc, original_title.desc, popularity.asc, popularity.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, title.asc, title.desc, vote_average.asc, vote_average.desc. Default: popularity.desc"
        },
        "vote_average.gte": {
            type: "number",
            description: "Minimum rating threshold from 1.0 to 10.0 (e.g., 7.0 for highly rated movies)."
        },
        "vote_average.lte": {
            type: "number",
            description: "Maximum rating threshold from 1.0 to 10.0."
        },
        "vote_count.gte": {
            type: "number",
            description: "Minimum vote count (e.g. 100 to filter out obscure movies with few votes)."
        },
        "vote_count.lte": {
            type: "number",
            description: "Maximum vote count."
        },
        watch_region: {
            type: "string",
            description: "ISO country code for streaming providers (e.g. US)."
        },
        with_cast: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB person IDs for cast members."
        },
        with_companies: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB company IDs (e.g. Pixar, Marvel)."
        },
        without_companies: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB company IDs to exlcude."
        },
        with_crew: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB person IDs for crew members (e.g. directors)."
        },
        with_genres: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB genre IDs. Action: 28, Adventure: 12, Animation: 16, Comedy: 35, Crime: 80, Documentary: 99, Drama: 18, Family: 10751, Fantasy: 14, History: 36, Horror: 27, Music: 10402, Mystery: 9648, Romance: 10749, Sci-Fi: 878, TV Movie: 10770, Thriller: 53, War: 10752, Western: 37."
        },
        without_genres: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated TMDB genre IDs to exclude."
        },
        with_keywords: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated keyword strings/IDs describing topics or tropes."
        },
        without_keywords: {
            type: "string",
            description: "Comma (AND) or pipe (OR) separated keyword strings/IDs to exclude."
        },
        with_origin_country: {
            type: "string",
            description: "ISO country code of origin (e.g., JP for Japanese anime/movies)."
        },
        with_original_language: {
            type: "string",
            description: "ISO language code of original audio (e.g. ja, fr, es)."
        },
        with_people: {
            type: "string",
            description: "Comma-separated TMDB person IDs (actors or crew)."
        },
        "with_runtime.gte": {
            type: "integer",
            description: "Minimum runtime in minutes."
        },
        "with_runtime.lte": {
            type: "integer",
            description: "Maximum runtime in minutes (e.g., 90 for short movies)."
        },
        with_watch_monetization_types: {
            type: "string",
            description: "Filter by availability. Options: flatrate, free, ads, rent, buy. Use with watch_region."
        },
        with_watch_providers: {
            type: "string",
            description: "Comma/pipe separated watch provider IDs. Use with watch_region."
        }
    }
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const interaction = await ai.interactions.create({
  model: "gemini-2.5-flash-lite",
  input: "Explain how AI works in a few words",
});
console.log(interaction.output_text);