import {AbstractCommand} from "./abstractions/AbstractCommand";
import {Response} from "../../shared/Response";
import {Request} from "../../shared/Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";

export class NodeDetectorCommand extends AbstractCommand {

    private statistics: Map<string, number>;

    identifier(): string {
        return "nodeDetector";
    }

    async executeAsync(request: Request): Promise<Response> {

        this.initStatistics();
        const findInPage = request.getFromData("data")['findInPage'] as boolean;

        if(findInPage){
            this.detect(figma.currentPage);
        }else{
            figma.currentPage.selection.forEach(value => this.detect(value));
        }


        return Context.responseGenerator(true)
            .eventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .setMessageCenterText(this.generateStatisticsText())
            .generate();
    }

    private initStatistics() {
        this.statistics = new Map<string, number>();
        this.statistics.set("FRAME", 0);
        this.statistics.set("GROUP", 0);
        this.statistics.set("INSTANCE", 0);
        this.statistics.set("COMPONENT", 0);
        this.statistics.set("TEXT", 0);
    }

    private generateStatisticsText(): string {
        let statsMessage = "";
        if (this.statistics.get("TEXT") <= 0) {
            return "Select some texts";
        }

        if (this.statistics.get("FRAME") > 0) {
            statsMessage += this.statistics.get("FRAME") + " Frame, ";
        }
        if (this.statistics.get("COMPONENT") > 0) {
            statsMessage += this.statistics.get("COMPONENT") + " Component, ";
        }
        if (this.statistics.get("INSTANCE") > 0) {
            statsMessage += this.statistics.get("INSTANCE") + " Instance, ";
        }
        if (this.statistics.get("GROUP") > 0) {
            statsMessage += this.statistics.get("GROUP") + " Group, ";
        }
        statsMessage += this.statistics.get("TEXT") + " Text Selected";
        return statsMessage;
    }


    private detect(nodes): void {
        let walker = this.walkTree(nodes);
        let res;
        let count = 0;
        const textsContainer = Context.getTextNodesContainer();
        textsContainer.refresh();
        while (!(res = walker.next()).done) {
            let node = res.value
            this.countStatistics(node.type);
            if (node.type === 'TEXT') {
                if (textsContainer.getById(node.id) != null) continue;
                textsContainer.add(new TextNodeData(node, node.characters));
            }
            if (++count === 100) {
                return;
            }
        }
        return;
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

    private countStatistics(type: string): void {
        if (this.statistics.has(type)) {
            this.statistics.set(type, this.statistics.get(type) + 1);
        }
    }


}