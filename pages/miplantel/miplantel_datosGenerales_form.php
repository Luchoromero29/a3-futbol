<form id="infoGeneral-player-form" class="px-6 flex flex-col lg:gap-24">
    <main id="content-to-print"
        class="relative grid lg:grid-cols-2 lg:grid-rows-3  pt-[100px]  grid-cols-1 grid-rows-3 2xl:grid-cols-3 2xl:grid-rows-1 gap-8 grid-cols-s grid-rows-3">
        <div class="col-span-1 row-span-1 lg:row-span-2 flex flex-col gap-12 items-center justify-start">
            <div class="flex justify-center items-start px-4">
                <label class="cursor-pointer">
                    <div class="bg-black p-1 rounded-lg text-white text-center relative w-40">
                        <div id="file-container"
                            class="relative h-full aspect-square border-4 border-black hover:border-green rounded-lg transition duration-150 pointer flex justify-center items-center overflow-hidden">
                            <div id="edit-file-input"
                                class="flex justify-center items-center absolute bg-black/50 w-full h-full text-white hidden">
                                <p>Editar</p>
                            </div>
                            <img id="preview-img" class="w-[170px] h-[170px] object-cover hidden"
                                alt="Preview" />
                            <p id="placeholder-text" class="text-white">foto</p>
                        </div>
                        <span id="player-name" class="p-2"></span>
                    </div>
                    <input type="file" class="hidden" id="file-input" name="name_15" accept=".png, .jpg, .jpeg .webp">
                </label>
            </div>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Nombre</span>
                <input type="text" id="player-name-input" name="name_1"
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <div class="flex gap-1">
                    <span>Posicion</span>
                    <p class="text-green">*</p>
                </div>
                <input type="text" name="name_2" id="player-position-input" required
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-between w-full max-w-[80%] ">
                <div class="flex flex-col gap-2">
                    <span>Arquero</span>
                    <input type="checkbox" name="name_3" value="Arquero">
                </div>
                <div class="flex flex-col gap-2">
                    <span>Capitán</span>
                    <input type="checkbox" name="name_4" value="Capitan">
                </div>
                <div class="flex flex-col gap-2">
                    <span>Suplente</span>
                    <input type="checkbox" name="name_5" value="Suplente">
                </div>
            </label>
            <label class="flex items-center justify-end gap-4  w-full text-nowrap">
                <span>N° camiseta</span>
                <input type="number" name="name_6"  
                    class=" w-[75%] lg:w-[75%]  p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
        </div>
        <div class="hidden lg:block absolute h-[638px] w-[2px] bg-dark-gray-bg left-[50%] 2xl:left-[33.3%] top-[100px]">
        </div>
        <div class="col-span-1 row-span-1 lg:row-span-2 flex flex-col gap-12 items-center justify-start">
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Nacionalidad</span>
                <input type="text" name="name_7"
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Nacimiento</span>
                <input type="date" name="name_8" id="input-birthdate-player"
                    class="w-[75%] lg:w-[75%]  p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Edad</span>
                <input type="text" id="input-age-player" name="name_9" readonly
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Peso</span>
                <input type="text" name="name_10"
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Altura</span>
                <input type="text" name="name_11"
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full text-nowrap ">
                <span>Pierna habil</span>
                <input type="text" name="name_12"
                    class="w-[75%] lg:w-[75%] input-45 p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4  w-full">
                <span>Trayectoria</span>
                <textarea rows="5" name="name_13"
                    class="w-[75%] lg:w-[75%]  p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
                        </textarea>
            </label>

        </div>
        <div class="hidden 2xl:block absolute h-[638px] w-[2px] bg-dark-gray-bg left-[66.6%] top-[100px]"></div>
        <div
            class="lg:col-span-2 lg:row-span-1 col-span-1 row-span-1 2xl:col-span-1 2xl:row-span-1 flex flex-col gap-8 items-center justify-start">
            <label class="flex flex-col items-start justify-start gap-4  w-full">
                <span>Observaciones</span>
                <textarea id="summernote" name="name_14"
                    class="w-full  p-1 rounded-lg border-2 caret-green border-dark-gray-bg/30 hover:border-green ">
                        </textarea>
            </label>
        </div>

    </main>
    <footer class="flex lg:flex-row flex-col gap-10 lg:gap-0 justify-between items-center">
        <div class="flex px-8 w-[320px] items-center justify-center gap-5">
            <button id="miplantel-button-cancel-form" class="cancel-style w-[120px] py-2 rounded-lg text-center">
                <p>Cancelar</p>
            </button>
            <button type="submit" id="miplantel-button-save-form" class="save-style w-[120px] py-2 rounded-lg text-center">
                <p>Guardar</p>
            </button>
        </div>
        <div class="flex items-center justify-center gap-5">
            <div class="miplantel-button-trasnferencia flex items-center justify-center gap-2 cursor-pointer">
                <div class="rounded-md border-2 border-dark-gray-bg bg-black">
                    <img src="../../assets/imgs/arrow-tr-white.png" alt="" class="w-7">
                </div>
                <p>Transferencia</p>
            </div>
            <div id="print-button" class="flex items-center justify-center gap-2 cursor-pointer">
                <div class="rounded-md border-2 border-dark-gray-bg bg-black">
                    <img src="../../assets/imgs/print-white.png" alt="" class="w-7">
                </div>
                <p>Imprimir</p>
            </div>
            <div id="button-delete-player-form" class="flex items-center justify-center gap-2 cursor-pointer">
                <div class="rounded-md border-2 border-dark-gray-bg bg-black">
                    <img src="../../assets/imgs/10 eliminar hover.png" alt="" class="w-7">
                </div>
                <p>Eliminar</p>
            </div>
        </div>
    </footer>
</form>