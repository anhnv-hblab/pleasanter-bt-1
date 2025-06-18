# 📦 Button Gọi API và Import Dữ Liệu Tỉnh/Mã Bưu Điện vào Bảng Master (Pleasanter)
---

## 🪜 Step-by-step Hướng dẫn

1. Truy cập: `Manage` → `Manage Table` → `Scripts`
2. Dán đoạn script sau vào phần `Scripts` của bảng:

```javascript
$p.events.on_grid_load = function() {
    // Tạo nút Import Data From API
    $("#MainCommands").append(
        $('<button id="button-exe" class="button button-icon button-neutral ui-button ui-corner-all ui-widget applied" type="button" accesskey="" onclick="$p.send($(this))" data-icon="ui-icon-circle-arrow-w" data-action="GridRows" data-method="post"><span class="ui-button-icon-space"> </span>Import Data From API</button>')
    );

    $('#button-exe').on('click', async function () {
        try {
            const response = await fetch('https://raw.githubusercontent.com/anhnv-hblab/pleasanter-bt-1/main/data.json');
            const data = await response.json();

            for (const item of data) {
                $p.apiCreate({
                    id: 1,
                    data: {
                        ClassHash: {
                            ClassA: item.city,
                            NumA: item.lot,
                            NumB: item.lng,
                            ClassB: item.country,
                            ClassC: item.iso2,
                            ClassD: item.admin_name,
                            ClassE: item.capital,
                            NumC: item.population,
                            NumD: item.population_proper
                        }
                    },
                    done: function (item) {
                        const message = {
                            Css: 'alert-success',
                            Text: 'A new record was created'
                        };
                        // $p.setMessage('#Message',JSON.stringify(item));
                    },
                    fail: function (item) {
                    }
                });
            }


            $p.apiGet({
                id: 1,
                data: {
                    View: {
                        ApiDataType: "KeyValues"
                    }
                },
                done: function (data) {
                    console.log(data);
                }
            });

            location.reload();

        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        }
    });
}
