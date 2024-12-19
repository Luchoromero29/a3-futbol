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

            </div>
            <div id="miplantel-row-sinasignar-grilla" class="text-dark-gray-bg w-full flex flex-col hover:text-green">
                <header class="flex gap-2 items-center justify-center w-full">
                    <div class="flex gap-1 text-nowrap flex-nowrap  items-center">
                        <p>SIN ASIGNAR</p>
                        <p id="miplantel-sinasignar-count"></p>
                        <div id="miplantel-sinasignar-row-options"
                            class="hidden border-[1px] w-[40px] border-dark-gray-bg bg-white flex items-center justify-center gap-3 p-1 rounded-md">
                            <div>
                                <img id="miplantel-icon-add-first-row" class="w-4" src="../../assets/imgs/plus-black.png" />
                            </div>
                        </div>
                    </div>
                    <div id="miplantel-row-sinasignar-divider" class="w-full h-[2px] bg-dark-gray-bg"></div>
                </header>
                <main class="relative flex items-center">
                    <div class="flex items-center justify-center">
                        <button id="miplantel-carousel-left-button"
                            class=" text-gray-bg text-3xl hover:text-green duration-150 p-3">
                            <
                        </button>
                    </div>
                    <div class="carousel ">
                        <div class="dropzone flex items-center min-h-[60px] w-full gap-4 py-4 row-not-asigned" id="0">

                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <button id="miplantel-carousel-right-button"
                            class="text-gray-bg text-3xl hover:text-green duration-150 p-3">></button>
                    </div>
                </main>
            </div>
        </main>
    </div>
    <footer>
    </footer>
</section>