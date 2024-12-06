<form id="player-form" class="">
    <main
        class="relative grid lg:grid-cols-2 lg:grid-rows-2 px-[10%] pt-[100px] lg:px-4 grid-cols-1 grid-rows-3 2xl:grid-cols-3 2xl:grid-rows-1 gap-8 grid-cols-s grid-rows-3">
        <div class="col-span-1 row-span-1 flex flex-col gap-10 items-center justify-start">
            <div class="flex justify-center items-start px-4">
                <label class="cursor-pointer">
                    <div class="bg-black p-1 rounded-lg text-white text-center relative w-40">
                        <div id="file-container"
                            class="relative h-full aspect-square border-4 border-black hover:border-green rounded-lg transition duration-150 pointer flex justify-center items-center overflow-hidden">
                            <div id="edit-file-input"
                                class="flex justify-center items-center absolute bg-black/50 w-full h-full text-white hidden">
                                <p>Editar</p>
                            </div>
                            <img name="avatar" id="preview-img" class="w-[170px] h-[170px] object-cover hidden"
                                alt="Preview" />
                            <p id="placeholder-text" class="text-white">foto</p>
                        </div>
                        <span class="p-2">pedrito</span>
                    </div>
                    <input type="file" class="hidden" id="file-input" name="avatar" accept=".png, .jpg, .jpeg .webp">
                </label>
            </div>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Nombre</span>
                <input type="text" name="name"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Posicion</span>
                <input type="text" name="position"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-between w-full">
                <div class="flex flex-col gap-2">
                    <span>Arquero</span>
                    <input type="checkbox">
                </div>
                <div class="flex flex-col gap-2">
                    <span>Capitan</span>
                    <input type="checkbox">
                </div>
                <div class="flex flex-col gap-2">
                    <span>Suplente</span>
                    <input type="checkbox">
                </div>
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full text-nowrap">
                <span>N° camiseta</span>
                <input type="number" name="nro"
                    class=" w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
        </div>
        <div class="hidden lg:block absolute h-[542px] w-[2px] bg-darkGrayBg left-[50%] 2xl:left-[33.3%] top-[100px]">
        </div>
        <div class="col-span-1 row-span-1 flex flex-col gap-8 items-center justify-start">
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Nacionalidad</span>
                <input type="text" name="nacionality"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Nacimiento</span>
                <input type="date" name="birthdate"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Edad</span>
                <input type="text" name="age"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Peso</span>
                <input type="text" name="weight"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Altura</span>
                <input type="text" name="height"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full text-nowrap ">
                <span>Pierna habil</span>
                <input type="text" name="legEnabled"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
            </label>
            <label class="flex items-center justify-end gap-4 px-2 w-full">
                <span>Trayectoria</span>
                <textarea rows="5" name="trajectory"
                    class="w-[75%] lg:w-[75%] px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
                        </textarea>
            </label>

        </div>
        <div class="hidden 2xl:block absolute h-[542px] w-[2px] bg-darkGrayBg left-[66.6%] top-[100px]"></div>
        <div
            class="lg:col-span-2 lg:row-span-1 col-span-1 row-span-1 2xl:col-span-1 2xl:row-span-1 flex flex-col gap-8 items-center justify-start">
            <label class="flex flex-col items-start justify-start gap-4 px-2 w-full">
                <span>Observaciones</span>
                <textarea id="summernote" name="observations"
                    class="w-full px-2 py-1 rounded-lg border-2 caret-green border-darkGrayBg/30 hover:border-green ">
                        </textarea>
            </label>
        </div>

    </main>
    <footer>

    </footer>
</form>

