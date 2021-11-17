import {Response} from "../Response";
import {Request} from "../Request";
import {Command} from "./Command";
import {TextNodeData} from "../../shared/TextNodeData";

export class SortNodesCommand extends Command {

    identifier(): string {
        return "sortNodes";
    }

    async executeAsync(request: Request): Promise<Response> {
        const sortBy = request.getFromData("sortBy");
        const sortType = request.getFromData("sortType");
        this.getTextNodeContainer().updateValues(this.sortList(sortBy, sortType));
        return this.success({
            notificationMessage: "List sorted!",
            refreshDataOnView: this.getTextNodeContainer().getAll()
        })
    }

    private sortList(sortBy: string, sortType: string): TextNodeData[] {
        switch (sortBy) {
            case "position":
                return this.sortByPosition(sortType);
            case "alphabet":
                return this.sortByAlphabet(sortType);
            case "length":
                return this.sortByTextLength(sortType);
            default:
                return this.sortByPosition("desc");
        }
    }

    private sortByPosition(sortType: string): TextNodeData[] {
        if (sortType.toLowerCase() === "desc") {
            return this.getTextNodeContainer()
                .getAll()
                .sort((a, b) => b.position - a.position);
        }
        return this.getTextNodeContainer()
            .getAll()
            .sort((a, b) => a.position - b.position);
    }

    private sortByTextLength(sortType: string): TextNodeData[] {
        if (sortType.toLowerCase() === "desc") {
            return this.getTextNodeContainer()
                .getAll()
                .sort((a, b) => b.text.length - a.text.length);
        }
        return this.getTextNodeContainer()
            .getAll()
            .sort((a, b) => a.text.length - b.text.length);
    }

    private sortByAlphabet(sortType: string): TextNodeData[] {
        if (sortType.toLowerCase() === "desc") {
            return this.getTextNodeContainer()
                .getAll()
                .sort((a, b) => {
                    if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
                    if (a.text.toLowerCase() > b.text.toLowerCase()) return -1;
                    return 0;
                });
        }
        return this.getTextNodeContainer()
            .getAll()
            .sort((a, b) => {
                if (b.text.toLowerCase() < a.text.toLowerCase()) return -1;
                if (b.text.toLowerCase() > a.text.toLowerCase()) return -1;
                return 0;
            });
    }

}