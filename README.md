### Extensión Google Chrome
Primer ejemplo de extensión en Google Chrome.

## manifest.json
Configurar el manifest.json de acuerdo al ejemplo:

```
{
    "name": "<You_name>",
    "description": "<You_description>",
    "version": "1.0",
    "manifest_version": 3,
    "action": {
        "default_popup": "./App/index.html",
        "default_icon": {
            "128": "<You_icons.png>"
        }
    },
    "content_scripts": [
        {
            "matches": ["https://*.linkedin.com/*"],
            "js": ["<You_page_load.js>"]
        }
    ],
    "icons": {
        "128": "<You_icons.png>"
    },
    "permissions": [ "activeTab", "scripting" ]
}
```

Esta vez el ejemplo trata de un "scripting".