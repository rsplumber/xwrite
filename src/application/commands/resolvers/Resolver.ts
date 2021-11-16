import {ICommand} from "../../abstractions/commands/ICommand";
import {AutoDirectionCommand} from "../AutoDirectionCommand";
import {BatchWriterCommand} from "../BatchWriterCommand";
import {CopyToClipboardCommand} from "../CopyToClipboardCommand";
import {DeleteTextCommand} from "../DeleteTextCommand";
import {FreeWriterCommand} from "../FreeWriterCommand";
import {JustifyCommand} from "../JustifyCommand";
import {MoveTextCommand} from "../MoveTextCommand";
import {NodeDetectorCommand} from "../NodeDetectorCommand";
import {ReplacerCommand} from "../ReplacerCommand";
import {ResizeCommand} from "../ResizeCommand";
import {SelectAllTextsCommand} from "../SelectAllTextsCommand";
import {UpdateNodeDataCommand} from "../UpdateNodeDataCommand";

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
            command = Resolver.createCommand(commandName)
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

    private static createCommand(commandName: string): ICommand {
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