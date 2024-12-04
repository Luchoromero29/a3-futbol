<section class="w-[22%] bg-black fixed h-full left-0 top-0 flex flex-col items-center gap-8">
    <!-- Logo  -->
    <div class="w-full flex justify-center bg-green items-center h-[70px] bg-gradient-to-t from-black/50 to-50%">
        <img class="w-2/5 text-center" src="../../assets/imgs/-- Marca.png" alt="">
    </div>
    <nav class="w-full text-grayBg">
        <ul class="flex flex-col items-start gap-6 font-bold">
            <li id="inicio" class="left-nav-item hover:text-white cursor-pointer">
                <div tabindex="0" class="flex w-full px-8 gap-4 justify-start items-center focus:text-white">
                    <img class="w-8" src="../../assets/imgs/1 Boton panel.png" />
                    <p class="">Inicio</p>
                </div>
            </li>
            <li id="usuarios" class="left-nav-item hover:text-white w-full">
                <a href="../user/user_list.php">
                    <div class="flex w-full px-8 justify-between items-center cursor-pointer">
                        <div tabindex="0" class="flex items-center gap-4  focus:text-white">
                            <img class="w-8" src="../../assets/imgs/2 Boton panel.png" />
                            <p class="focus:text-white">Usuarios</p>
                        </div>
                        <img class="icon-chevron transition-transform w-6" src="../../assets/imgs/6.png" alt="">
                    </div>
                </a>

            </li>
            <li class="left-nav-item hover:text-white w-full">
                <a href="../miclub/miclub.php">
                    <div class="flex w-full px-8 justify-between items-center cursor-pointer">
                        <div tabindex="0" class="flex items-center gap-4 focus:text-white">
                            <img class="w-8" src="../../assets/imgs/3 Boton panel.png" />
                            <p>Mi club</p>
                        </div>
                        <img class="icon-chevron transition-transform w-6" src="../../assets/imgs/6.png" alt="">
                    </div>
                </a>
            </li>
            <li class="left-nav-item hover:text-white w-full">
                <a href="../miplantel/miplantel.php">
                    <div class="flex w-full px-8 justify-between items-center cursor-pointer">
                        <div tabindex="0" class="flex items-center gap-4 focus:text-white">
                            <img class="w-8" src="../../assets/menu_inicio/4.png" />
                            <p>Mi plantel</p>
                        </div>
                        <img class="icon-chevron transition-transform w-6" src="../../assets/imgs/6.png" alt="">
                    </div>
                </a>
            </li>
            <li class="left-nav-item hover:text-white w-full">
                <a href="../rivales/rivales.php">
                    <div class="flex w-full px-8 justify-between items-center cursor-pointer">
                        <div tabindex="0" class="flex items-center gap-4 focus:text-white">
                            <img class="w-8" src="../../assets/menu_inicio/5.png" />
                            <p>Rivales</p>
                        </div>
                        <img class="icon-chevron transition-transform w-6" src="../../assets/imgs/6.png" alt="">
                    </div>
                </a>
            </li>
            <li class="left-nav-item w-full">
                <div id="togglePresentaciones"
                    class="toggle-list flex w-full px-8 justify-between items-center hover:text-white cursor-pointer relative z-10">
                    <div tabindex="0" class="flex items-center gap-4 focus:text-white">
                        <img class="w-8" src="../../assets/imgs/4 Boton panel.png" />
                        <p>Presentaciones</p>
                    </div>
                    <img class="icon-chevron transition-transform w-6" src="../../assets/imgs/6.png" alt="">
                </div>
                <ul id="presentacionesDropdown"
                    class="opacity-0 w-full pl-[3rem] flex flex-col mt-4 font-normal gap-4 transition-all duration-300 ease-in-out transform -translate-y-1/2 hidden">
                    <li class="menu-item-dropdown hover:text-white flex justify-start items-center cursor-pointer">
                        <p>Agregar presentación</p>
                    </li>
                    <li id="lista"
                        class="menu-item-dropdown hover:text-white flex w-3/4 justify-start items-center cursor-pointer">
                        <p>Lista</p>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="sistema-deportes" class="flex items-center gap-2 w-full justify-start 
                        absolute bottom-6 cursor-pointer pl-8
                        text-green  hover:text-white">
        <img class="w-10 h-10" src="../../assets/imgs/5 consulta.png" original-src="../../assets/imgs/5 consulta.png"
            data-hover-src="../../assets/imgs/5 consulta hover.png" alt="">
        <p>Sistema Deportes</p>
    </div>
</section>

<script>
    // Obtener los elementos necesarios
    const togglePresentaciones = document.getElementById('togglePresentaciones');
    const presentacionesDropdown = document.getElementById('presentacionesDropdown');

    // Agregar evento de clic al botón
    togglePresentaciones.addEventListener('click', () => {
        // Alternar la visibilidad del dropdown
        presentacionesDropdown.classList.toggle('hidden');
        presentacionesDropdown.classList.toggle('opacity-0');
        presentacionesDropdown.classList.toggle('translate-y-0');  // Mostrar el menú
    });
</script>