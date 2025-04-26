const apiUrl = 'https://sheetdb.io/api/v1/l0w5lmtk25ns2'; // API URL
const blogsContainer = document.getElementById('blogs');
const loader = document.getElementById('loader');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumber = document.getElementById('pageNumber');

let blogsData = [];
let currentPage = 1;
const blogsPerPage = 6; // Number of blogs per page

// Function to fetch blog data
async function fetchBlogs() {
    try {
        const response = await fetch(apiUrl);
        blogsData = await response.json();

        loader.style.display = 'none';
        blogsContainer.classList.remove('hidden');

        renderBlogs();
        updatePaginationButtons();
    } catch (error) {
        console.error('Error fetching blog data:', error);
        loader.innerHTML = 'Error loading blogs. Please try again later.';
    }
}

// Function to render blogs
function renderBlogs() {
    const start = (currentPage - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const blogsToDisplay = blogsData.slice(start, end);

    blogsContainer.innerHTML = blogsToDisplay.map(blog => `
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <img class="w-full h-48 object-cover rounded-t-lg" src="${blog.ImageURL}" alt="${blog.Header}">
            <h2 class="text-xl font-bold my-4">${blog.Header}</h2>
            <p class="text-gray-700 mb-4">${blog.Description}</p>
            <a href="${blog.AffiliateLink}" class="text-orange-600 hover:text-orange-800" target="_blank">Check it out</a>
        </div>
    `).join('');

    pageNumber.innerText = `Page ${currentPage} of ${Math.ceil(blogsData.length / blogsPerPage)}`;
}

// Function to update button states
function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(blogsData.length / blogsPerPage);
}

// Button Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderBlogs();
        updatePaginationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(blogsData.length / blogsPerPage)) {
        currentPage++;
        renderBlogs();
        updatePaginationButtons();
    }
});

// Initial fetch
fetchBlogs();
