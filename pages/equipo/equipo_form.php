<form id="equipo-form" class=" fade-in flex flex-col w-full h-full gap-[80px] justify-center items-center">
    <div class="w-full md:h-[90%] h-[94%] items-center justify-center gap-12 flex flex-col ">
        <div class="w-full">
            <label class="flex flex-col items-center gap-2 w-full">
                <input required type="text" id="input-text-club" name="nombre"
                    class="rounded-md border-2 border-green p-1 hover:border-black text-center w-fit"
                    style="text-transform: uppercase;">
                <span class="text-grayBg">Nombre del club
                    <span class="text-green">*</span>
                </span>
            </label>
        </div>
        <div class="flex flex-col gap-16 items-center">
            <label class="flex flex-col items-center gap-2 hover:cursor-pointer w-fit hover-trigger">
                <img name="escudo" src="../../assets/mi_club/5.png" id="preview-img-escudo" alt="Escudo" class="w-32 hover-dark" />
                <input name="escudo" type="file" id="input-file-escudo" class="hidden" accept=".png, .jpg, .jpeg">
                <span class="text-grayBg ">Escudo</span>
                <img  src="../../assets/mi_club/4.png" class="w-6 hover-img"  />
            </label>
            <div class="flex md:justify-between flex-col md:flex-row gap-16 ">
                <label class="flex flex-col items-center hover:cursor-pointer hover-trigger">
                            <img name="arquero" src="../../assets/mi_club/6.png" id="preview-img-arquero" alt="Camiseta Arquero"
                    class="w-[150px] h-[150px] object-contain hover-dark" />
                <input name="arquero" type="file" id="input-file-arquero" class="hidden" accept=".png, .jpg, .jpeg">
                <span class="text-grayBg mt-[10px]">Arquero</span>
                <img  src="../../assets/mi_club/4.png" class="w-6 mt-2 hover-img"  />
                </label>
                <label class="flex flex-col items-center hover:cursor-pointer hover-trigger">
                            <img name="jugador" src="../../assets/mi_club/7.png" id="preview-img-jugador" alt="Camiseta Jugador"
                    class="w-[150px] h-[150px] object-contain hover-dark" />
                <input name="jugador" type="file" id="input-file-jugador" class="hidden" accept=".png, .jpg, .jpeg">
                <span class="text-grayBg mt-[10px]">Jugador</span>
                <img src="../../assets/mi_club/4.png" class="w-6 mt-2 hover-img" />
                </label>
                <label class="flex flex-col items-center hover:cursor-pointer hover-trigger">
                    <img name="suplente" src="../../assets/mi_club/8.png" id="preview-img-suplente" 
                    alt="Camiseta Suplente" class="w-[150px] h-[150px] object-contain hover-dark" />
                    <input name="suplente" type="file" id="input-file-suplente" class="hidden"
                        accept=".png, .jpg, .jpeg">
                    <span class="text-grayBg mt-[10px]">Suplente</span>
                    <img src="../../assets/mi_club/4.png" class="w-6 mt-2 hover-img" />
                </label>
            </div>
        </div>

    </div>
    <div class="flex gap-4 pb-8 md:pb-0 flex justify-between items-center mb-[10px]">
        <button class="h-11 w-24 bg-grayBg hover:bg-darkGrayBg text-white p-2 rounded-lg" id="button-cancel"
            type="button">Cancelar</button>
        <button class="h-11 w-24 bg-green text-white p-2 rounded-lg hover:bg-darkGreen" id="button-submit"
            type="submit">Guardar</button>
    </div>
</form>

