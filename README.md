# angular-slyedoc

>This yeoman generator is for my personal so use at your own risk.

After using the standard angular folders structure in  Visual Studio's with web api projects I tried the new proposed
app structure (that you can find [here](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub) )
and found it much easier use and locate resources.

After I started using WebStorm (may I never need to code js in Visual Studios again) I found and fell in love with
yeoman and idea of the generator-angular.  I wrote this so that I extend the functionally of that generator, adapt to
the new folder structure, and add better support for WebStorm.

Additional WebStorm features:

*   setup 'grunt serve'
    * 
*   ngdoc added to directive for auto complete
*   Karma config added and changed so it works in WebStorm works with no setup besides right clicking karma.config.js
    and adding it as a run configuration
*   changed indent to 4, 2 was driving me nuts
*   Be sure to check out John Lindquest's video [Configuring Yeoman as an External Tool in WebStorm](https://www.youtube.com/watch?v=KBueufmUgdw)
    *   Note that on windows, you will use yo.cmd instead of yo for the program

## Angular features

*   Switched to using [UI-Router] (https://github.com/angular-ui/ui-router)

## To do

*   Find a way to have bower tell karma what files to include from packages.
*   haven't tested dist build, this will need some work

## Removed

*   Removed support for different folder names then 'app'
*   Removed coffee script support, sorry don't use it myself



## Getting Started

Install Yeoman

```
$ npm install -g yo
```

Download angular-slydoc generator

```
$ npm install -g generator-angular-slyedoc
```

Initiate the generator:

```
$ yo angular-slyedoc
```

### Once setup you call also run the following sub generators

```
$ yo angular-slyedoc:controller <name>
$ yo angular-slyedoc:directive <name>
$ yo angular-slyedoc:factory <name>
$ yo angular-slyedoc:filter <name>
$ yo angular-slyedoc:route <name>
$ yo angular-slyedoc:service <name>
$ yo angular-slyedoc:provider <name>
```

## Special Thanks

A lot code is from the[Yeoman](http://yeoman.io) [generator-angular] (https://github.com/yeoman/generator-angular).

Thanks for sharing!

## Webstorm Config

Node.js Serve Config

Javascript File

<profile>\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt

## License

MIT
