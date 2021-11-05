import {Context} from "./application/Context";
import {NodeDetectorCommand} from "./application/commands/node_detector/NodeDetectorCommand";
import {RequestInitializerFilter} from "./application/filters/RequestInitializerFilter";
import {CommandProviderFilter} from "./application/filters/CommandProviderFilter";
import {PrepareDataFilter} from "./application/filters/PrepareDataFilter";
import {EventOnUIFilter} from "./application/filters/EventOnUIFilter";
import {MessageCenterFilter} from "./application/filters/MessageCenterFilter";
import {NotificationFilter} from "./application/filters/NotificationFilter";
import {FreeWriterCommand} from "./application/commands/free_writer/FreeWriterCommand";
import {MoveTextCommand} from "./application/commands/move_text/MoveTextCommand";

figma.showUI(__html__);
figma.ui.resize(660, 560)


class Statistics {
    componentsCount: number = 0;
    instancesCount: number = 0;
    framesCount: number = 0;
    groupsCount: number = 0;
    textsCount: number = 0;
}

var stats: Statistics;

class TextNodeData {
    id: string;
    node: TextNode;
    text: string;
    final_text: string;

    constructor(node: TextNode, text: string) {
        this.id = node.id;
        this.node = node;
        this.text = text;
        this.final_text = "";
    }
}

const LTR = 'LTR';
const RTL = 'RTL';

function detectTextsComponent(component: ComponentNode) {

    stats.componentsCount++;

    const componentNodes: ComponentNode[] = component.children.filter(node => node.type === "COMPONENT") as ComponentNode[];
    const instancesNodes: InstanceNode[] = component.children.filter(node => node.type === "INSTANCE") as InstanceNode[];
    const frameNodes: FrameNode[] = component.children.filter(node => node.type === "FRAME") as FrameNode[];
    const textNodes: TextNode[] = component.children.filter(node => node.type === "TEXT") as TextNode[];
    const groups: GroupNode[] = component.children.filter(node => node.type === "GROUP") as GroupNode[];


    componentNodes.forEach(c => {
        detectTextsComponent(c);
    });
    instancesNodes.forEach(i => {
        detectTextsInstance(i);
    });

    frameNodes.forEach(f => {
        detectTextsOfFrame(f);
    });

    groups.forEach(group => {
        detectTextOfGroup(group);
    });

    textNodes.forEach(text_node => {
        sanitizeTexts(text_node);
    });

}

function detectTextsInstance(instance: InstanceNode) {

    stats.instancesCount++;

    const componentNodes: ComponentNode[] = instance.children.filter(node => node.type === "COMPONENT") as ComponentNode[];
    const instancesNodes: InstanceNode[] = instance.children.filter(node => node.type === "INSTANCE") as InstanceNode[];
    const frameNodes: FrameNode[] = instance.children.filter(node => node.type === "FRAME") as FrameNode[];
    const textNodes: TextNode[] = instance.children.filter(node => node.type === "TEXT") as TextNode[];
    const groups: GroupNode[] = instance.children.filter(node => node.type === "GROUP") as GroupNode[];


    componentNodes.forEach(c => {
        detectTextsComponent(c);
    });
    instancesNodes.forEach(i => {
        detectTextsInstance(i);
    });

    frameNodes.forEach(f => {
        detectTextsOfFrame(f);
    });

    groups.forEach(group => {
        detectTextOfGroup(group);
    });

    textNodes.forEach(text_node => {
        sanitizeTexts(text_node);
    });

}


function detectTextsOfFrame(frame: FrameNode) {

    stats.framesCount++;

    const componentNodes: ComponentNode[] = frame.children.filter(node => node.type === "COMPONENT") as ComponentNode[];
    const instancesNodes: InstanceNode[] = frame.children.filter(node => node.type === "INSTANCE") as InstanceNode[];
    const frameNodes: FrameNode[] = frame.children.filter(node => node.type === "FRAME") as FrameNode[];
    const textNodes: TextNode[] = frame.children.filter(node => node.type === "TEXT") as TextNode[];
    const groups: GroupNode[] = frame.children.filter(node => node.type === "GROUP") as GroupNode[];


    componentNodes.forEach(c => {
        detectTextsComponent(c);
    });
    instancesNodes.forEach(i => {
        detectTextsInstance(i);
    });


    frameNodes.forEach(f => {
        detectTextsOfFrame(f);
    });

    groups.forEach(group => {
        detectTextOfGroup(group);
    });

    textNodes.forEach(text_node => {
        sanitizeTexts(text_node);
    });

}

