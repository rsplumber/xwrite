import {ICommand} from "../abstraction/ICommand";
import {Response} from "../../../shared/Response";
import {Request} from "../../../shared/Request";
import {TextNodeData} from "../../../shared/TextNodeData";
import {Context} from "../../Context";

export class NodeDetectorCommand implements ICommand {
    identifier(): string {
        return "nodeDetector";
    }

    execute(request: Request): Response {
        const detected = this.detect();
        const response = new Response();
        response.type = request.type;
        response.message = "Texts detected"
        response.success = detected;
        return response;
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
                if(textsContainer.getById(node.id) != null) continue;
                textsContainer.add(new TextNodeData(node, node.characters));
            }
            if (++count === 1000) {
                return false;
            }
        }
        return true;
    }

    private* walkTree(node) {
        yield node;
        let children = node.children;
        if (children) {
            for (let child of children) {
                yield* this.walkTree(child)
            }
        }
    }

}