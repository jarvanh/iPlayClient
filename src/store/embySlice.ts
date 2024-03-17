import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listenerMiddleware } from './middleware/Listener';
import { RootState } from '.';
import { createAppAsyncThunk } from './type';
import { StorageHelper } from '@helper/store';
import { EmbySite } from '@model/EmbySite';
import { EmbyConfig } from '@helper/env';

interface EmbyState {
    site: EmbySite|null;
}

const initialState: EmbyState = {
    site: null
};

type Authentication = {
    endpoint?: EmbyConfig,
    username: string,
    password: string,
    callback?: {
        resolve?: () => void
        reject?: () => void
    }
}

export const restoreSiteAsync = createAppAsyncThunk<EmbySite|null, void>("emby/restore", async (_, config) => {
    const $site = await StorageHelper.get('@site');
    if (!$site) {
        console.log("no user or server")
        return null
    }
    try {
        const site = JSON.parse($site);
        return site
    } catch (e) {
        console.log(e);
    }
    return null
});

export const loginToSiteAsync = createAppAsyncThunk<EmbySite|null, Authentication>("emby/site", async (user, config) => {
    const api = config.extra
    const data = await api.login(user.username, user.password, user.endpoint!)
    if (data) {
        const site: EmbySite = {
            user: data, 
            server: user.endpoint!, 
            status: 'idle'
        }
        await StorageHelper.set("@site", JSON.stringify(site))
        return site
    }
    return null
})

export const helloAsync = createAsyncThunk<string, string, any>("emby/site", async (content, _config) => {
    return content
})

export const EmbySlice = createSlice({
    name: 'emby',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        updateCurrentEmbySite: (state, action: PayloadAction<EmbySite>) => {
            state.site = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(loginToSiteAsync.pending, state => {
            if (state.site) state.site.status = 'loading';
        })
        .addCase(loginToSiteAsync.fulfilled, (state, action) => {
            const site = action.payload
            if (!site) return
            state.site = site;
        })
        .addCase(restoreSiteAsync.fulfilled, (state, action) => {
            console.log(`update site`, action.payload)
            state.site = action.payload;
        })
    },
});

export const { updateCurrentEmbySite } = EmbySlice.actions;
export const getActiveEmbySite = (state: RootState) => state.emby;


listenerMiddleware.startListening({
    actionCreator: loginToSiteAsync.fulfilled,
    effect: async (data, _api) => {
        data.meta.arg.callback?.resolve?.()
    }
})

listenerMiddleware.startListening({
    actionCreator: loginToSiteAsync.rejected,
    effect: async (data, _api) => {
        data.meta.arg.callback?.reject?.()
    }
})

export default EmbySlice.reducer;