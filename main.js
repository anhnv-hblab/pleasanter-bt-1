console.log('Load Main.js');
$p.events.on_grid_load = function() {
    for (let i = 0; i < $p.events.on_grid_load_arr.length; i++) {
        console.log( $p.events.on_grid_load_arr[i]);
        $p.events.on_grid_load_arr[i] ();
    }
}
