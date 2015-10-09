## UTJ-DNP3 - Kier. UTJ wyprowadzone z konwertera UTJ-DNP

**Code blocks**

      This is <b>bold</b>
      
**Ampersands**

Star Trek & Star Wars

## Multiple lines

Showdown wraps a code block in both `<pre>` and `<code>` tags.

To produce a code block in Markdown, simply indent every line of the block by at least 4 spaces or 1 tab.

    This is a normal paragraph:
    
        This is a code block.

You can also use triple backticks to format text as its own distinct block.


    Check out this neat program I wrote:
    
    ```
    x = 0
    x = 2 + 2
    what is x
    ```
  
# Tables

Tables aren't part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the flag `tables`.

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |
```

this will produce this:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| **col 3 is**  | right-aligned | $1600 |
| col 2 is      | *centered*    |   $12 |
| zebra stripes | ~~are neat~~  |    $1 |


Colons can be used to align columns.

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

You can also use other markdown syntax inside them.

```css
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  body:first-of-type pre::after {
    content: 'highlight: ' attr(class);
  }
  body {
    background: linear-gradient(45deg, blue, red);
  }
}

@import url('print.css');
@page:right {
 margin: 1cm 2cm 1.3cm 4cm;
}

@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}

div.text,
#content,
li[lang=ru] {
  font: Tahoma, Chunkfive, sans-serif;
  background: url('hatch.png') /* wtf? */;  color: #F0F0F0 !important;
  width: 100%;
}
```