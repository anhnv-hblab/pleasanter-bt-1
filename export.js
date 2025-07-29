console.log('Load export.js');
$p.events.on_grid_load = function () {
    $("#MainCommands").append(
        $('<button id="button-export" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" onclick="exportDataFromSiteId()" data-icon="ui-icon-circle-arrow-e"><span class="ui-button-icon-space"> </span>Export to Excel</button>')
    );
};

function exportDataFromSiteId() {
    const siteId = $p.siteId();

    if (!siteId) {
        alert("Not found table.");
        return;
    }

    showLoading(true);

    // Gọi API và xử lý xuất Excel
    $p.apiGet({
        id: siteId,
        done: function (response) {
            const rows = response.Response.Data;
            if (!rows || rows.length === 0) {
                alert("No data");
                showLoading(false);
                return;
            }

            // Tạo dữ liệu để xuất Excel
            const data = rows.map(row => [
                row.ClassHash.ClassA,  // City
                row.ClassHash.ClassB,  // Country
                row.ClassHash.ClassC,  // ISO2
                row.ClassHash.ClassD,  // Admin Name
                row.ClassHash.ClassE,  // Capital
                row.NumHash.NumA,      // Latitude
                row.NumHash.NumB,      // Longitude
                row.NumHash.NumC,      // Population
                row.NumHash.NumD       // Population Proper
            ]);

            // Xuất Excel
            exportToExcel(data);
        },
        fail: function (err) {
            console.error("Error data:", err);
            alert("Cannot get data");
            showLoading(false);
        }
    });
}

function exportToExcel(data, filename = 'Pleasanter_Export.xlsx') {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
        ["City", "Country", "ISO2", "Admin Name", "Capital", "Latitude", "Longitude", "Population", "Population Proper"], // Headers
        ...data
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Data");

    XLSX.writeFile(wb, filename);
    
    showLoading(false);
}

function showLoading(isLoading) {
    const loadingElement = document.getElementById("loading");
    const overlayElement = document.getElementById("overlay");

    if (isLoading) {
        if (!overlayElement) {
            const overlayDiv = document.createElement('div');
            overlayDiv.id = "overlay";
            overlayDiv.style.position = "fixed";
            overlayDiv.style.top = "0";
            overlayDiv.style.left = "0";
            overlayDiv.style.width = "100%";
            overlayDiv.style.height = "100%";
            overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlayDiv.style.zIndex = "9998";
            document.body.appendChild(overlayDiv);
        }

        if (!loadingElement) {
            const div = document.createElement('div');
            div.id = "loading";
            div.style.position = "fixed";
            div.style.top = "50%";
            div.style.left = "50%";
            div.style.transform = "translate(-50%, -50%)";
            div.style.padding = "20px 30px";
            div.style.backgroundColor = "#fff";
            div.style.border = "1px solid #ccc";
            div.style.borderRadius = "5px";
            div.style.fontSize = "18px";
            div.style.fontWeight = "bold";
            div.style.zIndex = "9999";
            div.innerText = "Processing...";
            document.body.appendChild(div);
        }
    } else {
        if (overlayElement) {
            overlayElement.remove();
        }
        if (loadingElement) {
            loadingElement.remove();
        }
    }
}
