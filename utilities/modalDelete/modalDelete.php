<div id="deleteModal"
    class="hidden fade-in fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-100 bg-black/50">
    <div class="border border-lines-color rounded-md shadow-xl overflow-hidden bg-white max-w-md mx-auto">
        <!-- Encabezado -->
        <header id="modalHeader" class="p-4 text-center bg-green text-white flex gap-1 justify-center items-center rounded-t-md">
            <p id="modalTitle"></p>
        </header>
        <!-- Contenido principal -->
        <main id="modalBody" class="p-4 text-wrap text-center flex items-center justify-center rounded-b-md bg-white">
            <!-- Botones -->
            <button id="modalCancel"
                class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-l-lg hover:text-green border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black">
                <p></p>
            </button>
            <button id="modalConfirm"
                class="w-20 bg-gradient-to-b from-gray-200 to-black text-white p-1 rounded-r-lg hover:text-green border border-green transition-all duration-300 ease-out hover:from-black/30 hover:to-black">
                <p></p>
            </button>
        </main>
    </div>
</div>
