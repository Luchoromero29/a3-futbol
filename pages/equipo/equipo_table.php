<section id="presentations-table-container" class="w-[93%] xl:w-[90%] bg-white mt-8 relative z-10">
            <!-- Mensaje de seleccionados / Add Presentation btn -->
            <div id="add-pr-sel-msgs-container" class="flex w-full justify-end pr-6 pb-1 pt-4">
                <div id="selectedMessage" class="hidden flex items-center gap-2 p-2 ml-5 my-[4px]">
                    <button id="deselectAllButton" class="hover:text-white">
                        <img 
                            class="w-6 h-6" 
                            src="assets/imgs/5.png" 
                            original-src="assets/imgs/5.png"
                            data-hover-src="assets/imgs/cerrarHover.png"
                            alt="Deseleccionar boton" >
                    </button>
                    <p class="text-grayBg"><span id="selectedCount">0</span> Seleccionados</p>
                </div>
                <button 
                    id="add-presentation"
                    class="flex gap-2 items-center p-2 my-[2px]
                            bg-green text-white text-lg rounded-md 
                            bg-gradient-to-t from-black/40 hover:from-black/80 to-80% hover:to-100%">
                    <img 
                        alt="Agregar presentacion boton"
                        class="w-6 h-6" 
                        src="assets/Botขn agregar presentacion/1.png"
                    />
                    Agregar presentación
                </button>

                <div id="msg-success-pr" 
                    class="hidden w-full  bg-lightGreen flex justify-between 
                            ml-7 mr-1 pl-4 pr-2 py-3 rounded-md">
                    <p class="text-sm"></p>
                    <button id="close-success-message" >
                        <img 
                            class="w-6 h-6" 
                            src="assets/imgs/5.png" 
                            original-src="assets/imgs/5.png"
                            data-hover-src="assets/imgs/cerrarHover.png"
                            alt="Deseleccionar boton" >
                    </button>
                </div>

            </div>
            <!-- tabla -->
            <table id="pr-table" class="w-full row-border" style="width:100%">
                <thead class="bg-black text-white hover:!bg-black thead-dark">
                    <!-- Seleccionar todas las filas btn -->
                    <th scope="col">
                        <button id="selectAllButton" class="select-button w-5 h-5 border-2 border-grayBg rounded-md hover:border-green mb-2">
                            <span class="select-button-content rounded-md">
                                <img src="assets/imgs/tick.png" alt="Seleccionado boton">
                            </span>
                        </button>
                    </th>
                    <th scope="col"></th> <!-- Id col -->
                    <th scope="col">Nombre de la presentación</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Creado</th>
                    <th scope="col">Actualizado</th>
                    <th scope="col"></th> <!-- botones accion col -->
                </thead>
                <tbody>
								<tr class="even" pr_id="2">
									<td class="">
										<div class="flex gap-2 items-center">
											<button class="select-button w-5 h-5 border-2 border-linesColor rounded-md hover:border-green">
												<span class="select-button-content rounded-md">
													<img src="assets/imgs/tick.png" alt="">
												</span>
											</button>
											<button class="fav-button w-5 h-5 hover:border-green relative">
												<svg class="text-linesColor stroke-linesColor fill-current w-5 h-5 hover:!text-green hover:!stroke-green" viewBox="0 0 36.09 36.09">
													<path d="M36.04 13.9a1 1 0 0 0-.85-.68l-11.55-1.17-4.68-10.62c-.16-.36-.52-.6-.92-.6s-.75.24-.91.6l-4.68 10.62L.9 13.22a1 1 0 0 0-.57 1.74L9 22.7 6.53 34.05a1 1 0 0 0 1.48 1.07l10.04-5.84 10.03 5.84a1 1 0 0 0 1.48-1.08L27.1 22.7l8.66-7.74a1 1 0 0 0 .28-1.05zm-10.7 7.7a1 1 0 0 0-.32.95l2.1 9.7-8.57-4.99a1 1 0 0 0-1 0l-8.58 4.99 2.1-9.7a1 1 0 0 0-.32-.95l-7.4-6.62 9.88-1a1 1 0 0 0 .81-.59l4-9.08 4 9.08a1 1 0 0 0 .82.6l9.87 1-7.4 6.6z"></path>
												</svg>
												<img class="w-5 h-5 absolute left-0 top-0 hidden" src="assets/imgs/starFill.png">
											</button>
										</div>
									</td>
									<td class="text-right sorting_1">2</td>
									<td class="">Partido fecha 2</td>
									<td class="text-table-gray">Julian Guisasola</td>
									<td class="text-table-gray">hace 2 años, 1 mes</td>
									<td class="text-table-gray">hace 1 año, 4 meses</td>
									<td class="">
										<div class="flex gap-2 items-center">
											<a href="#" id="pr-table-btn-ver" class="row-action-button w-7 h-7">
												<img class="w-7 h-7 bg-black rounded-md border-2 border-grayBg hover:bg-green" src="assets/imgs/12 ver hover.png">
											</a>
											<a href="#" id="pr-table-btn-editar" class="row-action-button w-7 h-7" onclick="showSuccessMessage('Partido fecha 2', 'editar')">
												<img class="w-7 bg-green rounded-md border-2 border-grayBg hover:bg-black" src="assets/imgs/14 lapiz hover.png">
											</a>
											<button onclick="createShareModal('Partido fecha 2', [ 3, 4, 5, 6 ])" class="row-action-button w-7 h-7">
												<img class="w-7 bg-green rounded-md border-2 border-grayBg hover:bg-black" src="assets/imgs/16 compartir hover.png">
											</button>
											<a href="#" id="pr-table-btn-eliminar" data-toggle="confirmation" class="row-action-button w-7 h-7" onclick="showSuccessMessage('Partido fecha 2', 'eliminar')">
												<img class="w-7 bg-green rounded-md border-2 border-grayBg hover:bg-black" src="assets/imgs/10 eliminar hover.png">
											</a>
										</div>
									</td>
								</tr>
                </tbody>
            </table>
						
						<style>
						#pr-table th, #users-table th {
								font-size: 15px;
								box-sizing: border-box;
						}
						</style>
            
        </section>