export class Figma {
    public static async setNodeText(node: TextNode, text: string) {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = text;
    }
}
