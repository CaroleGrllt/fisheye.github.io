export default function mediaTemplate(data, mediaContent) {
    const typeOfMedia = mediaContent
    const {id, photographerId, title, video, image, likes, date, price} = data
    const initialLikes = data.likes

    function displayMedia() {
        const article = document.createElement('article')
        article.classList.add('gallery-card')
        article.setAttribute('data-id', id)
        article.setAttribute('data-initial-likes', initialLikes)
        
        const link = document.createElement('a')
        link.setAttribute('aria-label', `${title}, ouvrir le medium`)
        link.setAttribute('role', 'link')
        link.setAttribute('data-media', id)
        link.setAttribute('href', '#')

        const figure = document.createElement('figure')
        figure.innerHTML = typeOfMedia

        const figcaption = document.createElement('figcaption')

        const p = document.createElement('p')
        p.textContent = title

        const likesDiv = document.createElement('div')
        likesDiv.setAttribute('role', 'group')
        likesDiv.setAttribute('aria-label', 'nombre de likes et bouton pour aimer la photo')

        const span = document.createElement('span')
        span.setAttribute('aria-label', 'nombre de likes')
        span.setAttribute('data-id', id)
        span.classList.add('likeNbr')
        span.textContent = likes

        const btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.setAttribute('aria-label', `Aimer la photo ${title}`)
        btn.setAttribute('data-id', id)
        btn.classList.add('likeBtn')

        const i = document.createElement('i')
        i.classList.add('fa-solid')
        i.classList.add('fa-heart')
        i.classList.add('fa-heart-grid')
        i.setAttribute('aria-hidden', 'true')

        article.appendChild(link)
        link.appendChild(figure)
        article.appendChild(figcaption)
        figcaption.appendChild(p)
        figcaption.appendChild(likesDiv)
        likesDiv.appendChild(span)
        likesDiv.appendChild(btn)
        btn.appendChild(i)

        return article

    }

    return {id, photographerId, title, video, image, likes, date, price, initialLikes, displayMedia }
}