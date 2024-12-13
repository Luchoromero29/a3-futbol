import { getData, addPlayer, removePlayer, removeMorePlayers, dataPlayers, dataTeam } from './miplantel.js';

//variables necesarias



//acciones al cargar
document.addEventListener('DOMContentLoaded', async function () {
    await getData();

    
    
    setEventDragAndDrop(); //cargamos los eventos del drag and drop
    //renderRows();

    
});

const setEventDragAndDrop = () => {
    document.querySelectorAll('.draggable').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const draggable = e.target.closest('.draggable');
            e.dataTransfer.setData('text/plain', draggable.id);
            console.log(draggable.id);
            
            draggable.classList.add('dragging-miplantel');
            
        });
        
        item.addEventListener('mouseover', (e) => {
            item.querySelector('#miplantel-label-position-grilla').classList.remove('hidden');
        })

        item.addEventListener('mouseout', (e) => {
            item.querySelector('#miplantel-label-position-grilla').classList.add('hidden');
        })

        item.addEventListener('dragend', (e) => {
            const draggable = e.target.closest('.draggable');
            draggable.classList.remove('dragging-miplantel');
        });

    });

    // Handle drop events
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            console.log(e.target);
            
            const id = e.dataTransfer.getData('text/plain');
            console.log(id);
            
            const draggable = document.getElementById(id);
            const dropzone = e.target.closest('.dropzone');

            if (draggable && dropzone) {
                const children = Array.from(dropzone.children);
                const currentIndex = children.indexOf(draggable);

                // Get the position where the item was dropped
                const dropTarget = e.target.closest('.draggable');
                const dropIndex = dropTarget ? children.indexOf(dropTarget) : children.length;

                // If dropped in the same place, do nothing
                if (currentIndex === dropIndex) {
                    return;
                }

                // Remove the item and reinsert it at the new index
                if (currentIndex !== -1) {
                    children.splice(currentIndex, 1);
                }
                children.splice(dropIndex, 0, draggable);

                // Clear the dropzone and reappend all items in the correct order
                dropzone.innerHTML = '';
                children.forEach(child => dropzone.appendChild(child));
            }
        });
    });
}