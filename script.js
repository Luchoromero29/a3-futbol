
$(document).ready(async function() {

    await createPresentationsTable()

    createNavigation()

    function hoverImg(){
        // Cuando se pasa el mouse por encima
        const img = $(this).find('img');
        const hoverSrc = img.attr('data-hover-src');
        img.attr('src', hoverSrc);
    }
    function originalImg() {
        // Cuando se quita el mouse
        const img = $(this).find('img');
        const originalSrc = img.attr('original-src');
        img.attr('src', originalSrc);
    }

    // Hover para cambio de imagenes
    $(`.row-action-button, 
        .esloganImg, 
        #sistema-deportes, 
        #deselectAllButton, 
        #close-success-message,
        #sign-out-btn`)
    .hover(
        hoverImg,
        originalImg
    );

    // Hover botón cambiar foto al tocar el nombre de perfil en el header
    $('#change-photo-btn').hover(
        function(){
            $(this).find('img').addClass('bg-green')
        },
        function(){
            $(this).find('img').removeClass('bg-green')
        }
    )

    //Perfil menu
    $('#profile-header').on('click', function() {
        const nameElement = $(this).find('p');
        const menu = $(this).find('div');
        menu.toggleClass('hidden')
    })

    /**
     * Panel navegación izquierdo
     */
    // Seleccionar elementos
    const listItems = $('.left-nav-item'); // Todos los li
    const toggleListElements = $('.toggle-list'); // div dentro de li que tienen un menú desplegable
    const ulListItemElements = $('.menu-item-dropdown'); // items menús desplegables

    // Mopstrar/ocultar menús desplegables
    toggleListElements.click(function () {
        const ulElement = $(this).siblings('ul');
        ulElement.toggleClass('translate-y-0 opacity-0');
        ulListItemElements.find('p').removeClass('text-white');
        ulListItemElements.removeClass('visible-dot')
    });

    // Estilos y animaciones al tocar items del panel
    listItems.click(function (event) {
        // Para todos los elementos excepto para los li dentro de los menús desplegables
        if ($(event.target).closest('.menu-item-dropdown').length === 0) {
            const pElement = $(this).find('p').first();
            const img = $(this).find('img.icon-chevron');

            // texto blanco
            pElement.toggleClass('text-white');

            // rotar ícono
            img.toggleClass('rotate-90');

            // Ocultar todos los elementos ul que estén dentro de otras li excepto el que esté dentro de esta li
            listItems.not(this).find('ul').removeClass('translate-y-0');
            listItems.not(this).find('ul').addClass('opacity-0');

            // Borrar clase de texto blancop de los p dentro de todas las li excepto esta
            listItems.not(this).find('p').removeClass('text-white');

            // Rotar íconos chevron dentro de todas las li excepto la actual
            listItems.not(this).find('img.icon-chevron').removeClass('rotate-90');
        }
    });

    // Items menú desplegable aniimación
    ulListItemElements.click(function () {
        const pElement = $(this).find('p');
        
        // Texto blanco y punto verde
        pElement.addClass('text-white');
        $(this).addClass('visible-dot')

        // Remover texto blanco y punto verde de los otros párrafos dentro del mismo ul
        $(this).siblings().find('p').removeClass('text-white');
        $(this).siblings().removeClass('visible-dot')
    });
})

var roles=[
    {id:0,name:"Administrador"},
    {id:1,name:"Colaborador"},
    {id:2,name:"Editor"},
    {id:3,name:"Espectador"},
    {id:4,name:"Supervisor"}
];


var perms=[
    "No tiene",
    "Leer",
    "Editar"
];
    
var shareUsers=[
    {
        id: 1,
        role: 0,
        image: "./assets/avatar_test/avatar01.jpg",
        name: "Sixto Édgar",
        email: 'emaildeprueba@gmail.com',
        perms: 2
    },
    {
        id: 2,
        role: 1,
        image: "./assets/avatar_test/avatar02.jpg",
        name: "Telmo Victorino",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 3,
        role: 2,
        image: "./assets/avatar_test/avatar03.jpg",
        name: "Bolívar Emiliano",
        email: 'emaildeprueba@gmail.com',
        perms: 1
    },
    {
        id: 4,
        role: 3,
        image: "./assets/avatar_test/avatar04.jpg",
        name: "Jacobo Amado",
        email: 'emaildeprueba@gmail.com',
        perms: 1
    },
    {
        id: 5,
        role: 4,
        image: "./assets/avatar_test/avatar05.jpg",
        name: "Augusto Pepe",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    
    {
        id: 6,
        role: 0,
        image: "./assets/avatar_test/avatar06.jpg",
        name: "Gael Juanito",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 7,
        role: 1,
        image: "./assets/avatar_test/avatar07.jpg",
        name: "Anastasio Lázaro",
        email: 'emaildeprueba@gmail.com',
        perms: 1
    },
    {
        id: 8,
        role: 2,
        image: "./assets/avatar_test/avatar08.jpg",
        name: "Fortunato Wenceslao",
        email: 'emaildeprueba@gmail.com',
        perms: 2
    },
    {
        id: 9,
        role: 3,
        image: "./assets/avatar_test/avatar09.jpg",
        name: "Eustaquio Nacio",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 10,
        role: 4,
        image: "./assets/avatar_test/avatar10.jpg",
        name: "Severino Elpidio",
        email: 'emaildeprueba@gmail.com',
        perms: 1
    },
    {
        id: 11,
        role: 0,
        image: "./assets/avatar_test/avatar11.jpg",
        name: "David Wilmer",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 12,
        role: 1,
        image: "./assets/avatar_test/avatar12.jpg",
        name: "Epifanio Esteban",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 13,
        role: 2,
        image: "./assets/avatar_test/avatar13.jpg",
        name: "Luisito Wenceslao",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 14,
        role: 3,
        image: "./assets/avatar_test/avatar14.jpg",
        name: "Victoriano Leopoldo",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 15,
        role: 4,
        image: "./assets/avatar_test/avatar15.jpg",
        name: "José Julio César",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 16,
        role: 0,
        image: "./assets/avatar_test/avatar16.jpg",
        name: "Vicente Leopoldo",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 17,
        role: 1,
        image: "./assets/avatar_test/avatar17.jpg",
        name: "Carmelo Arístides",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 18,
        role: 2,
        image: "./assets/avatar_test/avatar18.jpg",
        name: "Tiburcio Leonardo",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 19,
        role: 3,
        image: "./assets/avatar_test/avatar19.jpg",
        name: "Paco Salvador",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    },
    {
        id: 20,
        role: 4,
        image: "./assets/avatar_test/avatar20.jpg",
        name: "Nereo Sixto",
        email: 'emaildeprueba@gmail.com',
        perms: 0
    }
];
    