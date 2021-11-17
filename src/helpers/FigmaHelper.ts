export class FigmaHelper {

    public static async setNodeTextAsync(node: TextNode, text: string) {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = text;
    }

    public static async createTextNodeAsync(text: string, fontSize = null, fontName = null): Promise<TextNode> {
        const textNode = figma.createText();
        await figma.loadFontAsync(fontName);
        if (fontName) {
            textNode.fontName = fontName;
        }
        if (fontSize) {
            textNode.fontSize = fontSize;
        }
        await FigmaHelper.setNodeTextAsync(textNode, text);
        figma.currentPage.appendChild(textNode);
        return textNode as TextNode;
    }

}
