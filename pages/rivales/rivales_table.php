<table id="rivales-table" class="styles-table w-full row-border overflow-x-auto text-sm m-0 w-full">
    <thead class="bg-black text-white hover:!bg-black thead-dark">
        <!-- Seleccionar todas las filas btn -->
        <tr>
            <th  scope="col" >
                <div class="flex justify-between items-center">
                    <button id="selectAllEquiposButton"
                        class="w-6 h-6 border-2 border-gray-bg rounded-md hover:border-green ">
                        <img id="checkboxIcon" class="hidden" src="../../assets/imgs/3.png" alt="Seleccionado boton">
                    </button>
                    <button id="deselectAllEquiposButton" class=" hidden bg-gray-bg/0">
                        <span class="">
                            <img onmouseover="this.src='../../assets/imgs/9 eliminar.png'"
                                onmouseout="this.src='../../assets/imgs/10 eliminar hover.png'" class="w-7 h-7 hover:"
                                src="../../assets/imgs/10 eliminar hover.png" alt="Seleccionado boton" />
                        </span>
                    </button>
                </div>
            </th>
            <th scope="col"></th> <!-- Index col -->
            <th scope="col">Nombre del equipo</th>
            <th scope="col" class="text-white">Liga / Otros</th>
            <th scope="col" class="text-white">Creado</th>
            <th scope="col" class="text-white">Actualizado</th>
            <th scope="col"></th> <!-- botones accion col -->
        </tr>
    </thead>
    <tbody>
        <!-- <tr class="even" pr_id="2">
     
                 </tr> -->
    </tbody>
</table>