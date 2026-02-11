# ngx-spatial-navigation

Spatial Navigation for Angular 19+ (Signals, Standalone, Modern API).

## Installation

```bash
npm install ngx-spatial-navigation
```

## Usage

### 1. Provide Spatial Navigation

In your `app.config.ts`, add `provideSpatialNavigation()` to the `providers` array:

```typescript
import { provideSpatialNavigation } from 'ngx-spatial-navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSpatialNavigation(),
    // ...
  ]
};
```

### 2. Import Directives

Import the standalone directives directly into your component:

```typescript
import { 
  NavRootDirective, 
  NavSectionDirective, 
  NavFocusableDirective 
} from 'ngx-spatial-navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavRootDirective, NavSectionDirective, NavFocusableDirective],
  template: `
    <div navRoot>
      <div navSection [ignore]="false">
        <button navFocusable [focus]="true">Button 1</button>
        <button navFocusable>Button 2</button>
      </div>
    </div>
  `
})
export class AppComponent {}
```

## API

### `navRoot`

Marks the root element for spatial navigation. Usually placed on the main container or `body`.

### `navSection`

Groups focusable elements into sections.

- `[ignore]` (Signal Input): If `true`, the entire section and its children will be ignored by the navigation engine.
- `[focus]` (Signal Input): If `true`, the first focusable element in this section will be focused on initialization.

### `navFocusable`

Marks an element as focusable.

- `[ignore]` (Signal Input): If `true`, the element will be skipped.
- `[focus]` (Signal Input): If `true`, the element will receive focus on initialization (with a small delay for stability).

## Features

- **Angular 21+ Ready**: Uses Signals, `inject()`, and `booleanAttribute`.
- **Standalone**: No modules required (though `NgxSpatialNavigationModule` is provided for backward compatibility).
- **Lightweight**: Zero dependencies on `@angular/cdk`.
- **Ionic Support**: Automatically handles `setFocus()` for components like `ion-searchbar`.

## License

MIT. Copyright (c) Kyaw Swar Thwin &lt;myanmarunicorn@gmail.com&gt;
