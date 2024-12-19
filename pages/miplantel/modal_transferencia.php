<section id="modal-trasnferencia-container"
    class="fade-in fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-100 bg-black/50">
    <div
        class="pt-10 pb-4 bg-white shadow-3xl rounded-3xl border-2 border-green flex flex-col  justify-between max-h-[600px] min-w-[450px]">
        <header class="flex w-full text-xl">
            <div class="pl-8 bg-green flex gap-2 items-center text-white w-[85%]">
                <img src="../../assets/imgs/arrow-tr-white.png" class="w-8" alt="" />
                <span>Transferencia</span>
            </div>
            <div class="bg-white flex justify-center items-center w-[15%] px-4">
                <img src="../../assets/imgs/19.png" id="close-modal-transferencia" class="w-10 cursor-pointer"
                    onmouseover="this.src='../../assets/imgs/19 hover.png'"
                    onmouseout="this.src='../../assets/imgs/19.png'" alt="">
            </div>
        </header>
        <main class="flex flex-col w-full gap-6 pt-10 overflow-hidden px-7">
            <div id="label-container-modal-transferencia" class="overflow-y-auto flex flex-col gap-2 max-h-[300px] ">
                <!-- Aquí van las opciones dentro del contenedor -->
            </div>
        </main>
        <footer class="w-full flex justify-end gap-4 py-2 w-[85%]">
            <button id="button-cancel-trasnferencia" class="w-[100px] py-2 rounded-lg text-center">
                <p>Cancelar</p>
            </button>
            <button type="submit" id="button-confirm-trasnferencia"
                class="save-style w-[100px] py-2 rounded-lg text-center">
                <p>Listo</p>
            </button>
        </footer>
    </div>
</section>