<script type="module">
    
    const params = new URLSearchParams(window.location.search);
    const equipoId = params.get('id');


    const getEquipo = async () => {
        const equipo = await fetch('../../data/equipos.json')
            .then(response => response.json())
            .then(data => data.find(e => e.id == equipoId));
        return equipo;
    }


    const $form = document.getElementById("equipo-form");
    const $labelAlert = document.querySelector("#label-alert");
    const $alert = document.querySelector("#alert");
    const $buttonSubmit = document.querySelector("#button-submit");
    const $buttonCancel = document.querySelector("#button-cancel");


    document.addEventListener("DOMContentLoaded", () => {
        updatePreview('input-file-escudo', 'preview-img-escudo');
        updatePreview('input-file-arquero', 'preview-img-arquero');
        updatePreview('input-file-jugador', 'preview-img-jugador');
        updatePreview('input-file-suplente', 'preview-img-suplente');

        $form.addEventListener("submit", (e) => {
            console.log("Enviando formulario...");

            handleFormSubmit(e);
        });

        //si existe club (se va a editar)
        if (equipoId) {
            $buttonSubmit.textContent = "Actualizar";
            cargarDatosForm();
        }

        $buttonCancel.addEventListener("click", () => {
            redireccion();
        });

    })

    function updatePreview(inputId, previewId) {
        const inputFile = document.getElementById(inputId);
        const previewImg = document.getElementById(previewId);

        inputFile.addEventListener('change', function (event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const cargarDatosForm = async () => {

        const equipo = await getEquipo();

        const formData = new FormData($form);

        $inputTextClub.classList.add('border-none');
        $inputTextClub.classList.add("font-bold");
        $inputTextClub.classList.add("text-xl");
        $inputTextClub.classList.add("w-[600px]");
        $inputTextClub.classList.remove("w-fit");

        Object.keys(equipo).forEach(key => {
            const input = $form.querySelector(`[name="${key}"]`);

            // Verificar si el campo es de texto o de imagen
            if (input) {
                if (input.type === "text") {
                    
                    input.value = equipo[key];
                } else if (input.type === "file" || input.tagName === "IMG") {
                    const img = $form.querySelector(`img[name="${key}"]`);
                    if (img) {
                        img.src = equipo[key];
                    }
                }
            }
        });
    }

    const $inputTextClub = document.querySelector("#input-text-club");

    $inputTextClub.addEventListener("blur", () => {
        const inputValue = $inputTextClub.value.trim();

        if (inputValue.length > 0) {
            $inputTextClub.classList.add('border-none');
            $inputTextClub.classList.add("font-bold");
            $inputTextClub.classList.add("text-xl");
            $inputTextClub.classList.add("w-[600px]");
            $inputTextClub.classList.remove("w-fit");

        } else {
            $inputTextClub.classList.add('border-2');
            $inputTextClub.classList.add("border-green");
            $inputTextClub.classList.remove("w-[600px]");
            $inputTextClub.classList.add("w-fit");
        }
    })

    $inputTextClub.addEventListener("focus", () => {
        $inputTextClub.classList.remove('border-none');
        $inputTextClub.classList.remove("font-bold");
        $inputTextClub.classList.remove("text-xl");
    })

    $inputTextClub.addEventListener("change", () => {
        if ($inputTextClub.value.trim() !== '') {
            removeErrorInput('nombre');
        }
    });


    const handleFormSubmit = async (e) => {
        e.preventDefault();



        const formData = new FormData($form);
        const entries = Object.fromEntries(formData.entries());

        if (entries.nombre.trim() === "") {
            showErrorInput('nombre');
            showAlert("Debes completar el nombre del club");
            return;
        }

        const newEquipo = {
            ...entries
        }

        console.log(newEquipo);
        

        //redireccion();
    }

    //FUNCION PARA MOSTRAR CAMPOS EN ROJO
    const showErrorInput = (field) => {
        const input = $form.querySelector(`[name="${field}"]`);
        input.classList.add("border-2");
        input.classList.add("border-red-400");
    }

    //FUNCION PARA ELIMINAR CAMPOS EN ROJO
    const removeErrorInput = (field) => {
        const input = $form.querySelector(`[name="${field}"]`);

        input.classList.remove("border-2");
        input.classList.remove("border-red-400");
    }


    //FUNCION PARA MOSTRAR LA ALERTA
    const showAlert = (label) => {
        $labelAlert.textContent = label
        $alert.classList.remove("hidden")
        $alert.classList.add("show")
        setTimeout(() => {
            $alert.classList.add("hidden")
            $alert.classList.remove("show")
        }, 2500)
    }

    const redireccion = () => {
        console.log("llego");

        const params = new URLSearchParams(window.location.search);
        const pathTo = params.get('to');

        //Si necesitamos que nos redirija debe llegar por parametro el to al que queremos ir
        if (pathTo) {
            window.location.href = ` ${pathTo} `;
        }
    }


</script>