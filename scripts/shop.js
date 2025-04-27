fetch("https://sheetdb.io/api/v1/0pqlg9a6nffi9")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('product-container');

    data.forEach(item => {
      const originalPrice = item.Price;
      const updatedPrice = item["Updated_Price"];
      const discount = item["Discount_Percentage"];

      // Check if either updated price or discount is available
      const hasOffer = updatedPrice || discount;

      const productHTML = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
          <img src="${item.Image_URL}" alt="${item.Product_Name}" loading="lazy" class="w-full h-52 object-contain">
          <div class="p-4 space-y-3">
            <h3 class="text-lg font-semibold text-gray-800">${item.Product_Name}</h3>

            ${hasOffer ? `
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm line-through text-red-500">₹${originalPrice}</span>
                ${updatedPrice ? `<span class="text-lg font-bold text-green-600">₹${updatedPrice}</span>` : ``}
                ${discount ? `<span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">${discount}% OFF</span>` : ``}
              </div>
            ` : `
              <p class="text-lg font-bold text-gray-700">₹${originalPrice}</p>
            `}

            <a href="${item.Affiliate_link}" target="_blank" class="inline-block mt-3 bg-[#F4A300] text-white px-4 py-2 rounded hover:bg-[#FF8C00] transition duration-300">Buy Now</a>
          </div>
        </div>
      `;

      container.innerHTML += productHTML;
    });
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });
