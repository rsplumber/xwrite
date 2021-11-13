import {ICommand} from "./abstractions/ICommand";
import {Response} from "../Response";
import {Request} from "../Request";
import {TextNodeData} from "../../shared/TextNodeData";
import {Context} from "../Context";

export class NodeDetectorCommand implements ICommand {

    private statistics: Map<string, number>;

    identifier(): string {
        return "nodeDetector";
    }

    containerId(): string {
        return this.identifier();
    }

    async executeAsync(request: Request): Promise<Response> {
        this.refreshData();

        if (request.getFromData("findInPage")) {
            const searchFor = request.getFromData("searchFor");
            figma.currentPage.selection = this.searchForNodes(figma.currentPage, searchFor);
        }

        figma.currentPage.selection.forEach(value => this.detect(value));

        return Response.generator(true)
            .addEventOnUi("detect_texts", Context.getTextNodesContainer().getAll())
            .setMessageCenterText(this.generateStatisticsText())
            .generate();
    }

    private refreshData() {
        this.initStatistics();
        Context.getTextNodesContainer().refresh();
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
        while (!(res = walker.next()).done) {
            let node = res.value
            this.countStatistics(node.type);
            if (node.type === 'TEXT') {
                textsContainer.add(new TextNodeData(node));
            }
            if (++count === 100) {
                return;
            }
        }
        return;
    }

    private searchForNodes(nodes, searchFor: string): TextNode[] {
        let walker = this.walkTree(nodes);
        let res;
        const foundedText: TextNode[] = [];
        while (!(res = walker.next()).done) {
            let node = res.value
            if (node.type === 'TEXT') {
                if (node.characters.includes(searchFor)) {
                    this.countStatistics(node.type);
                    foundedText.push(node);
                }
            }
        }
        return foundedText;
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