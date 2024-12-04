<section class="fade-in p-4 w-full flex flex-col h-full box-border items-center relative">
    <header class="py-1 bg-black w-full flex px-[10px] items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/mi_club/1.png" />
        <p class="text-white ml-2">Mi club</p>
    </header>
    <main class="bg-white w-full flex flex-grow border border-linesColor items-center p-10">
        <?php include '../equipo/equipo_form.php' ?>
    </main>
    <div id="alert" class="border border-linesColor rounded-md shadow-lg w-60 fixed bottom-5 hidden">
        <header class="bg-green text-white flex gap-1 justify-center items-center  rounded-t-md">
            <p class="text-3xl">!</p>
            <p>ATENCIÓN</p>
        </header>
        <main class="p-2 text-wrap text-center flex items-center justify-center rounded-b-md bg-white">
            <p id="label-alert"></p>
        </main>
    </div>
    <div id="alert" class="border border-linesColor rounded-md shadow-3xl w-60 fixed bottom-5 hidden">
        <header class="bg-green text-white flex gap-1 justify-center items-center  rounded-t-md">
            <p class="text-3xl">!</p>
            <p>ATENCIÓN</p>
        </header>
        <main class="p-2 text-wrap text-center flex items-center justify-center rounded-b-md bg-white">
            <p id="label-alert"></p>
        </main>
    </div>
</section>


