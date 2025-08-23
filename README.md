# Ecommerce Pro Starter

Use this repo as a starting point for building your Dutchie Ecommerce Pro platform. This utilizes the [Ecommerce Pro SDK](https://www.npmjs.com/package/@dutchiesdk/ecommerce-extensions-sdk) to build the necessary components. This app also provides the ability to preview your theme locally.

## Setup

This app requires Node.js v20 or higher.

1. Run `npm install` to install the dependencies.
2. Run `npm run dev` to start the development server.
3. Open your browser and navigate to `http://localhost:3001` to see a preview of your components.

## Building

1. Run `npm run build` to build the app.
2. Run `npm run preview` to preview the app.

## Theme Structure

Each theme should be built in a new directory within the `src/themes` directory. Each theme should output an `index.ts` file that exports the components, pages, and events for the theme and satisfies the `RemoteModuleRegistry` type. You can find a sample theme in [the `src/themes/sample` directory](src/themes/sample).

### Components

Each theme component should satisfy the `RemoteBoundaryComponent` type from the Ecommerce Pro SDK.

#### Example:

```tsx
import { DataBridgeVersion, RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const StoreFrontHeader: RemoteBoundaryComponent = () => {
  return <div>Store Front Header</div>;
};

StoreFrontHeader.DataBridgeVersion = DataBridgeVersion;

export default StoreFrontHeader;
```

### Pages

To add custom pages, add a React component to your theme, and add an item that satisfies the `RoutablePageRegistryEntry` type from the Ecommerce Pro SDK to the `RouteablePages` array in your `index.ts` file.

## Data Bridge

This app mocks the data bridge so that you can preview your theme locally. This gives you the ability to customize the data bridge with the appropriate data and to preview different states.

There is a base mock data bridge in [src/data/mockDataBridge.ts](src/data/mockDataBridge.ts) that is used by default. You can override the data bridge for a theme by creating a `mockDataBridge.ts` file in your theme directory. This file should export a `mockDataBridge` const that satisfies the `CommerceComponentsDataInterface` type from the Ecommerce Pro SDK.

## Events

You can register callback functions that will be triggered by certain events in the Dutchie platform in your extension's `RemoteModuleRegistry` object.

## Module Federation

The app is configured to expose all themes that live in subdirectories of `src/themes`. No additional configuration is needed.

## FAQs

<details>
<summary>What if I have multiple themes?</summary>

No problem! You can add a new theme by adding a new directory to `src/themes` and following the instructions above.

</details>

<details>
<summary>What if I don't like styled components?</summary>

The sample theme is built with styled components, but you can use any library you want.

</details>

<details>
<summary>How do I switch themes?</summary>

Once you have multiple themes available, you can use the theme switcher at the top of the page.

</details>

<details>
<summary>What if I need more help?</summary>

Open an issue in the repo and we'll get back to you as soon as possible.

</details>

<details>
<summary>Why aren't all of my StoreFrontCarouselInterstitials components displaying?</summary>

It's dependent on the number of carousels, and we will never display two interstitials in a row. If you have more interstitials than carousels, you will not see all of the interstitials.

</details>
