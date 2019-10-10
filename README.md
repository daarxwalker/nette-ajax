# **@daar/nette-ajax**
Minimalistic easy-to-use Nette AJAX library.

Written in pure TypeScript, uses modern library Axios for XMLHttpRequests.

IE 11 supported.

**EXPERIMENTAL FEATURE:**  Library has included jQuery nette-ajax wrapper, which helps you migrate. I do not guarantee full functionality because the library does not contain everything of jQuery nette-ajax.
If you just loading library with **script tag**, bring it to end of body before "/body" end tag or wrapper won't work.


**License**
MIT

&nbsp;
## **Goals**
- ~~Add more examples~~
- ~~Send input or textarea value as payload~~
- ~~Multiple extensions restriction~~
- ~~Add more of more examples~~

... more goals in the future


&nbsp;
## **Installation**

```
$ npm i -S @daar/nette-ajax
```

&nbsp;
## **How to use it**
Library provides more options how to use it.

If you only need ajaxify your handlers, just add them class `ajax`.

You can change default selector in config, we'll talk about it below.

If you don't want to, or you can't add class, you can switch on default ajaxify option in config, too, more below.

If you want to use callbacks, you can do that with extension(s). Just add to handler `data-nette-ext="EXTENSION_ID"`, or you can change data attribute name with config, too.

&nbsp;
## **Recommendations**
- Add new local extension before init.

&nbsp;
## **Initialization**
```javascript
netteAjax.init()

// OR

netteAjax.init(config)
```

&nbsp;
## **Initialization config**
All options are optional, even config is optional.

Config below includes default values.
```javascript
const config = {
    ajaxify: false,
    appendAttr: 'data-ajax-append',
    debounceDelay: 400,
    extensionAttr: 'data-nette-ext',
    selector: '.ajax',
}
```

&nbsp;
## **Extensions**
If you need to call something in callbacks, you can do it with extension(s).

### How to make new extensions
You have two options.

First one, you can do it with global object, which you have to include to `<head></head>`
```html
<head>
    ...
    <script type="text/javascript">window.netteExts = {}</script>
    ...
</head>
```
Then you need specify extension in script, scroll below to more info.

**OR**

In your JavaScript (TypeScript), you can call function to register extension.
```javascript
import netteAjax from '@daar/nette-ajax'

netteAjax.ext('EXTENSION_ID', config)
```

You can do both, all extensions (global and local) are included to current instance.

This options help variability of use.

&nbsp;
### Extension config
All options are optional.

Options include all Axios options for great variability of extension request control. Axios request config [here](https://github.com/axios/axios)

You can build your extension config with axios options and callbacks with props below.

Callbacks are dispatched by scope. If handler has 'data-nette-ext' with id of existed component, the extension callbacks are only dispatched. If not, callbacks of all existed extensions are dispatched on request.

Hooks are cool feature, which give you power to call another extensions when current extension is called.

```javascript
const requestConfig = {
    ...restAxiosRequestConfig, // Just for example, not needed.
    url: 'https://my-custom-url.com',
    method: 'POST',
}

const extensionConfig = {
    ...requestConfig,
    hooks: ['ANOTHER_EXTENSION_ID'],
    onInit: extension => {},
    onLoad: extension => {},
    onBefore: ({ isPending, stop }) => {},
    onStart: ({ isPending, stop }) => {},
    onSuccess: ({ ...payload, isPending }) => {},
    onComplete: payload => {},
    onError: err => {},
}
```

**Global extension**
```html
<script type="text/javascript">
    netteExts['EXTENSION_ID'] = extensionConfig
</script>
```

**Local extension**
```javascript
netteAjax.ext('EXTENSION_ID', extensionConfig)
```

**Recommendation**: Add new local extension before init.

**IMPORTANT!**: If you want dispatch only one extenion callbacks, you have to add `data-nette-ext` to handler with **extension id** as value 

**IMPORTANT!**: If you register local extension after init, it will work, but all handlers are automatically re-registered for every new extension and it's really too overkill operation. Be careful with performance issues. 

&nbsp;
## **Manual call ajax**
Sometimes you need just call ajax call, you can do it simple.
```javascript
netteAjax.request(target, extensionConfig)
```
First argument `target` can be **extension id** or **url**. Function looks for extension, if no extension found, then use url, do ajax call and trigger all extensions callbacks.

Second argument `extensionConfig` is optional. Options are as same as above. If extension exists, then custom config will be merged with extension config.

&nbsp;
## **XHR Request**
Library uses Axios, more info above.

Request can be stopped in `onBefore` and `onStart` callbacks, with method `stop` included in payload, example above.

&nbsp;
## **Snippets**
All snippets are redrawed, if handler does not include `data-nette-ext`, or manual ajax is called with **url**, instead of **extension id**.

After redraw, events are automatically assigned to handlers in snippet(scope). 

You can add to snippet `data-ajax-append` to append `pre` or `after`. This way appended elements are automatically ajaxified!

&nbsp;
## **All functions**
| Function |        Arguments        |
|:--------:|:-----------------------:|
| init     | config?                  |
| ext      | id, extensionConfig     |
| request  | target, extensionConfig? |

** argument? - optional

&nbsp;
## **Supported elements**
All these elements are supported for ajax:

`a`, `button`, `form`, `textarea`, `input[type="text"]`, `input[type="image"]`, `input[type="radio"]`, `input[type="checkbox"]`

If you give some other element class `ajax` and the element is not writeable or changeable, it will use `click` event.

Text inputs and textarea are debounced by default.

## Examples

&nbsp;
**1)** Using library old way with script tag

**HTML:**
```html
<body>
    <div n:snippet="test">
        <p>Test content</p>
        <a n:href="test!" class="ajax" data-nette-ext="testExtension">Ajax test</a>
    </div>    

    <script type="text/javascript" src="js/netteAjax.min.js"></script>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            netteAjax.ext('testExtension', {
                onInit: function() {
                    console.log('Test extension inited')
                }
                onSuccess: function() {
                    console.log('Ajax success and snippets were redrawed')
                }     
            })  

            netteAjax.init()
        })  
    </script>
</body>
```

&nbsp;
**2)** Using library better way in your JavaScript files, ajaxied, no need of `ajax` classes

**HTML:**
```html
<body>
    <div n:snippet="test">
        <p>Test content</p>
        <a n:href="test!" data-nette-ext="testExtension">Ajax test</a>
    </div>    

    <script type="text/javascript" src="js/bundle.min.js"></script>
</body>
```

**JS:**
```javascript
const newNetteAjax = () => {
  const netteAjaxConfig = { 
    ajaxify: true
  }
  netteAjax.init(netteAjaxConfig)
}

document.addEventListener('DOMContentLoaded', () => {
  newNetteAjax()
})
```

**3)** Using global extension

**HTML:**
```html
<head xmlns="http://www.w3.org/1999/html">
    <script type="text/javascript">window.netteExts = {}</script>
</head>
<body>
    <div n:snippet="test">
        <p>Test</p>
        <textarea data-nette-ext="testExtension"></textarea>
    </div>    

    <script type="text/javascript" src="js/netteAjax.min.js"></script>
    <script type="text/javascript">
        netteExts['testExtension'] = {
            url: {link test!}, // Need to escape latte in js, just example
            onInit: function() {
                console.log('Test extension inited')
            }
            onSuccess: function() {
                console.log('Ajax success and snippets were redrawed')
            }     
        }

        document.addEventListener('DOMContentLoaded', function() {      
            var netteAjaxConfig = { 
                ajaxify: true
            }
            netteAjax.init(netteAjaxConfig)
        })  
    </script>
</body>
```
