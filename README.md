# OpenCompare editor

Editor for product comparison matrices (based on AngularJS and ui-grid). 

This editor is used/integrated in the opencompare Website. 

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Install & run

Download and install node.js : https://nodejs.org/en/

If you are on windows run "Node.js command prompt"
On linux just open a terminal

Go in the project directory and run : `npm install`

Run bower : `bower install`

Now grunt : `grunt`

And start it with : `grunt serve`

If you have some trouble try to run : `npm install -g grunt-cli`

## Build & development

Run `grunt` for building and `grunt serve` for preview.

Note: you must certainly install npm modules first with `npm install` (modules are documented in package.json).
`bower install` seems also needed. Otherwise `grunt` complains about some tasks that cannot be executed or complains about a missing `bower.json`

## Testing

Running `grunt test` will run the unit tests with karma.
