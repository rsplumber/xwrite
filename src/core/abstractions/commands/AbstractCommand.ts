import {ICommand} from "./ICommand";
import {Request} from "../../Request";
import {Response} from "../../Response";
import {TextNodeData} from "../../../shared/TextNodeData";

export abstract class AbstractCommand implements ICommand {

    abstract identifier(): string;

    abstract executeAsync(request: Request): Promise<Response>;

    public success(props?: {
        notificationMessage?: string,
        messageCenter?: string,
        refreshDataOnView?: TextNodeData[],
        softRefreshData?: {
            delay?: number,
            searchFor?: string,
            keepCurrentState?: boolean
        },
        hardRefreshData?: {
            delay?: number,
            searchFor?: string,
        },
        uiEvents?: Map<string, any>,
        attachedData?: Map<string, any>,

    }): Response {
        return this.generateResponse(true, props);
    }

    public error(props?: {
        notificationMessage?: string,
        messageCenter?: string,
        refreshDataOnView?: TextNodeData[],
        softRefreshData?: {
            delay?: number,
            searchFor?: string,
            keepCurrentState?: boolean
        },
        hardRefreshData?: {
            delay?: number,
            searchFor?: string,
        },
        uiEvents?: Map<string, any>,
        attachedData?: Map<string, any>,

    }): Response {
        return this.generateResponse(false, props);
    }

    private generateResponse(success: boolean = true, props?: {
        notificationMessage?: string,
        messageCenter?: string,
        refreshDataOnView?: TextNodeData[],
        softRefreshData?: {
            delay?: number,
            searchFor?: string,
            keepCurrentState?: boolean
        },
        hardRefreshData?: {
            delay?: number,
            searchFor?: string,
        },
        uiEvents?: Map<string, any>,
        attachedData?: Map<string, any>,

    }): Response {
        const responseGenerator = Response.generator(success);
        if (props.notificationMessage) {
            responseGenerator.setNotificationMessage(props.notificationMessage);
        }

        if (props.messageCenter) {
            responseGenerator.setMessageCenterText(props.messageCenter);
        }

        if (props.refreshDataOnView) {
            responseGenerator.refreshDataOnView(props.refreshDataOnView);
        }

        if (props.softRefreshData) {
            responseGenerator.softRefreshData({
                delay: props.softRefreshData.delay,
                searchFor: props.softRefreshData.searchFor,
                keepCurrentState: props.softRefreshData.keepCurrentState,
            })
        }

        if ((props.hardRefreshData && props.softRefreshData) || props.hardRefreshData) {
            responseGenerator.hardRefreshData({
                delay: props.hardRefreshData.delay,
                searchFor: props.hardRefreshData.searchFor,
            })
        }


        if (props.uiEvents) {
            props.uiEvents.forEach((value, key) => {
                responseGenerator.addEventOnUi(key, value);
            })
        }

        const response = responseGenerator.generate();
        if (props.attachedData) {
            props.attachedData.forEach((value, key) => {
                response.attachData(key, value);
            })
        }

        return response;
    }

}