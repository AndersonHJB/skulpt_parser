Experiments with python 3.9 pegen parser for Skulpt

Requirements

-   [Deno](https://deno.land/manual/getting_started/installation)
-   [Velociraptor](https://velociraptor.run/docs/installation/)
-   [Pre-commit](https://pre-commit.com/#install)

Scripts

-   `vr build` - bundles the typescript files into a javascript bundle
-   `vr bundle` - an alternative to build - uses deno bundle - no minified version
-   `vr format` - runs the precommit hooks for all files
-   `vr gen_parser` - generates the javascript parser
-   `vr gen_asdl` - generates the javascript astnodes
