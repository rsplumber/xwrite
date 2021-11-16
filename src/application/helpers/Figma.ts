export class Figma {
    public static async setNodeTextAsync(node: TextNode, text: string) {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = text;
    }

    public static async createTextNodeAsync(text: string, fontSize, fontName): Promise<TextNode> {
        const textNode = figma.createText();
        await figma.loadFontAsync(fontName);
        textNode.fontName = fontName;
        textNode.fontSize = fontSize;
        await Figma.setNodeTextAsync(textNode, text);
        figma.currentPage.appendChild(textNode);
        return textNode as TextNode;
    }
}
