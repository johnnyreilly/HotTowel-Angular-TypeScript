# Hot Towel Angular SPA Template - with TypeScript #

This is a port of John Papa's popular [Hot Towel Angular SPA Template](https://github.com/johnpapa/HotTowel-Angular) to TypeScript.  

##What is this?

**This is intentionally a "bare bones" port.**  It's essentially the same code as John's - just with added typings (and yes it is ```noImplicitAny``` compliant).

You could, if you wanted to, take this much further.  You could start using a whole host of TypeScripts functionality: modules / classes / arrow functions... the whole shebang.  This is deliberately not that.

I didn't want to scare your horses, I just wanted you to see how easy it is to move from JS to TS.  And I'm standing on top of the giant that is [John Papa](https://github.com/johnpapa) for that purpose.

##Contents

This repo contains the contents of HotTowel-Angular's app folder, with each JavaScript file converted over to TypeScript.  The compiled JavaScript files are also included so that you can compare just how similar the compiled JavaScript is to John's original code.  

In fact there are only 2 differences in the end:

###1. sidebar.js's ```getNavRoutes``` 
...had the filtering changed from this:

```
    return r.config.settings && r.config.settings.nav;
```

to this:

```
    return (r.config.settings && r.config.settings.nav) ? true : false;
```

This was necessary as TypeScript insists that the array ```filter``` predicate returns a ```boolean```.  John's original method returns a number (```nav```'s number to be clear) which actually seems to work fine. My assumption is that JavaScript's filter method is happy with a truth-y / false-y test which John's implementation would satisfy. 

###2. common.js's ```$broadcast``` 
...had to be given a rest parameter to satisfy the TS compiler.  John's original method exposed no parameters as it just forwards on whatever arguments are passed to it.  This means that ```$broadcast``` has a bit of unused code in the head of the generated method:

```
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
```

##If you want to use this
Then simply follow the instructions for installing [HotTowel-Angular](https://github.com/johnpapa/HotTowel-Angular) and then drop this repo's app folder over the one just created when HotTowel-Angular was installed.

You'll need the following NuGet packages for the relevant DefinitelyTyped Typings:

    Install-Package angularjs.TypeScript.DefinitelyTyped
    Install-Package angular-ui-bootstrap.TypeScript.DefinitelyTyped
    Install-Package jquery.TypeScript.DefinitelyTyped
    Install-Package spin.TypeScript.DefinitelyTyped
    Install-Package toastr.TypeScript.DefinitelyTyped

And you're good to go.  If you're interested in the specific versions that I used then you can find them in the packages.config of this repo.

##Thanks
To John Papa for creating HotTowel-Angular.  Much love.  

And my mum too... Just because.