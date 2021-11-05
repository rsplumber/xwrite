import {AbstractCommand} from "../abstractions/AbstractCommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {TextNodeData} from "../../../shared/TextNodeData";
import {Context} from "../../Context";

export class NodeDetectorCommand extends AbstractCommand {

    execute(request: Request): Response {
        const detected = this.detect();
        return Context.responseGenerator(detected)
            .eventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .setMessageCenterText("hello")
            .setNotificationMessage("Haha")
            .generate();
    }

    identifier(): string {
        return "nodeDetector";
    }


    private detect() {
        let walker = this.walkTree(figma.currentPage.selection)
        let res;
        let count = 0;
        const textsContainer = Context.getTextNodesContainer();
        textsContainer.refresh();
        while (!(res = walker.next()).done) {
            let node = res.value
            if (node.type === 'TEXT') {
                console.log("text: " + node.characters)
                if (textsContainer.getById(node.id) != null) continue;
                textsContainer.add(new TextNodeData(node, node.characters));
            }
            if (++count === 100) {
                return false;
            }
        }
        return true;
    }

    private* walkTree(node) {
        yield node;
        let children = node.children;
        console.log("childred: " + node.children);
        if (children) {
            for (let child of children) {
                yield* this.walkTree(child)
            }
        }
    }

}