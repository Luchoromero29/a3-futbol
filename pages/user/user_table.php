<section id="presentations-table-container"
    class=" w-[93%] xl:w-[90%] bg-white mt-8  z-10 border border-lines-color">
    <!-- Mensaje de seleccionados / Add Presentation btn -->
    <header class="bg-black w-full flex px-[10px] py-1 items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/usuarios/12 para titulo de pantalla.png" />
        <p class="text-white ml-2">Usuarios</p>
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
    <div class="flex flex-col justify-end px-8">
        <button class="flex border-none gap-2 justify-center w-fit">
            <!-- Lo mismo que en el editar, linkeo el user.php para poder ver la redireccion, faltaria ajustarle el href y pasar el id como parametro -->
            <a href="user.php?to=user_list.php">
                <span class="hover:text-green">Agregar usuario</span>
            </a>
            <div class="bg-green rounded-full h-6 w-6 relative">
                <span class="absolute inset-0 flex items-center justify-center text-lg text-white">+</span>
            </div>
        </button>
    </div>
    <!-- tabla -->
    <div class="w-full overflow-x-auto p-8 overflow-hidden">
        <table id="users-table" class="styles-table w-full row-border overflow-x-auto text-sm">
            <thead class="bg-black text-white hover:!bg-black thead-dark">
                <!-- Seleccionar todas las filas btn -->
                <tr>
                    <th id="columna-seleccion-1" scope="col" class="">
                        <div class="flex justify-between items-center">
                            <button id="selectAllUsersButton"
                                class="w-6 h-6 border-2 border-gray-bg rounded-md hover:border-green ">
                                <img id="checkboxIcon" class="hidden" src="../../assets/imgs/3.png" alt="Seleccionado boton">
                            </button>
                            <button id="deselectAllUsersButton" class=" hidden bg-gray-bg/0">
                                <span class="">
                                    <img onmouseover="this.src='assets/imgs/9 eliminar.png'"
                                        onmouseout="this.src='../../assets/imgs/10 eliminar hover.png'" class="w-7 h-7 hover:"
                                        src="../../assets/imgs/10 eliminar hover.png" alt="Seleccionado boton" />
                                </span>
                            </button>
                        </div>
                    </th>
                    <th scope="col"></th> <!-- Id col -->
                    <th scope="col">E-mail</th>
                    <th scope="col" class="text-white">Nombre</th>
                    <th scope="col" class="text-white">Cargo</th>
                    <th scope="col" class="text-white">Rol</th>
                    <th scope="col"></th> <!-- botones accion col -->
                </tr>
            </thead>
            <tbody>
                <!-- <tr class="even" pr_id="2">
     
                 </tr> -->
            </tbody>
        </table>
    </div>
    <div id="deleteModal"
        class="hidden fade-in fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-100 bg-black/50">
        <div class="border border-lines-color rounded-md shadow-xl overflow-hidden bg-white max-w-md mx-auto">
            <header class="p-4 text-center bg-green text-white flex gap-1 justify-center items-center rounded-t-md">
                <p>¿Deseas eliminar los usuarios seleccionados?</p>
            </header>
            <main class="p-4 text-wrap text-center flex items-center justify-center rounded-b-md bg-white">
                <button id="cancelDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-l-lg hover:text-green border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black">
                    <p>No</p>
                </button>
                <button id="confirmDelete"
                    class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-r-lg hover:text-green border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black">
                    <p>Sí</p>
                </button>
            </main>
        </div>
    </div>


    <div id="userInfoModal"
        class="hidden top-0 left-0 fixed h-full w-full flex justify-center items-center z-100 bg-black/30 ">
    </div>

</section>

<script>


</script>