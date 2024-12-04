<section id="user-form-container" class="fade-in p-4 w-full flex flex-col h-full box-border items-center relative">
    <header class="bg-black w-full flex px-[10px] py-1 items-center rounded-sm ">
        <img class="h-8 w-8" src="../../assets/usuarios/12 para titulo de pantalla.png" />
        <p class="text-white ml-2">Usuarios</p>
    </header>
    <main class="bg-white w-full flex flex-grow border border-linesColor items-center p-10">
        <form id="user-form" class="flex flex-col w-full h-full gap-12 justify-center items-center">
            <div class="w-full md:h-[90%] h-[94%]  flex flex-col md:flex-row  md:justify-between gap-6">

                <div class="w-full h-full grid grid-cols-1 grid-rows-7 gap-12 max-w-[400px] m-auto">
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Nombre y apellido</p>
                            <p class="text-green">*</p>
                        </div>
                        <input required name="nombre" type="text"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Fecha de nacimiento</p>
                        </div>
                        <input name="birthdate" type="date"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Sexo</p>
                        </div>
                        <input name="sexo" type="text"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Nacionalidad</p>
                        </div>
                        <input name="nacionalidad" type="text"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Domicilio (Lugar de residencia actual)</p>
                        </div>
                        <input name="domicilio" type="text"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Dirección de email</p>
                            <p class="text-green">*</p>
                        </div>
                        <input required name="email" type="email"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                    <label class="flex flex-col gap-1 row-span-1">
                        <div class="flex gap-1">
                            <p>Celular</p>
                        </div>
                        <input name="celular" type="text"
                            class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                    </label>
                </div>
                <div class="md:bg-grayBg md:w-1 md:h-full md:w-1"></div>
                <div class="w-full h-full  grid grid-rows-7 md:gap-12  max-w-[400px] m-auto">

                    <div class="row-span-3 grid grid-rows-3 gap-12">
                        <label class="flex justify-center items-center row-span-2">
                            <div id="file-container"
                                class="relative h-full aspect-square border-4 border-black hover:border-green rounded-lg transition duration-150 pointer flex justify-center items-center overflow-hidden">
                                <div id="edit-file-input"
                                    class="flex justify-center items-center absolute bg-black/50 w-full h-full text-white hidden">
                                    <p>Editar</p>
                                </div>
                                <img name="avatar" id="preview-img" class="w-[170px] h-[170px] object-cover hidden"
                                    alt="Preview" />
                                <p id="placeholder-text" class="text-green">foto</p>
                            </div>
                            <input type="file" name="avatar" id="file-input" class="hidden" accept="image/*">
                        </label>
                        <label class="flex flex-col gap-1 row-span-1 ">
                            <div class="flex gap-1">
                                <p>Contraseña</p>
                                <p class="text-green">*</p>
                            </div>
                            <input required name="password" type="password"
                                class="border border-linesColor px-2 py-1 rounded-lg focus:outline-none caret-green">
                        </label>
                    </div>
                    <div class=" md:row-span-2"></div>
                    <div class="row-span-2 grid grid-rows-2 gap-12 ">
                        <label class="flex flex-col gap-1 row-span-1">
                            <div class="flex gap-1">
                                <p>Cargo</p>
                                <p class="text-green">*</p>
                            </div>
                            <select required name="cargo" type="text"
                                class="hover:border-green border border-linesColor px-2 py-1.5 rounded-lg focus:outline-none caret-green">
                                <option value="">Seleccionar</option>
                            </select>
                        </label>
                        <label class="flex flex-col gap-1 row-span-1">
                            <div class="flex gap-1">
                                <p>Rol</p>
                                <p class="text-green">*</p>
                            </div>
                            <select required name="rol" type="text"
                                class="hover:border-green border border-linesColor px-2 py-1.5 rounded-lg focus:outline-none caret-green">
                                <option value="">Seleccionar</option>
                            </select>
                        </label>
                    </div>

                </div>
            </div>
            <div class="flex gap-4 pb-8 md:pb-0 flex justify-between items-center">
                <button class=" w-32 cancel-style p-2 rounded-lg " id="button-cancel"
                    type="button">Cancelar</button>
                <button class="w-32 save-style  p-2 rounded-lg " id="button-submit" type="submit"></button>
            </div>
        </form>
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
</section>



