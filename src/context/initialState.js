// eslint-disable-next-line import/no-anonymous-default-export
export default {
    audioStreaming: {
        loading: false,
        loaded: false,
        
        playAudio: false,
        pauseAudio: false,

        playMusic: false,
        playMusicAux: false, //TODO al darle click con video paso el play para cuando detenga el video y siga reproduciendo despues


    },
    userAuth: {
        isPremium: false,
    },
    stories: {
        data: [],
        loading: false, //fetching
        complete: false,
        error: false
    },
    entertainments: {
        data: [],
        loading: false, //fetching
        complete: false,
        error: false
    }
}