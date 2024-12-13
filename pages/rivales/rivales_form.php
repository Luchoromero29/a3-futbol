<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />
    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet" href="../../styles.css">

    <!-- Estilos de la tabla -->
    <link rel="stylesheet" href="../../tableStyles.css" />

    <script src="../../script.js"></script>

    <!-- Scripts de la tabla -->
    <script src="rivalesTable.js"></script>


    <script src="../../shareModal.js"></script>
    <script src="../../presentationsTable.js"></script>
    <script src="../../navigation.js"></script>
    <script src="../../tailwind.config.js"></script>
    <title>Pizarra A3</title>
</head>

<body class="flex flex-col bg-light-gray-bg ">
    <!-- Usuario en header-->
    <header class="w-full flex justify-end bg-white min-h-[70px]">
        <div class="flex gap-2 items-center px-8 cursor-pointer text-sm xl:text-base">
            <img class="w-[40px] rounded-full" src="../../assets/avatar_test/avatar09.jpg" alt="">
            <div id="profile-header" class="relative">
                <p class="font-medium text-black hover:text-green">Nombre de la Cuenta</p>
                <div class="hidden absolute z-50 flex flex-col w-full bg-white border border-gray-bg rounded-md text-sm">
                    <button id="change-photo-btn"
                        class="py-2 gap-1 hover:text-green hover:bg-light-gray-bg flex items-center pl-[15%] rounded-t-md">
                        <img class="h-5 w-5 inline rounded-full bg-gray-bg" src="../../assets/imgs/14 lapiz hover.png" alt="">
                        Cambiar foto
                    </button>
                    <button id="sign-out-btn"
                        class="py-2 gap-1 hover:text-green hover:bg-light-gray-bg flex items-center pl-[15%] rounded-b-md">
                        <img class="h-5 w-5 inline" src="../../assets/imgs/off.png" original-src="../../assets/imgs/off.png"
                            data-hover-src="../../assets/imgs/offHover.png" alt="">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>

    </header>

    <!-- Contenido General -->
    <main class="bg-light-gray-bg w-full pl-[22%] h-full pb-10
                flex-1 flex flex-col items-center justify-between 
                relative text-sm xl:text-base">

        <!-- Panel de Navegación -->
        <div id="navbar-content" class="">
            <?php include("../../utilities/navbar.php"); ?>
        </div>

        <div id="main-content" class="hidden w-full h-screen flex justify-center items-start">
            <section class="p-4 w-full flex flex-col h-full box-border items-center relative">
                <header class="bg-black w-full flex px-[10px] py-1 items-center rounded-sm gap-2 ">
                    <img class="h-8 w-8" src="../../assets/menu_inicio/5.png" />
                    <p class="text-white ml-2">Rivales</p>
                    <p id="nombre-institucion" class="text-green"></p>
                </header>
                <main class="bg-white w-full flex flex-grow border border-lines-color items-center p-10">
                    <?php include '../equipo/equipo_form.php' ?>
                </main>
            </section>
        </div>

        <div id="loader" class="w-full h-full flex justify-center items-center">
            <div class="loading-ball"></div>
        </div>


    </main>

    <style>
        #pr-table th,
        #users-table th {
            font-size: 15px;
            box-sizing: border-box;
        }
    </style>

    <script>
        window.addEventListener('load', () => {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
        })
    </script>

</body>

</html>



<script>

    const params = new URLSearchParams(window.location.search);
    const equipoId = params.get('id');


    let institucion;


    const getEquipo = async () => {
        institucion = await fetch('../../data/equipos.json')
            .then(response => response.json())
            .then(equipos => {
                // Filtrar por el id que recibimos de la URL
                console.log(equipos);

                const equipo = equipos.find(equipo => equipo.id == equipoId);
                console.log(equipo);

                // Seleccionar el elemento donde se va a mostrar el nombre del equipo
                const $nombreInstitucion = document.querySelector("#nombre-institucion");

                // Actualizar el contenido si se encontró el equipo
                if (equipo && equipo.nombre.length > 0) {
                    $nombreInstitucion.innerText = `Editando institución de ${equipo.nombre}`;
                    return equipo;
                } else {
                    $nombreInstitucion.innerText = "Creando nueva institucion";
                }
            })
            .catch(error => {
                console.error("Error al obtener los equipos:", error);
            });
    }

    getEquipo();
</script>