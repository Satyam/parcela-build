jshint src/**/*.js
yuidoc -q --themedir ./apitheme
browserify -r ./src/parcela:parcela -u fake-dom -u jsdom > ./site/dist/parcela.js
uglifyjs ./site/dist/parcela.js -c drop_debugger,drop_console,warnings=false -m >./site/dist/parcela-min.js
jekyll build
