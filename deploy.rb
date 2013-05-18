#!/usr/bin/env ruby
`git checkout master`
`git branch -D gh-pages`
`git checkout -b gh-pages`
`cd tools && ./bake.sh`
`cd ..`
`git add .`
`git commit -m 'Github pages release'`
`git push origin gh-pages --force`