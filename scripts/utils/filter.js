import { photographerInfoById, photographerMediaById } from '../pages/photographer.js';
import { worksSection } from '../pages/photographer.js';
import lightboxTemplate from '../utils/lightbox.js';
import mediaFactory from '../factory/media.js';
import updateLikes from './likes.js'

const mainMenu        = document.querySelector('.dropdown-main-menu')
const dropdownBtn     = document.querySelector('.dropdown-button')
const arrowDown       = document.querySelector('.fa-chevron-down')
const dropdownContent = document.querySelector('.dropdown-content')
const dropdownFilters = document.querySelectorAll('.dropdown-content button')
let currentFilter     = document.querySelector('.current-filter')
const allFilters      = Array.from(dropdownFilters)
console.log(allFilters)


dropdownBtn.addEventListener('click', expandFilter)
arrowDown.addEventListener('click', expandFilter)

function expandFilter() {
    const expandedFilterBtn = dropdownBtn.getAttribute('aria-expanded') === 'true'? true : false
    const ariaHidden = dropdownContent.getAttribute('aria-hidden') === 'true' ? true : false
    
    let selectedElement = allFilters.find(filter => filter.value == currentFilter.value);
    selectedElement.style.display = 'none';

    dropdownBtn.setAttribute('aria-expanded', !expandedFilterBtn)
    dropdownContent.setAttribute('aria-hidden', !ariaHidden)

    dropdownContent.classList.toggle('open-dropdown')
    arrowDown.classList.toggle('arrow-rotate')

    if(dropdownContent.classList.contains("open-dropdown")) {
        dropdownContent.style.display = "block";
        mainMenu.style.borderBottomLeftRadius = '0px'
        mainMenu.style.borderBottomRightRadius = '0px'
        mainMenu.style.borderTopLeftRadius = '5px'
        mainMenu.style.borderTopRightRadius = '5px'
        
    } else {
        dropdownContent.style.display = "none"
        mainMenu.style.borderRadius = '5px'

    }

    changeFilter()
}


function changeFilter() {
    let filterSelected = allFilters.find(filter => filter.value == currentFilter.value);
    const expandedFilterBtn = dropdownBtn.getAttribute('aria-expanded') === 'true'? true : false
    const ariaHidden = dropdownContent.getAttribute('aria-hidden') === 'true' ? true : false

    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {

            currentFilter.value = filter.value;
            currentFilter.textContent = filter.textContent
            if(filterSelected) {
                filterSelected.style.display = 'block';
            }

            filterSelected = filter;
            filterSelected.style.display = 'none';

            dropdownBtn.setAttribute('aria-expanded', !expandedFilterBtn)
            dropdownContent.setAttribute('aria-hidden', !ariaHidden)
        
            closeFilters()
            displayMediaByFilter(filter.value);
        })
    });
}

function closeFilters() {
    if(dropdownContent.classList.contains("open-dropdown")) {
        dropdownContent.classList.remove("open-dropdown")
        dropdownContent.style.display = "none"
        mainMenu.style.borderRadius = '5px'
        arrowDown.classList.toggle('arrow-rotate')
    }   
}

export default function displayMediaByFilter(filterValue) {

    switch(filterValue) {
        case 'popularite' :
            photographerMediaById.sort((a, b) => b.likes - a.likes);
            break;
        case 'date' :
            photographerMediaById.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'titre' : 
            photographerMediaById.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }


    const mediaSorted = photographerMediaById
    worksSection.innerHTML = ""
    const mediaTemplate = mediaFactory(mediaSorted, photographerInfoById)
    mediaTemplate.forEach((media) => worksSection.appendChild(media)) // affichage des composants sur la page photographe
    
    lightboxTemplate(mediaSorted, photographerInfoById)
    updateLikes()   
}