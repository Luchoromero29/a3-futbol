<section class=" w-[93%] xl:w-[98%] relative bg-white mt-8 relative z-10 border border-lines-color">
    <!-- Mensaje de seleccionados / Add Presentation btn -->
    <header class="bg-black w-full flex px-[10px] py-1 gap-2 items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/menu_inicio/4.png" />
        <div class="flex" >
            <p class="text-white ">Mi plantel</p>
            <p id="name-plantel" class="text-white "></p>
        </div>
    </header>

    <div id="add-pr-sel-msgs-container" class="flex w-full justify-end pr-6 pb-1 pt-4">
        <div id="selectedMessage" class="hidden flex items-center gap-2 p-2 ml-5 my-[4px]">
            <button id="deselectAllButton" class="hover:text-white">
                <img class="w-6 h-6" src="../../assets/imgs/5.png" original-src="../../assets/imgs/5.png"
                    data-hover-src="../../assets/imgs/cerrarHover.png" alt="Deseleccionar boton">
            </button>
            <p class="text-gray-bg"><span id="selectedCount">0</span> Seleccionados</p>
        </div>
        <div id="msg-success-pr" class="hidden w-full  bg-light-green flex justify-between 
                            ml-7 mr-1 pl-4 pr-2 py-3 rounded-md">
            <p id="msg-success-pr-text" class="text-sm"></p>
            <button id="close-success-message">
                <img class="w-6 h-6" src="../../assets/imgs/5.png" alt="cerrar boton">
            </button>
        </div>
    </div>
    <div id="add-user-container" class=" flex  justify-between items-center px-4">
        <button class="flex border-none gap-2 justify-center w-fit">
            <!-- Lo mismo que en el editar, linkeo el user.php para poder ver la redireccion, faltaria ajustarle el href y pasar el id como parametro -->
            <a id="add-user-miplantel">
                <span class="hover:text-green">Agregar usuario</span>
            </a>
            <div class="bg-green rounded-full h-6 w-6 relative">
                <span class="absolute inset-0 flex items-center justify-center text-lg text-white">+</span>
            </div>
        </button>
        <button id="button-list-miplantel" class="hidden hover:text-green flex gap-2 justify-center items-center">
            <img src="../../assets/imgs/list-black.png" class="w-6" />
            <span>Vista lista</span>
        </button>
        <button id="button-grid-miplantel" class=" hover:text-green flex gap-2 justify-center items-center">
            <img src="../../assets/imgs/grilla-black.png" class="w-6" />
            <span>Vista grilla</span>
        </button>
    </div>
    <!-- tabla -->

    <div id="miplantel-table-container" class="hidden w-full overflow-x-auto p-4">
        <?php include 'miplantel_table.php'; ?>
    </div>

    <div id="miplantel-grilla-container" class="hidden w-full overflow-x-auto p-4">
        <?php include 'miplantel_grilla.php'; ?>
    </div>

    <div id="miplantel-infouser-container" class="hidden w-full p-4">
        <?php include 'miplantel_infoPlayer.php'; ?>
    </div>

    <div id="miplantel-trasnferencia-container" class="hidden w-full p-4">
        <?php include 'modal_transferencia.php'; ?>
    </div>



    <?php include '../../utilities/modalDelete/modalDelete.php'; ?>

    <div id="alert" class="border border-lines-color left-[50%] rounded-md shadow-lg w-60  fixed bottom-5 hidden">
        <header class="bg-green text-white flex gap-1 justify-center items-center  rounded-t-md">
            <p class="text-3xl">!</p>
            <p>ATENCIÓN</p>
        </header>
        <main class="p-2 text-wrap text-center flex items-center justify-center rounded-b-md bg-white">
            <p id="label-alert"></p>
        </main>
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

</script>