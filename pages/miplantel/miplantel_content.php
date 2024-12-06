<section class=" w-[93%] xl:w-[98%] relative bg-white mt-8 relative z-10 border border-linesColor">
    <!-- Mensaje de seleccionados / Add Presentation btn -->
    <header class="bg-black w-full flex px-[10px] py-1 items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/menu_inicio/4.png" />
        <p class="text-white ml-2">Mi plantel</p>
        <p id="name-plantel" class="text-white ml-2"></p>
    </header>

    <div id="add-pr-sel-msgs-container" class="flex w-full justify-end pr-6 pb-1 pt-4">
        <div id="selectedMessage" class="hidden flex items-center gap-2 p-2 ml-5 my-[4px]">
            <button id="deselectAllButton" class="hover:text-white">
                <img class="w-6 h-6" src="../../assets/imgs/5.png" original-src="../../assets/imgs/5.png"
                    data-hover-src="../../assets/imgs/cerrarHover.png" alt="Deseleccionar boton">
            </button>
            <p class="text-grayBg"><span id="selectedCount">0</span> Seleccionados</p>
        </div>
        <div id="msg-success-pr" class="hidden w-full  bg-lightGreen flex justify-between 
                            ml-7 mr-1 pl-4 pr-2 py-3 rounded-md">
            <p id="msg-success-pr-text" class="text-sm"></p>
            <button id="close-success-message">
                <img class="w-6 h-6" src="../../assets/imgs/5.png" alt="cerrar boton">
            </button>
        </div>
    </div>
    <div id="add-user-container" class=" flex flex-col justify-end px-4">
        <button class="flex border-none gap-2 justify-center w-fit">
            <!-- Lo mismo que en el editar, linkeo el user.php para poder ver la redireccion, faltaria ajustarle el href y pasar el id como parametro -->
            <a id="add-user-miplantel">
                <span class="hover:text-green">Agregar usuario</span>
            </a>
            <div class="bg-green rounded-full h-6 w-6 relative">
                <span class="absolute inset-0 flex items-center justify-center text-lg text-white">+</span>
            </div>
        </button>
    </div>
    <!-- tabla -->

    <div id="miplantel-table-container" class=" w-full overflow-x-auto p-4">
        <?php include 'miplantel_table.php'; ?>
    </div>

    <div id="miplantel-infouser-container" class="hidden w-full p-4">
        <?php include 'miplantel_infoPlayer.php'; ?>
    </div>


    <div id="deleteModal" class="fade-in hidden fixed inset-0 flex justify-center items-center z-100 bg-black/50">
        <div class="border border-linesColor rounded-md shadow-xl overflow-hidden bg-white">
            <header class="p-4 text-center bg-green text-white flex gap-1 justify-center items-center rounded-t-md ">
                <p>Deseas eliminar los jugadores seleccionados?</p>
            </header>
            <main class="p-4 text-wrap text-center flex items-center justify-center rounded-b-md bg-white m-0">
                <button id="cancelDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-l-lg border border-green transition-all duration-300 ease-out hover:bg-gradient-to-t hover:from-black hover:to-gray-200">
                    <p>No</p>
                </button>
                <button id="confirmDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-r-lg border border-green transition-all duration-300 ease-out hover:bg-gradient-to-t hover:from-black hover:to-gray-200">
                    <p>Si</p>
                </button>

            </main>
        </div>
    </div>
    <div id="userInfoModal"
        class="hidden top-0 left-0 fixed h-full w-full flex justify-center items-center z-100 bg-black/30 ">
    </div>

    <style>
        #pr-table th,
        #users-table th {
            font-size: 15px;
            box-sizing: border-box;
        }
    </style>

</section>

<script>
    // let currentFlap = document.querySelector('.miplantel-current-flap');

    // const toggleFlap = (event) => {

    //     //saco estilos actuales de seleccionado
    //     currentFlap.classList.remove('miplantel-current-flap');
    //     quitStylesFlap(currentFlap.children);


    //     //agrego estilos al seleccionado
    //     const li = event.target.closest('li');
    //     li.classList.add('miplantel-current-flap');
    //     currentFlap = li;
    //     addStylesFlap(currentFlap.children);
    // }

    // const addStylesFlap = (node) => {
    //     const [img, imgHover] = node;
    //     img.classList.add('hidden');
    //     imgHover.classList.remove('hidden');
    // }
    // const quitStylesFlap = (node) => {
    //     const [img, imgHover] = node;
    //     img.classList.remove('hidden');
    //     imgHover.classList.add('hidden');
    // }


    // document.addEventListener("DOMContentLoaded", () => {
    //     addStylesFlap(currentFlap.children);
    // });
</script>