import { configureStore } from "@reduxjs/toolkit";
import { AttractionApi } from "./Attraction";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import Id_ from "./Id_";
import back from "./back";
import { AnimeApi } from "./AnimeApi";

import anime_id from "./anime_id";

export const store = configureStore({
    reducer:{
        [AttractionApi.reducerPath]:AttractionApi.reducer,
        [AnimeApi.reducerPath]:AnimeApi.reducer,
        id:Id_,
        bg:back,
        animeID:anime_id
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((AttractionApi.middleware),(AnimeApi.middleware)),
})

setupListeners(store.dispatch)