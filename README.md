#FeedHenry Cloud Proxy for mobile cms

## Default Environment Varioables

"CMS_URL": "http://cms.keyangxiang.com",

"CMS_PATH": "/cms"

## Usage

in package.json add dependency

    "fh-cms-cloud":"https://github.com/Keyang/cmsFHCloud/tarball/master"
    
in FH main.js add following lines

    var cms=require("fh-cms-cloud");
    cms.apply(module.exports);
    

That's it. You are ready to go.