<script type="module">

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    let user;

    let cargo = [
        "Asistente de campo",
        "Director técnico",
        "Preparador físico",
        "Jugador",
        "Staff"
    ];



    let rol = [
        "Administrador",
        "Colaborador",
        "Jugador"
    ];


    const $buttonSubmit = document.querySelector("#button-submit");
    const $buttonCancel = document.querySelector("#button-cancel");
    const $modalEstaVacio = document.querySelector("#alert");

    const placeholderText = document.getElementById('placeholder-text');
    const fileInputContainer = document.querySelector("#file-container");

    const $labelAlert = document.querySelector("#label-alert");
    const $form = document.querySelector("#user-form");

    const requiredFields = ["email", "password", "nombre", "cargo", "rol"];

    fileInputContainer.addEventListener('mouseenter', () => {
        placeholderText.textContent = 'Agregar foto';
    });

    fileInputContainer.addEventListener('mouseleave', () => {
        placeholderText.textContent = 'foto';
    });

    const getUser = async () => {
        const user = await fetch('../../data/usersTable.json')
            .then(response => response.json())
            .then(data => data.find(e => e.id == userId));
        return user;
    }

    document.addEventListener("DOMContentLoaded", async () => {

        const $selectCargo = document.querySelector("select[name='cargo']")
        const $selectRol = document.querySelector("select[name='rol']")

        $buttonSubmit.addEventListener("click", handleSubmit);
        $buttonCancel.addEventListener("click", handleCancel);

        if ($selectCargo && $selectRol) {
            cargo.forEach(cargo => {
                const $option = document.createElement("option")
                $option.value = cargo
                $option.textContent = cargo
                $selectCargo.appendChild($option)
            })
            rol.forEach(rol => {
                const $option = document.createElement("option")
                $option.value = rol
                $option.textContent = rol
                $selectRol.appendChild($option)
            })
        }

        if (userId) {
            $buttonSubmit.textContent = "Actualizar";

            user = await getUser();


            const formData = new FormData($form);

            Object.keys(user).forEach(key => {
                if (key === "cargo" || key === "rol") {
                    console.log(key);

                    const select = $form.querySelector(`select[name="${key}"]`);
                    console.log(select);

                    if (select) {
                        if (key === "rol") {
                            select.value = user[key];
                        } else {
                            select.value = user[key];
                        }
                    }
                } else {
                    if (key === "avatar") {
                        console.log(key);

                        const inputImg = $form.querySelector(`[name="${key}"]`);
                        const previewImg = document.getElementById('preview-img');
                        const placeholderText = document.getElementById('placeholder-text');
                        const editFileInput = document.querySelector("#edit-file-input");

                        console.log(inputImg);

                        if (inputImg) {
                            previewImg.classList.remove('hidden');
                            placeholderText.classList.add('hidden');
                            editFileInput.classList.remove('hidden');
                            inputImg.src = user[key];
                        }
                    } else {
                        const input = $form.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.value = user[key];
                        }
                    }
                }
            });


        } else {
            $buttonSubmit.textContent = "Guadar"

        }

        requiredFields.forEach((field) => {
            const input = $form.querySelector(`[name="${field}"]`);
            input.addEventListener("input", (e) => {
                if (input.value !== "") {
                    removeErrorInput(field);
                }
            })

        })
    })


    document.getElementById('file-input').addEventListener('change', function (event) {
        const file = event.target.files[0];
        const previewImg = document.getElementById('preview-img');
        const placeholderText = document.getElementById('placeholder-text');
        const editFileInput = document.querySelector("#edit-file-input");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.classList.remove('hidden');
                placeholderText.classList.add('hidden');
                editFileInput.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            previewImg.classList.add('hidden');
            placeholderText.classList.remove('hidden');
            editFileInput.classList.add('hidden');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData($form);

        const entries = Object.fromEntries(formData.entries());

        //recupero los usuarios "de la api"
        const data = await getUser();

        let hasEmptyFields = false;

        requiredFields.forEach((field) => {
            if (entries[field] === "") {
                showErrorInput(field)
                showAlert("Debes completar todos los campos obligatorios (*)")
                hasEmptyFields = true;
            } else {
                removeErrorInput(field)
            }
        });

        if (hasEmptyFields) return

        //verifico la existencia del usuario en una peticion asincrona 
        data.map((user) => {
            if (user.email === entries.email) {
                showErrorInput("email")
                showAlert("Email ya registrado")
                return
            }
        })


        //Valido con exprsion regular si el email es valido
        if (!validarEmail(entries.email)) {
            showErrorInput("email")
            showAlert("El email no es válido")
            return
        }

        //valido con expresion regular si la contraseña es valida
        const checkPassword = validarPassword(entries.password)
        if (checkPassword !== true) {
            showErrorInput("password")
            showAlert(checkPassword)
            return
        }

        if (user) {
            handleSubmitActualizar(entries)
        } else {

            let newUser = entries

            newUser.id = ++data[data.length - 1].id;

            console.log(newUser);
            alert("Usuario guardado exitosamente")

            //redireccion();

        }
    }

    const handleCancel = () => {
        redireccion();
    }

    const showErrorInput = (field) => {
        const input = $form.querySelector(`[name="${field}"]`);
        input.classList.add("border-2");
        input.classList.add("border-red-400");
    }

    const removeErrorInput = (field) => {
        const input = $form.querySelector(`[name="${field}"]`);
        input.classList.remove("border-2");
        input.classList.remove("border-red-400");
    }



    const showAlert = (label) => {
        $labelAlert.textContent = label
        $modalEstaVacio.classList.remove("hidden")
        $modalEstaVacio.classList.add("show")
        setTimeout(() => {
            $modalEstaVacio.classList.add("hidden")
            $modalEstaVacio.classList.remove("show")
        }, 2500)
    }

    const handleSubmitActualizar = (entries) => {
        Object.keys(user).forEach(key => {
            if (key !== "id") {
                user[key] = entries[key] || user[key]
            }
        })
        console.log(user);
        alert("Usuario actualizado exitosamente")
    }

    //funcion para validar estructura del email
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validarPassword(password) {
        //validar largo de la contraseña
        if (password.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }

        // Validar al menos una letra minúscula
        if (!/(?=.*[a-z])/.test(password)) {
            return "La contraseña debe contener al menos una letra minúscula.";
        }

        // Validar al menos una letra mayúscula
        if (!/(?=.*[A-Z])/.test(password)) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }

        // Validar al menos un número
        if (!/(?=.*\d)/.test(password)) {
            return "La contraseña debe contener al menos un número.";
        }
        return true
    }

    const redireccion = () => {
        const params = new URLSearchParams(window.location.search);
        const pathTo = params.get('to');

        if (pathTo) {
            window.location.href = ` ${pathTo} `;
        }
    }
</script>