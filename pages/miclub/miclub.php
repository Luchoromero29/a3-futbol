<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../../styles.css">
    <script src="../../script.js"></script>
    <script src="../../shareModal.js"></script>
    <script src="../../presentationsTable.js"></script>
    <script src="../user/usersTable.js"></script>
    <script src="../../navigation.js"></script>
    <script src="../../tailwind.config.js"></script>
    <title>Pizarra A3</title>
</head>

<body class="flex flex-col bg-lightGrayBg ">
    <!-- Usuario en header-->
    <header class="w-full flex justify-end bg-white min-h-[70px]">
        <div class="flex gap-2 items-center px-8 cursor-pointer text-sm xl:text-base">
            <img class="w-[40px] rounded-full" src="../../assets/avatar_test/avatar09.jpg" alt="">
            <div id="profile-header" class="relative">
                <p class="font-medium text-black hover:text-green">Nombre de la Cuenta</p>
                <div class="hidden absolute z-50 flex flex-col w-full bg-white border border-grayBg rounded-md text-sm">
                    <button id="change-photo-btn"
                        class="py-2 gap-1 hover:text-green hover:bg-lightGrayBg flex items-center pl-[15%] rounded-t-md">
                        <img class="h-5 w-5 inline rounded-full bg-grayBg" src="../../assets/imgs/14 lapiz hover.png" alt="">
                        Cambiar foto
                    </button>
                    <button id="sign-out-btn"
                        class="py-2 gap-1 hover:text-green hover:bg-lightGrayBg flex items-center pl-[15%] rounded-b-md">
                        <img class="h-5 w-5 inline" src="../../assets/imgs/off.png" original-src="../../assets/imgs/off.png"
                            data-hover-src="../../assets/imgs/offHover.png" alt="">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>

    </header>

    <!-- Contenido General -->
    <main class="bg-lightGrayBg w-full pl-[22%] h-full pb-10
                flex-1 flex flex-col items-center justify-between 
                relative text-sm xl:text-base">
        <!-- Panel de Navegación -->
        <div id="navbar-content" class="">
            <?php include("../../utilities/navbar.php"); ?>
        </div>

        <div id="main-content" class="hidden w-full h-screen flex justify-center items-start">
            <?php include("./miclub_form.php"); ?>

        </div>

        <div id="loader" class="w-full h-full flex justify-center items-center">
            <div class="loading-ball"></div>
        </div>

    </main>

    <style>
        #pr-table th,
        #users-table th {
            font-size: 15px;
            box-sizing: border-box;
        }
    </style>

    <script>
        window.addEventListener('load', () => {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
        })
    </script>

</body>

</html>