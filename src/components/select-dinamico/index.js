const searchInput = document.getElementById('searchInput');
const dropdownList = document.getElementById('dropdownList');
const selectBox = document.getElementById('selectBox');
const tagsContainer = document.getElementById('tagsContainer');
const toggleSearch = document.getElementById('toggleSearch');
const toggleMultiSelect = document.getElementById('toggleMultiSelect');

// categorias tienda y productos
const storeData = [
    {
        category: "Laptops",
        products: ["HP Pavilion", "Asus VivoBook Go 15", "MacBook Air M2", "Lenovo IdeaPad 3", "Dell Inspiron 15", "Acer Aspire 5", "MSI Modern 14", "Lenovo LOQ 15", "HP Omen 16", "Asus ROG Strix G15"]
    },
    {
        category: "Periféricos",
        products: ["Teclado Redragon Fizz Pro", "Teclado Fantech Atom 61", "Mouse Logitech G305", "Mouse Razer DeathAdder V2", "Monitor 24 pulgadas", "Monitor Asus 21 pulgadas", "Auriculares Logitech G432", "Auriculares Corsair HS50 Pro", ]
    },
    {
        category: "Almacenamiento",
        products: ["Disco HDD 320GB", "SSD NVMe 1TB", "Pendrive Kingston 64GB"]
    },
    {
        category: "Accesorios Gaming",
        products: ["Mando PS4 Genérico", "Auriculares KZ Castor BASS", "Mousepad XL"]
    }
];

// Configuración actual
let config = {
    searchEnabled: true,
    multiSelect: true
};

// Estado de selección
let selectedItems = [];

// Función para actualizar los tags
function updateTagsDisplay() {
    tagsContainer.innerHTML = '';
    
    if (config.multiSelect) {
        selectedItems.forEach(item => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `
                ${item} 
                <span class="tag-close" data-item="${item}">×</span>
            `;
            tagsContainer.appendChild(tag);
        });
        
        // eliminar tags
        document.querySelectorAll('.tag-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemToRemove = e.target.getAttribute('data-item');
                selectedItems = selectedItems.filter(i => i !== itemToRemove);
                updateTagsDisplay();
                renderList(getFilteredData(searchInput.value));
            });
        });
        
        searchInput.placeholder = selectedItems.length > 0 ? "" : "Buscar en la tienda...";
    } else {
        searchInput.value = selectedItems.length > 0 ? selectedItems[0] : "";
    }
}

// lista optimizada
function renderList(dataToRender) {
    dropdownList.innerHTML = '';
    
    let totalItems = 0;

    dataToRender.forEach(group => {
        if (group.products.length === 0) return;
        
        // Crear título de categoría
        const categoryHeader = document.createElement('li');
        categoryHeader.className = 'category-title';
        categoryHeader.textContent = group.category;
        dropdownList.appendChild(categoryHeader);

        // Crear opciones de productos
        group.products.forEach(product => {
            totalItems++;
            const li = document.createElement('li');
            li.className = 'option-item';
            
            // Marcar como seleccionado si está en la lista
            if (selectedItems.includes(product)) {
                li.classList.add('selected');
                li.innerHTML = `${product} <span>✓</span>`;
            } else {
                li.textContent = product;
            }
            
            // Lógica al hacer clic en un producto
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (config.multiSelect) {
                    if (selectedItems.includes(product)) {
                        selectedItems = selectedItems.filter(i => i !== product);
                    } else {
                        selectedItems.push(product);
                    }
                    // Mantener foco en el input para seguir buscando
                    searchInput.focus();
                } else {
                    selectedItems = [product];
                    dropdownList.classList.add('hidden');
                }
                
                updateTagsDisplay();
                renderList(getFilteredData(searchInput.value));
            });
            
            dropdownList.appendChild(li);
        });
    });

    if (totalItems === 0) {
        const li = document.createElement('li');
        li.textContent = "No se encontraron productos";
        li.style.padding = "12px 20px";
        li.style.color = "rgba(255,255,255,0.5)";
        dropdownList.appendChild(li);
    }
}

// Lógica de busqueda optimizada (filtro dentro de las categorías)
function getFilteredData(query) {
    if (!query || !config.searchEnabled) return storeData;
    
    const lowerQuery = query.toLowerCase();
    
    return storeData.map(group => {
        return {
            category: group.category,
            products: group.products.filter(p => p.toLowerCase().includes(lowerQuery))
        };
    }).filter(group => group.products.length > 0);
}

// Evento de escritura en el input
searchInput.addEventListener('input', (e) => {
    if (!config.searchEnabled) return;
    
    dropdownList.classList.remove('hidden');
    dropdownList.style.display = 'block';
    renderList(getFilteredData(e.target.value));
});

// abrir la lista
selectBox.addEventListener('click', () => {
    dropdownList.classList.remove('hidden');
    dropdownList.style.display = 'block';
    renderList(getFilteredData(searchInput.value));
    if (config.searchEnabled) searchInput.focus();
});

// Cerrar lista al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!selectBox.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.classList.add('hidden');
        setTimeout(() => { dropdownList.style.display = 'none'; }, 300);
    }
});

// --- CONTROLES DE CONFIGURACIÓN ---

toggleSearch.addEventListener('change', (e) => {
    config.searchEnabled = e.target.checked;
    if (!config.searchEnabled) {
        searchInput.readOnly = true;
        searchInput.classList.add('disabled-search');
        searchInput.value = '';
        renderList(storeData);
    } else {
        searchInput.readOnly = false;
        searchInput.classList.remove('disabled-search');
    }
});

toggleMultiSelect.addEventListener('change', (e) => {
    config.multiSelect = e.target.checked;
    selectedItems = []; 
    searchInput.value = '';
    updateTagsDisplay();
    renderList(storeData);
});

// Inicialización
updateTagsDisplay();
renderList(storeData);