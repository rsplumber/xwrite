# XWrite

XWrite is a powerful Figma plugin designed to manage and handle texts within Figma. It provides a variety of features to streamline text management and ensure full support for both Left-to-Right (LTR) and Right-to-Left (RTL) languages.

## Features

- **Batch Writer:** Write multiple texts at once.
- **Free Writer:** Unleash your creativity with unrestricted text writing.
- **Replacer:** Easily replace any text within your Figma file.
- **LTR & RTL Full Support:** Seamlessly switch between Left-to-Right and Right-to-Left text orientations.
- **Find & Replace any text or character:** Quickly locate and replace any text or character.
- **Auto Direction Texts:** Automatically adjust text direction based on content.

## Development Instructions

Follow these steps to set up and develop the XWrite plugin:

1. **Install TypeScript globally:**

    ```bash
    npm install -g typescript
    ```

2. **Install Figma plugin typings as a development dependency:**

    ```bash
    npm install --save-dev @figma/plugin-typings
    ```

3. **Bundling:**

    For more information about bundling, visit [Figma's bundling documentation](https://www.figma.com/plugin-docs/bundling-webpack/).

4. **Start the development server with Webpack:**

    ```bash
    npx webpack --mode=development --watch
    ```

5. **Build the production bundle with Webpack:**

    ```bash
    npx webpack --mode=production
    ```

Happy coding! If you have any questions or need further assistance, feel free to reach out.

---

For detailed plugin documentation, please refer to the [Figma Plugin API](https://www.figma.com/plugin-docs/).
