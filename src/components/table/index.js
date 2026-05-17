function Table(container, options = {}) {
    const {
        columns = [],
        data = [],
        ancho = '100%',
        largo = 'auto',
        pageSize = 10,
        pageSizeOptions = [5, 10, 20, 50],
        searchable = true,
        sortable = true,
        striped = true,
        emptyMessage = 'No hay datos disponibles',
        onRowClick = null,
        addable = false,
    } = options;

    let currentData = [...data];
    let searchTerm = '';
    let currentPage = 1;
    let currentPageSize = pageSize;
    let sortKey = null;
    let sortDir = null;

    function getFiltered() {
        if (!searchTerm) return [...currentData];
        const term = searchTerm.toLowerCase();
        return currentData.filter(row =>
            columns.some(col => {
                const val = row[col.key];
                return val != null && String(val).toLowerCase().includes(term);
            })
        );
    }

    function getSorted(arr) {
        if (!sortKey || !sortDir) return arr;
        return [...arr].sort((a, b) => {
            const col = columns.find(c => c.key === sortKey);
            const va = a[sortKey];
            const vb = b[sortKey];
            if (va == null) return 1;
            if (vb == null) return -1;

            let cmp;
            if (col && col.sortFn) {
                cmp = col.sortFn(va, vb);
            } else if (col && col.type === 'date') {
                const da = new Date(va);
                const db = new Date(vb);
                if (isNaN(da)) return 1;
                if (isNaN(db)) return -1;
                cmp = da - db;
            } else if (typeof va === 'number') {
                cmp = va - vb;
            } else {
                cmp = String(va).localeCompare(String(vb));
            }
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }

    function getPageData() {
        const filtered = getFiltered();
        const sorted = getSorted(filtered);
        const total = sorted.length;
        const totalPages = Math.max(1, Math.ceil(total / currentPageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * currentPageSize;
        const page = sorted.slice(start, start + currentPageSize);
        return { data: page, total, totalPages, start };
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'tb';
    wrapper.style.maxWidth = ancho;
    wrapper.style.maxHeight = largo;

    const toolbar = document.createElement('div');
    toolbar.className = 'tb__toolbar';

    const searchInput = document.createElement('input');
    searchInput.className = 'tb__search';
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar...';

    const addBtn = document.createElement('button');
    addBtn.className = 'tb__add-btn';
    addBtn.textContent = '+ Agregar';

    const scrollWrap = document.createElement('div');
    scrollWrap.className = 'tb__scroll';

    const table = document.createElement('table');
    table.className = 'tb__table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'tb__tr';
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    scrollWrap.appendChild(table);

    const mobileContainer = document.createElement('div');
    mobileContainer.className = 'tb__cards';

    const emptyEl = document.createElement('div');
    emptyEl.className = 'tb__empty';

    const pagination = document.createElement('div');
    pagination.className = 'tb__pagination';

    wrapper.appendChild(toolbar);
    wrapper.appendChild(scrollWrap);
    wrapper.appendChild(mobileContainer);
    wrapper.appendChild(emptyEl);
    wrapper.appendChild(pagination);
    container.appendChild(wrapper);

    function renderHeaders() {
        headerRow.innerHTML = '';
        columns.forEach(col => {
            const th = document.createElement('th');
            th.className = 'tb__th';
            if (sortable && col.sortable !== false) {
                th.classList.add('tb__th--sortable');
                if (sortKey === col.key) {
                    th.classList.add(sortDir === 'asc' ? 'tb__th--asc' : 'tb__th--desc');
                }
                th.addEventListener('click', () => {
                    if (sortKey === col.key) {
                        sortDir = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc';
                        if (!sortDir) sortKey = null;
                    } else {
                        sortKey = col.key;
                        sortDir = 'asc';
                    }
                    currentPage = 1;
                    render();
                });
            }
            th.textContent = col.label || col.key;
            if (col.width) th.style.width = col.width;
            headerRow.appendChild(th);
        });
    }

    function renderBody() {
        tbody.innerHTML = '';
        mobileContainer.innerHTML = '';
        const result = getPageData();
        const pageData = result.data;

        if (pageData.length === 0) {
            emptyEl.textContent = emptyMessage;
            emptyEl.style.display = 'block';
            scrollWrap.style.display = 'none';
            mobileContainer.style.display = 'none';
            pagination.style.display = 'none';
            return;
        }
        emptyEl.style.display = 'none';
        scrollWrap.removeAttribute('style');
        mobileContainer.removeAttribute('style');
        pagination.style.display = 'flex';

        pageData.forEach((row, i) => {
            const tr = document.createElement('tr');
            tr.className = 'tb__tr';
            if (striped) tr.classList.add(i % 2 === 0 ? 'tb__tr--even' : 'tb__tr--odd');
            if (onRowClick) {
                tr.classList.add('tb__tr--clickable');
                tr.addEventListener('click', () => onRowClick(row, i));
            }
            columns.forEach(col => {
                const td = document.createElement('td');
                td.className = 'tb__td';
                if (col.render) {
                    td.appendChild(col.render(row[col.key], row, i));
                } else {
                    td.textContent = row[col.key] ?? '';
                }
                if (col.width) td.style.width = col.width;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);

            const card = document.createElement('div');
            card.className = 'tb__card';
            if (striped) card.classList.add(i % 2 === 0 ? 'tb__card--even' : 'tb__card--odd');
            if (onRowClick) {
                card.classList.add('tb__card--clickable');
                card.addEventListener('click', () => onRowClick(row, i));
            }
            columns.forEach(col => {
                const field = document.createElement('div');
                field.className = 'tb__card-field';
                const label = document.createElement('span');
                label.className = 'tb__card-label';
                label.textContent = col.label || col.key;
                const value = document.createElement('span');
                value.className = 'tb__card-value';
                if (col.render) {
                    value.appendChild(col.render(row[col.key], row, i));
                } else {
                    value.textContent = row[col.key] ?? '';
                }
                field.appendChild(label);
                field.appendChild(value);
                card.appendChild(field);
            });
            mobileContainer.appendChild(card);
        });
    }

    function renderPagination() {
        pagination.innerHTML = '';
        const result = getPageData();
        const { total, totalPages, start } = result;
        if (total === 0) return;
        pagination.style.display = 'flex';

        const sizeLabel = document.createElement('span');
        sizeLabel.className = 'tb__page-label';
        sizeLabel.textContent = 'Filas:';
        pagination.appendChild(sizeLabel);

        const sizeSelect = document.createElement('select');
        sizeSelect.className = 'tb__page-size';
        pageSizeOptions.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            if (opt === currentPageSize) el.selected = true;
            sizeSelect.appendChild(el);
        });

        const info = document.createElement('span');
        info.className = 'tb__page-info';
        const end = Math.min(start + currentPageSize, total);
        info.textContent = `${start + 1}-${end} de ${total}`;

        const btnContainer = document.createElement('div');
        btnContainer.className = 'tb__page-btns';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'tb__page-btn';
        prevBtn.textContent = '◀';
        prevBtn.disabled = currentPage <= 1;

        const nextBtn = document.createElement('button');
        nextBtn.className = 'tb__page-btn';
        nextBtn.textContent = '▶';
        nextBtn.disabled = currentPage >= totalPages;

        btnContainer.appendChild(prevBtn);

        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
            endPage = Math.min(totalPages, startPage + maxVisible - 1);
        }

        let first = null;
        let last = null;
        if (startPage > 1) {
            first = document.createElement('button');
            first.className = 'tb__page-btn';
            first.textContent = '1';
            btnContainer.appendChild(first);
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'tb__page-dots';
                dots.textContent = '…';
                btnContainer.appendChild(dots);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = 'tb__page-btn';
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('tb__page-btn--active');
            btnContainer.appendChild(btn);
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'tb__page-dots';
                dots.textContent = '…';
                btnContainer.appendChild(dots);
            }
            last = document.createElement('button');
            last.className = 'tb__page-btn';
            last.textContent = totalPages;
            btnContainer.appendChild(last);
        }
        btnContainer.appendChild(nextBtn);

        pagination.appendChild(sizeSelect);
        pagination.appendChild(info);
        pagination.appendChild(btnContainer);

        function goToPage(page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            render();
        }

        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

        btnContainer.querySelectorAll('.tb__page-btn').forEach(btn => {
            if (btn !== prevBtn && btn !== nextBtn && btn !== first && btn !== last) {
                btn.addEventListener('click', () => goToPage(Number(btn.textContent)));
            }
        });
        if (first) first.addEventListener('click', () => goToPage(1));
        if (last) last.addEventListener('click', () => goToPage(totalPages));

        sizeSelect.addEventListener('change', () => {
            currentPageSize = Number(sizeSelect.value);
            currentPage = 1;
            render();
        });
    }

    function render() {
        renderHeaders();
        renderBody();
        renderPagination();
    }

    if (searchable) {
        toolbar.appendChild(searchInput);
        searchInput.addEventListener('input', () => {
            searchTerm = searchInput.value;
            currentPage = 1;
            render();
        });
    }

    if (addable) {
        toolbar.appendChild(addBtn);

        function openAddForm() {
            const existing = document.querySelector('.tb__form-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.className = 'tb__form-overlay';

            const panel = document.createElement('div');
            panel.className = 'tb__form-panel';

            const header = document.createElement('div');
            header.className = 'tb__form-header';
            const title = document.createElement('span');
            title.textContent = 'Agregar fila';
            const closeBtn = document.createElement('button');
            closeBtn.className = 'tb__form-close';
            closeBtn.innerHTML = '&times;';
            header.appendChild(title);
            header.appendChild(closeBtn);

            const body = document.createElement('div');
            body.className = 'tb__form-body';

            const inputs = {};
            columns.forEach(col => {
                const label = document.createElement('label');
                label.className = 'tb__form-label';
                label.textContent = col.label || col.key;
                const input = document.createElement('input');
                input.className = 'tb__form-input';
                input.type = col.type === 'date' ? 'date' : 'text';
                input.placeholder = (col.label || col.key);
                body.appendChild(label);
                body.appendChild(input);
                inputs[col.key] = input;
            });

            const footer = document.createElement('div');
            footer.className = 'tb__form-footer';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'tb__form-btn tb__form-btn--cancel';
            cancelBtn.textContent = 'Cancelar';

            const submitBtn = document.createElement('button');
            submitBtn.className = 'tb__form-btn tb__form-btn--submit';
            submitBtn.textContent = 'Agregar';

            footer.appendChild(cancelBtn);
            footer.appendChild(submitBtn);
            panel.appendChild(header);
            panel.appendChild(body);
            panel.appendChild(footer);
            overlay.appendChild(panel);
            document.body.appendChild(overlay);

            function closeForm() {
                overlay.remove();
                document.body.style.overflow = '';
            }

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeForm();
            });
            closeBtn.addEventListener('click', closeForm);
            cancelBtn.addEventListener('click', closeForm);
            submitBtn.addEventListener('click', () => {
                const row = {};
                columns.forEach(col => {
                    const val = inputs[col.key].value.trim();
                    if (val) {
                        row[col.key] = col.type === 'date' ? val : isNaN(val) ? val : Number(val);
                    } else {
                        row[col.key] = null;
                    }
                });
                api.addRow(row);
                closeForm();
            });
            document.body.style.overflow = 'hidden';
        }

        addBtn.addEventListener('click', openAddForm);
    }

    render();

    const api = {
        element: wrapper,
        setData(newData) {
            currentData = [...newData];
            currentPage = 1;
            sortKey = null;
            sortDir = null;
            render();
        },
        setColumns(newColumns) {
            columns.length = 0;
            columns.push(...newColumns);
            render();
        },
        setPageSize(size) {
            currentPageSize = size;
            currentPage = 1;
            render();
        },
        getCurrentPage: () => currentPage,
        getTotalPages() {
            return Math.max(1, Math.ceil(getFiltered().length / currentPageSize));
        },
        filter(term) {
            searchTerm = term;
            if (searchable) searchInput.value = term;
            currentPage = 1;
            render();
        },
        getData: () => [...currentData],
        addRow(row) {
            currentData.push(row);
            currentPage = Math.max(1, Math.ceil(currentData.length / currentPageSize));
            render();
        },
        removeRow(predicate) {
            currentData = currentData.filter((row, i) => !predicate(row, i));
            render();
        },
        destroy() {
            wrapper.remove();
        }
    };

    return api;
}

(function (global, factory) {
    try {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
            return;
        }
    } catch {}
    global.Table = factory();
}(typeof window !== 'undefined' ? window : this, function () {
    return Table;
}));

export default Table;
