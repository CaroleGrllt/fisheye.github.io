import { photographerMediaById } from '../pages/photographer.js';
import dataPhotographers from '../models/photographersModel.js'

export default function updateLikes() {
//DOM ELEMENTS
const allLikesBtn       = document.querySelectorAll('.likeBtn')
const allLikesNbr       = document.querySelectorAll('.likeNbr')
const totalLikesContent = document.querySelector('.totalLikeNbr') 
let photographerLikes   = totalLikesContent.textContent 


const media = photographerMediaById

// CHANGE NBR OF LIKES

allLikesBtn.forEach(likeBtn => {
    likeBtn.addEventListener('click', async () => {
        const model = dataPhotographers()

        const mediaLiked = media.find(media => media.id == likeBtn.dataset.id)
        const mediaId = Number(likeBtn.closest('article').getAttribute('data-id'))
        const initialLike = await model.getMediaInitialLikesById(mediaId)

        if(initialLike === mediaLiked.likes) {

            mediaLiked.likes++
            photographerLikes++

            allLikesNbr.forEach(likeNbr => {
                let mediaLike = photographerMediaById.find(media => media.id == likeNbr.dataset.id)
                likeNbr.textContent = mediaLike.likes
            })

            totalLikesContent.textContent = photographerLikes
                                
        } else {

            mediaLiked.likes--
            photographerLikes--

            allLikesNbr.forEach(likeNbr => {
                let mediaLike = photographerMediaById.find(media => media.id == likeNbr.dataset.id)
                likeNbr.textContent = mediaLike.likes
            })

            totalLikesContent.textContent = photographerLikes
        }    
    })
})
}
