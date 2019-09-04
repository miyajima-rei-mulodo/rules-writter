# rules-writter

## Introduction
rules-writter is a **node application** designed to be run as a **command-line tool**.

## Purpose
This application takes in a customer (as defined in customerEditor which has still not been created), project (as defined in pipelineEditor), and a programming language.
It then defines a set of rules for the project to use when running checks.

Currently, we need to manually init the rules which means this application needs to run on a local machine. It has not yet been added to pipelineEditor, as shown in Mock v1 and Mock v2 data-flow charts.

When running (please see Usage), it will insert (example) into a NoSQL database (designed for MongoDB):
```
{
    "_id": {
        "$oid": "5d5bad41ecb97db782837b90"
    },
    "customer": "dominic",
    "project": "mulodojapan",
    "proglang": "javascript",
    "name": "eslint.rules.indent",
    "des": "enforce consistent indentation",
    "config": [
        1,
        4
    ],
    "activated": true,
    "created_at": {
        "$date": "2019-08-20T08:20:17.140Z"
    },
    "__v": 0
}
```

## Practical use
1. Configure **config.js** to point to your NoSQL MongoDB.
2. Define a project in **pipelineEditor**, then have CodeBuild run this application (not yet done) **OR** Define a project in **pipielineEditor** service, then run this manually on your machine
3. Activate/Deactivate rule using **buildConfigEditor** service.

## Usage:
- node index.js [customer] [project] [proglang]

## Example:
- node index.js do-cuong-mulodo mulodojapan javascript

## Resources
Report: [link](https://drive.google.com/open?id=18L_BjK9nowfHfi2ahACJn1WImLfqN0Ur1ajtGu0mzKM)
<br>
Data-flow chart (Mock v1): [link](https://www.draw.io/#G18ELoKoZrlJEpBrpnq2yvpiAbpAMcTSRn)
<br>
Data-flow chart (Mock v2): [link](https://drive.google.com/file/d/1zYLtaYyKWOaLcLdAh16S4oM8cmoQV9v6/view?usp=sharing)
<br>
