import {Context} from "./application/Context";
import {NodeDetectorCommand} from "./application/commands/NodeDetectorCommand";
import {RequestInitializerFilter} from "./application/filters/RequestInitializerFilter";
import {CommandProviderFilter} from "./application/filters/CommandProviderFilter";
import {RefreshDataFilter} from "./application/filters/RefreshDataFilter";
import {EventOnUIFilter} from "./application/filters/EventOnUIFilter";
import {MessageCenterFilter} from "./application/filters/MessageCenterFilter";
import {NotificationFilter} from "./application/filters/NotificationFilter";
import {FreeWriterCommand} from "./application/commands/FreeWriterCommand";
import {DeleteTextCommand} from "./application/commands/DeleteTextCommand";
import {BatchWriterCommand} from "./application/commands/BatchWriterCommand";
import {AutoDirectionCommand} from "./application/commands/AutoDirectionCommand";
import {ResizeCommand} from "./application/commands/ResizeCommand";
import {ReplacerCommand} from "./application/commands/ReplacerCommand";
import {JustifyCommand} from "./application/commands/JustifyCommand";
import {Request} from "./core/Request";
import {UpdateNodeDataCommand} from "./application/commands/UpdateNodeDataCommand";
import {SelectAllTextsCommand} from "./application/commands/SelectAllTextsCommand";
import {MoveTextCommand} from "./application/commands/MoveTextCommand";
import {DelayProvider} from "./helpers/DelayProvider";
import {JustifyCalculator} from "./tools/justify/calculators/JustifyCalculator";
import {PersianJustify} from "./tools/justify/justifier/PersianJustify";
import {SpaceJustify} from "./tools/justify/justifier/SpaceJustify";
import {ReplaceAllReplacer} from "./tools/replacers/ReplaceAllReplacer";
import {StandardReplacer} from "./tools/replacers/StandardReplacer";
import {TextNodesContainer} from "./application/containers/TextNodesContainer";
import {SortNodesCommand} from "./application/commands/SortNodesCommand";
import {CopyToClipboardCommand} from "./application/commands/CopyToClipboardCommand";

figma.showUI(__html__);
figma.ui.resize(460, 310)


figma.on("selectionchange", async () => {
    await executeNodeDetector();
})

figma.on("currentpagechange", async () => {
    await executeNodeDetector();
})


figma.on("run", async () => {
    initContext();
    await executeNodeDetector();
})


figma.ui.onmessage = async msg => {
    const request = Request.generate(msg['type']).attachToData("viewsData", msg['data']);
    await Context.executeRequestInPipelineAsync(request);
};

async function executeNodeDetector() {
    await Context.executeRequestInPipelineAsync(Request.generate("nodeDetector"));
}

function initContext() {
    Context.builder()
        .addFilters([
            new RequestInitializerFilter(1),
            new CommandProviderFilter(2),
            new RefreshDataFilter(3),
            new EventOnUIFilter(4),
            new MessageCenterFilter(5),
            new NotificationFilter(6)
        ])
        .registerDependency("textNodesContainer", TextNodesContainer)
        .registerDependencies([
            {key: "autoDirection", register: AutoDirectionCommand},
            {key: "sortNodes", register: SortNodesCommand},
            {key: "batchWriter", register: BatchWriterCommand},
            {key: "deleteText", register: DeleteTextCommand},
            {key: "freeWriter", register: FreeWriterCommand},
            {key: "moveText", register: MoveTextCommand},
            {key: "justify", register: JustifyCommand},
            {key: "nodeDetector", register: NodeDetectorCommand},
            {key: "replacer", register: ReplacerCommand},
            {key: "resize", register: ResizeCommand},
            {key: "selectAllTexts", register: SelectAllTextsCommand},
            {key: "updateNodeData", register: UpdateNodeDataCommand},
            {key: "copyToClipboard", register: CopyToClipboardCommand},
        ])
        .registerDependencies([
            {key: "justifyCalculator", register: JustifyCalculator},
        ])
        .registerDependencies([
            {key: "persianJustify", register: PersianJustify},
            {key: "spaceJustify", register: SpaceJustify},
        ])
        .registerDependencies([
            {key: "replaceAllReplacer", register: ReplaceAllReplacer},
            {key: "standardReplacer", register: StandardReplacer},
        ])
        .registerDependency("delayProvider", DelayProvider)
        .build();
}


