const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const fileInput = document.getElementById('file-input');
const book = document.getElementById('book');
const bookWrapper = document.getElementById('book-wrapper');
const controlBar = document.getElementById('control-bar');
const pageInput = document.getElementById('page-input');
const totalPagesText = document.getElementById('total-pages');
const zoomValText = document.getElementById('zoom-val');

let pdfDoc = null;
let zoomScale = 1;
let totalLeaves = 0;

// 1. File Upload
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async function() {
            const data = new Uint8Array(this.result);
            pdfDoc = await pdfjsLib.getDocument(data).promise;
            totalPagesText.textContent = `/ ${pdfDoc.numPages}`;
            pageInput.max = pdfDoc.numPages;
            controlBar.style.display = 'flex';
            renderBook();
        };
        reader.readAsArrayBuffer(file);
    }
});

async function renderPage(num, container) {
    if (num > pdfDoc.numPages) {
        container.style.background = "#1a1a1a";
        return;
    }
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 2.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    container.appendChild(canvas);
}

async function renderBook() {
    book.innerHTML = '';
    const totalPages = pdfDoc.numPages;
    totalLeaves = Math.ceil((totalPages + 1) / 2);

    for (let i = 0; i < totalLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.id = `leaf-${i}`;
        leaf.style.zIndex = totalLeaves - i;

        const front = document.createElement('div');
        front.className = 'page-side front';
        const back = document.createElement('div');
        back.className = 'page-side back';

        await renderPage((i * 2) + 1, front);
        await renderPage((i * 2) + 2, back);

        leaf.appendChild(front);
        leaf.appendChild(back);
        book.appendChild(leaf);

        leaf.addEventListener('click', () => toggleLeaf(i));
    }
}

function toggleLeaf(index) {
    const leaf = document.getElementById(`leaf-${index}`);
    const isFlipping = !leaf.classList.contains('flipped');

    if (index === 0) {
        book.style.transform = isFlipping ? 'translateX(50%)' : 'translateX(0)';
    }

    leaf.classList.toggle('flipped');
    
    // Sync Page Number Input
    const currentPageNum = isFlipping ? (index * 2) + 2 : (index * 2) + 1;
    pageInput.value = Math.min(currentPageNum, pdfDoc.numPages);

    setTimeout(() => {
        leaf.style.zIndex = leaf.classList.contains('flipped') ? index + 1 : totalLeaves - index;
    }, 600);
}

// 2. Direct Page Navigation
pageInput.addEventListener('change', () => {
    const targetPage = parseInt(pageInput.value);
    if (targetPage < 1 || targetPage > pdfDoc.numPages) return;

    const targetLeafIndex = Math.floor((targetPage - 1) / 2);

    // Flip all leaves up to the target
    const leaves = document.querySelectorAll('.leaf');
    leaves.forEach((leaf, i) => {
        if (i < targetLeafIndex && !leaf.classList.contains('flipped')) {
            toggleLeaf(i);
        } else if (i >= targetLeafIndex && leaf.classList.contains('flipped')) {
            toggleLeaf(i);
        }
    });
});

// 3. Zoom Logic
document.getElementById('zoom-in').addEventListener('click', () => {
    if (zoomScale < 2) zoomScale += 0.1;
    updateZoom();
});
document.getElementById('zoom-out').addEventListener('click', () => {
    if (zoomScale > 0.5) zoomScale -= 0.1;
    updateZoom();
});
function updateZoom() {
    bookWrapper.style.transform = `scale(${zoomScale})`;
    zoomValText.textContent = `${Math.round(zoomScale * 100)}%`;
}

// 4. Hide UI Feature
document.getElementById('hide-ui').addEventListener('click', function() {
    controlBar.classList.toggle('hidden');
    document.getElementById('ui-panel').style.opacity = controlBar.classList.contains('hidden') ? '0' : '1';
    this.innerHTML = controlBar.classList.contains('hidden') ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// 5. Fullscreen
document.getElementById('fullscreen-btn').addEventListener('click', () => {
    const stage = document.getElementById('main-stage');
    if (!document.fullscreenElement) stage.requestFullscreen();
    else document.exitFullscreen();
});
