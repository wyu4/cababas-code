// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log("Cameluo Cababas start!");

    const getMediaPath = (name: string) => {
        return vscode.Uri.joinPath(context.extensionUri, "media", name);
    };

    const getScriptPath = (script: string) => {
        return vscode.Uri.joinPath(context.extensionUri, "scripts", script);
    };

    const love = vscode.commands.registerCommand("cababas-buddy.love", () => {
        const panel = vscode.window.createWebviewPanel(
            "cababas-buddy",
            "Cameluo Cababas",
            vscode.ViewColumn.Beside,
            {}
        );

        const loveGif = panel.webview.asWebviewUri(
            getMediaPath("cababasLove.gif")
        );

        panel.webview.html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cameluo Cababas</title>
            </head>
            <body>
                <img src="${loveGif}">
            </body>
            </html>`;
    });

    const spawn = vscode.commands.registerCommand("cababas-buddy.spawn", () => {
        const panel = vscode.window.createWebviewPanel(
            "cababas-buddy",
            "Cameluo Cababas",
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
            }
        );

        const idleImage = panel.webview.asWebviewUri(
            getMediaPath("cababasIdle.png")
        );

        const script = panel.webview.asWebviewUri(getScriptPath("cababas.js"));

        panel.webview.html = `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cameluo Cababas</title>
            </head>
            <style>
                body {
                    overflow-y: hidden;
                    overflow-x: hidden;
<<<<<<< Updated upstream
                }

                #cababas {
                    position: absolute;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -o-user-select: none;
=======
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                }

                body * {
                    position: absolute;
                }

                .cababas {
>>>>>>> Stashed changes
                    user-select: none;
                    resize: none;
                    user-select: none;
                }

                #spawn {
                    margin-left: 50vw;
                    margin-top: 15vh;
                    transform: translateX(-50%);
                    padding: 8px 16px;
                    border: 1px solid var(--vscode-button-border, transparent);
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border-radius: 2px;
                    cursor: pointer;
                    font-family: var(--vscode-font-family);
                    font-size: var(--vscode-font-size);

                }
            </style>

            <body>
<<<<<<< Updated upstream
                <section id="info" hidden>
                    <p id="x-label"></p>
                    <p id="y-label"></p>
                    <p id="width-label"></p>
                    <button id="jump-button">Jump</button>
                </section>
                <img id="cababas" draggable="false" src="${idleImage}" />
            </body>
=======
                <button id="spawn">Spawn</button>
            </body>
            <script>
                const cababasImage = "${image}";
            </script>
>>>>>>> Stashed changes
            <script src="${script}"></script>

            </html>`;
    });

    // Pushing commands
    context.subscriptions.push(love, spawn);
}

// This method is called when your extension is deactivated
export function deactivate() {}
