export default function lightboxTemplate(dataMedias, dataPhotographer) {

    //DOM ELEMENTS
    const main                  = document.getElementById("main-photographer")
    const lightbox              = document.querySelector(".lightbox")
    const a = document.querySelector('.lightbox-container')
    const closeLightboxBtn      = document.querySelector('.close-lightbox')
    const previousButtons       = document.querySelector('.previous-button')
    const nextButtons           = document.querySelector('.next-button')
    const allMediaCards         = document.querySelectorAll('.gallery-card a')

    //ALL MEDIA AND INDEX
    const mediasArray   = Array.from(dataMedias)
    let mediaIndex      = 0

    //FUNCTIONS

    //-----close lightbox
    function closeLightbox() {
        lightbox.style.display = 'none'

        lightbox.setAttribute('aria-hidden', 'true')
        lightbox.setAttribute('aria-modal', 'false')
        main.setAttribute('aria-hidden', 'false')
    }

    //-----display previous media 
    function displayPrevMedia() {
        mediaIndex--;
        if(mediaIndex < 0) {
            mediaIndex = mediasArray.length-1
        }
        displayLightbox()
    }

    //-----display next media
    function displayNextMedia() {
        mediaIndex++;
        if(mediaIndex > mediasArray.length-1) {
            mediaIndex = 0
        }
        displayLightbox()
    }

        //-----open lightbox
        function displayLightbox() {
            const figure = document.querySelector('.photo-container figure')
            const figcaption = document.querySelector('.photo-container figcaption')
    
            closeLightboxBtn.focus(); 
    
            let currentMedia = mediasArray[mediaIndex]
            let content = `${currentMedia.image ? `
                <img src="assets/images/${dataPhotographer.name}/${currentMedia.image}" alt="${currentMedia.title}">` : 
                `<video controls aria-label="${currentMedia.title}">
                    <source src="assets/images/${dataPhotographer.name}/${currentMedia.video}" type="video/mp4">
                </video>`}`;
    
            let title = `${currentMedia.title}`;
    
            figure.innerHTML = content 
            figcaption.textContent = title
            
            lightbox.style.display = 'flex'
    
            lightbox.setAttribute('aria-hidden', 'false')
            lightbox.setAttribute('aria-modal', 'true')
            main.setAttribute('aria-hidden', 'true')  


        }
    

        //EVENTLISTENERS
    //-----click events
    allMediaCards.forEach(mediaCard => {
        mediaCard.addEventListener('click', () => {
            let mediaId = mediaCard.dataset.media
            let mediaClicked = mediasArray.findIndex(media => media.id == mediaId)
            mediaIndex = mediaClicked
            displayLightbox()
        })
    })

    closeLightboxBtn.addEventListener('click', closeLightbox)

    previousButtons.addEventListener('click', displayPrevMedia)
   
    nextButtons.addEventListener('click', displayNextMedia)

    //-----key events
    closeLightboxBtn.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' || e.key === 'Enter' || e.code === 'Space') {
            closeLightbox()
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') {
            displayPrevMedia()
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight') {
            displayNextMedia()
        }
    })


    return { displayLightbox, closeLightbox, displayPrevMedia, displayNextMedia }
}    
