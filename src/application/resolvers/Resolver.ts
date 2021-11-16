import {ICommand} from "../abstractions/commands/ICommand";
import {AutoDirectionCommand} from "../commands/AutoDirectionCommand";
import {BatchWriterCommand} from "../commands/BatchWriterCommand";
import {CopyToClipboardCommand} from "../commands/CopyToClipboardCommand";
import {DeleteTextCommand} from "../commands/DeleteTextCommand";
import {FreeWriterCommand} from "../commands/FreeWriterCommand";
import {JustifyCommand} from "../commands/JustifyCommand";
import {MoveTextCommand} from "../commands/MoveTextCommand";
import {NodeDetectorCommand} from "../commands/NodeDetectorCommand";
import {ReplacerCommand} from "../commands/ReplacerCommand";
import {ResizeCommand} from "../commands/ResizeCommand";
import {SelectAllTextsCommand} from "../commands/SelectAllTextsCommand";
import {UpdateNodeDataCommand} from "../commands/UpdateNodeDataCommand";

export class Resolver {

    private static instance: Resolver;
    private dependencies: Map<string, object>;

    private constructor() {
        this.dependencies = new Map<string, object>();
    }

    public static getInstance(): Resolver {
        if (!Resolver.instance) {
            Resolver.instance = new Resolver();
        }
        return Resolver.instance;
    }

    public resolveCommand(commandName: string): ICommand {
        let command = this.resolve(commandName);
        if (!command) {
            command = this.createCommand(commandName)
            this.addDependency(commandName, command);
        }
        return command as ICommand;
    }

    public resolve(key: string) {
        return this.dependencies.get(key);
    }

    public addDependency(key: string, value: object) {
        this.dependencies.set(key, value);
    }

    private createCommand(commandName: string): ICommand {
        switch (commandName) {
            case "autoDirection":
                return new AutoDirectionCommand();
            case "batchWriter":
                return new BatchWriterCommand();
            case "copyToClipboard":
                return new CopyToClipboardCommand();
            case "deleteText":
                return new DeleteTextCommand();
            case "freeWriter":
                return new FreeWriterCommand();
            case "justify":
                return new JustifyCommand();
            case "moveText":
                return new MoveTextCommand();
            case "nodeDetector":
                return new NodeDetectorCommand();
            case "replacer":
                return new ReplacerCommand();
            case "resize":
                return new ResizeCommand();
            case "selectAllTexts":
                return new SelectAllTextsCommand();
            case "updateNodeData":
                return new UpdateNodeDataCommand();
        }
        return null;
    }
}