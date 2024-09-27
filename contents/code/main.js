

const appsToOpen = [
    {"shortcut": "Meta+M", "caption": "Gmail"},
    {"shortcut": "Meta+P", "resourceName": "jetbrains-phpstorm"},
    {"shortcut": "Meta+I", "resourceName": "jetbrains-idea"},
    {"shortcut": "Meta+S", "caption": "Slack WebApp"},
    {"shortcut": "Meta+O", "caption": "Google Meet"},
    {"shortcut": "Meta+J", "caption": "JIRA"},
    {"shortcut": "Meta+W", "caption": "WhatsApp Web"},
    {"shortcut": "Meta+A", "resourceName": "spotify"},
    {"shortcut": "Meta+T", "caption": "Telegram"},
    {"shortcut": "Meta+R", "caption": "Google Calendar"},
    {"shortcut": "Meta+Space", "caption": "ChatGPT"},
    {"shortcut": "Meta+K", "resourceName": "tabby"},
    {"shortcut": "Meta+D", "resourceName": "tabby"},
    {"shortcut": "Meta+B", "resourceName": "brave-browser"}
];

// Generate shortcut IDs for each app
var shortcuts = appsToOpen.map(function (app) {
    return Object.assign({}, app, {
        shortcutId: "AppToggler19" + (app.resourceName || app.caption).replace(/\s/g, "")
    });
});

function getToggleAppFunction(resName, caption) {
    console.error("Registering shortcut for", resName || caption);
    return function () {
        console.error("Toggling", resName || caption);
        const clients = workspace.windowList();
        const client = clients.find(function (client) {
            return (resName && client.resourceName === resName) ||
                (caption && client.caption.includes(caption));
        });
        if (client) {
            console.error("Window found", resName || caption);
            if (workspace.activeWindow === client && !client.minimized) {
                console.error("Window is active, minimizing");
                client.minimized = true;
            } else {
                console.error("Window is not active, activating");
                client.minimized = false;
                workspace.activeWindow = client;
            }
        } else {
            console.error("Client not found", resName || caption);
        }
    }
}

function registerAppShortcuts() {
    shortcuts.forEach(shortcut => {
        var shortcutDescription = "App toggler19 for " + (shortcut.resourceName || shortcut.caption);
        registerShortcut(shortcut.shortcutId, shortcutDescription, shortcut.shortcut, getToggleAppFunction(shortcut.resourceName, shortcut.caption));
    });
}

// Register app shortcuts
registerAppShortcuts();

// kpackagetool6 -t KWin/Script --remove toggleTheApp
//Execute  kpackagetool6 -t KWin/Script --install .
//Acgtivate it on the kwin script section on setting