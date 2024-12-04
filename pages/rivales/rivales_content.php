<section id="presentations-table-container"
    class=" w-[93%] xl:w-[90%]  bg-white mt-8  z-10 border border-linesColor">
    <!-- Mensaje de seleccionados / Add Presentation btn -->
    <header class="bg-black w-full flex px-[10px] py-1 items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/menu_inicio/5.png" />
        <p class="text-white ml-2">Rivales</p>
    </header>

    <div class="py-4">
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
                    <img class="w-6 h-6" src="assets/imgs/5.png" alt="cerrar boton">
                </button>
            </div>
        </div>
        <div class="flex justify-between px-8">
            <button class="flex border-none gap-2 justify-center w-fit">
                <!-- Lo mismo que en el editar, linkeo el user.php para poder ver la redireccion, faltaria ajustarle el href y pasar el id como parametro -->
                <a href="rivales_form.php?to=rivales.php">
                    <span class="hover:text-green">Agregar equipo</span>
                </a>
                <div class="bg-green rounded-full h-6 w-6 relative">
                    <span class="absolute inset-0 flex items-center justify-center text-lg text-white">+</span>
                </div>
            </button>
            <button id="button-list-rivales" class="hidden hover:text-green flex gap-2 justify-center items-center">
                <img src="../../assets/imgs/list-black.png" class="w-6" />
                <span >Vista lista</span>
            </button>
            <button id="button-grid-rivales" class=" hover:text-green flex gap-2 justify-center items-center">
                <img src="../../assets/imgs/grilla-black.png" class="w-6" />
                <span >Vista grilla</span>
            </button>

        </div>
    </div>

    <section id="rivales-grilla-container" class="hidden p-8">
        <?php include 'rivales_grilla.php';?>
    </section>
    
    <!-- tabla -->
    <section id="rivales-table-container" class=" w-full overflow-x-auto p-8 border border-linesColor">
        <?php include 'rivales_table.php';?>
    </section>


    <div id="deleteModal" class="fade-in hidden fixed inset-0 flex w-screen h-screen justify-center items-center z-100 bg-black/50">
        <div class="border border-linesColor rounded-md shadow-xl overflow-hidden bg-white">
            <header class="p-4 text-center bg-green text-white flex gap-1 justify-center items-center rounded-t-md ">
                <p>Deseas eliminar al Club y a los jugadores?</p>
            </header>
            <main class="p-4 text-wrap text-center flex items-center justify-center rounded-b-md bg-white m-0">
                <button id="cancelDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-l-lg border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black hover:text-green">
                    <p>No</p>
                </button>
                <button id="confirmDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-r-lg border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black hover:text-green">
                    <p>Si</p>
                </button>

            </main>
        </div>
    </div>


</section>

<script>

const buttonList = document.getElementById('button-list-rivales');
    const buttonGrid = document.getElementById('button-grid-rivales');
    const rivalesTable = document.getElementById('rivales-table-container');
    const rivalesGrilla = document.getElementById('rivales-grilla-container');


    buttonList.addEventListener('mouseover', () => {
        buttonList.children[0].src = '../../assets/imgs/list-green.png'; 

    });

    buttonList.addEventListener('mouseout', () => {
        buttonList.children[0].src = '../../assets/imgs/list-black.png'; 
    });

    buttonGrid.addEventListener('mouseover', () => {
        buttonGrid.children[0].src = '../../assets/imgs/grilla-green.png'; 
    });

    buttonGrid.addEventListener('mouseout', () => {
        buttonGrid.children[0].src = '../../assets/imgs/grilla-black.png'; 
    });

    buttonList.addEventListener('click', () => {
        buttonList.classList.add('hidden');
        buttonGrid.classList.remove('hidden');
        rivalesTable.classList.remove('hidden');
        rivalesGrilla.classList.add('hidden');
        localStorage.setItem('vista', 'table');
    });

    buttonGrid.addEventListener('click', () => {
        buttonList.classList.remove('hidden');
        buttonGrid.classList.add('hidden');
        rivalesTable.classList.add('hidden');
        rivalesGrilla.classList.remove('hidden');
        localStorage.setItem('vista', 'grilla');
    });


    const cargarVista = () => {
        const vista = localStorage.getItem('vista');

        if(!vista){
            localStorage.setItem('vista', 'table');
        }

        if (vista === 'grilla') {
            buttonList.classList.remove('hidden');
            buttonGrid.classList.add('hidden');
            rivalesTable.classList.add('hidden');
            rivalesGrilla.classList.remove('hidden');
        }else{
            buttonList.classList.add('hidden');
            buttonGrid.classList.remove('hidden');
            rivalesTable.classList.remove('hidden');
            rivalesGrilla.classList.add('hidden');
        }
    }


    cargarVista();

</script>