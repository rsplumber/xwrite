import {Context} from "./application/Context";
import {NodeDetectorCommand} from "./application/commands/NodeDetectorCommand";
import {RequestInitializerFilter} from "./application/filters/RequestInitializerFilter";
import {CommandProviderFilter} from "./application/filters/CommandProviderFilter";
import {RefreshDataFilter} from "./application/filters/RefreshDataFilter";
import {EventOnUIFilter} from "./application/filters/EventOnUIFilter";
import {MessageCenterFilter} from "./application/filters/MessageCenterFilter";
import {NotificationFilter} from "./application/filters/NotificationFilter";
import {FreeWriterCommand} from "./application/commands/FreeWriterCommand";
import {MoveTextCommand} from "./application/commands/MoveTextCommand";
import {DeleteTextCommand} from "./application/commands/DeleteTextCommand";
import {BatchWriterCommand} from "./application/commands/BatchWriterCommand";
import {AutoDirectionCommand} from "./application/commands/AutoDirectionCommand";
import {ResizeCommand} from "./application/commands/ResizeCommand";
import {ReplacerCommand} from "./application/commands/ReplacerCommand";
import {CopyToClipboardCommand} from "./application/commands/CopyToClipboardCommand";
import {JustifyCommand} from "./application/commands/JustifyCommand";

figma.showUI(__html__);
figma.ui.resize(660, 560)


figma.on("selectionchange", () => {
    executeNodeDetector();
})

figma.on("currentpagechange", () => {
    executeNodeDetector();
})



figma.on("run", () => {
    Context.builder()
        .addFilters([
            new RequestInitializerFilter(),
            new CommandProviderFilter(),
            new RefreshDataFilter(),
            new EventOnUIFilter(),
            new MessageCenterFilter(),
            new NotificationFilter()
        ])
        .addCommands([
            new NodeDetectorCommand(),
            new MoveTextCommand(),
            new DeleteTextCommand(),
            new FreeWriterCommand(),
            new BatchWriterCommand(),
            new AutoDirectionCommand(),
            new ResizeCommand(),
            new ReplacerCommand(),
            new JustifyCommand(),
            new CopyToClipboardCommand()
        ])
        .build(true);

    executeNodeDetector();
})


figma.ui.onmessage = async msg => {
    const request = Context.generateRequest(msg['type']).attachToData("data", msg['data']);
    Context.executeRequestAsync(request);
};

function executeNodeDetector() {
    Context.executeRequestAsync(Context.generateRequest("nodeDetector"));
}


