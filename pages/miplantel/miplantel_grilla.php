<section class="w-full h-full ">
    <div class="w-full h-full rounded-xl overflow-hidden bg-light-gray-bg px-6">
        <header class="flex items-center justify-center w-full">
            <a id="miplantel-link-to-equipoform" href="../equipo/equipo.php">
                <div class="flex flex-col items-center gap-1 hover:cursor-pointer w-fit hover-trigger">
                    <img name="escudo" src="../../assets/mi_club/fichas_escudos/escudo_boca_juniors.png"
                        id="preview-img-escudo" alt="Escudo" class="w-32 hover-dark" />
                    <div class="flex gap-2 items-center justify-center relative">
                        <span class="text-black font-bold">BOCA JUNIORS</span>
                        <img src="../../assets/mi_club/4.png" class=" absolute w-6 hover-img right-[-30px]" />
                    </div>
                </div>
            </a>
        </header>
        <main class="w-full flex flex-col ">
             <div class="" id="container-rows-miplantel-grilla">
                <!--<div id="miplantel-row-grilla" class="text-dark-gray-bg w-full flex flex-col hover:text-green ${empty}">
                    <header class="header-row-grilla h-[30px] flex gap-2 items-center justify-center w-full">
                        <div class="flex gap-1 text-nowrap   items-center">
                            <label class="w-fit">
                                <p></p>
                                <input value="Perfectooo" class="focus:outline-none bg-transparent  caret-green"
                                    type="text" />
                            </label>
                            <p id="miplantel-row-count">(5)</p>
                            <div id="miplantel-row-options"
                                class="hidden border-[1px] w-[100px] border-dark-gray-bg bg-white flex items-center justify-between gap-3 p-1 rounded-md">
                                <div>
                                    <img id="miplantel-icon-add-row" class="w-4"
                                        src="../../assets/imgs/plus-black.png" />
                                </div>
                                <div>
                                    <img id="miplantel-icon-edit-row" class="w-4"
                                        src="../../assets/imgs/pencil-black.png" />
                                </div>
                                <div>
                                    <img id="miplantel-icon-delete-row" class="w-4"
                                        src="../../assets/imgs/delete-black.png" />
                                </div>
                            </div>
                        </div>
                        <div id="miplantel-row-divider" class="w-full h-[2px] bg-dark-gray-bg"></div>
                    </header>
                    <main>
                        <div class="dropzone flex items-center min-h-[60px] gap-4 py-4 row-asigned">

                        </div>
                    </main>
                </div> -->
            </div> 
            <div id="miplantel-row-sinasignar-grilla" class="text-dark-gray-bg w-full flex flex-col hover:text-green">
                <header class="flex gap-2 items-center justify-center w-full">
                    <div class="flex gap-1 text-nowrap flex-nowrap  items-center">
                        <p>SIN ASIGNAR</p>
                        <p id="miplantel-sinasignar-count"></p>
                    </div>
                    <div id="miplantel-row-sinasignar-divider" class="w-full h-[2px] bg-dark-gray-bg"></div>
                </header>
                <main>
                    <div class="dropzone flex items-center min-h-[60px] gap-4 py-4 row-not-asigned" id="0">

                    </div>
                </main>
            </div>
        </main>
    </div>
    <footer>

    </footer>
</section>