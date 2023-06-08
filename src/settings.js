const settings = {
    domain: "https://www.sicssalab.net/contenido/json/",
    api: {
        stories: "entretenimiento/mocksStory.json",
        entertainments: "entretenimiento/mocksEntretenimiento.json",
        statesList: "mocks-estados.json",
        experiences: "experiencias/mocksExperiencias.json",
        experiencesStates: "experiencias/mocksEstadosExperiencias.json",
        magicTowns: "pueblos-magicos/mocksPueblosMagicos.json",
        entertainmentProfileList: "groups-urban.json",
        avenueProfileList: "mockAvenidasPerfiles.json",
        experienceProfileList: "experiencias/mocksExperienciasPerfiles.json",
        magicTownProfileList: "pueblos-magicos/mocksPueblosMagicosPerfiles.json",
        mallsStates: "malls/mocks-estados.json",
        mallProfileList: "malls/mocks-perfiles.json",
    },
    playlist: {
        tabs: [
            {
                name: "Radio 24/7",
                type: "radio",
            },
            {
                name: "Podcast",
                type: "podcast",
            },
            {
                name: "Live",
                type: "live",
            },
        ]
    }
}

export default settings;