Gitbook Plugin for [Prism](http://prismjs.com/)
==============

<table>
  <tr>
    <td>
      <h4>Before</h4>
    </td>
    <td>
      <h4>After</h4>
    </td>
  </tr>
  <tr>
    <td>
      <img src='http://i.imgur.com/FLLEc68.png'>
    </td>
    <td>
      <img src='http://i.imgur.com/Vvs81Su.png'>
    </td>
  </tr>
</table>

## Usage

Add the plugin to your `book.json`, and disable default GitBook code highlighting:

```json
{
  "plugins": ["prism", "-highlight"]
}
```

## Options

Override default styles.  All css files must reside in the same folder.

```json
"pluginsConfig": {  
  "prism": {
    "css": [
      "prismjs/themes/prism-solarizedlight.css"
    ]
  }
}
```

## Credits

Originally based on https://github.com/spricity/google_code_prettify.

## License

Apache 2
