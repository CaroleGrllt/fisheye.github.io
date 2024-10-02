import dataPhotographers from '../models/photographersModel.js'
import photographerTemplate from '../templates/photographerTemplate.js'
import mediaFactory from '../factory/media.js';
import lightboxTemplate from '../utils/lightbox.js';
import updateLikes from '../utils/likes.js'

const data = dataPhotographers()

// RECUPERATION DE LA SECTION PERMETTANT D'AFFICHER LES DONNEES
const photographersSection = document.querySelector(".photographer-container");
const idPhotographerSection = document.querySelector('.about-container')

// RECUPERATION DE L'ID DU PHOTOGRAPHE PASSE EN PARAMETRE DANS L'URL
let idParam = new URLSearchParams(document.location.search)
let photographerId = idParam.get('id')

// RECUPERATION DES INFORMATIONS (IDENTITE ET TRAVAUX) DU PHOTOGRAPHE EN FONCTION ID
export const photographerInfoById = await data.getPhotographerInfo(photographerId)
export const photographerMediaById = await data.getMediasByPhotographer(photographerId)

// CREATION DE LA PARTIE IDENTITE DE LA PAGE PHOTOGRAPHE
const photographer = photographerTemplate(photographerInfoById); //envoi + réception infos du photographe au template
const photographerInfoDOM = photographer.getPhotographerInfo(); // récupération du composant selon fonction demandée
idPhotographerSection.appendChild(photographerInfoDOM); // affichage du composant sur la page

// CREATION DE LA PARTIE MEDIA DE LA PAGE PHOTOGRAPHE
export const mediaTemplate = mediaFactory(photographerMediaById, photographerInfoById) //envoi des informations media à la factory + récupération du composant selon fonction demandée (tableau)
export const worksSection = document.querySelector('.works-container')
mediaTemplate.forEach((media) => worksSection.appendChild(media)) // affichage des composants sur la page photographe

//CREATION ENCART TOTAL LIKES + MISE A JOUR LIKES
const likes = photographerTemplate(photographerInfoById, photographerMediaById)
const likesDOM = likes.displayAside()
photographersSection.appendChild(likesDOM)
updateLikes()

// CREATION MODALE DE CONTACT -- affichage nom du photographe
document.querySelector('.form-name').textContent = photographerInfoById.name

// CREATION LIGHTBOX -- envoi infos nécessaires
 lightboxTemplate(photographerMediaById, photographerInfoById)