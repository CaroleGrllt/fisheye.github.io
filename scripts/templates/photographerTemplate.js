export default function photographerTemplate(dataPhotographer, dataMedia) {
    // const { name, id, tagline, city, country, price, portrait } = data;
    const picture = `assets/photographers/${dataPhotographer.portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' )

        const link = document.createElement('a')
        link.setAttribute('aria-label', `visiter la page de ${dataPhotographer.name}`)
        link.setAttribute('href', `../../photographer.html?id=${dataPhotographer.id}`)

        const img = document.createElement( 'img' );
        img.setAttribute('aria-hidden', 'true')
        img.setAttribute("src", picture )
        img.setAttribute("alt", dataPhotographer.name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = dataPhotographer.name;
        h2.classList.add('name')

        const location = document.createElement('p')
        location.setAttribute('aria-label', 'localisation géographique du photographe')
        location.classList.add('location')
        location.textContent = dataPhotographer.city +", " + dataPhotographer.country

        const line = document.createElement('p')
        line.setAttribute('aria-label', 'slogan du photographe')
        line.classList.add('tagline')
        line.textContent = dataPhotographer.tagline

        const cost = document.createElement('p')
        cost.setAttribute('aria-label', 'tarifs du photographe')
        cost.classList.add('price')
        cost.textContent = dataPhotographer.price +"€ / jour"

        article.appendChild(link)
        link.appendChild(img)
        link.appendChild(h2)
        article.appendChild(location)
        article.appendChild(line)
        article.appendChild(cost)

        return (article);
    }

    
    function getPhotographerInfo() {

        const container = document.createElement('div')
        container.classList.add('content')

        const txtContainer = document.createElement('div')
        txtContainer.classList.add('text-container')

        const title = document.createElement('h1')
        title.textContent = dataPhotographer.name
        title.classList.add('name-photographer')

        const location = document.createElement('p')
        location.setAttribute('aria-label', 'localisation géographique du photographe')
        location.classList.add('location-photographer')
        location.textContent = dataPhotographer.city +", " + dataPhotographer.country

        const line = document.createElement('p')
        line.setAttribute('aria-label', 'slogan du photographe')
        line.classList.add('tagline-photographer')
        line.textContent = dataPhotographer.tagline

        const btn = document.createElement('button')
        btn.setAttribute('onclick', 'displayModal()')
        btn.setAttribute('aria-label', 'Ouvrir le formulaire de contact')
        btn.classList.add('contact_button')
        btn.textContent = "Contactez-moi"
        
        const img = document.createElement( 'img' );
        img.setAttribute('aria-hidden', 'true')
        img.setAttribute("src", picture )
        img.setAttribute("alt", dataPhotographer.name)

        container.appendChild(txtContainer)
        txtContainer.appendChild(title)
        txtContainer.appendChild(location)
        txtContainer.appendChild(line)
        container.appendChild(btn)
        container.appendChild(img)

        return (container);
    }

    function displayAside () {
        let photographerLikes = dataMedia.reduce((acc, media) => acc + media.likes, 0)

        const aside = document.createElement('aside')
        const likesContainer = document.createElement('div')
        likesContainer.classList.add('likes-container-aside')
        const priceContainer = document.createElement('div')
        priceContainer.classList.add('price-container-aside')

        const span = document.createElement('span')
        span.setAttribute('aria-label', 'nombre total de likes')
        span.classList.add('totalLikeNbr')
        span.textContent = photographerLikes
        
        const i = document.createElement('i')
        i.classList.add('fa-solid')
        i.classList.add('fa-heart')
        i.classList.add('fa-heart-aside')
        i.setAttribute('aria-hidden', 'true')

        const p = document.createElement('p')
        p.textContent = dataPhotographer.price + "€ / jour"

        aside.appendChild(likesContainer)
        aside.appendChild(priceContainer)
        likesContainer.appendChild(span)
        likesContainer.appendChild(i)
        priceContainer.appendChild(p)
        
        return (aside)
    }


    return { getUserCardDOM, getPhotographerInfo, displayAside }
}