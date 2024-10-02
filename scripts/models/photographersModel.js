
import json from '../../data/photographers.json'

const jsonUrl = json
export default function dataPhotographers() {

    let dataJson = jsonUrl

    async function getData() {
        return await fetch(dataJson) 
        .then(res => res.json())
        .catch(err => console.log("Une erreur s'est produite : ", err))
    }
    
    async function getPhotographers() {
        const data = await getData()
        return data.photographers
    }
    
    async function getPhotographerInfo(idPhotographer) {
        const data = await getData()
        const dataPhotographers = data.photographers 
        let photographer = dataPhotographers.find((data) => data.id == idPhotographer)
        return photographer
    }
    
    async function getMediasByPhotographer(idPhotographer) {
        const data = await getData()
        const dataPhotographers = data.media 
        let media = dataPhotographers.filter((data) => data.photographerId == idPhotographer)
        media.sort((a, b) => b.likes - a.likes);

        return media
    }

    async function getMediaInitialLikesById(id) {
        const data = await getData()
        const dataMedias = data.media 
        return (dataMedias.find(media => media.id === id)).likes
    }

    return { getPhotographers, getPhotographerInfo, getMediasByPhotographer, getMediaInitialLikesById }
}