function detectTextOfGroup(group: GroupNode) {
    stats.groupsCount++;

    const componentNodes: ComponentNode[] = group.children.filter(node => node.type === "COMPONENT") as ComponentNode[];
    const instancesNodes: InstanceNode[] = group.children.filter(node => node.type === "INSTANCE") as InstanceNode[];
    const frameNodes: FrameNode[] = group.children.filter(node => node.type === "FRAME") as FrameNode[];
    const textNodes: TextNode[] = group.children.filter(node => node.type === "TEXT") as TextNode[];
    const groups: GroupNode[] = group.children.filter(node => node.type === "GROUP") as GroupNode[];


    componentNodes.forEach(c => {
        detectTextsComponent(c);
    });
    instancesNodes.forEach(i => {
        detectTextsInstance(i);
    });

    frameNodes.forEach(f => {
        detectTextsOfFrame(f);
    });

    groups.forEach(group => {
        detectTextOfGroup(group);
    });

    textNodes.forEach(text_node => {
        sanitizeTexts(text_node);
    });
}

function detectText(text_node: TextNode) {

    fillSelectedTextNodes(text_node);

}

function sanitizeTexts(text_node: TextNode) {
    if (selected_text_nodes.find(element => element.node.id === text_node.id) == null) {
        fillSelectedTextNodes(text_node);
    }
}

function fillSelectedTextNodes(text_node: TextNode) {
    stats.textsCount++;
    var text = detectDirection(text_node.characters) == LTR ? text_node.characters : reverseString(text_node.characters);

    selected_text_nodes.push(new TextNodeData(text_node, text));
}

const LTR_ALPHAET = [
    "A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "
];
const RTL_ALPHAET = [
    "ی", "ه", "و", "ن", "م", "ل", "گ", "ک", "ق", "ف", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "ژ", "ز", "ر", "ذ", "د", "خ", "ح", "چ", "ج", "ث", "ت", "پ", "ب", "ا", "آ", "ء",
    "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰", " "
];

const NUMBERS = [
    "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
]

function detectDirection(text: string) {
    if (text.length <= 1) {
        return LTR;
    }
    var firstChar = text[0];
    var secondChar = text[1];
    if (RTL_ALPHAET.indexOf(firstChar) !== -1 && RTL_ALPHAET.indexOf(secondChar) !== -1) {
        return RTL;
    }
    return LTR;
}


function reverseString(str: string) {
    return upsideDown(str.split('').reverse().join(""));
}

function upsideDown(str: string) {
    return str.split('\n').reverse().join('\n');
}

function showNotification(message: string) {
    figma.notify(message);
}

function showMessage(message: string) {
    figma.ui.postMessage({
        'type': "message_center",
        'data': message
    })
}


var selected_text_nodes: Array<TextNodeData> = [];

figma.on("selectionchange", () => {

    Context.executeRequest(Context.generateRequest("nodeDetector"));


})

figma.on("currentpagechange", () => {

    Context.executeRequest(Context.generateRequest("nodeDetector"));

})


figma.on("run", () => {
    Context.builder()
        .addFilters([
            new RequestInitializerFilter(),
            new CommandProviderFilter(),
            new PrepareDataFilter(),
            new EventOnUIFilter(),
            new MessageCenterFilter(),
            new NotificationFilter()
        ])
        .addCommands([
            new NodeDetectorCommand(),
            new MoveTextCommand(),
            new FreeWriterCommand()
        ])
        .build(true);
})


function prepareData() {
    selected_text_nodes = [];
    stats = new Statistics();

    for (const node of figma.currentPage.selection) {
        switch (node.type) {
            case "COMPONENT":
                const component = node;
                detectTextsComponent(component);
                break;
            case "INSTANCE":
                const instance = node;
                detectTextsInstance(instance);
                break;
            case "FRAME":
                const frame = node;
                detectTextsOfFrame(frame);
                break;
            case "GROUP":
                const group = node;
                detectTextOfGroup(group);
                break;
            case "TEXT":
                const text = node;
                detectText(text);
                break;
        }
    }

    showStatsMessage();

    postDetectMessage();

}

function postDetectMessage() {
    figma.ui.postMessage({
        'type': "detect_texts",
        'data': selected_text_nodes
    })

    figma.ui.postMessage({
        'type': "is_text_selected",
        'data': (selected_text_nodes.length > 0)
    })
}

function showStatsMessage() {
    var statsMessage = "";
    if (stats.textsCount <= 0) {
        showMessage("Select some texts");
        return;
    }
    if (stats.framesCount > 0) {
        statsMessage += stats.framesCount + " Frame, "
    }
    if (stats.componentsCount > 0) {
        statsMessage += stats.componentsCount + " Component, "
    }
    if (stats.instancesCount > 0) {
        statsMessage += stats.instancesCount + " Instance, "
    }
    if (stats.groupsCount > 0) {
        statsMessage += stats.groupsCount + " Group, "
    }
    statsMessage += stats.textsCount + " Text Selected"
    showMessage(statsMessage);
}

function resetAfterApply() {
    for (let i = 0; i < selected_text_nodes.length; i++) {
        const text = selected_text_nodes[i].final_text.length > 0 ? selected_text_nodes[i].final_text : selected_text_nodes[i].text;
        selected_text_nodes[i].text = text;
        selected_text_nodes[i].final_text = "";
    }

    postDetectMessage();

}


