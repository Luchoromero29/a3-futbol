// userInfoModalData.js
/*
                <div class="h-10 w-10 bg-gray-bg/40 hover:bg-black transition duration-300 p-2 rounded-full cursor-pointer relative closeInfoUserModal">
                    <div class="w-1 h-6 bg-white rounded-md rotate-45 absolute top-[8.5px] left-[18px]"></div>
                    <div class="w-1 h-6 bg-white rounded-md rotate-[-45deg] absolute top-[8.5px] left-[18px]"></div>
                </div> 
*/
// Función para generar el contenido del modal
export function generateUserInfoModal(user) {
    return `
    <div class="py-10 bg-white shadow-3xl rounded-3xl border-2 border-green flex flex-col items-center justify-center min-w-[750px]">
        <header class="flex w-full text-xl">
            <div class="pl-8 bg-green flex gap-2 items-center text-white w-full">
                <img src="../../assets/imgs/userInfo.png" class="w-8" alt="" />
                <span>Observaciones</span>
            </div>
            <div class="bg-white flex justify-center items-center px-4">
                <img src="../../assets/imgs/19.png" class="w-10 cursor-pointer closeInfoUserModal"
                    onmouseover="this.src='../../assets/imgs/19 hover.png'"
                    onmouseout="this.src='../../assets/imgs/19.png'"
                alt="">
            </div>
        </header>
        <main class="flex flex-col w-full gap-6 px-10 pt-10">
            <div class="flex w-full gap-10">
                <div class="flex justify-center items-start px-4">
                    <div class="bg-black p-1 rounded-lg text-white text-center relative w-40">
                        <img src="${user.avatar}" class="w-full rounded-t-lg" alt="" />
                        <span class="p-2">${user.nombre}</span>
                    </div>
                </div>
                <div class="flex flex-col gap-6 px-4">
                    <div class="flex flex-col">
                        <span class="font-bold">Fecha de nacimiento</span>
                        <span class="text-gray-bg text-sm">${user.birthdate}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold">Nacionalidad</span>
                        <span class="text-gray-bg text-sm">${user.nacionalidad}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold">Domicilio (lugar de residencia actual)</span>
                        <span class="text-gray-bg text-sm">${user.domicilio}</span>
                    </div>
                    <div class="flex gap-14">
                        <div class="flex flex-col">
                            <span class="font-bold">Dirección de email</span>
                            <span class="text-gray-bg text-sm">${user.email}</span>
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold">Celular</span>
                            <span class="text-gray-bg text-sm">${user.celular}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid rounded-3xl bg-light-gray-bg grid-cols-2 grid-rows-2 px-10 py-8 gap-x-14 gap-y-8">
                <div class="flex flex-col col-span-1 row-span-1">
                    <div class="flex flex-col px-4">
                        <span class="font-bold">Deporte</span>
                        <span class="text-gray-bg text-sm">${user.deporte}</span>
                    </div>
                    <div class="mt-3 w-full bg-green h-0.5"></div>
                </div>
                <div class="flex flex-col col-span-1 row-span-1">
                    <div class="flex flex-col px-4">
                        <span class="font-bold">Cargo</span>
                        <span class="text-gray-bg text-sm">${user.cargo}</span>
                    </div>
                    <div class="mt-3 w-full bg-green h-0.5"></div>
                </div>
                <div class="flex flex-col col-span-1 row-span-1">
                    <div class="flex flex-col px-4">
                        <span class="font-bold">Departamento</span>
                        <span class="text-gray-bg text-sm">${user.departamento}</span>
                    </div>
                    <div class="mt-3 w-full bg-green h-0.5"></div>
                </div>
                <div class="flex flex-col col-span-1 row-span-1">
                    <div class="flex flex-col px-4">
                        <span class="font-bold">Rol</span>
                        <span class="text-gray-bg text-sm">${user.rol}</span>
                    </div>
                    <div class="mt-3 w-full bg-green h-0.5"></div>
                </div>
            </div>
            <div class="flex justify-end">
                <button class="closeInfoUserModal p-3 rounded-lg bg-green text-white px-8 font-bold hover:bg-dark-green">Listo</button>
            </div>
        </main>
        </div>
    `;
}
