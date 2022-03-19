const {Menu} = require('electron');
const actions = require('./actions');

function GenerateMenu(menu, window) {

    console.log(menu[0].submenu[0].action);

    console.log(actions.fnMap["Open"])

    menu[0].submenu[0].click = actions.fnMap[
        menu[0].submenu[0].action
        ];
    console.log(menu[0].submenu[0]);

    Menu.setApplicationMenu(
        Menu.buildFromTemplate(menu)
    );
}

module.exports = {
    GenerateMenu
}