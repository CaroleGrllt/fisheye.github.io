import mediaTemplate from "../templates/mediaTemplate.js"

export default function mediaFactory(datasMedia, identity) {
    const name = identity.name
    const {id, photographerId, title, video, image, likes, date, price} = datasMedia

    const content = datasMedia.map(data => {
        if(data.image) {
            
            const mediaContent = `
                <img src="assets/images/${name}/${data.image}" alt="${data.title}">
            `
            const imgMedia = mediaTemplate(data, mediaContent)
            const imgDOM = imgMedia.displayMedia()
            return imgDOM
        }

        else if(data.video) {
            const mediaContent = `   
                <video controls aria-label="${data.title}">
                    <source src="assets/images/${name}/${data.video}" type="video/mp4">
                </video>
            `
            const videoMedia = mediaTemplate(data, mediaContent)
            const videoDOM = videoMedia.displayMedia()
            return videoDOM
        }
    })
    return {id, photographerId, title, video, image, likes, date, price }, content
}