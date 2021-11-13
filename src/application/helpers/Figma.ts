export class Figma {
    public static async setNodeTextAsync(node: TextNode, text: string) {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = text;
    }
}