figma.ui.onmessage = async msg => {


    const request = Context.generateRequest(msg['type'])
        .attachToData("data", msg['data']);
    Context.executeRequest(request);

    // switch (command_type) {
    //
    //     case "apply_changes":
    //
    //         const final_data: Array<TextNodeData> = msg['text_data'] as Array<TextNodeData>;
    //         selected_text_nodes.forEach(async node_data => {
    //             var text_node = node_data.node as TextNode;
    //             var selected_text = final_data.find(d => d.id == text_node.id);
    //             await figma.loadFontAsync(text_node.fontName as FontName);
    //
    //             if (selected_text.final_text.length !== 0) {
    //                 var selected_text_direction = detectDirection(selected_text.final_text);
    //                 if (selected_text_direction === LTR) {
    //                     text_node.characters = selected_text.final_text;
    //                 } else {
    //                     text_node.characters = reverseString(selected_text.final_text);
    //                 }
    //             }
    //             prepareData();
    //         });
    //         showNotification("changes applied");
    //
    //         break;
    //
    //     case "delete_text":
    //         const text_node_id = msg['text_node_id'] as string;
    //         const text_node = selected_text_nodes.find(node => node.id === text_node_id) as TextNodeData;
    //         text_node.node.remove();
    //         selected_text_nodes = selected_text_nodes.filter(node => node.id !== text_node_id) as Array<TextNodeData>;
    //
    //         showNotification("text removed");
    //
    //         postDetectMessage();
    //         break;
    //
    //     case "copy_text":
    //         const copy_text_node_id = msg['text_node_id'] as string;
    //
    //         for (let i = 0; i < selected_text_nodes.length; i++) {
    //             if (selected_text_nodes[i].id === copy_text_node_id) {
    //                 selected_text_nodes[i].final_text = selected_text_nodes[i].text;
    //                 break;
    //             }
    //
    //         }
    //
    //         showNotification("text coppied");
    //
    //         postDetectMessage();
    //
    //         break;
    //
    //     case "replace":
    //         const replaceFrom = msg['replace_from'] as string;
    //         const replaceTo = msg['replace_to'] as string;
    //         selected_text_nodes.forEach(async node_data => {
    //             var text_node = node_data.node as TextNode;
    //
    //
    //             await figma.loadFontAsync(text_node.fontName as FontName);
    //
    //             var selected_text_direction = detectDirection(node_data.text);
    //             if (selected_text_direction === LTR) {
    //                 text_node.characters = node_data.text;
    //             } else {
    //                 text_node.characters = reverseString(node_data.text);
    //             }
    //
    //             if (replaceFrom === "*.*") {
    //                 text_node.characters = replaceTo;
    //             } else if (node_data.text.includes(replaceFrom)) {
    //                 var need_to_replace = node_data.text;
    //                 var replaceToDirectionFixedText = detectDirection(replaceTo) == LTR ? replaceTo : reverseString(replaceTo);
    //                 text_node.characters = need_to_replace.replace(new RegExp(replaceFrom, 'g'), replaceToDirectionFixedText);
    //             }
    //
    //         });
    //
    //
    //         break;
    //
    //     case "auto_direction":
    //
    //         selected_text_nodes.forEach(async node_data => {
    //             var text_node = node_data.node as TextNode;
    //
    //             await figma.loadFontAsync(text_node.fontName as FontName);
    //
    //             if (detectDirection(node_data.text) === RTL) {
    //                 text_node.characters = reverseString(node_data.text);
    //             }
    //
    //             prepareData();
    //
    //         });
    //
    //         showNotification("changes applied");
    //         break;
    //
    //     case "free_writer":
    //
    //         var free_writer_final_data: Array<TextNodeData> = msg['text_data'] as Array<TextNodeData>;
    //
    //         var typedFreeWriterText = free_writer_final_data[0].final_text;
    //         var typedFreeWriterDirectionFixedText = detectDirection(typedFreeWriterText) == LTR ? typedFreeWriterText : reverseString(typedFreeWriterText);
    //
    //         selected_text_nodes.forEach(async node_data => {
    //             var text_node = node_data.node as TextNode;
    //
    //             await figma.loadFontAsync(text_node.fontName as FontName);
    //             text_node.characters = typedFreeWriterDirectionFixedText;
    //
    //         });
    //
    //
    //         break;
    //
    //     case "resize" :
    //         const resizeParam = msg['sizeParam'] as string;
    //         switch (resizeParam) {
    //
    //             case 'minimize':
    //                 figma.ui.resize(100, 100)
    //                 break;
    //             case 'standard':
    //                 figma.ui.resize(660, 560)
    //                 break;
    //             case 'fullScreen':
    //                 figma.ui.resize(1920, 1080)
    //                 break;
    //         }
    //         break;
    //
    // }


};


