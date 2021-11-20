# ScrapingExt

ScrapingExt is an extension for Google Chrome to extract data from Linkedin profiles.

## Config manifest.json

Configure the manifest.json according to the example:

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

## Authors

- [@dj.pablo.ac](https://gitlab.com/dj.pablo.ac)


## License

[MIT](https://choosealicense.com/licenses/mit/)
