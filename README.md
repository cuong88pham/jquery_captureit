# jquery_captureit
Capture main content web page
## How to use
```
var main_content = new $.captureit({
  border: '5px solid green',
  background: 'none',
  overlay: true,
  ignores: 'comment|sidebar|aside|footer/i',
  url: '',
  data: {},
  header: {},
  export_svg: false,
  ajax_type: 'post'
});
```

