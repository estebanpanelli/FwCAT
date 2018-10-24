define({ "api": [
  {
    "type": "get",
    "url": "/hostdata",
    "title": "Get firewall host information",
    "version": "0.1.0",
    "name": "GetHostData",
    "group": "FwCAT",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fwType",
            "description": "<p>Firewall parsing syntax.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "serial",
            "description": "<p>Serial Number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "model",
            "description": "<p>Firewall model.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hostname",
            "description": "<p>Host Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "domainname",
            "description": "<p>Firewall domain.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"fwType\": \"cisco-asa\",\n  \"model\": \"ASA5545\",\n  \"hostname\": \"ASATEST\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "HostNotParsed",
            "description": "<p>The host data is not present in the parsed results or the firewall has not been parsed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500\n{\n  \"error\": \"The parser was unable to retrieve host data\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "FwCAT"
  },
  {
    "type": "get",
    "url": "/listitems",
    "title": "List firewall properties",
    "version": "0.1.0",
    "name": "GetListItems",
    "group": "FwCAT",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"objects\"",
              "\"objectgroups\"",
              "\"routes\"",
              "\"interfaces\"",
              "\"users\"",
              "\"notparsed\""
            ],
            "optional": false,
            "field": "key",
            "description": "<p>Config property to retrieve</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "per_page",
            "defaultValue": "ALL",
            "description": "<p>Split results in this amount of items per page. Use &quot;ALL&quot; for all</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>The page number. If larger than last page returns last page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>List of objects for the requested property.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nFwCAT-items: 1\nFwCAT-pages: 1\nFwCAT-page: 1\nFwCAT-pagesize: 1\n{\n  \"list\": [Object1, Object2]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "KeyMissing",
            "description": "<p>No list key was found.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Error was thrown from the parser</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"error\": \"'Key missing'\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500\n{\n  \"error\": \"Invalid key\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "FwCAT"
  },
  {
    "type": "get",
    "url": "/listrules/:key",
    "title": "List firewall rules",
    "version": "0.1.0",
    "name": "GetListRules",
    "group": "FwCAT",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"filter\"",
              "\"nat\""
            ],
            "optional": false,
            "field": "key",
            "description": "<p>ID of the set of rules</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "per_page",
            "defaultValue": "ALL",
            "description": "<p>Split results in this amount of items per page. Use &quot;ALL&quot; for all</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>The page number. If larger than last page returns last page</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "match_key",
            "description": "<p>Bring only results with this key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "match_value",
            "description": "<p>Bring only results where match_key matches this value</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "regex",
            "description": "<p>Specifies if the previous matching pair should be treated as a RegExp</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>List of objects matching the query.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nFwCAT-items: 1\nFwCAT-pages: 1\nFwCAT-page: 1\nFwCAT-pagesize: 1\n{\n  \"list\": [Object1, Object2]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "KeyMissing",
            "description": "<p>No list key was found.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Error was thrown from the parser</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"error\": \"'Key missing'\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500\n{\n  \"error\": \"Invalid match array\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "FwCAT"
  },
  {
    "type": "get",
    "url": "/selectitem",
    "title": "Get information on an item",
    "version": "0.1.0",
    "name": "GetSelectItem",
    "group": "FwCAT",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"objects\"",
              "\"objectgroups\"",
              "\"interfaces\"",
              "\"users\""
            ],
            "optional": false,
            "field": "key",
            "description": "<p>Config property to retrieve</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the item to match</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>List of objects matching the query.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"item\": Object\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "{\n  \"item\": Object1,\n  \"warning\": \"Multiple items selected\",\n  \"others\": [Object2, Object3]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "KeyOrIDMissing",
            "description": "<p>No list key was found or no ID was specified.</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "ServerError",
            "description": "<p>Error was thrown from the parser</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400\n{\n  \"error\": \"ID or key missing\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500\n{\n  \"error\": \"Invalid key\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "FwCAT"
  },
  {
    "type": "post",
    "url": "/parse",
    "title": "Post command to parser",
    "version": "0.1.0",
    "name": "PostParseCommand",
    "group": "FwCAT",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"parseCfg\""
            ],
            "optional": false,
            "field": "cmd",
            "description": "<p>Command to send to endpoint</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cfgFile",
            "description": "<p>Full path to the configuration file to parse</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{     \"cmd\": \"parseCfg\",\n  \"cfgFile\": \"/path/to/cisco.cfg\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"ready\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidCommand",
            "description": "<p>cmd parameter is not valid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 418\n{\n  \"error\": \"Command is not valid\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api.js",
    "groupTitle": "FwCAT"
  }
] });
