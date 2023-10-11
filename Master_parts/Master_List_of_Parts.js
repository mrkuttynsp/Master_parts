var customerData = [
    {
        Customer: "PENNAR INDUSTRIES LTD",
        Model: "CC21 INDIA",
        PartNo: "1",
        PartName: "SHORT GUN PANEL LH (COATED)",
        ImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2nyMMqb0LPcJZ6i3OrUvHeC5ZpuC8ELFcIw&usqp=CAU"
    },
    {
        Customer: "PENNAR INDUSTRIES LTD",
        Model: "CC21LATAM",
        PartNo: "2",
        PartName: "C PLLAR INNER LH",
        ImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa686OjPFgV3-aI3yjBIhkUEIH35uhnDOmBA&usqp=CAU"
    }
];
function GetDetail() {
    var product = document.querySelector(".inner");
    var partNoInput = document.querySelector("#partNoInput");
    var partNo = partNoInput.value;
    for (var i = 0; i < customerData.length; i++) {
        if (customerData[i].PartNo == partNo) {
            product.innerHTML = `<div style="width:300px;">
                        <h6><i>Details_of_Part Number</i><h6>
                                  <table>
                                      <tr> <td><h6>Customer :</h6></td> <td><p>${customerData[i].Customer}</p></td></tr>
                                      <tr> <td><h6>Model :</h6></td> <td><p>${customerData[i].Model}</p></td></tr>
                                      <tr> <td><h6>Part No :</h6></td> <td><p>${customerData[i].PartNo}</p></td></tr>
                                      <tr> <td><h6>Part Name :</h6></td> <td><p>${customerData[i].PartName}</p></td></tr>
                                      <tr> <td><h6>Image :</h6></td> <td><img height='30px' width='100px' src="${customerData[i].ImageLink}"></img></td></tr>	
                                      <tr> <td><h6>Start :</h6></td> <td><input></td></tr>
                                      <tr> <td><h6>End :</h6></td> <td><input></td></tr>
                                      <tr> <td><h6>Descrption :</h6></td> <td><input></td></tr>
                                  </table>					   
                             </div> <a href="Master_List_Of_Parts.html" ><button type="submit">Go_Back</button></a> <button onclick="save('${customerData[i].Customer}', '${customerData[i].Model}', '${customerData[i].PartNo}', '${customerData[i].PartName}', '${customerData[i].ImageLink}')">Save</button>`;
        }
    }
}
function AddNewData() {
    var customer = document.querySelector("#customer").value; 
    var model = document.querySelector("#model").value; 
    var partNoInput = document.querySelector("#partNum").value; 
    var partName = document.querySelector("#partName").value; 
    var image = document.querySelector("#image").value; 
    var newData = {
       Customer: customer,
       Model: model,
       PartNo: partNoInput,
       PartName: partName,
       ImageLink: image
    };
    customerData.push(newData);
    
    localStorage.setItem('customerData', JSON.stringify(customerData));
}
function initializePage() {
    var storedData = localStorage.getItem('customerData');
    if (storedData) {
        customerData = JSON.parse(storedData);
    }
}
function save(customer, model, partNo, partName, imageLink) { 
    const csvData = formatAsCSV(customer, model, partNo, partName, imageLink);
    downloadCSV(csvData);

}

function downloadCSV(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'customer_data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function formatAsCSV(customer, model, partNo, partName, imageLink) {
    const csvData = `${customer},${model},${partNo},${partName},${imageLink}\n`;
    return csvData;
}

initializePage();
