/**
 * Table Module - Handles table data initialization and interactions
 */

function initializePaymentsTable() {
  const tableBody = document.getElementById("paymentsTableBody");
  if (tableBody) {
    const payments = [
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        amount: "$250.00",
        status: "Sale",
      },
      {
        customer: "Olivia Smith",
        email: "olivia@example.com",
        amount: "$150.00",
        status: "Refund",
      },
      {
        customer: "Noah Williams",
        email: "noah@example.com",
        amount: "$350.00",
        status: "Subscription",
      },
      {
        customer: "Emma Brown",
        email: "emma@example.com",
        amount: "$450.00",
        status: "Sale",
      },
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        amount: "$550.00",
        status: "Sale",
      },
    ];

    payments.forEach((payment) => {
      const row = document.createElement("tr");
      const statusClasses = {
        sale: "bg-green-100 text-green-800",
        refund: "bg-yellow-100 text-yellow-800",
        subscription: "bg-blue-100 text-blue-800",
      };

      row.innerHTML = `
                <td class="py-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex-shrink-0"></div>
                        <span class="text-sm font-medium text-gray-900">${payment.customer}</span>
                    </div>
                </td>
                <td class="py-3 text-sm text-gray-600">${payment.email}</td>
                <td class="py-3 text-sm font-medium text-gray-900">${payment.amount}</td>
                <td class="py-3">
                    <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusClasses[payment.status.toLowerCase()]}">
                        ${payment.status}
                    </span>
                </td>
            `;
      tableBody.appendChild(row);
    });
  }
}

/**
 * Table filtering functionality
 */
function initializeTableFilters() {
  const filterInput = document.querySelector('input[placeholder*="Filter payments"]');
  const tableBody = document.getElementById("paymentsTableBody");

  if (filterInput && tableBody) {
    filterInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = tableBody.querySelectorAll("tr");

      rows.forEach((row) => {
        const customerName = row.cells[0].textContent.toLowerCase();
        const customerEmail = row.cells[1].textContent.toLowerCase();
        const amount = row.cells[2].textContent.toLowerCase();
        const status = row.cells[3].textContent.toLowerCase();

        const matchesSearch =
          customerName.includes(searchTerm) ||
          customerEmail.includes(searchTerm) ||
          amount.includes(searchTerm) ||
          status.includes(searchTerm);

        row.style.display = matchesSearch ? "" : "none";
      });
    });
  }
}

// Initialize table functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializePaymentsTable();
  initializeTableFilters();
});
