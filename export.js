console.log('Load export.js');
$p.events.on_grid_load_arr.push(function() {
    $("#MainCommands").append(
        $('<button id="button-export" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" onclick="exportDataFromSiteId()" data-icon="ui-icon-circle-arrow-e"><span class="ui-button-icon-space"> </span>Export to Excel</button>')
    );

    function exportDataFromSiteId() {
        const siteId = $p.siteId();

        if (!siteId) {
            alert("Not found table.");
            return;
        }

        // Gọi API và xử lý xuất Excel
        $p.apiGet({
            id: siteId,
            done: function(response) {
                const rows = response.Response.Data;
                if (!rows || rows.length === 0) {
                    alert("No data");
                    return;
                }
                // Xác định các header tương ứng
                const headers = [
                    "City", "Country", "ISO2", "Admin Name", "Capital",
                    "Latitude", "Longitude", "Population", "Population Proper"
                ];

                // Tạo HTML Table từ dữ liệu API
                let tableHTML = "<table><thead><tr>";
                headers.forEach(header => {
                    tableHTML += `<th>${header}</th>`;
                });
                tableHTML += "</tr></thead><tbody>";

                rows.forEach(row => {
                    console.log('fff', row)
                    tableHTML += "<tr>";
                    tableHTML += `<td>${row.ClassHash.ClassA}</td>`; // City
                    tableHTML += `<td>${row.ClassHash.ClassB}</td>`; // Country
                    tableHTML += `<td>${row.ClassHash.ClassC}</td>`; // ISO2
                    tableHTML += `<td>${row.ClassHash.ClassD}</td>`; // Admin Name
                    tableHTML += `<td>${row.ClassHash.ClassE}</td>`; // Capital
                    tableHTML += `<td>${row.NumHash.NumA}</td>`; // Latitude
                    tableHTML += `<td>${row.NumHash.NumB}</td>`; // Longitude
                    tableHTML += `<td>${row.NumHash.NumC}</td>`; // Population
                    tableHTML += `<td>${row.NumHash.NumD}</td>`; // Population Proper
                    tableHTML += "</tr>";
                });

                tableHTML += "</tbody></table>";
                exportHTMLTableToExcel(tableHTML);
            },
            fail: function(err) {
                console.error("Error data:", err);
                alert("Cannot get data");
            }
        });
    }

    function exportHTMLTableToExcel(tableHTML, filename = 'Pleasanter_Export.xls') {
        const dataType = 'application/vnd.ms-excel';
        const downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            const blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = 'data:' + dataType + ', ' + encodeURIComponent(tableHTML);
            downloadLink.download = filename;
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }
});
